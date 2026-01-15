# Alu Automation Templates

Reusable Claude Code skill templates for Product Management, Scrum Master, and developer productivity workflows with Jira integration.

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## Overview

These templates allow you to install PM/SM/productivity skills into any project with project-specific configuration. Rather than hardcoding Jira Cloud IDs and project keys, the templates use placeholders that get replaced during installation.

## Available Skills

| Skill | Category | Scope | Description |
|-------|----------|-------|-------------|
| **scrum-master** | Project Management | Project | Story breakdown, test case definition, repo traceability, Jira management |
| **product-manager** | Project Management | Project | PRD creation, status reporting, epic definition, stakeholder communication |
| **session-log** | Project Management | User | Session documentation for stand-ups, git activity capture, Jira context |

### Scope Types

- **Project Scope**: Installed to `.claude/skills/` in your project (shared with team via git)
- **User Scope**: Installed to `~/.claude/skills/` (personal, follows you across projects)

## Quick Start

### Option 1: Manual Installation

1. Copy the desired skill folder from `templates/project-management/` to your target:
   - **Project scope**: `{your-project}/.claude/skills/`
   - **User scope**: `~/.claude/skills/`

2. Rename `.template.md` files to `.md`

3. Find and replace placeholders:
   - `{{CLOUD_ID}}` → Your Atlassian Cloud ID
   - `{{PROJECT_KEY}}` → Your Jira project key (e.g., `PE`)
   - `{{EPIC_KEY}}` → Your default epic key (e.g., `PE-38`)

### Option 2: Assisted Installation

1. Open Claude Code in this repo
2. Say: `"Install scrum-master and product-manager skills in C:\path\to\my\project"`
3. Provide your Jira configuration when prompted
4. Restart Claude Code in your project

## Directory Structure

```
alu-automation-templates/
├── README.md
├── CHANGELOG.md
├── manifest.json                    # Machine-readable skill registry
├── skill-installer/
│   └── SKILL.md                     # Meta-skill for assisted installation
└── templates/
    └── project-management/
        ├── scrum-master/
        │   ├── SKILL.template.md
        │   └── references/
        │       └── jira-patterns.template.md
        ├── product-manager/
        │   ├── SKILL.template.md
        │   └── references/
        │       ├── prd-template.md
        │       ├── status-report-template.md
        │       └── jira-patterns.template.md
        └── session-log/
            ├── SKILL.template.md
            └── templates/
                └── session-log-template.md
```

## Finding Your Jira Configuration

### Cloud ID

Use the Atlassian MCP tool:
```javascript
Tool: getAccessibleAtlassianResources
```

Or extract from any Jira URL: `https://yoursite.atlassian.net/...`

### Project Key

The short prefix for your Jira issues (e.g., `PE` for issues like `PE-38`).

### Epic Key

The default epic for your project. This can be changed per-project.

## Placeholders Reference

| Placeholder | Description | Used By | Example |
|-------------|-------------|---------|---------|
| `{{CLOUD_ID}}` | Atlassian Cloud ID (UUID) | SM, PM | `550c6b47-250d-452d-afe8-8e200810656f` |
| `{{PROJECT_KEY}}` | Jira project key | SM, PM, SL | `PE`, `DEV` |
| `{{EPIC_KEY}}` | Default epic issue key | SM, PM, SL | `PE-38` |
| `{{PROJECT_NAME}}` | Project name for headers | SL | `Invoice Automation` |
| `{{LOGS_PATH}}` | Path for session logs | SL | `docs/logs/` |

*SM = Scrum Master, PM = Product Manager, SL = Session Log*

## After Installation

### Update .gitignore (Project Scope Only)

Add this to your project's `.gitignore` to include skills in version control:

```gitignore
# Claude Code
.claude/*
!.claude/skills/
.claude/settings.local.json
```

### Test the Skills

Restart Claude Code and try:
- `/scrum-master` — Activate SM persona
- `/product-manager` — Activate PM persona
- `/session-log` — Generate session documentation

## Skill Capabilities

### Scrum Master Skill

- **Epic Review & Challenge**: Push back on unclear requirements
- **Story Breakdown**: Create testable, deployable stories
- **Test Case Definition**: Given/When/Then acceptance criteria
- **Repo Traceability**: Map code changes to stories
- **Status Management**: Keep Jira accurate and actionable

### Product Manager Skill

- **PRD Creation**: Discovery-driven requirements through JTBD framework
- **Status Reporting**: Executive-level updates posted to Jira
- **Epic Definition**: Problem statements, scope boundaries, acceptance criteria
- **Repo Alignment**: Map codebase to Jira stories

### Session Log Skill

- **Git Activity Capture**: Commits, PRs, file changes
- **Accomplishment Tracking**: What was done and why
- **Jira Context**: Ready-to-paste updates for stand-ups
- **Cross-Skill Integration**: Feeds context to SM and PM skills

## Coordination Protocol

The skills use comment tags for clear handoffs:

| Tag | Owner | Purpose |
|-----|-------|---------|
| `[PM HANDOFF]` | PM | Epic ready for story breakdown |
| `[PM RESPONSE]` | PM | Answers to SM challenges |
| `[SM REVIEW]` | SM | Initial review findings |
| `[SM CHALLENGE]` | SM | Questions/concerns for PM |
| `[SM READY]` | SM | Story is dev-ready |
| `[SM UPDATE]` | SM | Progress update |

## Version History

See [CHANGELOG.md](CHANGELOG.md) for detailed release notes.

| Version | Date | Highlights |
|---------|------|------------|
| 1.0.0 | 2026-01-15 | Category structure, manifest.json, session-log skill, version tracking |
| 0.1.0 | 2026-01-09 | Initial release with SM and PM skills |

## Contributing

To add new skills or improve existing ones:

1. Create/modify templates in `templates/{category}/{skill}/`
2. Use `{{PLACEHOLDER}}` syntax for project-specific values
3. Add skill entry to `manifest.json`
4. Update frontmatter with version info
5. Document placeholders in this README
6. Update CHANGELOG.md
7. Test with the installer skill

## Releases

This repo uses GitHub Releases for distribution. Subscribe to releases to get notified of updates:

```bash
# Watch for new releases
gh repo set-default DTdalu/alu-automation-templates
gh release list
```

## License

MIT License - See [LICENSE](LICENSE) for details.

---

*Built with Claude Code by Dan Alu*
