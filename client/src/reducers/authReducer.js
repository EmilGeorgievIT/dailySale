import { REGISTER_USER } from '../actions/Types';

const initalState = {
    isLogged: false,
    updateUser: {}
};

export default function(state = initalState, action) {
    switch(action.type) {
        case REGISTER_USER:
            return {
                ...state,
                updateUser: action.payload
            }
        default:
        return state;
    }
}