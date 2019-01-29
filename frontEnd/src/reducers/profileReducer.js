import { GET_PROFILE_PIC, GET_PROFILE_DATA, GET_RESUME, SUBMIT_RESUME, SUMIT_PROFILE_PIC, SUBMIT_PERSONAL_PROFILE, SUBMIT_EDUCATION_DETAILS, SUBMIT_EXPERIENCE_DETAILS, SUMIT_SKILLS_DETAILS } from '../actions/types';

const initialState = {
    email: "",
    profileData: "",
    skills: "",
    profilePic: "",
    resume: '',
    tempResume: '',
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE_PIC:
            if (action.payload === 200) {
                console.log("Reducer : Profile pic retrieval successful !");
                return {
                    ...state,
                    profilePic: action.profilePic,
                }
            } else {
                console.log("Reducer : Profile pic retrieval Failed !");
                return {
                    ...state,
                    profilePic: ""
                }
            }
        case GET_PROFILE_DATA:
            console.log("Reducer : Profile data retrieval successful !");
            return {
                ...state,
                profileData: action.profileData,
            }


        // case TRAVELER_SIGNOUT:
        //     console.log("Reducer : Traveler Signout successful !");
        //     return {
        //     }
        default:
            return state;
    }
}