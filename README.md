# Alu Skill Templates

Reusable Claude Code skill templates for Product Management and Scrum Master workflows with Jira integration.

## Overview

These templates allow you to install PM/SM skills into any project with project-specific Jira configuration. Rather than hardcoding Jira Cloud IDs and project keys, the templates use placeholders that get replaced during installation.

## Available Skills

| Skill | Description |
|-------|-------------|
| **Product Manager** | PRD creation, status reporting, epic definition, stakeholder communication |
| **Scrum Master** | Story breakdown, test case definition, repo traceability, Jira management |

## Quick Start

### Option 1: Manual Installation

1. Copy the template folders from `templates/` to your project's `.claude/skills/`
2. Rename `.template.md` files to `.md`
3. Find and replace placeholders:
   - `{{CLOUD_ID}}` → Your Atlassian Cloud ID
   - `{{PROJECT_KEY}}` → Your Jira project key (e.g., `PE`)
   - `{{EPIC_KEY}}` → Your default epic key (e.g., `PE-38`)

### Option 2: Assisted Installation

Use the installer skill:

1. Open Claude Code in this repo
2. Say: "Install PM/SM skills in `C:\path\to\my\project`"
3. Provide your Jira configuration when prompted
4. Restart Claude Code in your project

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

## Directory Structure

```
alu-skill-templates/
├── README.md
├── skill-installer/
│   └── SKILL.md              # Meta-skill for assisted installation
└── templates/
    ├── scrum-master/
    │   ├── SKILL.template.md
    │   └── references/
    │       └── jira-patterns.template.md
    └── product-manager/
        ├── SKILL.template.md
        └── references/
            ├── prd-template.md
            ├── status-report-template.md
            └── jira-patterns.template.md
```

## After Installation

### Update .gitignore

Add this to your project's `.gitignore` to include skills in version control:

```gitignore
.claude/*
!.claude/skills/
.claude/settings.local.json
```

### Test the Skills

Restart Claude Code and try:
- `/product-manager` - Activate PM persona
- `/scrum-master` - Activate SM persona

### Customize

After installation, feel free to modify:
- Default epic keys for different phases
- Comment tag conventions
- Report formats and templates

## Placeholders Reference

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{{CLOUD_ID}}` | Atlassian Cloud ID (UUID) | `550c6b47-250d-452d-afe8-8e200810656f` |
| `{{PROJECT_KEY}}` | Jira project key | `PE`, `DEV`, `PROJ` |
| `{{EPIC_KEY}}` | Default epic issue key | `PE-38`, `DEV-100` |

## Skill Capabilities

### Product Manager Skill

- **PRD Creation**: Discovery-driven requirements through JTBD framework
- **Status Reporting**: Executive-level updates posted to Jira
- **Epic Definition**: Problem statements, scope boundaries, acceptance criteria
- **Repo Alignment**: Map codebase to Jira stories

### Scrum Master Skill

- **Epic Review**: Challenge PM requirements before breakdown
- **Story Breakdown**: Create testable, deployable stories
- **Test Case Definition**: Given/When/Then acceptance criteria
- **Repo Traceability**: Map code changes to stories
- **Status Management**: Keep Jira accurate and actionable

## Coordination Protocol

The skills use comment tags for clear handoffs:

| Tag | Owner | Purpose |
|-----|-------|---------|
| `[PM HANDOFF]` | PM | Epic ready for story breakdown |
| `[PM RESPONSE]` | PM | Answers to SM challenges |
| `[SM REVIEW]` | SM | Initial review findings |
| `[SM CHALLENGE]` | SM | Questions/concerns for PM |
| `[SM READY]` | SM | Story is dev-ready |

## Contributing

To add new skills or improve existing ones:

1. Create/modify templates in `templates/`
2. Use `{{PLACEHOLDER}}` syntax for project-specific values
3. Document placeholders in this README
4. Test with the installer skill

## License

Internal use - Alu Consulting
