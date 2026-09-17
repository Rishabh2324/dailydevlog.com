# AI Engineering Course: Curriculum Blueprint (as of September 2026)

> The original course blueprint (generated 2026-09-17). The site implementation lives in `src/content/ai-course/`
> (`course.yaml` is the live outline). Session-by-session writing status is in `docs/ai-course-plan.md`.

**How the current facts were checked:** I looked up the fast-moving parts: the MCP spec, the Vercel AI SDK,
LangChain/LangGraph, OpenAI's API changes, A2A, the OWASP lists, OpenTelemetry GenAI conventions, Agent Skills and
Mastra. Stable material, like papers and fundamentals, comes from primary sources. Anything likely to change is
marked **⚠️ VOLATILE**.

---

## 1. Course philosophy

**UNDERSTAND → VISUALIZE → EXPLAIN → BUILD → BREAK → DEBUG → APPLY**

Six rules shape the course:

1. **The problem comes before the tool.** Every technology is introduced as an answer to a problem you've already run into.
2. **Build it by hand before using a framework.** You write a raw `fetch` to an LLM before the AI SDK. You write cosine similarity yourself before touching a vector DB. You write a tool loop by hand before `ToolLoopAgent` or LangGraph.
3. **Evaluation starts in week 3, not week 11.** You can't improve a probabilistic system you don't measure. This is a best practice, not an optional add-on.
4. **Security, cost and observability are part of every project.** They are not a final chapter.
5. **TypeScript first.** Python appears only in Season 8 (fine-tuning, model internals), where that ecosystem really is Python-only.
6. **No vendor lock-in.** Examples use provider-agnostic patterns. Each vendor-specific API is labeled as such.

Content is labeled throughout as **[FACT]**, **[BEST PRACTICE]**, **[OPINION]** or **[EMERGING]**.

## 2. Target outcome

By the end you can design, build, evaluate, secure, observe and run a production AI application end to end: React
UI → BFF → orchestrator → LLM, RAG, tools and MCP → data. You can also explain every layer in an interview, down to
how logits turn into tokens.

## 3. Learning levels (used on every topic)

| Level | Meaning |
|---|---|
| **L1 Foundation** | I can explain it |
| **L2 Practical** | I can build it |
| **L3 Engineering** | I can design it and choose between options |
| **L4 Advanced** | I understand the internals and trade-offs |
| **L5 Production** | I can operate it reliably at scale |

Notation: `[L2]` is the target level for you. `← 1.2, 1.3` lists the prerequisite topic IDs.

---

## 4. Course roadmap: seasons

The requested 8-season structure changed in two ways. Both are **[OPINION]**, with the reasons given.

- **AI-native software development moves to Season 9, with a light thread running from Week 1.** You should use coding agents from day one. But you can only understand context engineering, skills, MCP and agent verification after you've built agents and MCP servers yourself.
- **Evaluation, security and observability become their own season (6),** and a minimal eval module is added in Season 2. This follows the "eval early" practice.

```
S1  AI & LLM Foundations              how models actually work
S2  Building LLM Applications          prompts, APIs, structured output, streaming, chat UI, eval basics
S3  Embeddings & Retrieval             vectors, similarity, vector DBs, hybrid search
S4  RAG & Knowledge Systems            RAG core, data engineering, advanced RAG
S5  Tools, Agents, MCP & Memory        tool calling → workflows → agents → MCP
S6  Quality: Eval, Security, Observability
S7  Production AI Architecture         architecture, cost, performance, deployment
S8  Models Under the Hood              open weights, local inference, fine-tuning, multimodal
S9  AI-Native Engineering & Frontier   coding agents, context engineering, emerging systems

Parallel tracks:  [FE] AI for Frontend Engineers   |   [DEV] AI-native dev thread (weekly habit)
```

---

## 5. The complete topic map

### SEASON 1: AI & LLM Foundations

**Module 1.1: From AI to deep learning** `← none`
- 1.1.1 AI vs ML vs DL vs GenAI: the nested sets `[L1]`
- 1.1.2 Rules vs learned functions. Mental model: "a program whose logic is fitted from data" `[L1]`
- 1.1.3 Discriminative vs generative models `[L1]` ← 1.1.2
- 1.1.4 Neural networks: neurons, layers, activations (drawn as function composition) `[L1]` ← 1.1.2
- 1.1.5 Parameters, weights, biases (in JS terms, "the numbers in a giant config file") `[L1]` ← 1.1.4
- 1.1.6 Loss functions: measuring wrongness `[L1]` ← 1.1.5
- 1.1.7 Gradient descent and optimization, built by intuition plus about 30 lines of TS `[L2]` ← 1.1.6
- 1.1.8 Backpropagation, intuition only (no derivations) `[L1]` ← 1.1.7
- 1.1.9 Training vs inference: build time vs runtime `[L1]` ← 1.1.7
- 1.1.10 Overfitting, generalization, train/val/test splits `[L1]` ← 1.1.9
- 1.1.11 Model evaluation basics: accuracy, precision, recall, F1 (reused later in retrieval) `[L2]` ← 1.1.10
- 1.1.12 GPUs, parallelism, why AI needs huge compute (matrix math, memory bandwidth) `[L1]` ← 1.1.5
- 1.1.13 Scaling laws, intuition only (why "bigger" worked) `[L1]` ← 1.1.12
- *Math kept to:* vectors, dot products, "slope" as a gradient, probability distributions, softmax.

**Module 1.2: NLP foundations and the road to LLMs** `← 1.1`
- 1.2.1 Text representation: characters, words, one-hot, bag-of-words, TF-IDF `[L1]`
- 1.2.2 Vocabulary and the out-of-vocabulary problem `[L1]` ← 1.2.1
- 1.2.3 Tokenization: word, character, subword `[L2]` ← 1.2.2
- 1.2.4 BPE, WordPiece, SentencePiece: how they differ and why subwords won `[L2]` ← 1.2.3
- 1.2.5 Token quirks: numbers, code, non-English text costing more tokens, "strawberry" letter counting `[L2]` ← 1.2.4
- 1.2.6 Word embeddings (word2vec intuition): meaning as position in space `[L1]` ← 1.2.1
- 1.2.7 Context and why static embeddings fail ("bank" by the river vs "bank" for money) `[L1]` ← 1.2.6
- 1.2.8 Sequence modeling: RNNs/LSTMs and the bottleneck problem `[L1]` ← 1.2.7
- 1.2.9 Attention as a fix for the bottleneck `[L1]` ← 1.2.8
- 1.2.10 Timeline: n-grams → word2vec → seq2seq → attention → Transformer → BERT/GPT → ChatGPT → reasoning models `[L1]`

**Module 1.3: Transformers** `← 1.2`
- 1.3.1 Why transformers were created: parallelism plus long-range dependencies `[L1]`
- 1.3.2 Self-attention: Query/Key/Value as a "soft hash-map lookup" `[L4]` ← 1.3.1
- 1.3.3 Scaled dot-product attention, worked through with small numbers `[L4]` ← 1.3.2
- 1.3.4 Multi-head attention `[L1]` ← 1.3.3
- 1.3.5 Positional encoding (sinusoidal → RoPE) `[L1]` ← 1.3.2
- 1.3.6 Feed-forward networks (where much of the "knowledge" lives) `[L1]`
- 1.3.7 Residual connections and layer normalization `[L1]`
- 1.3.8 The transformer block, stacked N times `[L1]` ← 1.3.4–1.3.7
- 1.3.9 Encoder-only, decoder-only, encoder-decoder, and which models use which `[L1]` ← 1.3.8
- 1.3.10 Causal masking `[L2]` ← 1.3.9
- 1.3.11 Context window and O(n²) attention cost; the KV cache `[L4]` ← 1.3.3
- 1.3.12 Why transformers changed AI: scale, transfer, one architecture for every modality `[L1]`

**Module 1.4: How LLMs work** `← 1.3`
- 1.4.1 What an LLM is: a next-token predictor over a learned distribution `[L1]`
- 1.4.2 Pretraining, base models, foundation models `[L1]`
- 1.4.3 **The generation pipeline:** prompt → tokens → embeddings → blocks → logits → softmax → sampling → next token → loop `[L4]` ← 1.3.10
- 1.4.4 Sampling: greedy, temperature, top-k, top-p, and why output is non-deterministic `[L2]` ← 1.4.3
- 1.4.5 Inference phases: prefill vs decode, and why this matters for latency and cost `[L4]` ← 1.3.11
- 1.4.6 Instruction tuning / SFT: base model → assistant `[L1]` ← 1.4.2
- 1.4.7 RLHF, preference optimization (DPO), constitutional approaches, alignment `[L1]` ← 1.4.6
- 1.4.8 Hallucination: why it follows from how models are trained `[L3]` ← 1.4.3, 1.4.7
- 1.4.9 Reasoning models and test-time compute `[L3]` ← 1.4.7 **⚠️ VOLATILE**
- 1.4.10 Model size, parameters, MoE (intro), and quantization/distillation (intro) `[L1]`
- 1.4.11 Model families: closed vs open-weight, what "open source" really means `[L1]` **⚠️ VOLATILE**
- 1.4.12 Model selection as an engineering trade-off: quality, latency, cost, context, modality, license, data residency `[L3]`
- 1.4.13 Knowledge cutoffs and why LLMs need external knowledge (sets up RAG and tools) `[L1]`

