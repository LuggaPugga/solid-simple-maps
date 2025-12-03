# Marker

Places a marker at specific geographic coordinates.

## Props

```tsx
interface MarkerProps extends JSX.GSVGAttributes<SVGGElement> {
  coordinates: [number, number];
  children?: JSX.Element;
  onMouseEnter?: (evt: MouseEvent) => void;
  onMouseLeave?: (evt: MouseEvent) => void;
  onMouseDown?: (evt: MouseEvent) => void;
  onMouseUp?: (evt: MouseEvent) => void;
  onFocus?: (evt: FocusEvent) => void;
  onBlur?: (evt: FocusEvent) => void;
  style?: {
    default?: JSX.CSSProperties;
    hover?: JSX.CSSProperties;
    pressed?: JSX.CSSProperties;
  };
  className?: string;
}
```

### coordinates

- **Type**: `[number, number]`
- **Required**: `true`
- **Description**: `[longitude, latitude]` coordinates

### children

- **Type**: `JSX.Element`
- **Description**: SVG elements to render at the marker location

## Example

```tsx
<Marker coordinates={[-74.006, 40.7128]}>
  <circle r={8} fill="#F53" />
  <text y={-15} text-anchor="middle">New York</text>
</Marker>
```

