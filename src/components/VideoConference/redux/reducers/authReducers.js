import {
    LOADING,
    UPDATESTATUS,
    TOKBOXSESSION,
    CREATEMEETING,
    USER_REQUEST,
    PENDING_MEETING_LIST,
    PENDING_MEETING_UPDATE_STATUS,
    MEETING_RECORDING,
    USERS_JOINS_MEETING,
    GET_JOIN_USERS_LIST
} from "../action/actionTypes";
let initialState = {
    isLoggedIn: false,
    body: null,
    userId: null
}
export default function (state = initialState, action) {
    switch (action.type) {

        case LOADING: {
            return {
                ...state,
                isLoading: action.payload.status
            }

        }

        case UPDATESTATUS: {
            return {
                ...state,
                isLoading: action.payload.status,
                userId: action.payload.id,
                isLoading: false
            }
        }

        case TOKBOXSESSION: {
            return {
                ...state
            }

        }

        case CREATEMEETING: {
            return {
                ...state
            }
        }
        case USER_REQUEST: {
            return {
                ...state,
                userId: action.payload.user_id
            }
        }
        case PENDING_MEETING_LIST: {
            return {
                ...state
            }
        }

        case PENDING_MEETING_UPDATE_STATUS: {
            return {
                ...state
            }
        }
        case MEETING_RECORDING: {
            return {
                ...state
            }
        }

        case USERS_JOINS_MEETING: {
            return {
                ...state
            }
        }

        case GET_JOIN_USERS_LIST: {
            return {
                ...state
            }
        }
        default:
            return state

    }
}

