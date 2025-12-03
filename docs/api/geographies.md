# Geographies

Loads and processes TopoJSON/GeoJSON data and provides prepared geographies to render.

## Props

```tsx
interface GeographiesProps extends Omit<JSX.GSVGAttributes<SVGGElement>, "children"> {
  geography?: GeographyInput;
  children?: (data: {
    geographies: PreparedFeature[];
    outline?: PreparedMesh;
    borders?: PreparedMesh;
    path: (geo: GeoGeometryObjects | ExtendedFeature | ExtendedFeatureCollection | ExtendedGeometryCollection) => string | null;
    projection: GeoProjection;
  }) => JSX.Element;
  parseGeographies?: (features: GeoJSON.Feature[]) => GeoJSON.Feature[];
  className?: string;
}
```

### geography

- **Type**: `string | Topology | GeoJSON.FeatureCollection | GeoJSON.Feature[] | GeoJSON.Feature`
- **Description**: URL to TopoJSON/GeoJSON file, or the data directly

### children

- **Type**: `function`
- **Description**: Children function that receives prepared geographies and utilities

### parseGeographies

- **Type**: `(features: GeoJSON.Feature[]) => GeoJSON.Feature[]`
- **Description**: Optional function to filter or transform features before rendering

### className

- **Type**: `string`
- **Description**: Additional CSS class name

## Children Function Parameters

### geographies

Array of prepared geography features with `rsmKey` and `svgPath` properties.

### outline

Optional outline mesh for the entire geography.

### borders

Optional border mesh between features.

### path

Function to generate SVG path strings from GeoJSON geometries.

### projection

The d3-geo projection function being used.

## Example

```tsx
import { For } from "solid-js";
import { Geographies, Geography } from "solid-simple-maps";

<Geographies geography={geoUrl}>
  {({ geographies, outline, borders, path, projection }) => (
    <For each={geographies}>
      {(geo) => <Geography geography={geo} />}
    </For>
  )}
</Geographies>
```

