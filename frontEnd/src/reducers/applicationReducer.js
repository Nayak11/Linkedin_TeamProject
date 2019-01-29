import {SET_ACTIVE_JOB} from '../actions/types';

const initialState = {
    jobID : '',
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ACTIVE_JOB:
        return{
            ...state,
            jobID : action.payload,
        }
        default: {
            return state;
        }
    }
}