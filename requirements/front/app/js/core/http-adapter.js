class HttpAdapter {
    
    constructor(url) {
      this.url = url;
    }

    async toJson(response) {
        return await response.json();
    }

    async doLogin({ username, password }) {
        const payload = {
            username: username,
            password: password
        };
        
        return this.toJson(await fetch('http://localhost:9009/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }));
    }

    async fetchByCookie() {
        return this.toJson(await fetch(this.url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        }))
    }

    async fetchByTokenHeader(token) {
        return this.toJson(await fetch(this.url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
        }));
    }

    async createWithoutCookie(payload) {
        return (await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }))
    }

    async postWithoutCookie(payload) {
        return this.toJson(await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }))
    }

    async postWithCookie(payload) {
        return this.toJson(await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            credentials: "include"
        }))
    }

    async updateWithCookie(payload) {
        return this.toJson(await fetch(this.url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            credentials: "include"
        }))
    }

    update() {}
    delete () {}
}
