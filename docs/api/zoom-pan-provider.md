# ZoomPanProvider

Context provider for zoom and pan state.

## Usage

```tsx
import { ZoomPanProvider, useZoomPanContext } from "solid-simple-maps";

const MyComponent = () => {
  const { x, y, k, transformString } = useZoomPanContext();
  // Use zoom/pan context
};
```

## Context Value

- **x**: X translation
- **y**: Y translation
- **k**: Zoom scale
- **transformString**: SVG transform string

