# Story Template

Use this structure for every story created in Jira.

## Title

User-story format or clear action statement. Be specific enough that an engineer knows what this story delivers just from the title.

**User story format:** "As a [role], I can [action] so that [benefit]"
**Action format:** "Implement [specific capability] for [component]"

**Good:** "As an accountant, I can upload invoice PDFs and see extracted header fields"
**Good:** "Implement barcode-based matching between extracted invoices and AS400 records"
**Bad:** "Backend work for invoices"
**Bad:** "Phase 1 database setup"

## Description Structure

### What to build

Describe the end-to-end behavior as a vertical slice. What does the user or system do from start to finish? Write it as a narrative flow, not a list of layers.

**Good (vertical):**
> User uploads a PDF through the review UI. The system stores the file in Azure Blob Storage, triggers the extraction pipeline, and displays the extracted header fields (vendor, invoice number, date, total, stock number) in the UI within 30 seconds. If extraction confidence is below 90% on any field, that field is highlighted for manual review.

**Bad (horizontal):**
> Create Snowflake tables AP_INVOICE_HEADER and AP_INVOICE_LINE. Add stored procedure SP_LOAD_INVOICE_DATA. Create indexes on barcode and invoice_number columns.

### Acceptance Criteria

2-4 criteria in Given/When/Then format. Each criterion must be:
- **Specific** — no ambiguity about pass/fail
- **Testable** — you could write an automated test for it
- **Independent** — doesn't repeat another criterion

```
- Given a valid invoice PDF is uploaded,
  When the extraction pipeline completes,
  Then all 5 header fields (vendor, invoice number, date, total, stock number) are populated in the UI

- Given extraction confidence is below 90% on a field,
  When results are displayed,
  Then the low-confidence field is highlighted in yellow with the confidence percentage shown

- Given an invalid file type (not PDF) is uploaded,
  When the system processes the upload,
  Then the user sees an error message and the file is rejected without processing
```

### Test Plan

For the full test plan structure, see [test-plan-template.md](test-plan-template.md). At minimum, every story's test plan must cover:

1. **Happy path** — The expected, normal-case flow works correctly
2. **Edge case** — At least one boundary condition or unusual input
3. **Error handling** — At least one failure scenario

For each scenario, specify: what to test, how (unit/integration/manual), and what data/environment is needed.

For 1-2 point stories, a single happy-path scenario with manual verification is sufficient.

### Tech Stack

List the specific languages, frameworks, databases, and services this story touches.

```
- Python 3.11 — extraction pipeline
- Snowflake — data storage (NON_PROD_RAW schema)
- Azure Blob Storage — PDF file storage
- Streamlit — review UI
```

### Story Points

| Points | Meaning | Typical Duration |
|--------|---------|-----------------|
| 1 | Trivial, well-understood | < 1 hour |
| 2 | Small, minimal complexity | < half day |
| 3 | Moderate, some decisions needed | ~ 1 day |
| 5 | Significant, multiple components | 2-3 days |
| 8 | Large — consider splitting | 3-5 days |
| 13 | Too large — must be split | N/A |

### Dependencies

Other stories, systems, or teams this is blocked by. Use Jira issue keys when possible.

- `Blocked by PE-43 (extraction must exist before matching can run)`
- `Requires AS400 read access (infra ticket INFRA-102)`
- `None`
