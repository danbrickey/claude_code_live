# Google Images Reference Skill

Find reference images on Google to improve video aesthetics, realism, and visual accuracy.

## What This Skill Enables

When this skill is active, Claude Code can:

- Search Google Images for style references, screenshots, and diagrams
- Analyze video context (YAML/Markdown) to suggest relevant image searches
- Find UI mockups, product screenshots, and interface examples
- Discover color palettes and design inspiration
- Locate technical diagrams and architecture visuals

## In-Editor Image Panel (CodeReel)

The CodeReel editor includes an integrated **Image References** panel on the right side:

### Accessing the Panel
1. Open `editor.html` in a browser (via local server)
2. Click the **🖼 Images** tab in the right panel

### Features
- **Auto-Search**: When switching to Images tab, automatically searches for images matching the current scene title
- **Scope Selector**: Choose to assign images to:
  - **Scene** - Current scene only
  - **Act** - Group of related scenes
  - **Video** - Entire video as global reference
- **Image Grid**: Thumbnails of search results (2x2 grid)
- **Preview**: Click a thumbnail to see medium-sized preview with source
- **Assign Buttons**: One-click assignment to Scene, Act, or Video
- **Assigned References**: Shows all assigned images with scope and remove option

## Use Cases

### 1. Style References
Find images that match the visual aesthetic you want:
```
"Find style references for a dark-themed developer tool UI"
"Search for Amazon Web Services design examples"
"Look for neobrutalist design inspiration"
```

### 2. UI Screenshots
Find real product screenshots for accuracy:
```
"Find VS Code with Amazon Q extension screenshots"
"Search for dbt Cloud interface examples"
"Look for Data Vault diagram examples"
```

### 3. Technical Diagrams
Find explanatory visuals:
```
"Find Data Vault 2.0 hub and link diagrams"
"Search for healthcare claims data flow diagrams"
"Look for ETL pipeline architecture diagrams"
```

### 4. Theme-Appropriate Imagery
Based on video audience and context:
```
"Find professional imagery for enterprise data engineering"
"Search for healthcare technology stock photos"
"Look for developer productivity visuals"
```

## How to Invoke

### From Video Context
Say: **"Find reference images for this video"** or **"Search for images that match the [scene name] scene"**

The skill will:
1. Read the video's YAML context document
2. Extract key themes: audience, domain, visual style, technology
3. Generate targeted Google Image searches
4. Present results with URLs and descriptions

### Direct Search
Say: **"Search Google Images for [topic]"**

### Scene-Specific
Say: **"Find reference images for the Agent Working scene"**

## Search Strategy

When searching for video reference images, consider:

| Context Element | Search Terms |
|-----------------|--------------|
| **Audience** | "enterprise", "developer", "professional" |
| **Domain** | "healthcare", "data engineering", "dbt" |
| **Technology** | "VS Code", "Amazon Q", "AWS" |
| **Visual Style** | "dark theme", "orange accent", "modern UI" |
| **Scene Type** | "code editor screenshot", "progress indicator", "dashboard" |

## Example Session

**User:** Find reference images for the VS Code Overview scene

**Claude:** Based on the scene context, I'll search for:
1. "VS Code dark theme dbt project" - for accurate IDE appearance
2. "Amazon Q Developer extension VS Code" - for the AI panel styling
3. "file explorer VS Code models folder" - for folder structure reference

*[Performs searches and presents results with thumbnails/URLs]*

## Integration with Video Workflow

After finding reference images:

1. **Style Matching**: Note colors, fonts, spacing from reference
2. **Screenshot Recreation**: Recreate UI elements in Remotion components
3. **Diagram Inspiration**: Base technical diagrams on found examples
4. **Update Context**: Add image URLs to YAML for future reference

### Adding References to YAML

```yaml
scenes:
  - id: vscode-overview
    name: VS Code Overview
    references:
      - url: "https://example.com/vscode-dark.png"
        purpose: "Color palette reference"
      - url: "https://example.com/amazon-q-panel.png"
        purpose: "Chat panel layout"
```

## Search Tips

- Add "screenshot" for UI captures
- Add "diagram" for technical visuals
- Add "2024" or "2025" for recent examples
- Add product/brand names for specific tools
- Use "dark theme" or "light theme" for color matching
- Add "high resolution" or "4K" for quality images
