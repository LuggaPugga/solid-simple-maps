# Getting Started

## Installation

Install `solid-simple-maps` using your preferred package manager:

```bash
npm install solid-simple-maps
```

```bash
pnpm add solid-simple-maps
```

```bash
yarn add solid-simple-maps
```

```bash
bun add solid-simple-maps
```

## Peer Dependencies

Make sure you have `solid-js` installed:

```bash
npm install solid-js
```

## Basic Usage

Here's a minimal example to get you started:

```tsx
import { For } from "solid-js";
import { render } from "solid-js/web";
import { ComposableMap, Geographies, Geography } from "solid-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const App = () => {
  return (
    <ComposableMap width={800} height={600}>
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <For each={geographies}>
            {(geo) => <Geography geography={geo} />}
          </For>
        )}
      </Geographies>
    </ComposableMap>
  );
};

render(() => <App />, document.getElementById("app")!);
```

## What You Get

- **ComposableMap**: The main container component that sets up the SVG and projection
- **Geographies**: Loads and processes TopoJSON/GeoJSON data
- **Geography**: Renders individual geographic features
- **Marker**: Place markers at specific coordinates
- **Line**: Draw lines between coordinates
- **Annotation**: Add annotations with connectors
- **ZoomableGroup**: Enable zoom and pan interactions
- **Graticule**: Add grid lines to your map
- **Sphere**: Render the globe background

## Next Steps

- Learn about [Map Files](/guide/map-files)
- Explore [Projections](/guide/projections)
- Check out [Zoom & Pan](/guide/zoom-pan)
- Browse [Examples](/examples/basic)

