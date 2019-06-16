import { get, put } from '../rest/rest';
const API_SERVER = `${process.env.REACT_APP_API_SERVER}`;

export default class ProfileService {
    constructor() {
        this.baseUrl = API_SERVER + '/profile/details/';
    }

    getUserDetails(userId) {  
        return get(this.baseUrl + userId);
    }
    updateUserDetails(userId, body) {
        return put(`${this.baseUrl}update/` + userId, body);
    }
}