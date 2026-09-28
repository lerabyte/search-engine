// Day 6: quote integrity is not the same as factual support.
import { DOCUMENTS, AUDIT } from '../src/data.js';
import { buildAnswer, validateCitation } from '../src/engine.js';
for (const passage of buildAnswer('neural networks').passages) {
  console.log(`${passage.id}: exact quote matches source? ${validateCitation(passage)}`);
  console.log(`Modified quote matches source? ${validateCitation({ ...passage, text: 'Invented text.' })}`);
}
console.log('\nHuman-authored citation audit:');
for (const item of AUDIT) {
  console.log(`\nCLAIM: ${item.claim}`);
  console.log(`SOURCE: ${DOCUMENTS.find(d => d.id === item.source).body}`);
  console.log(`VERDICT: ${item.verdict}\nWHY: ${item.why}`);
}
