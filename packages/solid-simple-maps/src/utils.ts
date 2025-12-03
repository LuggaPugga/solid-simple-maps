import type * as d3Geo from "d3-geo";
import type * as GeoJSON from "geojson";
import { feature, mesh } from "topojson-client";
import type { Topology } from "topojson-specification";

export function getCoords(
	w: number,
	h: number,
	t: { k: number; x: number; y: number },
): [number, number] {
	const xOffset = (w * t.k - w) / 2;
	const yOffset = (h * t.k - h) / 2;
	return [w / 2 - (xOffset + t.x) / t.k, h / 2 - (yOffset + t.y) / t.k];
}

type GeographyData =
	| Topology
	| GeoJSON.FeatureCollection
	| GeoJSON.Feature[]
	| GeoJSON.Feature;

function isTopology(data: GeographyData): data is Topology {
	return (
		typeof data === "object" &&
		data !== null &&
		"type" in data &&
		data.type === "Topology"
	);
}

function isFeatureCollection(
	data: GeographyData,
): data is GeoJSON.FeatureCollection {
	return (
		typeof data === "object" &&
		data !== null &&
		"type" in data &&
		data.type === "FeatureCollection"
	);
}

export function fetchGeographies(
	url: string,
): Promise<Topology | GeoJSON.FeatureCollection | undefined> {
	return fetch(url)
		.then((res) => {
			if (!res.ok) {
				throw Error(res.statusText);
			}
			return res.json() as Promise<Topology | GeoJSON.FeatureCollection>;
		})
		.catch((error) => {
			console.log("There was a problem when fetching the data: ", error);
			return undefined;
		});
}

type PreparedFeature = GeoJSON.Feature & {
	rsmKey: string;
	svgPath: string | null;
};

export function getFeatures(
	geographies: GeographyData,
	parseGeographies?: (features: GeoJSON.Feature[]) => GeoJSON.Feature[],
): GeoJSON.Feature[] {
	if (isTopology(geographies)) {
		const firstObjectKey = Object.keys(geographies.objects)[0];
		const geometryObject = geographies.objects[firstObjectKey];
		const featureResult = feature(geographies, geometryObject);
		const feats =
			"features" in featureResult ? featureResult.features : [featureResult];
		return parseGeographies ? parseGeographies(feats) : feats;
	}
	if (isFeatureCollection(geographies)) {
		const features = geographies.features;
		return parseGeographies ? parseGeographies(features) : features;
	}
	if (Array.isArray(geographies)) {
		return parseGeographies ? parseGeographies(geographies) : geographies;
	}
	const singleFeature = geographies as GeoJSON.Feature;
	return parseGeographies ? parseGeographies([singleFeature]) : [singleFeature];
}

type PreparedMesh = {
	outline?: d3Geo.ExtendedFeature & { rsmKey: string; svgPath: string | null };
	borders?: d3Geo.ExtendedFeature & { rsmKey: string; svgPath: string | null };
};

export function getMesh(geographies: GeographyData): {
	outline?: d3Geo.ExtendedFeature;
	borders?: d3Geo.ExtendedFeature;
} | null {
	if (!isTopology(geographies)) return null;
	const firstObjectKey = Object.keys(geographies.objects)[0];
	const geometryObject = geographies.objects[firstObjectKey];
	const outlineMesh = mesh(
		geographies,
		geometryObject as import("topojson-specification").GeometryObject,
		() => true,
	);
	const bordersMesh = mesh(
		geographies,
		geometryObject as import("topojson-specification").GeometryObject,
		() => false,
	);
	const outline: d3Geo.ExtendedFeature = {
		type: "Feature",
		geometry: outlineMesh,
		properties: {},
	};
	const borders: d3Geo.ExtendedFeature = {
		type: "Feature",
		geometry: bordersMesh,
		properties: {},
	};
	return { outline, borders };
}

export function prepareMesh(
	outline: d3Geo.ExtendedFeature | undefined,
	borders: d3Geo.ExtendedFeature | undefined,
	path: (
		geo:
			| d3Geo.GeoGeometryObjects
			| d3Geo.ExtendedFeature
			| d3Geo.ExtendedFeatureCollection
			| d3Geo.ExtendedGeometryCollection,
	) => string | null,
): PreparedMesh {
	if (!outline || !borders) {
		return {};
	}
	return {
		outline: {
			...outline,
			rsmKey: "outline",
			svgPath: path(outline),
		},
		borders: {
			...borders,
			rsmKey: "borders",
			svgPath: path(borders),
		},
	};
}

export function prepareFeatures(
	geographies: GeoJSON.Feature[],
	path: (
		geo:
			| d3Geo.GeoGeometryObjects
			| d3Geo.ExtendedFeature
			| d3Geo.ExtendedFeatureCollection
			| d3Geo.ExtendedGeometryCollection,
	) => string | null,
): PreparedFeature[] {
	return geographies.map((d, i) => {
		return {
			...d,
			rsmKey: `geo-${i}`,
			svgPath: path(d),
		};
	});
}

export function createConnectorPath(
	dx = 30,
	dy = 30,
	curve: number | [number, number] = 0.5,
): string {
	const curvature = Array.isArray(curve) ? curve : [curve, curve];
	const curveX = (dx / 2) * curvature[0];
	const curveY = (dy / 2) * curvature[1];
	return `M${0},${0} Q${-dx / 2 - curveX},${-dy / 2 + curveY} ${-dx},${-dy}`;
}

export function isString(geo: unknown): geo is string {
	return typeof geo === "string";
}
