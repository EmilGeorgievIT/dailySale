import { get, post } from '../rest/rest';

class PostService {
    constructor() {
        this.baseUrl = '/feed/posts';
        this.baseUrlPost = '/feed/post/';
        this.baseUrlCreate = '/feed/post/create';
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