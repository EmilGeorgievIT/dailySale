import { post } from '../rest/rest';
const API_SERVER = `${process.env.REACT_APP_API_SERVER}`;

class AuthenticationService  {
    constructor() {
        this.baseUrl = API_SERVER;
    }
    login(credentials) {
        return post(this.baseUrl + '/auth/signin', credentials);
    }
    register(credentials) {
        return post(this.baseUrl + '/auth/signup', credentials);
    }
    registerFacebook(credentials) {
        return post(this.baseUrl + '/auth/facebook', credentials);
    }

    registerGoogle(credentials) {
        return post(this.baseUrl + '/auth/google', credentials);
    }
}
export default AuthenticationService;