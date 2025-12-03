import type { JSX, ParentComponent } from "solid-js";
import { splitProps } from "solid-js";
import useZoomPan from "../hooks/use-zoom-pan";
import { useMapContext } from "./map-provider";
import { ZoomPanProvider } from "./zoom-pan-provider";

interface ZoomableGroupProps extends JSX.GSVGAttributes<SVGGElement> {
	center?: [number, number];
	zoom?: number;
	minZoom?: number;
	maxZoom?: number;
	translateExtent?: [[number, number], [number, number]];
	filterZoomEvent?: (event: unknown) => boolean;
	onMoveStart?: (
		data: { coordinates: [number, number]; zoom: number },
		event: unknown,
	) => void;
	onMove?: (
		data: { x: number; y: number; zoom: number; dragging?: unknown },
		event: unknown,
	) => void;
	onMoveEnd?: (
		data: { coordinates: [number, number]; zoom: number },
		event: unknown,
	) => void;
	className?: string;
}

export const ZoomableGroup: ParentComponent<ZoomableGroupProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"center",
		"zoom",
		"minZoom",
		"maxZoom",
		"translateExtent",
		"filterZoomEvent",
		"onMoveStart",
		"onMove",
		"onMoveEnd",
		"className",
		"children",
	]);
	const { width, height } = useMapContext();

	const zoomPan = useZoomPan({
		center: local.center ?? [0, 0],
		filterZoomEvent: local.filterZoomEvent,
		onMoveStart: local.onMoveStart,
		onMove: local.onMove,
		onMoveEnd: local.onMoveEnd,
		scaleExtent: [local.minZoom ?? 1, local.maxZoom ?? 8],
		translateExtent: local.translateExtent,
		zoom: local.zoom ?? 1,
	});

	const className = () => local.className ?? "";

	return (
		<ZoomPanProvider
			value={{
				x: zoomPan.position().x,
				y: zoomPan.position().y,
				k: zoomPan.position().k,
				transformString: zoomPan.transformString,
			}}
		>
			<g ref={zoomPan.mapRef}>
				<rect width={width} height={height} fill="transparent" />
				<g
					transform={zoomPan.transformString}
					class={`rsm-zoomable-group ${className()}`}
					{...rest}
				>
					{props.children}
				</g>
			</g>
		</ZoomPanProvider>
	);
};

export default ZoomableGroup;
