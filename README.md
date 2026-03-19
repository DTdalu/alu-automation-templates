# SDLC Toolkit

A Claude Code plugin that brings structured SDLC workflows to your engineering team. Guides the full pipeline from stakeholder problem to engineer-ready Jira stories with consistent templates, quality gates, and handoff protocols.

## What's included

### Skills

| Skill | What it does |
|-------|-------------|
| `/setup` | Configure Jira connection for your project (Cloud ID, project key) |
| `/product-manager` | Interview stakeholders, define the problem, create a well-formed Jira epic |
| `/scrum-master` | Review epic quality, break it into pointed stories with AC and test plans |
| `/grill` | Stress-test any plan, epic, or story through relentless questioning |

### Agents

| Agent | What it does |
|-------|-------------|
| `jira-worker` | Bulk Jira operations (batch story creation, comment posting, queries) |

### References

| File | What it covers |
|------|---------------|
| `jira-conventions.md` | Comment tags, status flow, Definition of Done |

## Installation

### Prerequisites

1. **Claude Code** installed with an active license
2. **Atlassian MCP** configured in Claude Code (provides Jira API access)

### Install the plugin

In Claude Code, run `/plugin` and add this repository's GitHub URL.

### First-time setup (per project)

In any project where you want to use the toolkit:

```
/setup
```

This will ask for your Jira Cloud ID and project key, verify connectivity, and save configuration to `.claude/sdlc-toolkit.local.md`.

**Important:** Add `.claude/sdlc-toolkit.local.md` to your `.gitignore` — it contains project-specific configuration.

## Usage

### The pipeline: Problem → Engineer-ready stories

**Step 1: Define the problem**
```
/product-manager
```
Walk through a stakeholder interview. The skill asks pointed questions, challenges vague requirements, and produces a well-formed Jira epic with structured problem statement, testable requirements, and clear scope.

**Step 2: Challenge the epic (optional but recommended)**
```
/grill PE-42
```
Stress-test the epic. The skill probes every assumption, surfaces gaps in scope, edge cases in requirements, and missing error handling.

**Step 3: Break into stories**
```
/scrum-master
```
The skill finds the epic's handoff tag, reviews it against a quality checklist, pushes back on weak spots, and breaks it into pointed vertical-slice stories — each with acceptance criteria, test plans, and tech stack notes.

**Step 4: Challenge individual stories (optional)**
```
/grill PE-43
```
Stress-test any story before an engineer picks it up.

### Jira comment conventions

The toolkit uses structured comment tags for workflow state. See `references/jira-conventions.md` for the full list:

- `[HANDOFF] ...` — Work is being passed to the next stage
- `[REVIEW] ...` — Feedback on someone's work
- `[STATUS] ...` — Progress updates
- `[BLOCKED] ...` — Work cannot proceed

## Customization

### For your team

The skills are designed to work across different tech stacks and team structures. The only project-specific config is the Jira connection (managed by `/setup`).

If you need to customize a skill for your team:
1. Fork this repo
2. Edit the relevant `SKILL.md` file
3. Add team-specific templates or references
4. Install your fork as a plugin instead

### Adding tech-stack rules

For project-specific coding conventions (Snowflake patterns, .NET standards, Angular guidelines), add rules directly to your project's `.claude/rules/` directory — not to this plugin. The plugin handles workflow; your project handles technical standards.

## Roadmap

### Phase 1 (current) — v1.0.0
- [x] Setup wizard
- [x] Product Manager skill
- [x] Scrum Master skill
- [x] Grill skill
- [x] Jira worker agent
- [x] Jira conventions reference

### Phase 2 (planned)
- [ ] Engineer skill (story implementation workflow)
- [ ] Engineering Lead skill (code review, architecture decisions)

### Phase 3 (planned)
- [ ] Triage skill (bug triage and ticket creation)
- [ ] Status Report skill (sprint status from Jira data)

## Version history

See [CHANGELOG.md](CHANGELOG.md).

## Archive

The `archive/` directory contains earlier iterations of skills and planning documents that informed this plugin's design. They are preserved for reference but are not part of the active plugin.
