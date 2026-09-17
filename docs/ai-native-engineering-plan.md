# AI-Native Software Engineering Course: Writing Plan

The handoff doc for writing lessons across sessions. Start a session with "today's lessons", or:

> Write the next AI-native lesson (or: lesson X.Y.Z).

The original spec is in `docs/ai-native-engineering-spec.md`. The `course-lesson` skill
(`.claude/skills/course-lesson/`) holds the shared steps, and `formats/ai-native-engineering.md` holds this course's
short 8-section lesson format (reworked 2026-09-17 after reader feedback). This doc holds status, sequencing, running examples and lessons learned.

## Where things live

| What | Path |
|---|---|
| Outline (source of truth for topics, levels and slugs) | `src/content/ai-native-engineering/course.yaml` |
| Lessons | `src/content/ai-native-engineering/lessons/s<N>/<slug>.mdx` |
| Course home long-form sections | `src/content/ai-native-engineering/roadmap.mdx` |
| Course registry, joins and validation | `src/lib/courses.ts` |
| Pages (shared by all courses) | `src/pages/[course]/` |
| MDX components | `src/components/course/` (`Callout`, `Answer`, `TopicList`) |

## Status

Outline: Seasons 1–4 (Parts 0–2), 76 topics. **Seasons 5+ (UX, UI, building, testing, shipping, operating,
automating) are waiting on the rest of the spec.** When it arrives, add them to `course.yaml` and extend the
Parts list in `roadmap.mdx`.

Published lessons (update after each session; `npm run course:next` is the ground truth):

- [x] 1.1.1 How software gets built, and where the time goes
- [ ] **1.1.2 AI-assisted vs AI-native development** ← next

Total: 1 of 76.

## Session workflow

1. Write **1 lesson per day** here, alongside 1 AI Engineering lesson (see `docs/ai-course-plan.md`). If a day's
   learning covers more, write more.
2. For each lesson:
   - Read its `course.yaml` entry and the module notes below. Skim the previous lesson's "Remember" section.
   - Research anything tool-specific against official docs and set `lastVerified`.
   - Run real prompts where the lesson shows AI output. Trim the output, and label anything illustrative.
   - Run `npx astro build`.
3. Update the Status list above, then add running examples and lessons learned.

## Running project (reuse for continuity)

**ShipLog**: a team release-notes and changelog app, used as the example product throughout the course.

- Frontend: React + TypeScript (the student's home turf). Backend: a Node/TypeScript REST API. Database: Postgres.
- Features that grow across seasons: write release notes from merged PRs, tag them by feature area, publish a
  public changelog page, notify subscribers by email, and roll out features behind flags.
- Season 2 turns the "subscriber email notifications" idea into a PRD, stories, acceptance criteria and a plan.
  Season 3 researches the email provider and queue options. Season 4 designs the notification architecture and
  writes an ADR.
- **SHIP-142 "Public changelog page"** (1.1.1): invented Jira/GitHub event log, 48 working hours elapsed (09:00–17:00),
  15.5 active / 32.5 waiting; coding 5 h (10%), PM clarification wait 11.5 h (24%), review waits 5.5 + 3.5 h, deploy
  queue 5.5 h. Amdahl: 2× coding → about 5%; halving clarification wait → 12%. Reuse in 1.1.2–1.1.4 and 2.2.2
  (the three questions: 404 vs redirect, pagination, SEO owner).
- Swap ShipLog for a real work project in exercises whenever you can, but never paste confidential code or
  data into a tool your company hasn't approved.

## Lessons learned (apply to every lesson)

- Reader feedback on 1.1.1 (2026-09-17): the 17-section version was too long and felt AI-generated. Keep lessons to
  one idea, 900–1,400 words, simple English, and a clear purpose line at the top. See the writing rules in the format file.
- Trimming real AI output means removing rows or lines and marking it; never merge or reword the output.
- Real AI output: run prompts with `claude -p "$(cat prompt.md)" --model sonnet` from the scratchpad, label the
  model and date, and mark trims with `[... trimmed ...]` in their original positions.
- Always recompute AI-produced numbers in the lesson and show one correction the engineer made; there is usually a
  real one (1.1.1: 5 h vs 6 h design wait).
- Name events and invented logs as invented in a `note` callout; use roles, not names.
- METR 2025 (19% slower) has a 2026 follow-up that points toward speedups but is unreliable (selection bias). Cite
  both whenever citing either.

## Module notes

- **1.1:** Keep 1.1.3 (the ladder) and 1.1.4 (the loop) as the two diagrams the whole course refers back to.
- **1.2:** Each role lesson uses the same shape: the task, the role, one worked ShipLog example, and when that role
  is the wrong choice. 1.2.8 ends with a task → role decision table.
- **1.3:** Tie autonomy levels to concrete permissions (read-only, edit files, run commands, push, deploy).
  1.3.5 is volatile: coding-agent permission models change often.
- **1.4:** 1.4.1 and 1.4.2 are about *consequences for engineers*, not model internals. Point to the AI
  Engineering course for internals. 1.4.6 ends Season 1 with the module assessment.
- **Season 2:** One running artifact: ShipLog "subscriber notifications", from idea (2.1.1) to implementation
  plan (2.3.7).
- **Season 3:** Every lesson separates AI-generated claims from verified facts, primary sources, assumptions and
  opinions.
- **Season 4:** AI proposes alternatives and trade-offs, and the human decides and writes the ADR. Use Mermaid
  (it renders on GitHub) and C4 (https://c4model.com).
