# Epic Template

Use this structure when creating epics in Jira. Every field matters — missing sections lead to incomplete story breakdowns downstream.

## Title

Clear, action-oriented. Describes what will be built or solved.

**Good examples:**
- "Build automated invoice reconciliation against AS400"
- "Migrate Dynamics AX 2012 to Dynamics 365 Finance"
- "Replace BlackLine account reconciliation with proprietary solution"

**Bad examples:**
- "Invoice stuff"
- "Phase 2 improvements"
- "New feature for accounting"

## Description Structure

### Problem Statement

2-3 sentences explaining what's broken, missing, or needed, and why it matters to the business. Include measurable impact where possible.

> Example: "The accounting team manually reconciles 2,400 invoices per month against AS400 records, taking an average of 4 hours per day. Mismatches are caught late in the process, causing payment delays and vendor disputes. An automated reconciliation system would reduce processing time to under 30 minutes and catch exceptions in real time."

### Requirements

Numbered list. Each requirement must be:
- **Specific** — no ambiguity about what "done" means
- **Testable** — you could write a test for it
- **Independent** — doesn't restate another requirement

```
1. System must extract invoice header fields (vendor, invoice number, date, total, stock number) from uploaded PDF documents
2. System must match extracted invoices to AS400 records using barcode as the primary key
3. System must flag mismatches with specific exception codes (MI, MD, MA, MS, WI, WV, WR)
4. Users must be able to review and resolve flagged exceptions through a review queue
5. System must produce a daily reconciliation summary report
```

### Acceptance Criteria

Given/When/Then format. Minimum 3 criteria. Cover the happy path, at least one edge case, and at least one error scenario.

```
- Given a valid invoice PDF is uploaded, When extraction runs, Then all header fields are captured with ≥95% accuracy
- Given an extracted invoice matches an AS400 record on barcode, When field comparison runs, Then matching fields show PASS and mismatches show the specific exception code
- Given an invoice has no matching AS400 record, When lookup fails, Then the invoice is flagged as MI (Missing Invoice) and added to the exception queue
```

### Scope

**In scope:**
- List specific deliverables that WILL be built
- Be concrete: "Invoice upload UI", "PDF extraction pipeline", "Exception review queue"

**Out of scope:**
- List items that are explicitly NOT part of this work
- Prevent scope creep by naming adjacent work that might get pulled in
- Example: "Payment processing automation (separate epic)", "Historical invoice backfill (Phase 2)"

### Systems & Components

What technical systems, databases, APIs, services, or third-party tools are involved. Include both existing systems being integrated with and new components being built.

```
- Snowflake (NON_PROD_RAW) — data storage and processing
- AS400 — source of truth for invoice records
- Azure Blob Storage — PDF upload destination
- Python/Streamlit — extraction pipeline and review UI
- Jira — story tracking and progress updates
```

### Stakeholders

| Role | Name | Responsibility |
|------|------|----------------|
| Problem Owner | [Name] | Defines requirements, resolves scope questions |
| UAT Owner | [Name] | Signs off that the solution meets business needs |
| Technical Lead | [Name] | Architecture decisions, technical feasibility |

### Dependencies

Other epics, systems, teams, or decisions this work depends on. If none, state "None identified."

```
- Requires AS400 read access (infra ticket pending)
- Depends on PDF extraction model selection (spike needed)
- Blocked by: Azure Blob Storage provisioning (ETA: next sprint)
```
