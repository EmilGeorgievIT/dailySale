import { post, get } from '../rest/rest';
const API_SERVER = `${process.env.REACT_APP_API_SERVER}`;

class FavoriteService {
    constructor() {
        this.baseUrl =  API_SERVER;
    }

    sendFavorite(favorite) {
        return post(this.baseUrl + '/favorite/addFavorite', favorite);
    }

    getFavorites(userId) {
        return get(this.baseUrl + '/favorite/getFavorites/' + userId);
    }
}
export default FavoriteService;