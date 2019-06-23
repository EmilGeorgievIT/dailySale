import { get, put } from '../rest/rest';
const API_SERVER = `${process.env.REACT_APP_API_SERVER}`;

export default class ProfileService {
    constructor() {
        this.baseUrl = API_SERVER + '/profile';
    }

    getUserDetails(userId) {  
        return get(this.baseUrl + '/details/' + userId);
    }

    getUserImage(userId) {  
        return get(this.baseUrl + '/image/' + userId);
    }
    updateUserDetails(userId, body) {
        return put(`${this.baseUrl}/details/update/` + userId, body);
    }
}