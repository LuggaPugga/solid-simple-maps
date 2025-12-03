import { render } from "solid-js/web";
import App from "./App";
import "./index.css";

const appElement = document.getElementById("app");
if (appElement) {
	render(() => <App />, appElement);
}
