import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
	constructor(){
		super();
		this.setTitle("Game");
	}

	async getHtml(){

		return`
			<canvas id="game" width="1200" height="500" class="center"></canvas>
		`;
	}

	async loadGame(){	
		const script = document.createElement('script');
		script.src = "../js/game/game.js";
		script.onload = () => {
			console.log("Game loaded");
		}
		document.body.appendChild(script);
	}
}