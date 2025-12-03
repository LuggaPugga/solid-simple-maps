# ZoomableGroup

Enables zoom and pan interactions on the map.

## Props

```tsx
interface ZoomableGroupProps extends JSX.GSVGAttributes<SVGGElement> {
  center?: [number, number];
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  translateExtent?: [[number, number], [number, number]];
  filterZoomEvent?: (event: unknown) => boolean;
  onMoveStart?: (data: { coordinates: [number, number]; zoom: number }, event: unknown) => void;
  onMove?: (data: { x: number; y: number; zoom: number; dragging?: unknown }, event: unknown) => void;
  onMoveEnd?: (data: { coordinates: [number, number]; zoom: number }, event: unknown) => void;
  className?: string;
  children?: JSX.Element;
}
```

### center

- **Type**: `[number, number]`
- **Default**: `[0, 0]`
- **Description**: Initial center point `[x, y]` in pixel coordinates

### zoom

- **Type**: `number`
- **Default**: `1`
- **Description**: Initial zoom level

### minZoom / maxZoom

- **Type**: `number`
- **Default**: `1` / `8`
- **Description**: Minimum and maximum zoom levels

### translateExtent

- **Type**: `[[number, number], [number, number]]`
- **Description**: Constrains panning to a specific area `[[x0, y0], [x1, y1]]`

### filterZoomEvent

- **Type**: `(event: unknown) => boolean`
- **Description**: Function to filter which events trigger zoom/pan

### Event Handlers

- **onMoveStart**: Called when zoom/pan starts
- **onMove**: Called during zoom/pan
- **onMoveEnd**: Called when zoom/pan ends

## Example

```tsx
<ZoomableGroup
  center={[0, 0]}
  zoom={1}
  minZoom={1}
  maxZoom={8}
  onMove={(data) => console.log("Moving", data)}
>
  <Geographies geography={geoUrl}>
    {({ geographies }) => /* ... */}
  </Geographies>
</ZoomableGroup>
```

