# AI Engineering Course: Writing Plan

The handoff doc for writing the remaining lessons across sessions. Start each new session with:

> Today's lessons (writes the next lesson in each course), or: write AI course lesson X.Y.Z.

The full original blueprint (topic map, projects, references, 12-week plan) is in `docs/ai-course-content.md`. The `course-lesson` skill (`.claude/skills/course-lesson/`) holds the shared steps, and `formats/ai-course.md` holds the lesson format. This doc holds
status, sequencing, running examples and lessons learned.

## Where things live

| What | Path |
|---|---|
| Outline (source of truth for topics, levels, slugs) | `src/content/ai-course/course.yaml` |
| Lessons | `src/content/ai-course/lessons/s<N>/<slug>.mdx` |
| Course home long-form sections | `src/content/ai-course/roadmap.mdx` |
| Course registry, joins and build-time validation | `src/lib/courses.ts` |
| Pages (shared by all courses) | `src/pages/[course]/` |
| MDX components | `src/components/course/` (`Callout`, `Answer`, `TopicList`) |

## Status

Published lessons (update this list after each session; `npm run course:next` is the ground truth):

- [x] 1.1.1 AI vs ML vs DL vs GenAI
- [x] 1.1.2 Rules vs learned functions
- [x] 1.1.3 Discriminative vs generative models
- [x] 1.1.4 Neural networks: neurons, layers, activations
- [x] 1.1.5 Parameters, weights and biases
- [x] 1.1.6 Loss functions
- [x] 1.1.7 Gradient descent and optimization
- [x] 1.1.8 Backpropagation (intuition)
- [x] 1.1.9 Training vs inference
- [x] 1.1.10 Overfitting and generalization
- [x] 1.1.11 Model evaluation metrics
- [x] 1.1.12 GPUs and why AI needs compute
- [x] 1.1.13 Scaling laws (intuition) + Module 1.1 assessment
- [ ] **1.2.1 Text representation: one-hot, bag-of-words, TF-IDF** ← next (Module 1.2 starts)

Total: 13 of 295.

## Session workflow

1. Daily cadence: **1 lesson per day** here, alongside 1 AI-Native Software Engineering lesson. Write more on days you learn more, but no more than 3 per session (each is about 400–500 lines of MDX), to keep context small.
2. For each lesson:
   - Read its entry in `course.yaml` and the notes for its module below. Skim the previous lesson's sections 16–17
     for continuity. Don't re-read all earlier lessons.
   - Check reference URLs with `curl -s -o /dev/null -L -w '%{http_code}' -A 'Mozilla/5.0' URL`. Medium returns 403
     to curl, so confirm Medium URLs through WebSearch instead.
   - For `volatile: true` topics: research with WebSearch/WebFetch against primary sources and set `lastVerified`.
   - **Run every code example** in the scratchpad (`node --experimental-strip-types file.ts`) and paste the *real*
     output. Recompute any numbers quoted in the prose, tables or diagrams against that output.
   - Keep ASCII diagram lines ≤ 70 chars (code lines may be longer).
   - Run `npx astro build`.
3. Update the Status list above.
4. The last lesson of each module gets `## Module assessment` + `## Answers` (5 conceptual, 3 practical,
   2 interview, 1 implementation challenge).

## Lessons learned (apply to every lesson)

- Mistakes caught so far: an error count copied wrong into a diagram, arrow positions misaligned in an ASCII number
  line, and an exercise "answer" that quoted training data instead of real output. **Verify numbers by running code.**
- MDX breaks on `<` followed by a letter or `=` outside code, and on bare `{` `}`. Use `&lt;=` or inline code.
- Node's `--experimental-strip-types` rejects constructor parameter properties (`constructor(public x)`); declare
  fields explicitly.
- Use seeded RNGs (the `mulberry32` helper used in 1.1.3) so outputs are reproducible.
- Keep examples dependency-free TypeScript until Season 2. Seasons 2+ may use real SDKs; verify their APIs first.
- Tone: an experienced engineer who is new to AI. Explain intuition before notation. Label claims with
  `<Callout type="fact|practice|opinion|emerging">`.
