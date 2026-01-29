# Document Evaluation Rubric

This rubric defines how documents are evaluated for quality and organization. Each document receives a score from 0-100 based on weighted criteria.

## Scoring Criteria

### 1. Front Matter (25 points)

| Score | Condition |
|-------|-----------|
| 25 | All required fields present and valid |
| 20 | Missing 1 optional field (tags or related) |
| 15 | Missing `updated` date or `author` empty |
| 10 | Missing `status`, `type`, or `ai_model` |
| 5 | Only has `title` |
| 0 | No front matter |

**Required fields:** title, created, updated, status, type, author, ai_model  
**Optional fields:** tags, related

**Note:** `author` should have a value (empty string "" is a reminder to fill). `ai_model` should be either a model name or `~` (null) for human-authored docs.

### 2. Structure (20 points)

| Score | Condition |
|-------|-----------|
| 20 | Single H1 title, logical H2/H3 hierarchy, consistent formatting |
| 15 | Minor issues (skipped heading level, inconsistent formatting) |
| 10 | Multiple H1 headings OR no clear structure |
| 5 | Very inconsistent structure |
| 0 | No headings at all |

**Checks:**
- Exactly one H1 heading (the title)
- H2 for major sections
- H3 for subsections (no skipping H2 → H4)
- Consistent use of lists, tables, code blocks

### 3. Cross-References (15 points)

| Score | Condition |
|-------|-----------|
| 15 | Links to related docs, all links valid |
| 10 | Has some links, all valid |
| 5 | Has links but some are broken |
| 3 | No links but document is standalone (acceptable) |
| 0 | No links and document references other topics |

**Checks:**
- Internal links to other docs in `related:` front matter
- Inline markdown links to other project docs
- All links resolve to existing files

### 4. Length (15 points)

| Score | Condition |
|-------|-----------|
| 15 | Under 300 lines (ideal) |
| 12 | 300-500 lines (acceptable) |
| 8 | 500-750 lines (consider splitting) |
| 4 | 750-1000 lines (should split) |
| 0 | Over 1000 lines (must split) |

**Split indicators:**
- Document covers multiple distinct topics
- Multiple H2 sections could be standalone docs
- Mixed document types (notes + spec in one file)

### 5. Indexed (15 points)

| Score | Condition |
|-------|-----------|
| 15 | Referenced in docs/README.md |
| 10 | Referenced in another document's `related:` field |
| 0 | Orphaned (not referenced anywhere) |

### 6. Freshness (10 points)

| Score | Condition |
|-------|-----------|
| 10 | Updated within 30 days |
| 7 | Updated within 60 days |
| 5 | Updated within 90 days |
| 2 | Updated within 180 days |
| 0 | Not updated in over 180 days |

**Note:** Freshness scoring applies mainly to `active` status documents. `archived` documents are not penalized for age.

---

## Grade Thresholds

| Grade | Score Range | Interpretation |
|-------|-------------|----------------|
| A | 90-100 | Excellent - no action needed |
| B | 80-89 | Good - minor improvements possible |
| C | 70-79 | Acceptable - some issues to address |
| D | 60-69 | Needs attention - multiple issues |
| F | 0-59 | Poor - significant work needed |

---

## Auto-Fix Thresholds

Actions that can be auto-applied without asking:

| Issue | Auto-Fix Action |
|-------|-----------------|
| Missing front matter | Add template with inferred values |
| Missing `updated` date | Set to file modification date |
| Missing `status` | Set to `active` |
| Missing `type` | Infer from location/content |
| Missing `author` | Add with empty string `""` (prompt to fill) |
| Missing `ai_model` | Add with `~` (assumes human-authored if unknown) |
| Not in index | Add to docs/README.md |
| Broken internal link | Flag for manual review |

---

## Major Change Thresholds

Actions that require user approval:

| Issue | Suggested Action |
|-------|------------------|
| Over 500 lines | Suggest splitting by H2 sections |
| Multiple topics | Suggest extracting subtopics |
| Wrong location | Suggest moving to appropriate folder |
| Duplicate content | Suggest consolidating with similar doc |
| Status stale | Suggest marking as archived |

---

## New Feature Criteria

### Tag Quality

Documents with tags are evaluated on tag quality:

| Condition | Assessment |
|-----------|------------|
| 3-5 relevant, specific tags | Excellent |
| 1-2 tags or generic tags | Needs improvement |
| Empty tags `[]` | Suggest tags |

**Tag suggestion triggers:**
- Empty `tags: []` field
- Only 1 generic tag (e.g., just "docs")
- User asks for tag suggestions

### Staleness Detection

| Age Since Update | Category | Action |
|------------------|----------|--------|
| <90 days | Fresh | No action |
| 90-180 days | Needs review | Prompt owner |
| 180-365 days | Likely outdated | Suggest review or archive |
| >365 days | Stale | Recommend archiving |

**Staleness exemptions:**
- Documents with `status: archived` (expected to be old)
- Reference docs that don't change (e.g., style guides)

### Cross-Reference Quality

| Condition | Score Impact |
|-----------|--------------|
| Has relevant cross-refs in `related:` | +5 points |
| Mentions topics without linking | -3 points |
| Missing obvious connections | Suggest links |

**Cross-reference detection:**
- Scan for topic keywords matching other doc titles
- Check for shared tags between documents
- Identify complementary doc types (planning ↔ spec)

### Table of Contents

| Line Count | Sections | TOC Recommendation |
|------------|----------|-------------------|
| <100 lines | Any | Not needed |
| 100-200 lines | <5 H2s | Optional |
| 100-200 lines | 5+ H2s | Suggested |
| >200 lines | Any | Strongly suggested |
| >500 lines | Any | Required |

**TOC placement:** After front matter, before first H2 heading.

---

## Evaluation Output Format

```markdown
## Document Health Report: [filename]

**Score:** 85/100 (B)

| Criterion | Score | Max | Notes |
|-----------|-------|-----|-------|
| Front Matter | 25 | 25 | All fields present |
| Structure | 18 | 20 | Minor: skipped H3 level |
| Cross-refs | 12 | 15 | 2 links, 1 broken |
| Length | 15 | 15 | 142 lines |
| Indexed | 15 | 15 | In docs/README.md |
| Freshness | 0 | 10 | Last updated 8 months ago |

### Auto-Applied Fixes
- ✅ Updated `updated` field to 2026-01-28

### Suggested Improvements
- ⚠️ Fix broken link to `old-spec.md`
- ⚠️ Consider updating content (last edit: May 2025)
```
