import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
	constructor() {
		super();
		this.setTitle("Register");
	}

    async getHtml() {
        return `
        <div id="main-div">
        <div id="div-signup">
            <div>
                <h1 id="title-signin">SIGN UP</h1>
            </div>
            
            <form onsubmit="submitForm(event)" >
                
                <div id="register-submit-form-div" class="d-flex flex-wrap justify-content-center align-items-center">
                    
                    <div class="div-signup-field d-flex" >
                        <label class="mb-1" for="registerUsername" id="registerUsername-tr">USERNAME</label>	
                        <input type="text" id="registerUsername" name="registerUsername" placeholder="Enter" required/>
                    </div>
                    
                    <div class="div-signup-field d-flex">
                        <label class="mb-1" for="registerEmail">EMAIL</label>
                        <input type="email" id="registerEmail" name="registerEmail" placeholder="Enter" required />
                    </div>
        
                    <div class="div-signup-field d-flex">
                        <label class="mb-1" for="registerPassword" id="registerPw-tr">PASSWORD</label>
                        <input type="password" id="registerPassword" name="registerPassword" placeholder="At least 8 char." required />
                    </div>
        
                    <div class="div-signup-field d-flex">
                        <label class="mb-1" for="registerConfirmPassword" id="registerCPw-tr">CONFIRM PASS</label>
                        <input type="password" id="registerConfirmPassword" name="registerConfirmPassword" placeholder="At least 8 char." required />
                    </div>

                    <div class="div-signup-field">
                        <label for="TwoFA" id="enab">Enable 2FA Authentication </label>
                        <input type="checkbox" name="2FA" id="TwoFA"/>
                    </div>
                    
                    <p id="form-error"></p>
            
                </div>
                
                <p id="countdown"></p>
                
                <div class="div-signup-field d-flex">
                <button type="submit" id="button-next">NEXT</button>
                </div>

            </form>
        </div>
    </div>
        `;
    }
}
