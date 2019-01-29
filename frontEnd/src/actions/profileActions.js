import { GET_PROFILE_PIC, GET_PROFILE_DATA, GET_RESUME, SUBMIT_RESUME, SUMIT_PROFILE_PIC, SUBMIT_PERSONAL_PROFILE, SUBMIT_EDUCATION_DETAILS, SUBMIT_EXPERIENCE_DETAILS, SUMIT_SKILLS_DETAILS } from './types';
import axios from "axios";
import { IP_backEnd } from '../config/config.js';

export const getProfilePic = (email) => async dispatch => {
    //code here
    console.log("PROFILE ACTIONS : getProfilePic");
    console.log("fetching user profile pic...");
    //axios.defaults.withCredentials = true;
    await axios.get(IP_backEnd + '/userProfile/getProfilePic/?email=' + email)
        .then((response) => {
            console.log("base64 Image received");
            //console.log("response from AWS S3 bucket... ", res.data);
            dispatch({
                type: GET_PROFILE_PIC,
                profilePic: response.data,
                payload: response.status,
            })
        })
        .catch((error) => {
            console.log("Action Catch : ", error.response);
            console.log("Response data" + error.response.data)
            dispatch({
                //ERROR 400 status
                type: GET_PROFILE_PIC,
                payload:error.response.status
            })
        })
}

export const getProfileDataAction = (email) => async dispatch => {
    //code here
    console.log("PROFILE ACTIONS : getProfileData");
    console.log("fetching user Profile data...");
    //axios.defaults.withCredentials = true;
    await axios.get(IP_backEnd + '/userProfile/?email=' + email)
        .then(async(response) => {
            console.log("profile details retrieved", response.data[0]);
            await dispatch({
                type: GET_PROFILE_DATA,
                profileData: response.data[0],
                payload: response.status,
            })
        })
        .catch((error) => {
            console.log("Action Catch : ", error.response);
            console.log("Response data" + error.response.data)
            dispatch({
                //ERROR 400 status
                type: GET_PROFILE_PIC,
                payload:error.response.status
            })
        })
}

