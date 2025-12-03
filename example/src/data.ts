import type { City } from "./types";

export const geoUrl =
	"https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export const cities: City[] = [
	{ name: "New York", coords: [-74.006, 40.7128], color: "#ef4444" },
	{ name: "London", coords: [-0.1276, 51.5074], color: "#22c55e" },
	{ name: "Tokyo", coords: [139.6503, 35.6762], color: "#6366f1" },
	{ name: "Paris", coords: [2.3522, 48.8566], color: "#f59e0b" },
	{ name: "Sydney", coords: [151.2093, -33.8688], color: "#06b6d4" },
	{ name: "São Paulo", coords: [-46.6333, -23.5505], color: "#ec4899" },
];
