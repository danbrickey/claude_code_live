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
