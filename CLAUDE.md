# Claude Code Configuration

This is the CLAUDE.md file for the Claude Code Live Stream project. Claude will remember these instructions across sessions.

## Project Overview

This is a landing page for a Claude Code live stream, built with a neobrutalist design aesthetic using navy blue and white colors.

## Tech Stack

- HTML5, CSS3, JavaScript (vanilla)
- Single-page application with JavaScript-based routing
- No build tools required - static files only
- **Video Editor**: React + Remotion (in `/video-editor/`)

## Skills

Custom skills are located in `.claude/skills/`. Available skills:

- **Remotion** (`.claude/skills/remotion/`) - Create programmatic videos with React
  - Scene templates: title, bullets, CTA
  - Automatic animations and transitions
  - Render to MP4, WebM, or GIF

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
