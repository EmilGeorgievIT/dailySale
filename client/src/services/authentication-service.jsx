import { post } from '../rest/rest';

class AuthenticationService  {
    constructor() {
        this.baseUrl = 'http://localhost:3200/auth/signin';
        this.baseUrlRegister = 'http://localhost:3200/auth/signup';
    }
    login(credentials) {
        return post(this.baseUrl, credentials);
    }
    register(credentials) {
        return post(this.baseUrlRegister, credentials);
    }
}
export default AuthenticationService;