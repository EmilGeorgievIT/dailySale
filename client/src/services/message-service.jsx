import { post } from '../rest/rest';
const API_SERVER = `${process.env.REACT_APP_API_SERVER}`;

class MessageService {
    constructor() {
        this.baseUrl =  API_SERVER + '/contact/send';
    }
    sendMail(message) {
        return post(this.baseUrl, message);
    }
}
export default MessageService;