A clean, accessible, and fast personal site showcasing projects, résumé, and contact info. Built with semantic HTML, modern CSS (Flexbox), and a tiny bit of vanilla JS.

Goal: production-quality structure with WCAG 2.2–minded accessibility and simple, zero-dependency deployment.

Table of Contents

Live Demo

Features

Accessibility (a11y)

Tech Stack

Getting Started

Project Structure

Development Tips

Performance & SEO

Testing

Deployment

Roadmap

Contributing

License

Contact

Live Demo

GitHub Pages: add link after deploying

Local: http://localhost:8080 (or your chosen port)

Features

Semantic layout: <header>, <nav>, <main>, <section>, <footer> used correctly.

Fixed header & footer that don’t move on scroll; content is offset to avoid overlap.

Two-column main (Flexbox) — 60% / 40% split, wraps gracefully on small screens.

Accessible navigation: Descriptive link text, keyboard-visible focus states.

Skip link for keyboard users.

Time elements: <time> with datetime for machine-readable dates.

Date injection: JS fills current year and last-modified timestamp.

No frameworks; easy to read, easy to ship.

Accessibility (a11y)

The page follows practical WCAG 2.2 AA practices:

Skip to main link: Tab → Enter jumps over the nav.

Focus styles: visible :focus-visible outlines for keyboard users.

Headings: single <h1> per page; logical <h2> for sections.

Descriptive links (e.g., “LinkedIn profile” instead of just “LinkedIn”).

Color contrast: dark header/footer with white text; check with Lighthouse/axe.

Reduced motion respected via prefers-reduced-motion media query.

Images include meaningful alt text; decorative images would have empty alt.

Tip: Run an automated check (axe DevTools/Lighthouse) and a manual keyboard-only pass before shipping.

Tech Stack

HTML5

CSS3 (Flexbox + responsive utilities)

JavaScript (ES2020+) — no dependencies

Getting Started
Prerequisites

Any static server works. Options:

Node: npm i -g serve or npx http-server

Python 3: built-in http.server

Clone
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

Run locally

Node (http-server)

npx http-server -p 8080


Node (serve)

npx serve .


Python 3

python -m http.server 8080


Then open: http://localhost:8080

Project Structure
.
├─ index.html
├─ styles/
│  └─ base.css
├─ scripts/
│  └─ gatdates.js
└─ assets/


Key files

index.html — semantic structure with landmarks and correct heading hierarchy.

styles/base.css — layout (flex), colors, focus styles, and responsive rules.

scripts/gatdates.js — sets current year and last-modified <time> values.

Development Tips

Keep headings hierarchical: one <h1> per page, then <h2> per section.

Prefer native CSS; avoid unnecessary libraries. Use Flexbox and CSS custom properties.

Use descriptive link text and meaningful alt attributes.

Test keyboard-only navigation on every change.

Keep JS pure and defensive (null checks for queried elements).

Performance & SEO

Meta tags: title, description, author set in <head>.

Images: use appropriate dimensions; add width/height to prevent CLS.

Minify: if needed, run your CSS/JS through a minifier before deploy.

Lighthouse: aim for green across Performance, Accessibility, Best Practices, SEO.

Testing

Accessibility: axe DevTools browser extension, Lighthouse (Chrome DevTools).

Manual: keyboard-only pass, high-contrast mode, reduced-motion mode.

HTML validation: https://validator.w3.org/

CSS validation: https://jigsaw.w3.org/css-validator/

Deployment
GitHub Pages (simple)

Push your repo to GitHub.

In Settings → Pages, set Branch to main (or docs) and root to / (or /docs).

Wait for the build; your site will be live at https://jeune07.github.io/wdd131/.

Netlify / Vercel (optional)

Import the repo → choose project → deploy as a static site (no build step needed).

Roadmap

 Add dark mode via prefers-color-scheme (with toggle).

 Localized content (English/Spanish/French/Creole).

 ARIA disclosure pattern for any future dropdown nav.

 Print-optimized résumé page.

 Lighthouse CI in GitHub Actions.

Contributing

PRs welcome for accessibility, performance, and content improvements. Use Conventional Commits:

feat: add dark mode toggle
fix: improve focus-visible outline on links
docs: update README with deployment steps

License

MIT © Winsley Jeune

Contact

Email: jeunewinsley9@gmail.com

LinkedIn: https://www.linkedin.com/in/
<your-handle>/

GitHub: https://github.com/jeune07
