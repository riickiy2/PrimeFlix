const botaoTema = document.getElementById("themeButton");
botaoTema.addEventListener("click", () => {
  document.body.classList.toggle("darkmode");

  const darkActive = document.body.classList.contains("darkmode");
  if (darkActive) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("darkmode");
};