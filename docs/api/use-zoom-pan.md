# useZoomPan

Hook for custom zoom and pan control.

## Usage

```tsx
import { useZoomPan } from "solid-simple-maps";

const zoomPan = useZoomPan({
  center: [0, 0],
  zoom: 1,
  minZoom: 1,
  maxZoom: 8,
  scaleExtent: [1, 8],
  translateExtent: undefined,
  filterZoomEvent: undefined,
  onMoveStart: undefined,
  onMove: undefined,
  onMoveEnd: undefined,
});
```

## Returns

- **position**: Signal containing `{ x, y, k }` (position and zoom)
- **transformString**: Computed transform string for SVG
- **mapRef**: Ref to attach to the map container

