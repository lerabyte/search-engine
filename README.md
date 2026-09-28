# search-engine

### What happens after you hit search? Let’s build it and find out.

A colorful, interactive seven-day course by **@lerabyte**. Students can read a lesson, change a real experiment, inspect the code, check their understanding, and keep their own builder notes.

![Course map](docs/course-preview.png)

**No signup. No API key. No build dependencies.** The default course runs entirely in the browser against an included teaching corpus.

## Open the course — no setup

**Double-click `index.html`.** It opens the complete course in your browser.

No terminal, Node.js installation, package installation, login, localhost, or server is needed to use the lessons. Extract the ZIP first, then open the HTML file in Chrome, Edge, Firefox, or Safari rather than in a ZIP/document preview. You can also copy `index.html` anywhere by itself; it contains the whole app, lesson data, styles, and icon.

All seven core lessons, quizzes, search experiments, notes, and exports work without an internet connection. The optional Day 2 pretrained neural-model download and external reading links still require internet. The default teaching-vector experiment does not.

Progress is kept in this browser when local storage is available. File-based storage behavior can vary by browser or file location; use **My builder notes → Back up progress** to keep a portable backup. On devices that block storage, you can still use the course and export your notes/progress for the session.

### For people editing the source

The included `index.html` is already built. Edit the modules under `src/`, `styles.css`, or `src/shell.html`, then regenerate it with `npm run build:standalone` using Node.js 20+. This build uses no packages or downloads. `npm start` remains an optional development method, never a requirement for opening the supplied course.

## The seven days

| Day | Lesson | What you actually do |
| --- | --- | --- |
| 1 | Make it search | Type queries, extract tokens, inspect highlighted matches, change title weights, and sort exact-word scores. |
| 2 | Search by meaning | Inspect eight-dimensional teaching vectors, compare cosine scores, and optionally load real pretrained MiniLM embeddings. |
| 3 | Rank the good stuff | Blend normalized keyword scores with teaching-vector similarity. Move the weight slider or switch to reciprocal rank fusion. |
| 4 | Follow the links | Step or auto-run a crawler through a local website graph. Inspect its queue, duplicates, blocks, errors, and indexed pages. |
| 5 | From links to answers | Retrieve source passages, inspect the context prompt, generate an **extractive** answer, or observe an evidence-missing response. |
| 6 | Show the receipts | Open citations, audit three claims, and distinguish supported, contradicted, and insufficient-evidence conclusions. |
| 7 | Put it to the test | Compare three rankers on eight inspectable teaching queries and export the actual metric rows as CSV. |

Each day includes a detailed explanation, a practical mission, an interactive lab, readable code, three explained quiz questions, and a notebook. All lessons are open immediately; completion requires trying the lab and answering its checks correctly. Time estimates are suggestions, not tracking or deadlines.

## Extra things to explore

- A live search example on the colorful course map.
- A combined playground with custom documents and JSON corpus export.
- A searchable plain-English glossary.
- Local progress, quiz answers, notes, and discovered fixture pages.
- Markdown notes export, JSON progress backup/restore, and a confirmed reset.
- Mobile navigation, keyboard-operable controls, visible focus, and reduced-motion support.
- Seven command-line examples using the same tested engine functions as the course.

## What is real, and what is a teaching model?

This distinction is displayed **inside the course**, not only here.

**Real local calculations:** exact token counts, keyword weights, vector normalization and cosine similarity, score normalization, hybrid ranking, reciprocal rank fusion, queue traversal, sentence offsets, extractive passage selection, citation-integrity checks, and retrieval metrics.

**Deliberate teaching simplifications:**

1. The default “semantic” model uses a hand-written eight-axis concept vocabulary. It is not trained AI and it does not understand unrestricted language. The two-axis graph shows only a slice; scores use all eight dimensions.
2. Day 2 optionally downloads **Xenova/all-MiniLM-L6-v2** through **Transformers.js 3.8.1**. That mode is actual pretrained neural inference in the browser, not training from scratch. It needs internet access and a compatible browser. The rest of the course remains in the fixed, offline teaching representation so experiments are reproducible.
3. Day 4 traverses an included local website fixture. It never crawls public sites, and its blocked-page flag is not a complete robots.txt parser.
4. Day 5 copies selected source sentences. It teaches retrieval, chunking, context construction, and evidence handling, but does not pretend to call an LLM. The prompt is visible. See [production extension notes](docs/EXTENDING.md) for the boundary between this baseline and a generative service.
5. The benchmark uses eight authored queries over a tiny corpus. It measures retrieval, **not commercial search engines or LLM answer quality**.

The `.test` addresses belong to the local teaching documents; they are not claims that those articles exist on the public web. Source readers show the bundled text rather than navigating to a fake URL.

