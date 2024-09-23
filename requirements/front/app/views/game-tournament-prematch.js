import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
	constructor() {
		super();
		this.setTitle("GameTournamentPrematch");
	}

	async getHtml() {

		const playerArray = [
			localStorage.getItem('playerAName'),
			localStorage.getItem('playerBName'),
			localStorage.getItem('playerCName'),
			localStorage.getItem('playerDName'),
			localStorage.getItem('playerEName'),
			localStorage.getItem('playerFName'),
			localStorage.getItem('playerGName'),
			localStorage.getItem('playerHName'),
		]

		const gameArray = [
			localStorage.getItem('gameAScore'),
			localStorage.getItem('gameBScore'),
			localStorage.getItem('gameCScore'),
			localStorage.getItem('gameDScore'),
			localStorage.getItem('gameEScore'),
			localStorage.getItem('gameFScore'),
			localStorage.getItem('gameGScore'),
		]

		const getPlayerAName = () => {
			const playerAIndex = localStorage.getItem("currentPlayerA")
			return playerArray[playerAIndex];
		}
	
		const getPlayerBName = () => {
			const playerBIndex = localStorage.getItem("currentPlayerB")
			return playerArray[playerBIndex];
		}

		const initCurrentTournamentPlayers = () => {
			const getGameWinner = (game) => {
				if (game[4] > game[6])
					return (game[0]);
				return (game[2]);
			}
			
			const index = gameArray.findIndex((game) => parseInt(game[0]) === 0 && parseInt(game[2]) === 0);

			if (index == 0) {
				localStorage.setItem("currentPlayerA", 0);
				localStorage.setItem("currentPlayerB", 1);
			} else if (index == 1) {
				localStorage.setItem("currentPlayerA", 2);
				localStorage.setItem("currentPlayerB", 3);
			} else if (index == 2) {
				localStorage.setItem("currentPlayerA", 4);
				localStorage.setItem("currentPlayerB", 5);
			} else if (index == 3) {
				localStorage.setItem("currentPlayerA", 6);
				localStorage.setItem("currentPlayerB", 7);
			} else if (index == 4) {
				localStorage.setItem("currentPlayerA", getGameWinner(gameArray[0]));
				localStorage.setItem("currentPlayerB", getGameWinner(gameArray[1]));
			} else if (index == 5) {
				localStorage.setItem("currentPlayerA", getGameWinner(gameArray[2]));
				localStorage.setItem("currentPlayerB", getGameWinner(gameArray[3]));
			} else if (index == 6) {
				localStorage.setItem("currentPlayerA", getGameWinner(gameArray[4]));
				localStorage.setItem("currentPlayerB", getGameWinner(gameArray[5]));
			} else {
				console.log("ERROR")
			}
		}

		
		initCurrentTournamentPlayers();
	
		return `
			<div class="container">
				<div class="row">
					<div class="col d-flex justify-content-center align-items-center vh-100">
						<div class="container-fluid row justify-content-center" id="game-score-div">
							<p class="mb-0 game-score-result-text"> ${getPlayerAName()} vs ${getPlayerBName()} </p>
							
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

	async countdownTournamentPrematch() {
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