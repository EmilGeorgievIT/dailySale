import { post, get } from '../rest/rest';

const API_SERVER = `${process.env.REACT_APP_API_SERVER}`;

class MessageService {
    sendMail(message) {
        return post(API_SERVER, + '/mail', message);
    }
    
    getMessages(messages) {
        return post(API_SERVER + '/mail/messageList', messages); 
    }
    
    // New Chat Socket Io Chat

    getParticipants(loggedUser) {
        return get(API_SERVER + '/chatApi/user/' + loggedUser);
    }

    sendMessage(message) {
        return post(API_SERVER + '/chatApi/add', message);
    }

    getChatHistory(senderId, receiverId) {
        return get(API_SERVER  + '/chatApi/user/' + senderId + '/' + receiverId);
    }
}
export default MessageService;