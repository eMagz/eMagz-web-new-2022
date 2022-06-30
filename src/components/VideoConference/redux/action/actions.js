import {
    LOADING,
    TOKBOXSESSION,
    CREATEMEETING,
    UPDATESTATUS,

    USER_REQUEST,
    PENDING_MEETING_LIST,
    PENDING_MEETING_UPDATE_STATUS,

    MEETING_RECORDING,
    USERS_JOINS_MEETING,
    GET_JOIN_USERS_LIST
} from "./actionTypes";

export const loadingStatus = (state) => ({
    type: LOADING,
    payload: state
})

export const updateStatus = (state) => ({
    type: UPDATESTATUS,
    payload: state
})

export const tokboxSession = (state) => ({
    type: TOKBOXSESSION,
    payload: state
})

export const createMeeting = (state) => ({
    type: CREATEMEETING,
    payload: state
})

export const userRequest = (state) => ({
    type: USER_REQUEST,
    payload: state,
})


export const pendingMeetingList = (state) => ({
    type: PENDING_MEETING_LIST,
    payload: state
})

export const pendingMeetingUpdateStatus = (state) => ({
    type: PENDING_MEETING_UPDATE_STATUS,
    payload: state
})
export const meetingRecording = (state) => ({
    type: MEETING_RECORDING,
    payload: state
})
export const userJoinsMeeting = (state) => ({
    type: USERS_JOINS_MEETING,
    payload: state
})

export const getJoinUserList = (state) => ({
    type: GET_JOIN_USERS_LIST,
    payload: state
})
