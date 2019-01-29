import {SET_CURRENT_CONVERSATION} from '../actions/types';

const initialState = {
    participant : '',
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_CONVERSATION:
        return{
            ...state,
            participant : action.payload,
        }
        default: {
            return state;
        }
    }
}