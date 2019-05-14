import { REGISTER_USER, GET_ERRORS } from './Types';

import AuthenticationService from '../services/authentication-service';

export const registerUser = userData => dispatch => {
    const service = new AuthenticationService();
    service.register(userData)
        .then((user) => {
            console.log(user);
            // if(credentials.message !== 'User created!') {
            //     this.setState({
            //         error: credentials.errors[0].msg
            //     })
            //     return;
            // }
            // console.log(credentials);
            
            // this.setState({
            //     isRegister: true
            // });
        }).catch(error => {
            console.log(error);
            dispatch({
                type: GET_ERRORS,
                payload: error
            })
        });
};