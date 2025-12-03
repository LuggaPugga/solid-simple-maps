import { For } from "solid-js";
import {
	ComposableMap,
	Geographies,
	Geography,
	Sphere,
} from "solid-simple-maps";
import { geoUrl } from "../../data";
import type {
	ColorScheme,
	CountryProperties,
	GeographyFeature,
} from "../../types";

type Props = {
	colors: ColorScheme;
	isDark: boolean;
	onHover: (name: string | null) => void;
};

function hashColor(name: string, isDark: boolean): string {
	const hash = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
	const hue = hash % 360;
	return `hsl(${hue}, ${isDark ? "40%" : "50%"}, ${isDark ? "30%" : "45%"})`;
}

export function CustomMap(props: Props) {
	return (
		<ComposableMap projection="geoEqualEarth">
			<Sphere
				fill={props.colors.sphereFill}
				stroke={props.colors.sphereStroke}
				stroke-width={0.5}
			/>
			<Geographies geography={geoUrl}>
				{({ geographies }: { geographies: GeographyFeature[] }) => (
					<For each={geographies}>
						{(geo) => {
							const p = geo.properties as CountryProperties | null;
							const name = p?.NAME || p?.name || "";
							const color = hashColor(name, props.isDark);
							return (
								<Geography
									geography={geo}
									onMouseEnter={() => props.onHover(name || "Unknown")}
									onMouseLeave={() => props.onHover(null)}
									style={{
										default: { fill: color, outline: "none" },
										hover: {
											fill: color,
											outline: "none",
											cursor: "pointer",
											filter: "brightness(1.2)",
										},
									}}
								/>
							);
						}}
					</For>
				)}
			</Geographies>
		</ComposableMap>
	);
}
