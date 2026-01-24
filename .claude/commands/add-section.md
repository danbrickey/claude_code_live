# Add Section

Add a new content section to the landing page following the established design system.

## Instructions

1. Use the existing CSS classes and design tokens
2. Follow the neobrutalist style (bold borders, box shadows, strong typography)
3. Ensure the section is responsive
4. Add appropriate animations if needed

## Design Tokens

- Border: `var(--border-width) solid var(--black)`
- Shadow: `var(--shadow-offset) var(--shadow-offset) 0 0 var(--black)`
- Background: `var(--white)` for cards, `var(--black)` for emphasis
- Fonts: Use `.content-block`, `.full-section`, or create semantic class names

## Section Types Available

- `content-grid` - Two column layout
- `content-block` - Card-style content block
- `full-section` - Full-width content area
- `terminal-block` - Code/terminal display
- `quote-section` - Highlighted quote

## Example Usage

```
/add-section testimonials with 3 customer quotes in a grid layout
```
