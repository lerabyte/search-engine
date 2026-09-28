// Day 5: retrieve source sentences and inspect context for a future generative model.
import { buildAnswer } from '../src/engine.js';
const query = 'how do neural networks learn?';
const answer = buildAnswer(query);
console.log('OFFLINE EXTRACTIVE ANSWER (no LLM call):\n');
console.log(answer.text);
console.log('\nCONTEXT PROMPT:\n');
console.log(answer.prompt);
console.log('\nWITH NO CONTEXT:\n');
console.log(buildAnswer(query, undefined, { withContext: false }).text);
