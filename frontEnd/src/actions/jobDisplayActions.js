import { JOB_DISPLAY, SET_ACTIVE_JOB} from './types';
import axios from "axios";
import { IP_NODE_PORT, IP_backEnd } from '../config/config.js'


export const submitLogin = (email, password) => dispatch => {
    //code here
    console.log("Actions : JobDisplay");
    axios.defaults.withCredentials = true;
    
    // axios.post(IP_backEnd + '/jobsearch', data)
    //     .then(response => {
    //         console.log("response received after request for jobdisplay :", response.data);
    //         dispatch({
    //             type: JOB_DISPLAY,
    //             payload: response.status,
    //             job: response.data.job
    //         })
    //     })
    //     .catch((error) => {
    //         console.log("Action Catch : ", error.response);
    //         // console.log("Response data"+error.response.data)
    //         dispatch({
    //             //ERROR 400 status
    //             type: JOB_DISPLAY,
    //             payload: error.response.status,
    //             errormessage:error.response.data,
    //             cookie: ""
    //         })
    //     })
}

export const setCurrentJob = (jobID) => dispatch => {
    dispatch({
        type : SET_ACTIVE_JOB,
        payload : jobID,
    })
}
