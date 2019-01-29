import {SET_CURRENT_CONVERSATION} from './types';

export const setCurrentConversation = (participant) => dispatch => {
    dispatch({
        type : SET_CURRENT_CONVERSATION,
        payload : participant,
    })
}   