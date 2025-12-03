# Markers

Adding markers to your map.

```tsx
import { For } from "solid-js";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "solid-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const App = () => {
  return (
    <ComposableMap width={800} height={600}>
      <ZoomableGroup>
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <For each={geographies}>
              {(geo) => <Geography geography={geo} />}
            </For>
          )}
        </Geographies>
        <Marker coordinates={[-74.006, 40.7128]}>
          <circle r={8} fill="#F53" />
          <text y={-15} text-anchor="middle">New York</text>
        </Marker>
        <Marker coordinates={[2.3522, 48.8566]}>
          <circle r={8} fill="#F53" />
          <text y={-15} text-anchor="middle">Paris</text>
        </Marker>
      </ZoomableGroup>
    </ComposableMap>
  );
};
```

