import { get } from '../rest/rest';

class SearchService {
    constructor() {
        this.baseUrl = 'http://localhost:3200/feed/posts';
    }
    getPosts() {
        return get(this.baseUrl);
    }
}
export default SearchService;