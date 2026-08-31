---
name: dsa-writeup
description: Add a new DSA problem write-up to src/content/dsa following this project's 8-step problem-solving format. Use whenever the user gives a problem statement and asks to add it as a DSA entry, log today's DSA problem, or write up a solution for the dailydevlog DSA collection.
---

# DSA write-up

This project (dailydevlog.com) tracks one DSA problem per day as an MDX entry in
`src/content/dsa/`, following a fixed 8-step problem-solving process. This skill produces
that entry from a raw problem statement.

## Steps

1. Read the frontmatter schema in `src/content.config.ts` (`dsa` collection) and one existing
   entry in `src/content/dsa/` to match current field names and style exactly.
2. Pick a slug: kebab-case, short, based on the problem name (e.g. `second-largest.mdx`).
3. Fill in frontmatter:
   - `title`, `difficulty` (`Easy`/`Medium`/`Hard`), `pattern` (array of technique tags,
     e.g. `[Arrays, Two Pointers]`), `date` (today, `YYYY-MM-DD`), `problemUrl` (optional,
     only if a real source link exists — omit otherwise), `timeComplexity`, `spaceComplexity`,
     `summary` (one sentence).
4. Write the body as these numbered sections, in this order, every time:
   1. **Restate the problem** — the problem in your own words, plus the exact required
      output strings/values from the statement (error messages, edge-case outputs, etc.)
      reproduced verbatim.
   2. **Inputs, outputs, edge cases** — constraints, valid input shape, and the specific
      edge cases named in the problem (empty/short input, duplicates, negatives, all-equal,
      single element, etc.).
   3. **Work a small example by hand** — trace one example from the problem statement
      step by step (a table works well for state-tracking problems), ending at the expected
      output.
   4. **Brute force first** — a naive solution with its own code block, and its time/space
      complexity, even though it won't be the final answer.
   5. **Identify the pattern and optimize** — name the technique/pattern (two pointers,
      sliding window, DFS/BFS, DP, greedy, binary search, single-pass tracking, etc.) and
      explain what closes the gap from the brute force complexity to the target.
   6. **Code it** — the final solution in a fenced ```ts code block. Match the style of
      existing entries (function declaration, no unnecessary comments, clear variable names).
   7. **Test it manually** — dry-run the final code against every example given in the
      problem statement (including edge cases), showing the result matches expectations.
   8. **Review and log** — 2-4 bullets: the approach/pattern used, one concrete mistake to
      watch for in this pattern, and what recurring pattern this generalizes to.
   9. **Complexity** — closing summary with `- **Time:**` and `- **Space:**` bullets,
      matching the frontmatter values.
5. Save the file to `src/content/dsa/<slug>.mdx`.
6. Run `npx astro check` to confirm the new frontmatter matches the Zod schema before
   reporting done.

## Notes

- Never invent a `problemUrl` — only include it if the user gave a real link.
- Keep numbered section headers as `## 1. Restate the problem`, etc., exactly matching
  this list, so entries stay consistent across the collection.
- If the user also wants a daily-log entry for the same day, add one in
  `src/content/daily-log/day-N.mdx` (increment `day` from the highest existing entry) with
  a `links` entry pointing at `/dsa/<slug>`.
