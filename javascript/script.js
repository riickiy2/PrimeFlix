// ══════════════════════════════════════
// NAVEGAÇÃO LOGIN / CADASTRO
// ══════════════════════════════════════

function mostrarCadastro() {
  document.getElementById("login").style.display = "none";
  document.getElementById("cadastro").style.display = "block";
  irParaEtapa(1);
}

function mostrarLogin() {
  document.getElementById("login").style.display = "block";
  document.getElementById("cadastro").style.display = "none";
}

// ══════════════════════════════════════
//          CONTROLE DE ETAPAS
// ══════════════════════════════════════

function irParaEtapa(n) {
  //aqui esconde as etapas
  [1, 2, 3].forEach((i) => {
    document.getElementById("etapa" + i).style.display = "none";
  });

  //mostra a etapa desejada
  document.getElementById("etapa" + n).style.display = "block";

  // aqui atualiza o indicador visual
  [1, 2, 3].forEach((i) => {
    const dot = document.getElementById("step-dot-" + i);
    dot.classList.remove("active", "done");
    if (i < n) dot.classList.add("done");
    if (i === n) dot.classList.add("active");
  });

  // atualiza as linhas entre os steps
  document.querySelectorAll(".step-line").forEach((line, idx) => {
    line.classList.toggle("done", idx + 1 < n);
  });
}

function voltarEtapa(n) {
  irParaEtapa(n);
}

// ETAPA 1: Validação de dados pessoais
function avancarEtapa1() {
  limparErros();
  let erro = false;

  const nome = document.getElementById("nome").value.trim();
  const nomeMae = document.getElementById("nomeMae").value.trim();
  const cpf = document.getElementById("cpf").value;
  const celular = document.getElementById("celular").value;

  if (nome.length < 15 || nome.length > 60) {
    marcarErro("nome", "Nome deve ter entre 15 e 60 caracteres");
    erro = true;
    showToast(
      "Preencha o nome corretamente!.",
      "warning",
    );
  }
  if (nomeMae.length < 15 || nomeMae.length > 60) {
    marcarErro("nomeMae", "Nome deve ter entre 15 e 60 caracteres");
    erro = true;
     showToast(
      "Preencha o nome corretamente!.",
      "warning",
    );
  }
  if (cpf.length < 14) {
    marcarErro("cpf", "CPF inválido");
    erro = true;
    showToast(
      "CPF invalido. Digite um cpf valido!",
      "warning",
    );
  }
  if(celular.length < 15 || celular.length > 15 ){
    marcarErro("celular", "Celular invalido");
    erro = true;
    showToast(
      "Celular invalido. Digite um numero de celular valido!",
      "warning",
    );
  }

  if (!erro) irParaEtapa(2);
}

// ETAPA 2: Adicionar endereço
function avancarEtapa2() {
  const rua = document.getElementById("rua").value.trim();
  const numero = document.getElementById("numero").value.trim();

  if (!rua) {
    showToast(
      "Preencha o endereço! Use o botão Buscar para preencher pelo CEP.",
      "warning",
    );
    return;
  }
  if (!numero) {
    document.getElementById("numero").focus();
    return;
  }

  irParaEtapa(3);
}

// ══════════════════════════════════════
//               CADASTRO
// ══════════════════════════════════════
function cadastrar() {
  limparErros();
  let erro = false;

  const user = document.getElementById("cadUser").value.trim();
  const pass = document.getElementById("cadPass").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;

  if (!user) {
    showToast("Informe um nome de usuário", "warning");
    return;
  }
  if (pass.length < 8) {
    marcarErro("cadPass", "Senha deve ter no mínimo 8 caracteres");
    erro = true;
  }
  if (pass !== confirmarSenha) {
    marcarErro("confirmarSenha", "As senhas não coincidem");
    erro = true;
  }

  if (!erro) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push({ usuario: user, senha: pass });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    showToast("Conta criada com sucesso!", "success");
    window.location = "home.html";
  }
}

// ══════════════════════════════════════
//                LOGIN
// ══════════════════════════════════════
function fazerLogin() {
  const user = document.getElementById("loginUser").value;
  const pass = document.getElementById("loginPass").value;
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const encontrado = usuarios.find(
    (u) => u.usuario === user && u.senha === pass,
  );

  if (encontrado) {
    // SALVA QUE O USUÁRIO ESTÁ LOGADO
    localStorage.setItem("usuarioLogado", user);
    window.location = "home.html";
  } else {
    showToast("Usuário ou senha incorretos!", "error");
  }
}

// ══════════════════════════════════════
//  MÁSCARAS
// ══════════════════════════════════════
function mascaraCPF(input) {
  let valor = input.value;
  // Remove tudo que n é digito
  valor = valor.replace(/\D/g, "");
  //Adiciona os caracteres de formatação
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  input.value = valor;
}

function mascaraTel(input) {
  let value = input.value.replace(/\D/g, ""); // Remove não numéricos [4]
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2"); // Coloca parênteses no DDD [8]
  value = value.replace(/(\d)(\d{4})$/, "$1-$2"); // Coloca hífen [4]
  input.value = value;
}

function mascaraCep(input) {
  let v = input.value.replace(/\D/g, "");
  // Formata o CEP como 00000-000 enquanto o usuário digita
  if (v.length > 5) v = v.slice(0, 5) + "-" + v.slice(5, 8);
  input.value = v;
}

// ══════════════════════════════════════
//  Limpa formulario do CEP
// ══════════════════════════════════════
function limpa_formulario_cep() {
  document.getElementById("rua").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("uf").value = "";
  document.getElementById("numero").value = "";
}

// ══════════════════════════════════════
//  BUSCA DE CEP (ViaCEP)
// ══════════════════════════════════════

async function buscarCep() {
  const inputCep = document.getElementById("cep");
  const cep = inputCep.value.replace(/\D/g, "");

  if (cep.length !== 8) {
    showToast("CEP inválido! Digite 8 números.", "warning");
    limpa_formulario_cep();
    return;
  }

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();

    if (data.erro) {
      showToast("CEP não encontrado", "error");
    } else {
      document.getElementById("rua").value = data.logradouro;
      document.getElementById("bairro").value = data.bairro;
      document.getElementById("cidade").value = data.localidade;
      document.getElementById("uf").value = data.uf;
      document.getElementById("numero").focus();
    }
  } catch (e) {
    showToast("Erro ao buscar CEP", "error");
  }
}

// ══════════════════════════════════════
//  HELPERS DE ERRO
// ══════════════════════════════════════

function limparErros() {
  document.querySelectorAll(".erro").forEach((el) => (el.textContent = ""));
  document
    .querySelectorAll(".input-erro")
    .forEach((el) => el.classList.remove("input-erro"));
}

function marcarErro(id, mensagem) {
  const input = document.getElementById(id);
  if (input) input.classList.add("input-erro");

  const erroKey = "erro" + id.charAt(0).toUpperCase() + id.slice(1);
  const erroEl = document.getElementById(erroKey);
  if (erroEl) erroEl.textContent = mensagem;
}

// ══════════════════════════════════════
//  TOATS
// ══════════════════════════════════════

function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");

  // cria o toast
  const toast = document.createElement("div");

  // adiciona classes
  toast.className = `toast ${type}`;

  // texto
  toast.textContent = message;

  // coloca no HTML
  container.appendChild(toast);

  // pequena pausa para animação
  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  // remover após 3 segundos
  setTimeout(() => {
    toast.classList.remove("show");

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}
