import { createSignal, type JSX } from "solid-js";

interface InteractiveStyle {
	default?: JSX.CSSProperties;
	hover?: JSX.CSSProperties;
	pressed?: JSX.CSSProperties;
}

interface InteractiveHandlers {
	onMouseEnter?: (evt: MouseEvent) => void;
	onMouseLeave?: (evt: MouseEvent) => void;
	onMouseDown?: (evt: MouseEvent) => void;
	onMouseUp?: (evt: MouseEvent) => void;
	onFocus?: (evt: FocusEvent) => void;
	onBlur?: (evt: FocusEvent) => void;
	style?: InteractiveStyle;
}

export function useInteractiveHandlers(handlers: InteractiveHandlers): {
	handleMouseEnter: (evt: MouseEvent) => void;
	handleMouseLeave: (evt: MouseEvent) => void;
	handleFocus: (evt: FocusEvent) => void;
	handleBlur: (evt: FocusEvent) => void;
	handleMouseDown: (evt: MouseEvent) => void;
	handleMouseUp: (evt: MouseEvent) => void;
	computedStyle: () => JSX.CSSProperties | undefined;
} {
	const [isPressed, setPressed] = createSignal(false);
	const [isFocused, setFocus] = createSignal(false);

	const handleMouseEnter = (evt: MouseEvent): void => {
		setFocus(true);
		handlers.onMouseEnter?.(evt);
	};

	const handleMouseLeave = (evt: MouseEvent): void => {
		setFocus(false);
		if (isPressed()) setPressed(false);
		handlers.onMouseLeave?.(evt);
	};

	const handleFocus = (evt: FocusEvent): void => {
		setFocus(true);
		handlers.onFocus?.(evt);
	};

	const handleBlur = (evt: FocusEvent): void => {
		setFocus(false);
		if (isPressed()) setPressed(false);
		handlers.onBlur?.(evt);
	};

	const handleMouseDown = (evt: MouseEvent): void => {
		setPressed(true);
		handlers.onMouseDown?.(evt);
	};

	const handleMouseUp = (evt: MouseEvent): void => {
		setPressed(false);
		handlers.onMouseUp?.(evt);
	};

	const computedStyle = (): JSX.CSSProperties | undefined => {
		const pressed = isPressed();
		const focused = isFocused();
		const styleObj = handlers.style || {};
		if (pressed || focused) {
			return pressed ? styleObj.pressed : styleObj.hover;
		}
		return styleObj.default;
	};

	return {
		handleMouseEnter,
		handleMouseLeave,
		handleFocus,
		handleBlur,
		handleMouseDown,
		handleMouseUp,
		computedStyle,
	};
}
