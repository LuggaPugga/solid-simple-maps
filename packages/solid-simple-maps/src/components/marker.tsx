import { type Component, type JSX, splitProps } from "solid-js";
import { useInteractiveHandlers } from "../hooks/use-interactive-handlers";
import { useMapContext } from "./map-provider";

interface MarkerProps extends JSX.GSVGAttributes<SVGGElement> {
	coordinates: [number, number];
	children?: JSX.Element;
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

export const Marker: Component<MarkerProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"coordinates",
		"children",
		"onMouseEnter",
		"onMouseLeave",
		"onMouseDown",
		"onMouseUp",
		"onFocus",
		"onBlur",
		"style",
		"className",
	]);
	const { projection } = useMapContext();
	const coords = () => projection(local.coordinates);
	const x = () => coords()?.[0] ?? 0;
	const y = () => coords()?.[1] ?? 0;

	const {
		handleMouseEnter,
		handleMouseLeave,
		handleFocus,
		handleBlur,
		handleMouseDown,
		handleMouseUp,
		computedStyle,
	} = useInteractiveHandlers({
		onMouseEnter: local.onMouseEnter,
		onMouseLeave: local.onMouseLeave,
		onMouseDown: local.onMouseDown,
		onMouseUp: local.onMouseUp,
		onFocus: local.onFocus,
		onBlur: local.onBlur,
		style: local.style,
	});

	const className = () => local.className ?? "";

	return (
		<g
			transform={`translate(${x()}, ${y()})`}
			class={`rsm-marker ${className()}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			style={computedStyle()}
			{...rest}
		>
			{local.children}
		</g>
	);
};

export default Marker;
