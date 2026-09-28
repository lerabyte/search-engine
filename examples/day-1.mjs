// Day 1: count exact tokens, score pages, and sort the results.
import { DOCUMENTS } from '../src/data.js';
import { rank } from '../src/engine.js';
for (const query of ['how do neural networks learn?', 'how do computers learn']) {
  console.log(`\nQUERY: ${query}`);
  const hits = rank(query, DOCUMENTS, { mode: 'keyword', titleWeight: 1 });
  console.table(hits.map(({ doc, score }) => ({ id: doc.id, title: doc.title, score })));
}
