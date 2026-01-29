# Planning Assistant Triggers

Conditions that activate the Planning Assistant skill proactively.

## Activation Levels

| Level | Action | Example |
|-------|--------|---------|
| **Immediate** | Skill activates automatically | User says "create an epic" |
| **Suggest** | Skill offers to help | User opens epic with no features |
| **Silent** | Skill updates in background | Regenerate status.svg after changes |

---

## Trigger Categories

### 1. Explicit Commands

**Level:** Immediate

User directly requests planning actions:

| Phrase Pattern | Action |
|----------------|--------|
| "create epic", "new epic" | Create Epic workflow |
| "create feature", "new feature" | Create Feature workflow |
| "create story", "new story", "user story" | Create Story workflow |
| "break down [epic/feature]" | Decomposition workflow |
| "start PI", "sprint planning", "weekly planning" | PI Planning workflow |
| "move [story] to [status]" | Kanban update |
| "update status", "regenerate dashboard" | Status regeneration |
| "run retro", "retrospective" | Retro workflow |
| "show backlog", "what's in backlog" | Show backlog |
| "size [story]", "estimate [story]" | Sizing workflow |

---

### 2. Intent Keywords

**Level:** Suggest

User mentions planning-related concepts:

| Keywords | Suggested Action |
|----------|------------------|
| "plan", "planning", "roadmap" | Offer to create epic or review backlog |
| "initiative", "project", "goal" | Offer to create epic |
| "feature", "capability" | Offer to create or review features |
| "story", "task", "work item" | Offer to create stories |
| "points", "estimate", "size" | Offer sizing guidance |
| "sprint", "increment", "PI" | Offer PI planning |
| "progress", "status", "dashboard" | Offer to show/update status |
| "blocked", "blocker" | Offer to update status |
| "done", "complete", "finished" | Offer to mark complete |
| "retro", "retrospective", "review" | Offer retro workflow |

---

### 3. File Events

**Level:** Suggest or Silent

User interacts with planning files:

| Event | Action |
|-------|--------|
| Open epic with no features | Suggest: "Break down into features?" |
| Open feature with no stories | Suggest: "Create user stories?" |
| Open story with 0 points | Suggest: "Add story points?" |
| Open story with 21 points | Suggest: "Consider splitting this story" |
| Edit any planning doc | Silent: Regenerate status.svg |
| Create new file in `docs/planning/` | Suggest: Apply appropriate template |
| Delete planning file | Silent: Update references, status.svg |

---

### 4. Date/Time Triggers

**Level:** Suggest

Calendar-based suggestions:

| Condition | Action |
|-----------|--------|
| Start of new week | Suggest: "Start PI planning for week X?" |
| End of PI period | Suggest: "Run retrospective for this PI?" |
| Story blocked for 3+ days | Suggest: "Review blocked stories" |
| No activity on epic for 2+ weeks | Suggest: "Review epic status" |

---

### 5. State-Based Triggers

**Level:** Suggest

Based on current planning state:

| Condition | Action |
|-----------|--------|
| No active PI | Suggest: "Start a new PI?" |
| All stories in PI are done | Suggest: "Run retrospective, start new PI" |
| Feature has all stories done | Suggest: "Mark feature complete?" |
| Epic has all features done | Suggest: "Mark epic complete?" |
| Backlog has 10+ high priority items | Suggest: "Review and prioritize backlog" |
| status.svg is outdated (>1 day) | Silent: Regenerate |

---

## Suppression Rules

Do NOT trigger when:

| Condition | Reason |
|-----------|--------|
| User is in the middle of writing | Avoid interruption |
| User explicitly said "skip" or "no" | Respect user preference |
| Same suggestion made within last 5 messages | Avoid repetition |
| User is working on non-planning task | Stay contextual |
| Status.svg was just regenerated | Avoid redundant work |

---

## Trigger Phrases Reference

### Create Workflows

```
"create an epic for [topic]"
"new initiative: [name]"
"I want to plan [feature/project]"
"add a feature to [epic]"
"create stories for [feature]"
"break down [epic/feature]"
"decompose [epic/feature] into [features/stories]"
```

### Status Updates

```
"move [story-XXX] to done"
"mark [story-XXX] as blocked"
"[story-XXX] is complete"
"update [story-XXX] status to [status]"
"start working on [story-XXX]"
```

### Queries

```
"show planning status"
"what's the progress on [epic/feature]?"
"what's in the backlog?"
"what stories are blocked?"
"how many points this PI?"
"what's our velocity?"
```

### Planning Sessions

```
"start sprint planning"
"begin PI planning for week [N]"
"plan the next increment"
"what should we work on next?"
"run a retrospective"
"end this PI"
```

---

## Integration with docs-organizer

When creating new planning documents, also trigger docs-organizer for:

- Front matter interview (author, tags)
- Index update (docs/README.md)
- Related document suggestions

Planning-specific front matter (epic_id, points, etc.) is handled by this skill directly.
