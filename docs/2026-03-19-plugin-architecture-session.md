# Session: Plugin Architecture & Phase 1 Build
**Date:** 2026-03-19
**Model:** Claude Opus 4.6 (1M context)

## Context

Dan had a fragmented collection of skill templates, planning docs, activity logs, and rules spread across this repo. The goal was to transform it into a proper Claude Code plugin that could be distributed to 10-20+ engineering teams (300 engineers) to solve inconsistent Jira artifacts and drive AI adoption.

## Discovery Phase

### Agents deployed
- **Repo Explorer** — Read all 50+ files across templates/, docs/, rules/, skill-installer/
- **Pattern Analyzer** — Classified each file as skill, rule, agent, or miscategorized
- **Plugin Distribution Research** — Explored Claude Code's plugin system (marketplace repos, plugin.json schema, installation tracking) by examining installed plugins on the machine
- **Matt Pocock Skills Analysis** — Fetched and analyzed all 14 skills from github.com/mattpocock/skills for design patterns

### Interview (5 themes, 15 questions)

**Theme 1 — How the org works:**
- PM synthesizes stakeholder requirements → fleshes out Jira epic (the epic IS the PRD)
- Handoff to SM/Dev Lead → story breakdown → engineers pick up
- 10-20+ teams, different tech stacks, same SDLC
- Jira Cloud, GitHub, NO Confluence yet
- Mix of Cursor and Claude Code users

**Theme 2 — What's broken:**
- No skills distributed org-wide → inconsistent Jira artifacts
- Engineers try AI → bad output → abandon it → no adoption flywheel
- Biggest bottleneck: story quality/readiness (AC, test plans, templates)
- No uniform structure → no one demos → no knowledge sharing

**Theme 3 — Distribution:**
- Engineers familiar with npm/GitHub workflows
- Dan is primary author but wants to mentor team leads to author/review
- Atlassian MCP available, can host custom MCP servers
- Microsoft house (Teams, Outlook, SharePoint) + Slack

**Theme 4 — Priority:**
- #1: PM → SM pipeline (problem statement → engineer-ready stories)
- #2: Engineer-specific skills (testing, reviews, agent teams)
- Atlassian 5 reference skills: not needed
- Activity logs / command center: replaced by agent teams

**Theme 5 — Technical constraints:**
- Mix of monorepos and separate service repos
- Primary stack: Snowflake, Azure, Python, Angular, .NET, TypeScript
- Security/compliance: publicly traded clients, DLP, but not blockers

## Key Decisions

### What to drop
| Item | Reason |
|------|--------|
| Command Center skill | Replaced by native Claude Code agent teams |
| Activity logs (4 files) | Replaced by agent teams' task tracking |
| All planning docs (954-line plan) | Archived as reference |
| 5 Atlassian reference skills | Not needed by the org |
| Confluence-dependent skills (5) | No Confluence yet |
| Template/placeholder system | Replaced by runtime config via /setup |
| Skill installer | Replaced by plugin installation |

### Architecture choice: Claude Code Plugin
- **Not** a template repo with an installer
- **Not** a collection of loose markdown files
- A proper plugin with `.claude-plugin/plugin.json`
- Distributed via GitHub (personal repo, installable by any engineer)
- Per-project config via `.claude/sdlc-toolkit.local.md` (created by `/setup`)

### Skill design principles (synthesized from Pocock + Anthropic + interview)
1. SKILL.md is workflow steps (30-100 lines). References hold the knowledge.
2. Description is everything — determines when the skill triggers.
3. Interview before generating (teaches engineers what good looks like).
4. Present before creating (human-in-the-loop on Jira writes).
5. Vertical slices over horizontal layers (each story is end-to-end demoable).
6. Config at runtime, not in templates (no more `{{PLACEHOLDER}}`).

### Comment tag redesign
- Changed from role-specific (`[PM HANDOFF]`, `[SM READY]`) to task-specific (`[HANDOFF]`, `[REVIEW]`, `[STATUS]`, `[BLOCKED]`)
- More intuitive for org where "scrum master" isn't a universal title

## Build Phase

### Files created (14 files)
```
.claude-plugin/plugin.json
skills/setup/SKILL.md
skills/product-manager/SKILL.md
skills/product-manager/templates/epic-template.md
skills/scrum-master/SKILL.md
skills/scrum-master/templates/story-template.md
skills/scrum-master/templates/test-plan-template.md
skills/scrum-master/references/review-checklist.md
skills/grill/SKILL.md
agents/jira-worker.md
references/jira-conventions.md
README.md (rewritten)
CHANGELOG.md
.gitignore (updated)
```

### Review phase (4 parallel agents)
- **Plugin Validator** — PASS (minor: added model/color to agent frontmatter)
- **PM Skill Reviewer** — PASS (fixed: description voice, error handling, codebase exploration heuristic, Jira formatting note)
- **SM Skill Reviewer** — Needs Improvement → fixed (critical: added cloudId to all API calls, added issue linking, error handling, description, de-duplicated test plan)
- **Grill + Setup Reviewer** — Grill: PASS, Setup: Needs Improvement → fixed (critical: added MCP availability check, Cloud ID validation, error-to-solution failure handling)

### All fixes applied
- 1 critical fix (cloudId in all API calls)
- 1 critical fix (MCP availability check in setup)
- 5 major fixes (error handling, issue linking, description formatting, Cloud ID validation, failure diagnostics)
- 8 minor fixes (description voice, trigger phrases, pacing, thresholds, heuristics)

## Roadmap

### Phase 1 (complete) — v1.0.0
- /setup, /product-manager, /scrum-master, /grill
- jira-worker agent, jira-conventions reference

### Phase 2 (planned)
- /engineer (story implementation workflow)
- /engineering-lead (code review, architecture decisions)

### Phase 3 (planned)
- /triage (bug triage + ticket creation)
- /status-report (sprint status from Jira data)

### Phase 4 (planned)
- Team-specific skill extension guide
- "How to write a skill" documentation for team leads

## References
- Matt Pocock's skills: github.com/mattpocock/skills (grill-me, write-a-prd, prd-to-plan, prd-to-issues)
- Anthropic skill-creator skill (available in Claude Code plugin marketplace)
