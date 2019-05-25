import { get, put } from '../rest/rest';

export default class ProfileService {
    constructor() {
        this.baseUrl = 'http://192.168.137.1:3200/profile/details/';
    }

    getUserDetails(userId) {  
        return get(this.baseUrl + userId);
    }
    updateUserDetails(userId, body) {
        return put(`${this.baseUrl}update/` + userId, body);
    }
}