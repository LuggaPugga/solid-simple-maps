# Projections

Map projections transform the 3D Earth onto a 2D surface. Solid Simple Maps supports various built-in projections and allows you to use custom projection functions.

## Built-in Projections

### Equal Earth (Default)

The default projection, good for world maps with minimal distortion:

```tsx
<ComposableMap projection="geoEqualEarth">
  {/* ... */}
</ComposableMap>
```

### Mercator

Classic cylindrical projection, good for navigation but distorts areas near poles:

```tsx
<ComposableMap projection="geoMercator">
  {/* ... */}
</ComposableMap>
```

### Natural Earth

Balanced projection with low distortion:

```tsx
<ComposableMap projection="geoNaturalEarth1">
  {/* ... */}
</ComposableMap>
```

### Orthographic

Globe-like appearance:

```tsx
<ComposableMap projection="geoOrthographic">
  {/* ... */}
</ComposableMap>
```

### Other Available Projections

- `geoAlbers`
- `geoAlbersUsa`
- `geoAzimuthalEqualArea`
- `geoConicConformal`
- `geoConicEqualArea`
- `geoEquirectangular`
- `geoGnomonic`
- `geoMollweide`
- `geoStereographic`
- `geoTransverseMercator`

## Projection Configuration

Customize projection parameters:

```tsx
<ComposableMap
  projection="geoMercator"
  projectionConfig={{
    center: [0, 20],
    scale: 100,
    rotate: [-10, 0, 0],
  }}
>
  {/* ... */}
</ComposableMap>
```

### Configuration Options

- **center**: `[longitude, latitude]` - Center of the projection
- **scale**: `number` - Scale factor
- **rotate**: `[x, y, z]` - Rotation angles in degrees
- **parallels**: `[lat1, lat2]` - Standard parallels (for conic projections)

## Custom Projections

You can provide a custom projection function:

```tsx
const customProjection = (coords: [number, number]): [number, number] | null => {
  const [lon, lat] = coords;
  // Your custom projection logic
  return [lon * 2, lat * 2];
};

<ComposableMap projection={customProjection}>
  {/* ... */}
</ComposableMap>
```

## Choosing a Projection

- **World maps**: Use `geoEqualEarth` or `geoNaturalEarth1`
- **Regional maps**: Use `geoMercator` or `geoAlbers`
- **USA maps**: Use `geoAlbersUsa`
- **Globe view**: Use `geoOrthographic`
- **Navigation**: Use `geoMercator`

