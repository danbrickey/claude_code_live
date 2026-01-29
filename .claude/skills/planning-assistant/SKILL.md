# Planning Assistant Skill

Manages agile planning artifacts: Epics, Features, and User Stories with Fibonacci sizing, weekly sprints, and visual progress tracking.

## Dependencies

```yaml
dependencies:
  - docs-organizer  # For front matter and indexing
```

## Configuration

This skill is fully customizable via `config.yaml`. All paths and behaviors can be adjusted for your project.

**Key settings:**
- **Paths**: Customize where planning docs live (`docs/planning/` by default)
- **Sprint cadence**: Configure sprint duration and start/end days
- **Fibonacci limits**: Set max story points before breakdown required
- **Auto-behaviors**: Toggle auto-updating status.svg, bidirectional linking

**Portability:**
1. Copy `.claude/skills/planning-assistant/` to new project
2. Edit `config.yaml` to match new project's folder structure
3. Run "setup planning system" to scaffold directories (or create manually)
4. Start using the skill immediately

See `config.yaml` for all available options and defaults.

## What This Skill Enables

When this skill is active, Claude Code can:

- **Create and manage Epics**: Long-term initiatives spanning multiple Planning Increments
- **Break down Epics into Features**: Deliverable chunks of work
- **Create User Stories**: Sized work items with acceptance criteria
- **Track Planning Increments (PIs)**: Weekly sprint cycles
- **Generate status dashboard**: SVG visualization of progress
- **Manage Kanban workflow**: Move stories through todo/in-progress/done

## Core Concepts

### Hierarchy

```
Epic (initiative)
  └── Feature (deliverable)
        └── Story (sized work item)
```

### Fibonacci Sizing

| Points | Complexity | Example |
|--------|------------|---------|
| 1 | Trivial | Fix typo, update config |
| 2 | Simple | Add single field, minor UI tweak |
| 3 | Small | New component, API endpoint |
| 5 | Medium | Feature with 2-3 moving parts |
| 8 | Large | Cross-cutting feature, integration |
| 13 | Very Large | Major subsystem, multiple integrations |
| 21 | Epic-sized | **Needs breakdown** - too complex to estimate |

**See:** `rubrics/sizing-guide.md` for detailed examples.

### Planning Increment (PI)

- **Duration**: 1 week
- **Naming**: `pi-YYYY-wWW` (e.g., `pi-2026-w05`)
- **Artifacts**: goals.md, retro.md

## Folder Structure

```
docs/planning/
├── README.md              # Planning dashboard
├── status.svg             # Auto-generated progress visualization
├── backlog.md             # Unprioritized ideas/intake
├── epics/
│   └── epic-001-name.md
├── features/
│   └── feat-001-name.md
├── stories/
│   └── story-001-name.md
└── increments/
    └── pi-2026-w05/
        ├── goals.md
        └── retro.md
```

## Extended Front Matter

Extends docs-organizer's front matter schema with planning-specific fields.

### Epic Front Matter

```yaml
---
title: Epic Title
created: 2026-01-28
updated: 2026-01-28
status: draft
type: epic
author: ""
ai_model: ~
tags: []
related: []
# Planning-specific fields
epic_id: epic-001
planning_status: draft | planning | in-progress | complete | cancelled
business_value: High | Medium | Low
target_pi: pi-2026-w05
features: []
---
```

### Feature Front Matter

```yaml
---
title: Feature Title
created: 2026-01-28
updated: 2026-01-28
status: active
type: feature
author: ""
ai_model: ~
tags: []
related: []
# Planning-specific fields
feat_id: feat-001
epic: epic-001
planning_status: backlog | ready | in-progress | done | blocked
points: 0
stories: []
target_pi: pi-2026-w05
---
```

### Story Front Matter

```yaml
---
title: Story Title
created: 2026-01-28
updated: 2026-01-28
status: active
type: story
author: ""
ai_model: ~
tags: []
related: []
# Planning-specific fields
story_id: story-001
feature: feat-001
planning_status: todo | in-progress | done | blocked
points: 3
acceptance_criteria: []
---
```

## Proactive Triggers

This skill activates automatically when:

- User mentions "create epic", "new initiative", "plan", "roadmap"
- User mentions "break down", "decompose", "split into features"
- User mentions "user story", "story points", "size", "estimate"
- User mentions "sprint", "PI", "planning increment", "weekly planning"
- User mentions "status", "progress", "dashboard", "kanban"
- User mentions "retro", "retrospective", "what worked"
- User opens or edits files in `docs/planning/`
- **Planning structure is missing** → Triggers initialization workflow
- User mentions "setup planning", "initialize planning", "bootstrap"

**See:** `rubrics/triggers.md` for detailed activation conditions.

### Initialization Detection

