import { REGISTER_USER, SET_CURRENT_USER, GET_ERRORS } from './Types';
import jwt_decode  from 'jwt-decode';

import AuthenticationService from '../services/authentication-service';

export const registerUser = (userData, history) => dispatch => {
    const service = new AuthenticationService();
    service.register(userData)
        .then((res) => {
            history.push('/login');
        }).catch(error => {
            console.log(error);
            dispatch({
                type: GET_ERRORS,
                payload: error
            })
        });
};

export const loginUser = userData => dispatch => {
    const service = new AuthenticationService();

    service.login(userData)
    .then((data) => {

        localStorage.setItem('ds_chk_temp', data.userId);
        localStorage.setItem('token', data.token);
        const decode = jwt_decode(data.token);
        
        // Set current user 
        
        dispatch(setCurrentUser(decode));

    }).catch(error => {
        console.log(error);
        dispatch({
            type: GET_ERRORS,
            payload: error
        })
    })
};

// Set logged user

export const setCurrentUser = (decode) => {
    return {
        type: SET_CURRENT_USER,
        payload: decode
    }
}

export const logOutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.clear();
    dispatch(setCurrentUser({}))
}