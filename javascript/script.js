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

  if(user === "" || pass === ""){
    alert("Preencha todos os campos!");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  usuarios.push({ usuario: user, senha: pass });

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Cadastro realizado!");
  window.location = "index.html";

}

// LOGIN
function fazerLogin() {
  let user = document.getElementById("loginUser").value;
  let pass = document.getElementById("loginPass").value;

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  let encontrado = usuarios.find(u => u.usuario === user && u.senha === pass);

  if(encontrado){
    window.location = "index.html";
  } else {
    alert("Usuário ou senha incorretos!");
  }
}