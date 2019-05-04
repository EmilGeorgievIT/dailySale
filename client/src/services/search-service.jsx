import { get, post } from '../rest/rest';

class SearchService {
    constructor() {
        this.baseUrl = 'http://localhost:3200/feed/posts';
        this.searchUrl = 'http://localhost:3200/feed/post/find';
    }
    findPosts(obj) {
        return post(this.searchUrl , obj);
    }
    getPosts() {
        return get(this.baseUrl);
    }
}
export default SearchService;