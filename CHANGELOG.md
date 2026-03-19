# Changelog

All notable changes to the SDLC Toolkit plugin will be documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/). Versioning follows [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-03-19

### Added

- **Plugin structure** — Proper Claude Code plugin with `.claude-plugin/plugin.json` manifest
- **`/setup` skill** — First-run project configuration wizard (Jira Cloud ID, project key, MCP verification)
- **`/product-manager` skill** — Stakeholder interview → well-formed Jira epic with structured problem statement, testable requirements, acceptance criteria, and clear scope
  - Includes `epic-template.md` reference for consistent epic structure
- **`/scrum-master` skill** — Epic review → vertical-slice story breakdown with AC, test plans, and Definition of Ready verification
  - Includes `story-template.md` for consistent story structure
  - Includes `test-plan-template.md` for comprehensive test planning
  - Includes `review-checklist.md` for epic quality gate
- **`/grill` skill** — Stress-test any plan, epic, or story through relentless devil's advocate questioning
- **`jira-worker` agent** — Bulk Jira operations (batch story creation, comment posting, queries)
- **`jira-conventions.md` reference** — Shared comment tag vocabulary (`[HANDOFF]`, `[REVIEW]`, `[STATUS]`, `[BLOCKED]`), status flow, and Definition of Done

### Changed

- Restructured repository from template-based installer to proper Claude Code plugin
- Replaced placeholder system (`{{CLOUD_ID}}`) with runtime configuration via `/setup`
- Replaced role-specific comment tags (`[PM HANDOFF]`, `[SM READY]`) with task-specific tags (`[HANDOFF]`, `[REVIEW]`, `[STATUS]`, `[BLOCKED]`)

### Archived

- Original template files, planning documents, activity logs, and skill installer moved to `archive/`
- Command Center skill (replaced by native Claude Code agent teams)
- Activity log architecture (replaced by native task tracking)
- Confluence-dependent skills (deferred until Confluence is available)
