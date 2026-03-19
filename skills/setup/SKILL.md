---
name: setup
description: Configures Jira integration for the SDLC toolkit by setting Cloud ID, project key, and team name, then verifying Atlassian MCP connectivity. Use when setting up a new project, connecting to Jira for the first time, changing project settings, or troubleshooting when Jira calls fail. Triggers on "set up Jira," "configure my project," "connect to Jira," "get started with the toolkit."
---

# Setup

Configure this project's Jira integration for the SDLC toolkit skills.

## Steps

### 1. Verify Atlassian MCP is available

Before anything else, check that the Atlassian MCP tools are accessible. Try to confirm that tools like `searchJiraIssuesUsingJql`, `createJiraIssue`, and `addCommentToJiraIssue` are available.

If the Atlassian MCP tools are not available, stop and tell the user:

> "The Atlassian MCP server is not configured in your Claude Code setup. You need to add the Atlassian MCP before the SDLC toolkit can connect to Jira. Check your MCP settings in Claude Code or ask your admin for the Atlassian MCP configuration."

Do not proceed until MCP tools are confirmed available.

### 2. Check for existing config

Read `.claude/sdlc-toolkit.local.md` if it exists. If valid config is found, show it and ask if the user wants to update or keep it.

### 3. Gather project info

Ask the user for:

- **Jira Cloud ID** — A UUID that identifies your Atlassian instance. Format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` (e.g., `550c6b47-250d-452d-afe8-8e200810656f`).
- **Default project key** — The short prefix for issues (e.g., `PE`, `ENG`, `DATA`).
- **Team name** — For context in handoffs and reports (e.g., "Invoice Automation", "Platform Engineering").

**Validate the Cloud ID format** before proceeding. It must be a UUID (8-4-4-4-12 hex characters). If the user provides a URL, site name, or malformed string, explain what a Cloud ID is and help them find it:
- Visit `https://admin.atlassian.com` and look for the Cloud ID in the URL after selecting their organization
- Or try calling `getAccessibleAtlassianResources` via the Atlassian MCP if that tool is available

### 4. Verify connectivity

Use the Atlassian MCP to validate the configuration:

```
searchJiraIssuesUsingJql({
  cloudId: "<provided-cloud-id>",
  jql: "project = <project-key> ORDER BY created DESC",
  maxResults: 1
})
```

**If successful:** Show the most recent issue as proof of connectivity.

**If it fails,** diagnose based on the error:
- **Authentication error (401/403):** The MCP token may be expired or missing. Ask the user to re-authenticate the Atlassian MCP.
- **Project not found / empty results:** The project key may be wrong. Ask the user to verify the key exists in Jira.
- **Invalid Cloud ID (404):** The Cloud ID does not match any Atlassian instance. Re-check the UUID.
- **Connection refused / timeout:** The MCP server may not be running. Check MCP configuration in Claude Code settings.

### 5. Save config

Write to `.claude/sdlc-toolkit.local.md`:

```yaml
---
cloudId: "<cloud-id>"
projectKey: "<project-key>"
team: "<team-name>"
configuredAt: "<generate current ISO 8601 timestamp>"
---

# SDLC Toolkit Configuration

This file is read by SDLC toolkit skills to connect to your Jira project.
Do not commit this file — it contains project-specific configuration.
```

Check if `.claude/sdlc-toolkit.local.md` is in `.gitignore`. If not, remind the user to add it.

### 6. Confirm

Show a summary:

```
✓ SDLC Toolkit configured
  Project: <project-key> (<team-name>)
  Cloud ID: <cloud-id>
  Connectivity: verified

Available skills:
  /product-manager  — Create well-formed Jira epics through stakeholder interview
  /scrum-master     — Break epics into pointed stories with AC and test plans
  /grill            — Stress-test any plan, epic, or story
```
