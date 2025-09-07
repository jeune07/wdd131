(function () {
  const now = new Date();
  const last = new Date(document.lastModified);

  const fullYearEl = document.querySelector('.fullYear');
  const lastModEl  = document.querySelector('.lastModified');

  if (fullYearEl) {
    fullYearEl.textContent = now.getFullYear();
    fullYearEl.setAttribute('datetime', String(now.getFullYear()));
  }

  if (lastModEl) {
    // Localized, readable date
    const readable = last.toLocaleString(undefined, {
      year: 'numeric', month: 'long', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    });
    lastModEl.textContent = readable;
    lastModEl.setAttribute('datetime', last.toISOString());
  }
})();
