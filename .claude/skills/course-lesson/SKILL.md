---
name: course-lesson
description: Write or publish lessons for the dailydevlog courses — AI Engineering (`ai-course`) and AI-Native Software Engineering (`ai-native-engineering`). Use whenever the user asks to write, add or publish a course lesson or module (e.g. "today's lessons", "write lesson 1.1.10", "next AI-native lesson", "start Module 2.1"), to log what they learned today in a course, or to update a course outline.
---

# Course lessons

Each course lives in `src/content/<course-id>/`:

- `course.yaml`: the outline and source of truth. Seasons contain modules, which contain topics (`id`, `title`,
  optional `slug`, `level` L1–L5, optional `maturity`, `volatile`). Titles, levels and maturity live **only** here.
- `lessons/s<season>/<slug>.mdx`: one MDX file per published topic, linked to the outline by `topic: '<id>'`.
- `roadmap.mdx`: long-form sections rendered on the course home page.

| Course id | URL | Format | Plan doc |
|---|---|---|---|
| `ai-course` | `/ai-course` | `formats/ai-course.md` | `docs/ai-course-plan.md` |
| `ai-native-engineering` | `/ai-native-engineering` | `formats/ai-native-engineering.md` | `docs/ai-native-engineering-plan.md` |

The course list is in `src/lib/courses.ts` (`COURSES`) and `src/content.config.ts`. `src/lib/courses.ts` fails the
build on unknown topics, unknown prerequisites, duplicate slugs, or two lessons claiming the same topic. Lesson URLs
are `/<course-id>/module-<x-y>/<slug>`.

## Daily flow

When the user says "today's lessons" or similar without naming topics:

1. Run `npm run course:next` to see progress and the next topics in each course.
2. By default, write the **next 1 lesson per course**, unless the user names a count, topic or course. If the user
   says what they learned today, write the lesson(s) matching that and ask before reordering the outline.
3. Follow the steps below for each lesson, then finish with the wrap-up.

## Write so the reader can learn (both courses)

The reader is the user, learning these topics themselves. They have pushed back on lessons that were long, read
like AI output, lectured an idea, or had no clear use (one lesson was deleted for that). Every lesson must pass
these checks:

- **Clear use first.** Before writing, finish this sentence: "After this lesson the reader can ___ at work." If
  you can't fill it with something they'd really do or need, don't write the lesson. Tell the user and suggest
  merging or cutting the topic.
- **Start from their problem.** Open with a situation they've been in, not a definition, statistic or history.
- **Show, then name.** Give the example or the concrete case first, then name the idea in one line. Don't write
  paragraphs that explain an idea without an example.
- **Plain words.** Write the way you'd explain it to a friend at the next desk. Define jargon in a few words the
  first time. If a simpler word works, use it.
- **Earn each paragraph.** For every paragraph, ask: "Does the reader learn or do something because of this?" If
  not, cut it. Research numbers are allowed only when they change what the reader does, and at most one or two.
- **Short.** Stay inside the format file's word target. When in doubt, cut.
- **Reread as a beginner** before finishing. Mark any sentence you had to read twice and rewrite it.

## Steps

0. Identify the course. Read its **plan doc** (status, per-module notes, running examples, lessons learned) and its
   **format file** in `formats/`.
1. Read the topic's entry in `course.yaml`, the lesson schema in `src/content.config.ts`, and the course's
   reference lesson (named in the format file; if the course has none yet, the latest lesson in that course). Skim
   the previous lesson's last sections for continuity. Don't re-read every earlier lesson.
2. **Research before writing** whenever the topic is `volatile: true` or mentions specific tools, APIs, SDKs, model
   names, protocol versions or prices. Use WebSearch/WebFetch against primary sources. Never state versions or API
   shapes from memory.
