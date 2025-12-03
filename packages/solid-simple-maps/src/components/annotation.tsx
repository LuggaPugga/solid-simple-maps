import { type Component, type JSX, splitProps } from "solid-js";
import { createConnectorPath } from "../utils";
import { useMapContext } from "./map-provider";

interface AnnotationProps extends JSX.GSVGAttributes<SVGGElement> {
	subject: [number, number];
	children?: JSX.Element;
	connectorProps?: JSX.PathSVGAttributes<SVGPathElement>;
	dx?: number;
	dy?: number;
	curve?: number | [number, number];
	className?: string;
}

export const Annotation: Component<AnnotationProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"subject",
		"children",
		"connectorProps",
		"dx",
		"dy",
		"curve",
		"className",
	]);
	const { projection } = useMapContext();
	const coords = () => projection(local.subject);
	const x = () => coords()?.[0] ?? 0;
	const y = () => coords()?.[1] ?? 0;
	const dx = () => local.dx ?? 30;
	const dy = () => local.dy ?? 30;
	const curve = () => local.curve ?? 0;
	const connectorPath = () => createConnectorPath(dx(), dy(), curve());
	const className = () => local.className ?? "";

	return (
		<g
			transform={`translate(${x() + dx()}, ${y() + dy()})`}
			class={`rsm-annotation ${className()}`}
			{...rest}
		>
			<path
				d={connectorPath()}
				fill="transparent"
				stroke="#000"
				{...local.connectorProps}
			/>
			{local.children}
		</g>
	);
};

export default Annotation;