**Season 1 capstone:** "LLM Internals Explainer". An interactive React page that shows tokenization, a toy attention
matrix, and a temperature/top-p sampling playground over real logprobs from an API.

---

### SEASON 2: Building LLM Applications

**Module 2.1: Prompt engineering as specification writing** `← 1.4`
- 2.1.1 Why prompts work: conditioning a probability distribution, not "magic words" `[L3]`
- 2.1.2 System vs user vs assistant messages; instruction hierarchy `[L2]`
- 2.1.3 Zero-shot, few-shot, and why examples work (in-context learning) `[L2]`
- 2.1.4 Role prompting: what it actually changes and what it doesn't `[L1]`
- 2.1.5 Delimiters, XML/Markdown structure, putting context first vs last `[L2]`
- 2.1.6 Prompt templates as typed functions `[L2]`
- 2.1.7 Asking for reasoning vs using reasoning models (when "think step by step" is obsolete) `[L3]` **⚠️ VOLATILE**
- 2.1.8 Prompt decomposition and chaining `[L2]`
- 2.1.9 Query rewriting (preview for RAG) `[L2]`
- 2.1.10 Prompt injection 101: why instructions and data share one channel `[L1]` (deep dive in 6.2)
- 2.1.11 Prompts as code: versioning, review, rollout `[L3]`

**Module 2.2: LLM APIs from first principles** `← 2.1`
- 2.2.1 The request/response anatomy: messages, model, params, stop reasons `[L2]`
- 2.2.2 Tokens and billing: input vs output vs cached vs reasoning tokens `[L2]`
- 2.2.3 Context limits and truncation strategies `[L2]`
- 2.2.4 Auth, keys, secrets; **why keys never touch the browser** `[L2]`
- 2.2.5 Rate limits (RPM/TPM), 429s, backoff with jitter, retries, idempotency `[L3]`
- 2.2.6 Timeouts, cancellation (AbortController end to end), error taxonomy `[L3]`
- 2.2.7 Provider landscape: OpenAI Responses API, Anthropic Messages API, Gemini API, OpenAI-compatible endpoints `[L2]` **⚠️ VOLATILE**. The OpenAI Assistants API shut down on Aug 26, 2026; use Responses.
- 2.2.8 Provider abstraction: build your own thin adapter, then compare with the AI SDK `[L3]`
- 2.2.9 Multimodal inputs (images and PDFs in messages), intro `[L2]`
- 2.2.10 Prompt caching (provider-side) vs response caching (yours) `[L3]`
- 2.2.11 Batch APIs for offline work `[L2]`

**Module 2.3: Structured outputs** `← 2.2`
- 2.3.1 Why free text breaks software: parsing, contracts, types `[L1]`
- 2.3.2 JSON mode vs schema-constrained decoding (how constrained decoding works) `[L4]`
- 2.3.3 Zod / JSON Schema as the contract; validation and repair loops `[L2]`
- 2.3.4 Extraction, classification and routing patterns `[L2]`
- 2.3.5 Schema design: enums, nullable fields, `reasoning` fields, avoiding over-nesting `[L3]`
- 2.3.6 Failure modes: refusals, truncation, valid JSON with wrong values `[L3]`

**Module 2.4: Streaming** `← 2.2` `[FE]`
- 2.4.1 Why stream: perceived latency, time to first token (TTFT) `[L1]`
- 2.4.2 How providers stream: SSE event types, deltas, tool-call deltas `[L4]`
- 2.4.3 SSE vs WebSockets vs fetch + ReadableStream; when to use each `[L3]`
- 2.4.4 Proxying streams through your backend without buffering (edge/serverless gotchas) `[L3]`
- 2.4.5 Parsing streams in the browser; partial JSON; streaming structured output `[L2]`
- 2.4.6 Cancellation, disconnects, resumable streams `[L3]`
- 2.4.7 Backpressure and token rendering performance in React `[L3]`

**Module 2.5: Chat applications** `← 2.4` `[FE]`
- 2.5.1 Conversation state model: messages, parts, tool parts, metadata `[L2]`
- 2.5.2 Server-side vs client-side history; persistence schema `[L3]`
- 2.5.3 Context window management: truncation, summarization, sliding windows `[L3]`
- 2.5.4 Optimistic UI, retry, regenerate, edit-and-branch `[L2]`
- 2.5.5 Loading, partial and error states; markdown/code rendering safely (XSS!) `[L2]`
- 2.5.6 Accessibility for streaming content (live regions, focus, reduced motion) `[L2]`

**Module 2.6: Evaluation basics (eval early)** `← 2.3`
- 2.6.1 Why unit tests aren't enough for probabilistic output `[L1]`
- 2.6.2 Error analysis first: reading 50 traces beats any dashboard `[L2]`
- 2.6.3 Golden datasets v0: 20–50 hand-labeled cases `[L2]`
- 2.6.4 Code-based assertions (schema, contains, regex, length) `[L2]`
- 2.6.5 Running evals in CI; comparing prompt versions `[L2]`

**Season 2 capstone:** Capstone v1–v3 (see section 8).

---

### SEASON 3: Embeddings & Retrieval

**Module 3.1: Embeddings, in depth** `← 1.2.6, 2.2`
- 3.1.1 What embeddings are and why they exist: meaning as coordinates `[L2]`
- 3.1.2 Dimensions: what they are and aren't (not human-readable features) `[L1]`
- 3.1.3 Similarity: dot product, cosine, Euclidean, with numeric examples by hand `[L4]`
- 3.1.4 Normalization and why cosine equals dot product on unit vectors `[L4]`
- 3.1.5 How embedding models are trained: contrastive learning, bi-encoders (intuition) `[L1]`
- 3.1.6 Query vs document embeddings; asymmetric models and task prefixes `[L3]`
- 3.1.7 Multilingual and code embeddings `[L2]`
- 3.1.8 Matryoshka embeddings / dimension truncation; cost vs quality `[L3]`
- 3.1.9 Limitations: negation, numbers, exact IDs, domain jargon, "similar ≠ relevant" `[L3]`
- 3.1.10 Choosing embedding models: MTEB (and its pitfalls), your own eval, re-embedding cost `[L3]` **⚠️ VOLATILE**
- 3.1.11 Visualizing embeddings (PCA/UMAP intuition) `[L1]`

**Module 3.2: Search fundamentals** `← 3.1`
- 3.2.1 Keyword search: inverted indexes, BM25 (how Postgres FTS/Elasticsearch work) `[L2]`
- 3.2.2 Dense vs sparse retrieval `[L3]`
- 3.2.3 Exact kNN (brute force) and why it doesn't scale `[L2]`
- 3.2.4 ANN: recall vs latency trade-off `[L4]`
- 3.2.5 HNSW internals (skip-list intuition), IVF, product quantization (intro) `[L4]`
- 3.2.6 Hybrid search and fusion (Reciprocal Rank Fusion) `[L3]`
- 3.2.7 Metadata filtering: pre- vs post-filtering and the recall trap `[L3]`
- 3.2.8 Retrieval metrics: precision@k, recall@k, MRR, nDCG `[L3]` ← 1.1.11

**Module 3.3: Vector databases** `← 3.2`
- 3.3.1 What a vector DB adds: index + storage + filtering + CRUD + ops `[L1]`
- 3.3.2 Why a plain B-tree/SQL `LIKE` can't do semantic search `[L1]`
- 3.3.3 Architecture: segments, index builds, memory vs disk, updates/deletes `[L4]`
- 3.3.4 **Postgres + pgvector** as the default (HNSW, filtering, hybrid with FTS) `[L2]`
- 3.3.5 Specialized DBs: Qdrant, Weaviate, Milvus, Pinecone, Turbopuffer, LanceDB; categories, not a shopping list `[L1]` **⚠️ VOLATILE**
- 3.3.6 Decision framework: pgvector vs specialized vs search engine (OpenSearch/Elastic) `[L3]`
- 3.3.7 Scaling: sharding, multi-tenancy (namespace vs row-level filter), quantization, cost `[L5]`

**Season 3 capstone:** Capstone v4–v5, plus Project 5.

---

### SEASON 4: RAG & Knowledge Systems

