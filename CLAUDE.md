# Claude Code Configuration

This is the CLAUDE.md file for the Claude Code Live Stream project. Claude will remember these instructions across sessions.

## Project Overview

This is a landing page for a Claude Code live stream, built with a neobrutalist design aesthetic using navy blue and white colors.

## Tech Stack

- HTML5, CSS3, JavaScript (vanilla)
- Single-page application with JavaScript-based routing
- No build tools required - static files only
- **CodeReel Video Editor**: React + Remotion (in `/video-editor/`)

## Skills

Custom skills are located in `.claude/skills/`. Available skills:

- **CodeReel/Remotion** (`.claude/skills/remotion/`) - Create programmatic videos with React
  - Scene templates: title, bullets, CTA, vscode, agent
  - Automatic animations and transitions
  - Render to MP4, WebM, or GIF

- **Google Images** (`.claude/skills/google-images/`) - Find reference images for videos
  - Style references for color palettes and design
  - UI screenshots for accurate recreations
  - Technical diagrams for explainer content
  - Theme-appropriate imagery for audience
  - **In-Editor Panel**: Click 🖼 Images tab to browse and assign images
  - **CLI**: "Find reference images for [scene/video]"

- **Docs Organizer** (`.claude/skills/docs-organizer/`) - Organize and index documentation
  - Proactive front matter management (auto-adds to new docs)
  - Documentation health checks and evaluation
  - Master index at `docs/README.md`
  - Document templates for planning, notes, specs
  - **Tag suggestions**: AI-analyzes content and suggests relevant tags
  - **Stale doc detection**: Flags docs >90 days old for review
  - **Cross-reference suggestions**: Recommends links between related docs
  - **TOC generation**: Auto-creates table of contents for docs >200 lines
  - **Triggers**: "Run a doc health check", "Suggest tags", "Find stale docs", "Generate TOC"
  - **Auto-applies**: Front matter, index updates, date fixes

- **Planning Assistant** (`.claude/skills/planning-assistant/`) - Agile planning management
  - Epic → Feature → Story hierarchy with bidirectional links
  - Fibonacci sizing: 1, 2, 3, 5, 8, 13, 21 (21 = needs breakdown)
  - Weekly Planning Increments (PIs) with goals and retrospectives
  - SVG status dashboard with progress bars and Kanban summary
  - Planning folder at `docs/planning/` with epics/, features/, stories/
  - Integrates with docs-organizer for consistent front matter
  - **Triggers**: "Create epic", "Break down [epic]", "Start PI planning", "Move [story] to done"
  - **Auto-updates**: status.svg regenerated on planning changes

## Video Composition Workflow

Each video composition maintains **three synchronized files**:

| File | Purpose |
|------|---------|
| `src/index.tsx` | CodeReel/Remotion code - source of truth for rendering |
| `src/compositions/{VideoName}.yaml` | Structured data for AI agent context |
| `src/compositions/{VideoName}.md` | Human-readable narrative description |

**When modifying a video, all three files must be updated.**

### File Purposes

- **TSX**: The actual executable code that CodeReel/Remotion renders
- **YAML**: Machine-readable structure for AI agents to understand scenes, props, and technical details
- **Markdown**: Human-readable narrative with executive summary, outline with timelines, and detailed scene descriptions

### Markdown Document Structure

1. **Executive Summary** (1-2 paragraphs) - Brief overview of what the video is and how it evolves
2. **Video Outline** (2-3 minute read) - Structured explanation with timeline markers organized by acts
3. **Scene Breakdown** - Detailed description of each scene with timeline, content, and purpose

## Code Style

- Use semantic HTML elements
- CSS custom properties (variables) for theming
- Mobile-first responsive design
- BEM-like class naming conventions
- 4-space indentation for HTML/CSS/JS

## Design System

- **Primary Color**: Navy blue `#1a2744`
- **Background**: Off-white `#f8f9fc`
- **Accent**: White `#ffffff`
- **Fonts**: Anton (headings), Archivo Black (titles), JetBrains Mono (body/code)
- **Border Width**: 4px
- **Shadow Offset**: 8px

---

## Custom Commands

### /review
Review the current file for:
- Accessibility issues (ARIA, semantic HTML)
- Performance problems
- Code style consistency
- Responsive design issues

Provide specific suggestions with line numbers.

### /component
Create a new component in the neobrutalist style matching the existing design system. Include:
- Proper CSS with the design tokens
- Hover states and transitions
- Mobile responsive styles

### /optimize
Analyze and optimize the code for:
- File size reduction
- CSS specificity issues
- Unused styles
- JavaScript performance

### /a11y
Run an accessibility audit and suggest improvements for:
- Color contrast
- Keyboard navigation
- Screen reader compatibility
- Focus states
