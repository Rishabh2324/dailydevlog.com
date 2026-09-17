# Format: AI-Native Software Engineering (`ai-native-engineering`)

Audience: a professional frontend developer who already knows TypeScript, React, APIs, Git, testing, CI/CD, Jira
and Figma. Don't teach programming fundamentals. Plan doc: `docs/ai-native-engineering-plan.md`. Original spec:
`docs/ai-native-engineering-spec.md`.

Every lesson answers: **"How would a good software engineer use AI to do this task?"** Teach the workflow, not the
tool. AI augments engineering judgment and never replaces it.

## Body sections

Use exactly these numbered `##` sections, in this order:

1. The engineering task (what the task is, why it matters, what "done well" looks like)
2. How engineers do it without AI (the baseline, and where it's slow or error-prone)
3. Where AI helps and where it doesn't (which role AI plays here: assistant, researcher, planner, reviewer,
   debugger, architecture thought partner or coding agent)
4. Mental model
5. The AI-assisted workflow (numbered steps plus an ASCII flow diagram in a fenced block, lines ≤ 70 chars; mark
   every human decision point)
6. Context to give the AI (inputs such as tickets, docs, code, Figma or logs; what to leave out, and why)
7. Worked example on the running project (real prompts or agent instructions, the real AI output trimmed and
   labeled, and what the engineer changed or rejected)
8. Verification (a checklist of how to prove the output is right: tests, sources, review, measurements)
9. Failure modes and risks (hallucinations, missing context, security, privacy, over-reliance)
10. Autonomy and approval (what AI may do alone, what needs human approval, and what AI must never decide)
11. Working in a team (PRs, reviews, conventions, shared prompts or skills, how to communicate AI use)
12. Tools today (labeled examples only, vendor-neutral; set `lastVerified` and research them first)
13. When NOT to use AI for this
14. Interview explanation (30 seconds, as a blockquote)
15. Hands-on exercise (do it on a real task or the running project; say what to hand in)
16. Challenge (harder, or with more autonomy)
17. Sources and acknowledgements (use the standard acknowledgement paragraph from `SKILL.md`; the page renders the frontmatter references below it)

## Course-specific rules

- Prompts, agent instructions and configs go in fenced code blocks (`text`, `md`, `yaml`, `ts`). Keep them
  copy-pasteable.
- Never invent AI output. Run the prompt against a real model, trim the output, and say that you trimmed it. If you
  can't run it, write "Example output (illustrative)" in a `<Callout type="note">`.
- Use `<Callout type="practice">` for workflow rules, `<Callout type="mistake">` for anti-patterns, and
  `<Callout type="emerging">` for fast-moving tools and practices.
- Any lesson that names a tool, agent, IDE feature, MCP server or model is volatile. Research it against official
  docs, set `lastVerified`, and describe the capability before naming a product.
- Use the running project and examples from the plan doc so lessons build on each other.
- The last lesson of a module gets a `## Module assessment` section instead of a quiz: 5 conceptual questions,
  3 workflow scenarios ("what would you do?"), 2 interview questions and 1 practical assignment, followed by
  `## Answers`.
