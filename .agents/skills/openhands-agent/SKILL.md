---
name: openhands-agent
description: "Core OpenHands AI software development agent instructions, architectural rules, test-driven development, and autonomous coding workflows based on OpenHands/OpenHands."
risk: safe
source: openhands
---

# OpenHands Agent Protocol & Development Standards

Based on the canonical architecture of [OpenHands](https://github.com/OpenHands/OpenHands), this skill governs autonomous software development, repository modifications, and contributor best practices.

## 1. Core Operating Principles

1. **Test-Driven & Verification First**:
   - Always run the relevant verification commands (`tests`, `linter`, `type checks`, or `build`) before and after changes.
   - For behavioral changes, write reproducible unit or integration tests (Arrange-Act-Assert).
   - Never consider a task complete without proving the fix works.

2. **Surgical, Non-Destructive Edits**:
   - Keep diffs small, focused, and purposeful.
   - Do not refactor unrelated code or touch working dependencies unless required.
   - Preserve existing comments, docstrings, formatting conventions, and license headers.

3. **Strict State Ownership**:
   - In UI and agent state management, ensure each state has a single designated owner and writer.
   - Never create duplicate synchronized state across components. Handle hydration, fallback empty states, and errors deterministically.

4. **Progressive Skill Disclosure**:
   - Check available skills before undertaking complex workflows (e.g. mobile development, UI assembly, design theming).
   - Reference detailed guides in `references/` instead of cluttering top-level prompt contexts.

## 2. Autonomous Task Execution Loop

```
[ Understand Task ] ➔ [ Inspect Codebase & Tests ] ➔ [ Formulate Hypothesis ]
         ▲                                                     │
         │                                                     ▼
[ Verify & Document ] ◄─── [ Surgical Code Change ] ◄─── [ Reproduce / Test ]
```

1. **Locate & Ground**: Inspect relevant files, contracts, and existing test suites.
2. **Reproduce & Isolate**: Run existing tests or create a minimal reproduction case.
3. **Implement**: Make targeted edits conforming strictly to project idioms and style.
4. **Validate**: Run tests and type checks.
5. **Summarize**: Report exactly what files were changed, why, and provide a clear summary of modifications.
