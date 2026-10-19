const books = [
  {id:1,title:"The House in the Cerulean Sea",author:"TJ Klune",genre:"FEEL-GOOD FANTASY",moods:["cozy","adventure"],description:"A quiet caseworker discovers a home full of extraordinary children and unexpected hope.",tag:"Warm & whimsical",bg:"#9eb9b1",cover:"#527f78",ink:"#fff4df",coverTitle:"THE HOUSE IN THE CERULEAN SEA",symbol:"✿"},
  {id:2,title:"The Hobbit",author:"J. R. R. Tolkien",genre:"FANTASY ADVENTURE",moods:["adventure","cozy"],description:"An unexpected journey reminds a comfort-loving hobbit how brave he can be.",tag:"A big little adventure",bg:"#d4c58e",cover:"#536b4b",ink:"#f7edcf",coverTitle:"THE HOBBIT",symbol:"⌁"},
  {id:3,title:"And Then There Were None",author:"Agatha Christie",genre:"MYSTERY",moods:["mystery","thought"],description:"Ten strangers arrive on an island. One by one, the mystery gets darker.",tag:"Page-turner",bg:"#a8b2c5",cover:"#27384c",ink:"#f2e7d2",coverTitle:"AND THEN THERE WERE NONE",symbol:"☾"},
  {id:4,title:"Atomic Habits",author:"James Clear",genre:"PERSONAL DEVELOPMENT",moods:["growth","cozy"],description:"A practical look at how tiny daily changes can build remarkable habits.",tag:"Small steps, big change",bg:"#d8b69b",cover:"#f0dfc7",ink:"#35433b",coverTitle:"ATOMIC HABITS",symbol:"✳"},
  {id:5,title:"Pride and Prejudice",author:"Jane Austen",genre:"CLASSIC ROMANCE",moods:["romance","thought"],description:"Wit, first impressions, and a timeless love story full of sharp observations.",tag:"Classic butterflies",bg:"#d8a1a2",cover:"#a84f5b",ink:"#fff0dc",coverTitle:"PRIDE AND PREJUDICE",symbol:"♡"},
  {id:6,title:"The Midnight Library",author:"Matt Haig",genre:"CONTEMPORARY FICTION",moods:["thought","cozy","growth"],description:"A woman explores the lives she might have lived and what makes a life meaningful.",tag:"A thoughtful read",bg:"#b2a6d0",cover:"#343f64",ink:"#f3e8d5",coverTitle:"THE MIDNIGHT LIBRARY",symbol:"✦"},
  {id:7,title:"The Alchemist",author:"Paulo Coelho",genre:"PHILOSOPHICAL FICTION",moods:["adventure","growth","thought"],description:"A shepherd follows a dream and learns to pay attention to the journey itself.",tag:"Follow your wonder",bg:"#d6b46e",cover:"#b86b3c",ink:"#fff0d4",coverTitle:"THE ALCHEMIST",symbol:"☼"},
  {id:8,title:"The Love Hypothesis",author:"Ali Hazelwood",genre:"ROMANTIC COMEDY",moods:["romance"],description:"A fake-dating arrangement between two scientists becomes unexpectedly complicated.",tag:"Playful & sweet",bg:"#d7a0a4",cover:"#486a5a",ink:"#fff1de",coverTitle:"THE LOVE HYPOTHESIS",symbol:"♡"},
  {id:9,title:"The Silent Patient",author:"Alex Michaelides",genre:"PSYCHOLOGICAL THRILLER",moods:["mystery"],description:"A painter stops speaking after a shocking crime, and a therapist wants to know why.",tag:"Twisty & tense",bg:"#8b9ba0",cover:"#27383d",ink:"#e9e6d8",coverTitle:"THE SILENT PATIENT",symbol:"☾"},
  {id:10,title:"Ikigai",author:"Héctor García & Francesc Miralles",genre:"WELLBEING",moods:["growth","cozy"],description:"A gentle exploration of purpose, daily rituals, and finding reasons to get up each day.",tag:"Slow living",bg:"#c6d1a3",cover:"#667d53",ink:"#fff5dc",coverTitle:"IKIGAI",symbol:"✿"},
  {id:11,title:"The Little Prince",author:"Antoine de Saint-Exupéry",genre:"CLASSIC FABLE",moods:["thought","cozy","adventure"],description:"A poetic journey about friendship, imagination, and seeing with the heart.",tag:"Small book, big feelings",bg:"#9db4c9",cover:"#4b7597",ink:"#fff0d4",coverTitle:"THE LITTLE PRINCE",symbol:"✦"},
  {id:12,title:"Book Lovers",author:"Emily Henry",genre:"CONTEMPORARY ROMANCE",moods:["romance","cozy"],description:"A literary agent and an editor keep crossing paths in a story about love and being understood.",tag:"For book people",bg:"#e3b08d",cover:"#bd6048",ink:"#fff1df",coverTitle:"BOOK LOVERS",symbol:"♡"}
];

