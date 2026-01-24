# Example Skill Creation Session

This document demonstrates how to use the Skill Creator to build a well-designed skill.

---

## User Request

> "I want a skill for generating API documentation"

---

## Phase 1: Discovery & Clarification

**Claude**: I'll help you create an API documentation skill. Let me ask some clarifying questions:

### Core Purpose
1. **What specific problem does this skill solve?**
   - *User*: Developers spend too much time writing API docs manually

2. **What task or workflow will be enhanced?**
   - *User*: Automatically generate docs from code or OpenAPI specs

3. **Who is the target user?**
   - *User*: Backend developers, mostly intermediate level

### Scope Definition
4. **What are the 3-5 core actions?**
   - *User*: Parse API endpoints, generate markdown docs, create request/response examples

5. **What should this skill NOT do?**
   - *User*: It shouldn't deploy docs or manage hosting

6. **Are there existing skills this might overlap with?**
   - *User*: Maybe a general documentation skill

### Integration & Modularity
7. **What other skills might this combine with?**
   - *User*: Code review skill, testing skill

8. **What inputs does this skill need?**
   - *User*: Source code files, OpenAPI/Swagger specs, or API route definitions

9. **What outputs should it produce?**
   - *User*: Markdown files, optionally HTML

### Context & Environment
10. **What languages/frameworks does this target?**
    - *User*: Express.js, FastAPI, Flask primarily

11. **Specific file types or structures assumed?**
    - *User*: Standard REST API project structures

12. **Level of explanation in generated docs?**
    - *User*: Developer-focused, concise but complete

---

## Phase 2: Modular Design Analysis

### Single Responsibility Test

❌ **Initial scope**: "Parse code, generate docs, create examples, support multiple formats"

This contains multiple responsibilities. Let's analyze:

| Responsibility | Should be separate skill? |
|---------------|---------------------------|
| Parse API endpoints | Could be shared utility |
| Generate markdown | Core functionality |
| Create examples | Could be extension |
| HTML output | Separate concern |

### Recommendation: Split into modular skills

```
api-docs/
├── api-docs-core/        # Parse + generate markdown
├── api-docs-examples/    # Request/response examples
└── api-docs-export/      # HTML, PDF exports
```

**For this session, we'll focus on `api-docs-core`.**

### Composition Test ✅
- Input: Source code or OpenAPI spec
- Output: Markdown documentation
- Can combine with: `api-docs-examples`, `api-docs-export`, testing skills

### Reusability Test ✅
- Works with multiple frameworks (Express, FastAPI, Flask)
- No project-specific assumptions
- Configurable output format

---

## Phase 3: Three Versions

### Version A: Minimal

```markdown
# API Docs Core

Generate markdown documentation from API endpoints.

## Usage
Provide source code or OpenAPI spec. Receive markdown docs.

## Supported Formats
- OpenAPI 3.x
- Express.js routes
- FastAPI endpoints
- Flask routes
```

**Characteristics**:
- 4 lines of documentation
- No examples
- Maximum flexibility, minimum guidance

---

### Version B: Balanced

```markdown
# API Docs Core

Generate clean, consistent markdown documentation from your API endpoints.

## Purpose
Automate API documentation by parsing route definitions and generating 
developer-friendly markdown files with endpoint descriptions, parameters, 
and response formats.

## When to Use
- Starting a new API and need docs scaffolding
- Existing API lacks documentation
- Keeping docs in sync with code changes

## When NOT to Use
- Need interactive API explorers (use Swagger UI)
- Require PDF or HTML output (use api-docs-export)

## Supported Frameworks
- Express.js (automatic route detection)
- FastAPI (reads Python type hints)
- Flask (parses route decorators)
- OpenAPI 3.x specifications

## Example

Input: Express route file
Output: 
- `docs/api/users.md`
- `docs/api/products.md`

## Combines With
- `api-docs-examples` for request/response samples
- `api-docs-export` for HTML/PDF generation
```

**Characteristics**:
- Clear purpose and scope
- When to use / not use
- Basic examples
- Composition guidance

---

### Version C: Comprehensive

