# Course basis and technical reading

## Creator material

The course follows the seven-part plan supplied in the conversation:

1. Keyword search over a tiny collection.
2. Embeddings and semantic search.
3. Combine lexical and semantic ranking signals.
4. Discover pages with a controlled crawler.
5. Use retrieved evidence for an answer.
6. Make sources inspectable and check claims.
7. Test the system.

The attached **AI Agent Search Engine Series(1).pdf**, pages 1–2, supplies Day 1’s narration: a title/text/URL collection, the neural-network example, exact matches, relevance scores, sorting, and the failure of differently worded searches. The PDF itself is not redistributed in this repo. Days 2–7, quizzes, fixtures, and code are new instructional expansions of the agreed plan, not claimed quotations from the PDF.

Additional implementation detail is introduced explicitly: query-wise score normalization, the hand-written concept model, a local-only crawl fixture, extractive answers, evidence-integrity limits, and clearly defined retrieval metrics. The course never presents these as hidden capabilities of a commercial search engine.

## Primary technical sources

- **Manning, Raghavan, and Schütze: Introduction to Information Retrieval.** Foundations of indexing, lexical retrieval, and relevance evaluation. <https://nlp.stanford.edu/IR-book/>
- **Sentence Transformers: Semantic Search.** Encoding queries/documents into compatible vector spaces, selecting a suitable model, and comparing embeddings. <https://sbert.net/examples/sentence_transformer/applications/semantic-search/README.html>
- **Hugging Face: Transformers.js pipelines.** Optional browser-based pretrained inference and model downloads. <https://huggingface.co/docs/transformers.js/en/pipelines>
- **Xenova/all-MiniLM-L6-v2 model card.** The optional pretrained ONNX model used in Day 2. <https://huggingface.co/Xenova/all-MiniLM-L6-v2>
- **Elastic: Reciprocal rank fusion.** The reciprocal-position method shown as an alternative to score-weighted fusion. <https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion>
- **RFC 9309: Robots Exclusion Protocol.** The real protocol is more complete than the fixture’s teaching flag. <https://www.rfc-editor.org/rfc/rfc9309.html>
- **MDN: Cross-Origin Resource Sharing.** Explains why a static browser course is not a general-purpose live crawler. <https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS>
- **Lewis et al.: Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks.** The retrieval-plus-generation architecture. <https://arxiv.org/abs/2005.11401>
- **Stanford IR book: Evaluation of ranked retrieval results.** Precision and other ranked-retrieval evaluation concepts. <https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-of-ranked-retrieval-results-1.html>
- **GitHub Docs: Custom workflows with GitHub Pages.** The included deployment workflow structure and Pages permissions. <https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages>

The core equations are implemented directly for teaching. This site is not affiliated with these organizations. Source links lead outside the local course.
