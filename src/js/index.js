import "../css/style.css";
import { Application } from "./application";

(() => {
	const app = new Application();
	window.Catblocks = app;
	app.init();
})();