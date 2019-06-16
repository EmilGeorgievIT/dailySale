import { post } from '../rest/rest';
const API_SERVER = `${process.env.REACT_APP_API_SERVER}`;

class AuthenticationService  {
    constructor() {
        this.baseUrl = API_SERVER + '/auth/signin';
        this.baseUrlRegister = API_SERVER + '/auth/signup';
    }
    login(credentials) {
        return post(this.baseUrl, credentials);
    }
    register(credentials) {
        return post(this.baseUrlRegister, credentials);
    }
}
export default AuthenticationService;