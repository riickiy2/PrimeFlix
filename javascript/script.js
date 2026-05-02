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

// ~~~~~~~~~~~~~~CARROSSEL~~~~~~~~~~~~~~
const track = document.getElementById("track");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if (track && nextBtn && prevBtn){
  let index = 0;
  const totalCards = document.querySelectorAll(".card").length;

  /* getCardWidth calcula a largura real do card no momento da execução */
  /* isso ajudara na responsividade pôs não terá que dar um valor fixo */
  function getCardWidth() {
    const card = document.querySelector(".card");
    if (!card) return 220;

    // getComputedStyle retorna o estilo calculado pelo navegador, incluindo a margem
    const style = window.getComputedStyle(card);
    const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    return card.offsetWidth + margin;
  }

  // getVisibleCards calcula quantos cards cabem na tela de acordo com a largura atual.
  // window.innerWidth é a largura visível da janela do navegador
  function getVisibleCards() {
    const containerWidth = track.parentElement.offsetWidth;
    const cardWidth = getCardWidth();
    // Math.floor arredonda para baixo, para não mostrar metade de um card
    return Math.max(1, Math.floor(containerWidth / cardWidth));
  }

  nextBtn.addEventListener("click", () =>{
    const visibleCards = getVisibleCards();
    index++;
    if (index > totalCards - visibleCards){
      index = 0
    }
    track.style.transform = `translateX(-${index * getCardWidth()}px)`;
  });

  prevBtn.addEventListener("click", () => {
    const visibleCards = getVisibleCards();
    index--;
    if (index < 0){
      index = Math.max(0, totalCards - visibleCards);
    }
    track.style.transform = `translateX(-${index * getCardWidth()}px)`;
  });

  windows.addEventListener("resize", () => {
    index = 0;
    track.style.transform = "translatex(0)";
  });
}
