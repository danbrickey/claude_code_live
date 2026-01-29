# Claude Code Skills

This folder contains custom skills that extend Claude Code's capabilities.

## Available Skills

### Skill Creator (`/skill-creator`) ⭐ Meta-Skill

A meta-skill for designing and creating well-structured Claude Code skills. Use this when building new skills.

- **skill.md** - Complete skill creation methodology
- **templates/** - Reusable templates
  - `skill-template.md` - Blank skill template with all sections
  - `rubric-scorecard.md` - Quality grading rubric
- **examples/** - Example skill creation sessions
  - `example-session.md` - Full walkthrough of creating an API docs skill

**Features**:
- Structured discovery questions
- Modular design analysis (Single Responsibility, Composition, Reusability tests)
- Generates 3 versions (Minimal, Balanced, Comprehensive)
- Grades against 7-criterion rubric
- Identifies when to split skills

---

### Docs Organizer (`/docs-organizer`)

A proactive skill for organizing and indexing project documentation. Includes:

- **skill.md** - Skill documentation and workflows
- **templates/** - Document type templates
  - `front-matter.yaml` - Standard front matter schema
  - `index.md` - Index/README template
  - `planning-doc.md` - Planning document template
  - `meeting-notes.md` - Meeting notes template
  - `spec.md` - Specification template
- **rubrics/** - Evaluation criteria
  - `evaluation.md` - Document scoring rubric
  - `triggers.md` - Proactive activation conditions

**Features**:
- Auto-adds front matter to new documents
- Maintains docs/README.md as master index
- Evaluates documents against quality rubric
- Proactively suggests improvements

---

### Planning Assistant (`/planning-assistant`)

An agile planning skill for managing Epics, Features, and User Stories. Includes:

- **SKILL.md** - Skill documentation and workflows
- **templates/** - Planning document templates
  - `epic.md` - Epic template with vision and success metrics
  - `feature.md` - Feature template with stories list
  - `story.md` - User story template with acceptance criteria
  - `pi-goals.md` - Planning Increment goals template
  - `retro.md` - Retrospective template
  - `backlog.md` - Idea intake template
- **rubrics/** - Planning guidelines
  - `sizing-guide.md` - Fibonacci story point reference
  - `triggers.md` - Proactive activation conditions
- **generators/** - Dashboard generation
  - `status-svg.md` - SVG status dashboard instructions

**Features**:
- Fibonacci sizing (1, 2, 3, 5, 8, 13, 21)
- Weekly PI (sprint) planning
- SVG status dashboard with progress bars
- Kanban workflow (todo/in-progress/done/blocked)
- Integrates with docs-organizer for front matter

---

### Remotion (`/remotion`)

A skill for creating programmatic videos with React. Includes:

- **skill.md** - Skill documentation and usage instructions
- **templates/** - Reusable scene component templates
  - `title-scene.tsx` - Animated title/intro scenes
  - `bullets-scene.tsx` - Bullet point list scenes
  - `cta-scene.tsx` - Call-to-action scenes

## How to Use Skills

Skills are automatically loaded when Claude Code starts in this directory. Reference them in your prompts:

```
Use the Remotion skill to create a video with 3 scenes
```

## Adding New Skills

1. Create a new folder under `.claude/skills/`
2. Add a `skill.md` file with documentation
3. Add any templates or supporting files
4. Update this README

## Skill Structure

```
.claude/skills/
├── README.md
└── skill-name/
    ├── skill.md          # Main skill documentation
    ├── templates/        # Reusable code templates
    └── examples/         # Example usage (optional)
```
