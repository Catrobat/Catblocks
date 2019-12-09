import "../css/style.css";
import { Playground } from "./playground/playground";
import { Share } from "./share/share";
import $ from 'jquery';
import Blockly from "scratch-blocks";

(() => {
	if (process.env.NODE_ENV === 'development') {
		window.Blockly = Blockly;
	}
	
	switch (process.env.TYPE) {
	case 'playground': {
		const app = new Playground();
		app.init();
		break;
	}
	case 'share': {
		const share = new Share();
		share.init({
			'container': 'catblocks-code-container',
			'renderSize': 0.75,
			'language': 'en_GB',
			'shareRoot': '/',
			'code': 'asserts/extracted/',
			'media': 'media/',
			'noImageFound': 'No_Image_Available.jpg',
		});

		// render my code.xml file
		$(document).ready(() => {
			share.parser.parseFile('assets/extracted/dc7fb2eb-1733-11ea-8f2b-000c292a0f49/code.xml')
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