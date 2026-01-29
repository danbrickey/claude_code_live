# Documentation Organizer Skill

Proactively evaluates, indexes, and organizes project documentation. Auto-applies minor fixes while requesting approval for structural changes.

## What This Skill Enables

When this skill is active, Claude Code can:

- **Interview on creation**: Ask brief questions to gather front matter when creating documents
- **Suggest tags**: AI-analyze document content and suggest relevant tags
- **Detect stale docs**: Flag documents not updated in >90 days for review or archival
- **Suggest cross-references**: Recommend links between related documents
- **Generate TOC**: Auto-create table of contents for documents >200 lines
- Evaluate documents against quality criteria (front matter, structure, cross-refs)
- Auto-add missing front matter with sensible defaults
- Maintain a documentation index at `docs/README.md`
- Suggest document splits, merges, and reorganization
- Detect orphaned documents not referenced anywhere
- Proactively suggest improvements when docs seem disorganized

## Proactive Triggers

This skill activates automatically when:

- User creates or edits a document in `docs/`, `compositions/`, or `skills/`
- User asks about documentation or project organization
- User mentions "organize", "structure", "index", "docs", "documentation"
- A document is opened that has missing front matter
- During commits that touch documentation files
- User creates a new markdown file anywhere in the project

**See:** `rubrics/triggers.md` for detailed activation conditions.

## Core Concepts

### Front Matter Schema

All documents should have YAML front matter:

```yaml
---
title: Document Title
created: 2026-01-28
updated: 2026-01-28
status: draft | active | archived
type: planning | notes | spec | reference | guide
author: Author Name
ai_model: Claude Opus 4  # or ~ if not AI-generated
tags: [tag1, tag2]
related: [path/to/doc1.md, path/to/doc2.md]
---
```

**Key fields:**
- `author` - Always required. The person who created/owns the document.
- `ai_model` - Always present. Use `~` (YAML null) for human-authored docs, or the model name (e.g., "Claude Opus 4") for AI-assisted content.

**See:** `templates/front-matter.yaml` for the complete schema with defaults.

### Document Types

| Type | Purpose | Template |
|------|---------|----------|
| `planning` | Feature brainstorms, roadmaps, proposals | `templates/planning-doc.md` |
| `notes` | Meeting notes, webinar notes, research | `templates/meeting-notes.md` |
| `spec` | Technical specifications, API docs | `templates/spec.md` |
| `reference` | How-to guides, references | — |
| `guide` | Tutorials, walkthroughs | — |

### Change Classification

| Change Type | Autonomy | Examples |
|-------------|----------|----------|
| **Minor** | Auto-apply | Add missing front matter, fix date formats, update "last modified", add to index, backfill author/ai_model fields |
| **Major** | Ask first | Split document, move to different folder, create new folders, merge documents |

## How to Invoke

### Explicit Commands

- "Run a documentation health check"
- "Organize my docs folder"
- "Add front matter to this document"
- "Create a documentation index"
- "Evaluate this document against the style guide"
- "What documents are missing front matter?"
- "Suggest tags for this document"
- "Show stale documents" / "What docs need updating?"
- "Suggest related documents" / "Find cross-references"
- "Add a table of contents" / "Generate TOC"

### Context-Based (Proactive)

The skill automatically suggests improvements when:
- Opening a document without front matter
- Creating a new document
- A document exceeds 500 lines (suggest splitting)
- A document exceeds 200 lines without TOC (suggest TOC)
- Documents reference files that don't exist (broken links)
- A document has empty tags (suggest tags)
- A document is >90 days stale (suggest review)
- Documents share topics but don't link (suggest cross-refs)

## Workflows

### Workflow 1: Document Health Check

```
1. Scan all docs (docs/, compositions/, skills/)
2. Evaluate each against rubrics/evaluation.md criteria
3. Generate health report showing:
   - Documents with missing front matter
   - Orphaned documents (not in any index)
   - Overly long documents (>500 lines)
   - Broken internal links
4. Auto-fix minor issues (with notification)
5. Propose major changes for approval
```

### Workflow 2: New Document Setup (with Interview)

When a new document is created, conduct a brief interview to gather front matter:

```
1. Analyze what can be inferred:
   - title: From filename or H1 heading
   - type: From location (docs/planning/ → planning) or filename (*-notes.md → notes)
   - created/updated: Current date
   - ai_model: If Claude is creating it, record the model; otherwise ask

2. Interview for missing information:
   - Ask only for fields that cannot be inferred
   - Allow user to skip with "no thanks" or "skip"
   - Use sensible defaults for skipped fields

3. Complete setup:
   - Add front matter with gathered/inferred values
   - Add to docs/README.md index
   - Suggest related documents based on tags/content
```

#### Interview Questions

Ask these questions **only if the information cannot be inferred** from context:

| Field | Question | Skip Default |
|-------|----------|--------------|
| `type` | "What type of document is this? (planning/notes/spec/reference/guide)" | Infer from location or use `reference` |
| `author` | "Who should be listed as the author?" | Empty string `""` |
| `ai_model` | "Was this created with AI assistance? If so, which model?" | `~` (null) |
| `tags` | "Any tags to help categorize this? (comma-separated)" | `[]` |
| `related` | "Are there related documents I should link to?" | `[]` |
| `status` | "What's the status? (draft/active/archived)" | `draft` for new docs |

