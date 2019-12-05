import { get } from '../rest/rest';
const API_SERVER = `${process.env.REACT_APP_API_SERVER}`;

export default class CategoryService {
    constructor() {
        this.baseUrl = API_SERVER + '/feed/post/category/';
    }

    getCategories(categoryName) {  
        return get(this.baseUrl + categoryName);
    }

    getCategoriesByPage(categoryName, page) {  
        return get(this.baseUrl + categoryName + '?page=' + page);
    }
}