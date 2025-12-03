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

- **geography**: Geography input (URL, Topology, or GeoJSON)
- **parseGeographies**: Optional function to filter/transform features

## Returns

- **geographies**: Signal containing prepared geography features
- **outline**: Signal containing outline mesh
- **borders**: Signal containing border mesh

