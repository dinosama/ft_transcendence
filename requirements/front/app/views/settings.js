import AbstractView from "./AbstractView.js";
import { getLangCookie, setLangCookie, translate } from "../js/translate.js"

export default class extends AbstractView {
	constructor() {
		super();
		this.setTitle("Settings");
	}

    async loadPages() {
		const dashboardbtn = document.getElementById('dashboard-btn');
		dashboardbtn.addEventListener('click', () => {
			const navigate = new CustomEvent('navigate', { detail: { path: '/dashboard' } });
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
        const getUserInformation = async () => {
			let userInfo = await getUserInfo();
			return userInfo[0];
		}

		const getTwoFaStatus = (userInfo) => {
			if (userInfo?.user?.TwoFA) {
				if (userInfo?.user?.TwoFA == true) {
					return ("checked");
				}
			}
			return ("");
		}

		const getProfilePicturePath = (userInfo) => {
			if (userInfo?.user?.profile_picture) {
				if (userInfo.user.profile_picture !== "") {
					return (userInfo.user.profile_picture);
				}
			}
			return ("../img/profile-picture/default.jpg");
		}

		const userInfo = await getUserInformation() ?? {};
		const TwoFaStatus = await getTwoFaStatus(userInfo) ?? {};
		const profilePicture = getProfilePicturePath(userInfo);

		return `
            <form onsubmit="submitSettingsUpdate(event)" class="d-flex flex-column justify-content-center text-center">
                <div class="d-flex col justify-content-end">
                    <a class="btn btn-image" id="lang-btn">
                        <img class="settings-us-btn"src="../img/assets/flag_en.png">
                    </a>
                    <a class="btn btn-image" id="dashboard-btn">
                        <img src="../img/assets/home.png">
                    </a>
                </div>
        
                <h1 id="title-set">SETTINGS</h1>
        
                <div class="d-flex menu-central-main-div justify-content-center">
                
                    <div class="col" id="settings-central-left-div">
                        <div id="settings-central-left-top-div">
                            <div class="d-flex flex-column align-items-center">
                                <img src="${profilePicture}" class="img-fluid rounded-circle border border-white p-1" id="settings-profile-picture">
                                <button onclick="document.getElementById('file-input').click();" type="button" class="settings-buton" id="settings-modify">MODIFY</button>
                                <input type="file" accept=".jpg,.jpeg,.png" id="file-input" style="display: none;">
                            </div>
                        </div>
                        <div>
                            <p id="settings-subtitle-modify-fa">2FA</p>
                            <div id="settings-2fa">
                                <label for="TwoFA" id="enab">Enable 2FA Authentication </label>
                                <input type="checkbox" name="2FA" id="TwoFA" ${TwoFaStatus}/>
                            </div>
                        </div>
                    </div>

                    <div class="col" id="settings-central-right-div">
                        <div id="settings-modify-div">
                         <p id="settings-subtitle-modify">MODIFY INFORMATIONS</p>
                            <div class="settings-label-input-field">
                                <label class="settings-default-text" for="username" id="user-set">USERNAME</label>
                                <input id="username-ent" type="text" name="username" placeholder="Enter" value="${userInfo?.user?.username ?? ""}"></input>
                            </div>

                            <div class="settings-label-input-field">
                                <label class="settings-default-text" for="email">EMAIL</label>
                                <input type="text" id="email-ent" name="email" placeholder="Enter" value="${userInfo?.user?.email ?? ""}"></input>
                            </div>
            
                            <div class="settings-label-input-field">
                                <label class="settings-default-text" for="password" id="pass-set">PASSWORD</label>
                                <input id="password-ent" type="password" name="password" placeholder="Enter"></input>
                            </div>
                                
                            <div class="settings-label-input-field">            
                                <label class="settings-default-text" for="password" id="pass-conf-set">CONFIRM PASSWORD</label>
                                <input id="confirmPassword-ent" onselect="getAvatarImagePath()" type="password" name="password" placeholder="Enter"></input>
                            </div>
                        </div>  

                        <div>
                            <p id="settings-subtitle-confirm">CONFIRM MODIFICATIONS</p>
                            <div class="settings-label-input-field">            
                                <label class="settings-default-text" for="password" id="pass-set2">PASSWORD</label>
                                <input id="savePassword-ent" type="password" name="password" placeholder="Enter" required></input>
                            </div>  

                            <div class="settings-label-input-field">            
                                <button class="settings-buton" id="save">SAVE</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <p id="form-error"></p>
                <p id="countdown"></p>
            </form>
		`;
	}
}