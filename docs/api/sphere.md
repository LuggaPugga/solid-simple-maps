# Sphere

Renders the globe background (sphere outline).

## Props

```tsx
interface SphereProps extends JSX.PathSVGAttributes<SVGPathElement> {
  id?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
}
```

### id

- **Type**: `string`
- **Default**: `"rsm-sphere"`
- **Description**: ID for the clipPath element

### fill

- **Type**: `string`
- **Default**: `"transparent"`
- **Description**: Fill color

### stroke

- **Type**: `string`
- **Default**: `"currentcolor"`
- **Description**: Stroke color

### strokeWidth

- **Type**: `number`
- **Default**: `0.5`
- **Description**: Stroke width in pixels

## Example

```tsx
<Sphere fill="#e8f4f8" stroke="#ccc" />
```