**Module 4.1: RAG from first principles** `← 3.3, 2.3`
- 4.1.1 The problem: knowledge cutoff, private data, freshness, hallucination `[L1]`
- 4.1.2 RAG vs long context vs fine-tuning vs tools: the first decision tree `[L3]`
- 4.1.3 Naive RAG, end to end: ingest → chunk → embed → index → retrieve → construct context → generate `[L2]`
- 4.1.4 Context construction: ordering, dedupe, token budgeting, "lost in the middle" `[L3]`
- 4.1.5 Grounding prompts: "answer only from sources, say when you don't know" `[L2]`
- 4.1.6 Citations: chunk IDs, span-level quotes, verification `[L2]`
- 4.1.7 **RAG failure modes taxonomy:** missing content, missed retrieval, not in context, not extracted, wrong format, wrong specificity, incomplete `[L3]`
- 4.1.8 Debugging RAG: retrieval problem or generation problem? `[L3]`

**Module 4.2: RAG data engineering** `← 4.1`
- 4.2.1 Document loaders: PDF, HTML, Markdown, DOCX, APIs, databases, web crawling `[L2]`
- 4.2.2 Parsing hard formats: tables, multi-column PDFs, scanned docs, OCR, layout models `[L3]`
- 4.2.3 Cleaning, normalization, boilerplate removal, deduplication (exact + near-dup) `[L2]`
- 4.2.4 Chunking strategies: fixed, recursive, structure-aware (headings), semantic, code-aware `[L3]`
- 4.2.5 Chunk size and overlap as tunable hyperparameters, measured with evals `[L3]`
- 4.2.6 Metadata strategy: source, section path, dates, ACL, tenant, version `[L3]`
- 4.2.7 Contextual chunk enrichment (prepending document context to chunks) `[L3]`
- 4.2.8 Indexing pipelines as ETL: queues, idempotency, content hashing `[L3]`
- 4.2.9 Incremental updates, deletes, versioning, re-embedding migrations `[L5]`
- 4.2.10 Freshness SLAs `[L5]`
- 4.2.11 Access control: document-level ACLs enforced *at retrieval*, not in the prompt `[L5]`
- 4.2.12 Multi-tenant RAG: isolation models `[L5]`

**Module 4.3: Advanced retrieval** `← 4.1, 3.2`
- 4.3.1 Reranking with cross-encoders: bi-encoder vs cross-encoder trade-off `[L3]`
- 4.3.2 Query rewriting, expansion, multi-query, HyDE `[L3]`
- 4.3.3 Hybrid retrieval in practice `[L3]`
- 4.3.4 Parent-child / small-to-big retrieval `[L3]`
- 4.3.5 Context compression and extraction `[L3]`
- 4.3.6 Metadata filters extracted from the query (self-querying) `[L3]`
- 4.3.7 Routing across multiple indexes/sources `[L3]`
- 4.3.8 Late interaction (ColBERT), intro `[L1]`
- 4.3.9 Graph RAG and knowledge graphs: when relationships matter more than similarity `[L1]` **[EMERGING]**
- 4.3.10 Agentic RAG (preview; built in 5.5) `[L1]`

**Module 4.4: RAG evaluation** `← 4.3, 2.6`
- 4.4.1 Evaluate retrieval separately from generation `[L3]`
- 4.4.2 Retrieval metrics on a labeled query→doc set `[L3]`
- 4.4.3 Faithfulness/groundedness, answer relevance, context precision/recall, correctness `[L3]`
- 4.4.4 Synthetic question generation for test sets, and its biases `[L3]`
- 4.4.5 Tooling: Ragas, promptfoo, custom evaluators `[L2]` **⚠️ VOLATILE**

**Season 4 capstone:** Capstone v6–v8, plus Projects 6–7.

---

### SEASON 5: Tools, Agents, MCP & Memory

**Module 5.1: Tool / function calling** `← 2.3`
- 5.1.1 What tool calling is: the model *asks*, your code *does* `[L2]`
- 5.1.2 Tool schemas: names, descriptions and parameters as prompt engineering `[L3]`
- 5.1.3 The loop: request → `tool_use` → execute → `tool_result` → continue `[L2]`
- 5.1.4 Tool choice modes (auto/required/none/specific) `[L2]`
- 5.1.5 Parallel vs sequential tool calls `[L2]`
- 5.1.6 Tool errors as information: returning errors the model can recover from `[L3]`
- 5.1.7 Tool design: granularity, idempotency, pagination, token-efficient results `[L3]`
- 5.1.8 Permissions, human approval, dry-run modes `[L3]`
- 5.1.9 Provider-hosted tools (web search, code execution) vs your tools `[L2]` **⚠️ VOLATILE**
- 5.1.10 Tool security: arguments are untrusted input (SSRF, injection, path traversal) `[L3]`

**Module 5.2: From workflows to agents** `← 5.1`
- 5.2.1 The evolution: LLM → prompt → app → tool calling → workflow → agent → multi-agent `[L1]`
- 5.2.2 Workflow patterns: chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer `[L3]`
- 5.2.3 **Deterministic workflows vs agents:** who controls the flow `[L3]`
- 5.2.4 Agent architecture: model + tools + loop + state + stop conditions `[L2]`
- 5.2.5 ReAct `[L2]`
- 5.2.6 Planning vs execution (plan-and-execute), reflection/self-critique `[L3]`
- 5.2.7 State, checkpoints, durable execution, resumability `[L3]`
- 5.2.8 Human-in-the-loop: approvals, interrupts, escalation `[L3]`
- 5.2.9 Guardrails, budgets (steps, tokens, dollars, time) `[L3]`
- 5.2.10 Agent failure modes: loops, drift, tool thrashing, premature completion, compounding errors `[L3]`
- 5.2.11 Multi-agent systems: sub-agents for context isolation, and why most "agent teams" are unnecessary `[L3]`
- 5.2.12 **When NOT to use agents** `[L3]`

**Module 5.3: MCP (Model Context Protocol)** `← 5.1, 5.2.4` **⚠️ VOLATILE** (current spec: **2026-07-28**)
- 5.3.1 Why MCP exists: the N×M integration problem `[L1]`
- 5.3.2 Architecture: host, client, server; JSON-RPC 2.0 `[L2]`
- 5.3.3 Server primitives: tools, resources, prompts `[L2]`
- 5.3.4 Client features: sampling, elicitation, roots `[L1]`
- 5.3.5 Transports: stdio vs Streamable HTTP; the stateless core in the 2026-07-28 spec `[L3]`
- 5.3.6 Lifecycle, capability negotiation, discovery, list caching `[L2]`
- 5.3.7 Authorization (OAuth-based) and permissions `[L3]`
- 5.3.8 MCP vs REST APIs vs function calling vs plugins: a precise comparison `[L3]`
- 5.3.9 Build a server with the TypeScript SDK; test with MCP Inspector `[L2]`
- 5.3.10 Consume servers from your own app (a client) `[L2]`
- 5.3.11 Extensions: MCP Apps (interactive UI in sandboxed iframes) `[L1]` **[EMERGING]**
- 5.3.12 Security risks: tool poisoning, rug pulls, confused deputy, token passthrough, over-broad scopes, the "lethal trifecta" `[L3]`
- 5.3.13 Best practices and real-world architecture (gateways, registries, remote servers) `[L3]`

**Module 5.4: Memory** `← 5.2, 4.1`
- 5.4.1 Memory is context management: the model itself is stateless `[L1]`
- 5.4.2 Short-term (conversation) vs long-term memory `[L2]`
- 5.4.3 Semantic, episodic and procedural memory, mapped to storage `[L3]`
- 5.4.4 User memory: extraction, storage, retrieval-based recall `[L3]`
- 5.4.5 Compression: summarization, compaction, tool-result clearing `[L3]`
- 5.4.6 Memory conflicts, staleness, forgetting `[L3]`
- 5.4.7 Privacy, consent, deletion (GDPR-style), memory poisoning `[L3]`

**Module 5.5: Agentic RAG** `← 5.2, 4.3`
- 5.5.1 Retrieval as a tool; iterative search; query planning `[L3]`
- 5.5.2 Self-correcting retrieval (grade → retry) `[L3]`
- 5.5.3 Cost/latency vs quality trade-offs against pipeline RAG `[L3]`

**Season 5 capstone:** Capstone v9–v11, plus Projects 8–11.

---

### SEASON 6: Quality: Evaluation, Security, Observability

**Module 6.1: Evaluation, in depth** `← 2.6, 4.4, 5.2`
- 6.1.1 The eval lifecycle: error analysis → failure taxonomy → evaluators → datasets → CI → production `[L3]`
- 6.1.2 Human evaluation and annotation guidelines `[L3]`
- 6.1.3 LLM-as-a-judge: biases (position, verbosity, self-preference), calibration against human labels `[L4]`
- 6.1.4 Pairwise vs pointwise vs binary pass/fail (and why binary often wins) `[L3]`
- 6.1.5 Regression testing prompts and models; model-upgrade testing `[L5]`
- 6.1.6 Agent evaluation: final state, trajectory, tool-call correctness `[L4]`
- 6.1.7 Online evaluation: sampling production traces, user feedback, A/B tests `[L5]`
- 6.1.8 Benchmark literacy: why public benchmarks rarely predict your use case `[L1]`

