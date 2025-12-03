# Annotation

Adds an annotation with a connector line to a specific location on the map.

## Props

```tsx
interface AnnotationProps extends JSX.GSVGAttributes<SVGGElement> {
  subject: [number, number];
  children?: JSX.Element;
  connectorProps?: JSX.PathSVGAttributes<SVGPathElement>;
  dx?: number;
  dy?: number;
  curve?: number | [number, number];
  className?: string;
}
```

### subject

- **Type**: `[number, number]`
- **Required**: `true`
- **Description**: `[longitude, latitude]` coordinates of the annotation subject

### dx / dy

- **Type**: `number`
- **Default**: `30`
- **Description**: Offset from the subject point

### curve

- **Type**: `number | [number, number]`
- **Default**: `0`
- **Description**: Curvature of the connector line

### connectorProps

- **Type**: `JSX.PathSVGAttributes<SVGPathElement>`
- **Description**: Props to pass to the connector path element

## Example

```tsx
<Annotation subject={[-74.006, 40.7128]} dx={50} dy={50}>
  <rect x={-40} y={-20} width={80} height={40} fill="white" stroke="#333" />
  <text text-anchor="middle" y={5}>New York</text>
</Annotation>
```

