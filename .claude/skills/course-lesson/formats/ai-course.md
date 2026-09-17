# Format: AI Engineering (`ai-course`)

Audience: an experienced software engineer who is new to AI. Plan doc: `docs/ai-course-plan.md`.
Reference lesson: `src/content/ai-course/lessons/s1/ai-vs-ml-vs-dl-vs-genai.mdx`.

## Body sections

Use exactly these numbered `##` sections, in this order:

1. Why does this exist?
2. What problem does it solve?
3. Simple explanation (for an experienced software engineer new to AI)
4. Mental model
5. How it works internally
6. Visual explanation (ASCII diagrams in fenced code blocks, lines ≤ 70 chars)
7. Connection to software engineering (APIs, databases, frontend, backend, distributed systems)
8. Code example (TypeScript; use Python only when the ecosystem requires it, and say why)
9. Real-world example
10. Common mistakes
11. Limitations
12. When to use it
13. When NOT to use it
14. Interview explanation (30 seconds, as a blockquote)
15. Deep interview explanation (2–5 minutes)
16. Hands-on exercise (something runnable)
17. Challenge (harder)
18. Sources and acknowledgements (use the standard acknowledgement paragraph from `SKILL.md`; the page renders the frontmatter references below it)

## Course-specific rules

- Math stays intuitive: small worked numeric examples, no derivations.
- Run every code example and paste the real output. Recompute any numbers you quote against that output.
- Keep examples dependency-free TypeScript until Season 2. Later seasons may use real SDKs, but verify their APIs first.
- Reuse the running examples listed in the plan doc.
