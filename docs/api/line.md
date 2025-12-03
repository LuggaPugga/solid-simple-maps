# Line

Draws a line between coordinates on the map.

## Props

```tsx
interface LineProps extends JSX.PathSVGAttributes<SVGPathElement> {
  from?: [number, number];
  to?: [number, number];
  coordinates?: [number, number][];
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  className?: string;
}
```

### from / to

- **Type**: `[number, number]`
- **Description**: Start and end coordinates `[longitude, latitude]` for a simple line

### coordinates

- **Type**: `[number, number][]`
- **Description**: Array of coordinates `[longitude, latitude]` for a multi-point line

### stroke

- **Type**: `string`
- **Default**: `"currentcolor"`
- **Description**: Stroke color

### strokeWidth

- **Type**: `number`
- **Default**: `3`
- **Description**: Stroke width in pixels

### fill

- **Type**: `string`
- **Default**: `"transparent"`
- **Description**: Fill color

## Example

```tsx
<Line
  from={[-74.006, 40.7128]}
  to={[2.3522, 48.8566]}
  stroke="#F53"
  strokeWidth={2}
/>

<Line
  coordinates={[
    [-74.006, 40.7128],
    [0, 0],
    [2.3522, 48.8566],
  ]}
  stroke="#F53"
  strokeWidth={2}
/>
```

