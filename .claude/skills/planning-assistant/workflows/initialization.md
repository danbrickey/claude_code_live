# Planning Assistant Initialization Workflow

Automatically detects when planning structure is missing and guides user through setup.

---

## Trigger Conditions

This workflow activates when ANY of these conditions are true:

1. **No planning folder exists** at the configured `planning_root` path
2. **Empty planning folder** (no epics/, features/, stories/ subdirectories)
3. **User explicitly requests**: "Setup planning system", "Initialize planning", "Bootstrap planning"
4. **First-time use detected**: Skill invoked but config.yaml has never been customized

---

## Detection Logic

```
1. Check if config.yaml exists
   - If missing → Use default config, proceed to interview
   - If exists → Read configured paths

2. Check if planning_root folder exists
   - If missing → Trigger initialization
   - If exists → Check for subdirectories

3. Check for required subdirectories
   - epics/, features/, stories/, increments/
   - If any missing → Offer to create structure

4. Check for dashboard files
   - README.md, status.svg
   - If missing → Offer to create

5. Check for starter files
   - brainstorming.md, backlog.md
   - If missing → Offer to create (optional)
```

---

## Initialization Interview

When initialization is triggered, conduct this interview:

### Question 1: Planning Root

**Question:** "Where would you like to store planning documents?"

**Options:**
- `docs/planning/` (Recommended - standard structure)
- `planning/` (Simpler, at project root)
- `documentation/agile/` (Alternative naming)
- Custom path (user specifies)

**Default:** `docs/planning/`

### Question 2: Sprint Cadence

**Question:** "When does your sprint week start and end?"

**Options:**
- Sunday → Saturday (Recommended for weekend-focused work)
- Monday → Sunday (Traditional work week)
- Custom days

**Default:** Sunday → Saturday

### Question 3: Sprint Duration

**Question:** "How long is your sprint?"

**Options:**
- 1 week (Recommended for solo/small teams)
- 2 weeks (Standard agile)
- Custom duration

**Default:** 1 week

### Question 4: Fibonacci Limit

**Question:** "What's the maximum story point size before breakdown is required?"

**Options:**
- 21 (Recommended - epic-sized work)
- 13 (More granular)
- 8 (Very granular)

**Default:** 21

### Question 5: Auto-Behaviors

**Question:** "Should I automatically update the status dashboard when planning changes?"

**Options:**
- Yes (Recommended - hands-off approach)
- No (Manual control)

**Default:** Yes

### Question 6: Starter Files

**Question:** "Would you like me to create starter files for brainstorming and backlog?"

