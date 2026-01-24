# Theme

Modify the color theme of the site by updating CSS custom properties.

## Current Theme Variables

Located in `index.html` within the `:root` selector:

```css
:root {
    --black: #1a2744;      /* Primary color (navy blue) */
    --white: #ffffff;       /* Text on dark backgrounds */
    --off-white: #f8f9fc;   /* Page background */
    --border-width: 4px;    /* Border thickness */
    --shadow-offset: 8px;   /* Box shadow offset */
}
```

## How to Change Theme

1. Update the `--black` variable to change the primary color
2. Adjust `--off-white` for background tint
3. Update rgba values in grid pattern and decorations to match

## Example Themes

**Ocean Blue**
- --black: #0f4c75
- --off-white: #f0f5f9

**Forest Green**
- --black: #1b4332
- --off-white: #f1f8f4

**Warm Gray**
- --black: #374151
- --off-white: #f9fafb

**Purple**
- --black: #4c1d95
- --off-white: #faf5ff

## Example Usage

```
/theme change to a warm terracotta color scheme
```
