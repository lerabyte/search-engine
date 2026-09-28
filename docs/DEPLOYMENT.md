> **No setup needed to use the course:** the included `index.html` now opens directly in a browser. The hosting/development options below are optional. Regenerate the standalone HTML after source edits with `npm run build:standalone`.

# Publishing `search-engine`

## Run locally first

Use Node.js 20+ and run `npm start` from the folder containing `package.json`. Open `http://localhost:4173` in a current browser. The server binds only to your computer’s loopback interface; it is a local preview, not a public deployment.

Run `npm test` before publishing. Run `npm run build` to make the public `dist/` folder. It contains only HTML, CSS, modules, and the icon — not tests, source notes, or development scripts.

## GitHub Actions + Pages

Create an empty repository named `search-engine`. Copy the repository contents from this ZIP, including dotfiles, into it. The course files must be at the root alongside `README.md` and `package.json`.

A typical terminal sequence is:

```sh
git init
git add .
git commit -m "Add seven-day interactive search-engine course"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/search-engine.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your own account. These commands do not run themselves and this download does not create a remote repository.

Open the GitHub repository’s **Settings → Pages** and choose **GitHub Actions** as the source. The included workflow:

1. Checks out the repository and uses Node 22.
2. Runs all core tests and the public-file build.
3. Configures Pages and uploads `dist/` as its Pages artifact.
4. Deploys with `pages: write` and `id-token: write` in the deploy job only.

The `github-pages` environment and the final deployment step show the published URL. Pull requests run the test/build job but do not deploy. After enabling Pages, rerun the workflow or use **Actions → Test and deploy course → Run workflow**.

Reference: [GitHub’s custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Branch publishing alternative

The app is already static, so you may instead disable/remove the Actions workflow and use GitHub Pages’ **Deploy from a branch** option with `main` and `/ (root)`. Keep `.nojekyll`, `index.html`, `styles.css`, `src/`, and `assets/` in the root. Do not run two competing Pages deployment methods unintentionally.

## Another static host

Run `npm run build` and publish `dist/`. There are no build-time secrets or backend functions. The lesson routes use URL fragments (`#/day/1`), so the host does not need special SPA route rewriting.

## Troubleshooting

- **Blank page after double-clicking `index.html`:** serve the folder over HTTP; do not use `file://`.
- **404 at `/search-engine/`:** check that Pages is enabled and the successful deployment corresponds to the correct repository/branch.
- **CSS or modules missing:** do not move `index.html` away from its sibling `styles.css`, `src/`, and `assets/` files. Keep the relative directory structure.
- **Pages workflow fails before deploy:** inspect the first failing action. Make sure Pages uses GitHub Actions and organization policy permits the workflow/actions.
- **Notes disappeared:** progress is browser-local. Restore your exported JSON backup.
- **Model download fails:** the optional neural feature needs internet, model-host access, and browser WASM support. Continue in teaching mode; the rest of the course is independent.
- **Port already in use:** set the `PORT` environment variable or stop the other process before starting the preview.

No hosted URL is provided as if it already exists. The repo becomes public only after you publish it.
