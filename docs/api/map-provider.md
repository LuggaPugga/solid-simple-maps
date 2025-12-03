# MapProvider

Context provider that supplies map configuration to child components.

## Usage

```tsx
import { MapProvider, useMapContext } from "solid-simple-maps";

const MyComponent = () => {
  const { width, height, projection, path } = useMapContext();
  // Use map context
};
```

## Context Value

- **width**: Map width
- **height**: Map height
- **projection**: Projection function
- **path**: Path generator function

