# No-setup course: checks and limits

## What changed

The same course is now bundled into **one self-contained `index.html`**. All eight source modules, the CSS, corpus, lesson writing, quizzes, and favicon are embedded. The bootstrap creates local in-memory module URLs, so the browser never has to fetch `src/*.js` through a `file://` URL. Native module bindings are preserved for progress reset and restoration. No third-party runtime/bundler package was added.

`index.html` is already built: learners do not need Node, npm, a terminal, localhost, or a server. All core lessons and labs work without downloading anything. The optional neural model and external reading links remain explicitly online extras.

The builder is `scripts/build-standalone.mjs`. `npm run build` regenerates the self-contained HTML and prepares the optional static-host output. The original modular implementation, command-line examples, and deployment workflow remain in the repository.

## Checks actually performed

- **65 automated tests passed**: the existing engine and progress tests plus five standalone-packaging tests.
- **37 browser checks passed** against the exact generated HTML with networking disabled.
- All seven lessons, interactive labs, code views, and all 21 quiz answers were exercised; every day was marked complete.
- The checks covered keyword search, vector search, the ranking slider, crawler steps and indexed pages, source readers, context removal, citation audit decisions, and a benchmark CSV download.
- Notes and progress were exported. Progress was reset and restored from its backup, verifying that the bundled modules share the live state rather than stale copies.
- Custom document text was added and searched, with HTML-like text escaped correctly. Glossary filtering was checked.
- Responsive route layouts and mobile menu opening/Escape closing were checked at 390 px and 320 px.
- **Zero HTTP, HTTPS, or file asset requests** occurred during those core-course checks, and there were **no uncaught JavaScript errors**.
- Package inspection verifies no external startup scripts/styles and confirms the original course/data/engine/lab module text is preserved.

## Test environment and remaining checks

The managed Chromium environment here blocks direct `file://` navigation and navigation to a test HTTPS origin. Therefore, the browser suite loaded the exact self-contained HTML into an opaque in-memory page (`set_content`), with offline networking enabled. It did not use a localhost server, source-module injection, or a storage test double. It exercised the app's session-only fallback and actual file export/restore controls.

This verifies the self-contained app and its interactive behavior, but is **not a claim that an operating-system double-click was verified on the user's computer**, or that native file-origin persistence was verified in every browser. Try opening the saved HTML in your normal browser, not a ZIP/file-preview panel. Browser policy can restrict local files/scripts, especially on managed school or work devices.

Local storage behavior can vary for local files. Keep the file in one location and export a progress backup before moving/renaming it, switching browsers, or clearing browser data. When storage is unavailable, notes and progress remain session-only; export before closing.

The optional pretrained MiniLM download/inference was not verified end-to-end. It is not required for any core lesson or quiz. No remote deployment was performed. This is not a formal accessibility audit or a guarantee of every browser/device combination.

## Quick check on your computer

Open the saved `index.html`; try a query; open a lesson and its Experiment tab; write a note; reload; check the note. Use My builder notes to export notes and back up progress. The ZIP includes everything needed for the core course.