**Options:**
- Yes (Recommended - gives you templates to start with)
- No (I'll create them myself later)

**Default:** Yes

---

## Setup Actions

After gathering preferences, perform these actions:

### 1. Update config.yaml

```yaml
# Write user preferences to config.yaml
paths:
  planning_root: {user_choice}
  epics: {planning_root}/epics
  features: {planning_root}/features
  stories: {planning_root}/stories
  increments: {planning_root}/increments
  dashboard: {planning_root}/README.md
  status_svg: {planning_root}/status.svg
  backlog: {planning_root}/backlog.md
  brainstorming: {planning_root}/brainstorming.md

settings:
  sprint_duration: {user_choice}
  sprint_start_day: {user_choice}
  sprint_end_day: {calculated_from_start_and_duration}
  fibonacci_max: {user_choice}
  auto_update_status: {user_choice}
  auto_link_bidirectional: true
  pi_format: "pi-{year}-w{week}"
```

### 2. Create Folder Structure

```bash
mkdir -p {planning_root}/epics
mkdir -p {planning_root}/features
mkdir -p {planning_root}/stories
mkdir -p {planning_root}/increments
```

### 3. Create Dashboard (README.md)

Use template from `templates/dashboard.md` with:
- Sprint rhythm section (from user's cadence choice)
- Empty status placeholders
- Quick links to epics/features/stories
- Getting started guide

### 4. Create Initial Status SVG

Generate a placeholder status.svg showing:
- "No active planning yet"
- Instructions to create first epic

### 5. Create Starter Files (if requested)

**brainstorming.md:**
- Use template from project (or create from scratch)
- Pre-fill sprint cadence section
- Add to dashboard

**backlog.md:**
- Use template from project (or create from scratch)
- Empty tables ready for ideas
- Add to dashboard

### 6. Summary Report

Show the user what was created:

```
✅ Planning system initialized!

📁 Created structure:
   {planning_root}/
   ├── epics/
   ├── features/
   ├── stories/
   ├── increments/
   ├── README.md (dashboard)
   ├── status.svg
   ├── brainstorming.md
   └── backlog.md

⚙️ Configuration saved to:
   .claude/skills/planning-assistant/config.yaml

🎯 Sprint cadence: {start_day} → {end_day} ({duration})

📋 Next steps:
   - "Create an epic for [initiative]" to start planning
   - Open brainstorming.md for your first PI planning session
   - Review config.yaml to customize further

Ready to start planning!
```

---

## Proactive Detection Messages

When the skill detects missing structure, show helpful messages:

### Missing Planning Folder

```
I notice you don't have a planning folder set up yet.

Would you like me to initialize the planning system? I'll ask a few questions
to customize it for your project (takes ~1 minute).

Say "yes" to set up, or "skip" if you'll do it manually.
```

### Partial Structure

```
I see you have {planning_root}/ but it's missing some subdirectories:
- Missing: epics/, features/, stories/

Want me to create the missing folders and set up the dashboard?
```

### Empty Config

```
I notice config.yaml hasn't been customized for this project yet.

The planning system will work with defaults, but I recommend a quick setup
to match your sprint cadence and folder preferences.

Run "setup planning system" when you're ready.
```

---

## Re-initialization

If user runs "setup planning system" when structure already exists:

```
I see you already have a planning system at {planning_root}/.

Options:
1. Reconfigure (update config.yaml with new preferences)
2. Add missing pieces (create any missing folders/files)
3. Reset (archive current, start fresh)
4. Cancel

What would you like to do?
```

**Reconfigure:**
- Re-run interview
- Update config.yaml
- Don't delete existing docs
- Create any missing folders

**Add missing pieces:**
- Skip interview
- Create missing folders/files only
- Keep existing config

**Reset:**
- Move existing planning/ to planning-backup-{date}/
- Run full initialization
- Start completely fresh

---

## Integration with Docs Organizer

After planning initialization:

1. Trigger docs-organizer to add planning docs to master index
2. Apply front matter to brainstorming.md and backlog.md
3. Link planning dashboard to docs/README.md

---

## Example Session

**User opens project without planning structure**

```
Claude: I notice this project doesn't have a planning system set up yet.

I can initialize one for you with a few quick questions. This will create:
- Folder structure for epics, features, and stories
- A planning dashboard and status tracker
- Starter files for brainstorming and backlog

Want to set it up now? (yes / skip / tell me more)
```

**User: "yes"**

```
Claude: Great! Let me ask a few questions to customize it for your project:

1. Where should planning docs live?
   • docs/planning/ (Recommended)
   • planning/
   • Custom path

2. Sprint schedule?
   • Sunday → Saturday (Recommended for weekend work)
   • Monday → Sunday (Traditional)

3. Sprint duration?
   • 1 week (Recommended)
   • 2 weeks

Or say "use defaults" to skip these questions.
```

**User: "use defaults"**

```
Claude: Perfect! Setting up with:
- Location: docs/planning/
- Schedule: Sunday → Saturday (1 week sprints)
- Max story points: 21

[Creates structure...]

✅ Planning system initialized!

📁 Created: docs/planning/
   ├── epics/
   ├── features/
   ├── stories/
   ├── increments/
   ├── README.md
   ├── brainstorming.md
   └── backlog.md

You're ready to start planning! Try:
- "Create an epic for [your initiative]"
- Open brainstorming.md to plan your first sprint
```

---

## Implementation Checklist

When implementing this workflow:

- [ ] Add detection logic to skill activation
- [ ] Create interview questions as AskUserQuestion calls
- [ ] Generate config.yaml with user preferences
- [ ] Create folder structure
- [ ] Generate dashboard from template
- [ ] Create placeholder status.svg
- [ ] Create starter files if requested
- [ ] Show summary report
- [ ] Trigger docs-organizer integration
- [ ] Add initialization status to config.yaml (mark as initialized)
