# Custom Styling

Customizing map appearance with styles and colors.

```tsx
import { For } from "solid-js";
import { ComposableMap, Geographies, Geography, Sphere } from "solid-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const App = () => {
  return (
    <ComposableMap width={800} height={600}>
      <Sphere fill="#e8f4f8" stroke="#ccc" />
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <For each={geographies}>
            {(geo) => {
              const color = `hsl(${Math.random() * 360}, 70%, 50%)`;
              return (
                <Geography
                  geography={geo}
                  style={{
                    default: { fill: color, outline: "none" },
                    hover: { fill: color, outline: "2px solid #333", cursor: "pointer" },
                  }}
                />
              );
            }}
          </For>
        )}
      </Geographies>
    </ComposableMap>
  );
};
```