**Module 6.2: AI security** `← 5.3, 4.2.11`
- 6.2.1 Threat model: LLM output is untrusted; LLM input can be attacker-controlled `[L3]`
- 6.2.2 Direct prompt injection and jailbreaks `[L3]`
- 6.2.3 Indirect prompt injection (via RAG docs, web pages, emails, tool results) `[L4]`
- 6.2.4 Mapping to web security: XSS ↔ improper output handling, SQLi ↔ prompt injection (with no parameterized-query equivalent!), SSRF ↔ tool fetches, CSRF/confused deputy ↔ agent actions, IDOR ↔ RAG ACL bypass `[L3]`
- 6.2.5 Data leakage, system prompt leakage, PII `[L3]`
- 6.2.6 Excessive agency, tool abuse, least privilege `[L3]`
- 6.2.7 RAG/data poisoning, vector/embedding weaknesses `[L3]`
- 6.2.8 Model and supply chain: weights, MCP servers, packages `[L3]`
- 6.2.9 Defenses: architectural (privilege separation, dual-LLM/CaMeL-style patterns), guardrail classifiers, output validation, approval gates, sandboxing `[L4]`
- 6.2.10 Tenant isolation, secrets, auth/authz for agents (delegated identity) `[L5]`
- 6.2.11 Red teaming and security evals `[L3]`
- 6.2.12 Frameworks: OWASP LLM Top 10 (2025), OWASP Agentic Top 10 (2026), NIST AI RMF, EU AI Act awareness `[L1]`

**Module 6.3: Observability** `← 2.2, 5.2`
- 6.3.1 Why APM isn't enough: the "correct but wrong" response `[L1]`
- 6.3.2 Traces and spans for LLM calls, retrieval, tools, agent steps `[L3]`
- 6.3.3 What to log: prompts, versions, model, params, tokens, latency, cost, retrieved IDs; plus redaction `[L3]`
- 6.3.4 OpenTelemetry GenAI semantic conventions `[L2]` **⚠️ VOLATILE** (still Development status)
- 6.3.5 Tools: Langfuse, Phoenix, LangSmith, Braintrust, Helicone. Categories plus one hands-on. `[L2]` **⚠️ VOLATILE**
- 6.3.6 Frontend signals: TTFT, abandonment, regenerate rate, thumbs up/down, copy events `[L3]` `[FE]`
- 6.3.7 Failure analysis loops and quality dashboards `[L5]`

**Season 6 capstone:** Capstone v12–v14.

---

### SEASON 7: Production AI Architecture

**Module 7.1: AI application architecture** `← S2–S6`
- 7.1.1 Traditional vs AI architecture: what changes (section 10) `[L3]`
- 7.1.2 Deterministic core, probabilistic edges: drawing AI boundaries `[L3]`
- 7.1.3 The orchestrator layer: where business logic meets model calls `[L3]`
- 7.1.4 BFF pattern for AI; streaming architecture across CDN, edge and serverless `[L3]`
- 7.1.5 State: conversations, runs, checkpoints, idempotency keys `[L3]`
- 7.1.6 AuthN/AuthZ, multi-tenancy, per-tenant quotas `[L5]`
- 7.1.7 Background jobs, queues, long-running agents, webhooks `[L3]`
- 7.1.8 Durable execution (Temporal/Inngest/Workflow-style) `[L3]`
- 7.1.9 Resilience: fallbacks across models and providers, circuit breakers, graceful degradation `[L5]`
- 7.1.10 AI gateways (routing, keys, logging, caching) `[L3]`

**Module 7.2: Cost and performance** `← 7.1, 1.4.5`
- 7.2.1 Token economics; the cost model per request, per user, per feature `[L3]`
- 7.2.2 Context size as your biggest cost lever `[L3]`
- 7.2.3 Prompt caching design (stable prefixes) `[L3]`
- 7.2.4 Semantic caching: when it's dangerous `[L3]`
- 7.2.5 Model routing / cascades; small models for simple steps `[L3]`
- 7.2.6 Batch processing `[L2]`
- 7.2.7 Latency anatomy: queue, prefill, TTFT, decode tokens/sec, tool latency `[L4]`
- 7.2.8 Throughput vs latency in self-hosted serving `[L4]`
- 7.2.9 Budgets, alerts, abuse prevention (cost-DoS) `[L5]`

**Module 7.3: Shipping** `← 7.1`
- 7.3.1 Environments, prompt/model config management, feature flags `[L5]`
- 7.3.2 Model deprecations and migrations `[L5]`
- 7.3.3 Data retention, zero-data-retention, regional processing `[L3]`
- 7.3.4 Launch checklists and incident response for AI features `[L5]`

**Season 7 capstone:** Capstone v15, plus Project 12.

---

### SEASON 8: Models Under the Hood

**Module 8.1: Open-weight ecosystem and local inference** `← 1.4`
- 8.1.1 Hugging Face Hub: model cards, datasets, licenses (Apache/MIT vs custom community licenses) `[L2]`
- 8.1.2 Running local models: Ollama, llama.cpp, LM Studio; OpenAI-compatible APIs `[L2]`
- 8.1.3 Quantization: bits, GGUF, quality vs memory `[L3]`
- 8.1.4 Serving: vLLM, PagedAttention, continuous batching, SGLang/TGI `[L4]`
- 8.1.5 GPU memory math: params × bytes + KV cache `[L4]`
- 8.1.6 Transformers.js / WebGPU: in-browser inference `[L2]` `[FE]`
- 8.1.7 Small language models: when they win `[L3]`

**Module 8.2: Fine-tuning** `← 8.1, 6.1`
- 8.2.1 **Decision tree: prompting → RAG → tools → fine-tuning** `[L3]`
- 8.2.2 What fine-tuning changes (behavior/format/style) vs doesn't reliably add (facts) `[L3]`
- 8.2.3 SFT, instruction tuning, preference tuning (DPO), overview `[L1]`
- 8.2.4 PEFT, LoRA, QLoRA: why low-rank adapters work (intuition) `[L4]`
- 8.2.5 Dataset creation and quality; synthetic data; distillation from a larger model `[L3]`
- 8.2.6 Catastrophic forgetting; evaluation before and after `[L3]`
- 8.2.7 Hosted fine-tuning APIs vs Unsloth/TRL (Python) `[L2]`
- 8.2.8 Embedding-model and reranker fine-tuning (often the higher-ROI tune) `[L3]`

**Module 8.3: Multimodal AI** `← 2.2.9, 4.2.2`
- 8.3.1 How vision-language models see: patches as tokens `[L1]`
- 8.3.2 Image understanding, document understanding, OCR vs VLM parsing `[L2]`
- 8.3.3 Speech-to-text, text-to-speech, realtime voice pipelines (latency budgets) `[L2]`
- 8.3.4 Video understanding (intro) `[L1]`
- 8.3.5 Multimodal embeddings and multimodal RAG `[L3]`
- 8.3.6 Image generation (intro only) `[L1]`

**Module 8.4: Architecture internals, advanced (optional)** `← 1.3`
- 8.4.1 Mixture of Experts `[L1]`
- 8.4.2 Long-context techniques (RoPE scaling, FlashAttention, sparse attention) `[L1]`
- 8.4.3 Speculative decoding `[L1]`
- 8.4.4 Build a tiny GPT (Karpathy-style), optional in Python `[L4]`

---

### SEASON 9: AI-Native Software Engineering & Frontier

**Module 9.1: AI-native development** `← 5.3` (the [DEV] thread runs from Week 1)
- 9.1.1 The landscape: autocomplete → chat → IDE agents → CLI/cloud coding agents `[L1]` **⚠️ VOLATILE**
- 9.1.2 How coding agents work internally: tools (read/edit/grep/bash), loops, context, sandboxes `[L3]`
- 9.1.3 Context engineering: what goes in the window, just-in-time retrieval, compaction, sub-agents `[L4]`
- 9.1.4 Agent instructions: AGENTS.md / CLAUDE.md, rules files `[L2]`
- 9.1.5 Agent Skills (SKILL.md open standard), progressive disclosure `[L2]`
- 9.1.6 MCP in dev workflows (browser, DB, design, issue trackers), with security `[L2]`
- 9.1.7 Spec-driven development: requirements → design → tasks → implementation `[L3]`
- 9.1.8 AI-assisted architecture, testing (TDD with agents), debugging, code review, docs, refactoring `[L3]`
- 9.1.9 **Verification:** types, tests, lint, visual diffs, small PRs; "trust but verify" as process `[L5]`
- 9.1.10 Frontend-specific: component generation from designs, Storybook + visual regression, a11y audits, perf audits `[L3]` `[FE]`
- 9.1.11 Parallel agents, worktrees, background/cloud agents `[L3]` **[EMERGING]**
- 9.1.12 Team practices: review load, ownership, skill atrophy, security of agent permissions `[L3]`

