# Docs Organizer Initialization Workflow

Automatically detects when documentation structure is missing and guides user through setup.

---

## Trigger Conditions

This workflow activates when ANY of these conditions are true:

1. **No docs folder exists** at the configured `docs_root` path
2. **No master index** (README.md or configured index file missing)
3. **User explicitly requests**: "Setup documentation system", "Initialize docs", "Bootstrap docs"
4. **First-time use detected**: Skill invoked but config.yaml has never been customized

---

## Detection Logic

```
1. Check if config.yaml exists
   - If missing → Use default config, proceed to interview
   - If exists → Read configured paths

2. Check if docs_root folder exists
   - If missing → Trigger initialization
   - If exists → Check for master index

3. Check for master index file
   - docs/README.md or configured path
   - If missing → Offer to create

4. Check watch_paths configuration
   - If using defaults → Ask if user wants custom paths
   - If custom → Verify paths exist

5. Check for existing docs without front matter
   - If found → Offer to add front matter to existing docs
```

---

## Initialization Interview

When initialization is triggered, conduct this interview:

### Question 1: Documentation Root

**Question:** "Where would you like to store your project documentation?"

**Options:**
- `docs/` (Recommended - standard location)
- `documentation/` (Alternative naming)
- Project root (no subfolder)
- Custom path (user specifies)

**Default:** `docs/`

### Question 2: Master Index Location

**Question:** "What should I name the master documentation index?"

**Options:**
- `README.md` (Recommended - standard GitHub convention)
- `INDEX.md` (Alternative)
- `DOCUMENTATION.md` (Explicit naming)
- Custom filename

**Default:** `README.md`

### Question 3: Watch Paths

**Question:** "Which folders should I watch for documentation files?"

**Options:**
- Just docs/ (Recommended for simple projects)
- docs/ + API docs + component READMEs (Comprehensive)
- Custom list of paths

**Suggestions based on project structure:**
- If has `api/` folder → Suggest `api/docs/`
- If has `components/` folder → Suggest `components/`
- If has `.claude/skills/` → Already included

**Default:** `[docs/, compositions/, .claude/skills/]`

### Question 4: Staleness Threshold

**Question:** "How long before a document should be flagged as potentially stale?"

**Options:**
- 90 days (Recommended - 3 months)
- 60 days (More aggressive)
- 180 days (6 months - more lenient)
- Custom days

**Default:** 90 days

### Question 5: Auto-Behaviors

**Question:** "Should I automatically fix minor documentation issues?"

**Auto-behaviors to configure:**
- Auto-add missing front matter: Yes/No (Default: Yes)
- Auto-suggest tags for new docs: Yes/No (Default: Yes)
- Auto-update master index: Yes/No (Default: Yes)
- Auto-generate TOC for long docs: Yes/No (Default: Yes)

**Quick choices:**
- "Hands-off" (All yes - Recommended)
- "Conservative" (All no - manual control)
- "Custom" (Choose individually)

**Default:** Hands-off

### Question 6: Existing Documentation

**Question:** "I found {count} existing markdown files without front matter. Should I add it?"

**Options:**
- Yes, add front matter to all existing docs (Recommended)
- Yes, but let me review each one first
- No, I'll handle it manually

**Default:** Yes, add to all

---

## Setup Actions

After gathering preferences, perform these actions:

### 1. Update config.yaml

```yaml
# Write user preferences to config.yaml
paths:
  docs_root: {user_choice}
  master_index: {docs_root}/{index_filename}
  watch_paths:
    {user_selected_paths}

settings:
  stale_threshold_days: {user_choice}
  stale_warning_days: {threshold * 2}
  stale_archive_days: {threshold * 4}
  auto_add_front_matter: {user_choice}
  auto_suggest_tags: {user_choice}
  auto_update_index: {user_choice}
  toc_min_lines: 200
  warn_length_lines: 500

# Mark as initialized
_initialized: true
_initialized_date: {current_date}
```

### 2. Create Documentation Folder

```bash
mkdir -p {docs_root}
```

### 3. Create Master Index

Use template from `templates/index.md` with:
- Project title (from package.json, README.md, or ask user)
- Documentation categories
- Empty sections for Planning, Specs, Notes, Reference, Guides
- Auto-generated "Recently Updated" section

**Example structure:**

```markdown
---
title: Project Documentation
created: 2026-01-28
updated: 2026-01-28
status: active
type: reference
author: ""
ai_model: Claude Sonnet 4.5
tags: [documentation, index]
related: []
---

# Project Documentation

Documentation index for [Project Name].

---

## Table of Contents

- [Planning](#planning) - Roadmaps, feature planning, brainstorms
- [Specifications](#specifications) - Technical specs, API docs
- [Notes](#notes) - Meeting notes, research, webinar notes
- [Reference](#reference) - How-to guides, references
- [Guides](#guides) - Tutorials, walkthroughs

---

## Planning

<!-- planning-docs-start -->
*No planning documents yet.*
<!-- planning-docs-end -->

---

## Specifications

<!-- spec-docs-start -->
*No specification documents yet.*
<!-- spec-docs-end -->

---

## Notes

<!-- notes-docs-start -->
*No notes yet.*
<!-- notes-docs-end -->

---

## Reference

<!-- reference-docs-start -->
*No reference documents yet.*
<!-- reference-docs-end -->

---

## Guides

<!-- guide-docs-start -->
*No guides yet.*
<!-- guide-docs-end -->

---

## Recently Updated

<!-- recently-updated-start -->
*Documentation index created. Add your first document!*
<!-- recently-updated-end -->

---

*Maintained by [Docs Organizer Skill](../.claude/skills/docs-organizer/skill.md)*
```

