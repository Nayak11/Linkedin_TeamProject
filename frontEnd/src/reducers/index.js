//This is rootReducer
import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import jobDisplayReducer from './JobDisplayReducer';

import applicationReducer from './applicationReducer';
import messagesReducer from './messagesReducer';
import RecruiterPostJobReducer from './RecruiterPostJob';
import connectionsReducer from './connectionsReducer';

import profileReducer from './profileReducer';

//Reducer, just combines all the states.
export default combineReducers({
    loginState: loginReducer,
    jobDisplay: jobDisplayReducer,
    jobPost: RecruiterPostJobReducer,
    applicationState: applicationReducer,
    messagesState: messagesReducer,
    profileState: profileReducer,
    connectionsState:connectionsReducer
});