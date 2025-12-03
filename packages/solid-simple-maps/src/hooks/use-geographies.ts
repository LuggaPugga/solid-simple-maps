import type * as d3Geo from "d3-geo";
import type * as GeoJSON from "geojson";
import { createEffect, createMemo, createSignal } from "solid-js";
import { useMapContext } from "../components/map-provider";
import type { GeographyInput, PreparedFeature } from "../types";
import {
	fetchGeographies,
	getFeatures,
	getMesh,
	isString,
	prepareFeatures,
	prepareMesh,
} from "../utils";

export default function useGeographies({
	geography,
	parseGeographies,
}: {
	geography?: GeographyInput;
	parseGeographies?: (features: GeoJSON.Feature[]) => GeoJSON.Feature[];
}): {
	geographies: () => PreparedFeature[];
	outline: () =>
		| (d3Geo.ExtendedFeature & { rsmKey: string; svgPath: string | null })
		| undefined;
	borders: () =>
		| (d3Geo.ExtendedFeature & { rsmKey: string; svgPath: string | null })
		| undefined;
} {
	const { path } = useMapContext();
	const [output, setOutput] = createSignal<{
		geographies?: GeoJSON.Feature[];
		mesh?: {
			outline?: d3Geo.ExtendedFeature;
			borders?: d3Geo.ExtendedFeature;
		} | null;
	}>({});

	createEffect(() => {
		if (typeof window === "undefined") return;

		const geo = geography;
		const parse = parseGeographies;
		if (!geo) return;

		if (isString(geo)) {
			fetchGeographies(geo).then((geos) => {
				if (geos) {
					setOutput({
						geographies: getFeatures(geos, parse),
						mesh: getMesh(geos),
					});
				}
			});
		} else {
			setOutput({
				geographies: getFeatures(geo, parse),
				mesh: getMesh(geo),
			});
		}
	});

	const pathMemo = createMemo(() => path);

	const geographies = createMemo(() => {
		const outputValue = output();
		const pathFn = pathMemo();
		return prepareFeatures(outputValue.geographies || [], pathFn);
	});

	const outline = createMemo(() => {
		const outputValue = output();
		const pathFn = pathMemo();
		const mesh = outputValue.mesh || {};
		const preparedMesh = prepareMesh(mesh.outline, mesh.borders, pathFn);
		return preparedMesh.outline;
	});

	const borders = createMemo(() => {
		const outputValue = output();
		const pathFn = pathMemo();
		const mesh = outputValue.mesh || {};
		const preparedMesh = prepareMesh(mesh.outline, mesh.borders, pathFn);
		return preparedMesh.borders;
	});

	return {
		geographies,
		outline,
		borders,
	};
}
