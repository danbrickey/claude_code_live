---
title: Planning Dashboard
created: {created_date}
updated: {updated_date}
status: active
type: planning
author: ""
ai_model: Claude Sonnet 4.5
tags: [planning, dashboard, index]
related: []
---

# Planning Dashboard

> Managed by the Planning Assistant skill. Run "update status" to regenerate.

## Current Status

![Planning Status](status.svg)

---

## Quick Links

| Section | Description |
|---------|-------------|
| [Epics](epics/) | Long-term initiatives |
| [Features](features/) | Deliverable work chunks |
| [Stories](stories/) | Sized work items |
| [Increments](increments/) | Weekly PI planning |
| [Backlog](backlog.md) | Unprioritized ideas |
| [Brainstorming](brainstorming.md) | Active PI planning discussions |

---

## Sprint Rhythm

**Weekly Cadence:** {sprint_start_day} → {sprint_end_day}

| Day | Activity |
|-----|----------|
| **{sprint_start_day} AM** | Sprint Planning (plan the week ahead) |
| **{sprint_start_day}-{day_before_end}** | Development work{work_schedule_note} |
| **{sprint_end_day}** | Sprint wrap-up (complete stories, prepare for planning) |

**Planning Increments (PIs):** {sprint_duration}-week sprints{sprint_note}.

---

## Active Epics

<!-- active-epics-start -->
*No epics yet. Create one with: "Create an epic for [initiative]"*
<!-- active-epics-end -->

---

## Current PI

<!-- current-pi-start -->
*No active PI. Start one with: "Start PI planning for week [N]"*
<!-- current-pi-end -->

---

## Recent Activity

<!-- recent-activity-start -->
| Date | Action | Item |
|------|--------|------|
| {created_date} | Created | Planning Dashboard |
<!-- recent-activity-end -->

---

## Velocity Trend

<!-- velocity-start -->
*Velocity tracking will appear after completing your first PI.*
<!-- velocity-end -->

---

## Planning Commands

| Command | Action |
|---------|--------|
| "Create an epic for [topic]" | Start a new initiative |
| "Break down [epic] into features" | Decompose epic |
| "Create stories for [feature]" | Add user stories |
| "Start PI planning for week [N]" | Begin a sprint |
| "Move [story] to [status]" | Update Kanban |
| "Update status" | Regenerate dashboard |
| "Run retrospective" | End-of-PI review |

---

## Documents

### Planning Documents

<!-- planning-docs-start -->
{brainstorming_link}
{backlog_link}
<!-- planning-docs-end -->

### Epics

<!-- epics-list-start -->
*No epics yet.*
<!-- epics-list-end -->

### Features

<!-- features-list-start -->
*No features yet.*
<!-- features-list-end -->

### Stories

<!-- stories-list-start -->
*No stories yet.*
<!-- stories-list-end -->

---

## Getting Started

1. **Create an Epic**: Define a high-level initiative
   ```
   "Create an epic for user authentication"
   ```

2. **Break Down into Features**: Decompose the epic
   ```
   "Break down epic-001 into features"
   ```

3. **Create User Stories**: Add sized work items
   ```
   "Create stories for feat-001"
   ```

4. **Start a PI**: Plan your weekly sprint
   ```
   "Start PI planning for week 5"
   ```

5. **Track Progress**: Move stories through Kanban
   ```
   "Move story-001 to done"
   ```

---

*See [Planning Assistant Skill](../../.claude/skills/planning-assistant/SKILL.md) for full documentation.*
