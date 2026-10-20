---
name: veltara-phase
description: Execute one VELTARA.ID development phase with scoped planning, specialist delegation, validation gates, and persistent phase state. Use whenever starting or finishing a phase.
---

# Phase execution

## 1. Resolve scope
Use `veltara-context`. Extract only:
- phase goal,
- deliverables,
- acceptance criteria,
- relevant existing contracts.

## 2. Plan
Create 3–8 bounded tasks. Identify:
- owner agent,
- files/areas,
- dependencies,
- verification command/check.

Parallelize only non-overlapping tasks.

## 3. Implement
Workers must preserve existing contracts unless a deliberate contract change is part of the task. Record contract changes explicitly.

## 4. Integrate
Coordinator checks diffs and resolves mismatched assumptions.

## 5. Verify
Invoke `veltara-review`. Run phase-relevant lint/typecheck/tests/build.

## 6. Persist
Update `VELTARA/state/phase-state.json`:
- status,
- completed phase,
- concise summary,
- architecture decisions,
- known risks,
- timestamp.
