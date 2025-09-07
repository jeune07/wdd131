// scripts/gatdates.js
(function () {
  const fullYearEl = document.querySelector('.fullYear');
  const lastModEl  = document.querySelector('.lastModified');

  const now  = new Date();
  const last = new Date(document.lastModified);

  if (fullYearEl) {
    const year = String(now.getFullYear());
    fullYearEl.textContent = year;          // human-readable
    fullYearEl.setAttribute('datetime', `${year}-01-01`); // always valid
  }

  if (lastModEl) {
    lastModEl.textContent = last.toLocaleString(undefined, {
      year: 'numeric', month: 'long', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    });                                     // human-readable
    lastModEl.setAttribute('datetime', last.toISOString()); // machine-readable
  }
})();
