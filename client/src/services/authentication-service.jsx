import { post } from '../rest/rest';

class AuthenticationService  {
    constructor() {
        this.baseUrl = 'http://localhost:3200/auth/signin';
    }
    login(credentials) {
        return post(this.baseUrl, credentials);
    }
}
export default AuthenticationService;