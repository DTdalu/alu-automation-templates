# PRD Template

Use this template when creating Product Requirements Documents. Save to `docs/PRD-{feature-name}.md` in the project repository.

---

## PRD: {Feature Name}

**Author:** {Name}
**Date:** {YYYY-MM-DD}
**Status:** Draft | In Review | Approved
**Epic:** {Jira Epic Key}

---

### 1. Problem Statement

**What problem are we solving?**
{Describe the pain point in 2-3 sentences. Be specific about who feels the pain and when.}

**Why now?**
{What triggered the need for this solution? Business driver, user feedback, competitive pressure?}

**What happens if we don't solve this?**
{Consequences of inaction — lost revenue, user churn, operational cost, compliance risk?}

---

### 2. Users & Jobs-to-be-Done

**Primary Users:**
| User Type | Description | Frequency of Use |
|-----------|-------------|------------------|
| {Role} | {Who they are} | {Daily/Weekly/Monthly} |

**Jobs-to-be-Done:**
> When {situation}, I want to {motivation}, so I can {expected outcome}.

| Job | Functional | Emotional | Social |
|-----|-----------|-----------|--------|
| {Job 1} | {What they need to accomplish} | {How they want to feel} | {How they want to be perceived} |

**Current Workarounds:**
{What do users do today without this solution?}

---

### 3. Success Metrics

| Metric | Current | Target | Measurement Method |
|--------|---------|--------|-------------------|
| {KPI 1} | {Baseline} | {Goal} | {How measured} |
| {KPI 2} | {Baseline} | {Goal} | {How measured} |

**North Star Metric:** {The single most important indicator of success}

---

### 4. Functional Requirements

**Must Have (P0):**
- [ ] {Requirement 1}
- [ ] {Requirement 2}

**Should Have (P1):**
- [ ] {Requirement 3}
- [ ] {Requirement 4}

**Nice to Have (P2):**
- [ ] {Requirement 5}

---

### 5. Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| Performance | {Response time, throughput} |
| Scalability | {Users, data volume} |
| Security | {Auth, data protection} |
| Reliability | {Uptime, error handling} |
| Compliance | {Regulations, standards} |

---

### 6. Acceptance Criteria

Format: Given/When/Then

**AC1: {Title}**
```
Given {precondition}
When {action}
Then {expected result}
```

**AC2: {Title}**
```
Given {precondition}
When {action}
Then {expected result}
```

---

### 7. Scope

**In Scope:**
- {What IS included}

**Out of Scope:**
- {What is NOT included — be explicit}

**Future Considerations:**
- {What might come later but not now}

---

### 8. Dependencies & Risks

**Dependencies:**
| Dependency | Owner | Status |
|------------|-------|--------|
| {External system, team, data} | {Who owns it} | {Blocked/In Progress/Ready} |

**Risks:**
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| {What could go wrong} | High/Med/Low | High/Med/Low | {How to address} |

---

### 9. Open Questions

- [ ] {Question 1} — Owner: {Name}
- [ ] {Question 2} — Owner: {Name}

---

### 10. Appendix

**Related Documents:**
- {Link to research}
- {Link to designs}
- {Link to technical spec}

**Revision History:**
| Date | Author | Changes |
|------|--------|---------|
| {Date} | {Name} | Initial draft |
