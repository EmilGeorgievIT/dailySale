import { get } from '../rest/rest';

class PostService {
    constructor() {
        this.baseUrl = 'http://localhost:3200/feed/posts';
        this.baseUrlPost = 'http://localhost:3200/feed/post/';
    }
    getPosts() {
        return get(this.baseUrl);
    }
    getPostById(id) {
        return get(this.baseUrlPost + id);
    }
}
export default PostService;