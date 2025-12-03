import type * as GeoJSON from "geojson";
import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { useMapContext } from "./map-provider";

interface LineProps extends JSX.PathSVGAttributes<SVGPathElement> {
	from?: [number, number];
	to?: [number, number];
	coordinates?: [number, number][];
	stroke?: string;
	strokeWidth?: number;
	fill?: string;
	className?: string;
}

export const Line: Component<LineProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"from",
		"to",
		"coordinates",
		"stroke",
		"strokeWidth",
		"fill",
		"className",
	]);
	const { path } = useMapContext();

	const lineData = (): GeoJSON.LineString => ({
		type: "LineString",
		coordinates: local.coordinates || [
			local.from ?? [0, 0],
			local.to ?? [0, 0],
		],
	});

	const stroke = () => local.stroke ?? "currentcolor";
	const strokeWidth = () => local.strokeWidth ?? 3;
	const fill = () => local.fill ?? "transparent";
	const className = () => local.className ?? "";

	return (
		<path
			d={path(lineData()) || undefined}
			class={`rsm-line ${className()}`}
			stroke={stroke()}
			stroke-width={strokeWidth()}
			fill={fill()}
			{...rest}
		/>
	);
};

export default Line;
