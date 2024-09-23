import AbstractView from "./AbstractView.js";
import { saveGameScore } from '../js/commands/saveScore.js';
export default class extends AbstractView {
	constructor() {
		super();
		this.setTitle("GameWinnerTournament");
	}

	async getHtml() {
		const saveScore = async(playerA, playerB, scoreA, scoreB) => {
			return saveGameScore(playerA, playerB, scoreA, scoreB);
		}

		const queryParams = new URLSearchParams(window.location.search);
		const winner = queryParams.get('winner');

		const playerA = queryParams.get('playerA');
		const playerB = queryParams.get('playerB');
		const scoreA = queryParams.get('scoreA');
		const scoreB = queryParams.get('scoreB');

		const hash = await saveScore(playerA, playerB, scoreA, scoreB);

		return `
			<div class="container">
				<div class="row">
					<div class="col d-flex justify-content-center align-items-center vh-100">
						<div class="container-fluid row justify-content-center" id="game-score-div">
							
							<div class="container-fluid">
								<div class="row justify-content-center mb-5">
									<div class="col-7 d-flex justify-content-center">
										<p class="mb-0 game-score-result-text" "id=winner-to">Winner : ${winner}</p>
									</div>
									<div class="col-7 d-flex justify-content-center">
										<p class="mb-0" id="tournament-hash">${hash.transactionHash}</p>
									</div>
								</div>
							</div>
							
							<div class="text-center">
								<a id="game-score-game-result-text" href="/dashboard" class="nav__link" data-link>DASHBOARD</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}