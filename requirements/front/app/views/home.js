import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
	constructor() {
		super();
		this.setTitle("Home");
	}

	async getHtml() {
		return `
		<div id="main-div-home" class="d-flex justify-content-center align-items-center">
			<div id="vertical-line"></div>
			<div id="div-home">
				<div>
					<h1 id="title-home">PONG</h1>
				</div>
				
				<div id="home-button-div">
					<a href="/register" class="nav__link" data-link>SIGNUP</a>
					<a href="/login" class="nav__link" data-link>LOG-IN</a>
				</div>
			</div>
			<div id="vertical-line"></div>
		</div>
	`;
	}
}