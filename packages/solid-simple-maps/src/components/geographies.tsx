import type * as d3Geo from "d3-geo";
import type * as GeoJSON from "geojson";
import {
	type Component,
	createMemo,
	type JSX,
	Show,
	splitProps,
} from "solid-js";
import useGeographies from "../hooks/use-geographies";
import type { GeographyInput, PreparedFeature, PreparedMesh } from "../types";
import { useMapContext } from "./map-provider";

interface GeographiesProps
	extends Omit<JSX.GSVGAttributes<SVGGElement>, "children"> {
	geography?: GeographyInput;
	children?: (data: {
		geographies: PreparedFeature[];
		outline?: PreparedMesh;
		borders?: PreparedMesh;
		path: (
			geo:
				| d3Geo.GeoGeometryObjects
				| d3Geo.ExtendedFeature
				| d3Geo.ExtendedFeatureCollection
				| d3Geo.ExtendedGeometryCollection,
		) => string | null;
		projection: d3Geo.GeoProjection;
	}) => JSX.Element;
	parseGeographies?: (features: GeoJSON.Feature[]) => GeoJSON.Feature[];
	className?: string;
}

export const Geographies: Component<GeographiesProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"geography",
		"children",
		"parseGeographies",
		"className",
	]);
	const { path, projection } = useMapContext();
	const { geographies, outline, borders } = useGeographies({
		geography: local.geography,
		parseGeographies: local.parseGeographies,
	});

	const className = () => local.className ?? "";

	const hasGeographies = createMemo(
		() => geographies() && geographies().length > 0,
	);

	return (
		<g class={`rsm-geographies ${className()}`} {...rest}>
			<Show when={hasGeographies()}>
				{local.children?.({
					geographies: geographies(),
					outline: outline(),
					borders: borders(),
					path,
					projection,
				})}
			</Show>
		</g>
	);
};

export default Geographies;
