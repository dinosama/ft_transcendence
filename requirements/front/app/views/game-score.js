import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
	constructor() {
		super();
		this.setTitle("GameScore");
	}

	async getHtml() {
		
		const queryParams = new URLSearchParams(window.location.search);
		const win = queryParams.get('win');
		const loose = queryParams.get('loose');
		return `
			<div class="container">
				<div class="row">
					<div class="col d-flex justify-content-center align-items-center vh-100">
						<div class="container-fluid row justify-content-center" id="game-score-div">
							
							<div class="container-fluid">
								<div class="row justify-content-center">
									<div class="col d-flex justify-content-center">
										<p class="mb-0 game-score-result-text">${win}</p>
									</div>
									<div class="col-7 d-flex justify-content-center">
										<p class="mb-0 game-score-result-text"> GAME OVER </p>
									</div>
									<div class="col d-flex justify-content-center">
										<p class="mb-0 game-score-result-text">${loose}</p>
									</div>
								</div>
							</div>
							
							<div class="text-center">
								<a id="game-score-game-result-text" href="/dashboard" class="nav__link" data-link>BACK TO DASHBOARD</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}