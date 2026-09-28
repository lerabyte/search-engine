/** Optional, on-demand pretrained embeddings. The core course never needs this module. */
let extractor;
const cache = new Map();
export async function loadNeural(onProgress = () => {}) {
  if (extractor) return extractor;
  const { pipeline, env } = await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1');
  env.allowLocalModels = false;
  env.backends.onnx.wasm.numThreads = 1; // No cross-origin isolation requirement.
  extractor = await pipeline('feature-extraction','Xenova/all-MiniLM-L6-v2',{
    device: 'wasm', dtype: 'q8', progress_callback: onProgress
  });
  return extractor;
}
export async function neuralEmbedding(text) {
  if (!extractor) throw new Error('Load the optional neural model first.');
  if (!cache.has(text)) {
    const output = await extractor(text, { pooling: 'mean', normalize: true });
    cache.set(text,Array.from(output.data));
  }
  return cache.get(text);
}
export async function neuralVectors(query, docs) {
  const queryVector = await neuralEmbedding(query), vectors = new Map();
  for (const d of docs) vectors.set(d.id,await neuralEmbedding(`${d.title}. ${d.body}`));
  return { queryVector, vectors };
}