#### Interview Behavior

- **Be concise**: Ask multiple questions at once when possible
- **Respect "no thanks"**: If user declines, use defaults and move on
- **Learn from context**: If user mentioned details in the creation request, don't re-ask
- **Batch questions**: Group related questions together

**Example interview:**
```
Claude: I'll set up the front matter for this document. A few quick questions:

1. Who should I list as the author?
2. Any tags for categorization? (e.g., api, backend, v2)

(I've already inferred: type=spec, status=draft, ai_model=Claude Opus 4)

Or say "skip" to use defaults.
```

### Workflow 3: Index Maintenance

After document changes:

```
1. Update docs/README.md master index
2. Update "Recently Updated" section
3. Check for broken internal links
4. Flag orphaned documents
5. Regenerate "Document Health" summary
```

### Workflow 4: Tag Suggestions

When a document has empty or minimal tags:

```
1. Analyze document content:
   - Extract key topics from headings
   - Identify technical terms (API, auth, database, etc.)
   - Note document type patterns
   - Look for product/feature names

2. Generate tag suggestions:
   - Suggest 3-5 relevant tags
   - Prioritize consistency with existing tags in project
   - Include both broad (backend) and specific (oauth) tags

3. Present to user:
   - Show suggested tags with brief reasoning
   - Allow user to accept all, pick some, or decline
   - Auto-apply if user approves
```

**Trigger phrases:**
- "Suggest tags for this document"
- "What tags should I use?"
- "Help me tag my docs"

**Proactive trigger:** During document creation interview, or when running health check on docs with empty tags.

**Example:**
```
Claude: I analyzed the content of api-design.md and suggest these tags:

Suggested tags: [api, rest, authentication, backend, v2]

Reasoning:
- "api", "rest" - Document discusses REST API endpoints
- "authentication" - OAuth section present
- "backend" - Server-side focus
- "v2" - References version 2 features

Accept all, or tell me which ones to use?
```

### Workflow 5: Stale Document Detection

Identify and handle documents that may be outdated:

```
1. Scan for stale documents:
   - Check `updated` date in front matter
   - Flag if >90 days since last update
   - Note if status is still "active"

2. Categorize by staleness:
   - 90-180 days: "Needs review"
   - 180-365 days: "Likely outdated"
   - >365 days: "Consider archiving"

3. Generate report:
   - List stale docs with last update date
   - Suggest actions (review, update, archive)
   - Offer to mark as archived or update timestamp

4. Handle user response:
   - "Still current" → Update timestamp
   - "Archive it" → Move to archived status
   - "I'll review" → No action, remind later
```

**Trigger phrases:**
- "Show stale documents"
- "What docs need updating?"
- "Find outdated documentation"

**Proactive trigger:** During health check, or when opening a stale document.

**Staleness thresholds:**

| Age | Category | Suggested Action |
|-----|----------|------------------|
| 90-180 days | Needs review | Prompt owner to verify |
| 180-365 days | Likely outdated | Suggest review or archive |
| >365 days | Stale | Recommend archiving |

**Example:**
```
Claude: Found 3 stale documents:

📅 Needs Review (90-180 days):
- docs/api-v1-spec.md (updated 4 months ago)

⚠️ Likely Outdated (180-365 days):
- docs/old-auth-flow.md (updated 8 months ago)

🗄️ Consider Archiving (>1 year):
- docs/legacy-migration.md (updated 14 months ago)

Actions:
1. Update timestamp (content is still current)
2. Mark as archived
3. I'll review later

Which documents should I update?
```

### Workflow 6: Cross-Reference Suggestions

Identify documents that should link to each other:

```
1. Analyze document relationships:
   - Scan for mentions of topics covered in other docs
   - Identify shared tags between documents
   - Look for explicit mentions of other features/systems
   - Check for complementary doc types (planning ↔ spec)

2. Generate suggestions:
   - Match documents by topic overlap
   - Prioritize high-relevance connections
   - Note the nature of the relationship

3. Present recommendations:
   - Show suggested links with reasoning
   - Indicate which `related:` field to update
   - Offer to add links automatically

4. Apply updates:
   - Add to `related:` front matter field
   - Optionally add inline links in content
   - Update both documents (bidirectional)
```

**Trigger phrases:**
- "Suggest related documents"
- "What docs should link together?"
- "Find cross-references"

**Proactive trigger:** When creating new docs, or during health check.

**Relationship types:**

| Type | Example |
|------|---------|
| **Implements** | planning doc → spec that implements it |
| **Extends** | v2-spec → v1-spec it builds on |
| **Related topic** | auth-design ↔ security-guidelines |
| **Same feature** | feature-brainstorm ↔ feature-spec |

**Example:**
```
Claude: I found some documents that should reference each other:

📎 Suggested cross-references:

1. api-design.md ↔ feature-brainstorm.md
   Reason: Both discuss the REST API feature

2. auth-spec.md ↔ security-guidelines.md
   Reason: Auth spec should reference security standards

3. webinar-notes.md → planning/feature-brainstorm.md
   Reason: Notes mention features detailed in brainstorm

Add these to the `related:` fields? (all / pick / skip)
```

