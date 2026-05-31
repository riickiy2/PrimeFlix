function mostrarCadastro() {
  document.getElementById("login").style.display = "none";
  document.getElementById("cadastro").style.display = "block";
}

function mostrarLogin() {
  document.getElementById("login").style.display = "block";
  document.getElementById("cadastro").style.display = "none";
}

// ~~~~~~~~~~~~~~CADASTRAR~~~~~~~~~~~~~~
function cadastrar() {
  let user = document.getElementById("cadUser").value;
  let pass = document.getElementById("cadPass").value;
  let nome = document.getElementById("nome").value;
  let nomeMae = document.getElementById("nomeMae").value;
  let cpf = document.getElementById("cpf").value;
  let confirmarSenha = document.getElementById("confirmarSenha").value;

  document.querySelectorAll(".erro").forEach((el) => (el.textContent = ""));
  document
    .querySelectorAll(".input-erro")
    .forEach((el) => el.classList.remove("input-erro")); // ← adicione

  let erro = false;

  //SE HOUVER CAMPOS VAZIOS
  if (
    user === "" ||
    pass === "" ||
    nome === "" ||
    nomeMae === "" ||
    cpf === "" ||
    confirmarSenha === ""
  ) {
    alert("Preencha todos os campos!");
    return;
  }

  //NOME
  if (nome.length < 15 || nome.length > 60) {
    marcarErro("nome", "Nome deve ter entre 15 a 60 caracteres");
    erro = true;
  }

  //NOME MÃE
  if (nomeMae.length < 15 || nomeMae.length > 60) {
    marcarErro("nomeMae", "Nome deve ter entre 15 a 60 caracteres");
    erro = true;
  }

  //CPF
  if (cpf.length < 14) {
    marcarErro("cpf", "CPF inválido");
    erro = true;
  }

  //SENHA
  if (pass.length < 8) {
    marcarErro("cadPass", "Senha deve conter no mínimo 8 caracteres");
    erro = true;
  }

  //CONFIRMAR SENHA
  if (pass !== confirmarSenha) {
    marcarErro("confirmarSenha", "As senhas não coincidem");
    erro = true;
  }

  //SE NÃO HOUVER ERRO
  if (!erro) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios.push({ usuario: user, senha: pass });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado!");
    window.location = "home.html";
  }
}

// ~~~~~~~~~~~~~~LOGIN~~~~~~~~~~~~~~
function fazerLogin() {
  let user = document.getElementById("loginUser").value;
  let pass = document.getElementById("loginPass").value;

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  let encontrado = usuarios.find((u) => u.usuario === user && u.senha === pass);

  if (encontrado) {
    // SALVA QUE O USUÁRIO ESTÁ LOGADO
    localStorage.setItem("usuarioLogado", user);

    window.location = "home.html";
  } else {
    alert("Usuário ou senha incorretos!");
  }
}

// ~~~~~~~~~~~~~~MASCARA CPF~~~~~~~~~~~~~~
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

// ~~~~~~~~~~~~~~MASCARA TELEFONE~~~~~~~~~~~~~~
function mascaraTel(input) {
  let value = input.value.replace(/\D/g, ""); // Remove não numéricos [4]
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2"); // Coloca parênteses no DDD [8]
  value = value.replace(/(\d)(\d{4})$/, "$1-$2"); // Coloca hífen [4]
  input.value = value;
}

// ~~~~~~~~~~~~~~MASCARA CEP~~~~~~~~~~~~~~
function mascaraCep(input) {
  let v = input.value.replace(/\D/g, "");
  // Formata o CEP como 00000-000 enquanto o usuário digita
  if (v.length > 5) v = v.slice(0, 5) + "-" + v.slice(5, 8);
  input.value = v;
}

// ~~~~~~~~~~~~~~DEIXA O INPUT VERMELHO QUANDO ERRA~~~~~~~~~~~~~~
function marcarErro(id, mensagem) {
  document.getElementById(id).classList.add("input-erro");
  document.getElementById(
    "erro" + id.charAt(0).toUpperCase() + id.slice(1),
  ).textContent = mensagem;
}

// ~~~~~~~~~~~~~~LOGOUT~~~~~~~~~~~~~~

function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location = "index.html";
}

// ~~~~~~~~~~~ Valida o CEP ~~~~~~~~~~~

const btn = document.getElementById("btnBuscar");
const inputCep = document.getElementById("cep");

btn.addEventListener("click", async () => {
  const cep = inputCep.value.replace(/\D/g, "");
  if (cep.length !== 8) {
    alert("CEP inválido!");
    return;
  }

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();

    if (data.erro) {
      alert("CEP não encontrado!");
    } else {
      document.getElementById("rua").value = data.logradouro;
      document.getElementById("bairro").value = data.bairro;
      document.getElementById("cidade").value = data.localidade;
      document.getElementById("uf").value = data.uf;
      document.getElementById("numero").focus();
    }
  } catch (e) {
    alert("Erro ao buscar.");
  }
});
