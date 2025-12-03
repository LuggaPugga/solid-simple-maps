import { select as d3Select } from "d3-selection";
import {
	zoom as d3Zoom,
	zoomIdentity as d3ZoomIdentity,
	type ZoomBehavior,
} from "d3-zoom";
import { createEffect, createSignal } from "solid-js";
import { useMapContext } from "../components/map-provider";
import { getCoords } from "../utils";

export default function useZoomPan({
	center,
	filterZoomEvent,
	onMoveStart,
	onMoveEnd,
	onMove,
	translateExtent = [
		[-Infinity, -Infinity],
		[Infinity, Infinity],
	],
	scaleExtent = [1, 8],
	zoom = 1,
}: {
	center: [number, number];
	filterZoomEvent?: (event: unknown) => boolean;
	onMoveStart?: (
		data: { coordinates: [number, number]; zoom: number },
		event: unknown,
	) => void;
	onMoveEnd?: (
		data: { coordinates: [number, number]; zoom: number },
		event: unknown,
	) => void;
	onMove?: (
		data: { x: number; y: number; zoom: number; dragging?: unknown },
		event: unknown,
	) => void;
	translateExtent?: [[number, number], [number, number]];
	scaleExtent?: [number, number];
	zoom?: number;
}): {
	mapRef: (el: SVGSVGElement | SVGGElement) => void;
	position: () => { x: number; y: number; k: number; dragging?: unknown };
	transformString: string;
} {
	const { width, height, projection } = useMapContext();

	const [lon, lat] = center;
	const [position, setPosition] = createSignal<{
		x: number;
		y: number;
		k: number;
		dragging?: unknown;
	}>({ x: 0, y: 0, k: 1 });
	const lastPosition = { x: 0, y: 0, k: 1 };
	let mapRef: SVGSVGElement | SVGGElement | undefined;
	let zoomRef: ZoomBehavior<SVGSVGElement | SVGGElement, unknown> | undefined;
	let bypassEvents = false;

	const [a, b] = translateExtent;
	const [a1, a2] = a;
	const [b1, b2] = b;
	const [minZoom, maxZoom] = scaleExtent;

	createEffect(() => {
		if (!mapRef) return;

		const svg = d3Select<SVGSVGElement | SVGGElement, unknown>(mapRef);

		function handleZoomStart(d3Event: {
			transform: { k: number; x: number; y: number };
		}) {
			if (!onMoveStart || bypassEvents) return;
			const inverted = projection.invert?.(
				getCoords(width, height, d3Event.transform),
			);
			if (!inverted) return;
			onMoveStart(
				{
					coordinates: inverted as [number, number],
					zoom: d3Event.transform.k,
				},
				d3Event,
			);
		}

		function handleZoom(d3Event: {
			transform: { k: number; x: number; y: number };
			sourceEvent?: unknown;
		}) {
			if (bypassEvents) return;
			const { transform, sourceEvent } = d3Event;
			setPosition({
				x: transform.x,
				y: transform.y,
				k: transform.k,
				dragging: sourceEvent,
			});
			if (!onMove) return;
			onMove(
				{
					x: transform.x,
					y: transform.y,
					zoom: transform.k,
					dragging: sourceEvent,
				},
				d3Event,
			);
		}

		function handleZoomEnd(d3Event: {
			transform: { k: number; x: number; y: number };
		}) {
			if (bypassEvents) {
				bypassEvents = false;
				return;
			}
			const inverted = projection.invert?.(
				getCoords(width, height, d3Event.transform),
			);
			if (!inverted) return;
			const [x, y] = inverted as [number, number];
			lastPosition.x = x;
			lastPosition.y = y;
			lastPosition.k = d3Event.transform.k;
			if (!onMoveEnd) return;
			onMoveEnd({ coordinates: [x, y], zoom: d3Event.transform.k }, d3Event);
		}

		function filterFunc(
			d3Event: { ctrlKey?: boolean; button?: number } | null,
		) {
			if (filterZoomEvent) {
				return filterZoomEvent(d3Event);
			}
			return d3Event ? !d3Event.ctrlKey && !d3Event.button : false;
		}

		const zoom = d3Zoom<SVGSVGElement | SVGGElement, unknown>()
			.filter(filterFunc)
			.scaleExtent([minZoom, maxZoom])
			.translateExtent([
				[a1, a2],
				[b1, b2],
			])
			.on("start", handleZoomStart)
			.on("zoom", handleZoom)
			.on("end", handleZoomEnd);

		zoomRef = zoom;
		svg.call(zoom as ZoomBehavior<SVGSVGElement | SVGGElement, unknown>);
	});

	createEffect(() => {
		if (!mapRef || !zoomRef) return;
		if (
			lon === lastPosition.x &&
			lat === lastPosition.y &&
			zoom === lastPosition.k
		)
			return;

		const coords = projection([lon, lat]);
		if (!coords) return;
		const x = coords[0] * zoom;
		const y = coords[1] * zoom;
		const svg = d3Select<SVGSVGElement | SVGGElement, unknown>(mapRef);

		bypassEvents = true;

		if (zoomRef) {
			svg.call(
				zoomRef.transform,
				d3ZoomIdentity.translate(width / 2 - x, height / 2 - y).scale(zoom),
			);
		}
		setPosition({ x: width / 2 - x, y: height / 2 - y, k: zoom });

		lastPosition.x = lon;
		lastPosition.y = lat;
		lastPosition.k = zoom;
	});

	const mapRefCallback = (el: SVGSVGElement | SVGGElement) => {
		mapRef = el as SVGSVGElement;
	};

	return {
		mapRef: mapRefCallback,
		position,
		get transformString() {
			const pos = position();
			return `translate(${pos.x} ${pos.y}) scale(${pos.k})`;
		},
	};
}
