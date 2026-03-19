# Epic Review Checklist

Use this checklist when reviewing an epic before breaking it into stories. This is the quality gate — be rigorous. If the epic doesn't pass, push back before proceeding.

## Requirements Quality

- [ ] Problem statement is specific and measurable (not vague or aspirational)
- [ ] Each requirement is independently testable
- [ ] Requirements don't overlap or contradict each other
- [ ] No requirement assumes a specific implementation (defines what, not how)
- [ ] Requirements are numbered for easy reference

## Acceptance Criteria Quality

- [ ] Uses Given/When/Then format
- [ ] At least 3 criteria defined
- [ ] Criteria cover the happy path
- [ ] Criteria cover at least one error or edge case
- [ ] Criteria are specific enough to write automated tests from
- [ ] No vague qualifiers ("fast", "easy", "robust") without specific thresholds

## Scope Clarity

- [ ] In-scope items are listed explicitly
- [ ] Out-of-scope items are listed explicitly
- [ ] No ambiguous items that could be interpreted either way
- [ ] Scope is achievable in a reasonable timeframe (not trying to boil the ocean)
- [ ] If scope feels too broad, consider recommending a split into 2+ epics

## Context and Dependencies

- [ ] Systems and components involved are identified
- [ ] Stakeholder (problem owner) is named
- [ ] UAT owner is named
- [ ] Dependencies on other work, teams, or systems are listed (or explicitly "None")
- [ ] Technical constraints or compliance requirements are noted

## Red Flags

Watch for these — each one warrants a `[REVIEW] Needs clarification` comment:

- [ ] Vague terms without thresholds: "fast", "easy", "simple", "robust", "scalable", "user-friendly"
- [ ] Undefined acronyms or domain terms that could mean different things to different people
- [ ] Implementation details baked into requirements (solution prescribing vs. problem defining)
- [ ] Missing error handling or edge case consideration
- [ ] No mention of testing or validation approach
- [ ] Scope that tries to do too much (classic "and also..." creep)
- [ ] Dependencies that haven't been confirmed or ticketed

## Challenge Protocol

When you find issues, don't just note them. Challenge with specific questions:

| Issue | Challenge |
|-------|-----------|
| Vague AC | "AC #3 says 'system should be fast' — what's the target latency? Under what load?" |
| Missing scope | "Error handling isn't mentioned. Are we building retry logic, or failing fast?" |
| Too broad | "This covers extraction AND reconciliation AND reporting. Should extraction be its own epic?" |
| No edge cases | "What happens when the barcode doesn't match any record?" |
| Assumed implementation | "Requirement says 'use stored procedure' — should we define what it does, not how?" |
| Missing stakeholder | "Who signs off on UAT? Without a named owner, testing gets skipped." |
