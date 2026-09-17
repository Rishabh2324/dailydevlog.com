# AI Engineering Course: Writing Plan

The handoff doc for writing lessons across sessions. Start a session with "today's lessons", or:

> Write AI course lesson X.Y.Z.

The `course-lesson` skill (`.claude/skills/course-lesson/`) holds the shared steps, and `formats/ai-course.md` holds
the lesson format. This doc holds status, direction and lessons learned. The original, much larger blueprint is in
`docs/ai-course-content.md`; treat it as background only.

## Direction (2026-09-17)

After reading the first lessons, the reader said they were far too long and complex. The course was reset:

- **Purpose:** help a software engineer understand AI ideas and jargon. Not research, not building from scratch.
- **Outline:** cut from 295 to 87 topics, one important idea or term per lesson. Seasons 1–4 are the core.
- **Lessons:** 600–1,000 words, simple English, an everyday real-life example, no code in Season 1, at most one
  short snippet later. Depth goes in `references`, not the lesson.
- **All 14 published lessons were rewritten** in the new format on 2026-09-17. Their topic ids and URLs didn't change.

## Where things live

| What | Path |
|---|---|
| Outline (source of truth for topics, levels, slugs) | `src/content/ai-course/course.yaml` |
| Lessons | `src/content/ai-course/lessons/s<N>/<slug>.mdx` |
| Course home page sections | `src/content/ai-course/roadmap.mdx` |
| Course registry, joins and build-time validation | `src/lib/courses.ts` |
| MDX components | `src/components/course/` (`Callout`, `Answer`, `TopicList`) |

## Status

Published lessons (`npm run course:next` is the ground truth):

- [x] 1.1.1 to 1.1.13 (Module 1.1, with the module check in 1.1.13)
- [x] 1.2.1 Text representation: one-hot, bag-of-words, TF-IDF
- [ ] **1.2.2 Tokens and tokenization** ← next

Total: 14 of 87.

## Session workflow

1. Write 1 lesson per day, alongside 1 AI-Native Software Engineering lesson. At most 3 per session.
2. For each lesson:
   - Read its `course.yaml` entry and the module note below. Skim the previous lesson's "Key terms" and "Next" line.
   - Research anything volatile (tools, model names, prices, protocol versions) against primary sources and set
     `lastVerified`.
   - Check reference URLs with `curl -s -o /dev/null -L -w '%{http_code}' -A 'Mozilla/5.0' URL`. Medium and ACM
     return 403 to curl; confirm those with WebSearch.
   - Check every "lesson X.Y.Z" mention points to a topic that exists in `course.yaml`.
   - Run `npx astro build`.
3. Update the Status list above.

## Lessons learned

- The reader wants less, not more. When in doubt, cut. One idea, one everyday example, one real product example.
- Put the real-life example early; it's what makes the idea stick.
- Quote any frontmatter `why:` text that contains ": " (colon + space), or rephrase it; unquoted it breaks YAML.
- MDX breaks on `<` followed by a letter or `=` outside code, and on bare `{` `}`.
- Label invented numbers as illustrative. Credit real numbers inline and list the source in `references`.
- Credit well-known analogies and diagrams where they appear (e.g. Chollet's rules/data picture in 1.1.2,
  Goodfellow et al.'s nested circles in 1.1.1).
- The last lesson of a module gets `## Module check`: 5 short questions, answers in one `<Answer>`.

## Module notes

- **1.2 From words to meaning:** 1.2.2 tokens (use a tokenizer playground such as https://tiktokenizer.vercel.app/ as
  the real example; explain why "strawberry" letter counting is hard). 1.2.3 embeddings (words as points on a map;
  king − man + woman ≈ queen, credit Mikolov et al. 2013). 1.2.4 attention (how "it" in a sentence finds what it
  refers to). Module check at 1.2.4.
- **1.3 Transformers:** no math. 1.3.1 what it is (Vaswani et al. 2017), 1.3.2 self-attention as each word looking at
  the others, 1.3.3 context windows and the KV cache as "not re-reading the whole book for each new word".
- **1.4 How LLMs work:** pretraining → instruction tuning → RLHF as school → job training → feedback from a manager.
  1.4.5 and 1.4.6 are volatile.
- **Season 2:** one short request snippet is allowed in 2.2.1 (verify current API shapes). Keep "why" and
  "when" over "how to implement".
- **Seasons 3–4:** embeddings, search and RAG explained with library and search-engine analogies.
- **Seasons 5–9:** heavily volatile (MCP, agents, coding tools). Research every lesson; describe the idea before
  naming products.
