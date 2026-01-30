# ALU Skill Installer MCP Server

MCP (Model Context Protocol) server that provides tools for installing Claude Code skills from the alu-automation-templates repository.

## Setup

### 1. Install Dependencies

```bash
cd mcp-server
npm install
```

### 2. Build

```bash
npm run build
```

### 3. Configure Claude Code

Add to your global settings (`~/.claude/settings.json`):

```json
{
  "mcpServers": {
    "alu-skills": {
      "command": "node",
      "args": ["C:/Users/Dalu/Developer/work/alu-automation-templates/mcp-server/dist/index.js"]
    }
  }
}
```

Or add to a specific project's `.mcp.json`:

```json
{
  "mcpServers": {
    "alu-skills": {
      "command": "node",
      "args": ["C:/Users/Dalu/Developer/work/alu-automation-templates/mcp-server/dist/index.js"]
    }
  }
}
```

## Available Tools

### `list_skills`

List all available skills with their descriptions and placeholder requirements.

**Parameters:**
- `category` (optional): Filter by category (e.g., "project-management")
- `scope` (optional): Filter by scope ("project" or "user")

**Example:**
```
List all available skills
```

### `get_skill_details`

Get detailed information about a specific skill.

**Parameters:**
- `skill_id` (required): The skill ID (e.g., "scrum-master")

**Example:**
```
Get details for the scrum-master skill
```

### `install_skill`

Install a skill to a project or user scope.

**Parameters:**
- `skill_id` (required): The skill ID to install
- `target_path` (optional): Target project path (defaults to cwd for project scope, ~ for user scope)
- `placeholders` (optional): Key-value pairs for placeholder replacement
- `dry_run` (optional): Preview changes without installing

**Example:**
```
Install the scrum-master skill with:
- CLOUD_ID: 550c6b47-250d-452d-afe8-8e200810656f
- PROJECT_KEY: PE
- EPIC_KEY: PE-38
```

## Development

```bash
# Watch mode for development
npm run watch

# Build for production
npm run build
```

## How It Works

1. Reads `manifest.json` from the templates root
2. Provides tools to list, inspect, and install skills
3. Handles placeholder replacement ({{KEY}} → value)
4. Renames `.template.md` files to `.md` during installation
5. Creates target directory structure automatically
