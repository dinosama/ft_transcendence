import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
	constructor(){
		super();
		this.setTitle("RemoteGame");
	}

	async getHtml(){

		return`
			<canvas id="game" width="1200" height="500" class="center"></canvas>
		`;
	}

	async loadRemoteGame(){	
		const script = document.createElement('script');
		script.src = "../js/game/remote-game.js";
		script.onload = () => {
			console.log("Game loaded");
		}
		document.body.appendChild(script);
	}
}