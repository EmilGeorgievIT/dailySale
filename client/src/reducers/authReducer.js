import { REGISTER_USER } from '../actions/Types';
import { SET_CURRENT_USER } from '../actions/Types';
import isEmpty from '../validation/is-empty';

const initalState = {
    isLogged: false,
    user: {}
};

export default function(state = initalState, action) {
    switch(action.type) {
        case REGISTER_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_CURRENT_USER: {
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        }
        default: 
        return state;
    }
}