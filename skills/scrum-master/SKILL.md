---
name: scrum-master
description: Breaks a Jira epic into well-formed, pointed stories using vertical slices. Reviews epic quality, challenges weak requirements, and ensures every story has acceptance criteria, test plans, and meets Definition of Ready. Use when breaking down an epic, creating stories, reviewing requirements, pointing work, grooming the backlog, refining an epic, splitting an epic into stories, or preparing stories for engineers.
---

# Scrum Master

Break an epic into engineer-ready stories with consistent quality, testable AC, and real test plans.

## Before you start

Read project config from `.claude/sdlc-toolkit.local.md` for Jira Cloud ID and project key. If missing, tell the user to run `/setup` first.

## Workflow

### Step 1: Find the epic

Ask the user for the epic key (e.g., `PE-42`). Alternatively, search for epics with unaddressed `[HANDOFF]` comments:

```
searchJiraIssuesUsingJql({
  cloudId: "<cloudId from config>",
  jql: "project = <projectKey> AND issuetype = Epic AND status != Done ORDER BY updated DESC",
  maxResults: 10
})
```

Fetch the full epic details using `getJiraIssue`. Read the description and all comments, looking for `[HANDOFF]` tags that indicate the epic is ready for breakdown.

### Step 2: Review the epic

Check against the review checklist (see [references/review-checklist.md](references/review-checklist.md)). You are the quality gate — be rigorous.

**Challenge weak spots.** If you find issues, don't just note them — push back with specific questions:
- Vague AC: "AC #3 says 'system should be fast' — what's the target latency? Under what load?"
- Missing scope: "Error handling isn't mentioned. Are we building retry logic, or failing fast with alerts?"
- Too broad: "This epic covers data extraction AND reconciliation AND reporting. Should extraction be its own epic?"
- No edge cases: "What happens when the barcode doesn't match any AS400 record?"

Present all findings to the user. For each issue, offer options:
1. User answers inline and you proceed
2. Post a `[REVIEW] Needs clarification` comment on the epic and pause

**Rule of thumb:** If there are 1-2 minor issues, resolve inline. If there are 3+ issues or the epic owner is someone other than the current user, post the comment and pause to let the owner address them.

### Step 3: Break into stories (vertical slices)

**Critical:** Each story must be a thin end-to-end slice through all relevant layers — not a horizontal layer. Don't create "build the database tables" and "build the API" as separate stories. Each story should deliver a working, demoable capability.

**Good vertical slice:** "User uploads a PDF and sees extracted header fields" (touches storage, extraction, and UI)
**Bad horizontal slice:** "Create Snowflake tables for invoice data" (just one layer, not demoable alone)

For each story, draft all fields using the story template (see [templates/story-template.md](templates/story-template.md)):

1. **Title** — User-story format or clear action statement
2. **Description** — End-to-end behavior as a vertical slice
3. **Acceptance Criteria** — 2-4 criteria in Given/When/Then format. Must be specific enough to test.
4. **Test Plan** — See [templates/test-plan-template.md](templates/test-plan-template.md). Cover positive, negative, and edge cases. Specify what type of testing (unit, integration, manual) and what tools/data are needed.
5. **Story Points** — Fibonacci scale (1, 2, 3, 5, 8, 13). If a story is >8 points, it should probably be split.
6. **Tech Stack** — Languages, frameworks, databases, services involved
7. **Dependencies** — Other stories this is blocked by

### Step 4: Check Definition of Ready

Before presenting to the user, verify each story against DoR:

- [ ] Title is clear and specific
- [ ] Description explains end-to-end behavior (not just one layer)
- [ ] Has 2-4 acceptance criteria in Given/When/Then
- [ ] AC covers happy path AND at least one error/edge case
- [ ] Test plan specifies what to test, how, and with what tools
- [ ] Story points assigned (1-8 range; >8 means split)
- [ ] Tech stack listed
- [ ] Dependencies identified (or explicitly "none")
- [ ] Story is independently demoable

### Step 5: Review with user

Present the full breakdown in a clear format:

```
Epic: PE-42 — Build automated invoice reconciliation
Total: 4 stories, 21 points

1. PE-?? "Upload invoice PDF and extract header fields" — 5 pts
   AC: 3 criteria | Tests: unit + integration | Deps: none

2. PE-?? "Match extracted invoices to AS400 records" — 5 pts
   AC: 3 criteria | Tests: unit + integration | Deps: Story 1

3. PE-?? "Flag mismatches with exception codes" — 3 pts
   AC: 4 criteria | Tests: unit + negative | Deps: Story 2

4. PE-?? "Build exception review queue" — 8 pts
   AC: 3 criteria | Tests: integration + manual | Deps: Story 3
   ⚠️ Consider splitting — at 8 pts this is borderline
```

Show full details for each story when the user wants to drill in.

Ask:
- "Does this breakdown cover all the epic's requirements?"
- "Are any stories missing?"
- "Should any be split further or combined?"
- "Does the dependency order make sense?"

Iterate until the user approves.

### Step 6: Create stories in Jira

Create stories in dependency order using the Atlassian MCP (pass `cloudId` from config in every API call). Format descriptions as plain text with markdown-style headings — the Atlassian MCP handles conversion.

1. **Create each story** with `createJiraIssue`:
   - `cloudId`: from config
   - Issue type: `Story`
   - Parent: the epic key
   - Summary: story title
   - Description: full story body (description, AC, test plan, tech stack, dependencies)
   - Story points: if the field is available

2. **Link dependencies** — If the Jira instance supports issue linking, create "is blocked by" links between dependent stories so the dependency order is visible in Jira's board and planning tools (not just in comment text).

3. **Post a summary comment on the epic** with `addCommentToJiraIssue`:
   ```
   [HANDOFF] Stories ready for engineering.

   Created <N> stories, <total> points:
   - <story-key> "<title>" (<pts> pts)
   - <story-key> "<title>" (<pts> pts)
   ...

   Dependency order: <story-1> → <story-2> → <story-3>
   ```

4. **Post on each story** individually:
   ```
   [STATUS] Ready for pickup.
   ```

5. Share all story URLs with the user.

**If a Jira API call fails:** Show the error to the user. If story creation partially succeeds (some created, some failed), report which succeeded and which failed so the user can decide how to proceed. Suggest running `/setup` to re-verify connectivity if the error is auth-related.

### Step 7: Suggest next steps

"Stories created and linked to the epic. Engineers can start picking them up in dependency order."

"Run `/grill <story-key>` on any story to stress-test it before an engineer starts work."
