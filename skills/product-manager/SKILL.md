---
name: product-manager
description: Guides the creation of a well-formed Jira epic through stakeholder interview, problem definition, and requirements gathering. Produces epics with structured problem statements, testable requirements, acceptance criteria, and clear scope. Use when starting a new feature, defining a problem, creating an epic, writing requirements, scoping a project, preparing work for story breakdown, or when the user says "I have a feature idea," "let's define this," "create an epic," or "write up requirements."
---

# Product Manager

Create a Jira epic that fully defines a problem and its requirements, ready for story breakdown.

## Before you start

Read project config from `.claude/sdlc-toolkit.local.md` for Jira Cloud ID and project key. If the file is missing or invalid, tell the user to run `/setup` first.

## Workflow

### Step 1: Understand the problem

Interview the user. Don't accept vague descriptions. Adapt these questions based on answers — skip what's already clear, dig deeper where it's thin:

- **What problem are we solving?** Get the specific pain point, not a solution disguised as a problem.
- **Who experiences this problem?** Stakeholders, end users, internal teams — and how frequently?
- **What does the current state look like?** Existing systems, manual workarounds, costs, pain. Is this a net-new build, an enhancement, a migration, or a fix?
- **What does success look like?** Concrete outcomes, not aspirations. "Reduce processing time from 4 hours to 15 minutes" not "make it faster."
- **What's the scope?** What's in? What's explicitly out? Is this a standalone effort or part of something bigger?
- **What systems and tools are involved?** Databases, APIs, UIs, third-party services, legacy systems.
- **Who owns UAT?** Name and role of the person who signs off that it works.
- **Are there constraints?** Timeline, budget, compliance, dependencies on other teams or projects.
- **Is there prior art?** Has this been attempted before? What happened? Any existing documentation?

If the user gives thin answers, push back:
- "You said 'make it faster' — faster than what? What's the current latency? What's acceptable?"
- "You mentioned the accounting team uses this — have you talked to them about what they actually need?"
- "This scope feels broad. Could this be two separate epics?"

If questions can be answered by exploring the codebase, explore instead of asking.

### Step 2: Explore the codebase (when relevant)

If the user mentions existing features, references current system behavior, or describes enhancements to something already built — explore the codebase:
- Search for relevant files and understand the current implementation
- Identify what already exists vs. what needs to be built
- Note technical constraints, patterns, or conventions the team follows
- Surface anything that contradicts or complicates the user's assumptions

Share findings with the user before proceeding. Skip this step for greenfield projects with no existing codebase.

### Step 3: Draft the epic

Using the epic template (see [templates/epic-template.md](templates/epic-template.md)), draft:

- **Title**: Clear, action-oriented (e.g., "Build automated invoice reconciliation against AS400")
- **Problem Statement**: 2-3 sentences — what's broken/missing and why it matters
- **Requirements**: Numbered list of specific, testable requirements
- **Acceptance Criteria**: Given/When/Then format, minimum 3
- **Scope**: Explicit in-scope and out-of-scope sections
- **Systems & Components**: What's involved technically
- **Stakeholders**: Problem owner, UAT owner, technical lead
- **Dependencies**: Other work, systems, or decisions this depends on

### Step 4: Review with user

Present the full draft in a readable format. Ask:
- "Does this accurately capture the problem?"
- "Anything missing from scope?"
- "Are the acceptance criteria specific enough to test against?"

Iterate until the user explicitly approves.

### Step 5: Create in Jira

Using the Atlassian MCP tools (pass `cloudId` from the config file in every API call):

1. **Create the epic** with `createJiraIssue`:
   - `cloudId`: from config
   - Issue type: `Epic`
   - Project: from config (`projectKey`)
   - Summary: the title
   - Description: the full epic body formatted as plain text with markdown-style headings (the Atlassian MCP handles conversion to Jira's format)

2. **Post a handoff comment** with `addCommentToJiraIssue`:
   ```
   [HANDOFF] Epic defined and ready for story breakdown.

   Summary:
   - <requirement count> requirements defined
   - <AC count> acceptance criteria
   - Scope: <brief scope summary>

   Next step: Story breakdown and technical review.
   ```

3. Share the epic URL with the user.

**If a Jira API call fails:** Show the error to the user. Common causes: expired MCP auth, wrong project key, missing required fields. Suggest running `/setup` to re-verify connectivity.

### Step 6: Suggest next steps

"Epic created. When you're ready to break it into stories, run `/scrum-master` — it will find this epic's handoff tag and start the review."

If the user wants to stress-test the epic first: "You can also run `/grill <epic-key>` to challenge the requirements before handing off."
