import { geoGraticule } from "d3-geo";
import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { useMapContext } from "./map-provider";

interface GraticuleProps extends JSX.PathSVGAttributes<SVGPathElement> {
	fill?: string;
	stroke?: string;
	step?: [number, number];
	className?: string;
}

export const Graticule: Component<GraticuleProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"fill",
		"stroke",
		"step",
		"className",
	]);
	const { path } = useMapContext();
	const step = () => local.step ?? [10, 10];
	const fill = () => local.fill ?? "transparent";
	const stroke = () => local.stroke ?? "currentcolor";
	const className = () => local.className ?? "";

	return (
		<path
			d={path(geoGraticule().step(step())()) || undefined}
			fill={fill()}
			stroke={stroke()}
			class={`rsm-graticule ${className()}`}
			{...rest}
		/>
	);
};

export default Graticule;
