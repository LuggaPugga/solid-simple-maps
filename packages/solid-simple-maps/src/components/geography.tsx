import { type Component, type JSX, splitProps } from "solid-js";
import { useInteractiveHandlers } from "../hooks/use-interactive-handlers";
import type { PreparedFeature } from "../types";

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

export const Geography: Component<GeographyProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"geography",
		"onMouseEnter",
		"onMouseLeave",
		"onMouseDown",
		"onMouseUp",
		"onFocus",
		"onBlur",
		"style",
		"className",
	]);

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
		<path
			tabIndex="0"
			class={`rsm-geography ${className()}`}
			d={local.geography.svgPath || undefined}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			style={computedStyle()}
			{...rest}
		/>
	);
};

export default Geography;
