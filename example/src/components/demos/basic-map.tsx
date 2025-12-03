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
	onHover: (name: string | null) => void;
};

export function BasicMap(props: Props) {
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
							const name = p?.NAME || p?.name || "Unknown";
							return (
								<Geography
									geography={geo}
									onMouseEnter={() => props.onHover(name)}
									onMouseLeave={() => props.onHover(null)}
									style={{
										default: {
											fill: props.colors.defaultFill,
											outline: "none",
										},
										hover: {
											fill: props.colors.hoverFill,
											outline: "none",
											cursor: "pointer",
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