## Publish the course on GitHub Pages

1. Create a GitHub repository named **`search-engine`**.
2. Put the contents of this folder at the repository root, including `.github/workflows/pages.yml`. Do not put the entire ZIP file into the repository and expect Pages to unpack it.
3. In the repository’s **Settings → Pages**, set the publishing source to **GitHub Actions**.
4. Push to `main`, or run the workflow from the **Actions** tab after changing the Pages setting.
5. The included workflow runs the tests, builds the public files, and deploys the course. Its deployment output contains your site URL.

The expected project-site address is `https://YOUR-USERNAME.github.io/search-engine/`. It is **not live until you publish it**. Hash-based lesson routes and relative asset paths work under a repository subdirectory without a hard-coded username.

For full instructions, see [DEPLOYMENT.md](docs/DEPLOYMENT.md). The workflow uses GitHub’s documented Pages artifact/deploy actions: [official Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Commands

```sh
npm run build:standalone         # Rebuild the double-clickable index.html
npm start                       # Optional development server
npm test                        # 65 dependency-free tests
npm run build                   # Rebuild the standalone course + dist/
npm run preview                 # Serve dist/ after building
node examples/day-1.mjs          # Run the keyword-search example
node examples/day-7.mjs          # Run the benchmark example
```

Change the local port when needed:

```sh
# macOS / Linux
PORT=8080 npm start

# Windows PowerShell
$env:PORT=8080; npm start
```

## Repository map

```text
search-engine/
├── index.html                  # Complete course: double-click to open
├── styles.css                  # Color system, layouts, motion, responsive rules
├── assets/favicon.svg          # Original little search icon
├── src/
│   ├── shell.html              # Editable HTML shell used by the bundle builder
│   ├── app.js                  # Routing, course map, lessons, quizzes, notes
│   ├── labs.js                 # Seven interactive labs + combined playground
│   ├── engine.js               # Inspectable search / crawl / answer / metric logic
│   ├── data.js                 # Original documents, local web, benchmark, audit
│   ├── course.js               # Lesson writing, missions, code, quiz questions
│   ├── neural.js               # Optional on-demand pretrained model adapter
│   ├── store.js                # Bounded, versioned local progress persistence
│   └── ui.js                   # Icons, escaping, source dialogs, downloads
├── examples/day-1.mjs … day-7.mjs
├── scripts/build-standalone.mjs # Dependency-free self-contained HTML builder
├── scripts/serve.mjs            # Optional local-only development server
├── scripts/build.mjs            # Dependency-free public-file build
├── tests/                      # Core engine, fixture, and state tests
├── docs/                       # Setup, source references, extension notes, QA
└── .github/workflows/pages.yml  # Test + deploy to GitHub Pages
```

## Make it yours

Edit `src/course.js` for the lessons, titles, time estimates, questions, and explanations. Edit `src/data.js` for the tiny internet, concept vocabulary, web graph, or benchmark judgments. Change the CSS variables at the top of `styles.css` to adjust the color palette. The creator name is plain text in `src/app.js` and the README.

After changing source files, run `npm run build:standalone` and reopen or refresh `index.html`. A published Actions deployment rebuilds after each push to `main`. End users never need to run a build command.

## Privacy and data

The default course has no analytics, advertising, login, tracking scripts, remote fonts, or automatic API calls. Progress uses the browser’s `localStorage` key `lerabyte.search-engine.v1`. It is not synchronized across devices and may be erased by clearing site data. Export a backup to keep it.

The optional neural button requests library/model files from jsDelivr and Hugging Face, which can observe the usual network metadata for those requests. Query and document text are passed to the locally running pipeline; this app does not send them to a hosted inference service. Opening the external source links takes you to those sites under their own policies.

Custom documents added in the playground last only for that page session. Export the collection before navigating away if you need them later. This keeps arbitrary user text out of the saved course progress file.

## Tests and known limits

See [QA.md](docs/QA.md) for the checks performed and what was not verified. The optional neural model requires a separate real-network/browser check on the target device; a blocked or failed download displays a recoverable error and leaves the core course usable.

This is an educational course and local search playground, not a production crawler, multiuser learning-management system, or internet-scale answer engine. There is no server-side account system and no claim of automatic fact verification.

## Sources and license

Day 1 follows Lera’s supplied “AI Agent Search Engine Series” narration. Days 2–7 are original course expansions of the agreed series plan; added technical detail and implementation limitations are distinguished in the UI. Primary technical reading is listed in [SOURCES.md](docs/SOURCES.md).

Original code, lesson text, and UI assets are provided under the [MIT license](LICENSE). Optional third-party model/library downloads retain their own licenses. No font files or third-party logos are bundled.
