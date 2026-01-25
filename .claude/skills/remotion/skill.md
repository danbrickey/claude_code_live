# CodeReel Video Skill

Create and edit programmatic videos using CodeReel (powered by Remotion) - a React framework for making videos with code.

## Installation

```bash
npx skills add remotion-dev/remotion
```

## What This Skill Enables

When this skill is active, Claude Code can:

- Create new CodeReel video projects
- Generate animated video scenes as React components
- Build compositions with proper timing and sequences
- Render videos to MP4, WebM, or GIF formats
- Preview videos in CodeReel Studio or Remotion Studio

## Core Concepts

### Composition
Defines video dimensions, duration, and frame rate:
```tsx
<Composition
  id="MyVideo"
  component={MyScene}
  durationInFrames={150}
  fps={30}
  width={1920}
  height={1080}
/>
```

### useCurrentFrame
Access the current frame for animations:
```tsx
const frame = useCurrentFrame();
const opacity = interpolate(frame, [0, 30], [0, 1]);
```

### Sequence
Create scenes/segments within a video:
```tsx
<Sequence from={0} durationInFrames={60}>
  <IntroScene />
</Sequence>
```

### Spring Animations
Physics-based animations:
```tsx
const scale = spring({ frame, fps, config: { damping: 100 } });
```

## Example Prompts

- "Create a 30-second explainer video with title, 3 bullet points, and CTA"
- "Add a new scene with text fading in from the left"
- "Change the background color of scene 2 to navy blue"
- "Render the video to MP4 at 1080p"
