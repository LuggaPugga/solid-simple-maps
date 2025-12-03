import { type JSX, type ParentComponent, splitProps } from "solid-js";
import type { ProjectionConfig, ProjectionInput } from "../types";
import { MapProvider } from "./map-provider";

interface ComposableMapProps extends JSX.GSVGAttributes<SVGSVGElement> {
	width?: number;
	height?: number;
	projection?: ProjectionInput | "geoEqualEarth";
	projectionConfig?: ProjectionConfig;
	className?: string;
}

export const ComposableMap: ParentComponent<ComposableMapProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"width",
		"height",
		"projection",
		"projectionConfig",
		"className",
		"children",
	]);
	const width = () => local.width ?? 800;
	const height = () => local.height ?? 600;
	const projection = () => local.projection ?? "geoEqualEarth";
	const projectionConfig = () => local.projectionConfig ?? {};
	const className = () => local.className ?? "";

	return (
		<MapProvider
			width={width()}
			height={height()}
			projection={projection()}
			projectionConfig={projectionConfig()}
		>
			<svg
				aria-label="Composable Map"
				role="img"
				viewBox={`0 0 ${width()} ${height()}`}
				class={`rsm-svg ${className()}`}
				{...rest}
			>
				{props.children}
			</svg>
		</MapProvider>
	);
};

export default ComposableMap;
