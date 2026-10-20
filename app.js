
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
  sales: [
    ["#NX-0018", "Distribuidora Central", "R$ 1.240,00", "Pago"],
    ["#NX-0017", "Bar do Parque", "R$ 680,00", "Pendente"],
    ["#NX-0016", "Adega Avenida", "R$ 920,00", "Pago"],
    ["#NX-0015", "Distribuidora União", "R$ 1.560,00", "Pago"]
  ],
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
      <button class="primary" onclick="demoAlert('Cadastro real ainda não ativado.')">
        + Novo pedido
      </button>
    </div>
    ${table(
      ["PEDIDO", "CLIENTE", "VALOR", "STATUS"],
      data.sales
    )}
    <div class="notice">Pedidos ilustrativos. O cadastro real ainda precisa ser implementado.</div>
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
      <h2>Resumo financeiro</h2>
      <button class="primary" onclick="demoAlert('Lançamentos reais ainda não ativados.')">
        + Novo lançamento
      </button>
    </div>
    <div class="grid">
      <div class="metric">
        <div class="metric-head">A receber</div>
        <div class="metric-value">R$ 6.320</div>
      </div>
      <div class="metric">
        <div class="metric-head">A pagar</div>
        <div class="metric-value">R$ 3.480</div>
      </div>
      <div class="metric">
        <div class="metric-head">Saldo projetado</div>
        <div class="metric-value">R$ 8.760</div>
      </div>
    </div>
    ${table(
      ["DATA", "DESCRIÇÃO", "TIPO", "VALOR"],
      [
        ["05/10/2026", "Pedido demonstrativo", "Entrada", "R$ 1.240,00"],
        ["06/10/2026", "Compra de embalagens", "Saída", "R$ 460,00"]
      ]
    )}
  `],

  customers: ["Clientes", () => `
    <div class="section-head">
      <h2>Clientes</h2>
      <button class="primary" onclick="demoAlert('Cadastro real de clientes ainda não ativado.')">
        + Novo cliente
      </button>
    </div>
    ${table(
      ["NOME", "PERFIL", "ÚLTIMO PEDIDO"],
      [
        ["Distribuidora Central", "Distribuidora", "#NX-0018"],
        ["Bar do Parque", "Bar", "#NX-0017"],
        ["Adega Avenida", "Adega", "#NX-0016"]
      ]
    )}
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
}

document.querySelectorAll(".nav-item").forEach(button => {
  button.addEventListener("click", () => render(button.dataset.view));
});

menuButton.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

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
