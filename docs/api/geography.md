# Geography

Renders an individual geographic feature as an SVG path.

## Props

```tsx
interface GeographyProps extends JSX.PathSVGAttributes<SVGPathElement> {
  geography: PreparedFeature;
  onMouseEnter?: (evt: MouseEvent) => void;
  onMouseLeave?: (evt: MouseEvent) => void;
  onMouseDown?: (evt: MouseEvent) => void;
  onMouseUp?: (evt: MouseEvent) => void;
  onFocus?: (evt: FocusEvent) => void;
  onBlur?: (evt: FocusEvent) => void;
  style?: {
    default?: JSX.CSSProperties;
    hover?: JSX.CSSProperties;
    pressed?: JSX.CSSProperties;
  };
  className?: string;
}
```

### geography

- **Type**: `PreparedFeature`
- **Required**: `true`
- **Description**: Prepared geography object from Geographies component

### style

- **Type**: `object`
- **Description**: Style object with `default`, `hover`, and `pressed` states

### Event Handlers

All standard mouse and focus event handlers are supported.

## Example

```tsx
<Geography
  geography={geo}
  style={{
    default: { fill: "#D6D6DA", outline: "none" },
    hover: { fill: "#F53", outline: "none", cursor: "pointer" },
    pressed: { fill: "#E42", outline: "none" },
  }}
  onMouseEnter={() => console.log("Hovered")}
/>
```

