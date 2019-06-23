import { get, post } from '../rest/rest';
const API_SERVER = `${process.env.REACT_APP_API_SERVER}`;

export default class CommentService {
    constructor() {
        this.baseUrl = API_SERVER + '/comment';
    }

    getComments(postId) {  
        return get(this.baseUrl + '/getCommentsByPost/' + postId);
    }
    addComment(body) {
        return post(`${this.baseUrl}/postComment`, body);
    }
}