### 4. Process Existing Documentation

If existing docs found without front matter:

For each document:
1. Infer fields (title from H1, type from location/filename)
2. Add front matter with inferred + default values
3. Add to master index under appropriate category
4. Log in "Recently Updated" section

### 5. Create Document Templates Folder (Optional)

```bash
mkdir -p {docs_root}/templates/
```

Copy templates from skill:
- planning-doc.md
- meeting-notes.md
- spec.md

### 6. Summary Report

Show the user what was created:

```
✅ Documentation system initialized!

📁 Created structure:
   {docs_root}/
   ├── README.md (master index)
   └── templates/ (optional)

⚙️ Configuration saved to:
   .claude/skills/docs-organizer/config.yaml

📊 Processed {count} existing documents:
   - Added front matter to {count} files
   - Indexed {count} files in master index

🔍 Watch paths configured:
   - docs/
   - compositions/
   - .claude/skills/

📋 Next steps:
   - "Create a new document for [topic]" to add docs
   - "Run a documentation health check" to see status
   - Review {docs_root}/README.md to see indexed docs

Documentation system ready!
```

---

## Proactive Detection Messages

When the skill detects missing structure, show helpful messages:

### Missing Docs Folder

```
I notice you don't have a documentation folder set up yet.

Would you like me to initialize the documentation system? I'll ask a few
questions to customize it for your project (takes ~1 minute).

Say "yes" to set up, or "skip" if you prefer to do it manually.
```

### Missing Master Index

```
I see you have a {docs_root}/ folder but no master index (README.md).

Want me to create one? I'll scan your existing docs and organize them
automatically.
```

### Existing Docs Without Front Matter

```
I found {count} markdown files in {docs_root}/ without front matter:
- {file1.md}
- {file2.md}
- ... and {count - 2} more

Should I add standardized front matter to these files?
(I'll preserve all existing content)
```

### Empty Config

```
I notice config.yaml hasn't been customized for this project yet.

The docs system will work with defaults, but I recommend a quick setup
to match your documentation structure and preferences.

Run "setup documentation system" when you're ready.
```

---

## Re-initialization

If user runs "setup documentation system" when structure already exists:

```
I see you already have a documentation system at {docs_root}/.

Options:
1. Reconfigure (update config.yaml with new preferences)
2. Rebuild index (rescan and regenerate master index)
3. Add front matter (process docs missing front matter)
4. Reset (archive current, start fresh)
5. Cancel

What would you like to do?
```

**Reconfigure:**
- Re-run interview
- Update config.yaml
- Don't modify existing docs
- Rebuild index with new settings

**Rebuild index:**
- Rescan all docs in watch_paths
- Regenerate master index
- Fix broken links
- Update "Recently Updated"

**Add front matter:**
- Scan for docs without front matter
- Interview for each (or use defaults)
- Update master index

**Reset:**
- Move existing docs/ to docs-backup-{date}/
- Run full initialization
- Start completely fresh

---

## Integration with Planning Assistant

After docs initialization:

1. If planning-assistant skill is present → Ask if they want to initialize planning too
2. Link planning dashboard to master index
3. Add planning docs to appropriate categories

**Integration prompt:**

```
I see you also have the Planning Assistant skill installed.

Would you like me to initialize the planning system as well?
This will create a planning folder structure integrated with your docs.

(yes / no / already set up)
```

---

## Example Session

**User opens project without docs structure**

```
Claude: I notice this project doesn't have a documentation system set up yet.

I can initialize one for you with a few quick questions. This will create:
- Documentation folder and master index
- Front matter for existing docs
- Automatic organization and health tracking

Want to set it up now? (yes / skip / tell me more)
```

**User: "yes"**

```
Claude: Great! I found 3 existing markdown files in your project:
- README.md (project root)
- api-design.md
- meeting-notes.md

Let me ask a few questions to customize the documentation system:

1. Where should documentation live?
   • docs/ (Recommended)
   • documentation/
   • Custom

2. Auto-fix minor issues?
   • Yes - Hands-off (Recommended)
   • No - Manual control

Or say "use defaults" to skip.
```

**User: "use defaults"**

```
Claude: Perfect! Setting up with:
- Location: docs/
- Auto-behaviors: Enabled (hands-off)
- Staleness: 90 days
- Watch paths: docs/, compositions/, .claude/skills/

[Processes existing files...]

✅ Documentation system initialized!

📁 Created: docs/README.md (master index)

📊 Processed existing files:
   ✓ api-design.md → Added front matter, indexed
   ✓ meeting-notes.md → Added front matter, indexed
   ℹ README.md → Skipped (project root)

🔍 Health check: 2 docs, 100% have front matter

Try:
- "Create a spec for [topic]"
- "Run a documentation health check"
- Open docs/README.md to see your index
```

---

## Implementation Checklist

When implementing this workflow:

- [ ] Add detection logic to skill activation
- [ ] Create interview questions as AskUserQuestion calls
- [ ] Generate config.yaml with user preferences
- [ ] Create docs folder structure
- [ ] Generate master index from template
- [ ] Scan for existing docs without front matter
- [ ] Add front matter to existing docs if approved
- [ ] Build initial index with all docs
- [ ] Show summary report
- [ ] Trigger planning-assistant integration if available
- [ ] Add initialization status to config.yaml (mark as initialized)
