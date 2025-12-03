import { defineConfig } from "vitepress";

export default defineConfig({
	title: "Solid Simple Maps",
	description:
		"Create beautiful SVG maps in SolidJS with d3-geo and topojson using a declarative API.",
	base: "/",
	themeConfig: {
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Getting Started", link: "/guide/getting-started" },
			{ text: "API Reference", link: "/api/composable-map" },
			{ text: "Examples", link: "/examples/basic" },
			{
				text: "Live Example",
				link: "https://solid-simple-maps-example.luggapugga.dev",
			},
		],
		sidebar: {
			"/guide/": [
				{
					text: "Guide",
					items: [
						{ text: "Getting Started", link: "/guide/getting-started" },
						{ text: "Map Files", link: "/guide/map-files" },
						{ text: "Projections", link: "/guide/projections" },
						{ text: "Zoom & Pan", link: "/guide/zoom-pan" },
					],
				},
			],
			"/api/": [
				{
					text: "Components",
					items: [
						{ text: "ComposableMap", link: "/api/composable-map" },
						{ text: "Geographies", link: "/api/geographies" },
						{ text: "Geography", link: "/api/geography" },
						{ text: "Marker", link: "/api/marker" },
						{ text: "Line", link: "/api/line" },
						{ text: "Annotation", link: "/api/annotation" },
						{ text: "ZoomableGroup", link: "/api/zoomable-group" },
						{ text: "Graticule", link: "/api/graticule" },
						{ text: "Sphere", link: "/api/sphere" },
					],
				},
				{
					text: "Hooks",
					items: [
						{ text: "useGeographies", link: "/api/use-geographies" },
						{ text: "useZoomPan", link: "/api/use-zoom-pan" },
					],
				},
				{
					text: "Context",
					items: [
						{ text: "MapProvider", link: "/api/map-provider" },
						{ text: "ZoomPanProvider", link: "/api/zoom-pan-provider" },
					],
				},
			],
			"/examples/": [
				{
					text: "Examples",
					items: [
						{ text: "Basic Map", link: "/examples/basic" },
						{ text: "Interactive Map", link: "/examples/interactive" },
						{ text: "Markers", link: "/examples/markers" },
						{ text: "Custom Styling", link: "/examples/custom-styling" },
					],
				},
			],
		},
		socialLinks: [
			{
				icon: "github",
				link: "https://github.com/LuggaPugga/solid-simple-maps",
			},
		],
	},
});
