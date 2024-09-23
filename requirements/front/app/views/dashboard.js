import AbstractView from "./AbstractView.js";
import swal from 'sweetalert';
import { getLangCookie, setLangCookie, translate, translations } from "../js/translate.js"

export default class extends AbstractView {
	constructor() {
		super();
		this.setTitle("Dashboard");
		this.lang;
	}
	
	async loadPages() {
		const settingsbtn = document.getElementById('settings-btn');
		settingsbtn.addEventListener('click', () => {
			const navigate = new CustomEvent('navigate', { detail: { path: '/settings' } });
			document.dispatchEvent(navigate);
		});

		const localGame = document.getElementById('local-game');
		localGame.addEventListener('click', () => {
			const navigate = new CustomEvent('navigate', { detail: { path: '/waiting-room-local' } });
			document.dispatchEvent(navigate);
		});

		const tournamentbtn = document.getElementById('tournament-game');
		tournamentbtn.addEventListener('click', () => {
			const navigate = new CustomEvent('navigate', { detail: { path: '/pre-match-tournament' } });
			document.dispatchEvent(navigate);
		});

		const langbtn = document.getElementById('lang-btn');
		langbtn.addEventListener('click', () => {
			const img = langbtn.querySelector('img');
			img.setAttribute('src', `../img/assets/${getLangCookie() === 'EN' ? 'flag_fr.png' : getLangCookie() === 'FR' ? 'flag_es.png' : 'flag_en.png'}`);
			const current = img.getAttribute('src');
			const new_lang = current.includes('flag_en.png') ? 'flag_fr.png' :
			current.includes('flag_fr.png') ? 'flag_es.png' :
			current.includes('flag_es.png') ? 'flag_en.png' :
			'flag_en.png';
			img.setAttribute('src', `../img/assets/${new_lang}`);
			this.lang = new_lang.includes('flag_en.png') ? 'EN' :
            new_lang.includes('flag_fr.png') ? 'FR' :
            new_lang.includes('flag_es.png') ? 'ES' :
            'EN';
			setLangCookie(this.lang);
			translate(this.lang);
			this.friendHTML();
		});
	}

	async friendHTML() {
		const getUserFriends = async () => {
			let friends = await getFriend();
			return friends;
		}

		const manageFriendShipButtons = (userId) => {
			return `
				<button onclick="manageFriendship('accept', '${userId}')" id="frienship-decline-button" class="dashboard-general-button" style="margin:5px;">+</button>
				<button onclick="manageFriendship('decline', '${userId}')" id="frienship-accept-button" class="dashboard-general-button" style="margin:5px;">-</button>
			`;
		};
    }

