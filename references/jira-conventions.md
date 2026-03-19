# Jira Conventions

Shared conventions used across all SDLC toolkit skills. This file is a reference for both humans and skills.

## Comment Tags

Use these tags at the **start** of Jira comments to signal workflow state. Tags are task-specific (not role-specific) so any team member can use them regardless of their title.

### Handoff Tags

Signal that work is being passed to the next stage.

| Tag | When to use |
|-----|-------------|
| `[HANDOFF] Epic ready for story breakdown` | PM has finished defining the epic |
| `[HANDOFF] Stories ready for engineering` | SM has broken down the epic and stories are ready |
| `[HANDOFF] PR ready for review` | Engineer has submitted a pull request |
| `[HANDOFF] Ready for UAT` | Code is merged and deployed to staging |

### Review Tags

Provide feedback on someone's work.

| Tag | When to use |
|-----|-------------|
| `[REVIEW] Approved` | Reviewer approved the work |
| `[REVIEW] Changes needed — [details]` | Reviewer requires specific changes |
| `[REVIEW] Needs clarification — [details]` | Reviewer has questions before proceeding |
| `[REVIEW] Stress-test findings` | Grill skill has completed a challenge review |

### Status Tags

Provide progress updates.

| Tag | When to use |
|-----|-------------|
| `[STATUS] Ready for pickup` | Story is ready for an engineer to start |
| `[STATUS] In progress` | Work has started |
| `[STATUS] Complete` | Work is done and meets DoD |

### Blocked Tags

Signal that work cannot proceed.

| Tag | When to use |
|-----|-------------|
| `[BLOCKED] Waiting on [dependency]` | External dependency is blocking progress |
| `[BLOCKED] Needs decision — [question]` | A decision is needed before work can continue |

## Why Tags Matter

Tags serve two purposes:
1. **Human readability** — Anyone scanning Jira comments can quickly see the state of work
2. **Skill automation** — Skills search for these tags to find items that need attention (e.g., SM looks for `[HANDOFF] Epic ready for story breakdown` to find work waiting for it)

## Issue Hierarchy

```
Epic (the "PRD" — defines the problem and requirements)
├── Story (vertical slice — independently demoable work)
├── Story
├── Story
└── Bug (defect found during implementation or testing)
```

## Status Flow

```
To Do → In Progress → In Review → In Test → Done
```

- **To Do** — Ready for an engineer to pick up
- **In Progress** — Actively being worked on
- **In Review** — PR submitted, awaiting code review
- **In Test** — Code merged, being tested or in UAT
- **Done** — Meets acceptance criteria and Definition of Done

## Definition of Done (DoD)

A story is Done when:

- [ ] All acceptance criteria are met
- [ ] Code is reviewed and approved
- [ ] Tests pass (unit + integration as appropriate for the story)
- [ ] No known defects introduced
- [ ] Documentation updated (if applicable)
- [ ] PR merged to main branch
- [ ] `[STATUS] Complete` comment posted on the story
