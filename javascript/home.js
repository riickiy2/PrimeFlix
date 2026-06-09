// ~~~~~~~~~~~~~~CARROSSEL~~~~~~~~~~~~~~
const track = document.getElementById("track");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if (track && nextBtn && prevBtn) {
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

  nextBtn.addEventListener("click", () => {
    const visibleCards = getVisibleCards();
    index++;
    if (index > totalCards - visibleCards) {
      index = 0;
    }
    track.style.transform = `translateX(-${index * getCardWidth()}px)`;
  });

  prevBtn.addEventListener("click", () => {
    const visibleCards = getVisibleCards();
    index--;
    if (index < 0) {
      index = Math.max(0, totalCards - visibleCards);
    }
    track.style.transform = `translateX(-${index * getCardWidth()}px)`;
  });
}

// ══════════════════════════════════════
//  LOGOUT
// ══════════════════════════════════════

function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location = "index.html";
}