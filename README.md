# مائة عامل: فہم و تطبیق

A self-contained Urdu RTL learning platform inspired by the supplied Al-Hayat Nahw example, with an original instructional treatment of Ma'iat 'Amil.

## Included

- Exactly 100 lessons arranged into 10 sequential learning stages.
- 869 contextual multiple-choice questions; answer order is shuffled.
- 200 worked Arabic examples, 543 authored short answers, Urdu explanations, clickable word analysis, conditions, exceptions, whole-sentence synthesis and revision cards.
- A map of all 13 transmitted-factor classes, plus seven analogical and two semantic factors.
- Stage quizzes, lesson quizzes, mixed quizzes and review of previous mistakes.
- Search across lesson titles, explanations and examples; common Arabic/Urdu letter variants are normalized.
- Saved lessons, completed lessons, progress export/import, night mode, adjustable text. The on-page Print option has been removed.
- Bibliographic source cards identify all three original reference books. Heavy PDF scans are omitted from this deployment package; all 100 lessons and 869 questions remain included.
- Local Arabic and Urdu fonts. No CDN, login, API key, package installation or build step is needed.

## Open locally

Unzip and open index.html in a modern browser. All lessons and interactions work without a server. Browser-local progress can behave differently for file URLs; export progress before moving the folder. For a consistent origin, serve the folder:

    python3 -m http.server 8000

Then open http://localhost:8000.

## GitHub Pages

1. Upload the CONTENTS of this directory to your repository root: index.html must be at the root, alongside assets/, app.js, data.js and styles.css.
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
- #sources — editorial method and reference-book bibliography

## Content and editing

content.json is the editable structured content source. data.js is the browser-ready copy. After editing content.json, regenerate data.js using:

    python3 scripts/build_data.py

Teaching order and stage membership are defined in STAGES in app.js. Keep IDs stable to preserve saved progress. The displayed lesson number is its position in that teaching order.

This is original instructional material informed by the subject and supplied reference books, not a verbatim OCR transcription or a critical edition. The 100 lessons cover the main classes and important supporting syntax; they do not claim to reproduce every scholarly disagreement or every detail in the 1,332 source pages. The count of lessons is distinct from the traditional count of factors. Worked examples are teaching examples unless explicitly identified otherwise. No invented source-page references are supplied.

The Arabic font is Amiri. The Urdu font is the actual Jameel Noori Nastaleeq family, identified with fontconfig and bundled as JameelNooriNastaleeq.woff2. Amiri was retained from the previous package; Jameel was reused from the existing Al-Hayat Dars Nizami project supplied in the workspace. Retain the original font attribution and applicable redistribution terms. Arabic phrases in worked examples and mixed Urdu explanations are marked separately with lang="ar". Urdu uses plum/navy and Arabic uses emerald, with coordinated light and dark palettes.

## Verification

Run:

    node --check app.js
    node --check data.js
    node tests/smoke.cjs

The dependency-free tests check exactly 100 unique lessons and their complete 10-stage membership, all 400 lesson/tab render functions, route generation, unique answer options, randomised question scope, score handling, duplicate-answer protection, mistake review and bundled assets. These are JavaScript checks using a simulated DOM, not real-browser visual or accessibility certification. A final real-device review of line wrapping and font rendering is recommended before public deployment.

## Privacy and performance

Progress stays in the current browser's localStorage; there is no server-side account, analytics or external tracking. Quiz text is inserted with HTML escaping. Progress imports validate known lesson and question IDs. The complete repository is below 25,000,000 bytes, including the local Jameel font and editable content source. PDF scans are omitted from deployment. There are no broken PDF links. No service worker is used, so there is no stale offline cache to clear on updates.

## Colour and content revision

Updated all major surfaces with coordinated emerald, blue, amber, rose and violet cards, distinct Arabic/Urdu text, tactile hover/active states, reduced-motion support and night-mode colours. The text has clearer worked-analysis steps and a takeaway in every lesson. Two previously abbreviated examples were completed, selected explanations were rewritten, and word-analysis distractors were revised. Existing lesson and question IDs were retained.

For Cloudflare Pages: use a static deployment with no build command and the repository root as output directory. Replace the previous deployed files, including removing the old books/ directory; merely uploading this package over the old repository will not remove old PDFs.

Every one of the 100 lesson IDs has a stable, distinct accent palette reused on its catalogue card and lesson panels. Palette text and button contrast are checked in both light and dark modes.

## Expanded assessment and sentence synthesis

- 869 MCQs (7–12 per lesson, according to topic complexity), 543 authored short answers and 200 worked examples.
- The original 326 question positions/IDs were retained; 543 questions were appended across the lessons.
- Each lesson includes two focused rule/condition questions, a new worked example, its application question, meaning practice, and a complete-sentence synthesis question. Forty-three extra questions address detailed conditions, contrasts and exceptions.
- Existing word-role questions were reframed according to grammatical function. Questions requiring the original example now show it during mixed practice.
- The analysis view keeps the word cards, then explains how the components join into a complete sentence. Compound structures, embedded clauses, imperatives, prohibition, condition/answer, oath/answer, praise/blame and nominal/verbal clauses are distinguished.
- #coverage and coverage.json map every lesson to seven assessment areas: rule, conditions, word analysis, original example, transfer, meaning and whole-sentence synthesis.
- Mixed quizzes sample all ten learning stages. Question-family filters permit focused practice. Revision cards include all 543 short answers.

Coverage means that the authored lesson objectives and the named assessment areas have linked questions. It is not an assertion that every possible example or every disagreement in the source books has been independently verified. Real-browser visual review is still pending.