**Module 9.2: Emerging and advanced systems**, with maturity labels (section 11) `← most of S5–S7`
- 9.2.1 Reasoning models and test-time compute, in production use `[L3]`
- 9.2.2 Long context vs RAG in 2026 (context rot) `[L3]`
- 9.2.3 Computer-use and browser agents `[L2]`
- 9.2.4 Agent interoperability: A2A vs MCP `[L1]`
- 9.2.5 GraphRAG, in practice `[L2]`
- 9.2.6 Generative UI (tool results → components; MCP Apps) `[L2]` `[FE]`
- 9.2.7 Prompt optimization (DSPy-style) `[L1]`
- 9.2.8 Synthetic data pipelines `[L2]`

---

## 6. Dependency graph

```
                         ┌───────────────────────────┐
                         │ 1.1 ML & Neural Net basics │
                         └─────────────┬─────────────┘
                                       ↓
                         ┌───────────────────────────┐
                         │ 1.2 Tokens, embeddings(i), │
                         │     attention intuition    │
                         └─────────────┬─────────────┘
                                       ↓
                               1.3 Transformers
                                       ↓
                               1.4 LLMs (generation, sampling, alignment)
                                       ↓
                               2.1 Prompting
                                       ↓
                               2.2 LLM APIs ───────────────┐
                           ┌───────────┼───────────┐       │
                           ↓           ↓           ↓       ↓
                   2.3 Structured   2.4 Streaming   3.1 Embeddings   8.1 Local models
                       Output           ↓               ↓                 ↓
                     │   │         2.5 Chat UI [FE] 3.2 Search/ANN    8.2 Fine-tuning
                     │   ↓                              ↓              (also ← 6.1)
                     │ 2.6 Eval basics            3.3 Vector DBs
                     │   │                              ↓
                     │   └──────────────┐   ┌──── 4.1 RAG core ←── (2.3)
                     │                  │   │           ↓
                     │                  │   │   4.2 Data eng    4.3 Advanced retrieval
                     │                  │   │           └──────┬──────┘
                     │                  └───┼──────→ 4.4 RAG Eval
                     ↓                      │
               5.1 Tool calling             │
                     ↓                      │
               5.2 Workflows → Agents ──────┤
                ↓         ↓        ↓        ↓
          5.3 MCP    5.4 Memory   5.5 Agentic RAG (← 4.3)
                ↓         │
     ┌──────────┼─────────┴───────────────────┐
     ↓          ↓                             ↓
 6.2 Security  6.1 Eval (deep) ← 4.4, 2.6    6.3 Observability
     └──────────┴──────────────┬──────────────┘
                               ↓
               7.1 Architecture → 7.2 Cost/Perf → 7.3 Shipping
                               ↓
          9.1 AI-native engineering (← 5.3 MCP, 5.2 agents, 6.2)
                               ↓
          9.2 Frontier (reasoning, computer use, A2A, GraphRAG, gen UI)

  8.3 Multimodal ← 2.2.9 + 4.2.2       8.4 Internals ← 1.3 (optional)
  [FE] track threads through 2.4, 2.5, 5.1.8, 4.1.6, 6.3.6, 7.1.4, 8.1.6, 9.2.6
```

Key dependency rules. They are **[BEST PRACTICE]** unless marked otherwise:
- No framework (LangChain, LlamaIndex, Mastra) before 5.2. You need to know what they abstract.
- No vector DB vendor before 3.2. You need to know what an index is doing.
- No agents before 2.6 + 5.1. An agent you can't evaluate is a demo.
- No fine-tuning before 4.x + 6.1. It's usually the wrong first answer.
- No MCP before 5.1. MCP is transport and discovery *around* tool calling.

---

## 7. Projects (progressive)

Each project gets a full spec (problem, requirements, architecture, data model, steps, testing, eval, security,
extensions) when its module is reached. Summary:

| # | Project | Core skills | After |
|---|---|---|---|
| 1 | **Raw LLM CLI + web call.** No SDK; `fetch`, retries, timeout, token and cost logging | 2.2 | Wk 2 |
| 2 | **Text processor.** Summarize/rewrite/translate PR descriptions and changelogs with prompt templates plus a 30-case eval | 2.1, 2.6 | Wk 3 |
| 3 | **Structured extractor.** Bug report / Jira text → validated typed JSON (Zod), repair loop, classification router | 2.3 | Wk 3 |
| 4 | **Streaming chat app.** React + BFF, SSE, cancel/retry/regenerate, persisted conversations, safe markdown | 2.4, 2.5 | Wk 4 |
| 5 | **Semantic search engine.** Embed your docs; brute-force cosine in TS → pgvector HNSW → hybrid + RRF; measure recall@k | 3.x | Wk 5 |
| 6 | **RAG document assistant.** Upload MD/PDF/HTML, chunk, retrieve, grounded answers with clickable citations | 4.1, 4.2 | Wk 6 |
| 7 | **Production-quality RAG.** Reranking, query rewriting, ACL filtering, incremental re-indexing, RAG eval suite in CI | 4.3, 4.4 | Wk 7 |
| 8 | **Tool-calling app.** "Dev dashboard assistant": GitHub issues/PRs, deploy status; approval UI for write actions | 5.1 | Wk 8 |
| 9 | **AI agent, built by hand.** Loop, budgets, checkpoints, HITL; then re-implement in the AI SDK / LangGraph and compare | 5.2 | Wk 9 |
| 10 | **MCP server + client.** Server exposing your knowledge base (tools + resources + prompts); use it from Claude/VS Code *and* from your own client | 5.3 | Wk 9 |
| 11 | **Agentic RAG.** Multi-source (docs + GitHub + web) with iterative retrieval, self-grading and trajectory evals | 5.5, 6.1 | Wk 10 |
| 12 | **Production-grade AI app.** Everything: auth, multi-tenant, observability, cost controls, security red-team, fallbacks, deploy | 6–7 | Wk 12 |

Optional side projects: local-model version of Project 6 (8.1), LoRA fine-tune of a small classifier (8.2), voice
interface (8.3), in-browser embeddings with Transformers.js (8.1.6).

---

## 8. Long-term capstone: "DevBrain", an engineering knowledge assistant

**Why this one [OPINION]:** it uses a corpus you own and care about. That could be your team's docs, ADRs, READMEs
and PRs. Your own dailydevlog Markdown content is a ready-made starter dataset, since it's already structured
Markdown. The capstone touches every layer, and the result is a portfolio piece that works in interviews.

| Ver | Adds | Season |
|---|---|---|
| v1 | Plain chatbot via BFF (key on server) | S2 |
| v2 | Streaming, cancel, persistence | S2 |
| v3 | Structured "answer card" output + first golden dataset | S2 |
| v4 | Document upload and ingestion pipeline | S3/S4 |
| v5 | Embeddings + pgvector semantic/hybrid search page | S3 |
| v6 | RAG answers | S4 |
| v7 | Citations UI with source previews and highlighted spans | S4 |
| v8 | Reranking, query rewriting, incremental indexing, ACLs | S4 |
| v9 | Tools: GitHub search, open issues, create-draft-issue (with approval) | S5 |
| v10 | Agent mode: multi-step research with visible steps, budgets, HITL | S5 |
| v11 | MCP: expose DevBrain as an MCP server; consume external MCP servers | S5 |
| v12 | Full eval suite: retrieval, faithfulness, agent trajectory; CI gate | S6 |
| v13 | Observability: OTel traces, Langfuse (or similar), cost per user, feedback | S6 |
| v14 | Security hardening: injection red-team, output handling, tenant isolation | S6 |
| v15 | Production: auth, quotas, fallbacks, prompt caching, model routing, deploy | S7 |
| v16+ | Optional: local model mode, voice, generative UI, fine-tuned reranker | S8/S9 |

---

## 9. Track: AI for Frontend Engineers `[FE]`

This track is woven into the seasons above. Modules where it's dominant are marked:

| Topic | Where | Notes |
|---|---|---|
| Chat interface architecture, message parts model | 2.5 | `useChat`-style state vs your own reducer |
| Token streaming, SSE, fetch streams, WebSockets (when bidirectional/realtime voice) | 2.4, 8.3 | |
| Loading/partial/skeleton states, TTFT perception | 2.4, 2.5 | |
| Cancellation (AbortController through BFF to provider), retry, regenerate, branch | 2.4.6, 2.5.4 | |
| Optimistic UI for messages | 2.5.4 | |
| Streaming structured objects into forms/cards | 2.4.5 | partial JSON parsing |
| Tool execution UI, human approval dialogs | 5.1.8, 5.2.8 | pending/approved/denied states |
| Agent step visualization (plans, traces for users) | 5.2 | |
| Citations UI, source previews, span highlighting | 4.1.6 | |
| Hallucination UX, uncertainty/confidence communication, "I don't know" design | 4.1, 6.1 | don't show fake confidence scores |
| AI error taxonomy in UX (rate-limited, refused, filtered, timeout) | 2.2.6 | |
| Safe rendering: markdown sanitization, links, images (data exfiltration via image URLs!) | 2.5.5, 6.2 | |
| Accessibility: live regions, streaming + screen readers | 2.5.6 | |
| API key protection, BFF, per-user rate limiting | 2.2.4, 7.1.4 | |
| Frontend observability: feedback widgets, telemetry events | 6.3.6 | |
| Generative UI (model → components), MCP Apps | 9.2.6 | **[EMERGING]** |
| In-browser inference (WebGPU, Transformers.js) | 8.1.6 | |
| AI-powered dev tools for FE (design-to-code, visual regression, a11y agents) | 9.1.10 | |
| AI UX patterns: Google PAIR Guidebook, Microsoft HAX guidelines | refs | |