- Label made-up scenarios with invented numbers (e.g. section 9 stories) as illustrative, so they don't read as sourced facts.
- WebFetch can't read arXiv PDFs here (no pdftotext); use `https://ar5iv.labs.arxiv.org/html/<id>` or `arxiv.org/html/<id>`.
- Published fit constants can be wrong (Chinchilla Approach 3). Prefer replicated values and say so in a callout.
- Module assessments go between section 17 and `## 18. References` (the page renders references after the content).
- Attribution: credit sources inline for specific numbers, results and framings, and end with the standard
  "Sources and acknowledgements" paragraph (see the Attribution section in `SKILL.md`). Module 1.1 was audited on 2026-09-17.
- Reference `lesson X.Y.Z` when pointing forward or back, rather than linking manually.

## Running examples (reuse for continuity)

- **Bot signup detector** (1.1.2): `secondsToFill`, `keystrokes`, labeled signups, threshold search.
- **Hand-set 2-2-1 bot net** (1.1.4, 1.1.5): inputs `[secondsToFill, keystrokes]`, hidden `relu(5 - s)` and
  `relu(8 - k)`, output `sigmoid(h1 + h2 - 5)`; 9 parameters. Script bot `[2.0, 1]` → 0.9933, autofill human
  `[3.8, 12]` → 0.0219. Reuse it for loss (1.1.6) and backprop by hand (1.1.8).
- **Llama 2 7B parameter count** (1.1.5): 6,738,415,616 from its config; 13.5 GB at fp16. Reuse in 1.1.12 and 8.1.3.
- **Gradient descent datasets** (1.1.7): `hours ≈ w × storyPoints` on 4 tickets (best w ≈ 2.051, lr stability limit
  ≈ 0.1026), and logistic regression on the 13 signups from 1.1.2 (lr 0.05, 4,000 steps → w ≈ -1.095, b ≈ 5.286,
  threshold 4.83, 1 error). `numericGradient` + `descend` helpers; reuse for the backprop gradient check in 1.1.8.
- **Backprop by hand** (1.1.8): slow bot `[4.9, 6]` on the hand-set net → P(bot) 0.0522, loss 2.9536, `dL/dz = -0.9478`,
  `dw11 = -4.6444`. Training on the 6 signups from 1.1.6 (lr 0.01, 2,000 steps) → loss 0.6912 → 0.4228, 2 errors
  remain (slow bot and fast human `[4.5, 3]`); trained params `-0.75, 0.14, 4.98, 0.31, -0.64, 7.99, 0.59, 0.65, -5.05`.
- **Model lifecycle** (1.1.9): v1 `bafbecb8` (same training as above, weights rounded to 4 d.p.), fine-tuned v2
  `4a5368fa` on 3 feedback bots (500 steps) → slow bot 0.462 → 0.749, errors 2 → 1, fast human 0.719 → 0.882.
  Llama 2 7B: 184,320 A100 GPU hours, `6ND ≈ 8.09e22` FLOPs; training ≈ 16 bytes/param (ZeRO) ≈ 108 GB.
  Reuse for 1.1.10 (overfitting) and 1.1.12 (compute).
- **Noisy signup generator** (1.1.10): `mulberry32(7)`, bots `s∈[1,6)`, `k∈0..9`; humans `s∈[3.5,19.5)`, `k∈5..44`;
  10% flipped labels; train 20 / validation 300 / test 300. Validation: lookup table 52.0%, 1-NN 81.0% (train 100%),
  5-NN 86.7% (chosen, test 85.0%), poly-15 L2 lambda 0 → 83.3%, 0.001 → 86.3%; noise ceiling ≈ 90.3%.
  Leaky test (60 train copies) 1-NN 80.0% → 83.0%. Reuse its validation predictions for the confusion matrix in 1.1.11.
- **Metrics on the bot detector** (1.1.11): same generator with `signup(botRate, noise)`; 5-NN validation TP 136,
  FP 29, FN 11, TN 124 (precision 0.824, recall 0.925, F1 0.872). Production sample `make(5000, 0.03, 0.01)`: 203 labeled
  bots; always-human accuracy 0.959 vs model 0.918, precision 0.299, recall 0.759. Costs $20/miss + $5/false alarm →
  best t = 0.8 ($2,010). Reuse for retrieval metrics (3.2.8) and evals (Season 6).
