import "../css/style.css";
import { Playground } from "./playground/playground";
import { Share } from "./share/share";
import $ from 'jquery';

(() => {
	if (process.env.TYPE === "playground") {
		const app = new Playground();
		window.Catblocks = app;
		app.init();
	} else if (process.env.TYPE === "share") {
		const share = new Share(
			{
				'container': 'catblocks-code-container',
				'renderSize': 0.75
			}
		);
		share.init();


		// render my catblocks.xml file
		$(document).ready(() => {
			fetch('assets/xml/catblocks.xml')
				.then(res => res.text())
				.then(str => (new DOMParser().parseFromString(str, 'text/xml')))
				.then(xmlDom => {
					const div = document.getElementById('catblocks-code-container');
					share.injectAllScenes(div, xmlDom);
				});
		});

	} else {
		console.error('process.env.TYPE undefined');
	}
})();