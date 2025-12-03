# Interactive Map

A map with zoom and pan functionality.

```tsx
import { For } from "solid-js";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "solid-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const App = () => {
  return (
    <ComposableMap width={800} height={600}>
      <ZoomableGroup center={[0, 0]} zoom={1}>
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <For each={geographies}>
              {(geo) => (
                <Geography
                  geography={geo}
                  style={{
                    default: { fill: "#D6D6DA", outline: "none" },
                    hover: { fill: "#F53", outline: "none", cursor: "pointer" },
                  }}
                />
              )}
            </For>
          )}
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};
```