- **Compute napkin math** (1.1.12): JS matmul on M3 Pro (11 threads, Node 25.6) 12.72 GFLOPS at 2048; threads 9.5×
  faster at 2048, 5× slower at 256. A100 80GB datasheet: 312 TFLOPS fp16, 2,039 GB/s, NVLink 600 GB/s. Llama 2 7B on
  A100: compute limit ≈ 23,145 tok/s, memory limit ≈ 151 tok/s; 4-bit ≈ 605; batch 32 ≈ 4,840; training ≈ 122 TFLOPS
  avg (≈ 39% MFU). M3 Pro 150 GB/s. Reuse in 1.1.13 (scaling laws) and Season 7/8.
- **Scaling laws** (1.1.13): Chinchilla form with Epoch AI's corrected fit (E 1.8172, A 482.01, B 2085.43, α 0.3478,
  β 0.3658; original Hoffmann fit gives 28–92 tokens/param). Gopher 280B/300B → 2.000 vs Chinchilla 70B/1.4T → 1.974;
  MMLU 67.5 vs 60.0. Llama 2 7B (297 tok/param, loss 2.067) vs same-loss compute-optimal 19.1B at 4.28e22 FLOPs;
  7B is 65% cheaper per token, break-even ≈ 1.5e12 generated tokens. Llama 3 8B: 15T tokens, 1,875 tok/param.
  Reuse in 1.4.9 (test-time compute) and Season 7 cost lessons.
- **Support tickets bug vs feature** (1.1.3): an 8-ticket dataset, Naive Bayes vs perceptron, bigram generator.
- **Capstone "DevBrain"** (engineering knowledge assistant): introduced from Season 2 on. Its version table is
  in `roadmap.mdx`.

## Module 1.1 plan (remaining)

| ID | Lesson | Angle / example | Prereqs |
|---|---|---|---|
| 1.1.4 | Neural networks: neurons, layers, activations | A neuron = weighted sum + bias + activation, framed as function composition. Hand-compute a 2-2-1 network on the bot features. Show why stacking linear layers without an activation collapses to one linear layer, and solve XOR, which one line can't. Cover ReLU, sigmoid and softmax (preview). Weights are hand-set; no training yet. | 1.1.2 |
| 1.1.5 | Parameters, weights and biases | Count parameters for the 2-2-1 network, then extrapolate to "7B". Weights as a giant config file. Memory math intuition: params × bytes (fp32/fp16/int4 preview for 8.1.3). | 1.1.4 |
| 1.1.6 | Loss functions | MSE vs cross-entropy with small numbers. Loss as a "wrongness score" for search. Show why cross-entropy punishes confident wrong answers, connecting to next-token loss in LLMs. | 1.1.5 |
| 1.1.7 | Gradient descent and optimization | Build gradient descent in TS on 1 parameter, then 2 (bot threshold → logistic). Learning rate too big or too small. Numeric gradient (nudge and measure) before any calculus. SGD/mini-batches, Adam named only. | 1.1.6 |
| 1.1.8 | Backpropagation (intuition) | The chain rule as "blame assignment" through layers. Compute gradients for the 2-2-1 net by hand with numbers. Mention autograd libraries. No derivations beyond one worked example. | 1.1.7 |
| 1.1.9 | Training vs inference | Build step vs runtime. Cost profiles differ: training is days on clusters, inference is per request. Frozen weights, why a model doesn't learn from your chat, and where fine-tuning fits (preview). | 1.1.7 |
| 1.1.10 | Overfitting and generalization | Memorization demo: fit the tiny ticket dataset perfectly, then fail on held-out data. Train/validation/test splits, regularization, and data leakage as a bug class engineers recognize. | 1.1.9 |
| 1.1.11 | Model evaluation metrics | Confusion matrix in TS; accuracy, precision, recall, F1. Imbalanced data (fraud). Threshold choice as a product decision. Reused later in retrieval (3.2.8). | 1.1.10 |
| 1.1.12 | GPUs and why AI needs compute | Matrix multiplication as the core op; CPU vs GPU parallelism; memory bandwidth; timing a JS matrix multiply at growing sizes. Training vs inference compute. No CUDA. | 1.1.5 |
| 1.1.13 | Scaling laws (intuition) | Loss falls predictably with params, data and compute (Kaplan 2020, Chinchilla 2022). Why "bigger" worked and why it's not the whole story now (test-time compute preview). **+ Module 1.1 assessment.** | 1.1.12 |

