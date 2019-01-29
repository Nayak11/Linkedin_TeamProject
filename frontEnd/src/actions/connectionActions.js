import { SET_SEARCH_USER } from './types';
import axios from "axios";
import { IP_NODE_PORT, IP_backEnd } from '../config/config.js'

export function searchUserInfo(data) {
    return async function (dispatch) {
        console.log("dispatching to Setting Search User Info..")
        dispatch({
            type: SET_SEARCH_USER,
            payload: data,
        })
    }
}