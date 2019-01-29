import { SET_SEARCH_USER } from "../actions/types";

const init = {
    searchUser:''

}

export default function (state = init, action) {

    switch (action.type) {
        
        case SET_SEARCH_USER:
            return {
                ...state,
                searchUser:action.payload
            }
        // case LOCATION_INFO:
        //     return {
        //         ...state,
        //         propData:Object.assign({},state.propData,action.payload),
        //     }
        
        default:
            return state;

    }
}