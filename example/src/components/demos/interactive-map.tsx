import { For } from "solid-js";
import {
	ComposableMap,
	Geographies,
	Geography,
	Sphere,
	ZoomableGroup,
} from "solid-simple-maps";
import { geoUrl } from "../../data";
import type {
	ColorScheme,
	CountryProperties,
	GeographyFeature,
} from "../../types";

type Props = {
	colors: ColorScheme;
	selected: string | null;
	onSelect: (name: string | null) => void;
};

export function InteractiveMap(props: Props) {
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
							{(geo) => {
								const p = geo.properties as CountryProperties | null;
								const name = p?.NAME || p?.name || "Unknown";
								const isSelected = () => props.selected === name;
								return (
									<Geography
										geography={geo}
										onMouseEnter={() => props.onSelect(name)}
										onMouseLeave={() => props.onSelect(null)}
										onMouseDown={() => props.onSelect(name)}
										style={{
											default: {
												fill: isSelected()
													? props.colors.selectedFill
													: props.colors.defaultFill,
												outline: "none",
											},
											hover: {
												fill: props.colors.hoverFill,
												outline: "none",
												cursor: "pointer",
											},
											pressed: {
												fill: props.colors.pressedFill,
												outline: "none",
											},
										}}
									/>
								);
							}}
						</For>
					)}
				</Geographies>
			</ZoomableGroup>
		</ComposableMap>
	);
}
