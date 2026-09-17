---
name: ai-lesson-writeup
description: Write a lesson for the dailydevlog AI Engineering course (src/content/ai-course) in the course's fixed 18-section format. Use whenever the user asks to write, add or publish an AI course lesson or module (e.g. "write lesson 1.1.2", "start Module 1.2", "add the next AI lesson"), or to update the AI course outline.
---

# AI course lesson write-up

The AI Engineering course lives in `src/content/ai-course/`:

- `course.yaml` — the outline and source of truth: seasons → modules → topics (`id`, `title`, optional
  `slug`, `level` L1–L5, optional `maturity`, `volatile`). Topic titles, levels and maturity live **only** here.
- `lessons/s<season>/<slug>.mdx` — one MDX file per published topic, linked to the outline by `topic: '<id>'`.
- `roadmap.mdx` — long-form course sections rendered on `/ai-course`.

`src/lib/ai-course.ts` joins the two and fails the build on unknown topics, unknown prerequisites or duplicate
slugs. URLs are `/ai-course/module-<x-y>/<slug>`.

## Steps

0. Read `docs/ai-course-plan.md` (status, per-module notes, running examples, lessons learned), and update its
   Status list when you finish.
1. Read `src/content.config.ts` (`ai-lessons` schema), the topic's entry in `course.yaml`, and the reference
   lesson `lessons/s1/ai-vs-ml-vs-dl-vs-genai.mdx` to match structure, tone and component usage.
2. If more than one lesson is requested (e.g. a whole module), write them in outline order, one file each.
3. **Research before writing** whenever the topic is `volatile: true` or mentions specific tools, APIs, SDKs,
   model names, protocol versions or prices. Use WebSearch/WebFetch against primary sources (official docs,
   specs, papers, engineering blogs). Never state versions or API shapes from memory.
4. Create `lessons/s<N>/<slug>.mdx`, where `<slug>` is the topic's `slug` or its slugified title. Frontmatter:
   - `topic` (the outline id, quoted), `date` (today, `YYYY-MM-DD`), `summary` (one sentence),
     `estimatedMinutes`, `tags` (short topical tags, not the level).
   - `prerequisites` — outline topic ids the reader truly needs (they may be unpublished).
   - `lastVerified` — today's date, required when the topic is volatile.
   - `references` — 2–6 entries with `title`, `source`, `url`, `tier` (`must`/`should`/`optional`),
     `level` (`Beginner`/`Intermediate`/`Advanced`), `why`. Prefer official docs and original papers; for papers,
     put authors and year in `source`. Avoid SEO articles.
5. Body: exactly these `##` sections, in order, numbered:
   1. Why does this exist?
   2. What problem does it solve?
   3. Simple explanation (for an experienced software engineer new to AI)
   4. Mental model
   5. How it works internally
   6. Visual explanation (ASCII diagrams in fenced code blocks, lines ≤ 70 chars)
   7. Connection to software engineering (APIs, databases, frontend, backend, distributed systems)
   8. Code example (TypeScript; Python only when the ecosystem requires it — say why)
   9. Real-world example
   10. Common mistakes
   11. Limitations
   12. When to use it
   13. When NOT to use it
   14. Interview explanation (30 seconds, as a blockquote)
   15. Deep interview explanation (2–5 minutes)
   16. Hands-on exercise (something runnable)
   17. Challenge (harder)
   18. References (one line — the page renders the frontmatter references below it)
6. Components (import with a relative path from the lesson file, as in the reference lesson):
   - `<Callout type="fact|practice|opinion|emerging|mistake|note" title="optional">` to label claims.
     Label opinions and emerging techniques explicitly; don't present them as facts.
   - `<Answer label="...">` for any answer, so readers try first.
7. For the **last lesson of a module**, append a `## Module assessment` section with 5 conceptual, 3 practical and
   2 interview questions and 1 implementation challenge, followed by `## Answers`, where each answer is wrapped in
   `<Answer>`.
8. Run `npx astro build` (it validates schema, topic ids and prerequisites, and catches MDX syntax errors), and
   fix any failure before reporting done.

## Notes

- MDX gotchas: outside code, a `<` followed by a letter or `=`, and a bare `{` or `}`, break the build.
  Write `&lt;=` or use inline code.
- Math stays intuitive: small worked numeric examples, no derivations.
- Keep the course vendor-neutral; name specific providers only as labeled examples.
- To add or rename topics, edit `course.yaml`. Changing a topic `slug` changes its URL.
- If the user also wants a daily-log entry, add `src/content/daily-log/day-N.mdx` with a `links` entry pointing at
  the lesson URL.
