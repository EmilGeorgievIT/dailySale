import { post } from '../rest/rest';

const API_SERVER = `${process.env.REACT_APP_API_SERVER}`;

class MessageService {
    constructor() {
        this.baseUrl =  API_SERVER + '/mail';
    }
    sendMail(message) {
        return post(this.baseUrl, message);
    }
    getMessages(messages) {
        return post(this.baseUrl + '/messageList', messages); 
    }
}
export default MessageService;