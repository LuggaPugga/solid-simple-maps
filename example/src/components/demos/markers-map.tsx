import { For, Show } from "solid-js";
import {
	ComposableMap,
	Geographies,
	Geography,
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

export function MarkersMap(props: Props) {
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
										hover: { fill: props.colors.subtleHover, outline: "none" },
									}}
								/>
							)}
						</For>
					)}
				</Geographies>
				<For each={cities}>
					{(city) => (
						<Marker
							coordinates={city.coords}
							onMouseEnter={() => props.onHover(city.name)}
							onMouseLeave={() => props.onHover(null)}
						>
							<circle
								r={props.hovered === city.name ? 10 : 8}
								fill={city.color}
								stroke={props.isDark ? "#121212" : "#fff"}
								stroke-width={2}
							/>
							<Show when={props.hovered === city.name}>
								<text
									text-anchor="middle"
									y={-16}
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
