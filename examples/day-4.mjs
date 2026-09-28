// Day 4: a real BFS queue algorithm over a local fixture. No network requests.
import { createCrawler, crawlStep, indexedDocuments } from '../src/engine.js';
let state = createCrawler(12);
while (!state.done) {
  state = crawlStep(state);
  const event = state.log[0];
  console.log(`${event.status.padEnd(8)} ${event.url}: ${event.detail}`);
}
console.log('\nIndexed documents:');
console.table(indexedDocuments(state.indexed).map(d => ({ id: d.id, title: d.title })));
