import { createMemo, createSignal, onMount } from "solid-js";
import type { ColorScheme } from "../types";

export function useTheme() {
	const [isDark, setIsDark] = createSignal(true);

	onMount(() => {
		const saved = localStorage.getItem("theme");
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		const dark = saved ? saved === "dark" : prefersDark;
		setIsDark(dark);
		document.documentElement.classList.toggle("dark", dark);
	});

	const toggleDarkMode = () => {
		const next = !isDark();
		setIsDark(next);
		document.documentElement.classList.toggle("dark", next);
		localStorage.setItem("theme", next ? "dark" : "light");
	};

	const colors = createMemo<ColorScheme>(() =>
		isDark()
			? {
					sphereFill: "#121212",
					sphereStroke: "#2a2a2a",
					defaultFill: "#1a1a1a",
					hoverFill: "#60a5fa",
					selectedFill: "#3b82f6",
					pressedFill: "#2563eb",
					subtleHover: "#252525",
				}
			: {
					sphereFill: "#f8f8f6",
					sphereStroke: "#e5e5e5",
					defaultFill: "#e5e5e5",
					hoverFill: "#3b82f6",
					selectedFill: "#2563eb",
					pressedFill: "#1d4ed8",
					subtleHover: "#d4d4d4",
				},
	);

	return { isDark, toggleDarkMode, colors };
}
