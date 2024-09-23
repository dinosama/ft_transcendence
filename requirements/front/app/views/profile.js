import AbstractView from "./AbstractView.js";
import { getLangCookie, setLangCookie, translate } from '../js/translate.js';

const getUserInformation = async () => {
    let userInfo = await getUserInfo();
    return userInfo[0];
}

export default class extends AbstractView {
	constructor() {
		super();
		this.setTitle("Profile");
	}

    
    async getUser()  {
        const userInfo = await getUserInformation() ?? {};
        return userInfo
    }

	async loadPages() {
        const userId = await getUserInformation() ?? {};
        let ws = new WebSocket(`ws://localhost:9010?id=${userId?.user?.username}`);
		

		const settingsbtn = document.getElementById('settings-btn');
		settingsbtn.addEventListener('click', () => {
			const navigate = new CustomEvent('navigate', { detail: { path: '/settings' } });
			document.dispatchEvent(navigate);
		});
        
        const invitebtn = document.getElementById('invite-button');
		invitebtn.addEventListener('click', () => {
            const queryParams = new URLSearchParams(window.location.search);
		    const username = queryParams.get('username');
            const msg = {
                user: `${username}`,
                command: "send invite",
            };
            ws.send(JSON.stringify(msg));
			const navigate = new CustomEvent('navigate', { detail: { path: `/waiting-room?waiter=${userId}&waiting=${username}` } });
			document.dispatchEvent(navigate);
        });

		const langbtn = document.getElementById('lang-btn');
		langbtn.addEventListener('click', () => {
			const img = langbtn.querySelector('img');
			const current = img.getAttribute('src');
			const new_lang = current.includes('flag_en.png') ? 'flag_fr.png' :
			current.includes('flag_fr.png') ? 'flag_es.png' :
			current.includes('flag_es.png') ? 'flag_en.png' :
			'flag_en.png';
			img.setAttribute('src', `../img/assets/${new_lang}`);
			setLangCookie(new_lang.includes('flag_en.png') ? 'EN' :
			new_lang.includes('flag_fr.png') ? 'FR' :
			new_lang.includes('flag_es.png') ? 'ES' :
			'EN');
			translate(getLangCookie());
		});
	}


	async getHtml() {
        
        const getStatsForUsernameFromUrl = async () => {
            const queryParams = new URLSearchParams(window.location.search);
		    const username = queryParams.get('username');
            const  stats = await getStatsByUsername(username);
            if (stats?.error) {
                return undefined
            }
            return stats[0];
        }
    
        const getMatchHistoryForUser = async (username) => {
            const history = await getGameHistoryByUsername(username);
            if (history?.error) {
                return undefined
            }
            return history;
        }

		const formatDate = (date) => {
			const dateObject = new Date(date)
			const dd = dateObject.getDate()
			const mm = dateObject.getMonth()
			const yy = dateObject.getFullYear();
			return `${dd}/${mm}/${yy}`
		}

		const getProfilePicturePath = (user) => {
			if (user?.profile_picture) {
				if (user.profile_picture !== "") {
					return (user.profile_picture);
				}
			}
			return ("../img/profile-picture/default.jpg");
        }
        let userInfo = {};
        let profilePicture = "";
        let history = [];

        userInfo = await getStatsForUsernameFromUrl();
        if (userInfo) {
            profilePicture = getProfilePicturePath(userInfo.user)
            if (profilePicture) {
                history = await getMatchHistoryForUser(userInfo.user.username)
            }
        }

        if (!userInfo || !history) {
            const navigate = new CustomEvent('navigate', { detail: { path: '/dashboard' } });
			document.dispatchEvent(navigate);
        }

		return `
            <div class="container-fluid">
                <div class="col text-center justify-content-center">
                    <div class="d-flex align-items-center justify-content-center" id="profile-main-div">
                        <div class="d-flex justify-content-center" id="profile-main-upper-div">
                            <div class="d-flex col justify-content-start" id="profile-info-div">
                                
                                <div id="profile-page-profile-picture-div">
                                    <img src="${profilePicture}" class="img-fluid rounded-circle border border-white p-1" id="profile-page-profile-picture">
                                </div>
                                
                                <div class="row flex-column align-items-center">
                                
                                    <div class="col d-flex justify-content-start">
                                        <p id="profile-username-text">${userInfo?.user?.username ?? ""}</p>
                                    </div>
                                    
                                    <div class="col d-flex align-items-start justify-content-start">
                                        <p id="status-f" style="color: white;">Friend</p>
                                    </div>
                                    
                                    <div class="d-flex col justify-content-start mb-5">
                                        <button onclick="manageFriendship('delete', '${userInfo?.user?.id}')" class="profile-default-button">REMOVE FRIEND</button>
                                    </div>
                                
                                </div>
                            </div>

                            <div class="d-flex justify-content-end">
                                <a class="btn btn-image" id="lang-btn" text-alignment-start">
                                    <img class="settings-us-btn" src="../img/assets/flag_en.png">
                                </a>
                                <a class="btn btn-image" id="settings-btn">
                                    <img src="../img/assets/settings.png">
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="col justify-content-center" id="profile-main-lower-div">
                        
                        <div id="profile-central-left-div">
                            <p class="default-banner">MATCH HISTORY</p>
						    <p id="dashboard-subtitle-match-history">${userInfo?.gamePlayed ?? 0} MATCHES PLAYED</p>
                        
                            <div id="dashboard-friend-list">
                                ${history?.map((game) => {
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
                        
                        <div class="col" id="profile-central-right-div">
                            <div id="field">
                                <div id="field-net"></div>
                                <div id="field-ping"></div>
                                <div id="field-pong"></div>
                                <div id="field-ball"></div>
                            </div>
                            <button class="mt-5 profile-default-button" id="invite-button">INVITE</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}