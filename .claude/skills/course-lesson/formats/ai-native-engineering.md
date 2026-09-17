# Format: AI-Native Software Engineering (`ai-native-engineering`)

Audience: a professional frontend developer who already knows TypeScript, React, APIs, Git, testing, CI/CD, Jira
and Figma. Don't teach programming fundamentals. Plan doc: `docs/ai-native-engineering-plan.md`. Original spec:
`docs/ai-native-engineering-spec.md`. Reference lesson:
`src/content/ai-native-engineering/lessons/s1/where-the-time-goes.mdx`.

Every lesson answers one question: **"How would a good engineer use AI for this task?"**

## What a lesson should feel like

The reader should finish in **10–15 minutes** without losing the thread. They should always know *why* they are
reading the current paragraph. One lesson teaches **one idea** and **one thing to do**. If a lesson needs more,
split the topic or cut.

Target length: **900–1,400 words** of prose (prompts and short outputs don't count much, but keep them short too).

## Body sections

Use exactly these `##` sections, in this order. No numbers in headings.

1. **Why this matters** — 2–4 sentences. Start from a situation the reader knows from work. End with one line:
   "By the end of this lesson, you'll be able to …" (one concrete skill, not a list).
2. **The idea** — the one idea of the lesson in plain words. At most one small diagram (fenced `text` block, lines
   ≤ 60 chars). A number or a finding from research is fine if it makes the idea land; credit it.
3. **How to do it** — 3–6 numbered steps. Mark the steps where a human must decide with **(you decide)**.
4. **Example** — the running project (ShipLog). A short prompt, a short trimmed real output, and 2–4 bullets on what
   the engineer checked or changed. This is where "verify the AI" is shown, not lectured.
5. **Watch out** — 3–5 bullets mixing the biggest mistakes, risks, and when *not* to use AI here.
6. **Try it** — one exercise that takes about 20–30 minutes on real work or ShipLog. Say what "done" looks like in one
   line. Put hints or a sample answer in `<Answer>`.
7. **Remember** — exactly 3 short bullets the reader should keep, then one line: "Next: lesson X.Y.Z, …" saying
   why the next lesson follows from this one.
8. **Sources and acknowledgements** — the standard acknowledgement paragraph from `SKILL.md`.

No interview section, no "tools today" tour, no autonomy table, no team section, no challenge. Mention a tool, a
team practice or an approval rule only when it is the point of the lesson (for example in Season 1.3 on autonomy).

## Writing rules (simple English)

- Short sentences, most under 20 words. One idea per paragraph. Paragraphs of 1–4 sentences.
- Everyday words. "use" not "leverage", "help" not "empower", "check" not "validate" unless it's the technical
  term. Explain any jargon the first time in a few words, or don't use it.
- Talk to the reader: "you". Concrete over abstract: a real ticket, a real number, a real prompt.
- Bold at most one phrase per section. At most 2 callouts per lesson.
- Lists only when items are truly parallel. Don't turn every paragraph into bullets.
- Cut anything the reader could skip without missing the point. If a sentence only sounds wise, delete it.
- Avoid patterns that read as generated filler:
  - "It's not X, it's Y" and "X isn't just Y" constructions.
  - Triplets of adjectives or nouns for rhythm ("fast, reliable and scalable").
  - Openers like "In today's world", "Let's dive in", "It's important to note".
  - Headings or bullets that start with a bold label and a colon, one after another.
  - Summaries that repeat the section they close.
  - Hedging every claim. State it plainly, credit it, or label it as opinion.

## Course-specific rules

- Prompts go in fenced code blocks (`text`, `md`). Keep them short and copy-pasteable. Trim long data with a note.
- Never invent AI output. Run the prompt against a real model, trim the output, and say that you trimmed it (and
  which model and date). If you can't run it, write "Example output (illustrative)" in a `<Callout type="note">`.
- Invented project data (tickets, logs) is labeled as invented, once, briefly.
- Any lesson that names a tool, agent, IDE feature, MCP server or model is volatile: research it against official
  docs and set `lastVerified`. Describe the capability before naming a product.
- Use the running project and examples from the plan doc so lessons build on each other.
- Credit research inline, briefly: "(Atlassian, 2025)". Every inline credit must be in `references` (2–5 entries).
- The last lesson of a module adds `## Module check` before Sources: 5 short questions and 1 practical task, with
  answers inside `<Answer>`. Keep it under 300 words.
