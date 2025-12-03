# useZoomPan

Hook for custom zoom and pan control.

## Usage

```tsx
import { useZoomPan } from "solid-simple-maps";

const zoomPan = useZoomPan({
  center: [0, 0],
  zoom: 1,
  scaleExtent: [1, 8],
  translateExtent: [[-Infinity, -Infinity], [Infinity, Infinity]],
  filterZoomEvent: undefined,
  onMoveStart: undefined,
  onMove: undefined,
  onMoveEnd: undefined,
});
```

## Parameters

### center

- **Type**: `[number, number]`
- **Required**: `true`
- **Description**: Initial center point `[longitude, latitude]` in geographic coordinates

### zoom

- **Type**: `number`
- **Default**: `1`
- **Description**: Initial zoom level

### scaleExtent

- **Type**: `[number, number]`
- **Default**: `[1, 8]`
- **Description**: Minimum and maximum zoom levels `[minZoom, maxZoom]`

### translateExtent

- **Type**: `[[number, number], [number, number]]`
- **Default**: `[[-Infinity, -Infinity], [Infinity, Infinity]]`
- **Description**: Constrains panning to a specific area `[[x0, y0], [x1, y1]]`

### filterZoomEvent

- **Type**: `(event: unknown) => boolean`
- **Description**: Function to filter which events trigger zoom/pan. Returns `true` to allow the event.

### onMoveStart

- **Type**: `(data: { coordinates: [number, number]; zoom: number }, event: unknown) => void`
- **Description**: Called when zoom/pan starts

### onMove

- **Type**: `(data: { x: number; y: number; zoom: number; dragging?: unknown }, event: unknown) => void`
- **Description**: Called during zoom/pan

### onMoveEnd

- **Type**: `(data: { coordinates: [number, number]; zoom: number }, event: unknown) => void`
- **Description**: Called when zoom/pan ends

## Returns

- **position**: Signal containing `{ x, y, k, dragging? }` (position, zoom, and dragging state)
- **transformString**: Computed transform string for SVG (e.g., `"translate(100 200) scale(2)"`)
- **mapRef**: Ref callback to attach to the map container (SVG or group element)

