// Day 7: evaluate the same three rankers on the same authored judgments.
import { benchmark } from '../src/engine.js';
const results = benchmark(0.5);
console.table(results.map(r => ({
  method: r.mode,
  'P@3': r.precision.toFixed(3),
  'Recall@3': r.recall.toFixed(3),
  MRR: r.mrr.toFixed(3),
  'Out-of-collection abstention': r.abstention
})));
console.log('Teaching benchmark only. No commercial engine comparison.');
