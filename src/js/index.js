import "../css/style.css";
import { Playground } from "./playground/playground";
import { Share } from "./share/share";
import $ from 'jquery';

(() => {
	switch (process.env.TYPE) {
	case 'playground': {
		const app = new Playground();
		window.Catblocks = app;
		app.init();
		break;
	}
	case 'share': {
		const share = new Share(
			{
				'container': 'catblocks-code-container',
				'renderSize': 0.75,
				'language': 'en_GB'
			}
		);
		share.init();

		// render my code.xml file
		$(document).ready(() => {
			share.parser.parseFile('assets/xml/code.xml')
				.then(xmlDoc => {
					console.log(xmlDoc);
					const div = document.getElementById('catblocks-code-container');
					share.injectAllScenes(div, xmlDoc);
				})
				.catch(err => {
					console.error(`Failed to parse catroid file.`);
					console.error(err);
				});

		});
		break;
	}
	default: {
		// TODO: add more cases
		console.warn(`Please define some code in index.js for type: ${process.env.TYPE}`);
	}
	}
})();