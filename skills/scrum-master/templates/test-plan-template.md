# Test Plan Template

Use this structure when defining test plans for stories. Every story must have a test plan — no exceptions.

## Scenario Coverage

Every test plan must cover at minimum:

1. **Happy path** — The normal, expected flow works correctly
2. **Edge case** — Boundary conditions, empty states, large inputs, concurrent access
3. **Error handling** — Invalid input, unavailable dependencies, timeout, permission denied

For complex stories (5+ points), add:
4. **Negative testing** — Deliberately wrong inputs, malicious data, unexpected formats
5. **Regression** — Existing functionality that could break from this change

## Scenario Format

For each scenario:

```
**Scenario:** [Brief name]
**Preconditions:** [What must be true before the test]
**Steps:**
1. [Action 1]
2. [Action 2]
3. [Action 3]
**Expected result:** [Specific, observable outcome]
**Test type:** [Unit | Integration | E2E | Manual]
```

## Test Type Guidance

### Unit Tests
Test individual functions or modules in isolation.
- Pure logic, calculations, data transformations
- Input validation and error handling
- Edge cases on specific functions

### Integration Tests
Test how components work together across layers.
- API endpoint → database → response
- File upload → processing pipeline → storage
- End-to-end user flows through the system

### Manual Verification
What a human needs to check that automation can't cover.
- Visual appearance and layout
- User experience flow and intuitiveness
- Cross-browser or device-specific behavior

## Data and Environment

Always specify:
- **Test data needed** — Sample files, mock records, seed data
- **Environment** — Dev, staging, or production-like setup
- **External dependencies** — What services need to be running, what can be mocked
- **Cleanup** — Does test data need to be cleaned up afterward?

## Regression Scope

For every story, answer:
- What existing features could this change break?
- What smoke tests should run after deployment?
- Should this be flagged for regression in future deployments?
