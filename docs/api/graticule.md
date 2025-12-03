# Graticule

Renders a graticule (grid lines) on the map.

## Props

```tsx
interface GraticuleProps extends JSX.PathSVGAttributes<SVGPathElement> {
  step?: [number, number];
  className?: string;
}
```

### step

- **Type**: `[number, number]`
- **Description**: Step size for graticule lines `[longitude, latitude]` in degrees

## Example

```tsx
<Graticule step={[15, 15]} stroke="#ccc" strokeWidth={0.5} />
```