Suggested references to verify: 3Blue1Brown neural networks chapters 1–4, Google ML Crash Course (neural networks,
loss, gradient descent, classification metrics), Karpathy "micrograd"/Zero to Hero (optional), Kaplan et al. 2020
`arXiv:2001.08361`, Hoffmann et al. 2022 `arXiv:2203.15556`.

## Later modules: guidance

Topic lists, levels and slugs are in `course.yaml`. Per-module notes:

- **1.2 NLP foundations:** use tiktokenizer (https://tiktokenizer.vercel.app/) for token demos. Implement a toy BPE in TS
  (1.2.4). word2vec analogy demo with tiny hand-made vectors. Papers: Mikolov 2013 (`1301.3781`), Sennrich 2015
  (`1508.07909`). Assessment at 1.2.10.
- **1.3 Transformers:** do scaled dot-product attention on a 4-token example by hand in TS (1.3.3). Illustrated
  Transformer, Transformer Explainer, Vaswani 2017 (`1706.03762`), RoPE (`2104.09864`). KV cache intuition in 1.3.11.
  Assessment at 1.3.12.
- **1.4 LLMs:** the full pipeline prompt → tokens → logits → softmax → sample (1.4.3). Sampling playground in TS over
  fake logits (1.4.4). InstructGPT (`2203.02155`), DPO (`2305.18290`), Holtzman (`1904.09751`), DeepSeek-R1
  (`2501.12948`). 1.4.9 and 1.4.11 are **volatile**. Assessment at 1.4.13.
- **Season 2 (APIs, prompting, streaming, chat, evals):** first real provider calls. Show a raw `fetch` before any SDK.
  Keep keys server-side (BFF). Cover the OpenAI Responses API, Anthropic Messages API and Gemini as labeled examples;
  the Assistants API shut down 2026-08-26. The AI SDK is at v6 (Dec 2025). Frontend track modules 2.4 and 2.5 use
  React + TS. Evals: Hamel Husain's evals posts, promptfoo. **Most of Season 2 is volatile; research every API shape.**
- **Season 3 (embeddings, search, vector DBs):** cosine by hand → brute-force kNN → pgvector HNSW. MTEB is volatile.
  HNSW paper `1603.09320`. RRF for hybrid search.
- **Season 4 (RAG):** Lewis 2020 (`2005.11401`), Anthropic Contextual Retrieval, Lost in the Middle (`2307.03172`),
  Ragas (`2309.15217`), HyDE (`2212.10496`), GraphRAG (`2404.16130`).
- **Season 5 (tools, agents, MCP, memory):** build the tool loop by hand before frameworks. Anthropic "Building
  effective agents" and "Effective context engineering". MCP spec **2026-07-28** (stateless core, MCP Apps
  extension). AI SDK 6 `ToolLoopAgent` + `needsApproval`. LangChain/LangGraph 1.0 `createAgent`. Mastra 1.0.
  **Heavily volatile: re-verify.**
- **Season 6 (evals, security, observability):** OWASP LLM Top 10 2025 and the Agentic Top 10 2026, Greshake 2023
  (`2302.12173`), Willison "lethal trifecta", Zheng 2023 LLM-as-judge (`2306.05685`). OTel GenAI conventions are
  still in *Development* status (they moved to the `semantic-conventions-genai` repo in June 2026).
- **Season 7 (production):** architecture, cost and shipping. Chip Huyen *AI Engineering*. vLLM PagedAttention
  (`2309.06180`).
- **Season 8 (models under the hood):** Python allowed for fine-tuning (PEFT/TRL/Unsloth); say why. LoRA
  (`2106.09685`), QLoRA (`2305.14314`), Mixtral (`2401.04088`), FlashAttention (`2205.14135`).
- **Season 9 (AI-native engineering, frontier):** AGENTS.md (https://agents.md), Agent Skills
  (https://agentskills.io, stewarded by the Agentic AI Foundation), A2A v1.0.x under the Linux Foundation.
  Almost everything is **volatile**.

## Nice-to-haves (not started)

- Module intro pages with a module-level assessment rendered from MDX instead of inside the last lesson.
- Per-lesson "mark as done" progress (localStorage first; Supabase later with the deferred streak feature).
- A daily-log entry linking each new lesson.
