---
name: skill-installer
description: Install skill templates into a project with project-specific configuration. Reads from manifest.json for skill discovery and handles both project-scope and user-scope installations.
version: 1.1.0
author: Dan Alu
last-updated: 2026-01-15
scope: user
category: meta
---

# Skill Installer

This meta-skill helps you install skills from the alu-automation-templates repository into any project with the correct configuration.

## How It Works

1. Read `manifest.json` to discover available skills
2. Prompt for required placeholder values
3. Read template files and replace placeholders
4. Write configured skills to appropriate location (project or user scope)

## Quick Start

```
"Install scrum-master and product-manager skills in my project"
"Install session-log skill for personal use"
"Show available skills"
```

---

## Available Skills

| Skill | Category | Scope | Description |
|-------|----------|-------|-------------|
| **scrum-master** | Project Management | Project | Story breakdown, Jira management |
| **product-manager** | Project Management | Project | PRD creation, status reporting |
| **session-log** | Project Management | User | Session documentation for stand-ups |

### Scope Explanation

- **Project Scope**: Installed to `.claude/skills/` in the target project (shared with team via git)
- **User Scope**: Installed to `~/.claude/skills/` (personal, not project-specific)

---

## Required Information

### For Jira-Integrated Skills (scrum-master, product-manager)

| Value | Description | Example |
|-------|-------------|---------|
| `CLOUD_ID` | Atlassian Cloud ID (UUID format) | `550c6b47-250d-452d-afe8-8e200810656f` |
| `PROJECT_KEY` | Jira project key | `PE`, `DEV`, `PROJ` |
| `EPIC_KEY` | Default epic key | `PE-38`, `DEV-100` |

### For Session Log Skill

| Value | Description | Example |
|-------|-------------|---------|
| `PROJECT_NAME` | Project name for headers | `Invoice Automation` |
| `LOGS_PATH` | Where to store logs | `docs/logs/` |
| `EPIC_KEY` | Optional epic for Jira context | `PE-38` |

### Finding Your Cloud ID

Run this with the Atlassian MCP tool:
```javascript
Tool: getAccessibleAtlassianResources
// Returns list of accessible cloud instances with their IDs
```

---

## Installation Workflow

### Step 1: Read Manifest

Read `manifest.json` from the repo root to get:
- Available skills and their metadata
- Required placeholders for each skill
- File paths and references

```javascript
// Parse manifest.json
const manifest = JSON.parse(readFile('manifest.json'));
const skills = manifest.skills;
```

### Step 2: Select Skills

Ask user which skills to install. Show:
- Skill name and description
- Scope (project vs user)
- Required configuration values

### Step 3: Collect Configuration

For each selected skill, collect required placeholders:

```javascript
// Example for scrum-master
const config = {
  CLOUD_ID: "user-provided-uuid",
  PROJECT_KEY: "PE",
  EPIC_KEY: "PE-38"
};
```

### Step 4: Determine Target Paths

Based on skill scope from manifest:

```javascript
// Project scope → .claude/skills/
// User scope → ~/.claude/skills/

const targetBase = skill.scope === 'project'
  ? `${projectPath}/.claude/skills/`
  : `~/.claude/skills/`;
```

### Step 5: Process Templates

For each skill:

1. Read all `.template.md` files from skill path
2. Replace placeholders: `{{KEY}}` → configured value
3. Rename files: `.template.md` → `.md`
4. Write to target location

```javascript
// Template processing
let content = readFile(templatePath);
for (const [key, value] of Object.entries(config)) {
  content = content.replaceAll(`{{${key}}}`, value);
}
writeFile(targetPath.replace('.template.md', '.md'), content);
```

### Step 6: Copy Reference Files

Copy non-template reference files (like `prd-template.md`) without modification.

### Step 7: Update .gitignore (Project Scope Only)

For project-scope skills, ensure `.gitignore` includes:

```gitignore
# Claude Code
.claude/*
!.claude/skills/
.claude/settings.local.json
```

### Step 8: Verify Installation

After writing files:
1. Confirm files exist in target location
2. Check no `{{` placeholders remain (incomplete replacement)
3. Advise user to restart Claude Code
4. Test with skill command (e.g., `/scrum-master`)

---

## Example Installation Session

```
User: Install PM and SM skills in C:\Users\me\projects\myapp