### Workflow 7: Table of Contents Generation

Auto-generate navigation for long documents:

```
1. Analyze document structure:
   - Count total lines
   - Extract all headings (H2, H3, H4)
   - Build heading hierarchy

2. Determine if TOC needed:
   - >200 lines: Suggest TOC
   - >100 lines with >5 H2 sections: Suggest TOC
   - Otherwise: Skip

3. Generate TOC:
   - Create markdown links to each heading
   - Indent based on heading level
   - Place after front matter, before first H2

4. Maintain TOC:
   - Regenerate when document structure changes
   - Mark TOC section for easy identification
```

**Trigger phrases:**
- "Add a table of contents"
- "Generate TOC for this document"
- "This doc needs navigation"

**Proactive trigger:** When document exceeds 200 lines, or during health check.

**TOC format:**
```markdown
## Table of Contents

- [Section One](#section-one)
  - [Subsection A](#subsection-a)
  - [Subsection B](#subsection-b)
- [Section Two](#section-two)
- [Section Three](#section-three)

---
```

**Example:**
```
Claude: This document is 285 lines with 8 major sections. 
I recommend adding a table of contents for easier navigation.

Generated TOC:

## Table of Contents

- [Feature Categories](#feature-categories)
  - [Scene Templates & Components](#scene-templates--components)
  - [Theming & Branding](#theming--branding)
  - [Content Authoring](#content-authoring)
- [AI-Powered Features](#ai-powered-features)
- [Use Case Ideas](#use-case-ideas)
- [Competitive Landscape](#competitive-landscape)

Add this after the front matter? (yes / no / customize)
```

## Evaluation Criteria

Documents are scored on:

| Criterion | Weight | Pass Condition |
|-----------|--------|----------------|
| Front Matter | 25% | Has all required fields |
| Structure | 20% | H1 title, consistent heading levels |
| Cross-refs | 15% | Links to related docs when relevant |
| Length | 15% | Under 500 lines (or justified) |
| Indexed | 15% | Referenced in docs/README.md |
| Freshness | 10% | Updated within 90 days |

**See:** `rubrics/evaluation.md` for detailed scoring rubric.

## Integration Points

- **CLAUDE.md**: Skill is referenced in the Skills section
- **Compositions**: Extends existing YAML/MD sync patterns for video docs
- **Skills**: Applies same front matter standards to skill.md files
- **Git workflows**: Can be triggered during pre-commit checks

## Example Sessions

### Example 1: New Document with Interview

**User: "Create a new doc about our API authentication design"**

```
Claude: I'll create docs/api-authentication-design.md for you.

I can infer:
- title: API Authentication Design
- type: spec (based on content)
- status: draft
- created: 2026-01-28
- ai_model: Claude Opus 4 (I'm helping create this)

A few quick questions to complete the front matter:

1. Who should I list as the author?
2. Any tags? (e.g., api, auth, security)
3. Related docs to link? (I found: planning/feature-brainstorm.md)

Say "skip" to use defaults for any of these.
```

**User: "Dan Brickey, tags: api, auth, oauth. Skip the related."**

```
Claude: Got it! I've created the document with:

---
title: API Authentication Design
created: 2026-01-28
updated: 2026-01-28
status: draft
type: spec
author: Dan Brickey
ai_model: Claude Opus 4
tags: [api, auth, oauth]
related: []
---

Added to docs/README.md under "Specifications".
```

### Example 2: User Skips Interview

**User: "Create a quick notes doc for today's standup"**

```
Claude: I'll create docs/standup-notes-2026-01-28.md.

Quick questions for the front matter:
- Author?
- Any tags?

Or say "no thanks" to use defaults.
```

**User: "No thanks, just create it"**

```
Claude: Done! Created with default front matter:
- type: notes
- author: "" (you can fill this in later)
- ai_model: Claude Opus 4
- tags: []

Added to docs/README.md under "Notes".
```

### Example 3: Enough Context Provided

**User: "I'm Dan. Create a planning doc for the v2 roadmap, tag it with roadmap and v2"**

```
Claude: Created docs/planning/v2-roadmap.md with:

---
title: V2 Roadmap
created: 2026-01-28
updated: 2026-01-28
status: draft
type: planning
author: Dan
ai_model: Claude Opus 4
tags: [roadmap, v2]
related: [feature-brainstorm.md]
---

No questions needed - I had everything from your request!
Added to docs/README.md under "Planning".
```

**User says "run a doc health check"**

```
Claude: Here's your documentation health report:

📊 Document Health Summary
- 5 documents scanned
- 4 have complete front matter (1 missing)
- 0 orphaned documents
- 1 document over 500 lines (feature-brainstorm.md)

Issues Found:
1. docs/webinar-notes.md - Missing front matter
   → Auto-fixed: Added front matter with type: notes

2. docs/planning/feature-brainstorm.md - 183 lines, approaching limit
   → No action needed yet

Index updated at docs/README.md
```
