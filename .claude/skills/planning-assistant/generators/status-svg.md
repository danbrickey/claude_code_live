# Status SVG Generator

Instructions for generating the `docs/planning/status.svg` dashboard.

## Overview

The status.svg file provides a visual summary of planning progress. It should be regenerated whenever planning documents change.

## SVG Structure

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
  <defs>
    <!-- Subtle shadow for depth -->
    <filter id="shadow">
      <feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity="0.1"/>
    </filter>
  </defs>

  <style>
    /* Solid background with subtle border */
    .background { fill: #ffffff; stroke: #d0d0d0; stroke-width: 1; }

    /* High contrast text */
    .title { font: bold 20px sans-serif; fill: #1a2744; }
    .subtitle { font: 14px sans-serif; fill: #555555; }
    .label { font: 12px sans-serif; fill: #2d2d2d; }
    .value { font: bold 13px sans-serif; fill: #1a2744; }

    /* Progress bars with better contrast */
    .bar-bg { fill: #d8d8d8; stroke: #b0b0b0; stroke-width: 0.5; }
    .bar-complete { fill: #34a853; }  /* Darker green */
    .bar-progress { fill: #1976d2; }  /* Darker blue */
    .bar-blocked { fill: #d32f2f; }   /* Darker red */

    /* Kanban cards with better contrast and borders */
    .kanban-todo { fill: #757575; stroke: #555555; stroke-width: 1; }
    .kanban-wip { fill: #1976d2; stroke: #0d47a1; stroke-width: 1; }
    .kanban-done { fill: #34a853; stroke: #1e8e3e; stroke-width: 1; }
    .kanban-blocked { fill: #d32f2f; stroke: #b71c1c; stroke-width: 1; }
  </style>

  <!-- Solid white background with border -->
  <rect width="600" height="400" class="background" rx="4"/>

  <!-- Content sections go here -->
</svg>
```

## Sections

### 1. Header Section (y: 0-50)

```svg
<g class="header">
  <text x="20" y="30" class="title">Planning Status</text>
  <text x="20" y="48" class="subtitle">Updated: YYYY-MM-DD | Current PI: pi-YYYY-wWW</text>
</g>
```

### 2. Epic Progress Section (y: 60-120)

For each active epic, show overall progress:

```svg
<g class="epic-section" transform="translate(20, 60)">
  <text class="label">Epic: epic-001 - [Epic Name]</text>
  <text x="500" class="value">3/5 features (60%)</text>
  
  <!-- Progress bar background -->
  <rect y="20" width="560" height="16" class="bar-bg"/>
  
  <!-- Progress bar fill (width = percentage * 560) -->
  <rect y="20" width="336" height="16" class="bar-complete"/>
</g>
```

### 3. Features Section (y: 130-280)

Show each feature with story point progress:

```svg
<g class="features-section" transform="translate(20, 130)">
  <text class="label" style="font-weight: bold">Features</text>
  
  <!-- Feature 1 -->
  <g transform="translate(0, 20)">
    <text class="label">feat-001: [Feature Name]</text>
    <text x="400" class="value">8/13 pts (62%)</text>
    <rect y="15" width="200" height="8" class="bar-bg"/>
    <rect y="15" width="124" height="8" class="bar-complete"/>
  </g>
  
  <!-- Feature 2 -->
  <g transform="translate(0, 50)">
    <text class="label">feat-002: [Feature Name]</text>
    <text x="400" class="value">0/8 pts (0%)</text>
    <rect y="15" width="200" height="8" class="bar-bg"/>
  </g>
  
  <!-- Feature 3 (blocked) -->
  <g transform="translate(0, 80)">
    <text class="label">feat-003: [Feature Name] (BLOCKED)</text>
    <text x="400" class="value">3/5 pts</text>
    <rect y="15" width="200" height="8" class="bar-bg"/>
    <rect y="15" width="120" height="8" class="bar-blocked"/>
  </g>
</g>
```

### 4. Kanban Summary Section (y: 290-350)

Show story counts by status:

```svg
<g class="kanban-section" transform="translate(20, 290)">
  <text class="label" style="font-weight: bold">Stories Kanban</text>
  
  <g transform="translate(0, 25)">
    <!-- Todo -->
    <rect width="100" height="40" class="kanban-todo" rx="4"/>
    <text x="50" y="20" text-anchor="middle" fill="white" class="label">Todo</text>
    <text x="50" y="35" text-anchor="middle" fill="white" class="value">5</text>
    
    <!-- In Progress -->
    <rect x="110" width="100" height="40" class="kanban-wip" rx="4"/>
    <text x="160" y="20" text-anchor="middle" fill="white" class="label">In Progress</text>
    <text x="160" y="35" text-anchor="middle" fill="white" class="value">2</text>
    
    <!-- Done -->
    <rect x="220" width="100" height="40" class="kanban-done" rx="4"/>
    <text x="270" y="20" text-anchor="middle" fill="white" class="label">Done</text>
    <text x="270" y="35" text-anchor="middle" fill="white" class="value">8</text>
    
    <!-- Blocked -->
    <rect x="330" width="100" height="40" class="kanban-blocked" rx="4"/>
    <text x="380" y="20" text-anchor="middle" fill="white" class="label">Blocked</text>
    <text x="380" y="35" text-anchor="middle" fill="white" class="value">1</text>
  </g>
</g>
```

### 5. Velocity Section (y: 360-400)

Show recent velocity if available:

```svg
<g class="velocity-section" transform="translate(20, 360)">
  <text class="label">Velocity (last 3 PIs): 21 → 18 → 25 pts | Avg: 21 pts/PI</text>
</g>
```

## Data Collection

To generate the SVG, collect data from planning documents:

### 1. Scan Planning Folders

```
docs/planning/
├── epics/*.md      → Extract epic_id, planning_status, features[]
├── features/*.md   → Extract feat_id, planning_status, points, stories[]
├── stories/*.md    → Extract story_id, planning_status, points
└── increments/     → Extract current PI, velocity history
```

### 2. Calculate Metrics

For each epic:
```
epic_progress = count(features where planning_status = 'done') / count(features)
```

For each feature:
```
feature_points_done = sum(points) for stories where planning_status = 'done'
feature_points_total = sum(points) for all stories
feature_progress = feature_points_done / feature_points_total
```

Kanban counts:
```
todo_count = count(stories where planning_status = 'todo')
wip_count = count(stories where planning_status = 'in-progress')
done_count = count(stories where planning_status = 'done')
blocked_count = count(stories where planning_status = 'blocked')
```

### 3. Determine Current PI

Find the most recent `pi-YYYY-wWW` folder in `increments/` or calculate from current date.

## Color Coding

High contrast colors for better visibility:

| Condition | Color | Hex Code | Class |
|-----------|-------|----------|-------|
| **Background** | White with border | #ffffff / #d0d0d0 | `background` |
| Complete or on track | Darker green | #34a853 | `bar-complete` |
| In progress | Darker blue | #1976d2 | `bar-progress` |
| Blocked | Darker red | #d32f2f | `bar-blocked` |
| Not started | Medium gray | #d8d8d8 | `bar-bg` |
| **Text** | Navy / Dark gray | #1a2744 / #2d2d2d | `title` / `label` |

**Contrast improvements:**
- All text uses darker colors (#2d2d2d instead of #333, #555555 instead of #666)
- Progress bar colors are darker for better visibility (#34a853 vs #4caf50)
- Background bars have subtle borders (#b0b0b0 stroke)
- Kanban cards have darker fills and borders for definition
- White background ensures visibility in all contexts

## Regeneration Triggers

Regenerate status.svg when:

1. Any planning document is created, modified, or deleted
2. User explicitly requests "update status" or "regenerate dashboard"
3. At start of new PI (include velocity from previous PI)
4. During PI planning (show committed vs capacity)

## Example Complete SVG

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
  <defs>
    <filter id="shadow">
      <feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity="0.1"/>
    </filter>
  </defs>

  <style>
    .background { fill: #ffffff; stroke: #d0d0d0; stroke-width: 1; }
    .title { font: bold 20px sans-serif; fill: #1a2744; }
    .subtitle { font: 14px sans-serif; fill: #555555; }
    .label { font: 12px sans-serif; fill: #2d2d2d; }
    .value { font: bold 13px sans-serif; fill: #1a2744; }
    .bar-bg { fill: #d8d8d8; stroke: #b0b0b0; stroke-width: 0.5; }
    .bar-complete { fill: #34a853; }
    .bar-blocked { fill: #d32f2f; }
    .kanban-todo { fill: #757575; stroke: #555555; stroke-width: 1; }
    .kanban-wip { fill: #1976d2; stroke: #0d47a1; stroke-width: 1; }
    .kanban-done { fill: #34a853; stroke: #1e8e3e; stroke-width: 1; }
    .kanban-blocked { fill: #d32f2f; stroke: #b71c1c; stroke-width: 1; }
  </style>

  <!-- Solid white background -->
  <rect width="600" height="400" class="background" rx="4"/>

  <!-- Header -->
  <text x="20" y="30" class="title">Planning Status</text>
  <text x="20" y="48" class="subtitle">Updated: 2026-01-28 | Current PI: pi-2026-w05</text>
  
  <!-- Epic Progress -->
  <g transform="translate(20, 70)">
    <text class="label">epic-001: CodeReel MVP</text>
    <text x="480" class="value">3/5 features (60%)</text>
    <rect y="18" width="560" height="16" rx="4" class="bar-bg"/>
    <rect y="18" width="336" height="16" rx="4" class="bar-complete"/>
  </g>
  
  <!-- Features -->
  <g transform="translate(20, 120)">
    <text class="label" style="font-weight: bold">Features</text>
    
    <g transform="translate(0, 25)">
      <text class="label">feat-001: Scene Templates</text>
      <text x="400" class="value">8/8 pts (100%)</text>
      <rect y="15" width="200" height="8" rx="4" class="bar-bg"/>
      <rect y="15" width="200" height="8" rx="4" class="bar-complete"/>
    </g>
    
    <g transform="translate(0, 55)">
      <text class="label">feat-002: Brand Kits</text>
      <text x="400" class="value">5/13 pts (38%)</text>
      <rect y="15" width="200" height="8" rx="4" class="bar-bg"/>
      <rect y="15" width="77" height="8" rx="4" class="bar-complete"/>
    </g>
    
    <g transform="translate(0, 85)">
      <text class="label">feat-003: AI Features (BLOCKED)</text>
      <text x="400" class="value">0/21 pts</text>
      <rect y="15" width="200" height="8" rx="4" class="bar-blocked"/>
    </g>
  </g>
  
  <!-- Kanban -->
  <g transform="translate(20, 260)">
    <text class="label" style="font-weight: bold">Stories Kanban</text>
    
    <g transform="translate(0, 25)">
      <rect width="100" height="40" rx="4" class="kanban-todo"/>
      <text x="50" y="20" text-anchor="middle" fill="white" class="label">Todo</text>
      <text x="50" y="35" text-anchor="middle" fill="white" class="value">5</text>
      
      <rect x="110" width="100" height="40" rx="4" class="kanban-wip"/>
      <text x="160" y="20" text-anchor="middle" fill="white" class="label">In Progress</text>
      <text x="160" y="35" text-anchor="middle" fill="white" class="value">2</text>
      
      <rect x="220" width="100" height="40" rx="4" class="kanban-done"/>
      <text x="270" y="20" text-anchor="middle" fill="white" class="label">Done</text>
      <text x="270" y="35" text-anchor="middle" fill="white" class="value">8</text>
      
      <rect x="330" width="100" height="40" rx="4" class="kanban-blocked"/>
      <text x="380" y="20" text-anchor="middle" fill="white" class="label">Blocked</text>
      <text x="380" y="35" text-anchor="middle" fill="white" class="value">1</text>
    </g>
  </g>
  
  <!-- Velocity -->
  <g transform="translate(20, 350)">
    <text class="label">Velocity (last 3 PIs): 21 → 18 → 25 pts | Avg: 21 pts/PI</text>
  </g>
</svg>
```

## Empty State

When no planning data exists:

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 200">
  <style>
    .background { fill: #ffffff; stroke: #d0d0d0; stroke-width: 1; }
    .title { font: bold 20px sans-serif; fill: #1a2744; }
    .message { font: 14px sans-serif; fill: #555555; }
  </style>

  <!-- Solid white background -->
  <rect width="600" height="200" class="background" rx="4"/>

  <text x="20" y="30" class="title">Planning Status</text>
  <text x="20" y="60" class="message">No epics or features yet.</text>
  <text x="20" y="85" class="message">Get started: "Create an epic for [your initiative]"</text>
</svg>
```
