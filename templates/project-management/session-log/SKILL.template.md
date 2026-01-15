---
name: session-log
description: Generate structured session logs capturing git activity, accomplishments, and context for Jira updates and stand-ups. Creates markdown files in docs/logs/.
version: 1.0.0
author: Dan Alu
last-updated: 2026-01-15
scope: user
category: project-management
---

# Session Log Skill

Generate comprehensive session logs that capture work accomplished, git activity, and context for downstream use by other agents (like `/scrum-master` or `/product-manager`).

## Keywords

session, log, summary, standup, jira, context, git, commits, pr, pull request, accomplishments, session-log

---

## Usage

```
/session-log
/session-log --since "3 hours ago"
/session-log --stories {{PROJECT_KEY}}-70,{{PROJECT_KEY}}-71
/session-log --title "Feature Name"
```

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `--since` | Time range for git activity | "today" or since last log |
| `--stories` | Jira story IDs touched | Auto-detect from commits |
| `--title` | Custom title for the log | Branch name or topic |
| `--epic` | Epic ID for Jira context | {{EPIC_KEY}} |

---

## Workflow

When this skill is invoked, follow these steps precisely:

### Step 1: Gather Git Activity

Run these commands to collect factual data:

```bash
# Get recent commits (today or since specified time)
git log --since="midnight" --oneline --format="%h|%s|%ai"

# Get current branch
git branch --show-current

# Get files changed today
git diff --stat $(git log --since="midnight" --format="%H" | tail -1)^ HEAD 2>/dev/null || git diff --stat HEAD~5 HEAD

# Get file status (created, modified, deleted)
git diff --name-status $(git log --since="midnight" --format="%H" | tail -1)^ HEAD 2>/dev/null || git diff --name-status HEAD~5 HEAD

# Check for PRs (if gh is available)
gh pr list --state all --author @me --limit 5 --json number,title,state,url,createdAt,mergedAt 2>/dev/null
```

### Step 2: Identify Project Context

1. Read the project's CLAUDE.md to find:
   - Epic ID (default: {{EPIC_KEY}})
   - Project name: {{PROJECT_NAME}}
   - Current phase

2. Check for existing logs in `{{LOGS_PATH}}` to determine:
   - Last session timestamp
   - Continuity of work

### Step 3: Gather Session Context

Ask the user (or infer from conversation history):
- What were the main accomplishments?
- What decisions were made and why?
- Were there any blockers?
- What are the next steps?

If this is invoked at end of session, summarize from the conversation.

### Step 4: Generate the Log File

Create file at: `{{LOGS_PATH}}YYYY-MM-DD_HHMMSS_[slug].md`

Where `[slug]` is derived from:
1. `--title` parameter if provided
2. Branch name (sanitized)
3. Primary topic from accomplishments

Use the template structure from `templates/session-log-template.md`.

### Step 5: Update Index (Optional)

If `{{LOGS_PATH}}index.md` exists, prepend the new log entry to the list.

---

## Output Structure

The generated log should include these sections:

### Header
- Date and time
- Duration estimate
- Branch name
- Session title

### Summary
- 2-3 sentence overview of what was accomplished

### Key Accomplishments
- Bulleted list with checkboxes (for tracking)
- Each item should be specific and actionable

### Git Activity
- **Commits**: Hash, message, link
- **Pull Requests**: Number, title, status, link
- **Branches**: Created, merged, deleted

### Files Changed
- **Created**: New files
- **Modified**: Changed files
- **Deleted**: Removed files

### Decisions Made
- Key decisions with brief rationale
- Links to relevant discussions or docs

### Next Steps
- Action items for future sessions
- Blockers to address

### Jira Context
- Epic and stories affected
- Suggested Jira comment (formatted for copy/paste)
- Status updates for each story

### References
- All links (commits, PRs, files, docs)
- External resources consulted

---

## Integration with Other Skills

### For `/scrum-master`:
The Jira Context section provides ready-to-use updates:
```
"Read the recent session logs from {{LOGS_PATH}} to prepare Jira updates"
```

### For `/product-manager`:
The Summary and Decisions sections provide context:
```
"Review session logs to understand recent progress on {{EPIC_KEY}}"
```

---

## Tips

1. **Run at end of session**: Best context while it's fresh
2. **Use --stories**: Explicitly link to Jira for better traceability
3. **Keep logs**: They become valuable project history
4. **Reference in stand-ups**: "See session log from 2026-01-15"

---

## File Naming Convention

```
{{LOGS_PATH}}
├── 2026-01-15_143052_remove-invoice-lines.md
├── 2026-01-14_091523_dedup-implementation.md
├── 2026-01-13_160845_reconciliation-view.md
└── index.md
```

Format: `YYYY-MM-DD_HHMMSS_[descriptive-slug].md`
