---
title: Skill Portability Guide
created: 2026-01-28
updated: 2026-01-28
status: active
type: reference
author: ""
ai_model: Claude Sonnet 4.5
tags: [skills, portability, configuration]
related: []
---

# Skill Portability Guide

How to move skills between projects while maintaining their configuration and functionality.

---

## Overview

Skills in `.claude/skills/` are designed to be **portable** - you can copy them to different projects and customize their behavior via `config.yaml` files.

---

## Quick Start: Moving Skills to a New Project

### Method 1: Automatic Initialization (Recommended)

**The easiest way - let the skill set everything up for you:**

```bash
# 1. Copy the skill folder
cp -r .claude/skills/planning-assistant /path/to/new-project/.claude/skills/

# 2. Start using Claude in the new project
# The skill will detect missing structure and offer to initialize automatically!

# 3. Say "yes" when prompted
# Answer a few quick questions about your preferences

# 4. Done! The skill creates folders, config, and starter files
```

**What gets auto-created:**
- Folder structure (epics/, features/, stories/, etc.)
- config.yaml with your preferences
- Dashboard and starter files
- Integration with docs-organizer (if present)

**See:** `workflows/initialization.md` in each skill for details.

### Method 2: Manual Setup

**If you prefer more control:**

```bash
# 1. Copy the skill folder
cp -r .claude/skills/planning-assistant /path/to/new-project/.claude/skills/
```

```yaml
# 2. Customize config.yaml
# planning-assistant/config.yaml
paths:
  planning_root: docs/planning  # Or wherever you want planning docs
  epics: docs/planning/epics
  # ... etc
```

```bash
# 3. Create folder structure manually
mkdir -p docs/planning/{epics,features,stories,increments}
```

```bash
# 4. Or ask Claude to set it up
"Setup the planning system in this project"
```

### Start Using the Skill

The skill will now operate using your customized paths and settings!

---

## Skill-Specific Portability

### Planning Assistant

**What's portable:**
- ✅ Templates (epic, feature, story, retro, PI goals)
- ✅ Rubrics (sizing guide, triggers)
- ✅ Generators (status.svg generator)
- ✅ Configuration (paths, sprint cadence, fibonacci limits)

**What you need to customize:**
- `config.yaml` → Adjust paths if not using `docs/planning/`
- Sprint settings → Update `sprint_start_day`, `sprint_duration` if different

**Project-specific files (NOT portable):**
- Your actual epics, features, stories in `docs/planning/`
- Your `status.svg` and `README.md` dashboard

**How to port:**

**Option A - Automatic (Recommended):**
1. Copy `.claude/skills/planning-assistant/` to new project
2. Use skill in new project → It auto-detects missing structure
3. Answer initialization interview questions (30 seconds)
4. Done! Folders, config, and starter files created automatically

**Option B - Manual:**
1. Copy `.claude/skills/planning-assistant/` to new project
2. Edit `config.yaml` to match new project paths
3. Create folder structure (or ask Claude to do it)
4. Optionally copy starter files: `brainstorming.md`, `backlog.md`

---

### Docs Organizer

**What's portable:**
- ✅ Templates (front-matter, planning-doc, meeting-notes, spec, index)
- ✅ Rubrics (evaluation criteria, triggers)
- ✅ Configuration (staleness thresholds, auto-behaviors)

**What you need to customize:**
- `config.yaml` → Adjust `docs_root` and `watch_paths`
- Front matter schema → Add/remove document types if needed

**Project-specific files (NOT portable):**
- Your actual documentation in `docs/`
- Your `docs/README.md` master index

**How to port:**

**Option A - Automatic (Recommended):**
1. Copy `.claude/skills/docs-organizer/` to new project
2. Create a document or ask about docs → Skill auto-detects missing structure
3. Answer initialization interview questions (30 seconds)
4. Done! Docs folder, index, and front matter added automatically

**Option B - Manual:**
1. Copy `.claude/skills/docs-organizer/` to new project
2. Edit `config.yaml` to set `docs_root` and `watch_paths`
3. Run a documentation health check to initialize index

---

## Configuration Patterns

### Path Customization

**Default paths (if you use these, minimal config needed):**

```
project/
├── .claude/
│   └── skills/
│       ├── planning-assistant/
│       └── docs-organizer/
├── docs/
│   ├── README.md
│   └── planning/
│       ├── epics/
│       ├── features/
│       └── stories/
```

**Custom paths example:**

```yaml
# If your project uses a different structure
paths:
  planning_root: documentation/agile-planning
  docs_root: documentation
  master_index: documentation/INDEX.md
```

### Behavior Customization

**Adjust auto-behaviors per project:**

```yaml
# More conservative (fewer automatic changes)
settings:
  auto_add_front_matter: false  # Ask before adding
  auto_update_status: false     # Manual status updates

# More aggressive (hands-off)
settings:
  auto_add_front_matter: true
  auto_update_index: true
  auto_suggest_tags: true
```

