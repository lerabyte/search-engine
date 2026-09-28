/** Build the complete, double-clickable course. Uses only Node built-ins.
 * All lesson modules, styles, data and the favicon are embedded in index.html.
 * At runtime, in-memory Blob module URLs preserve native ES-module live bindings.
 * No localhost, file fetches, import maps, or network are needed by the core course.
 */
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export async function buildStandalone(destination = join(root, 'index.html')) {
  const modules = {};
  const favicon = 'data:image/svg+xml;base64,' + (await readFile(join(root, 'assets/favicon.svg'))).toString('base64');
  for (const name of (await readdir(join(root, 'src'))).filter(n => n.endsWith('.js')).sort()) {
    modules[name] = (await readFile(join(root, 'src', name), 'utf8')).replaceAll('./assets/favicon.svg', favicon);
  }
  // JSON is inert, and escaped '<' prevents a lesson/code string closing its script tag.
  const payload = JSON.stringify(modules).replace(/</g, '\\u003c');
  const css = await readFile(join(root, 'styles.css'), 'utf8');
  let html = await readFile(join(root, 'src/shell.html'), 'utf8');
  html = html.replace('href="./assets/favicon.svg"', `href="${favicon}"`)
    .replace('<link rel="stylesheet" href="./styles.css">', `<style>\n${css}\n</style>`);
  const bootstrap = `
  <script id="course-sources" type="application/json">${payload}</script>
  <script>
  (function () {
    'use strict';
    var modules = JSON.parse(document.getElementById('course-sources').textContent);
    var cache = new Map(), building = new Set();
    function moduleURL(id) {
      if (cache.has(id)) return cache.get(id);
      if (building.has(id)) throw new Error('Unexpected cyclic module: ' + id);
      if (!Object.prototype.hasOwnProperty.call(modules, id)) throw new Error('Missing course module: ' + id);
      building.add(id);
      // Current source uses same-directory named imports and optional dynamic imports.
      // External model imports stay untouched and are used only on explicit request.
      var code = modules[id].replace(/(\\bfrom\\s+|\\bimport\\s*\\(\\s*)(['"])(\\.\\/[A-Za-z0-9_.-]+\\.js)\\2/g,
        function (whole, lead, quote, spec) {
          var dependency = spec.slice(2);
          if (!Object.prototype.hasOwnProperty.call(modules, dependency)) return whole;
          return lead + quote + moduleURL(dependency) + quote;
        });
      var url = URL.createObjectURL(new Blob([code + '\\n//# sourceURL=search-engine/' + id], { type: 'text/javascript' }));
      cache.set(id, url); building.delete(id); return url;
    }
    function showBootError(error) {
      console.error(error);
      var app = document.getElementById('app');
      app.innerHTML = '<div style="max-width:600px;margin:10vh auto;padding:32px;font:18px/1.6 system-ui"><h1>Let’s open your course.</h1><p>Save this HTML file to your computer, then open the saved file in Chrome, Edge, Firefox, or Safari rather than inside a file preview.</p><p>No terminal or server is needed. On a managed device, browser policy may restrict local files or scripts.</p><details><summary>Error details</summary><pre id="boot-error-text" style="white-space:pre-wrap"></pre></details></div>';
      document.getElementById('boot-error-text').textContent = String(error && error.message || error);
    }
    try { import(moduleURL('app.js')).catch(showBootError); } catch (error) { showBootError(error); }
  }());
  </script>`;
  html = html.replace('<script type="module" src="./src/app.js"></script>', bootstrap);
  await writeFile(destination, html);
  return destination;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const output = await buildStandalone(process.argv[2] ? resolve(process.argv[2]) : undefined);
  console.log('Ready to double-click: ' + output);
}
