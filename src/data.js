/** Original, tiny teaching corpus. .test URLs identify local fixtures, not live websites. */
export const DOCUMENTS = [
  { id: 'neural', title: 'How neural networks learn', topic: 'Machine learning', url: 'https://byte.test/neural', body: 'Neural networks learn by comparing predictions with targets. Training updates connection weights to reduce prediction error. Neural networks have an input layer, hidden layers, and an output layer.' },
  { id: 'ml', title: 'Introduction to machine learning', topic: 'Machine learning', url: 'https://byte.test/ml', body: 'Models identify patterns in training data. A training algorithm adjusts parameters to reduce prediction error. The resulting model can generalize to unseen examples, but its performance depends on the task and the data.' },
  { id: 'python', title: 'Python list comprehensions', topic: 'Programming', url: 'https://byte.test/python', body: 'A list comprehension creates a new Python list from an iterable in one expression. Use [x * 2 for x in numbers] instead of a loop that appends each doubled value. A filter can keep only selected items.' },
  { id: 'loops', title: 'Writing a for loop', topic: 'Programming', url: 'https://byte.test/loops', body: 'A Python for loop repeats a block for each item in a sequence. Loops are useful when a repeated task needs several steps. More compact code is not always easier to read.' },
  { id: 'pasta', title: 'Weeknight garlic pasta', topic: 'Cooking', url: 'https://byte.test/pasta', body: 'Cook pasta in salted water until tender. Warm garlic in olive oil, then toss with the pasta and a little cooking water. Finish with parmesan for a quick dinner.' },
  { id: 'soup', title: 'A simple vegetable soup', topic: 'Cooking', url: 'https://byte.test/soup', body: 'Soften onion and carrot in olive oil. Add vegetable stock, beans, and tomatoes, then simmer until the vegetables are tender. This one-pot dinner is easy to adapt.' },
  { id: 'vectors', title: 'Embeddings and vector similarity', topic: 'Search', url: 'https://byte.test/vectors', body: 'An embedding represents text as a vector of numbers. A trained model can place related phrases near each other in its vector space. Cosine similarity compares vector directions, but a high score does not prove that a document answers the question.' },
  { id: 'keywords', title: 'Keyword search, one match at a time', topic: 'Search', url: 'https://byte.test/keywords', body: 'Keyword search counts matching terms in documents. Lowercasing makes Neural and neural match. Common words may be removed, but a basic word matcher does not know that differently worded phrases can refer to the same idea.' },
  { id: 'hybrid', title: 'Ranking with more than one signal', topic: 'Search', url: 'https://byte.test/hybrid', body: 'Hybrid search combines lexical matches with vector similarity. Scores need comparable scales before a weighted sum is meaningful. Ranking is an ordering of candidates, not a guarantee of truth.' },
  { id: 'crawler', title: 'A small, polite web crawler', topic: 'The web', url: 'https://byte.test/crawler', body: 'A crawler visits a page, extracts its text, and discovers links to other pages. A queue tracks pages still to visit while a seen set prevents duplicate visits. Respect robots rules, rate limits, and a strict domain allowlist.' },
  { id: 'sources', title: 'Why citations need checking', topic: 'Evidence', url: 'https://byte.test/sources', body: 'A citation points a reader to a source passage. Check whether that passage actually supports the claim. An existing URL or a matching quotation alone does not establish that every surrounding claim is true.' },
  { id: 'rag', title: 'Retrieval before an answer', topic: 'Evidence', url: 'https://byte.test/rag', body: 'Retrieve relevant passages before asking a language model to write an answer. Keep source identifiers with each passage so the reader can inspect the evidence. When the collection lacks enough evidence, say so rather than inventing an answer.' },
  { id: 'evaluation', title: 'Is the search engine any good?', topic: 'Evaluation', url: 'https://byte.test/evaluation', body: 'Evaluate search against a set of queries with human relevance judgments. Precision at three measures relevant results in the first three slots. Reciprocal rank rewards placing the first relevant result near the top.' },
  { id: 'plants', title: 'Caring for a houseplant', topic: 'Everyday life', url: 'https://byte.test/plants', body: 'Check soil moisture before watering a houseplant. Place the plant in light suited to its species. Yellow leaves have several possible causes, so check the growing conditions instead of assuming one cause.' },
  { id: 'hiking', title: 'A day on a mountain trail', topic: 'Everyday life', url: 'https://byte.test/hiking', body: 'Choose a trail suited to your experience and check the weather before a hike. Pack water, a map, and layers. Turn back when conditions become unsafe.' },
  { id: 'music', title: 'Finding new music', topic: 'Everyday life', url: 'https://byte.test/music', body: 'A music recommendation system can compare listening patterns or features of songs. Recommendations are predictions about taste, not rules about what a listener must enjoy.' }
];

