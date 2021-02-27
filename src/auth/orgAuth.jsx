class Auth {
    constructor() {
        let loginStatus = localStorage.getItem('loggedin');
        let role = localStorage.getItem('role')
        if(loginStatus !== null)  {
            if(loginStatus === 'true' && role === 'orgadmin') {
                this.authenticated = true;
            } else if (loginStatus === 'false') {
                this.authenticated = false;
            }
        } else {
            this.authenticated = false;
        }
    }
    login(cb) {
        this.authenticated = true
        localStorage.setItem('loggedin','true')
        localStorage.setItem('role','orgadmin')
        console.log(this.authenticated)
    }

    logout(cb) {
        this.authenticated = false;
        localStorage.setItem('loggedin',false)
        localStorage.setItem('role','')
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();