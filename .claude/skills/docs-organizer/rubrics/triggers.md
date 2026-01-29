# Proactive Trigger Conditions

This document defines when the docs-organizer skill should activate proactively without explicit user request.

## Trigger Categories

### 1. File Events

| Trigger | Action | Priority |
|---------|--------|----------|
| New markdown file created in `docs/` | Suggest front matter, add to index | High |
| New markdown file created in `.claude/skills/` | Suggest skill template structure | Medium |
| Markdown file edited | Update `updated` date if front matter exists | Low |
| Markdown file deleted | Remove from index, check for broken links | Medium |

### 2. User Intent Signals

Activate when user message contains:

**High Priority (always activate):**
- "organize docs"
- "documentation health"
- "doc health check"
- "index my docs"
- "add front matter"
- "documentation audit"
- "suggest tags"
- "find stale docs" / "outdated docs"
- "suggest related docs" / "cross-references"
- "add table of contents" / "generate TOC"

**Medium Priority (suggest activation):**
- "organize", "structure" (in context of docs)
- "where is the documentation for"
- "how are docs organized"
- "create a new doc"

**Low Priority (mention availability):**
- "docs", "documentation" (general mention)
- "markdown", "readme"

### 3. Context Detection

| Context | Trigger Condition | Action |
|---------|-------------------|--------|
| Document opened | No front matter detected | Offer to add front matter |
| Document opened | Over 500 lines | Suggest splitting |
| Document opened | Over 200 lines, no TOC | Suggest table of contents |
| Document opened | Empty `tags: []` | Suggest tags based on content |
| Document opened | `updated` >90 days ago | Flag as stale, suggest review |
| Document opened | `status: draft` for >30 days | Suggest review |
| Document opened | Mentions topics in other docs | Suggest cross-references |
| Commit staged | Docs modified | Offer health check on changed files |
| New project | No docs/README.md exists | Offer to create index |

### 4. Periodic Suggestions

Not automated, but suggest when:

| Condition | Suggestion |
|-----------|------------|
| 7+ days since last doc health check | "Would you like a documentation health check?" |
| 3+ new docs since last index update | "The docs index may need updating" |
| Orphaned docs detected | "I found X documents not in the index" |
| Docs with empty tags found | "X documents could use better tags" |
| Stale docs detected (>90 days) | "X documents haven't been updated recently" |
| Missing cross-refs detected | "Some docs mention topics that should link together" |
| Long docs without TOC | "X long documents could use a table of contents" |

---

## Activation Behavior

### High Priority Triggers
- Activate immediately
- Auto-apply minor fixes
- Present findings and suggestions

### Medium Priority Triggers
- Ask before activating: "I can help organize your documentation. Would you like me to run a health check?"
- Wait for confirmation

### Low Priority Triggers
- Mention capability in passing: "By the way, I can help organize docs if needed."
- Don't interrupt current task

---

## Suppression Rules

Do NOT activate when:

| Condition | Reason |
|-----------|--------|
| User is in middle of code task | Don't interrupt coding flow |
| Same file checked in last 5 minutes | Avoid repetitive suggestions |
| User declined health check in session | Respect user preference |
| File is in `node_modules/`, `.git/`, `dist/` | Ignore build/dependency files |
| File is auto-generated (noted in front matter) | Skip generated docs |

---

## Trigger Examples

### Example 1: New Document Created (with Interview)

```
User: "Create a doc for the new caching feature"

Claude:
"I'll create docs/caching-feature.md for you.

I can infer:
- title: Caching Feature
- type: planning (from content)
- status: draft
- ai_model: Claude Opus 4

Quick questions:
1. Author name?
2. Tags? (e.g., caching, performance, backend)

Say 'skip' for defaults."

User: "skip"

Claude:
"Created with defaults. You can update the author field later.
Added to docs/README.md under 'Planning'."
```

### Example 2: Opening Document Without Front Matter

```
User opens: docs/webinar-notes.md (no front matter)

Claude (subtle):
"This document doesn't have front matter yet. I can add it automatically
with type: notes. Just say 'add front matter' if you'd like."
```

### Example 3: Health Check Keywords

```
User: "Can you check if my docs are organized properly?"

Claude (activates):
"Running documentation health check...
[Proceeds with full evaluation]"
```

### Example 4: Commit with Docs

```
User: "git commit -m 'Update feature docs'"

Claude (after commit):
"I noticed you updated documentation. Would you like me to:
- Update the docs index
- Check for any formatting issues
- Update the 'recently modified' section?"
```

### Example 5: Empty Tags Detected

```
User opens: docs/api-design.md (has empty tags: [])

Claude (proactive):
"This document has no tags. Based on the content, I suggest:

  tags: [api, rest, authentication, backend]

Want me to add these? (yes / pick some / skip)"
```

### Example 6: Stale Document Opened

```
User opens: docs/old-spec.md (updated 4 months ago)

Claude (subtle):
"This document was last updated 4 months ago. 
Is it still current, or should I mark it for review?"
```

### Example 7: Cross-Reference Opportunity

```
User opens: docs/auth-implementation.md

Claude (proactive):
"This document discusses OAuth flows, which is also covered in 
docs/security-guidelines.md. Should I add a cross-reference?"
```

### Example 8: Long Document Without TOC

```
User opens: docs/planning/feature-brainstorm.md (285 lines)

Claude (proactive):
"This document is 285 lines with 12 sections. 
A table of contents would help with navigation. Want me to generate one?"
```

---

## Integration with Other Skills

| Skill | Trigger Handoff |
|-------|-----------------|
| Remotion | When composition docs updated, sync YAML/MD/TSX |
| Google Images | When adding images to docs, suggest image references section |

---

## Interview Behavior

### When to Interview

| Situation | Interview? | Reason |
|-----------|------------|--------|
| User explicitly provides details | No | Already have the info |
| User says "quick" or "just create" | Minimal | Respect urgency, use defaults |
| User creates doc without context | Yes | Need basic info |
| User says "skip" or "no thanks" | Stop | User declined |

### Interview Guidelines

1. **Extract from context first** - If user said "I'm Dan, create a spec for auth", don't ask for author or type
2. **Batch questions** - Ask 2-3 questions at once, not one at a time
3. **Offer skip option** - Always mention user can skip/decline
4. **Be brief** - Keep interview under 3 exchanges
5. **Show inferred values** - Tell user what you already figured out

### Skip Phrases

Recognize these as "skip the interview":
- "skip"
- "no thanks"
- "just create it"
- "use defaults"
- "don't ask"
- "that's fine"

## Customization

Users can adjust trigger sensitivity by adding to their session:

```
"Be less proactive about doc suggestions"
→ Only activate on explicit requests

"Always check docs when I commit"
→ Auto-run health check on doc-related commits

"Don't interview me for new docs"
→ Skip interview, always use defaults/inferred values
```
