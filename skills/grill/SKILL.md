---
name: grill
description: Relentlessly interview and challenge a plan, epic, story, or design until every assumption is surfaced and every gap is found. Plays devil's advocate on requirements, scope, technical approach, and edge cases. Use when you want to stress-test a plan, poke holes, challenge an epic or story, play devil's advocate, pressure-test requirements, or say "grill me" or "grill this."
---

# Grill

Stress-test any plan, epic, story, or design through relentless questioning.

## How it works

If the user provides a Jira issue key, fetch it with `getJiraIssue` (reading Cloud ID from `.claude/sdlc-toolkit.local.md`) and review the full description and comments. If the user describes a plan verbally or points to a document, work from that.

If questions can be answered by exploring the codebase, explore instead of asking.

## What to challenge

Work through one angle at a time. Ask 2-3 pointed questions, wait for answers, then follow up or move to the next angle. Do not dump all questions at once — this is an interview, not a questionnaire.

Don't stop at surface-level answers — follow up until the answer is concrete and testable.

**Requirements:**
- Are they specific enough to code against, or do they leave room for interpretation?
- Are any requirements actually solutions in disguise? ("Use a stored procedure" vs "process invoices daily")
- Do any requirements conflict with each other?

**Scope:**
- What's explicitly out of scope that might get pulled in?
- Is this trying to do too much? Should it be split?
- Are there adjacent concerns that will inevitably come up during implementation?

**Edge cases:**
- What happens when inputs are invalid, missing, or malformed?
- What happens at scale? With concurrent users? With stale data?
- What happens when dependencies are unavailable?

**Testing:**
- How will you know this works? What's the test plan?
- What does a regression look like? How would you catch it?
- Is there test data available, or does it need to be created?

**Assumptions:**
- What's being assumed about the current system that might not be true?
- What's being assumed about the users that hasn't been validated?
- What technical assumptions haven't been verified against the codebase?

**Dependencies and risks:**
- What could block this work?
- What happens if a dependency ships late or changes?
- What's the rollback plan if this goes wrong?

## When you're done

When you have covered all six angles above and the user's answers are specific enough that an engineer could act on them without further clarification, provide a summary:

1. **Solid** — What's well-defined and ready
2. **Gaps identified** — Specific issues that were surfaced and need addressing
3. **Decisions pending** — Open questions that need answers before proceeding
4. **Recommendations** — Concrete next steps

If this was a Jira issue, offer to post a `[REVIEW] Stress-test findings` comment with the summary.
