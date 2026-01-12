---
name: skill-installer
description: Install PM/SM skill templates into a project with project-specific Jira configuration. Use when setting up a new project with Claude Code skills or configuring skills for a team member.
---

# Skill Installer

This meta-skill helps you install Product Manager and Scrum Master skills into any project with the correct Jira configuration.

## How It Works

1. You provide the Jira configuration values
2. This skill reads template files and replaces placeholders
3. Configured skills are written to your project's `.claude/skills/` folder

## Required Information

Before installation, gather these values from your Jira instance:

| Value | Description | Example |
|-------|-------------|---------|
| `CLOUD_ID` | Atlassian Cloud ID (UUID format) | `550c6b47-250d-452d-afe8-8e200810656f` |
| `PROJECT_KEY` | Jira project key | `PE`, `DEV`, `PROJ` |
| `EPIC_KEY` | Default epic key | `PE-38`, `DEV-100` |

### Finding Your Cloud ID

Run this with the Atlassian MCP tool:
```javascript
Tool: getAccessibleAtlassianResources
// Returns list of accessible cloud instances with their IDs
```

---

## Installation Workflow

### Step 1: Collect Configuration

Ask the user for:
- Jira Cloud ID
- Project Key
- Default Epic Key
- Target project path (e.g., `C:\Users\user\project`)

### Step 2: Read Templates

Templates are located in the `templates/` folder relative to this skill:
```
../templates/scrum-master/SKILL.template.md
../templates/scrum-master/references/jira-patterns.template.md
../templates/product-manager/SKILL.template.md
../templates/product-manager/references/prd-template.md
../templates/product-manager/references/status-report-template.md
../templates/product-manager/references/jira-patterns.template.md
```

### Step 3: Replace Placeholders

Find and replace these placeholders in all `.template.md` files:

| Placeholder | Replace With |
|-------------|--------------|
| `{{CLOUD_ID}}` | User's Atlassian Cloud ID |
| `{{PROJECT_KEY}}` | User's Jira Project Key |
| `{{EPIC_KEY}}` | User's Default Epic Key |

### Step 4: Write to Project

Create the skill files in the target project:
```
{project}/.claude/skills/
├── scrum-master/
│   ├── SKILL.md
│   └── references/
│       └── jira-patterns.md
└── product-manager/
    ├── SKILL.md
    └── references/
        ├── prd-template.md
        ├── status-report-template.md
        └── jira-patterns.md
```

Note: Template files (`.template.md`) become regular markdown (`.md`) after placeholder replacement.

### Step 5: Update .gitignore

Ensure the project's `.gitignore` includes:
```gitignore
# AI IDE specific
.claude/*
!.claude/skills/
.claude/settings.local.json
```

This keeps skills in version control while excluding user-specific settings.

### Step 6: Verify Installation

After writing files:
1. Confirm files exist in `.claude/skills/`
2. Check placeholder replacement worked (no `{{` remaining)
3. Advise user to restart Claude Code to pick up new skills
4. Test with `/product-manager` or `/scrum-master` commands

---

## Example Conversation

```
User: Install PM/SM skills in my project