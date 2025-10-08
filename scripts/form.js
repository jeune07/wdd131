
document.getElementById('lastmod').textContent = new Date().toLocaleString();

const products = [
    { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
    { id: "fc-2050", name: "power laces", averagerating: 4.7 },
    { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
    { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
    { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];
const idToName = Object.fromEntries(products.map(p => [p.id, p.name]));


const select = document.getElementById('product');
products.forEach(p => { const o = document.createElement('option'); o.value = p.id; o.textContent = p.name; select.append(o); });

const form = document.getElementById('reviewForm');
const confirmView = document.getElementById('confirmation');
const backLink = document.getElementById('backToForm');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const data = new FormData(form);
    const params = new URLSearchParams();
    for (const [k, v] of data.entries()) params.append(k, v);

    // localStorage counter
    const KEY = 'reviewCount';
    const next = (Number(localStorage.getItem(KEY) || 0) + 1);
    localStorage.setItem(KEY, String(next));
    document.getElementById('reviewCount').textContent = String(next);

    // Build submission summary
    const summary = document.getElementById('summary');
    summary.innerHTML = '';
    const fields = [
        ['Product', idToName[params.get('product')] ? `${idToName[params.get('product')]} (${params.get('product')})` : (params.get('product') || '—')],
        ['Rating', params.get('rating') || '—'],
        ['Install Date', params.get('installDate') || '—'],
        ['Features', data.getAll('features').join(', ') || '—'],
        ['Written Review', params.get('reviewText') || '—'],
        ['Your Name', params.get('userName') || '—']
    ];
    fields.forEach(([dtText, ddText]) => { const dt = document.createElement('dt'); dt.textContent = dtText; const dd = document.createElement('dd'); dd.textContent = ddText; summary.append(dt, dd); });

    // Toggle views
    form.hidden = true; confirmView.hidden = false; window.scrollTo({ top: 0, behavior: 'smooth' });
});

backLink.addEventListener('click', (e) => { e.preventDefault(); confirmView.hidden = true; form.hidden = false; form.reset(); });
