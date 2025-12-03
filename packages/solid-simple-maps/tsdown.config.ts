import solid from "rolldown-plugin-solid";
import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm"],
	outDir: "dist",
	dts: true,
	clean: true,
	sourcemap: false,
	minify: false,
	platform: "browser",
	external: ["solid-js", "solid-js/web", "solid-js/store"],
	plugins: [
		solid({
			solid: { hydratable: false, generate: "dom" },
		}),
	],
});
