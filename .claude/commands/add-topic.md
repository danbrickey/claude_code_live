# Add Topic

Add a new topic page to the Claude Code live stream site.

## Instructions

1. Add a new topic card to the landing page in the `.topic-cards` section
2. Create a corresponding detail page following the existing structure
3. Update the JavaScript `showPage()` function if needed
4. Use the same layout patterns as existing topic pages

## Topic Card Template

```html
<div class="topic-card animate-in" onclick="showPage('topic-id')">
    <div class="topic-number">04</div>
    <h3 class="topic-title">Topic Name</h3>
    <p class="topic-text">
        Brief description of the topic.
    </p>
    <div class="topic-cta">Explore Topic</div>
</div>
```

## Detail Page Template

```html
<div id="topic-id" class="page">
    <div class="detail-header">
        <button class="back-button" onclick="showPage('landing')">← Back to Home</button>
        <h1 class="detail-title">Topic Name</h1>
        <p class="detail-subtitle">
            Detailed description of the topic.
        </p>
    </div>

    <div class="content-grid">
        <!-- Content blocks here -->
    </div>

    <button class="back-button" onclick="showPage('landing')">← Back to Home</button>

    <footer>...</footer>
</div>
```

## Example Usage

```
/add-topic "MCP Servers" with sections about what MCPs are, how to create them, and examples
```
