# Skill Creator

A meta-skill for designing and creating well-structured Claude Code skills. This skill guides you through best practices, asks clarifying questions, generates multiple versions, and grades them against a quality rubric.

---

## How to Use This Skill

Invoke this skill when you want to create a new skill:

```
Use the skill-creator skill to help me build a [description of what you want]
```

---

## Skill Creation Process

When this skill is activated, follow this structured process:

### Phase 1: Discovery & Clarification

Before writing any skill, gather information by asking these questions:

**Core Purpose**
1. What specific problem does this skill solve?
2. What task or workflow will be automated or enhanced?
3. Who is the target user (developer level, domain expertise)?

**Scope Definition**
4. What are the 3-5 core actions this skill should perform?
5. What should this skill explicitly NOT do? (boundaries)
6. Are there existing skills this might overlap with?

**Integration & Modularity**
7. What other skills might this be combined with?
8. What inputs does this skill need from users or other skills?
9. What outputs should this skill produce for users or other skills?

**Context & Environment**
10. What languages, frameworks, or tools does this skill target?
11. Are there specific file types or project structures assumed?
12. What level of explanation should accompany generated code?

---

### Phase 2: Modular Design Analysis

Before proceeding, evaluate the skill's scope using these criteria:

#### The Single Responsibility Test
A skill should do ONE thing well. Ask:
- Can you describe the skill in one sentence without using "and"?
- If someone asked "what does this skill do?", is there one clear answer?

**🔴 Too Big** - "Creates full-stack applications with authentication, database, API, and frontend"
**🟢 Right Size** - "Scaffolds REST API endpoints with proper error handling"

#### The Composition Test
Skills should combine with others. Ask:
- Could this skill's output be another skill's input?
- Would splitting this into 2-3 smaller skills increase flexibility?

**🔴 Monolithic** - "Builds, tests, deploys, and monitors applications"
**🟢 Composable** - "Generates deployment configurations" (combines with test skill, monitor skill)

#### The Reusability Test
Skills should work across projects. Ask:
- Does this skill make assumptions about project structure?
- Would this work for a React project AND a Python project (if applicable)?

#### Recommended Modular Breakdown

If a skill seems too large, break it into:

```
skill-domain/
├── skill-domain-core/      # Base functionality
├── skill-domain-advanced/  # Extended features
└── skill-domain-utils/     # Helper functions
```

---

### Phase 3: Generate Multiple Versions

Create THREE versions of the skill with different approaches:

#### Version A: Minimal
- Only essential functionality
- Fewest assumptions about user needs
- Maximum flexibility, minimum guidance
- Best for: Experienced users who want control

#### Version B: Balanced
- Core functionality with sensible defaults
- Clear documentation with examples
- Moderate guidance without being restrictive
- Best for: Most users, general purpose

#### Version C: Comprehensive
- Full functionality with extensive templates
- Detailed explanations and edge case handling
- More opinionated with best practices built-in
- Best for: Beginners or complex domains

---

### Phase 4: Grade Against Rubric

Evaluate each version using this rubric (1-5 scale):

#### Skill Quality Rubric

| Criterion | 1 (Poor) | 3 (Acceptable) | 5 (Excellent) |
|-----------|----------|----------------|---------------|
| **Clarity** | Vague purpose, unclear instructions | Understandable with some effort | Immediately clear what it does and how |
| **Modularity** | Does too many unrelated things | Some overlap with other skills | Single responsibility, composable |
| **Completeness** | Missing critical functionality | Covers main use cases | Handles edge cases and variations |
| **Flexibility** | Rigid, many assumptions | Some customization options | Highly configurable, few assumptions |
| **Documentation** | No examples or explanations | Basic usage documented | Rich examples, clear explanations |
| **Reusability** | Project-specific | Works for similar projects | Works across different contexts |
| **Maintainability** | Hard to update or extend | Reasonably structured | Clean, well-organized, extensible |

#### Scoring Guide
- **28-35**: Excellent skill, ready to use
- **21-27**: Good skill, minor improvements possible
- **14-20**: Needs work, review feedback
- **7-13**: Significant redesign needed

---

### Phase 5: Refinement Recommendations

Based on the grading, provide:

1. **Recommended Version** - Which version to use and why
2. **Improvements** - Specific changes to increase scores
3. **Combination Suggestions** - Other skills this pairs well with
4. **Split Recommendations** - If any version should become multiple skills

---

## Skill File Structure Best Practices

### Required Files

```
.claude/skills/[skill-name]/
├── skill.md              # REQUIRED: Main skill definition
├── README.md             # Optional: Extended documentation
├── templates/            # Optional: Code templates
│   └── [template].ext
└── examples/             # Optional: Usage examples
    └── [example].md
```

### skill.md Structure

```markdown
# Skill Name

Brief one-line description.

## Purpose
What problem this skill solves.

## When to Use
- Scenario 1
- Scenario 2

## When NOT to Use
- Anti-pattern 1
- Anti-pattern 2

## Inputs
What information the skill needs from the user.

## Outputs
What the skill produces.

## Examples
Concrete usage examples with expected results.

## Combines With
List of complementary skills.
```

---

## Anti-Patterns to Avoid

### ❌ The Kitchen Sink
Packing every possible feature into one skill.

**Problem**: Hard to maintain, overwhelming to use, inflexible.
**Solution**: Split into core + extension skills.

### ❌ The Assumption Monster
Making too many assumptions about user's environment.

**Problem**: Fails when assumptions don't hold.
**Solution**: Document requirements, provide alternatives.

### ❌ The Documentation Desert
Minimal or no examples and explanations.

**Problem**: Users don't know how to use it effectively.
**Solution**: Include 3+ examples covering common cases.

### ❌ The Island Skill
Designed in isolation without considering composition.

**Problem**: Can't be combined with other skills effectively.
**Solution**: Define clear inputs/outputs, follow conventions.

### ❌ The Vague Skill
Overly broad or unclear scope.

**Problem**: Inconsistent results, user confusion.
**Solution**: Narrow the focus, be specific about capabilities.

---

## Example Skill Creation Session

**User**: I want a skill for creating React components

**Skill Creator Questions**:
1. What types of components? (functional, class, hooks-based?)
2. What styling approach? (CSS modules, styled-components, Tailwind?)
3. Should it include tests? Props validation? Storybook stories?
4. What project structure is assumed?

**Modular Analysis**:
This could be split into:
- `react-component-core` - Basic component scaffolding
- `react-component-styles` - Styling integration
- `react-component-testing` - Test file generation
- `react-component-docs` - Storybook/documentation

**Recommendation**: Start with `react-component-core`, add others as needed.

---

## Invocation Template

When using this skill, Claude should:

1. Acknowledge the skill creation request
2. Ask the Phase 1 clarifying questions
3. Analyze modularity (Phase 2)
4. Present three versions (Phase 3)
5. Grade each version (Phase 4)
6. Provide recommendations (Phase 5)
7. Generate the chosen skill files

Always explain the reasoning behind design decisions and trade-offs.
