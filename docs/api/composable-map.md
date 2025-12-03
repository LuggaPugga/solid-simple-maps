# ComposableMap

The main container component that sets up the SVG and map projection.

## Props

```tsx
interface ComposableMapProps extends JSX.GSVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  projection?: string | ((coordinates: [number, number]) => [number, number] | null);
  projectionConfig?: {
    center?: [number, number];
    rotate?: [number, number, number];
    scale?: number;
    parallels?: [number, number];
  };
  className?: string;
  children?: JSX.Element;
}
```

### width

- **Type**: `number`
- **Default**: `800`
- **Description**: Width of the SVG map in pixels

### height

- **Type**: `number`
- **Default**: `600`
- **Description**: Height of the SVG map in pixels

### projection

- **Type**: `string | ((coordinates: [number, number]) => [number, number] | null)`
- **Default**: `"geoEqualEarth"`
- **Description**: Projection name or custom projection function

### projectionConfig

- **Type**: `object`
- **Default**: `{}`
- **Description**: Configuration for the projection

### className

- **Type**: `string`
- **Default**: `""`
- **Description**: Additional CSS class name

## Example

```tsx
<ComposableMap width={800} height={600} projection="geoMercator">
  <Geographies geography={geoUrl}>
    {({ geographies }) => /* ... */}
  </Geographies>
</ComposableMap>
```

