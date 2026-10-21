
/* ==========================================
   NEXO ERP PRO — APLICAÇÃO PRINCIPAL
   ========================================== */

const NEXO_SUPABASE_URL =
  "https://mgenzkzgwbodtwvauuun.supabase.co";

const NEXO_SUPABASE_KEY =
  "sb_publishable_USOpDTdOOMunKlyMHJx9sw_xfiSiyVd";

let nexoSupabase = null;

if (window.supabase) {
  nexoSupabase = window.supabase.createClient(
    NEXO_SUPABASE_URL,
    NEXO_SUPABASE_KEY
  );
}

const currency = value =>
  Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

const data = {
  
 flavors: [
    ["Coco", "#f2f2ee", "1.240 pacotes"],
    ["Melancia", "#d94d50", "980 pacotes"],
    ["Morango", "#e98ca6", "860 pacotes"],
    ["Maracujá", "#d7ad42", "740 pacotes"],
    ["Maçã verde", "#82ad68", "620 pacotes"]
  ]
};

const content = document.getElementById("viewContent");
const title = document.getElementById("pageTitle");
const sidebar = document.getElementById("sidebar");
const menuButton = document.getElementById("menuButton");

document.getElementById("today").textContent =
  new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

function dashboard() {
  return `
    <div class="welcome">
      <div>
        <h2>Bem-vindo ao NEXO ERP PRO</h2>
        <p>Visão geral da operação da sua fábrica e distribuidora.</p>
      </div>
      <span class="pill">VISÃO GERAL · DEMONSTRAÇÃO</span>
    </div>

    <div class="grid">
      <div class="metric">
        <div class="metric-head">Faturamento do mês</div>
        <div class="metric-value">R$ 24.850</div>
        <div class="metric-foot">Dados demonstrativos</div>
      </div>
      <div class="metric">
        <div class="metric-head">Pedidos registrados</div>
        <div class="metric-value">86</div>
        <div class="metric-foot">Pedidos de demonstração</div>
      </div>
      <div class="metric">
        <div class="metric-head">Estoque disponível</div>
        <div class="metric-value">4.440</div>
        <div class="metric-foot">Pacotes ilustrativos</div>
      </div>
      <div class="metric">
        <div class="metric-head">Contas a receber</div>
        <div class="metric-value">R$ 6.320</div>
        <div class="metric-foot">Valores demonstrativos</div>
      </div>
    </div>

    <div class="content-grid">
      <div class="panel">
        <h3>Vendas por período</h3>
        <div class="panel-sub">Gráfico demonstrativo</div>
        <div class="chart">
          ${[42,60,48,75,55,88,66,96,71,82,62,91].map(
            (v, i) => `
              <div class="bar-wrap">
                <div class="bar" style="height:${v}%"></div>
                <span class="bar-label">${["S1","S2","S3","S4"][i % 4]}</span>
              </div>
            `
          ).join("")}
        </div>
      </div>

      <div class="panel">
        <h3>Movimentações recentes</h3>
        <div class="panel-sub">Exemplos ilustrativos</div>
        <div class="activity">
          <div class="activity-icon">↗</div>
          <div><strong>Pedido #NX-0018</strong>
          <small>Distribuidora Central</small></div>
          <span class="amount positive">+ R$ 1.240</span>
        </div>
        <div class="activity">
          <div class="activity-icon">▤</div>
          <div><strong>Compra de embalagens</strong>
          <small>Fornecedor demonstrativo</small></div>
          <span class="amount negative">− R$ 460</span>
        </div>
      </div>
    </div>

    <div class="panel" style="margin-top:15px">
      <h3>Estoque por sabor</h3>
      <div class="flavors">
        ${data.flavors.map(f => `
          <div class="flavor">
            <div class="swatch" style="background:${f[1]}"></div>
            <strong>${f[0]}</strong>
            <div style="color:var(--muted);margin-top:5px">${f[2]}</div>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="notice">
      <strong>Atenção:</strong> os números desta tela são demonstrativos,
      não são dados reais do banco de dados.
    </div>
  `;
}

function table(headers, rows) {
  return `
    <div class="panel">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${rows.map(r => `
              <tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function demoAlert(message) {
  alert(message);
}

window.demoAlert = demoAlert;

const views = {
  dashboard: ["Dashboard", dashboard],

 
  sales: ["Vendas", () => `
    <div class="section-head">
      <h2>Pedidos de venda</h2>
      <button class="primary" onclick="abrirFormularioVenda()">
  + Novo pedido
</button>
    </div>
    <div id="nexo-vendas-reais">
      <p>Carregando vendas...</p>
    </div>
  `],


  production: ["Produção", () => `
    <div class="section-head">
      <h2>Produção por sabor</h2>
      <button class="primary" onclick="demoAlert('Registro de produção ainda não ativado.')">
        + Registrar produção
      </button>
    </div>
    ${table(
      ["SABOR", "PRODUZIDO HOJE", "UNIDADE"],
      [
        ["Coco", "240", "pacotes"],
        ["Melancia", "320", "pacotes"],
        ["Morango", "180", "pacotes"],
        ["Maracujá", "200", "pacotes"],
        ["Maçã verde", "160", "pacotes"]
      ]
    )}
  `],

  stock: ["Estoque", () => `
    <div class="section-head">
      <h2>Controle de estoque</h2>
      <button class="primary" onclick="demoAlert('Movimentação real ainda não ativada.')">
        + Movimentar estoque
      </button>
    </div>
    ${table(
      ["PRODUTO", "SALDO ILUSTRATIVO", "UNIDADE"],
      data.flavors.map(f => [
        f[0],
        f[2].split(" ")[0],
        "pacotes"
      ])
    )}
  `],


finance: ["Financeiro", () => `
  <div class="section-head">
    <h2>Fluxo de caixa</h2>
    <button class="primary" onclick="abrirFormularioFinanceiro()">
      + Novo lançamento
    </button>
  </div>

  <div id="nexo-resumo-financeiro" class="grid">
    <div class="metric">
      <div class="metric-head">A receber</div>
      <div class="metric-value">Carregando...</div>
    </div>
    <div class="metric">
      <div class="metric-head">A pagar</div>
      <div class="metric-value">Carregando...</div>
    </div>
    <div class="metric">
      <div class="metric-head">Saldo realizado</div>
      <div class="metric-value">Carregando...</div>
    </div>
  </div>

  <div id="nexo-lancamentos-financeiros" class="panel">
    <p>Carregando lançamentos financeiros...</p>
  </div>
`],


  
customers: ["Clientes", () => `
  <div class="section-head">
    <h2>Clientes</h2>
    <button class="primary" onclick="abrirFormularioCliente()">
      + Novo cliente
    </button>
  </div>
  <div id="nexo-clientes-reais">
    <p>Carregando clientes...</p>
  </div>
`],


  settings: ["Configurações", () => `
    <div class="panel">
      <h3>Configuração do sistema</h3>
      <p class="panel-sub">NEXO ERP PRO</p>
      <div class="notice">
        O sistema ainda precisa de testes de banco de dados,
        permissões e operações reais antes do uso empresarial.
      </div>
    </div>
  `]
};




function render(view) {
  const selected = views[view] || views.dashboard;

  title.textContent = selected[0];
  content.innerHTML = selected[1]();

  document.querySelectorAll(".nav-item").forEach(button => {
    button.classList.toggle("active", button.dataset.view === view);
  });

  sidebar.classList.remove("open");

  if (view === "sales") {
    carregarVendasNexo();
  }

  if (view === "customers") {
    carregarClientesNexo();
  }

  if (view === "finance") {
    carregarFinanceiroNexo();
  }
}

document.querySelectorAll(".nav-item").forEach(button => {
  button.addEventListener("click", () => render(button.dataset.view));
});

menuButton.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});


document.addEventListener("click", event => {
  if (
    window.innerWidth <= 700 &&
    sidebar.classList.contains("open") &&
    !sidebar.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
    sidebar.classList.remove("open");
  }
});
async function carregarVendasNexo() {
  const area = document.getElementById("nexo-vendas-reais");
  if (!area) return;

  area.innerHTML = "<p>Carregando vendas...</p>";

  const { data: vendas, error } = await nexoSupabase
    .from("nexo_sales")
    .select("id, customer_id, sale_date, status, total, notes, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    area.innerHTML =
      '<div class="notice">Não foi possível carregar as vendas. Verifique as permissões do Supabase.</div>';
    console.error("Erro ao carregar vendas:", error);
    return;
  }

  if (!vendas || vendas.length === 0) {
    area.innerHTML = "<p>Nenhuma venda cadastrada ainda.</p>";
    return;
  }

  const { data: clientes, error: erroClientes } = await nexoSupabase
    .from("nexo_customers")
    .select("id, name");

  if (erroClientes) {
    console.error("Erro ao carregar clientes:", erroClientes);
  }

  const nomesClientes = Object.fromEntries(
    (clientes || []).map(cliente => [cliente.id, cliente.name])
  );

  const moeda = valor =>
    Number(valor || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

  const escapar = valor =>
    String(valor ?? "").replace(/[&<>"']/g, caractere => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[caractere]);

  area.innerHTML = `
    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>DATA</th>
            <th>CLIENTE</th>
            <th>VALOR</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          ${vendas.map(venda => `
            <tr>
              <td>${escapar(venda.sale_date || venda.created_at?.slice(0, 10) || "-")}</td>
              <td>${escapar(nomesClientes[venda.customer_id] || "Cliente não identificado")}</td>
              <td>${escapar(moeda(venda.total))}</td>
              <td>${escapar(venda.status || "Sem status")}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}


/* ==========================================
   AUTENTICAÇÃO
   ========================================== */

async function nexoLogin(email, password) {
  if (!nexoSupabase) {
    throw new Error("Conexão com o Supabase indisponível.");
  }

  const { data, error } = await nexoSupabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;

  return data;
}

async function nexoLogout() {
  if (!nexoSupabase) {
    throw new Error("Conexão com o Supabase indisponível.");
  }

  const { error } = await nexoSupabase.auth.signOut();

  if (error) throw error;
}

function nexoShowLogin(message = "") {
  sidebar.style.display = "none";
  menuButton.style.display = "none";
  title.textContent = "Acesso ao sistema";

  const logoutButton = document.getElementById("nexoLogoutButton");
  if (logoutButton) logoutButton.remove();

  content.innerHTML = `
    <div style="max-width:420px;margin:45px auto;padding:28px;
      background:var(--panel,#fff);border:1px solid #333;border-radius:16px;">
      <h2>NEXO ERP PRO</h2>
      <p>Entre com seu usuário autorizado para continuar.</p>
      <form id="nexoLoginForm">
        <label for="nexoEmail">E-mail</label>
        <input id="nexoEmail" type="email" required autocomplete="username"
          style="display:block;width:100%;box-sizing:border-box;padding:12px;margin:8px 0 16px;">
        <label for="nexoPassword">Senha</label>
        <input id="nexoPassword" type="password" required autocomplete="current-password"
          style="display:block;width:100%;box-sizing:border-box;padding:12px;margin:8px 0 16px;">
        <button id="nexoLoginButton" class="primary" type="submit"
          style="width:100%;padding:13px;">Entrar</button>
        <p id="nexoLoginMessage" role="alert" style="color:#d94d50;margin-top:14px;"></p>
      </form>
      <button id="nexoForgotPassword" type="button"
        style="margin-top:10px;background:transparent;border:0;text-decoration:underline;cursor:pointer;">
        Esqueci minha senha
      </button>
    </div>
  `;

  document.getElementById("nexoLoginMessage").textContent = message;

  document.getElementById("nexoLoginForm").addEventListener("submit", nexoHandleLogin);
  document.getElementById("nexoForgotPassword").addEventListener("click", nexoHandleForgotPassword);
}

async function nexoHandleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("nexoEmail").value.trim();
  const password = document.getElementById("nexoPassword").value;
  const button = document.getElementById("nexoLoginButton");
  const message = document.getElementById("nexoLoginMessage");

  button.disabled = true;
  button.textContent = "Verificando...";
  message.textContent = "";

  try {
    await nexoLogin(email, password);

    const { data: member, error } = await nexoSupabase.rpc("nexo_is_member");

    if (error) throw error;

    if (member !== true) {
      await nexoLogout();
      throw new Error("Usuário sem autorização para acessar o NEXO.");
    }

    nexoShowDashboard();
  } catch (error) {
    message.textContent = error.message || "Não foi possível entrar.";
    button.disabled = false;
    button.textContent = "Entrar";
  }
}

function nexoShowDashboard() {
  sidebar.style.display = "";
  menuButton.style.display = "";

  render("dashboard");

  let button = document.getElementById("nexoLogoutButton");

  if (!button) {
    button = document.createElement("button");
    button.id = "nexoLogoutButton";
    button.textContent = "Sair";
    button.className = "primary";
    button.style.cssText =
      "position:fixed;right:16px;top:12px;z-index:9999;padding:9px 16px;";
    document.body.appendChild(button);

    button.addEventListener("click", async () => {
      button.disabled = true;

      try {
        await nexoLogout();
        nexoShowLogin("Você saiu do sistema.");
      } catch (error) {
        alert("Não foi possível sair: " + error.message);
        button.disabled = false;
      }
    });
  }
}

function nexoShowPasswordUpdate() {
  sidebar.style.display = "none";
  menuButton.style.display = "none";
  title.textContent = "Nova senha";

  content.innerHTML = `
    <div style="max-width:420px;margin:40px auto;padding:24px;
      border:1px solid #444;border-radius:14px;">
      <h2>Definir nova senha</h2>
      <p>Crie uma nova senha para acessar o NEXO ERP PRO.</p>
      <form id="nexoPasswordUpdateForm">
        <label for="nexoNewPassword">Nova senha</label>
        <input id="nexoNewPassword" type="password" minlength="8"
          autocomplete="new-password" required
          style="display:block;box-sizing:border-box;width:100%;padding:12px;margin:10px 0 16px;">
        <button class="primary" type="submit">Salvar nova senha</button>
        <p id="nexoPasswordUpdateMessage" role="alert"></p>
      </form>
    </div>
  `;

  document.getElementById("nexoPasswordUpdateForm").addEventListener("submit", async event => {
    event.preventDefault();

    const message = document.getElementById("nexoPasswordUpdateMessage");
    const password = document.getElementById("nexoNewPassword").value;

    message.textContent = "Salvando...";

    try {
      const { error } = await nexoSupabase.auth.updateUser({ password });

      if (error) throw error;

      await nexoLogout();
      nexoShowLogin("Senha alterada. Faça login novamente.");
    } catch (error) {
      message.textContent = error.message || "Não foi possível atualizar a senha.";
    }
  });
}

async function nexoHandleForgotPassword() {
  if (!nexoSupabase) {
    nexoShowLogin("Conexão com o Supabase indisponível.");
    return;
  }

  const emailInput = document.getElementById("nexoEmail");
  const email = emailInput.value.trim();
  const message = document.getElementById("nexoLoginMessage");

  if (!email) {
    message.textContent = "Digite seu e-mail antes de solicitar a recuperação.";
    return;
  }

  try {
    const { error } = await nexoSupabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + window.location.pathname
    });

    if (error) throw error;

    message.textContent = "Se o e-mail estiver cadastrado, você receberá as instruções.";
  } catch (error) {
    console.error("NEXO recuperação:", error);
    message.textContent = "Não foi possível solicitar a recuperação. Tente mais tarde.";
  }
}

async function nexoStartAuth() {
  if (!nexoSupabase) {
    nexoShowLogin("A conexão com o Supabase não foi inicializada.");
    return;
  }

  try {
    const { data, error } = await nexoSupabase.auth.getSession();

    if (error) throw error;

    const isRecovery =
      window.location.hash.includes("type=recovery") ||
      window.location.search.includes("type=recovery");

    if (isRecovery && data.session) {
      nexoShowPasswordUpdate();
      return;
    }

    if (!data.session) {
      nexoShowLogin();
      return;
    }

    const { data: member, error: memberError } =
      await nexoSupabase.rpc("nexo_is_member");

    if (memberError) throw memberError;

    if (member === true) {
      nexoShowDashboard();
      return;
    }

    await nexoLogout();
    nexoShowLogin("Usuário sem autorização para acessar o NEXO.");
  } catch (error) {
    console.error("NEXO autenticação:", error);
    nexoShowLogin("Falha ao verificar o acesso. Confira a conexão e tente novamente.");
  }
}

nexoStartAuth();

async function abrirFormularioVenda() {
  const area = document.getElementById("nexo-vendas-reais");
  if (!area) return;

  area.innerHTML = "<p>Carregando clientes...</p>";

  const { data: clientes, error } = await nexoSupabase
    .from("nexo_customers")
    .select("id, name")
    .order("name");

  if (error) {
    console.error("Erro ao carregar clientes:", error);
    area.innerHTML =
      '<div class="notice">Não foi possível carregar os clientes.</div>';
    return;
  }

  if (!clientes || clientes.length === 0) {
    area.innerHTML = `
      <div class="notice">
        Cadastre um cliente antes de criar uma venda.
      </div>
      <button class="primary" onclick="carregarVendasNexo()">
        Voltar para vendas
      </button>
    `;
    return;
  }

  area.innerHTML = `
    <div class="section-head">
      <h2>Novo pedido de venda</h2>
    </div>

    <form id="form-nova-venda">
      <label for="venda-cliente">Cliente</label>
      <select id="venda-cliente" required>
        <option value="">Selecione um cliente</option>
        ${clientes.map(cliente => `
          <option value="${String(cliente.id).replace(/&/g, "&amp;").replace(/"/g, "&quot;")}">
            ${String(cliente.name || "").replace(/[&<>"']/g, c => ({
              "&": "&amp;", "<": "&lt;", ">": "&gt;",
              '"': "&quot;", "'": "&#39;"
            })[c])}
          </option>
        `).join("")}
      </select>

      <label for="venda-data">Data da venda</label>
      <input id="venda-data" type="date"
        value="${new Date().toLocaleDateString("en-CA")}" required>

      <label for="venda-valor">Valor total (R$)</label>
      <input id="venda-valor" type="number"
        min="0.01" step="0.01" placeholder="0,00" required>

      <label for="venda-status">Status</label>
      <select id="venda-status" required>
        <option value="Pendente">Pendente</option>
        <option value="Pago">Pago</option>
        <option value="Cancelado">Cancelado</option>
      </select>

      <label for="venda-observacoes">Observações</label>
      <textarea id="venda-observacoes"
        placeholder="Observações do pedido"></textarea>

      <button class="primary" type="submit">Salvar venda</button>
      <button type="button" onclick="carregarVendasNexo()">
        Cancelar
      </button>

      <p id="venda-mensagem" role="status"></p>
    </form>
  `;

  document.getElementById("form-nova-venda")
    .addEventListener("submit", salvarVendaNexo);
}


async function salvarVendaNexo(event) {
  event.preventDefault();

  const formulario = document.getElementById("form-nova-venda");
  const mensagem = document.getElementById("venda-mensagem");
  const botao = formulario.querySelector('button[type="submit"]');

  const clienteId = document.getElementById("venda-cliente").value;
  const dataVenda = document.getElementById("venda-data").value;
  const valor = Number(document.getElementById("venda-valor").value);
  const status = document.getElementById("venda-status").value;
  const observacoes = document.getElementById("venda-observacoes").value.trim();

  if (!clienteId || !dataVenda || !Number.isFinite(valor) || valor <= 0) {
    mensagem.textContent = "Preencha os campos corretamente.";
    return;
  }

  botao.disabled = true;
  mensagem.textContent = "Salvando venda...";

  const { error } = await nexoSupabase
    .from("nexo_sales")
    .insert({
      customer_id: clienteId,
      sale_date: dataVenda,
      status: status,
      total: valor,
      notes: observacoes || null
    });

  if (error) {
    console.error("Erro ao salvar venda:", error);
    mensagem.textContent =
      "Não foi possível salvar. Verifique as permissões do Supabase.";
    botao.disabled = false;
    return;
  }

  alert("Venda cadastrada com sucesso!");
  await carregarVendasNexo();
}


async function carregarClientesNexo() {
  const area = document.getElementById("nexo-clientes-reais");
  if (!area) return;

  area.innerHTML = "<p>Carregando clientes...</p>";

  const { data: clientes, error } = await nexoSupabase
    .from("nexo_customers")
    .select("id, name, customer_type, phone, email")
    .order("name", { ascending: true });

  if (error) {
    console.error("Erro ao carregar clientes:", error);
    area.innerHTML =
      '<div class="notice">Não foi possível carregar os clientes. Verifique as permissões do Supabase.</div>';
    return;
  }

  if (!clientes || clientes.length === 0) {
    area.innerHTML = "<p>Nenhum cliente cadastrado ainda.</p>";
    return;
  }

  const escapar = valor =>
    String(valor ?? "").replace(/[&<>"']/g, c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[c]);

  area.innerHTML = `
    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>NOME</th>
            <th>PERFIL</th>
            <th>TELEFONE</th>
            <th>E-MAIL</th>
          </tr>
        </thead>
        <tbody>
          ${clientes.map(cliente => `
            <tr>
              <td>${escapar(cliente.name)}</td>
              <td>${escapar(cliente.customer_type || "Não informado")}</td>
              <td>${escapar(cliente.phone || "-")}</td>
              <td>${escapar(cliente.email || "-")}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

window.abrirFormularioCliente = abrirFormularioCliente;
window.salvarClienteNexo = salvarClienteNexo;

function abrirFormularioCliente() {
  const area = document.getElementById("nexo-clientes-reais");

  if (!area) {
    alert("Não foi possível abrir o formulário de clientes.");
    return;
  }

  area.insertAdjacentHTML("afterbegin", `
    <form id="nexo-form-cliente" style="background:#222;padding:16px;border-radius:12px;margin-bottom:16px;color:white;">
      <h3>Novo cliente</h3>

      <label>Nome *</label>
      <input name="name" required placeholder="Nome do cliente" style="display:block;width:100%;padding:12px;margin:8px 0 14px;box-sizing:border-box;">

      <label>Tipo de cliente</label>
      <select name="customer_type" style="display:block;width:100%;padding:12px;margin:8px 0 14px;">
        <option value="Distribuidora">Distribuidora</option>
        <option value="Comércio">Comércio</option>
        <option value="Consumidor final">Consumidor final</option>
        <option value="Outro">Outro</option>
      </select>

      <label>Telefone</label>
      <input name="phone" placeholder="Telefone" style="display:block;width:100%;padding:12px;margin:8px 0 14px;box-sizing:border-box;">

      <label>E-mail</label>
      <input name="email" type="email" placeholder="E-mail" style="display:block;width:100%;padding:12px;margin:8px 0 14px;box-sizing:border-box;">

      <label>Endereço</label>
      <input name="address" placeholder="Endereço" style="display:block;width:100%;padding:12px;margin:8px 0 14px;box-sizing:border-box;">

      <label>Observações</label>
      <textarea name="notes" placeholder="Observações" style="display:block;width:100%;padding:12px;margin:8px 0 14px;box-sizing:border-box;"></textarea>

      <button type="submit" style="padding:12px 18px;">Salvar cliente</button>
      <button type="button" onclick="document.getElementById('nexo-form-cliente').remove()" style="padding:12px 18px;">Cancelar</button>
      <p id="nexo-cliente-mensagem"></p>
    </form>
  `);

  document.getElementById("nexo-form-cliente").addEventListener("submit", salvarClienteNexo);
}

async function salvarClienteNexo(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const mensagem = document.getElementById("nexo-cliente-mensagem");
  const botao = form.querySelector('button[type="submit"]');

  if (!nexoSupabase) {
    mensagem.textContent = "Conexão com o banco de dados indisponível.";
    return;
  }

  const dados = Object.fromEntries(new FormData(form).entries());

  botao.disabled = true;
  mensagem.textContent = "Salvando cliente...";

  try {
    const { data: sessaoData, error: sessaoErro } =
      await nexoSupabase.auth.getSession();

    if (sessaoErro) throw sessaoErro;

    if (!sessaoData.session) {
      throw new Error("Sua sessão expirou. Entre novamente no NEXO.");
    }

    const { error } = await nexoSupabase
      .from("nexo_customers")
      .insert([dados]);

    if (error) throw error;

    mensagem.textContent = "Cliente cadastrado com sucesso!";
    form.reset();

    await carregarClientesNexo();
    form.remove();
  } catch (erro) {
    console.error("Erro ao salvar cliente:", erro);
    mensagem.textContent = "Erro ao salvar: " + erro.message;
    botao.disabled = false;
  }
}

window.abrirFormularioFinanceiro = abrirFormularioFinanceiro;
window.salvarFinanceiroNexo = salvarFinanceiroNexo;

let filtroFinanceiroNexo = "todos";
async function carregarFinanceiroNexo() {
  const resumo = document.getElementById("nexo-resumo-financeiro");
  const lista = document.getElementById("nexo-lancamentos-financeiros");

  if (!resumo || !lista) return;

  if (!nexoSupabase) {
    lista.innerHTML = "<p>Conexão com o banco indisponível.</p>";
    return;
  }

  lista.innerHTML = "<p>Carregando lançamentos...</p>";

  const { data, error } = await nexoSupabase
    .from("nexo_finance")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao carregar financeiro:", error);
    lista.innerHTML = "<p>Não foi possível carregar os lançamentos financeiros.</p>";
    return;
  }

  const lancamentos = data || [];
     console.log("Lançamentos financeiros:", lancamentos); 
  const moeda = valor =>
    Number(valor || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

  const pendente = item => item.status === "Pendente";
  const pago = item => item.status === "Pago";


  const aReceber = lancamentos
    .filter(item =>
      item.entry_type === "receber" && pendente(item)
    )
    .reduce((total, item) => total + Number(item.amount), 0);

  const aPagar = lancamentos
    .filter(item =>
      item.entry_type === "pagar" && pendente(item)
    )
    .reduce((total, item) => total + Number(item.amount), 0);

  const saldo = lancamentos.reduce((total, item) => {
    if (!pago(item)) return total;

    return total + (
      item.entry_type === "receber"
        ? Number(item.amount)
        : -Number(item.amount)
    );
  }, 0);

   
  resumo.innerHTML = `
    <div class="metric">
      <div class="metric-head">A receber</div>
      <div class="metric-value">${moeda(aReceber)}</div>
    </div>
    <div class="metric">
      <div class="metric-head">A pagar</div>
      <div class="metric-value">${moeda(aPagar)}</div>
    </div>
    <div class="metric">
      <div class="metric-head">Saldo realizado</div>
      <div class="metric-value">${moeda(saldo)}</div>
    </div>
  `;

  if (lancamentos.length === 0) {
    lista.innerHTML = `
      <div class="panel">
        <p>Nenhum lançamento financeiro cadastrado.</p>
        <p>Use “+ Novo lançamento” para começar.</p>
      </div>
    `;
    return;
  }

  const escapar = valor =>
    String(valor ?? "").replace(/[&<>"']/g, caractere => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[caractere]);


lista.innerHTML = `
    <div class="panel">
      <h3>Lançamentos financeiros</h3>

      <label for="nexo-filtro-financeiro">Filtrar lançamentos</label>
      <select id="nexo-filtro-financeiro"
        onchange="alterarFiltroFinanceiroNexo(this.value)">
        <option value="todos" ${filtroFinanceiroNexo === "todos" ? "selected" : ""}>Todos</option>
        <option value="receber" ${filtroFinanceiroNexo === "receber" ? "selected" : ""}>A receber</option>
        <option value="pagar" ${filtroFinanceiroNexo === "pagar" ? "selected" : ""}>A pagar</option>
        <option value="Pendente" ${filtroFinanceiroNexo === "Pendente" ? "selected" : ""}>Pendentes</option>
        <option value="Pago" ${filtroFinanceiroNexo === "Pago" ? "selected" : ""}>Pagos</option>
        <option value="vencidos" ${filtroFinanceiroNexo === "vencidos" ? "selected" : ""}>Vencidos</option>
      </select> 
      <div style="overflow-x:auto">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tipo</th>
              <th>Categoria</th>
               <th>Vencimento</th>
                <th>Data de pagamento</th>
                <th>Status</th>
               <th>Valor</th>
            </tr>
          </thead>
          </tbody>      
          
${lancamentos.filter(item => {
              const agora = new Date();
              const hoje =
                agora.getFullYear() + "-" +
                String(agora.getMonth() + 1).padStart(2, "0") + "-" +
                String(agora.getDate()).padStart(2, "0");

              if (filtroFinanceiroNexo === "receber") {
                return item.entry_type === "receber";
              }

              if (filtroFinanceiroNexo === "pagar") {
                return item.entry_type === "pagar";
              }

              if (filtroFinanceiroNexo === "Pendente") {
                return item.status === "Pendente";
              }

              if (filtroFinanceiroNexo === "Pago") {
                return item.status === "Pago";
              }

              if (filtroFinanceiroNexo === "vencidos") {
                return item.status === "Pendente" &&
                  item.due_date &&
                  item.due_date < hoje;
              }

              return true;
            }).map(item => {

              const vencido =
                item.status === "Pendente" &&
                item.due_date &&
                item.due_date < new Date().toLocaleDateString("en-CA");

              return `
              <tr style="${vencido ? 'background:#fff0f0;color:#b42318;' : ''}">

              
                <td>${escapar(item.description)}</td>
                <td>${escapar(
                  item.entry_type === "receber" ? "Entrada" : "Saída"
                )}</td>
                <td>${escapar(item.category || "-")}</td>                
                 <td>${item.due_date
                  ? escapar(item.due_date.split("-").reverse().join("/"))
                  : "-"}</td>
                   <td>${item.payment_date
                  ? escapar(item.payment_date.split("-").reverse().join("/"))
                  : "-"}</td>
                  <td>
                  <select

                    class="nexo-status-financeiro"
                    data-id="${escapar(item.id)}"
                    onchange="atualizarStatusFinanceiroNexo(this)"
                  >
                    <option value="Pendente" ${item.status === "Pendente" ? "selected" : ""}>Pendente</option>
                    <option value="Pago" ${item.status === "Pago" ? "selected" : ""}>Pago</option>
                    <option value="Cancelado" ${item.status === "Cancelado" ? "selected" : ""}>Cancelado</option>
                  </select>
                </td>
                <td>${moeda(item.amount)}</td>
              </tr>          
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}


function abrirFormularioFinanceiro() {
  const lista = document.getElementById("nexo-lancamentos-financeiros");
  if (!lista) return;

  lista.innerHTML = `
    <div class="panel">
      <h3>Novo lançamento financeiro</h3>
      

      <form onsubmit="salvarFinanceiroNexo(event)">
        <label>Descrição</label>
        <input name="description" required maxlength="150"
          placeholder="Ex.: Compra de matéria-prima">


        <label>Tipo</label>
        <select name="type" required>
          <option value="Entrada">Entrada</option>
          <option value="Saída">Saída</option>
        </select>


        <label>Valor (R$)</label>
        <input name="amount" type="number" min="0.01"
          step="0.01" required placeholder="0,00">


        <label>Status</label>
        <select name="status" required>
          <option value="Pendente">Pendente</option>
          <option value="Pago">Pago</option>
          <option value="Cancelado">Cancelado</option>
        </select>


        <label>Data de vencimento</label>
        <input name="due_date" type="date">

        <label>Data de pagamento</label>
        <input name="payment_date" type="date">


        
<label>Categoria</label>
<select name="category" required>
  <option value="">Selecione uma categoria</option>
  <option value="Vendas">Vendas</option>
  <option value="Fornecedores">Fornecedores</option>
  <option value="Energia">Energia</option>
  <option value="Aluguel">Aluguel</option>
  <option value="Transporte">Transporte</option>
  <option value="Impostos">Impostos</option>
  <option value="Equipamentos">Equipamentos</option>
  <option value="Outros">Outros</option>
</select>


          
        <label>Observações</label>
        <textarea name="notes" rows="3"></textarea>

        <button class="primary" type="submit">
          Salvar lançamento
        </button>

        <button type="button"
          onclick="carregarFinanceiroNexo()">
          Cancelar
        </button>
      </form>
    </div>
  `;
}


function alterarFiltroFinanceiroNexo(filtro) {
  filtroFinanceiroNexo = filtro;
  carregarFinanceiroNexo();
}

async function atualizarStatusFinanceiroNexo(select) {
  const id = select.dataset.id;
  const novoStatus = select.value;

  select.disabled = true;

  try {
    const atualizacao = {
      status: novoStatus,
      payment_date: novoStatus === "Pago"
        ? new Date().toLocaleDateString("en-CA")
        : null
    };

    const { error } = await nexoSupabase
      .from("nexo_finance")
      .update(atualizacao)
      .eq("id", id);

    if (error) throw error;

    alert("Status e data de pagamento atualizados com sucesso!");

    await carregarFinanceiroNexo();

  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    alert("Não foi possível atualizar o lançamento: " + error.message);
    await carregarFinanceiroNexo();

  } finally {
    select.disabled = false;
  }
}


async function salvarFinanceiroNexo(event) {
  event.preventDefault();

  const form = event.target;
  const dados = new FormData(form);

  const descricao = String(dados.get("description") || "").trim();
  const valor = Number(dados.get("amount"));
  const tipo = String(dados.get("type") || "");
  const status = String(dados.get("status") || "");

   
  if (!descricao || !Number.isFinite(valor) || valor <= 0) {
    alert("Informe uma descrição e um valor válido.");
    return;
  }

  if (!nexoSupabase) {
    alert("Conexão com o banco indisponível.");
    return;
  }

  const { data: sessaoData, error: sessaoError } =
    await nexoSupabase.auth.getSession();

  if (sessaoError || !sessaoData.session) {
    alert("Sua sessão expirou. Entre novamente no NEXO.");
    return;
  }

  const dataPagamento = dados.get("payment_date") ||
    (status === "Pago"
      ? new Date().toLocaleDateString("en-CA")
      : null);

  const lancamento = {
    description: descricao,
    entry_type: tipo === "Entrada" ? "receber" : "pagar",
    amount: valor,
    status: status,
    due_date: dados.get("due_date") || null,
    payment_date: dataPagamento,
    category: String(dados.get("category") || "").trim() || null,
    notes: String(dados.get("notes") || "").trim() || null
  };

   alert(
  "Dados enviados ao banco:\n" +
  JSON.stringify(lancamento, null, 2)
);

  const botao = form.querySelector('button[type="submit"]');

  if (botao) {
    botao.disabled = true;
    botao.textContent = "Salvando...";
  }

  const { error } = await nexoSupabase
    .from("nexo_finance")
    .insert(lancamento);

  if (error) {
    console.error("Erro ao salvar lançamento:", error);

    alert(
      "Erro ao salvar lançamento:\n" +
      error.message
    );

    if (botao) {
      botao.disabled = false;
      botao.textContent = "Salvar lançamento";
    }
    return;
  }

  alert("Lançamento financeiro salvo com sucesso!");
  await carregarFinanceiroNexo();
}