// Eight interpretable concept axes are a deliberate teaching simplification.
// No part of this dictionary is a pretrained neural model.
export const CONCEPTS = [
  { name: 'Learning', words: ['neural','networks','network','learn','learning','models','model','training','predictions','prediction','weights','parameters','patterns','computers','data','targets'] },
  { name: 'Code', words: ['python','list','comprehension','comprehensions','loop','loops','iterable','code','expression','shorter','compact','repeats','programming','program'] },
  { name: 'Food', words: ['pasta','garlic','dinner','recipe','cook','cooking','soup','vegetable','vegetables','food','parmesan','olive','eat'] },
  { name: 'Search', words: ['search','keyword','keywords','matching','terms','embedding','embeddings','vector','vectors','similarity','ranking','rank','hybrid','lexical','meaning','semantic'] },
  { name: 'Web', words: ['crawler','crawl','crawling','page','pages','links','web','queue','seen','visits','domain','robots','website','websites'] },
  { name: 'Evidence', words: ['citation','citations','source','sources','passage','passages','evidence','claim','claims','answer','answers','quotation','truth'] },
  { name: 'Outdoors', words: ['plant','plants','houseplant','watering','leaves','soil','hike','hiking','trail','mountain','weather','water'] },
  { name: 'Evaluation', words: ['evaluate','evaluation','precision','recall','test','testing','judgments','relevance','metrics','benchmark','reciprocal'] }
];

export const CRAWL_EXTRA = [
  { id: 'crawl-chunks', title: 'Break a long page into passages', topic: 'Newly indexed', url: 'https://byte.test/chunks', body: 'Chunking splits long documents into smaller passages for retrieval. Keep the document identifier and passage offsets so a result can be traced back to its source. A chunk that is too small can lose context.' },
  { id: 'crawl-fresh', title: 'Keeping an index up to date', topic: 'Newly indexed', url: 'https://byte.test/freshness', body: 'A search index stores information collected earlier, not a live copy of the whole web. Revisit allowed pages periodically and record when content was fetched. Remove outdated entries when appropriate.' }
];
const page = (path, docId, links, extra = {}) => ({ url: `https://byte.test${path}`, docId, links, ...extra });
export const WEB_PAGES = [
  page('/', null, ['/neural', '/python', '/pasta', '/private', 'https://other.test/', '/neural#weights', '/missing']),
  page('/neural', 'neural', ['/ml', '/vectors', '/']),
  page('/python', 'python', ['/loops', '/chunks']),
  page('/pasta', 'pasta', ['/soup', '/']),
  page('/private', null, [], { blocked: true }),
  page('/ml', 'ml', ['/vectors', '/freshness']),
  page('/vectors', 'vectors', ['/hybrid', '/chunks']),
  page('/loops', 'loops', ['/python']),
  page('/chunks', 'crawl-chunks', ['/freshness']),
  page('/soup', 'soup', ['/pasta']),
  page('/hybrid', 'hybrid', ['/vectors']),
  page('/freshness', 'crawl-fresh', ['/'])
];

// Authored teaching judgments, intentionally small and inspectable. Not an external benchmark.
export const BENCHMARK = [
  { query: 'neural networks', relevant: ['neural','ml'], kind: 'exact' },
  { query: 'how do computers learn', relevant: ['ml','neural'], kind: 'rephrased' },
  { query: 'Python list comprehension', relevant: ['python'], kind: 'exact' },
  { query: 'a shorter way to write a loop', relevant: ['python','loops'], kind: 'rephrased' },
  { query: 'quick garlic dinner', relevant: ['pasta'], kind: 'everyday' },
  { query: 'how does a crawler discover pages', relevant: ['crawler'], kind: 'technical' },
  { query: 'does a citation prove a claim', relevant: ['sources'], kind: 'evidence' },
  { query: 'orbital zirconium flux capacitor', relevant: [], kind: 'out of collection' }
];
export const AUDIT = [
  { claim: 'Training updates connection weights to reduce prediction error.', source: 'neural', verdict: 'supported', quote: 'Training updates connection weights to reduce prediction error.', why: 'The cited passage explicitly supports this claim. That establishes support in this source, not a universal guarantee about every training method.' },
  { claim: 'A high cosine similarity score proves the page answers the question.', source: 'vectors', verdict: 'contradicted', quote: 'a high score does not prove that a document answers the question.', why: 'The citation is real, but the passage says the opposite. A plausible-looking citation is not enough.' },
  { claim: 'This search engine is faster than every commercial search engine.', source: 'evaluation', verdict: 'insufficient', quote: 'Evaluate search against a set of queries with human relevance judgments.', why: 'This source explains evaluation. It supplies no commercial timing measurements, so there is not enough evidence for that comparison.' }
];