---

## Skill Bundles

You can create **skill bundles** that package multiple related skills together.

### Example: Agile Planning Bundle

```
.claude/
└── skill-bundles/
    └── agile-planning/
        ├── README.md
        ├── skills/
        │   ├── planning-assistant/
        │   └── docs-organizer/
        └── starter-files/
            ├── planning/
            │   ├── brainstorming.md
            │   └── backlog.md
            └── README.md
```

**To use a bundle:**
1. Copy entire bundle to new project
2. Run bundle setup script (or manually copy starter files)
3. Customize each skill's config.yaml

---

## Checklist: Porting Planning Assistant + Docs Organizer

### Automatic Initialization Method (Recommended)

- [ ] Copy `.claude/skills/planning-assistant/` to new project
- [ ] Copy `.claude/skills/docs-organizer/` to new project
- [ ] Use Claude in the new project - ask it to create a document or plan something
- [ ] Say "yes" when prompted to initialize documentation system
- [ ] Say "yes" when prompted to initialize planning system
- [ ] Answer quick questions about preferences (30 seconds each)
- [ ] Test the skills:
  - [ ] "Create an epic for [something]"
  - [ ] "Run a documentation health check"
- [ ] ✅ Done! Skills are fully set up and configured

### Manual Setup Method

- [ ] Copy `.claude/skills/planning-assistant/` to new project
- [ ] Copy `.claude/skills/docs-organizer/` to new project
- [ ] Edit `planning-assistant/config.yaml`:
  - [ ] Update `paths.planning_root` if not using `docs/planning/`
  - [ ] Set `settings.sprint_start_day` (sunday/monday/etc)
  - [ ] Adjust `settings.fibonacci_max` if needed
- [ ] Edit `docs-organizer/config.yaml`:
  - [ ] Update `paths.docs_root` if not using `docs/`
  - [ ] Update `paths.watch_paths` to match your doc locations
  - [ ] Set `settings.stale_threshold_days` to your preference
- [ ] Create folder structure:
  - [ ] `docs/planning/{epics,features,stories,increments}/`
  - [ ] `docs/README.md` (or your master index location)
- [ ] Optional: Copy starter files
  - [ ] `brainstorming.md` template
  - [ ] `backlog.md` template
  - [ ] `README.md` planning dashboard template
- [ ] Test the skills:
  - [ ] "Create an epic for [something]"
  - [ ] "Run a documentation health check"

---

## Best Practices

### 1. Version Control Your Config

Commit `config.yaml` files to version control so your team shares the same settings:

```bash
git add .claude/skills/*/config.yaml
git commit -m "Configure planning and docs skills for this project"
```

### 2. Document Your Customizations

Add a note in your project's README or CLAUDE.md:

```markdown
## Planning System

This project uses Planning Assistant with weekly sprints (Sun→Sat).
Config: `.claude/skills/planning-assistant/config.yaml`
```

### 3. Keep Skills Updated

When you improve a skill in one project, you can:
1. Copy the updated skill folder to other projects
2. Preserve each project's `config.yaml` (don't overwrite)
3. Review any new config options and merge if needed

### 4. Create Project Templates

For projects you create frequently:
1. Create a "template" project with pre-configured skills
2. Use it as a starting point for new projects
3. Adjust `config.yaml` as needed per-project

---

## Troubleshooting

**Skill can't find files:**
- Check `config.yaml` paths match your actual folder structure
- Ensure folders exist (create them if missing)
- Verify paths are relative to project root

**Front matter conflicts:**
- Check if projects use different front matter schemas
- Adjust `docs-organizer/config.yaml` `valid_types` to match
- Extend with custom types if needed

**Wrong sprint cadence:**
- Update `planning-assistant/config.yaml` `sprint_start_day`
- Adjust `sprint_duration` if using 2-week sprints

---

## Examples

### Example 1: Different Planning Structure

**Old project:**
```
docs/planning/
├── epics/
├── features/
└── stories/
```

**New project uses:**
```
planning/
├── initiatives/  # instead of epics
├── work-items/   # instead of features
└── tasks/        # instead of stories
```

**Update config.yaml:**
```yaml
paths:
  planning_root: planning
  epics: planning/initiatives
  features: planning/work-items
  stories: planning/tasks
```

### Example 2: Documentation in Multiple Locations

**Project has docs in several places:**
```
docs/           # Main docs
api/docs/       # API documentation
components/     # Component READMEs
```

**Update docs-organizer config.yaml:**
```yaml
paths:
  docs_root: docs
  watch_paths:
    - docs/
    - api/docs/
    - components/
```

---

*For more help, see individual skill SKILL.md files or ask Claude: "How do I configure the [skill-name]?"*
