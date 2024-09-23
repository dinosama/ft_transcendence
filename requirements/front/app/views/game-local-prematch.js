import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
	constructor() {
		super();
		this.setTitle("GameLocalPrematch");
	}

	async getHtml() {
		
		return `
			<div class="container">
				<div class="row">
					<div class="col d-flex justify-content-center align-items-center vh-100">
						<div class="container-fluid row justify-content-center" id="game-score-div">
							
							<div class="container-fluid">
								<div class="row justify-content-center">
									<div class="col d-flex justify-content-center">
										<p class="mb-0 game-score-result-text" id="game-local-prematch-countdown"></p>
									</div>
								</div>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		`;
	}

	async DashRedirect() {
		setTimeout(() => {
			const navigate = new CustomEvent('navigate', { detail: { path: '/dashboard' } });
			document.dispatchEvent(navigate);
		}, 2000);
	}

	async countdownLocalPrematch() {
		var countdownElement = document.getElementById('game-local-prematch-countdown');
		var seconds = 4;
  
		countdownElement.textContent = "The game will start in " + seconds + " seconds";
		var interval = setInterval(function() {
			seconds--;
			countdownElement.textContent = "The game will start in " + seconds + " seconds";
			if (seconds <= 0) {
				clearInterval(interval);
				const navigate = new CustomEvent('navigate', { detail: { path: '/game' } });
				document.dispatchEvent(navigate);
			}
		}, 1000);
	}
}