---

## 10. AI + software architecture (preview of 7.1)

```
TRADITIONAL                     AI APPLICATION
UI                              UI  (streaming, partial state, approvals, citations)
 ↓                               ↓
API                             API / BFF  (auth, quotas, stream proxy)
 ↓                               ↓
Business logic (deterministic)  Orchestrator  (deterministic control, prompts, budgets)
 ↓                               ↓        ↘            ↘
Database                        LLM(s)    Retriever → Vector/Search DB
                                 ↕         Tools → External APIs / MCP servers
                                 ↓
                                Validation + guardrails (deterministic again)
                                 ↓
                                Response + trace + cost record + eval sample
```

**What changes:**

| Concern | Traditional | AI |
|---|---|---|
| Correctness | Tests prove it | Evals estimate it statistically |
| Behavior source | Code | Code + prompt + model version + retrieved data |
| Latency | ms | seconds, streamed |
| Cost | Mostly fixed infra | Per-request, variable, attacker-inflatable |
| Security | Injection is solved with parameterization | Prompt injection has no complete fix; contain it architecturally |
| Observability | Errors, latency | + inputs/outputs, tokens, retrieval, tool trajectories, quality |
| Dependencies | Versioned libraries | Models get deprecated and silently change behavior |

**Core principle [BEST PRACTICE]:** keep the control flow, authorization and side effects deterministic. Use the
model only where you need its judgment. Validate everything that crosses the AI boundary.

---

## 11. Maturity labels for emerging concepts (as of Sept 2026)

| Concept | Label | Notes |
|---|---|---|
| RAG, hybrid search, reranking | **ESTABLISHED** | |
| Tool calling, structured outputs | **ESTABLISHED** | |
| Reasoning models / test-time compute | **ESTABLISHED** | the APIs around them are still volatile |
| MCP (tools/resources/prompts) | **ESTABLISHED** | spec still evolving; 2026-07-28 = stateless core |
| Context engineering | **ESTABLISHED** (practice) | the name is new; the discipline is real |
| Prompt caching, model routing | **ESTABLISHED** | |
| MoE, small language models, quantization | **ESTABLISHED** | |
| LLM-as-judge (calibrated) | **ESTABLISHED** | uncalibrated use is a common mistake |
| Agent Skills / AGENTS.md | **EMERGING** (broad adoption) | now under the Agentic AI Foundation |
| Agentic RAG | **EMERGING** | use when the query needs multiple steps |
| Long-context replacing RAG | **EMERGING / partly hype** | context rot and cost still favor retrieval |
| Computer-use / browser agents | **EMERGING** | reliability and security still immature |
| A2A agent interoperability | **EMERGING** | v1.0, backed by the Linux Foundation; rarely needed in a single-org app |
| MCP Apps / generative UI | **EMERGING** | |
| GraphRAG | **EMERGING** | high indexing cost; niche fit |
| OTel GenAI conventions | **EMERGING** | still Development status |
| Synthetic data for evals/fine-tuning | **EMERGING → ESTABLISHED** | |
| DSPy-style prompt optimization | **EXPERIMENTAL** for most teams | |
| "AI-native databases" | **HYPE / LOW VALUE** as a category | mostly Postgres + vectors with marketing |
| Fully autonomous multi-agent "companies" | **HYPE / LOW VALUE** | |
| "Prompt engineer" as a separate job | **HYPE / declining** | |

---

## 12. DO NOT LEARN THIS YET

| Skip for now | Why | When (if ever) |
|---|---|---|
| Backprop math, linear algebra courses, calculus | Intuition is enough for application engineering | Only if you move toward ML engineering |
| Training models from scratch, PyTorch in depth | A researcher/ML engineer skill; tiny payoff for products | 8.4, optional |
| CUDA, GPU kernels, distributed training | Specialized infra roles | Never, for your goals |
| RLHF/PPO/DPO implementation | Know what it does, not how to run it | Never |
| LangChain/LlamaIndex before building RAG and agents by hand | Abstractions hide exactly what you need to learn; debugging becomes guesswork | After 5.2 |
| CrewAI, AutoGen and other "multi-agent team" frameworks | Most problems need a workflow, not agent teams | After Project 11, if at all |
| Fine-tuning | Prompting + RAG + evals solve most cases; fine-tuning without evals is blind | Season 8 |
| Comparing 10 vector DBs | pgvector covers most apps up to millions of vectors | When you hit a measured limit |
| GraphRAG / knowledge graphs | Expensive; niche wins | After 4.4 |
| A2A and agent marketplaces | You don't have cross-org agents yet | 9.2 |
| Kubernetes GPU serving, Triton | Ops-specialist territory | Only if you self-host at scale |
| Chasing every model release and leaderboard | Your eval set is the only benchmark that matters | Re-run evals quarterly |
| Prompt "hack" lists and jailbreak collections | Obsolete fast; the principles last | Never |
| No-code agent builders | Hide the architecture you're trying to learn | Never, for learning |
| Image/video generation pipelines, diffusion internals | Different product domain | Optional |
| Crypto/"autonomous economic agents" | Low practical value | Never |

---

## 13. Technology roadmap (what to use when)

Picks are **[OPINION]** and chosen for a TypeScript frontend engineer. Everything here is **⚠️ VOLATILE**.

