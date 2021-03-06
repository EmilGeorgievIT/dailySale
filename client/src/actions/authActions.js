import { SET_CURRENT_USER, GET_ERRORS } from './Types';
import jwt_decode  from 'jwt-decode';
import AuthenticationService from '../services/authentication-service';

export const registerUser = (userData, history) => dispatch => {
    const service = new AuthenticationService();
    service.register(userData)
        .then((res) => {
            if(res.errors !== undefined) {
                dispatch({
                    type: GET_ERRORS,
                    payload: res.errors
                })
            } else {
                history.push('/login');
            }
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
        if (data.token !== undefined) {
            localStorage.setItem('ds_chk_temp', data.userId);
            localStorage.setItem('token', data.token);
            const decode = jwt_decode(data.token);
            const image = data.image;
            dispatch(setCurrentUser({decode, image}));
        } else {
            dispatch({
                type: GET_ERRORS,
                payload: data
            })
        }
    }).catch(error => {
        console.log(error);
        dispatch({
            type: GET_ERRORS,
            payload: error
        })
    })
};

export const loginUserFacebook = userData => dispatch => {
    const service = new AuthenticationService();

    service.registerFacebook(userData)
    .then((data) => {
        if (data.token !== undefined) {
            localStorage.setItem('ds_chk_temp', data.userId);
            localStorage.setItem('token', data.token);
            const decode = jwt_decode(data.token);
            const image = data.image;
            dispatch(setCurrentUser({decode, image}));
        } else {
            dispatch({
                type: GET_ERRORS,
                payload: data
            })
        }
    }).catch(error => {
        console.log(error);
        dispatch({
            type: GET_ERRORS,
            payload: error
        })
    })
};

export const loginUserGoogle = userData => dispatch => {
    const service = new AuthenticationService();

    service.registerGoogle(userData)
    .then((data) => {
        if (data.token !== undefined) {
            localStorage.setItem('ds_chk_temp', data.userId);
            localStorage.setItem('token', data.token);
            const decode = jwt_decode(data.token);
            const image = data.image;
            dispatch(setCurrentUser({decode, image}));
        } else {
            dispatch({
                type: GET_ERRORS,
                payload: data
            })
        }
    }).catch(error => {
        console.log(error);
        dispatch({
            type: GET_ERRORS,
            payload: error
        })
    })
};

export const loginUserTwitter = userData => dispatch => {
    if (userData.token !== undefined) {
        localStorage.setItem('ds_chk_temp', userData.userId);
        localStorage.setItem('token', userData.token);
        const decode = jwt_decode(userData.token);
        const image = userData.image;
        dispatch(setCurrentUser({decode, image}));
    } else {
        dispatch({
            type: GET_ERRORS,
            payload: userData
        })
    }
}
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