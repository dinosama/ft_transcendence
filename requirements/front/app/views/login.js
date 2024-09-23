import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
	constructor() {
		super();
		this.setTitle("Login");
	}

	async getHtml() {
		return `
		<div id="main-div">
			<form onsubmit="submitLoginForm(event)" id="div-login">
				<div>
					<h1 id="title-log">LOG IN</h1>
				</div>
				
				<h1 id="subtitle-login">Welcome back !</h1>
				
				<div id="real-form-login" class="d-flex flex-wrap">
					<div class="div-login-field d-flex" >
						<label for="loginUsername"id="loginUsername-tr">USERNAME</label>
						<input type="text" id="loginUsername" name="loginUsername" placeholder="Enter" required/>
					</div>
					
					<div class="div-login-field d-flex">
						<label for="loginPassword"id="loginPassword-tr">PASSWORD</label>
						<input type="password" id="loginPassword" name="loginPassword" placeholder="Enter" required />
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