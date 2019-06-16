import { get, post } from '../rest/rest';
const API_SERVER = `${process.env.REACT_APP_API_SERVER}`;


class SearchService {
    constructor() {
        this.baseUrl = API_SERVER + '/feed/posts';
        this.searchUrl = API_SERVER + '/feed/post/find';
    }
    findPosts(obj) {
        return post(this.searchUrl , obj);
    }
    getPosts() {
        return get(this.baseUrl);
    }
}
export default SearchService;