const moodDetails = {
  cozy: {title:"A softer kind of story.", ids:[1,2,6,10,11,12]},
  adventure: {title:"Your next great escape.", ids:[2,1,7,11]},
  mystery: {title:"One more chapter. Then another.", ids:[3,9]},
  growth: {title:"A little wiser, page by page.", ids:[4,7,10,6]},
  romance: {title:"Butterflies, guaranteed (almost).", ids:[5,8,12]},
  thought: {title:"Stories that stay after the last page.", ids:[6,5,7,11,3]}
};
const moodButtons = document.querySelectorAll(".mood-card");
const bookGrid = document.getElementById("bookGrid");
const matchTitle = document.getElementById("matchTitle");
const matchCount = document.getElementById("matchCount");
const savedGrid = document.getElementById("savedGrid");
const savedCount = document.getElementById("savedCount");
let activeMood = "cozy";
let savedIds = [];

try {
  const stored = JSON.parse(localStorage.getItem("bookmatch-saved") || "[]");
  if (Array.isArray(stored)) savedIds = stored.filter(id => books.some(book => book.id === id));
} catch (error) {
  savedIds = [];
}

function bookCard(book) {
  const isSaved = savedIds.includes(book.id);
  return `
    <article class="book-card">
      <div class="book-art" style="background:${book.bg}">
        <div class="mini-cover" style="background:${book.cover};color:${book.ink}">
          <small>${book.genre}</small>
          <strong>${book.coverTitle}</strong>
          <i>${book.author}</i>
          <span>${book.symbol}</span>
        </div>
      </div>
      <div class="book-info">
        <span class="book-genre">${book.genre}</span>
        <h3>${book.title}</h3>
        <p class="book-author">by ${book.author}</p>
        <p class="book-description">${book.description}</p>
        <div class="book-bottom"><span class="book-tag">${book.tag}</span>
          <button class="save-button ${isSaved ? "saved" : ""}" data-save="${book.id}" aria-label="${isSaved ? "Remove from" : "Save to"} shelf">${isSaved ? "♥" : "♡"}</button>
        </div>
      </div>
    </article>`;
}

function renderBooks() {
  const details = moodDetails[activeMood];
  const matches = details.ids.map(id => books.find(book => book.id === id)).filter(Boolean);
  matchTitle.textContent = details.title;
  matchCount.textContent = `${String(matches.length).padStart(2, "0")} BOOK MATCH${matches.length === 1 ? "" : "ES"}`;
  bookGrid.innerHTML = matches.map(bookCard).join("");
}

function renderShelf() {
  const savedBooks = savedIds.map(id => books.find(book => book.id === id)).filter(Boolean);
  savedCount.textContent = savedBooks.length;
  if (!savedBooks.length) {
    savedGrid.innerHTML = `<div class="empty-shelf"><span>♡</span><h3>Your shelf is waiting.</h3><p>Save a book you like and it'll show up here.</p><a href="#discover">Explore books ↗</a></div>`;
  } else {
    savedGrid.innerHTML = savedBooks.map(bookCard).join("");
  }
}

function toggleSaved(id) {
  if (savedIds.includes(id)) savedIds = savedIds.filter(savedId => savedId !== id);
  else savedIds.push(id);
  try { localStorage.setItem("bookmatch-saved", JSON.stringify(savedIds)); } catch (error) {}
  renderBooks();
  renderShelf();
}

moodButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeMood = button.dataset.mood;
    moodButtons.forEach(item => item.classList.toggle("selected", item === button));
    renderBooks();
  });
});

document.addEventListener("click", event => {
  const saveButton = event.target.closest("[data-save]");
  if (saveButton) toggleSaved(Number(saveButton.dataset.save));
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => navLinks.classList.remove("open")));

renderBooks();
renderShelf();
