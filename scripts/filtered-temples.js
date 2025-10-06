// ---------- Data (added 3+ extra temples at the end)
const templesRaw = [
    {
        templeName: "Aba Nigeria", location: "Aba, Nigeria", dedicated: "2005, August, 7", area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah", location: "Manti, Utah, United States", dedicated: "1888, May, 21", area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah", location: "Payson, Utah, United States", dedicated: "2015, June, 7", area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam", location: "Yigo, Guam", dedicated: "2020, May, 2", area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.", location: "Kensington, Maryland, United States", dedicated: "1974, November, 19", area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú", location: "Lima, Perú", dedicated: "1986, January, 10", area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico", location: "Mexico City, Mexico", dedicated: "1983, December, 2", area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Paris France", location: "Le Chesnay, France", dedicated: "2017, May, 21", area: 44175,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/paris-france/400x250/paris-france-temple-1976289.jpg"
    },
    {
        templeName: "Salt Lake", location: "Salt Lake City, Utah, United States", dedicated: "1893, April, 6", area: 382207,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake/400x250/salt-lake-temple-exterior-1162817-wallpaper.jpg"
    },
    {
        templeName: "Rome Italy", location: "Rome, Italy", dedicated: "2019, March, 10", area: 41010,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-2019-1199587.jpg"
    }
];

// Precompute a numeric year once (saves parsing on every filter)
const temples = templesRaw.map(t => ({
    ...t,
    year: Number.parseInt(String(t.dedicated).split(",")[0], 10)
}));

// ---------- DOM refs
const cardsRegion = document.getElementById("cards");
const filterBar = document.querySelector(".filters");

// ---------- Card factory
function createCard(t) {
    const article = document.createElement("article");
    article.className = "card";
    article.innerHTML = `
    <figure>
      <img
        src="${t.imageUrl}"
        alt="${t.templeName} Temple exterior"
        loading="lazy"
        decoding="async"
        width="400" height="250"
        sizes="(min-width: 800px) 400px, 100vw"
      >
    </figure>
    <div class="body">
      <h2>${t.templeName}</h2>
      <p class="meta"><strong>Location:</strong> ${t.location}</p>
      <p class="meta"><strong>Dedicated:</strong> ${t.dedicated}</p>
      <p class="meta"><strong>Size:</strong> ${t.area.toLocaleString()} sq ft</p>
    </div>
  `;
    return article;
}

// ---------- Render
function render(list) {
    cardsRegion.setAttribute("aria-busy", "true");
    cardsRegion.innerHTML = "";
    if (!list || list.length === 0) {
        cardsRegion.innerHTML = `<p class="meta">No temples match this filter.</p>`;
        cardsRegion.setAttribute("aria-busy", "false");
        return;
    }
    const frag = document.createDocumentFragment();
    for (const t of list) frag.appendChild(createCard(t));
    cardsRegion.appendChild(frag);
    cardsRegion.setAttribute("aria-busy", "false");

    // Move focus to the first card heading for keyboard users
    const firstHeading = cardsRegion.querySelector(".card h2");
    if (firstHeading) firstHeading.tabIndex = -1, firstHeading.focus();
}

// ---------- Filters (pure functions)
const FILTERS = {
    all: list => list,
    old: list => list.filter(t => Number.isFinite(t.year) && t.year < 1900),
    new: list => list.filter(t => Number.isFinite(t.year) && t.year > 2000),
    large: list => list.filter(t => t.area > 90000),
    small: list => list.filter(t => t.area < 10000)
};

// Single delegated handler; updates visual + ARIA state and re-renders
filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest("button.filter");
    if (!btn) return;

    document.querySelectorAll(".filter").forEach(b => {
        const active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", active ? "true" : "false");
    });

    const key = btn.dataset.filter || "all";
    const fn = FILTERS[key] ?? FILTERS.all;
    render(fn(temples));
});

// ---------- Footer meta (fixed IDs; no leading #)
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const modEl = document.getElementById("lastModified");
if (modEl) {
    const d = new Date(document.lastModified);
    // Machine-readable value for validators/SEO
    modEl.dateTime = d.toISOString();                  // e.g., "2025-10-06T13:52:41.000Z"
    // Human-readable label for users
    modEl.textContent = d.toLocaleString(undefined, {
        year: "numeric", month: "short", day: "2-digit",
        hour: "2-digit", minute: "2-digit"
    });
}


// ---------- First render
render(temples);