3. Create `src/content/<course-id>/lessons/s<N>/<slug>.mdx`, where `<slug>` is the topic's `slug` or its slugified
   title. Frontmatter:
   - `topic` (the outline id, quoted), `date` (today, `YYYY-MM-DD`), `summary` (one sentence),
     `estimatedMinutes`, `tags` (short topical tags, not the level).
   - `prerequisites`: outline topic ids from the **same course** that the reader really needs. They may be
     unpublished.
   - `lastVerified`: today's date. Required when the topic is volatile.
   - `references`: 2–6 entries with `title`, `source`, `url`, `tier` (`must`/`should`/`optional`), `level`
     (`Beginner`/`Intermediate`/`Advanced`) and `why`. Prefer official docs and original papers. For a paper, put
     the authors and year in `source`. Avoid SEO articles. Check each URL with
     `curl -s -o /dev/null -L -w '%{http_code}' -A 'Mozilla/5.0' URL`.
4. Write the body in the course's format file (sections, order, course-specific rules).
5. Components: import them with a relative path from the lesson file, e.g.
   `import Callout from '../../../../components/course/Callout.astro';`
   - `<Callout type="fact|practice|opinion|emerging|mistake|note" title="optional">` labels a claim. Label opinions
     and emerging techniques explicitly; don't present them as facts.
   - `<Answer label="...">` wraps any answer so readers try first.
6. For the **last lesson of a module**, add the module assessment the format file describes.
7. Check the lesson against "Write so the reader can learn" above and cut what fails.
8. Run `npx astro build`, and fix any failure before reporting done.

## Wrap-up (every session)

- Update the Status list in the course's plan doc, and add new running examples and lessons learned.
- Run `npm run course:next` and report what's next in each course.
- Don't commit unless the user asks.

## Attribution (required)

The site is public, so every lesson must credit what it borrows:

- **Inline credit** wherever the text uses a specific number, result, quote, dataset, named technique's origin or
  distinctive framing from a source: name the author(s) or organization and year, e.g. "(Kaplan et al., 2020)",
  "per NVIDIA's A100 datasheet", "Horace He's framing". Every source credited inline must also be in `references`.
- **Well-known analogies and diagrams count as framings.** Before finalizing, check the mental model and visual
  sections against famous explanations (e.g. Chollet's "rules + data → answers", the GAN counterfeiter/police
  analogy, Horace He's factory/warehouse, Goodfellow's AI ⊃ ML ⊃ DL diagram). If yours resembles one, credit it
  where it appears, not only later in the lesson.
- **Datasets and techniques named in passing** (MNIST, CIFAR-10, dropout, AdamW) get an inline origin credit and a
  reference entry too.
- **Borrowed code** (even small helpers like `mulberry32`) gets a comment naming its author and license, plus a
  reference entry.
- **Never copy prose, diagrams or code examples** from sources. Write original explanations and original ASCII
  diagrams; quote only short phrases, in quotation marks, with credit.
- The last section's body is exactly this paragraph:

  > This lesson is original writing. Its explanations, diagrams, code and datasets were created for this course, except
  > where the text credits another source. The facts, figures and ideas it builds on come from the sources below, and
  > specific numbers, results and framings are credited where they appear.

## Notes

- MDX gotchas: outside code, `<` followed by a letter or `=` breaks the build, and so does a bare `{` or `}`. Write
  `&lt;=` or use inline code.
- Keep courses vendor-neutral. Name specific providers only as labeled examples.
- To add or rename topics, edit `course.yaml`. Changing a topic's `slug` changes its URL.
- **Adding a new course:** create `src/content/<id>/` (`course.yaml`, `roadmap.mdx`, `lessons/`), register
  `<id>` and `<id>-lessons` in `src/content.config.ts`, add an entry to `COURSES` in `src/lib/courses.ts`, add
  labels in `ActivityCard.astro`, `Header.astro` and `search.astro`, and add a format file and a plan doc.
- If the user also wants a daily-log entry, add `src/content/daily-log/day-N.mdx` with a `links` entry for each
  lesson URL.
