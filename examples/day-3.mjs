// Day 3: normalize scores before mixing them. Alpha = exact-word weight.
import { DOCUMENTS } from '../src/data.js';
import { rank } from '../src/engine.js';
const query = 'a shorter way to write a loop';
for (const alpha of [0, 0.5, 1]) {
  console.log(`\nExact-word weight: ${alpha}`);
  console.table(rank(query, DOCUMENTS, { mode: 'hybrid', alpha }).slice(0, 5).map(r => ({
    id: r.doc.id, keyword: r.keywordNormalized, semantic: r.semantic, final: r.score
  })));
}
console.log('\nAlternative: reciprocal rank fusion');
console.table(rank(query, DOCUMENTS, { mode: 'rrf' }).map(r => ({ id: r.doc.id, score: r.score })));
