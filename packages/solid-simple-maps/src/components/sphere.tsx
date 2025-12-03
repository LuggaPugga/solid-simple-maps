import { type Component, createMemo, type JSX, splitProps } from "solid-js";
import { useMapContext } from "./map-provider";

interface SphereProps extends JSX.PathSVGAttributes<SVGPathElement> {
	id?: string;
	fill?: string;
	stroke?: string;
	strokeWidth?: number;
	className?: string;
}

export const Sphere: Component<SphereProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"id",
		"fill",
		"stroke",
		"strokeWidth",
		"className",
	]);
	const { path } = useMapContext();
	const spherePath = createMemo(() => path({ type: "Sphere" }));
	const id = () => local.id ?? "rsm-sphere";
	const fill = () => local.fill ?? "transparent";
	const stroke = () => local.stroke ?? "currentcolor";
	const strokeWidth = () => local.strokeWidth ?? 0.5;
	const className = () => local.className ?? "";

	return (
		<>
			<defs>
				<clipPath id={id()}>
					<path d={spherePath() || undefined} />
				</clipPath>
			</defs>
			<path
				d={spherePath() || undefined}
				fill={fill()}
				stroke={stroke()}
				stroke-width={strokeWidth()}
				style={{ "pointer-events": "none" }}
				class={`rsm-sphere ${className()}`}
				{...rest}
			/>
		</>
	);
};

export default Sphere;
