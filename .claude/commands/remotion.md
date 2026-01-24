# Remotion Video Skill

Create and edit programmatic videos using Remotion.

## About Remotion

Remotion is a React framework for creating videos programmatically. Each scene is a React component that can be edited, composed, and rendered to video.

## Skill Installation

```bash
npx skills add remotion-dev/remotion
```

## Project Setup

To create a new Remotion project:
```bash
npx create-video@latest
```

## Core Concepts

### Composition
A composition defines a video's dimensions, duration, and fps:
```tsx
<Composition
  id="MyVideo"
  component={MyComponent}
  durationInFrames={150}
  fps={30}
  width={1920}
  height={1080}
/>
```

### useCurrentFrame
Access the current frame number for animations:
```tsx
const frame = useCurrentFrame();
const opacity = Math.min(1, frame / 30);
```

### Sequences
Create scenes/segments within a video:
```tsx
<Sequence from={0} durationInFrames={60}>
  <IntroScene />
</Sequence>
<Sequence from={60} durationInFrames={90}>
  <MainContent />
</Sequence>
```

## Commands

### /video-scene
Create a new video scene component with animations.

### /video-render
Render the current composition to MP4.

### /video-preview
Start the Remotion preview server.

## Example Usage

```
Create a 30-second explainer video with:
- Scene 1: Title card with fade in
- Scene 2: Three bullet points appearing sequentially
- Scene 3: Call to action with scale animation
```
