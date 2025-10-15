document.addEventListener('DOMContentLoaded', () => {
    // --- Footer meta: year + last modified ---
    const fullYearEl = document.querySelector('.fullYear');
    if (fullYearEl) {
        const y = String(new Date().getFullYear());
        fullYearEl.textContent = y;
        fullYearEl.setAttribute('datetime', `${y}-01-01`);
    }
    const lastModEl = document.querySelector('.lastmod');
    if (lastModEl) {
        const lm = new Date(document.lastModified || Date.now());
        lastModEl.textContent = lm.toLocaleString();
        lastModEl.setAttribute('datetime', lm.toISOString());
    }

    // --- Data source (required by spec) ---
    const products = [
        { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
        { id: "fc-2050", name: "power laces", averagerating: 4.7 },
        { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
        { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
        { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
    ];
    const idToName = Object.fromEntries(products.map(p => [p.id, p.name]));

    // --- Populate <select> from array (spec) ---
    const select = document.getElementById('product');
    if (select) {
        // keep the first placeholder option; remove any others
        while (select.options.length > 1) select.remove(1);
        products.forEach(p => {
            const o = document.createElement('option');
            o.value = p.id;
            o.textContent = p.name;
            select.append(o);
        });
    }

    // --- localStorage review counter (spec) ---
    const KEY = 'reviewCount';
    const getCount = () => Number(localStorage.getItem(KEY) || 0);
    const setCount = (n) => localStorage.setItem(KEY, String(n));

    const form = document.getElementById('reviewForm');
    const confirmView = document.getElementById('confirmation');
    const backLink = document.getElementById('backToForm');
    const reviewCountEl = document.getElementById('reviewCount');

    // show current count on load (even before submitting)
    if (reviewCountEl) reviewCountEl.textContent = String(getCount());

    // Submit handler
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }

        const data = new FormData(form);

        // increment and display count
        const next = getCount() + 1;
        setCount(next);
        if (reviewCountEl) reviewCountEl.textContent = String(next);

        // Build submission summary
        const summary = document.getElementById('summary');
        if (summary) {
            summary.innerHTML = '';
            const fields = [
                ['Product', idToName[data.get('product')] ? `${idToName[data.get('product')]} (${data.get('product')})` : (data.get('product') || '—')],
                ['Rating', data.get('rating') || '—'],
                ['Install Date', data.get('installDate') || '—'],
                ['Features', (data.getAll('features') || []).join(', ') || '—'],
                ['Written Review', data.get('reviewText') || '—'],
                ['Your Name', data.get('userName') || '—']
            ];
            fields.forEach(([dtText, ddText]) => {
                const dt = document.createElement('dt'); dt.textContent = dtText;
                const dd = document.createElement('dd'); dd.textContent = ddText;
                summary.append(dt, dd);
            });
        }

        // Toggle views
        form.hidden = true;
        if (confirmView) confirmView.hidden = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Back link to post another
    backLink?.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirmView) confirmView.hidden = true;
        if (form) {
            form.hidden = false;
            form.reset();
        }
    });
});
