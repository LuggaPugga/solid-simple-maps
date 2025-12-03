import type * as d3Geo from "d3-geo";
import type * as GeoJSON from "geojson";
import type { Topology } from "topojson-specification";

export type GeographyInput =
	| string
	| Topology
	| GeoJSON.FeatureCollection
	| GeoJSON.Feature[]
	| GeoJSON.Feature;

export type PreparedFeature = GeoJSON.Feature & {
	rsmKey: string;
	svgPath: string | null;
};

export type PreparedMesh = d3Geo.ExtendedFeature & {
	rsmKey: string;
	svgPath: string | null;
};

export type ProjectionConfig = {
	center?: [number, number];
	rotate?: [number, number, number];
	scale?: number;
	parallels?: [number, number];
};

export type ProjectionInput =
	| string
	| ((coordinates: [number, number]) => [number, number] | null);