| Phase | Stack |
|---|---|
| S1 | Browser + a tokenizer playground; a TS notebook or plain Node scripts; one provider API key |
| S2 | Node/TS, **raw `fetch`** → provider SDK → **Vercel AI SDK 6** (after you've built it by hand); **Zod**; Next.js *or* Vite + Hono BFF; Vitest; **promptfoo** or Evalite for evals |
| S3 | **Postgres + pgvector** (local Docker or Supabase/Neon), Postgres FTS for BM25-ish search; one hosted embedding model + one open model (via Ollama) for comparison |
| S4 | Unstructured/Docling-style parsers or LlamaParse (compare), a queue (BullMQ/Inngest), a reranker API or local cross-encoder; Ragas (Python) *or* TS-native evaluators |
| S5 | AI SDK agents (`ToolLoopAgent`, `needsApproval`); **LangGraph.js** *or* **Mastra** for one comparison build; **MCP TypeScript SDK** + MCP Inspector |
| S6 | **Langfuse** (open source) or Phoenix; OpenTelemetry; promptfoo red-teaming; OWASP checklists |
| S7 | AI gateway (Vercel AI Gateway / LiteLLM / Cloudflare AI Gateway), Temporal/Inngest for durable runs, Redis for rate limiting |
| S8 | Ollama/llama.cpp, vLLM (read and try), Transformers.js; **Python only here:** Hugging Face `transformers`, PEFT, TRL/Unsloth in Colab |
| S9 | Claude Code / Codex / Cursor / Copilot agents; AGENTS.md; Agent Skills; MCP servers for GitHub/Playwright/DB |

---

## 14. The 12-week plan (default)

**Budget:** 5 days × 1.5h ≈ **7.5h/week, ~90h total**. That realistically covers S1–S7 at L2–L3, with S8/S9
selectively.

Weekly rhythm: **D1–D2** read and write concept notes, **D3–D4** build, **D5** break/debug, then assess. The
**[DEV]** habit runs all 12 weeks: use a coding agent for the week's build, and write down one thing it got wrong and
how you caught it.

| Wk | Topics | Reading (MUST) | Hands-on | Project | Revision / assessment |
|---|---|---|---|---|---|
| 1 | 1.1, 1.2 | 3Blue1Brown NN ch.1–2; Google ML Crash Course (select); Tiktokenizer | Gradient descent in TS; tokenize the same text in 3 tokenizers, compare costs | — | M1.1 + M1.2 quizzes |
| 2 | 1.3, 1.4 | Illustrated Transformer; Transformer Explainer; HF LLM Course ch.1 | Attention on a 4-token toy in TS; logprobs sampling playground | **P1** Raw LLM call | Explain prompt→token pipeline aloud (record 3 min) |
| 3 | 2.1, 2.3, 2.6 | Provider prompt guides; structured outputs docs; Hamel's evals post | Zod schemas, repair loop; 30-case golden set | **P2 + P3** | M2.1/2.3 quiz; run eval on 2 prompt versions |
| 4 | 2.2 (full), 2.4, 2.5 | MDN SSE + Streams; AI SDK docs (UI) | Streaming BFF by hand, then AI SDK | **P4**; Capstone v1–v3 | M2.2/2.4/2.5 quiz |
| 5 | 3.1, 3.2, 3.3 | SBERT paper (skim); HNSW paper intro; pgvector README | Cosine by hand → pgvector; hybrid + RRF; recall@k | **P5**; Capstone v4–v5 | M3 quiz |
| 6 | 4.1, 4.2 | RAG paper (Lewis 2020) abstract/intro; Anthropic Contextual Retrieval; Lost in the Middle | Ingestion pipeline, 3 chunking strategies compared | **P6**; Capstone v6–v7 | Failure-mode drill: break RAG 5 ways, then diagnose |
| 7 | 4.3, 4.4 | Ragas paper; reranking docs | Reranker, query rewrite, ACL filter; retrieval + faithfulness eval in CI | **P7**; Capstone v8 | M4 quiz; **mid-course review of W1–6** |
| 8 | 5.1, 5.2 (part 1) | Anthropic "Building effective agents"; ReAct paper; provider tool-use docs | Hand-written tool loop; approval UI | **P8**; Capstone v9 | M5.1 quiz |
| 9 | 5.2 (part 2), 5.3 | MCP spec 2026-07-28 overview + TS SDK; AI SDK 6 agents | Agent with budgets/checkpoints; MCP server + client | **P9 + P10**; Capstone v10–v11 | M5.2/5.3 quiz |
| 10 | 5.4, 5.5, 6.1 | Context engineering (Anthropic); LLM-as-judge paper | Memory layer; agentic RAG; calibrate a judge against 50 human labels | **P11**; Capstone v12 | M5.4/5.5/6.1 quiz |
| 11 | 6.2, 6.3 | OWASP LLM Top 10 2025 + Agentic Top 10 2026; Greshake et al.; lethal trifecta; OTel GenAI | Red-team your capstone (10 attacks); OTel + Langfuse tracing; cost dashboard | Capstone v13–v14 | M6.2/6.3 quiz |
| 12 | 7.1, 7.2, 7.3, 9.1 (select) | Chip Huyen *AI Engineering* (architecture ch.); provider caching docs; agents.md + agentskills.io | Prompt caching, routing, fallbacks, quotas; deploy; write an AGENTS.md + one Skill for your repo | **P12**; Capstone v15 | **Final:** architecture review doc + 5-min system design explanation of DevBrain |

**After week 12:** Season 8 (local models, fine-tuning, multimodal) and 9.2 over 4–6 weeks at your own pace.

### 8-week plan (compressed, at ~2h/day)

W1: S1 all · W2: S2 prompting + APIs + structured output + evals (P1–P3) · W3: streaming + chat (P4) + S3 (P5) ·
W4: RAG core + data (P6) · W5: advanced RAG + RAG eval (P7) · W6: tools + agents + MCP (P8–P10) · W7: eval, security,
observability (P11) · W8: production architecture (P12).

*Trade-off:* you reach L2 on most topics, but L3 design judgment will be thin. Skip S8 and use 9.1 only as a habit.

### 16-week plan (deeper, at ~1–1.5h/day)

W1–2 S1 (+ optional 8.4 tiny GPT) · W3–5 S2 (one week each for prompting+structured, APIs+streaming, chat+evals) ·
W6 S3 · W7–9 S4 (core, data engineering, advanced+eval) · W10–12 S5 (tools, agents, MCP+memory+agentic RAG) · W13 S6 ·
W14 S7 · W15 S8 (local + fine-tune a LoRA) · W16 S9 + final capstone hardening.

*This plan reaches L3 across the board and L4/L5 on RAG, agents and production.*

---

## 15. References per module

Levels: **B**eginner / **I**ntermediate / **A**dvanced. Every lesson repeats its specific references with notes on
why each one is useful.

### Season 1

**MUST READ**
- *Neural Networks* series, 3Blue1Brown. https://www.3blue1brown.com/topics/neural-networks. Visual intuition for weights, gradient descent, backprop, attention, with no heavy math. **B**
- *Machine Learning Crash Course*, Google. https://developers.google.com/machine-learning/crash-course. Clean coverage of loss, overfitting, and evaluation metrics. **B**
- *The Illustrated Transformer*, Jay Alammar. https://jalammar.github.io/illustrated-transformer/. The canonical visual walkthrough of Q/K/V. **B/I**
- *Transformer Explainer*, Georgia Tech Polo Club. https://poloclub.github.io/transformer-explainer/. Interactive GPT-2 running in the browser. **B/I**
- *LLM Course*, Hugging Face. https://huggingface.co/learn/llm-course. Tokenizers, transformers, fine-tuning; free and current. **I**

**SHOULD READ**
- Tiktokenizer. https://tiktokenizer.vercel.app/. See tokenization live. **B**
- Karpathy, *Neural Networks: Zero to Hero*. https://karpathy.ai/zero-to-hero.html. Builds GPT from scratch (Python; optional). **I/A**

**Papers (OPTIONAL DEEP DIVE)**
- *Attention Is All You Need*, Vaswani et al., 2017. https://arxiv.org/abs/1706.03762. The Transformer architecture.
- *Efficient Estimation of Word Representations* (word2vec), Mikolov et al., 2013. https://arxiv.org/abs/1301.3781. Embeddings as meaning.
- *Neural Machine Translation of Rare Words with Subword Units* (BPE), Sennrich et al., 2015. https://arxiv.org/abs/1508.07909. Subword tokenization.
- *Language Models are Few-Shot Learners* (GPT-3), Brown et al., 2020. https://arxiv.org/abs/2005.14165. Scale and in-context learning.
- *Training Compute-Optimal LLMs* (Chinchilla), Hoffmann et al., 2022. https://arxiv.org/abs/2203.15556. Scaling laws.
- *The Curious Case of Neural Text Degeneration* (top-p), Holtzman et al., 2019. https://arxiv.org/abs/1904.09751. Why sampling matters.
- *Training LMs to Follow Instructions with Human Feedback* (InstructGPT), Ouyang et al., 2022. https://arxiv.org/abs/2203.02155. RLHF → ChatGPT.
- *Direct Preference Optimization*, Rafailov et al., 2023. https://arxiv.org/abs/2305.18290. Simpler alignment.
- *Constitutional AI*, Bai et al., 2022. https://arxiv.org/abs/2212.08073. AI-feedback alignment.
- *DeepSeek-R1*, DeepSeek-AI, 2025. https://arxiv.org/abs/2501.12948. RL for reasoning, done in the open.
- *Scaling LLM Test-Time Compute Optimally*, Snell et al., 2024. https://arxiv.org/abs/2408.03314. The theory behind test-time compute.
- Stanford CS336 *Language Modeling from Scratch*. https://stanford-cs336.github.io. **A**

### Season 2

**MUST READ** (⚠️ provider docs are volatile)
- Anthropic docs: prompt engineering, Messages API, streaming, structured outputs, prompt caching. https://platform.claude.com/docs. **B/I**
- OpenAI docs: Responses API, structured outputs, streaming. https://developers.openai.com/api/docs. Plus the Assistants → Responses migration guide: https://developers.openai.com/api/docs/assistants/migration. **B/I**
- Google Gemini API docs. https://ai.google.dev/gemini-api/docs. A third provider's shape, useful for abstraction design. **B/I**
- MDN, *Server-sent events* and *Streams API*. https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events. **I**
- AI SDK docs. https://ai-sdk.dev/ · AI SDK 6 announcement: https://vercel.com/blog/ai-sdk-6. **I**
- Hamel Husain, *Your AI Product Needs Evals*. https://hamel.dev/blog/posts/evals/. The best practical intro to evals. **I**

**SHOULD READ**
- Eugene Yan, *Patterns for Building LLM-based Systems & Products*. https://eugeneyan.com/writing/llm-patterns/. **I**
- *Chain-of-Thought Prompting*, Wei et al., 2022. https://arxiv.org/abs/2201.11903. **I**

**OPTIONAL DEEP DIVE**
- Chip Huyen, *AI Engineering* (O'Reilly, 2025). The best single book for this career path. **I/A**

### Season 3

**MUST READ**
- pgvector README. https://github.com/pgvector/pgvector. HNSW/IVFFlat, operators, filtering. **I**
- *Sentence-BERT*, Reimers & Gurevych, 2019. https://arxiv.org/abs/1908.10084. How sentence embeddings are trained (read the intro and method). **I**
- MTEB Leaderboard. https://huggingface.co/spaces/mteb/leaderboard. Model comparison; read it critically. **I** ⚠️

**SHOULD READ**
- *HNSW*, Malkov & Yashunin, 2016. https://arxiv.org/abs/1603.09320. **A**
- *Matryoshka Representation Learning*, Kusupati et al., 2022. https://arxiv.org/abs/2205.13147. **A**
- Postgres full-text search docs. https://www.postgresql.org/docs/current/textsearch.html. **I**

### Season 4

**MUST READ**
- *Retrieval-Augmented Generation for Knowledge-Intensive NLP*, Lewis et al., 2020. https://arxiv.org/abs/2005.11401. The origin of RAG.
- Anthropic, *Introducing Contextual Retrieval*. https://www.anthropic.com/news/contextual-retrieval. Chunk context, hybrid search and reranking, with measured results. **I**
- *Lost in the Middle*, Liu et al., 2023. https://arxiv.org/abs/2307.03172. Why context ordering matters.
- *Ragas*, Es et al., 2023. https://arxiv.org/abs/2309.15217. RAG eval metrics.

**SHOULD READ**
- *HyDE*, Gao et al., 2022. https://arxiv.org/abs/2212.10496. Query rewriting.
- *ColBERT*, Khattab & Zaharia, 2020. https://arxiv.org/abs/2004.12832. Late interaction.
- *Self-RAG*, Asai et al., 2023. https://arxiv.org/abs/2310.11511. Self-grading retrieval.
- Chroma Research, *Context Rot*. https://research.trychroma.com/context-rot. Why long context doesn't replace retrieval. **I**

**OPTIONAL DEEP DIVE**
- *From Local to Global: GraphRAG*, Edge et al. (Microsoft), 2024. https://arxiv.org/abs/2404.16130.

### Season 5

**MUST READ**
- Anthropic, *Building Effective Agents*. https://www.anthropic.com/engineering/building-effective-agents. Workflows vs agents; the patterns. **I**
- Anthropic, *Effective Context Engineering for AI Agents*. https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents. **I/A**
- *ReAct*, Yao et al., 2022. https://arxiv.org/abs/2210.03629.
- MCP Specification 2026-07-28. https://modelcontextprotocol.io/specification/2026-07-28 · Release notes: https://blog.modelcontextprotocol.io/posts/2026-07-28/. **I** ⚠️
- AI SDK 6: agents, tool approval, MCP. https://vercel.com/blog/ai-sdk-6. **I** ⚠️

**SHOULD READ**
- LangChain v1 (JS) release notes. https://docs.langchain.com/oss/javascript/releases/langchain-v1. `createAgent` on top of LangGraph. **I** ⚠️
- Mastra docs. https://mastra.ai/docs. A TS-native agent/workflow framework (v1.0 since Jan 2026). **I** ⚠️
- 2026 MCP Roadmap. https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/. ⚠️
- *Toolformer*, Schick et al., 2023. https://arxiv.org/abs/2302.04761.

**OPTIONAL DEEP DIVE**
- *Reflexion*, Shinn et al., 2023. https://arxiv.org/abs/2303.11366.
- *MemGPT*, Packer et al., 2023. https://arxiv.org/abs/2310.08560. Memory as OS-style paging.
- Claude Cookbook: context editing, compaction, memory. https://platform.claude.com/cookbook/tool-use-context-engineering-context-engineering-tools.
- Linux Foundation A2A launch. https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project-to-enable-secure-intelligent-communication-between-ai-agents · One-year status: https://opensource.googleblog.com/2026/04/a-year-of-open-collaboration-celebrating-the-anniversary-of-a2a.html.

### Season 6

**MUST READ**
- OWASP Top 10 for LLM Applications 2025. https://genai.owasp.org/llm-top-10/. **I**
- OWASP Top 10 for Agentic Applications 2026. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/. **I**
- *Not what you've signed up for* (indirect prompt injection), Greshake et al., 2023. https://arxiv.org/abs/2302.12173.
- Simon Willison, *The lethal trifecta for AI agents*. https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/. The clearest mental model for agent data exfiltration. **B/I**
- *Judging LLM-as-a-Judge*, Zheng et al., 2023. https://arxiv.org/abs/2306.05685. Judge biases.

**SHOULD READ**
- OpenTelemetry GenAI semantic conventions. https://github.com/open-telemetry/semantic-conventions-genai. ⚠️ Still Development status.
- Langfuse docs. https://langfuse.com/docs. An open-source tracing/eval reference implementation. ⚠️
- promptfoo red-teaming docs. https://www.promptfoo.dev/docs/red-team/. ⚠️
- NIST AI Risk Management Framework. https://www.nist.gov/itl/ai-risk-management-framework. **I**

### Season 7

**MUST READ**
- Chip Huyen, *AI Engineering*: the chapters on architecture and inference optimization. **I/A**
- Provider prompt caching and batch docs (Anthropic / OpenAI / Gemini). ⚠️
- OpenAI deprecations page. https://developers.openai.com/api/docs/deprecations. Model lifecycle is a real ops concern. ⚠️

**SHOULD READ**
- *Efficient Memory Management for LLM Serving with PagedAttention* (vLLM), Kwon et al., 2023. https://arxiv.org/abs/2309.06180.

### Season 8

**MUST READ**
- Hugging Face LLM Course, fine-tuning chapters. https://huggingface.co/learn/llm-course. **I**
- Ollama. https://ollama.com · vLLM docs: https://docs.vllm.ai. ⚠️
- *LoRA*, Hu et al., 2021. https://arxiv.org/abs/2106.09685.

**SHOULD READ**
- *QLoRA*, Dettmers et al., 2023. https://arxiv.org/abs/2305.14314.
- *Distilling the Knowledge in a Neural Network*, Hinton et al., 2015. https://arxiv.org/abs/1503.02531.
- Transformers.js. https://huggingface.co/docs/transformers.js. `[FE]`

**OPTIONAL DEEP DIVE**
- *Mixtral of Experts*, Jiang et al., 2024. https://arxiv.org/abs/2401.04088.
- *FlashAttention*, Dao et al., 2022. https://arxiv.org/abs/2205.14135.
- *RoFormer* (RoPE), Su et al., 2021. https://arxiv.org/abs/2104.09864.

### Season 9

**MUST READ**
- AGENTS.md. https://agents.md · Agent Skills spec: https://agentskills.io / https://github.com/agentskills/agentskills. ⚠️
- Anthropic, *Effective Context Engineering* (again, applied to coding agents).
- Your coding agent's official docs on instructions, permissions, MCP and hooks. ⚠️

**SHOULD READ (AI UX, [FE])**
- Google PAIR *People + AI Guidebook*. https://pair.withgoogle.com/guidebook/. **B/I**
- Microsoft *Guidelines for Human-AI Interaction*. https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/. **B/I**

---

## 16. How the detailed lessons are delivered

- **One module at a time.** Every topic follows the 18-section lesson format (why it exists → references), with TS code, ASCII diagrams, exercises and challenges.
- **Each module ends with its assessment:** 5 conceptual questions, 3 practical, 2 interview, 1 implementation challenge. Answers go in a separate section at the end so you can attempt the questions first.
- **Each project** gets its full spec (problem, requirements, architecture, tech choices, APIs, data model, steps, learning goals, mistakes, testing, eval, security, extensions) when it's reached.
- **Volatile content** (SDK APIs, model names, pricing, spec versions) is re-checked on the web while writing each lesson, not reused from this blueprint.

### Lesson format (per topic)

1. Why does this exist?
2. What problem does it solve?
3. Simple explanation
4. Mental model
5. How it works internally
6. Visual explanation
7. Connection to software engineering
8. Code example
9. Real-world example
10. Common mistakes
11. Limitations
12. When to use it
13. When NOT to use it
14. Interview explanation (30 seconds)
15. Deep interview explanation (2–5 minutes)
16. Hands-on exercise
17. Challenge
18. References

---

## Sources checked for current status (2026-09-17)

- [MCP 2026-07-28 specification](https://modelcontextprotocol.io/specification/2026-07-28) · [release post](https://blog.modelcontextprotocol.io/posts/2026-07-28/) · [2026 MCP roadmap](https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/)
- [AI SDK 6 (Vercel)](https://vercel.com/blog/ai-sdk-6) · [AI SDK docs](https://ai-sdk.dev/)
- [LangChain v1 JS release notes](https://docs.langchain.com/oss/javascript/releases/langchain-v1) · [LangChain/LangGraph 1.0 announcement](https://forum.langchain.com/t/we-launched-1-0-versions-of-langchain-and-langgraph/1904)
- [Mastra](https://mastra.ai/) · [Mastra docs](https://mastra.ai/docs)
- [OpenAI Assistants migration guide](https://developers.openai.com/api/docs/assistants/migration) · [OpenAI deprecations](https://developers.openai.com/api/docs/deprecations)
- [OWASP LLM Top 10](https://genai.owasp.org/llm-top-10/) · [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- [Linux Foundation A2A launch](https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project-to-enable-secure-intelligent-communication-between-ai-agents) · [A2A one-year anniversary](https://opensource.googleblog.com/2026/04/a-year-of-open-collaboration-celebrating-the-anniversary-of-a2a.html)
- [Anthropic: Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) · [Claude Cookbook: context engineering](https://platform.claude.com/cookbook/tool-use-context-engineering-context-engineering-tools)
- [Agent Skills spec](https://github.com/agentskills/agentskills)
- [OpenTelemetry GenAI semantic conventions repo](https://github.com/open-telemetry/semantic-conventions-genai) · [status as of July 2026](https://john-hodge.com/blog/opentelemetry-genai-semantic-conventions/)
