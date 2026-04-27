function mostrarCadastro() {
  document.getElementById("login").style.display = "none";
  document.getElementById("cadastro").style.display = "block";
}

function mostrarLogin() {
  document.getElementById("login").style.display = "block";
  document.getElementById("cadastro").style.display = "none";
}

// CADASTRAR
function cadastrar() {
  let user = document.getElementById("cadUser").value;
  let pass = document.getElementById("cadPass").value;

  if (user === "" || pass === "") {
    alert("Preencha todos os campos!");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  usuarios.push({ usuario: user, senha: pass });

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Cadastro realizado!");
  window.location = "home.html";
}

// LOGIN
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

function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location = "index.html";
}

/* CARROSSEL */
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
    // 🔁 VOLTA PRO INÍCIO
    index = 0;
  }

  track.style.transform = `translateX(-${index * cardWidth}px)`;
});

prevBtn.addEventListener("click", () => {
  index--;

  if (index < 0) {
    // 🔁 VAI PRO FINAL
    index = totalCards - visibleCards;
  }

  track.style.transform = `translateX(-${index * cardWidth}px)`;
});
