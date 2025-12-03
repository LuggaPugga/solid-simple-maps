import { createSignal, For } from "solid-js";
import {
	AnnotationsMap,
	BasicMap,
	CustomMap,
	InteractiveMap,
	LinesMap,
	MarkersMap,
} from "./components/demos";
import { useTheme } from "./hooks/use-theme";
import type { Demo } from "./types";

const demos: { id: Demo; label: string }[] = [
	{ id: "basic", label: "Basic" },
	{ id: "interactive", label: "Interactive" },
	{ id: "markers", label: "Markers" },
	{ id: "custom", label: "Custom" },
	{ id: "annotations", label: "Annotations" },
	{ id: "lines", label: "Lines" },
];

export default function App() {
	const [demo, setDemo] = createSignal<Demo>("basic");
	const [hovered, setHovered] = createSignal<string | null>(null);
	const { isDark, toggleDarkMode, colors } = useTheme();

	const renderDemo = () => {
		const d = demo();
		const c = colors();
		const dark = isDark();

		switch (d) {
			case "basic":
				return <BasicMap colors={c} onHover={setHovered} />;
			case "interactive":
				return (
					<InteractiveMap
						colors={c}
						selected={hovered()}
						onSelect={setHovered}
					/>
				);
			case "markers":
				return (
					<MarkersMap
						colors={c}
						isDark={dark}
						hovered={hovered()}
						onHover={setHovered}
					/>
				);
			case "custom":
				return <CustomMap colors={c} isDark={dark} onHover={setHovered} />;
			case "annotations":
				return <AnnotationsMap colors={c} isDark={dark} />;
			case "lines":
				return (
					<LinesMap
						colors={c}
						isDark={dark}
						hovered={hovered()}
						onHover={setHovered}
					/>
				);
		}
	};

	return (
		<div class="min-h-screen bg-background text-foreground">
			<header class="border-b border-border">
				<div class="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
					<span class="font-semibold tracking-tight">solid-simple-maps</span>
					<div class="flex items-center gap-6">
						{hovered() && <span class="text-sm text-muted">{hovered()}</span>}
						<button
							type="button"
							onClick={toggleDarkMode}
							class="text-muted hover:text-foreground transition-colors"
						>
							{isDark() ? "Light" : "Dark"}
						</button>
					</div>
				</div>
			</header>

			<main class="max-w-6xl mx-auto px-4 py-8">
				<nav class="flex gap-1 mb-6 overflow-x-auto">
					<For each={demos}>
						{(d) => (
							<button
								type="button"
								onClick={() => setDemo(d.id)}
								class={`px-3 py-1.5 text-sm rounded-md transition-colors ${
									demo() === d.id
										? "bg-foreground text-background"
										: "text-muted hover:text-foreground"
								}`}
							>
								{d.label}
							</button>
						)}
					</For>
				</nav>

				<div class="rounded-lg border border-border bg-card overflow-hidden">
					{renderDemo()}
				</div>
			</main>
		</div>
	);
}
