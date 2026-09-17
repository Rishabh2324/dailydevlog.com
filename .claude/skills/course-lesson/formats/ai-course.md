# Format: AI Engineering (`ai-course`)

Audience: a software engineer who is new to AI and wants to **understand the ideas and the jargon** of the AI
field well enough to follow discussions, read docs and make good decisions. They don't want to become an AI
researcher. Plan doc: `docs/ai-course-plan.md`. Reference lesson:
`src/content/ai-course/lessons/s1/rules-vs-learned-functions.mdx`.

## What a lesson should feel like

One term or concept, explained simply, with an everyday example. The reader should finish in **about 8–10 minutes**
and be able to explain the term to a colleague in two sentences.

Target length: **600–1,000 words.** Explain the basics, then stop. Depth goes in `references`, not in the lesson.

## Body sections

Use exactly these `##` sections, in this order. No numbers in headings.

1. **Why this matters** — 2–4 sentences: where the reader meets this term (a product, a doc, a meeting). End with
   "By the end of this lesson, you'll …" (one concrete outcome).
2. **The idea** — a one or two sentence definition in plain words, then a short explanation. No formulas. A tiny
   number example is fine if it makes the idea click. Keep it to about 150 words, and tie it to a concrete case
   straight away; a long abstract explanation loses the reader.
3. **A real-life example** — an everyday situation that works the same way (cooking, a new job, a GPS, a spam
   folder…), followed by one real product or AI system where the idea shows up. Credit well-known analogies.
4. **How it works** — the basic mechanism in 3–6 short steps or paragraphs, optionally one small diagram (fenced
   `text` block, lines ≤ 60 chars). Stop at intuition; point to references for the details.
5. **Where you'll see it** — 3–5 bullets: how this term shows up in AI tools, APIs, model cards, news or team
   discussions, and why a software engineer cares.
6. **Common confusions** — 2–4 bullets, each clearing up one mix-up ("X is not the same as Y").
7. **Key terms** — a two-column table (term → one-line meaning) of 3–6 terms from this lesson, then one line:
   "Next: lesson X.Y.Z, …" saying how the next lesson follows.
8. **Sources and acknowledgements** — the standard acknowledgement paragraph from `SKILL.md`.

The last lesson of a module adds `## Module check` before Sources: 5 short questions with answers inside one
`<Answer>`. Under 250 words.

## Code

- **No code by default.** This course explains concepts; it doesn't build them.
- Only from Season 2 on, and only when seeing a request or config is the clearest way to recognize the term (for
  example, what an API request with `temperature` looks like), include one short snippet of at most 12 lines. Verify
  its shape against current docs.
- No exercises that require running code.

## Writing rules (simple English)

- Short sentences, most under 20 words. Paragraphs of 1–4 sentences.
- Everyday words. Define each piece of jargon the first time, in a few words.
- Talk to the reader: "you". Prefer a concrete example over an abstract statement.
- One idea per lesson. If you find yourself explaining a second concept, give it one sentence and point to its lesson.
- Numbers only when they help the idea land, and credit them. Avoid tables of numbers.
- Bullets may start with a short bold phrase to help skimming; otherwise bold at most one phrase per section. At
  most 2 callouts per lesson; use `<Callout type="opinion|emerging">` only
  when a claim needs that label.
- Avoid patterns that read as generated filler: "It's not X, it's Y"; triplets for rhythm; "Let's dive in", "It's
  important to note"; summaries that repeat the section; hedging
  every sentence.

## References

- 2–4 entries. Put the most beginner-friendly source first (3Blue1Brown, Google ML Crash Course, Hugging Face
  course, official docs) as `must`. Papers are `optional` "go deeper" material.
- Every source credited inline must be in `references`. Check URLs with curl as `SKILL.md` describes.
- For `volatile: true` topics, research current facts and set `lastVerified`.
