# Map Files

Solid Simple Maps does not restrict you to one specific map and relies on custom map files that you can modify in any way necessary for your project. This means you can visualize countries, regions, and continents in various resolutions, as long as they can be represented using GeoJSON/TopoJSON.

## TopoJSON vs GeoJSON

Solid Simple Maps supports both TopoJSON and GeoJSON formats:

- **TopoJSON**: More compact, encodes topology (shared boundaries)
- **GeoJSON**: More common, easier to work with directly

TopoJSON files are generally preferred for web applications due to their smaller file size.

## Finding Map Files

Here are some excellent sources for map files:

### World Atlas
- [Topojson World Atlas](https://github.com/topojson/world-atlas) - Various world map resolutions
- CDN: `https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json`

### Natural Earth
- [Natural Earth Vector](https://github.com/nvkelso/natural-earth-vector) - High-quality vector maps
- Multiple resolutions available (10m, 50m, 110m)

### Custom Collections
- [Topojson maps by @deldersveld](https://github.com/deldersveld/topojson) - Various regional maps
- Includes country-specific maps, US states, European countries, etc.

## Using Map Files

### From URL

```tsx
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

<Geographies geography={geoUrl}>
  {({ geographies }) => /* ... */}
</Geographies>
```

### From Local File

```tsx
import worldMap from "./world-map.json";

<Geographies geography={worldMap}>
  {({ geographies }) => /* ... */}
</Geographies>
```

### From GeoJSON FeatureCollection

```tsx
const features = {
  type: "FeatureCollection",
  features: [/* your features */]
};

<Geographies geography={features}>
  {({ geographies }) => /* ... */}
</Geographies>
```

## Creating Custom Maps

To create your own TopoJSON maps from shapefiles:

1. Use [mapshaper](https://mapshaper.org/) to convert shapefiles to TopoJSON
2. Use [topojson](https://github.com/topojson/topojson) CLI tools
3. Use [QGIS](https://qgis.org/) with TopoJSON export plugins

For detailed instructions, check out ["How to convert and prepare TopoJSON files for interactive mapping with d3"](https://hackernoon.com/how-to-convert-and-prepare-topojson-files-for-interactive-mapping-with-d3-499cf0ced5f).

## Parsing Geographies

You can customize how geographies are parsed:

```tsx
<Geographies 
  geography={geoUrl}
  parseGeographies={(features) => {
    // Filter or transform features
    return features.filter(f => f.properties?.continent === "Europe");
  }}
>
  {({ geographies }) => /* ... */}
</Geographies>
```

