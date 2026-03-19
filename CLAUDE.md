# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project Overview

This is the **SDLC Toolkit** — a Claude Code plugin that provides structured SDLC workflows with Jira integration. It guides the full pipeline from stakeholder problem definition to engineer-ready stories with consistent templates, quality gates, and handoff protocols.

**Purpose:** Distribute curated AI-assisted workflows to engineering teams so that Jira artifacts (epics, stories, test plans) are consistent, high-quality, and follow the org's scrum methodology — regardless of which engineer creates them.

## Architecture

This repo IS the plugin. It's installed directly via Claude Code's plugin system by pointing at this GitHub repo.

```
.claude-plugin/plugin.json     ← Plugin manifest
skills/                        ← User-invoked guided workflows
  setup/                       ← First-run Jira configuration
  product-manager/             ← Stakeholder interview → Jira epic
  scrum-master/                ← Epic review → vertical-slice stories
  grill/                       ← Stress-test any plan/epic/story
agents/                        ← Autonomous workers spawned by skills
  jira-worker.md               ← Bulk Jira operations
references/                    ← Shared reference docs
  jira-conventions.md          ← Comment tags, status flow, DoD
archive/                       ← Previous iterations (preserved, not active)
```

## Key Concepts

### Skills vs Agents vs Rules

- **Skills** (`skills/*/SKILL.md`) — User-invoked guided workflows. Triggered by `/skill-name` or natural language matching. Each skill interviews the user, follows a structured process, and produces Jira artifacts.
- **Agents** (`agents/*.md`) — Autonomous workers spawned by skills for bulk operations. The jira-worker handles batch story creation, comment posting, etc.
- **Rules** — Always-on context for a specific project. NOT part of this plugin. Teams add rules to their own project's `.claude/rules/` directory for tech-stack-specific conventions (Snowflake patterns, .NET standards, Angular guidelines, etc.).
- **References** — Shared knowledge docs (templates, checklists, conventions) that skills link to for consistent output.

### The Pipeline

```
/product-manager → /grill (optional) → /scrum-master → /grill (optional) → Engineer picks up stories
```

1. PM skill interviews stakeholder, creates well-formed Jira epic
2. Grill skill challenges the epic (devil's advocate)
3. SM skill reviews epic, breaks into vertical-slice stories with AC and test plans
4. Grill skill challenges individual stories
5. Engineers pick up stories from Jira

### Comment Tags

Skills use structured comment tags in Jira for workflow state:
- `[HANDOFF] ...` — Work passed to next stage
- `[REVIEW] ...` — Feedback on work
- `[STATUS] ...` — Progress updates
- `[BLOCKED] ...` — Work cannot proceed

### Per-Project Config

Skills read project-specific Jira config from `.claude/sdlc-toolkit.local.md` (created by `/setup`). This file contains the Jira Cloud ID, project key, and team name. It should be gitignored.

## Development Guidelines

### When modifying skills

- Keep SKILL.md focused on workflow steps (30-100 lines). Put detailed templates and checklists in `templates/` or `references/` subdirectories.
- Description is the most important field — it's the ONLY thing Claude sees when deciding whether to load a skill. First sentence: what it does. Second sentence: trigger phrases.
- Always include `cloudId` from config in Jira MCP API call examples.
- Always present artifacts to the user for review before creating them in Jira (human-in-the-loop).
- Include error handling guidance for Jira API failures.

### When adding new skills

- Create `skills/<name>/SKILL.md` with YAML frontmatter (`name`, `description`)
- Skill name must match directory name
- Add the skill to the README's skill table and roadmap
- Update CHANGELOG.md

### Version control

- Use semantic versioning (git tags: v1.0.0, v1.1.0, etc.)
- Document changes in CHANGELOG.md
- Plugin consumers get updates when they refresh/reinstall

## Dependencies

- **Atlassian MCP** — Required. Provides Jira API access (createJiraIssue, searchJiraIssuesUsingJql, getJiraIssue, addCommentToJiraIssue, editJiraIssue)
- **Claude Code** — Required. Enterprise license recommended for org distribution.
