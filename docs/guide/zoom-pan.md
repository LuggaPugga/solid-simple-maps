# Zoom & Pan

The `ZoomableGroup` component enables interactive zooming and panning on your maps.

## Basic Usage

Wrap your map content in a `ZoomableGroup`:

```tsx
<ComposableMap width={800} height={600}>
  <ZoomableGroup>
    <Geographies geography={geoUrl}>
      {({ geographies }) => /* ... */}
    </Geographies>
  </ZoomableGroup>
</ComposableMap>
```

## Initial State

Set initial center and zoom level:

```tsx
<ZoomableGroup center={[0, 20]} zoom={2}>
  {/* ... */}
</ZoomableGroup>
```

## Zoom Limits

Control the zoom range:

```tsx
<ZoomableGroup minZoom={1} maxZoom={8}>
  {/* ... */}
</ZoomableGroup>
```

## Translation Limits

Restrict panning to a specific area:

```tsx
<ZoomableGroup
  translateExtent={[[-100, -100], [900, 700]]}
>
  {/* ... */}
</ZoomableGroup>
```

## Event Handlers

Respond to zoom and pan events:

```tsx
<ZoomableGroup
  onMoveStart={(data, event) => {
    console.log("Move started", data);
  }}
  onMove={(data, event) => {
    console.log("Moving", data);
  }}
  onMoveEnd={(data, event) => {
    console.log("Move ended", data);
  }}
>
  {/* ... */}
</ZoomableGroup>
```

## Filtering Events

Control which events trigger zoom/pan:

```tsx
<ZoomableGroup
  filterZoomEvent={(event) => {
    // Only allow zoom on wheel events, not touch
    return event.type === "wheel";
  }}
>
  {/* ... */}
</ZoomableGroup>
```

## Using the Hook

For more control, use the `useZoomPan` hook directly:

```tsx
import { useZoomPan } from "solid-simple-maps";

const zoomPan = useZoomPan({
  center: [0, 0],
  zoom: 1,
  minZoom: 1,
  maxZoom: 8,
});

// Access zoomPan.position(), zoomPan.transformString, etc.
```

## Interactions

- **Mouse wheel**: Zoom in/out
- **Click and drag**: Pan the map
- **Touch**: Pinch to zoom, drag to pan
- **Keyboard**: Arrow keys to pan (when focused)

