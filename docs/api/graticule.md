# Graticule

Renders a graticule (grid lines) on the map.

## Props

```tsx
interface GraticuleProps extends JSX.PathSVGAttributes<SVGPathElement> {
  fill?: string;
  stroke?: string;
  step?: [number, number];
  className?: string;
}
```

### step

- **Type**: `[number, number]`
- **Default**: `[10, 10]`
- **Description**: Step size for graticule lines `[longitude, latitude]` in degrees

### fill

- **Type**: `string`
- **Default**: `"transparent"`
- **Description**: Fill color

### stroke

- **Type**: `string`
- **Default**: `"currentcolor"`
- **Description**: Stroke color

## Example

```tsx
<Graticule step={[15, 15]} stroke="#ccc" strokeWidth={0.5} />
```