```markdown
# API Docs Core

Generate clean, consistent markdown documentation from your API endpoints.
Supports multiple frameworks with automatic detection and customizable output.

## Purpose
Automate API documentation by parsing route definitions and generating 
developer-friendly markdown files. Reduces documentation drift by generating
docs directly from code.

## When to Use
- Starting a new API project and need documentation scaffolding
- Existing API lacks comprehensive documentation
- Keeping documentation synchronized with code changes
- Onboarding new developers who need API reference

## When NOT to Use
- Need interactive API explorers (use Swagger UI instead)
- Require PDF or HTML output (combine with api-docs-export)
- Non-REST APIs (GraphQL, gRPC have specialized tools)
- Need auto-generated client SDKs (use openapi-generator)

## Prerequisites
- Source code with route definitions, OR
- OpenAPI 3.x specification file

## Supported Frameworks

| Framework | Detection Method | Notes |
|-----------|-----------------|-------|
| Express.js | Route file analysis | Supports Router |
| FastAPI | Type hint parsing | Auto-extracts Pydantic models |
| Flask | Decorator parsing | Blueprint support |
| OpenAPI | Direct parsing | 3.0+ recommended |

## Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| source | file/directory | Yes | Code or spec to parse |
| format | string | No | Output format (default: markdown) |
| groupBy | string | No | Group endpoints by: path, tag, file |

## Outputs

```
docs/
├── api/
│   ├── index.md         # API overview
│   ├── authentication.md # Auth endpoints
│   ├── users.md         # User endpoints
│   └── products.md      # Product endpoints
└── _sidebar.md          # Navigation (if enabled)
```

## Examples

### Basic Usage
```
Generate API documentation for this Express app
```

### With Options
```
Generate API docs grouped by tags, include authentication section
```

### From OpenAPI
```
Generate markdown docs from openapi.yaml
```

## Configuration

| Option | Default | Description |
|--------|---------|-------------|
| includeExamples | false | Add placeholder examples |
| groupBy | "path" | Grouping strategy |
| outputDir | "docs/api" | Output directory |
| includeNav | true | Generate navigation file |

## Combines Well With

- **api-docs-examples** - Add request/response samples
- **api-docs-export** - Convert to HTML, PDF
- **code-review** - Validate docs match implementation
- **testing** - Generate test cases from docs

## Edge Cases

- **Nested routes**: Flattened with full paths preserved
- **Dynamic parameters**: Documented with `:param` notation
- **Multiple methods**: Separate sections per method
- **Missing descriptions**: Placeholder text added with TODO markers

## Notes

Generated docs include TODO markers for sections needing human input.
Run with `--strict` to fail if required descriptions are missing.
```

**Characteristics**:
- Comprehensive documentation
- Tables for structured information
- Multiple examples
- Configuration options
- Edge case handling
- Integration notes

---

## Phase 4: Grading

| Criterion | Version A | Version B | Version C |
|-----------|-----------|-----------|-----------|
| Clarity | 2 | 4 | 5 |
| Modularity | 5 | 5 | 4 |
| Completeness | 2 | 3 | 5 |
| Flexibility | 4 | 4 | 5 |
| Documentation | 1 | 3 | 5 |
| Reusability | 4 | 4 | 4 |
| Maintainability | 5 | 4 | 3 |
| **TOTAL** | **23/35** | **27/35** | **31/35** |

---

## Phase 5: Recommendation

### Recommended: Version B (with Version C elements)

**Reasoning**:
- Version B has the right balance for most users
- Add Version C's configuration table and examples
- Keep Version C's edge cases section
- Avoid Version C's complexity for maintainability

### Final Skill Structure

```
.claude/skills/api-docs-core/
├── skill.md           # Version B + selected C elements
├── templates/
│   ├── endpoint.md    # Template for endpoint docs
│   └── overview.md    # Template for API overview
└── examples/
    ├── express.md     # Express.js example
    └── fastapi.md     # FastAPI example
```

### Companion Skills to Create Later
1. `api-docs-examples` - Request/response generation
2. `api-docs-export` - HTML/PDF conversion
3. `api-docs-validate` - Verify docs match code

---

## Summary

This session demonstrated:
1. ✅ Clarifying questions to understand requirements
2. ✅ Modular analysis to right-size the skill
3. ✅ Three versions with different trade-offs
4. ✅ Rubric-based grading
5. ✅ Concrete recommendation with reasoning
