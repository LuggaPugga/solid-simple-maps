# useGeographies

Hook to load and process geography data.

## Usage

```tsx
import { useGeographies } from "solid-simple-maps";

const { geographies, outline, borders } = useGeographies({
  geography: geoUrl,
  parseGeographies: (features) => features,
});
```

## Parameters

### geography

- **Type**: `string | Topology | GeoJSON.FeatureCollection | GeoJSON.Feature[] | GeoJSON.Feature`
- **Description**: URL to TopoJSON/GeoJSON file, or the data directly

### parseGeographies

- **Type**: `(features: GeoJSON.Feature[]) => GeoJSON.Feature[]`
- **Description**: Optional function to filter or transform features before rendering

## Returns

- **geographies**: Signal containing array of `PreparedFeature` objects (each with `rsmKey` and `svgPath` properties)
- **outline**: Signal containing outline mesh (or `undefined` if not available)
- **borders**: Signal containing border mesh (or `undefined` if not available)