If the planning folder structure doesn't exist, this skill will:
1. Detect missing structure proactively
2. Offer to initialize the system with a guided interview
3. Create folders, dashboard, and starter files
4. Configure paths and sprint cadence in `config.yaml`

**See:** `workflows/initialization.md` for the complete bootstrap workflow.

## Workflows

### Workflow 1: Create Epic

```
User: "Create an epic for the new authentication system"

1. Generate next epic ID (scan existing epics)
2. Create epic-XXX-{slug}.md from template
3. Interview for:
   - Business value (High/Medium/Low)
   - Target PI for completion
   - Initial feature ideas
4. Create in docs/planning/epics/
5. Regenerate status.svg
6. Update docs/planning/README.md
```

### Workflow 2: Break Down Epic to Features

```
User: "Break down epic-001 into features"

1. Read the epic document
2. Suggest logical feature breakdown based on content
3. For each approved feature:
   - Generate feat-XXX-{slug}.md
   - Link back to parent epic
4. Update epic's features list in front matter
5. Regenerate status.svg
```

### Workflow 3: Create User Stories

```
User: "Create stories for feat-001"

1. Read the feature document
2. Suggest story breakdown based on feature scope
3. For each story:
   - Generate story-XXX-{slug}.md
   - Prompt for story points (1,2,3,5,8,13,21)
   - If 21: warn "too big, consider splitting"
   - Add acceptance criteria
4. Update feature's stories list and total points
5. Regenerate status.svg
```

### Workflow 4: PI Planning

```
User: "Start PI planning for week 5"

1. Create pi-2026-w05/ folder in increments/
2. Create goals.md with PI objectives template
3. Review backlog and available features
4. Select features to commit to this PI
5. Update selected stories to "ready" status
6. Generate initial status.svg snapshot
```

### Workflow 5: Update Story Status (Kanban)

```
User: "Move story-005 to done"

1. Update story front matter: planning_status: done
2. Recalculate parent feature's completed points
3. Regenerate status.svg
4. If all stories done: update feature to done
5. If all features done: update epic to complete
```

### Workflow 6: End of PI Retro

```
User: "Run the retrospective for this PI"

1. Create retro.md in current PI folder
2. Summarize: completed points vs committed points
3. Calculate velocity (total points completed)
4. List what worked, what didn't, action items
5. Mark PI as complete
```

## ID Generation

IDs are sequential across the project:

- Epics: `epic-001`, `epic-002`, ...
- Features: `feat-001`, `feat-002`, ...
- Stories: `story-001`, `story-002`, ...

On creation, scan existing files in the respective folder to find next available ID.

```
# Example: Finding next epic ID
1. List files in docs/planning/epics/
2. Extract IDs from filenames (epic-001-*, epic-002-*)
3. Find max ID, increment by 1
4. New epic: epic-003-{slug}.md
```

## Status Dashboard (status.svg)

The status.svg file provides visual progress tracking:

- **Epic progress bars**: Percentage of features completed
- **Feature progress bars**: Story points completed / total
- **Color coding**: 
  - Green: On track (>75% complete or no blockers)
  - Yellow: At risk (<50% complete with <3 days remaining)
  - Red: Blocked (has blocked stories)
- **Kanban summary**: Count of stories by status

**See:** `generators/status-svg.md` for SVG generation instructions.

## Integration with docs-organizer

This skill delegates to docs-organizer for:

1. **Front matter management**: Uses docs-organizer's interview workflow
2. **Index maintenance**: Registers planning docs in master index
3. **Document quality**: Applies evaluation rubric to planning docs
4. **Type inference**: Extends type enum with epic, feature, story

When creating new documents, trigger docs-organizer's front matter interview for non-planning fields (author, tags, etc.).

## How to Invoke

### Explicit Commands

- "Create an epic for [initiative]"
- "Break down [epic] into features"
- "Create user stories for [feature]"
- "Start PI planning for week [N]"
- "Move [story] to [status]"
- "Update the status dashboard"
- "Run a retrospective"
- "Show planning status"
- "What's in the backlog?"

### Context-Based (Proactive)

The skill automatically suggests:
- Creating stories when a feature has none
- Breaking down epics when they have no features
- Running retro at end of PI
- Regenerating status.svg after planning changes

## Example Session

**User: "I want to plan a new authentication epic"**

```
Claude: I'll create an epic for authentication. Let me gather some details:

1. What's the full title? (e.g., "User Authentication System")
2. Business value: High, Medium, or Low?
3. Target PI for completion? (Current: pi-2026-w05)
4. Any initial feature ideas?

Or say "skip" to use defaults.
```

**User: "High value, target w08, features: login, registration, password reset"**

```
Claude: Created docs/planning/epics/epic-001-authentication.md

I've also created placeholder features:
- feat-001-login.md
- feat-002-registration.md  
- feat-003-password-reset.md

Each needs user stories before sizing. Want me to break down one of these features into stories?

Status dashboard updated: status.svg
```
