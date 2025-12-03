import { For } from "solid-js";
import {
	Annotation,
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
};

export function AnnotationsMap(props: Props) {
	const annotated = cities.slice(0, 3);

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
				<For each={annotated}>
					{(city, i) => (
						<>
							<Marker coordinates={city.coords}>
								<circle
									r={5}
									fill={city.color}
									stroke={props.isDark ? "#121212" : "#fff"}
									stroke-width={2}
								/>
							</Marker>
							<Annotation
								subject={city.coords}
								dx={i() % 2 === 0 ? 50 : -50}
								dy={i() % 2 === 0 ? -30 : 30}
								curve={0.3}
							>
								<text
									text-anchor="middle"
									style={{
										"font-size": "12px",
										"font-weight": "600",
										fill: props.isDark ? "#e8e8e8" : "#1a1a1a",
									}}
								>
									{city.name}
								</text>
							</Annotation>
						</>
					)}
				</For>
			</ZoomableGroup>
		</ComposableMap>
	);
}
