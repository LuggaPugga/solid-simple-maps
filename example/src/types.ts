import type * as GeoJSON from "geojson";

export type CountryProperties = GeoJSON.GeoJsonProperties & {
	NAME?: string;
	name?: string;
};

export type Demo =
	| "basic"
	| "interactive"
	| "markers"
	| "custom"
	| "annotations"
	| "lines";

export type City = {
	name: string;
	coords: [number, number];
	color: string;
};

export type GeographyFeature = GeoJSON.Feature & {
	rsmKey: string;
	svgPath: string | null;
};

export type ColorScheme = {
	sphereFill: string;
	sphereStroke: string;
	defaultFill: string;
	hoverFill: string;
	selectedFill: string;
	pressedFill: string;
	subtleHover: string;
};
