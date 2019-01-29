import { SUBMIT_LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, TRAVELER_SIGNOUT } from '../actions/types';

const initialState = {
  redirectVar: false,
  response: "",
  userEmail: "",
  errormessage:""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SUBMIT_LOGIN:
      if (action.payload === 200) {
        console.log("Reducer : User login successful !");
        return {
          ...state,
          redirectVar: true,
          response: action.payload,
          userEmail: action.userEmail,
          errormessage:""
        }
      } else {
        console.log("Reducer : User login Failed !");
        return {
          ...state,
          redirectVar: false,
          response: action.payload,
          errormessage:action.errormessage,
          userEmail: action.userEmail
        }
      }

    case TRAVELER_SIGNOUT:
      console.log("Reducer : Traveler Signout successful !");
      return {
        ...state,
        response: "",
        redirectVar: action.payload,
        userEmail: action.userEmail
      }
    default:
      return state;
  }
}