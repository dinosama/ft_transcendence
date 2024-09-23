import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
	constructor() {
		super();
		this.setTitle("WaitingRoom");
	}

	async loadPages() {
		let ws = new WebSocket(`ws://localhost:9010?id=`);
		const queryParams = new URLSearchParams(window.location.search);
		const username = queryParams.get('waiting');
		let cancelbtn = document.getElementById('cancel-button');
		cancelbtn.addEventListener('click', () => {
			const msg = {
				command: "cancel invite",
				user: username,
			}
			ws.send(JSON.stringify(msg));
			const navigate = new CustomEvent('navigate', { detail: { path: '/dashboard' } });
			document.dispatchEvent(navigate);
		});
	}


	async getHtml() {

		const getUserInformation = async () => {
			let userInfo = await getUserInfo();
			return userInfo[0];
		}

		const userInfo = await getUserInformation() ?? {};

		let ws = new WebSocket(`ws://localhost:9010?id=${userInfo?.user?.username}waiting`);


		const queryParams = new URLSearchParams(window.location.search);
		const username = queryParams.get('waiting');

		ws.addEventListener("message", function (event) {
			const recv = JSON.parse(event.data);
			//console.log("recu  %s",  event.data);
			if (recv.command == "game")
			{
				//console.log("executing game");
				ws.close()
				const navigate = new CustomEvent('navigate', { detail: { path: `/remote-game?user1=${recv.user1}&user2=${recv.user2}&is=1` } });
				document.dispatchEvent(navigate);
			}
			else
			{
				ws.close()
				//console.log("executing cancel");
				const navigate = new CustomEvent('navigate', { detail: { path: `/dashboard` } });
				document.dispatchEvent(navigate);
			}
		});
		return `
			<div class="container">
				<div class="row">
					<div class="col d-flex justify-content-center align-items-center vh-100">
						<div id="waitingroom-form">
							<h1 class="text-center" id="waitingroom-text">WAITING FOR YOUR OPPONENT</h1>
							<div class="text-center">
								<button class="dashboard-play-button" id="cancel-button" >CANCEL</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}