import { get } from '../rest/rest';

export default class CategoryService {
    constructor() {
        this.baseUrl = 'http://localhost:3200/feed/post/category/';
    }

    getCategories(categoryName) {  
        return get(this.baseUrl + categoryName);
    }
}