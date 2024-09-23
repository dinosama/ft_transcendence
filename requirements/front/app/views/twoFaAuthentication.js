import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle('TwoFaAuthentication');
  }

  async getHtml() {
    return `
		<div id="main-div" class="">
		
			<div>
					<h1 id="title">2FA Authentication</h1>
			</div>

			<div>
				<p id="subtitle-2fa">An email containing the access code has been sent to you</p>
			</div>

			<form onsubmit="submit2FAToken(event)" id="div-input-code">
				<div>
					<input  id="input-code" type="text">
				</div>

				<p id="form-error"></p>

				<div>
					<button type="submit" id="button-next">NEXT</button>
				</div>
			</form>

		</div>
		`;
  }
}
