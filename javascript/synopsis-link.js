// Pega os parâmetros da URL
const params = new URLSearchParams(window.location.search);

// Pega o id do filme
const movieId = params.get("id");

// Busca o filme no objeto
const movie = movies[movieId];

// Se existir filme
if (movie) {
  document.getElementById("movieTitle").textContent = movie.title;

  document.getElementById("moviePoster").src = movie.poster;

  document.getElementById("movieTrailer").src = movie.trailer;

  document.getElementById("movieSynopsis").textContent = movie.synopsis;

  document.getElementById("movieImdb").textContent = `⭐ IMDb ${movie.imdb}`;

  document.getElementById("movieRotten").textContent =
    `🍅 Rotten ${movie.tomato}`;

  document.getElementById("movieYear").textContent = `Ano: ${movie.year}`;

  document.getElementById("movieDirector").textContent =
    `Diretor: ${movie.director}`;

  document.getElementById("movieStudio").textContent =
    `Estúdio: ${movie.studio}`;
} else {
  document.body.innerHTML = `
    <h1>Filme não encontrado</h1>
  `;
}
