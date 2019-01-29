import { LOGIN_SUCCESS, LOGIN_ERROR, SUBMIT_LOGIN, TRAVELER_SIGNOUT } from './types';
// import { LOGIN_SUCCESS, LOGIN_ERROR, SUBMIT_LOGIN, TRAVELER_SIGNOUT } from './types';
import axios from "axios";
import { IP_NODE_PORT, IP_backEnd } from '../config/config.js'

//const ROOT_URL = "http://localhost:3001";

export const submitLogin = (email, password) => dispatch => {
    //code here
    console.log("Actions : Login");
    axios.defaults.withCredentials = true;
    const data = {
        email: email,
        password: password
    }
    console.log(data);
    
    axios.post(IP_backEnd + '/login', data)
        .then(response => {
            console.log("response received after login :", response.data);
            console.log("response received after login :", response.data.token);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userEmail', response.data.userEmail);
            dispatch({
                type: SUBMIT_LOGIN,
                payload: response.status,
                userEmail: response.data.userEmail
            })
        })
        .catch((error) => {
            console.log("Action Catch : ", error.response);
            console.log("Response data"+error.response.data)
            dispatch({
                //ERROR 400 status
                type: SUBMIT_LOGIN,
                payload: error.response.status,
                errormessage:error.response.data,
                userEmail: ""
            })
        })
}

// export const travelerSignout = () => dispatch => {
//     console.log("Actions : signing out traveler...");
//     dispatch({
//         type: TRAVELER_SIGNOUT,
//         payload: false,
//         Travelercookie: ""
//     })
// } 