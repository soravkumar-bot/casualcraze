// =========================
// CasualCraze — scripts.js
// =========================

const games = [
  { title: "Tap Puzzle", category: "Puzzle", desc: "Quick match puzzles for short breaks.", tag: "New", page: "game-tap-puzzle.html", img: "img/tap-puzzle.jpg" },
  { title: "Space Dash", category: "Arcade", desc: "Fast reflex arcade runner.", tag: "Hot", page: "game-space-dash.html", img: "img/space-dash.jpg" },
  { title: "Word Sprint", category: "Word", desc: "Find words before time runs out.", tag: "Top", page: "game-word-sprint.html", img: "img/word-sprint.jpg" },
  { title: "Mini Strategy", category: "Strategy", desc: "Simple tactics, big fun.", tag: "Top", page: "game-mini-strategy.html", img: "img/mini-strategy.jpg" },
];

const gamesGrid = document.getElementById("gamesGrid");
const topGamesGrid = document.getElementById("topGamesGrid");
const categories = document.getElementById("categories");
const heroPlayBtn = document.getElementById("heroPlayBtn");
const playNowBtn = document.getElementById("playNowBtn");
const browseBtn = document.getElementById("browseBtn");
const previewPlayBtn = document.getElementById("previewPlayBtn");
const previewBoard = document.getElementById("previewBoard");

function createGameCard(game){
  const card = document.createElement("div");
  card.className = "game";

  card.innerHTML = `
    <div class="game__thumb" style="background-image:url(${game.img});"></div>
    <div class="game__body">
      <h3 class="game__title">${game.title}</h3>
      <div class="game__meta">${game.desc}</div>
      <div class="game__actions">
        <span class="game__tag">${game.category}</span>
        <button class="btn btn--secondary" data-page="${game.page}">Play</button>
      </div>
    </div>
  `;

  const playBtn = card.querySelector("button");
  playBtn.addEventListener("click", () => {
    window.location.href = game.page;
  });

  return card;
}

function renderGames(filter = "All"){
  gamesGrid.innerHTML = "";
  const filtered = filter === "All" ? games : games.filter(g => g.category === filter);
  filtered.forEach(g => gamesGrid.appendChild(createGameCard(g)));
}

function renderTopGames(){
  topGamesGrid.innerHTML = "";
  games.slice(0,3).forEach(g => topGamesGrid.appendChild(createGameCard(g)));
}

function initCategoryButtons(){
  categories.querySelectorAll(".category").forEach(btn => {
    btn.addEventListener("click", () => {
      const cat = btn.getAttribute("data-category");
      renderGames(cat);
    });
  });
}

function animatePreviewBoard(){
  if(!previewBoard) return;
  previewBoard.innerHTML = "";

  const count = 22;
  for(let i=0; i<count; i++){
    const dot = document.createElement("div");
    dot.className = "previewDot";
    dot.style.left = `${Math.random()*90}%`;
    dot.style.top = `${Math.random()*90}%`;
    dot.style.animationDelay = `${Math.random()*1.5}s`;
    previewBoard.appendChild(dot);
  }
}

function initButtons(){
  const openRandom = () => {
    const random = games[Math.floor(Math.random()*games.length)];
    window.location.href = random.page;
  };

  heroPlayBtn?.addEventListener("click", openRandom);
  playNowBtn?.addEventListener("click", openRandom);
  browseBtn?.addEventListener("click", () => {
    document.getElementById("games")?.scrollIntoView({ behavior: "smooth" });
  });
  previewPlayBtn?.addEventListener("click", () => {
    window.location.href = games[0].page;
  });
}

// init
renderGames();
renderTopGames();
initCategoryButtons();
initButtons();
animatePreviewBoard();
