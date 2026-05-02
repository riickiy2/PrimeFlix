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
    document.getElementById("erroNome").textContent =
      "Nome deve ter entre 15 a 60 caracteres";
    erro = true;
  }

  //NOME MÃE
  if (nomeMae.length < 15 || nomeMae.length > 60) {
    document.getElementById("erroNomeMae").textContent =
      "Nome deve ter entre 15 a 60 caracteres";
    erro = true;
  }

  //CPF
  if (cpf.length < 14) {
    document.getElementById("erroCpf").textContent = "CPF invalido";
    erro = true;
  }

  //SENHA
  if (pass.length < 8) {
    document.getElementById("erroSenha").textContent =
      "Senha deve conter no minimo 8 caracteres";
    erro = true;
  }

  //CONFIRMAR SENHA
  if (pass !== confirmarSenha) {
    document.getElementById("erroConfirmar").textContent =
      "As senhas não coincidem";
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
// ~~~~~~~~~~~~~~LOGOUT~~~~~~~~~~~~~~

function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location = "index.html";
}

// ~~~~~~~~~~~~~~CARROSSEL~~~~~~~~~~~~~~
const track = document.getElementById("track");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let index = 0;
const cardWidth = 220; // largura + margem
const totalCards = document.querySelectorAll(".card").length;
const visibleCards = 4; // quantos aparecem na tela

nextBtn.addEventListener("click", () => {
  index++;

  if (index > totalCards - visibleCards) {
    // VOLTA PRO INÍCIO
    index = 0;
  }

  track.style.transform = `translateX(-${index * cardWidth}px)`;
});

prevBtn.addEventListener("click", () => {
  index--;

  if (index < 0) {
    // VAI PRO FINAL
    index = totalCards - visibleCards;
  }

  track.style.transform = `translateX(-${index * cardWidth}px)`;
});
