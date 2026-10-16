# مائة عامل: فہم و تطبیق

A self-contained Urdu RTL learning platform inspired by the supplied Al-Hayat Nahw example, with an original instructional treatment of Ma'iat 'Amil.

## Included

- Exactly 100 lessons arranged into 10 sequential learning stages.
- 326 contextual multiple-choice questions; answer order is shuffled.
- Rules, worked Arabic examples, Urdu explanations, clickable word analysis, questions, notes and revision cards.
- A map of all 13 transmitted-factor classes, plus seven analogical and two semantic factors.
- Stage quizzes, lesson quizzes, mixed quizzes and review of previous mistakes.
- Search across lesson titles, explanations and examples; common Arabic/Urdu letter variants are normalized.
- Saved lessons, completed lessons, progress export/import, night mode, adjustable text and print layouts.
- All three original supplied PDFs in books/. They open only when selected and are not downloaded by the learning interface on startup.
- Local Arabic and Urdu fonts. No CDN, login, API key, package installation or build step is needed.

## Open locally

Unzip and open index.html in a modern browser. All lessons and interactions work without a server. Browser-local progress can behave differently for file URLs; export progress before moving the folder. For a consistent origin, serve the folder:

    python3 -m http.server 8000

Then open http://localhost:8000.

## GitHub Pages

1. Upload the CONTENTS of this directory to your repository root: index.html must be at the root, alongside assets/, books/, app.js, data.js and styles.css.
2. Open repository Settings → Pages.
3. Choose Deploy from a branch, select main and / (root), then Save.
4. Open the GitHub Pages URL. Hash routes work without server rewrites.

No npm install, npm run build or Cloudflare Worker is required. The same directory works on any static host.

## Main routes

- #home — dashboard and introduction
- #paths — ten stages, prerequisites by sequence, lesson lists and stage quizzes
- #lessons — searchable/filterable catalogue of all 100 lessons
- #lesson/l49 — first lesson in teaching order (stable IDs are intentionally independent of lesson numbering)
- #lesson/l49/analysis — word analysis
- #lesson/l49/qa — questions and answers
- #lesson/l49/quiz — lesson practice entry
- #map — factor-class reference map
- #practice — mixed, lesson or mistake practice
- #review — revision cards, including saved/completed lessons
- #sources — editorial method and optional original book PDFs

## Content and editing

content.json is the editable structured content source. data.js is the browser-ready copy. After editing content.json, regenerate data.js using:

    python3 scripts/build_data.py

Teaching order and stage membership are defined in STAGES in app.js. Keep IDs stable to preserve saved progress. The displayed lesson number is its position in that teaching order.

This is original instructional material informed by the subject and supplied reference books, not a verbatim OCR transcription or a critical edition. The 100 lessons cover the main classes and important supporting syntax; they do not claim to reproduce every scholarly disagreement or every detail in the 1,332 source pages. The count of lessons is distinct from the traditional count of factors. Worked examples are teaching examples unless explicitly identified otherwise. No invented source-page references are supplied.

The source PDFs retain their original contents and attribution. The local font binaries were obtained from the user-supplied reference site's fonts directory (NafeesNastaleeq.woff2 and Amiri-Regular.woff2). Retain their original attribution and review the respective font redistribution terms before redistributing them separately.

## Verification

Run:

    node --check app.js
    node --check data.js
    node tests/smoke.cjs

The dependency-free tests check exactly 100 unique lessons and their complete 10-stage membership, all 400 lesson/tab render functions, route generation, unique answer options, randomised question scope, score handling, duplicate-answer protection, mistake review and bundled assets. These are JavaScript checks using a simulated DOM, not real-browser visual or accessibility certification. A final real-device review of line wrapping and font rendering is recommended before public deployment.

## Privacy and performance

Progress stays in the current browser's localStorage; there is no server-side account, analytics or external tracking. Quiz text is inserted with HTML escaping. Progress imports validate known lesson and question IDs. Core HTML/CSS/JS and fonts are under approximately 1 MB; reference PDFs are separate optional downloads. No service worker is used, so there is no stale offline cache to clear on updates.
