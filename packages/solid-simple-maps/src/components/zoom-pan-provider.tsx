import {
	createContext,
	type JSX,
	type ParentComponent,
	useContext,
} from "solid-js";

interface ZoomPanContextValue {
	x: number;
	y: number;
	k: number;
	transformString: string;
}

const ZoomPanContext: ReturnType<
	typeof createContext<ZoomPanContextValue | undefined>
> = createContext<ZoomPanContextValue | undefined>(undefined);

const defaultValue: ZoomPanContextValue = {
	x: 0,
	y: 0,
	k: 1,
	transformString: "translate(0 0) scale(1)",
};

interface ZoomPanProviderProps {
	value?: ZoomPanContextValue;
	children?: JSX.Element;
}

export const ZoomPanProvider: ParentComponent<ZoomPanProviderProps> = (
	props,
) => {
	const value = () => props.value || defaultValue;
	return (
		<ZoomPanContext.Provider value={value()}>
			{props.children}
		</ZoomPanContext.Provider>
	);
};

export const useZoomPanContext = (): ZoomPanContextValue => {
	const context = useContext(ZoomPanContext);
	if (!context) {
		return defaultValue;
	}
	return context;
};

export { ZoomPanContext };
