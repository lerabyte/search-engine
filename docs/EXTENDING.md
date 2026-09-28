> **No setup needed to use the course:** the included `index.html` now opens directly in a browser. The hosting/development options below are optional. Regenerate the standalone HTML after source edits with `npm run build:standalone`.

# From the teaching lab to a real system

The course is complete as a teaching site. This document describes optional product extensions; it does not claim they are already deployed.

## 1. Replace the semantic representation deliberately

`teachingEmbedding()` in `src/engine.js` converts counts of hand-written vocabulary groups into a normalized eight-dimensional vector. This makes vector math visible but loses many distinctions. All cooking text, for example, can become almost identical in that space.

`src/neural.js` is the opt-in alternative for Day 2. It downloads a pinned Transformers.js library version and the ONNX MiniLM model, pools token features, and normalizes the resulting sentence vectors. This model is pretrained by other people, not trained in this course. Its first download and inference are not part of the benchmark. Learned coordinates do not correspond directly to the human-labeled teaching axes.

For a deployed search product, choose a model suited to your document lengths, language, and query/document relationship. Keep model and preprocessing versions with stored vectors. Re-embed the corpus when changing incompatible representation spaces. Measure whether the model helps on held-out queries rather than assuming every embedding model improves every task.

Primary reading: [Sentence Transformers semantic search](https://sbert.net/examples/sentence_transformer/applications/semantic-search/README.html), [Transformers.js pipelines](https://huggingface.co/docs/transformers.js/en/pipelines), [MiniLM ONNX model card](https://huggingface.co/Xenova/all-MiniLM-L6-v2).

## 2. Replace the fixture crawler on a server, not with a browser bypass

`crawlStep()` traverses `WEB_PAGES`, which is an explicit local graph. The domain allowlist and blocked flag demonstrate decisions without claiming to implement all HTTP or robots behavior.

A real collection worker needs permissions to collect content and must handle robots policies, identified user agents, rate limiting, timeouts, redirects, maximum response sizes, encoding, MIME types, canonicalization, deduplication, and refresh/deletion rules. Restrict allowed domains and protocols. Do not fetch user-supplied internal addresses, cloud metadata endpoints, or credentials; address validation also has to survive DNS changes and redirects. A robust crawler needs network controls, not only a string comparison.

Browser CORS restrictions are not an obstacle to defeat. Use a properly designed server-side fetcher. Never expose an unrestricted public URL-fetching endpoint as a shortcut.

Primary reading: [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309.html) and [MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS).

## 3. Add a generative answer layer without putting secrets in the site

`buildAnswer()` ranks documents, selects source sentences within a 900-character budget, preserves offsets, and returns an inspectable context prompt. The visible answer is extractive: it copies those sentences. It is not a hidden language-model call.

A generative service could receive the query and allowed passage IDs, invoke a language model on the server, and return structured claims:

```json
{
  "claims": [
    { "text": "A statement supported by the context.", "passageIds": ["neural:p1"] }
  ],
  "insufficientEvidence": false
}
```

This is an example response contract, **not a provider API implementation**. Keep provider secrets in server-side environment variables. Apply authentication, quotas, token budgets, spending controls, and request validation. Model token counts differ from this demo’s character budget.

Treat retrieved content as untrusted data. A page that says “ignore your instructions” is not authorized to modify the system, call tools, or reveal secrets. Delimit the content and constrain the answer contract, but do not treat prompt wording alone as a complete security boundary.

Primary reading: [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401).

## 4. Keep citation integrity separate from support

`validateCitation()` confirms a passage exists in the stored source at its recorded offsets. That does not prove the source is accurate, the claim is entailed, or the answer is complete. A production validator can reject nonexistent IDs and altered quotes, while support checks or human review address meaning. If sources can change, keep a version or fetched-at snapshot with the evidence.

The Day 6 exercise has human-authored verdicts for supported, contradicted, and insufficient-evidence claims. It is not an autonomous fact-checking model.

## 5. Expand the benchmark without moving the goalposts

The supplied benchmark is only a teaching fixture. Add representative, human-judged queries; document ambiguous cases; separate tuning and held-out test sets; and keep the corpus/model/algorithm versions fixed for a comparison. Test lexical and semantic failure cases, out-of-collection behavior, and duplicates.

Retrieval metrics alone do not measure answer correctness, citation support, latency distributions, freshness, reliability, or costs. The included `commercial-comparison-template.csv` is a blank worksheet for a separately dated manual comparison. It contains no fabricated external results.

Primary reading: [Stanford’s ranked-retrieval evaluation chapter](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-of-ranked-retrieval-results-1.html).
