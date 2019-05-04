import { get, post } from '../rest/rest';

class PostService {
    constructor() {
        this.baseUrl = 'http://localhost:3200/feed/posts';
        this.baseUrlPost = 'http://localhost:3200/feed/post/';
        this.baseUrlCreate = 'http://localhost:3200/feed/post/create';
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