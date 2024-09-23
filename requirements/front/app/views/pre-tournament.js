import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
	constructor() {
		super();
		this.setTitle("PreTournament");
	}

	async getHtml() {
		
		return `
			<div id="main-div">
				<form onsubmit="InitLocalTournament(event)">
					<div>
						<h1 id="title-tourn">TOURNAMENT</h1>
					</div>
					
					<h2 id="pre-match-tournament-subtitle">REGISTRATION</h1>
					
					<div id="pre-match-tournament-form" class="d-flex flex-wrap">
						<div class="pre-match-tournament-div-field d-flex" >
							<label for="usernamePlayer1" id="usernamePlayer1-tr">PLAYER 1</label>
							<input type="text" id="usernamePlayer1" name="usernamePlayer1" placeholder="Enter" required/>
						</div>
						
						<div class="pre-match-tournament-div-field d-flex" >
							<label for="usernamePlayer2"id="usernamePlayer2-tr">PLAYER 2</label>
							<input type="text" id="usernamePlayer2" name="usernamePlayer2" placeholder="Enter" required/>
						</div>

						<div class="pre-match-tournament-div-field d-flex" >
							<label for="usernamePlayer3"id="usernamePlayer3-tr">PLAYER 3</label>
							<input type="text" id="usernamePlayer3" name="usernamePlayer3" placeholder="Enter" required/>
						</div>
						
						<div class="pre-match-tournament-div-field d-flex" >
							<label for="usernamePlayer4"id="usernamePlayer4-tr">PLAYER 4</label>
							<input type="text" id="usernamePlayer4" name="usernamePlayer4" placeholder="Enter" required/>
						</div>

						<div class="pre-match-tournament-div-field d-flex" >
							<label for="usernamePlayer5"id="usernamePlayer5-tr">PLAYER 5</label>
							<input type="text" id="usernamePlayer5" name="usernamePlayer5" placeholder="Enter" required/>
						</div>

						<div class="pre-match-tournament-div-field d-flex" >
							<label for="usernamePlayer6"id="usernamePlaye6-tr">PLAYER 6</label>
							<input type="text" id="usernamePlayer6" name="usernamePlayer6" placeholder="Enter" required/>
						</div>

						<div class="pre-match-tournament-div-field d-flex" >
							<label for="usernamePlayer7"id="usernamePlayer7-tr">PLAYER 7</label>
							<input type="text" id="usernamePlayer7" name="usernamePlayer7" placeholder="Enter" required/>
						</div>

						<div class="pre-match-tournament-div-field d-flex" >
							<label for="usernamePlayer8"id="usernamePlaye8-tr">PLAYER 8</label>
							<input type="text" id="usernamePlayer8" name="usernamePlayer8" placeholder="Enter" required/>
						</div>

						<p id="form-error"></p>
					</div>
					
					<div class="div-login-field d-flex">
						<button type="submit" id="button-next">NEXT</button>
					</div>
				</form>
			</div>
		`;
	}
}