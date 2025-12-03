import { configure } from "onedollarstats";
import { render } from "solid-js/web";
import App from "./App";
import "./index.css";

configure({
	autocollect: true,
	hashRouting: false,
});

const appElement = document.getElementById("app");
if (appElement) {
	render(() => <App />, appElement);
}
