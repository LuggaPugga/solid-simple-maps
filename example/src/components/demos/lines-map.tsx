import { For, Show } from "solid-js";
import {
	ComposableMap,
	Geographies,
	Geography,
	Line,
	Marker,
	Sphere,
	ZoomableGroup,
} from "solid-simple-maps";
import { cities, geoUrl } from "../../data";
import type { ColorScheme, GeographyFeature } from "../../types";

type Props = {
	colors: ColorScheme;
	isDark: boolean;
	hovered: string | null;
	onHover: (name: string | null) => void;
};

const routes: [number, number][] = [
	[0, 1],
	[1, 2],
	[2, 3],
	[4, 5],
	[5, 0],
];

export function LinesMap(props: Props) {
	return (
		<ComposableMap projection="geoEqualEarth">
			<ZoomableGroup center={[0, 0]} zoom={1} minZoom={1} maxZoom={8}>
				<Sphere
					fill={props.colors.sphereFill}
					stroke={props.colors.sphereStroke}
					stroke-width={0.5}
				/>
				<Geographies geography={geoUrl}>
					{({ geographies }: { geographies: GeographyFeature[] }) => (
						<For each={geographies}>
							{(geo) => (
								<Geography
									geography={geo}
									style={{
										default: {
											fill: props.colors.defaultFill,
											outline: "none",
										},
									}}
								/>
							)}
						</For>
					)}
				</Geographies>
				<For each={routes}>
					{([from, to]) => (
						<Line
							from={cities[from].coords}
							to={cities[to].coords}
							stroke={cities[from].color}
							stroke-width={2}
							stroke-dasharray="4,4"
							opacity={0.6}
						/>
					)}
				</For>
				<For each={cities}>
					{(city) => (
						<Marker
							coordinates={city.coords}
							onMouseEnter={() => props.onHover(city.name)}
							onMouseLeave={() => props.onHover(null)}
						>
							<circle
								r={props.hovered === city.name ? 9 : 7}
								fill={city.color}
								stroke={props.isDark ? "#121212" : "#fff"}
								stroke-width={2}
							/>
							<Show when={props.hovered === city.name}>
								<text
									text-anchor="middle"
									y={-14}
									style={{
										"font-size": "12px",
										"font-weight": "600",
										fill: props.isDark ? "#e8e8e8" : "#1a1a1a",
									}}
								>
									{city.name}
								</text>
							</Show>
						</Marker>
					)}
				</For>
			</ZoomableGroup>
		</ComposableMap>
	);
}
