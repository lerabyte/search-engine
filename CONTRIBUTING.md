> The delivered `index.html` opens directly in a browser. After editing source files, rebuild it with `npm run build:standalone`; no end-user setup is required.

# Contributing

Keep the course inspectable. A learner should be able to point to the code that explains a visible result.

1. Run `npm test` before and after changing algorithms or data.
2. Add a hand-calculated test for new scoring or metric behavior.
3. Keep visible labels honest: teaching models, local fixtures, and extractive baselines must not be described as live neural generation or public-web crawling.
4. Update the lesson when its underlying behavior changes.
5. Check both a wide layout and a 390-pixel mobile viewport. Long code blocks should scroll inside their panels, not widen the page.
6. Keep keyboard access, labels, visible focus, and reduced-motion support.
7. Escape user text before adding it to HTML. Do not add secrets, analytics, or external requests to the default experience.
8. If adding dependencies, pin versions and document network/model downloads and licenses.

Content changes belong in `src/course.js`; fixtures belong in `src/data.js`; reusable algorithms belong in `src/engine.js`. Avoid teaching a result by hard-coding the expected rank into the UI.