	async getHtml() {
		this.lang = getLangCookie();
		const getUserFriends = async () => {
			let friends = await getFriend();
			return friends;
		}

		const getUserInformation = async () => {
			let userInfo = await getUserInfo();
			return userInfo[0];
		}

		const getGameInformations = async () => {
			let gameHistory = await getGameHistory();
			return gameHistory;
		}

		const formatDate = (date) => {
			const dateObject = new Date(date)
			const dd = dateObject.getDate()
			const mm = dateObject.getMonth()
			const yy = dateObject.getFullYear();
			return `${dd}/${mm}/${yy}`
		}

		const getProfilePicturePath = (userInfo) => {
			if (userInfo?.user?.profile_picture) {
				if (userInfo.user.profile_picture !== "") {
					return (userInfo.user.profile_picture);
				}
			}
			return ("../img/profile-picture/default.jpg");
		}


		const myFriends = await getUserFriends() ?? [];
		const userInfo = await getUserInformation() ?? {};
		const gameInfos = await getGameInformations() ?? [];
		const profilePicture = getProfilePicturePath(userInfo) ?? "";

		let ws = new WebSocket(`ws://localhost:9010?id=${userInfo?.user?.username}`);
		ws.addEventListener("message", function (event) {
			const recv = JSON.parse(event.data);

			switch (recv.command) {
				case "recv invite":
					swal(`${recv.user} SEND YOU GAME INVITE`, {
						buttons: {
						  cancel: {
							text:  "REFUSE",
							value: "cancel",
							visible: true,
						},
						  catch: {
							text: "ACCEPT",
							value: "catch",
						  },
						},
					  })
					  .then((value) => {
						if (value == "cancel") {
							const tosend = {
								user1: recv.user,
								user2: userInfo?.user?.username,
								command: "refuse invite",
							};
							//console.log("refuse invite");
							ws.send(JSON.stringify(tosend));
						} else {
							const msg = {
								user1: recv.user,
								user2: userInfo?.user?.username,
								command: "accept invite",
							};
							ws.send(JSON.stringify(msg));
							//console.log("accept invite");
							const navigate = new CustomEvent('navigate', { detail: { path: `/remote-game?user1=${recv.user}&user2=${userInfo?.user?.username}&is=2` } });
							document.dispatchEvent(navigate);
							
						}
					  });
					break;
				case "cancel":
					swal.close();
				break;
			}
		  });

		const getFriendState = async (username, friend) => {
			let state = await getState(username, friend);
			return state;
		}

		const friendState = await Promise.all(myFriends.map(async (friend) => {
			friend.state = {};
			friend.state = await getFriendState(userInfo?.user?.username, friend.username) ?? [];
		}));

		const manageFriendShipButtons = (userId) => {
    return `
        <button onclick="manageFriendship('accept', '${userId}')" id="frienship-decline-button" class="dashboard-general-button" style="margin:5px;">+</button>
        <button onclick="manageFriendship('decline', '${userId}')" id="frienship-accept-button" class="dashboard-general-button" style="margin:5px;">-</button>
    `;
};

		return `
			<div class="d-flex flex-column justify-content-center text-center">

				<div class="d-flex col w-100 mt-0 menu-central-main-div">
					<div class="d-flex w-100 justify-content-start m-1">
						<img src="${profilePicture}" id="dashboard-profile-picture" class="img-fluid rounded-circle border border-white p-1">
					</div>
					<div class="d-flex w-100 justify-content-end mt-5">
						<a class="btn btn-image" id="lang-btn">
							<img class="settings-us-btn" src="../img/assets/flag_en.png">
						</a>
						<a class="btn btn-image" id="settings-btn">
							<img src="../img/assets/settings.png">
						</a>
					</div>
				</div>
				
				<p id="dashboard-username-text"> ${userInfo?.user?.username ?? ""} </p>
				<p id="dashboard-score-historic-text"> ${userInfo?.gameWin ?? 0} WINS | ${userInfo?.gameLost ?? 0} LOSSES</p>

				<div class="d-flex justify-content-center" >

					<div id="dashboard-friendship-div">
						<p class="default-banner">FRIENDS</p>

						<form onsubmit="submitFindFriends(event)">
							<input id="dashboard-find-friends" type="text" placeholder="Find Friends"/>
							<button class="dashboard-general-button">ADD</button>
							<p id="form-error"></p>
							<p id="form-validate"></p>
						</form>

						<div id="dashboard-friend-lists">
							${myFriends?.map((friend) => {
								const translatedText = !friend.sender
									? translations[this.lang]['pending-request']
									: translations[this.lang]['invited-you']
								const friendNameHtml = !friend.accepted
									? `<a>${friend.username}</a> - ${translatedText}`
									: `<a class='link-profile nav__link' href='/profile?username=${friend.username}' data-link>${friend.username}</a> - ${friend.state}`;

								return `
									<p class="dashboard-friend-name-text">
										${friendNameHtml}
										${!friend.accepted && friend.sender && manageFriendShipButtons(friend.id) || ""}
									</p>
								`;
							}).join('')}
						</div>
					</div>
				
					<div id="dashboard-play-div">
						<div id="field">
							<div id="field-net"></div>
							<div id="field-ping"></div>
							<div id="field-pong"></div>
							<div id="field-ball"></div>
						</div>
						<div id="dashboard-play-button-div">
							<button class="dashboard-play-button" id="local-game">LOCAL</button>
							<button class="dashboard-play-button" id ="tournament-game">TOURNAMENT</button>
						</div>
					</div>
				
					<div id="dashboard-game-historic-div">
						<p class="default-banner" id="match-his">MATCH HISTORY</p>
						<p id="dashboard-subtitle-match-history">${userInfo?.gamePlayed ?? 0} MATCHES PLAYED</p>
						<div id="dashboard-friend-list">
						${gameInfos?.map((game) => {
							let player1 = game.player1.username;
							let player2 = game.player2.username;
							let winner_player = game.winner.username;
							let winScore = game.winerScore;
							let loseScore = game.loserScore;
							let gameDate = formatDate(game.createdAt)
							return `
								<p class="dashboard-friend-text">
									${userInfo?.user?.username == winner_player ?
										"<img class='game-history-logo' src='../img/assets/win.png'>"
										: "<img class='game-history-logo' src='../img/assets/loose.png'> "} 
									[ ${winScore} - ${loseScore} ] ${player1} vs ${player2} | ${gameDate}
								</p>`;
						}).join('')}
						</div>
					</div>
				</div>
			</div>
		`;
	}
}
