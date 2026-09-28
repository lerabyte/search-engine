// Day 2: transparent teaching vectors. Not a pretrained neural model.
import { DOCUMENTS, CONCEPTS } from '../src/data.js';
import { teachingEmbedding, rank, cosine } from '../src/engine.js';
const query = 'how do computers learn';
console.log('The hand-written concept axes:');
console.table(CONCEPTS.map((axis, i) => ({ axis: axis.name, queryCoordinate: teachingEmbedding(query)[i] })));
console.table(rank(query, DOCUMENTS, { mode: 'semantic' }).map(({ doc, score }) => ({ id: doc.id, cosine: score })));
console.log('Same direction:', cosine([1, 0], [2, 0]));
console.log('Opposite directions:', cosine([1, 0], [-2, 0]));
console.log('For optional real pretrained embeddings, open the Day 2 browser lab.');
