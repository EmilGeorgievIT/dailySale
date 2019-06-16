import { get, post } from '../rest/rest';
const API_SERVER = `${process.env.REACT_APP_API_SERVER}`;

class PostService {
    constructor() {
        this.baseUrl =  API_SERVER + '/feed/posts';
        this.baseUrlPost = API_SERVER + '/feed/post/';
        this.baseUrlCreate = API_SERVER + '/feed/post/create';
    }
    getPosts() {
        return get(this.baseUrl);
    }
    createPost(data){
        return post(this.baseUrlCreate, data);
    }
    getPostById(id) {
        return get(this.baseUrlPost + id);
    }
}
export default PostService;