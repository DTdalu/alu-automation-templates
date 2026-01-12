# Jira Integration Patterns

Reference for using Atlassian MCP tools with the project.

---

## Configuration

**Cloud ID:** `{{CLOUD_ID}}`
**Default Project:** {{PROJECT_KEY}}
**Default Epic:** {{EPIC_KEY}}

---

## Common Queries

### Get Epic Details

```javascript
Tool: getJiraIssue
Params: {
  cloudId: "{{CLOUD_ID}}",
  issueIdOrKey: "{{EPIC_KEY}}"
}
```

### Get All Stories Under Epic

```javascript
Tool: searchJiraIssuesUsingJql
Params: {
  cloudId: "{{CLOUD_ID}}",
  jql: "parent = {{EPIC_KEY}} ORDER BY created ASC",
  fields: ["summary", "status", "assignee", "priority"]
}
```

### Get Stories by Status

```javascript
// In Progress stories
jql: "parent = {{EPIC_KEY}} AND status = 'IN Development'"

// To Do stories
jql: "parent = {{EPIC_KEY}} AND status = 'To Do'"

// Done stories
jql: "parent = {{EPIC_KEY}} AND status = 'Done'"
```

### Get My Assigned Stories

```javascript
jql: "project = {{PROJECT_KEY}} AND assignee = currentUser() AND parent = {{EPIC_KEY}}"
```

---

## Update Patterns

### Update Epic Description

```javascript
Tool: editJiraIssue
Params: {
  cloudId: "{{CLOUD_ID}}",
  issueIdOrKey: "{{EPIC_KEY}}",
  fields: {
    description: {
      type: "doc",
      version: 1,
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Epic description here..." }
          ]
        }
      ]
    }
  }
}
```

### Add Status Comment

```javascript
Tool: addCommentToJiraIssue
Params: {
  cloudId: "{{CLOUD_ID}}",
  issueIdOrKey: "{{EPIC_KEY}}",
  commentBody: "## Status Update\n\nProgress: 5 of 16 stories complete..."
}
```

### Add PM Handoff Comment

```javascript
commentBody: `## [PM HANDOFF]

Epic is ready for story breakdown.

### Requirements Summary
- Requirement 1
- Requirement 2

### Acceptance Criteria
- AC1: Given/When/Then
- AC2: Given/When/Then

### Technical Considerations
- Consider X for implementation
- Note dependency on Y

### Open Questions for Tech Review
- How should we handle Z?

---
*Handoff prepared by Product Manager skill*`
```

---

## Description Formatting

### Epic Description Structure

```markdown
## Problem Statement
{Why this epic exists}

## Business Value
{What success looks like}

## Scope

### In Scope
- Item 1
- Item 2

### Out of Scope
- Item 3

## Acceptance Criteria
- [ ] AC1: Description
- [ ] AC2: Description

## Dependencies
- Dependency 1
- Dependency 2

## Related Documentation
- [PRD](link-to-docs)
- [Technical Spec](link-to-docs)
```

### Story Description Structure

```markdown
## User Story
As a {user type}, I want {goal} so that {benefit}.

## Acceptance Criteria
- [ ] Given {context}, when {action}, then {result}
- [ ] Given {context}, when {action}, then {result}

## Technical Notes
{Implementation hints from PM handoff}

## Related Files
- `path/to/file1.sql`
- `path/to/file2.py`
```

---

## Status Mapping

| Jira Status | Category | Meaning |
|-------------|----------|---------|
| To Do | new | Not started |
| IN Development | indeterminate | Actively coding |
| IN TEST | indeterminate | Testing in progress |
| Done | done | Complete |

---

## Useful JQL Patterns

```sql
-- All project stories not done
project = {{PROJECT_KEY}} AND type = Story AND status != Done

-- High priority items
project = {{PROJECT_KEY}} AND priority in (High, Highest) AND status != Done

-- Recently updated
project = {{PROJECT_KEY}} AND updated >= -7d ORDER BY updated DESC

-- Unassigned stories
project = {{PROJECT_KEY}} AND type = Story AND assignee is EMPTY

-- Stories by label
project = {{PROJECT_KEY}} AND labels = "Automation"

-- Epic link (for older Jira)
"Epic Link" = {{EPIC_KEY}}
```

---

## Error Handling

If Jira operations fail:

1. **Check cloudId** — Use `getAccessibleAtlassianResources` to verify
2. **Check permissions** — Ensure write access to project
3. **Validate issue key** — Confirm issue exists with `getJiraIssue`
4. **Check field format** — Description requires ADF (Atlassian Document Format) for rich text

---

## PM ↔ SM Coordination

### Handoff Protocol

| PM Action | SM Response |
|-----------|-------------|
| Post `[PM HANDOFF]` | Post `[SM REVIEW]` or `[SM CHALLENGE]` |
| Post `[PM RESPONSE]` to challenges | Proceed with story breakdown |
| Approve story breakdown plan | Execute Jira changes |

### Comment Tags

| Tag | Owner | Purpose |
|-----|-------|---------|
| `[PM HANDOFF]` | PM | Epic ready for story breakdown |
| `[PM RESPONSE]` | PM | Answers to SM challenges |
| `[PM UPDATE]` | PM | Status/progress update |
| `[SM REVIEW]` | SM | Initial review findings |
| `[SM CHALLENGE]` | SM | Questions/concerns for PM |
| `[SM READY]` | SM | Story is dev-ready |
