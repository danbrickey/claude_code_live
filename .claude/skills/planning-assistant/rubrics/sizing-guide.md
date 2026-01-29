# Story Point Sizing Guide

This guide helps with consistent story point estimation using the Fibonacci sequence.

## The Fibonacci Scale

| Points | Complexity | Time Hint | Certainty |
|--------|------------|-----------|-----------|
| **1** | Trivial | Hours | Very High |
| **2** | Simple | Half day | High |
| **3** | Small | 1 day | High |
| **5** | Medium | 2-3 days | Medium |
| **8** | Large | Week | Medium |
| **13** | Very Large | 1-2 weeks | Low |
| **21** | Epic-sized | Unknown | **Split required** |

> **Note:** Time hints are initial calibration only. As you work with AI assistance, velocity will increase and points will decouple from calendar time. Points measure **complexity**, not duration.

---

## Sizing by Category

### 1 Point - Trivial

**Characteristics:**
- Single file change
- No testing uncertainty
- Copy/paste or config change
- No dependencies

**Examples:**
- Fix a typo in documentation
- Update a config value
- Add a simple CSS rule
- Rename a variable
- Update a version number

---

### 2 Points - Simple

**Characteristics:**
- 1-2 files changed
- Straightforward implementation
- Minimal testing needed
- Clear requirements

**Examples:**
- Add a new field to a form
- Create a simple utility function
- Add a new route that returns static data
- Update validation rules
- Add a new enum value with handling

---

### 3 Points - Small

**Characteristics:**
- 2-5 files changed
- Some implementation decisions
- Unit tests needed
- Clear acceptance criteria

**Examples:**
- Create a new React component
- Add a simple API endpoint with DB query
- Implement a new validation rule with error handling
- Add a new scene template (Remotion)
- Create a reusable hook

---

### 5 Points - Medium

**Characteristics:**
- Multiple files/modules
- Some unknowns to resolve
- Integration testing needed
- 2-3 moving parts

**Examples:**
- Implement a feature with frontend + backend changes
- Add authentication to an existing flow
- Create a new form with validation and submission
- Integrate a third-party library
- Build a dashboard widget with real data

---

### 8 Points - Large

**Characteristics:**
- Crosses module boundaries
- Integration complexity
- Multiple stakeholders
- Performance considerations

**Examples:**
- Implement real-time notifications (WebSocket)
- Add a new payment method integration
- Build a file upload system with processing
- Create a complex data visualization
- Implement caching layer

---

### 13 Points - Very Large

**Characteristics:**
- Major subsystem
- Architectural decisions
- Multiple integrations
- Significant testing effort
- May span multiple PIs

**Examples:**
- Build a complete user management module
- Implement a search system with indexing
- Create a workflow/pipeline engine
- Add multi-tenancy support
- Implement a plugin architecture

---

### 21 Points - Too Large

**Action Required:** This story is too complex to estimate accurately. Break it down.

**Signs you're at 21:**
- "It depends" keeps coming up
- You can't list all the acceptance criteria
- Multiple architectural approaches possible
- Uncertain about which modules are affected
- Feels like it could take "a long time"

**How to split:**
1. Identify the first slice that delivers value
2. Separate infrastructure from features
3. Break by user journey or workflow step
4. Split read vs. write operations
5. Create a "spike" story to reduce unknowns

---

## Estimation Tips

### Do

- Compare to previously completed stories
- Use planning poker (even async)
- Round to the nearest Fibonacci number
- Include testing and documentation time
- Consider integration complexity

### Don't

- Estimate in calendar time
- Let one person dominate estimates
- Forget about edge cases
- Ignore technical debt
- Estimate without understanding acceptance criteria

---

## Relative Sizing

Use reference stories as anchors:

| Reference | Points | Description |
|-----------|--------|-------------|
| Anchor-1 | 1 | Fix typo in README |
| Anchor-3 | 3 | Add new button component with tests |
| Anchor-5 | 5 | New form with validation and API call |
| Anchor-8 | 8 | Feature with frontend, API, and DB changes |

When estimating, ask: "Is this bigger or smaller than our reference?"

---

## When to Re-estimate

Stories should be re-estimated when:

1. Requirements change significantly
2. New technical constraints discovered
3. Story has been in backlog for 3+ PIs
4. Original estimator is no longer available
5. Implementation approach changes

---

## Velocity Tracking

Track points completed per PI to establish velocity:

```
PI 2026-W05: 21 points
PI 2026-W06: 18 points
PI 2026-W07: 25 points
-----------------------
Average: 21 points/PI
```

Use velocity for planning capacity, not for performance evaluation.
