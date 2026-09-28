import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildStandalone } from '../scripts/build-standalone.mjs';

const temporary = await mkdtemp(join(tmpdir(), 'search-engine-standalone-'));
const output = join(temporary, 'course.html');
await buildStandalone(output);
const html = await readFile(output, 'utf8');
const payloadText = html.match(/<script id="course-sources" type="application\/json">([\s\S]*?)<\/script>/)?.[1];
const modules = JSON.parse(payloadText);

test('standalone HTML has no external startup stylesheet or script', () => {
  assert.ok(!/<script[^>]+src=/.test(html));
  assert.ok(!/<link[^>]+rel="stylesheet"/.test(html));
  assert.ok(html.includes('<style>'));
});
test('all eight source modules are embedded, including optional model adapter', () => {
  assert.deepEqual(Object.keys(modules).sort(), ['app.js','course.js','data.js','engine.js','labs.js','neural.js','store.js','ui.js']);
});
test('bundled lessons, corpus and engine are not replaced by a reduced demo', async () => {
  for (const name of ['course.js','data.js','engine.js','labs.js']) {
    const original = await readFile(new URL('../src/' + name, import.meta.url), 'utf8');
    assert.equal(modules[name], original);
  }
});
test('script payload cannot contain an unescaped closing script tag', () => {
  assert.ok(!payloadText.includes('<'));
  assert.ok(payloadText.includes('\\u003c'));
});
test('both the favicon and sidebar icon are embedded, not relative-file requests', () => {
  assert.ok(html.includes('data:image/svg+xml;base64,'));
  assert.ok(!modules['app.js'].includes('./assets/favicon.svg'));
});
await rm(temporary, {recursive:true, force:true});
