import * as d3Geo from "d3-geo";
import {
	type Context,
	createContext,
	createMemo,
	type JSX,
	type ParentComponent,
	useContext,
} from "solid-js";
import type { ProjectionConfig, ProjectionInput } from "../types";

const { geoPath, ...projections } = d3Geo;

interface MapContextValue {
	width: number;
	height: number;
	projection: d3Geo.GeoProjection;
	path: (
		geo:
			| d3Geo.GeoGeometryObjects
			| d3Geo.ExtendedFeature
			| d3Geo.ExtendedFeatureCollection
			| d3Geo.ExtendedGeometryCollection,
	) => string | null;
}

const defaultProjection = d3Geo.geoEqualEarth().translate([400, 300]);
const defaultPath = geoPath().projection(defaultProjection);

const defaultContextValue: MapContextValue = {
	width: 800,
	height: 600,
	projection: defaultProjection,
	path: defaultPath,
};

const MapContext: Context<MapContextValue> =
	createContext<MapContextValue>(defaultContextValue);

const applyProjectionConfig = (
	proj: d3Geo.GeoProjection,
	config: ProjectionConfig,
): d3Geo.GeoProjection => {
	if (config.center !== undefined && "center" in proj) {
		const centerMethod = proj.center as
			| ((center?: [number, number]) => typeof proj)
			| undefined;
		if (typeof centerMethod === "function") {
			proj = centerMethod(config.center) as d3Geo.GeoProjection;
		}
	}
	if (config.rotate !== undefined && "rotate" in proj) {
		const rotateMethod = proj.rotate as
			| ((rotate?: [number, number, number]) => typeof proj)
			| undefined;
		if (typeof rotateMethod === "function") {
			proj = rotateMethod(config.rotate) as d3Geo.GeoProjection;
		}
	}
	if (config.scale !== undefined && "scale" in proj) {
		const scaleMethod = proj.scale as
			| ((scale?: number) => typeof proj)
			| undefined;
		if (typeof scaleMethod === "function") {
			proj = scaleMethod(config.scale) as d3Geo.GeoProjection;
		}
	}
	if (config.parallels !== undefined && "parallels" in proj) {
		const parallelsMethod = (
			proj as { parallels?: (parallels?: [number, number]) => typeof proj }
		).parallels;
		if (typeof parallelsMethod === "function") {
			proj = parallelsMethod(config.parallels) as d3Geo.GeoProjection;
		}
	}

	return proj;
};

const makeProjection = ({
	projectionConfig = {},
	projection = "geoEqualEarth",
	width = 800,
	height = 600,
}: {
	projectionConfig?: ProjectionConfig;
	projection?: ProjectionInput;
	width?: number;
	height?: number;
}):
	| d3Geo.GeoProjection
	| ((coordinates: [number, number]) => [number, number] | null) => {
	if (typeof projection === "function") {
		return projection;
	}

	const projName = projection as keyof typeof projections;
	const projectionFactory = projections[projName] as
		| (() => d3Geo.GeoProjection)
		| undefined;
	if (typeof projectionFactory !== "function") {
		throw new Error(`Invalid projection: ${projection}`);
	}

	const proj = projectionFactory().translate([
		width / 2,
		height / 2,
	]) as d3Geo.GeoProjection;

	return applyProjectionConfig(proj, projectionConfig);
};

interface MapProviderProps {
	width: number;
	height: number;
	projection?: ProjectionInput;
	projectionConfig?: ProjectionConfig;
	children?: JSX.Element;
}

export const MapProvider: ParentComponent<MapProviderProps> = (props) => {
	const width = () => props.width;
	const height = () => props.height;
	const projection = () => props.projection || "geoEqualEarth";
	const projectionConfig = () => props.projectionConfig || {};

	const projMemo = createMemo(() => {
		const config = projectionConfig();
		return makeProjection({
			projectionConfig: config,
			projection: projection(),
			width: width(),
			height: height(),
		});
	});

	const value = createMemo<MapContextValue>(() => {
		const proj = projMemo();
		if (typeof proj === "function" && proj.length === 2) {
			throw new Error(
				"Custom projection functions are not supported in this context",
			);
		}
		const geoProjection = proj as d3Geo.GeoProjection;
		return {
			width: width(),
			height: height(),
			projection: geoProjection,
			path: geoPath().projection(geoProjection),
		};
	});

	return (
		<MapContext.Provider value={value()}>{props.children}</MapContext.Provider>
	);
};

export const useMapContext = (): MapContextValue => {
	return useContext(MapContext);
};

export { MapContext };
