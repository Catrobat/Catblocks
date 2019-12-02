import "../css/style.css";
import { Playground } from "./playground/playground";

(() => {
	if (process.env.TYPE === "playground") {
		const app = new Playground();
		window.Catblocks = app;
		app.init();
	} else if (process.env.TYPE === "share") {
		console.error('TODO');
	} else {
		console.error('process.env.TYPE undefined');
	}
})();