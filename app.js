const currency = n => n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const data = {
  sales: [
    ['#NX-0018','Distribuidora Central','R$ 1.240,00','Pago'],
    ['#NX-0017','Bar do Parque','R$ 680,00','Pendente'],
    ['#NX-0016','Adega Avenida','R$ 920,00','Pago'],
    ['#NX-0015','Distribuidora União','R$ 1.560,00','Pago']
  ],
  flavors: [
    ['Coco','#f2f2ee','1.240 pacotes'],['Melancia','#d94d50','980 pacotes'],['Morango','#e98ca6','860 pacotes'],['Maracujá','#d7ad42','740 pacotes'],['Maçã verde','#82ad68','620 pacotes']
  ]
};
const content = document.getElementById('viewContent');
const title = document.getElementById('pageTitle');
document.getElementById('today').textContent = new Date().toLocaleDateString('pt-BR',{day:'2-digit',month:'short',year:'numeric'});
function dashboard(){return `
<div class="welcome"><div><h2>Bem-vindo ao NEXO ERP PRO</h2><p>Visão geral da operação da sua fábrica e distribuidora.</p></div><span class="pill">VISÃO GERAL · DEMONSTRAÇÃO</span></div>
<div class="grid">
<div class="metric"><div class="metric-head">Faturamento do mês <span class="metric-icon">↗</span></div><div class="metric-value">R$ 24.850</div><div class="metric-foot"><span class="positive">▲ 8,4%</span> em relação ao mês anterior</div></div>
<div class="metric"><div class="metric-head">Pedidos registrados <span class="metric-icon">▤</span></div><div class="metric-value">86</div><div class="metric-foot">Pedidos de demonstração</div></div>
<div class="metric"><div class="metric-head">Estoque disponível <span class="metric-icon">▣</span></div><div class="metric-value">4.440</div><div class="metric-foot">Pacotes · dados ilustrativos</div></div>
<div class="metric"><div class="metric-head">Contas a receber <span class="metric-icon">R$</span></div><div class="metric-value">R$ 6.320</div><div class="metric-foot">Valores demonstrativos</div></div>
</div>
<div class="content-grid"><div class="panel"><h3>Vendas por período</h3><div class="panel-sub">Exemplo visual — não representa dados reais</div><div class="chart">${[42,60,48,75,55,88,66,96,71,82,62,91].map((v,i)=>`<div class="bar-wrap"><div class="bar" style="height:${v}%"></div><span class="bar-label">${['S1','S2','S3','S4'][i%4]}</span></div>`).join('')}</div></div>
<div class="panel"><h3>Movimentações recentes</h3><div class="panel-sub">Exemplos de lançamentos</div>
<div class="activity"><div class="activity-icon">↗</div><div><strong>Pedido #NX-0018</strong><small>Distribuidora Central</small></div><span class="amount positive">+ R$ 1.240</span></div>
<div class="activity"><div class="activity-icon">▤</div><div><strong>Compra de embalagens</strong><small>Fornecedor demonstrativo</small></div><span class="amount negative">− R$ 460</span></div>
<div class="activity"><div class="activity-icon">▣</div><div><strong>Produção registrada</strong><small>Melancia · lote demonstrativo</small></div><span class="amount">+ 240 pac.</span></div>
</div></div>
<div class="panel" style="margin-top:15px"><h3>Estoque por sabor</h3><div class="panel-sub">Quantidades fictícias para demonstrar a interface</div><div class="flavors">${data.flavors.map(f=>`<div class="flavor"><div class="swatch" style="background:${f[1]}"></div><strong>${f[0]}</strong><div style="color:var(--muted);margin-top:5px">${f[2]}</div></div>`).join('')}</div></div>
<div class="notice"><strong>Importante:</strong> esta tela contém dados de demonstração. Ainda não há banco online, login seguro nem sincronização entre dispositivos. Não use os números como dados contábeis reais.</div>`}
function table(headers, rows){return `<div class="panel"><div class="table-wrap"><table class="data-table"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((c,i)=>`<td>${i===r.length-1 && ['Pago','Pendente','Em produção','Disponível'].includes(c)?`<span class="tag ${c==='Pago'||c==='Disponível'?'ok':'warn'}">${c}</span>`:c}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`}
const views = {
 dashboard:['Dashboard',dashboard],
 sales:['Vendas',()=>`<div class="section-head"><h2>Pedidos de venda</h2><button class="primary" onclick="demoAlert('O cadastro de vendas será ativado após conectar o banco de dados.')">+ Novo pedido</button></div>${table(['PEDIDO','CLIENTE','VALOR','STATUS'],data.sales)}<div class="notice">Os pedidos acima são fictícios. O cadastro real será conectado ao banco de dados na próxima etapa.</div>`],
 production:['Produção',()=>`<div class="section-head"><h2>Produção por sabor</h2><button class="primary" onclick="demoAlert('O registro de produção será ativado após conectar o banco de dados.')">+ Registrar produção</button></div>${table(['SABOR','PRODUZIDO HOJE','UNIDADE','STATUS'],[['Coco','240','pacotes','Disponível'],['Melancia','320','pacotes','Disponível'],['Morango','180','pacotes','Em produção'],['Maracujá','200','pacotes','Disponível'],['Maçã verde','160','pacotes','Disponível']])}<div class="notice">Planejamento demonstrativo. O processo real deverá registrar lote, data, quantidade, perdas e responsável.</div>`],
 stock:['Estoque',()=>`<div class="section-head"><h2>Controle de estoque</h2><button class="primary" onclick="demoAlert('As movimentações serão ativadas após conectar o banco de dados.')">+ Movimentar estoque</button></div>${table(['PRODUTO','SALDO DEMONSTRATIVO','UNIDADE','ALERTA'],data.flavors.map(f=>[f[0],f[2].split(' ')[0],'pacotes','Disponível']))}<div class="notice">A estrutura definitiva terá histórico de entradas, saídas, ajustes e estoque mínimo.</div>`],
 finance:['Financeiro',()=>`<div class="section-head"><h2>Resumo financeiro</h2><button class="primary" onclick="demoAlert('Os lançamentos serão ativados após conectar o banco de dados.')">+ Novo lançamento</button></div><div class="grid"><div class="metric"><div class="metric-head">A receber</div><div class="metric-value">R$ 6.320</div><div class="metric-foot">Demonstração</div></div><div class="metric"><div class="metric-head">A pagar</div><div class="metric-value">R$ 3.480</div><div class="metric-foot">Demonstração</div></div><div class="metric"><div class="metric-head">Saldo projetado</div><div class="metric-value">R$ 8.760</div><div class="metric-foot">Demonstração</div></div><div class="metric"><div class="metric-head">Atrasados</div><div class="metric-value">R$ 0</div><div class="metric-foot">Demonstração</div></div></div><div style="margin-top:15px">${table(['DATA','DESCRIÇÃO','TIPO','VALOR'],[['05/10/2026','Pedido demonstrativo','Entrada','R$ 1.240,00'],['06/10/2026','Compra de embalagens','Saída','R$ 460,00']])}</div>`],
 customers:['Clientes',()=>`<div class="section-head"><h2>Clientes</h2><button class="primary" onclick="demoAlert('O cadastro de clientes será ativado após conectar o banco de dados.')">+ Novo cliente</button></div>${table(['NOME','PERFIL','ÚLTIMO PEDIDO','STATUS'],[['Distribuidora Central','Distribuidora','#NX-0018','Disponível'],['Bar do Parque','Bar','#NX-0017','Disponível'],['Adega Avenida','Adega','#NX-0016','Disponível']])}`],
 settings:['Configurações',()=>`<div class="panel"><h3>Configuração do sistema</h3><p class="panel-sub">Próxima etapa: conectar hospedagem, banco de dados e autenticação.</p><div class="notice">Não insira senhas, dados bancários ou informações reais de clientes neste protótipo.</div><p><strong>Etapas técnicas</strong></p><ol><li>Criar projeto no serviço de banco de dados.</li><li>Aplicar o arquivo <code>database/schema.sql</code>.</li><li>Configurar autenticação e permissões.</li><li>Publicar o frontend em hospedagem web.</li><li>Testar acessos e cópias de segurança.</li></ol></div>`]
};
function demoAlert(message){alert(message)}
window.demoAlert=demoAlert;
function render(view){const v=views[view]||views.dashboard;title.textContent=v[0];content.innerHTML=v[1]();document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===view));document.getElementById('sidebar').classList.remove('open')}
document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>render(b.dataset.view)));
document.getElementById('menuButton').addEventListener('click',()=>document.getElementById('sidebar').classList.toggle('open'));
render('dashboard');

/* NEXO ERP PRO — conexão Supabase */
const NEXO_SUPABASE_URL = "https://mgenzkzgwbodtwvauuun.supabase.co";
const NEXO_SUPABASE_KEY = "sb_publishable_USOpDTdOOMunKlyMHJx9sw_xfiSiyVd";

let nexoSupabase = null;

if (
  window.supabase &&
  NEXO_SUPABASE_URL.startsWith("https://") &&
  NEXO_SUPABASE_KEY.length > 20 &&
  !NEXO_SUPABASE_URL.includes("COLE_SUA")
) {
  nexoSupabase = window.supabase.createClient(
    NEXO_SUPABASE_URL,
    NEXO_SUPABASE_KEY
  );

  console.info("NEXO: cliente Supabase inicializado.");
} else {
  console.warn("NEXO: configure a URL e a chave pública do Supabase.");
}

