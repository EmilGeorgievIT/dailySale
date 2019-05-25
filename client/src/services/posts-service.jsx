import { get, post } from '../rest/rest';

class PostService {
    constructor() {
        this.baseUrl = 'http://192.168.137.1:3200/feed/posts';
        this.baseUrlPost = 'http://192.168.137.1:3200/feed/post/';
        this.baseUrlCreate = 'http://192.168.137.1:3200/feed/post/create';
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