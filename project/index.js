

// MENU accessibility & ESC close
const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('primary-nav');
if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', String(open));
        if (open) { nav.querySelector('a')?.focus(); }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('open')) {
            nav.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.focus();
        }
    });
}

// SCROLL state (decorative)
const root = document.documentElement;
const toggleScrolled = () => root.classList.toggle('is-scrolled', (window.scrollY || document.body.scrollTop) > 10);
window.addEventListener('scroll', toggleScrolled, { passive: true });
toggleScrolled();

// THEME prefs + visits (object, conditionals, localStorage, DOM updates)
const prefsKey = 'wj_prefs';
const themeBtn = document.getElementById('theme-toggle');
const applyTheme = (mode) => {
    if (mode === 'light' || mode === 'dark') { document.documentElement.setAttribute('data-theme', mode); }
    else { document.documentElement.removeAttribute('data-theme'); } // auto via prefers-color-scheme
};
const defaultPrefs = { theme: 'auto', visits: 0 };
let prefs = defaultPrefs;
try { const saved = localStorage.getItem(prefsKey); if (saved) { const parsed = JSON.parse(saved); if (parsed && typeof parsed === 'object') { prefs = { ...defaultPrefs, ...parsed }; } } } catch { }
prefs.visits = (prefs.visits || 0) + 1;
applyTheme(prefs.theme);
themeBtn?.setAttribute('aria-pressed', String(prefs.theme === 'dark'));
localStorage.setItem(prefsKey, JSON.stringify(prefs));
themeBtn?.addEventListener('click', () => {
    prefs.theme = (prefs.theme === 'dark') ? 'light' : (prefs.theme === 'light' ? 'auto' : 'dark');
    applyTheme(prefs.theme);
    themeBtn.setAttribute('aria-pressed', String(prefs.theme === 'dark'));
    localStorage.setItem(prefsKey, JSON.stringify(prefs));
});

// CONTACT FORM — progressive enhancement w/ draft autosave
(function () {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    if (!form) return;

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // restore draft
    const draftKey = 'wj_contact_draft';
    try {
        const draft = JSON.parse(localStorage.getItem(draftKey) || 'null');
        if (draft) {
            form.name.value = draft.name || '';
            form.email.value = draft.email || '';
            form.company.value = draft.company || '';
            form.budget.value = draft.budget || '';
            form.message.value = draft.message || '';
        }
    } catch { }

    const saveDraft = () => {
        const data = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            company: form.company.value.trim(),
            budget: form.budget.value,
            message: form.message.value.trim()
        };
        localStorage.setItem(draftKey, JSON.stringify(data));
    };
    form.addEventListener('input', saveDraft);

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        status.textContent = '';

        // honeypot
        if (form.company_website && form.company_website.value) { status.textContent = 'Submission blocked.'; return; }

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const company = form.company.value.trim();
        const budget = form.budget.value;
        const types = Array.from(form.querySelectorAll('input[name="type"]:checked')).map(i => i.value);
        const message = form.message.value.trim();

        if (!name || !validateEmail(email) || !budget || !message) {
            status.textContent = 'Please complete required fields (name, valid email, budget, message).';
            return;
        }

        // Construct mailto (template literals)
        const subject = encodeURIComponent(`New project inquiry — ${name}`);
        const bodyLines = [
            `Name: ${name}`,
            `Email: ${email}`,
            company ? `Company: ${company}` : null,
            `Budget: ${budget}`,
            types.length ? `Project type: ${types.join(', ')}` : null,
            '',
            message
        ].filter(Boolean);
        const body = encodeURIComponent(bodyLines.join(''));
        const href = `mailto:jeunewinsley9@gmail.com?subject=${subject}&body=${body}`;

        window.location.href = href;
        status.textContent = 'Opening your email client… If it does not open, email me directly at jeunewinsley9@gmail.com with the details above.';
        localStorage.removeItem(draftKey); // clear draft after handoff
    });
})();
