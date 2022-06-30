import { takeEvery, put, takeLatest, call } from "redux-saga/effects";
import axios from 'axios';
import { URL, HEADER, HEADER_FORMDATA } from "./../../../../helper/Const";
import {
    TOKBOXSESSION,
    LOADING,
    CREATEMEETING,
    USER_REQUEST,
    PENDING_MEETING_LIST,
    PENDING_MEETING_UPDATE_STATUS,
    MEETING_RECORDING,
    USERS_JOINS_MEETING,
    GET_JOIN_USERS_LIST
} from "../action/actionTypes";


const tokBoxSessionAPI = (body) => {
    return axios.get(`${URL}create-meeting-session/${body.meeting_id}`);
}

export function* tokBoxSessionWorker(action) {

    try {
        yield put({ type: LOADING, payload: { status: true } });
        const { body, ontokBoxSession } = action.payload;
        const res = yield call(tokBoxSessionAPI, body);
        console.log("createmeeting", res)
        if (res.status == 200) {

            ontokBoxSession(res)
            yield put({ type: LOADING, payload: { status: false } });
        }
        else {
            yield put({ type: LOADING, payload: { status: false } });
        }

    }
    catch (error) {
        console.log("error", error)
    }
}

export function* tokBoxSessionWatcher() {
    yield takeEvery(TOKBOXSESSION, tokBoxSessionWorker)
}

// create meeting

const createMeetingAPI = (body) => {
    return axios.post(`${URL}schedule-meeting`, body);
}

export function* createMeetingWorker(action) {
    try {
        yield put({ type: LOADING, payload: { status: true } });
        const { body, onComplete } = action.payload;
        const res = yield call(createMeetingAPI, body);
        console.log('worker', res)
        yield put({ type: LOADING, payload: { status: false } });
        if (res.status == 200) {
            console.log('worker1', res)
            onComplete(res)
            yield put({ type: LOADING, payload: { status: false } })
        }
    }
    catch (error) {
        yield put({ type: LOADING, payload: { status: false } });
        alert('Something went wrong', error)
    }
}


export function* createMeetingWatcher() {
    yield takeEvery(CREATEMEETING, createMeetingWorker)
}

//const  user-request

const userRequestAPI = (body) => {
    return axios.post(`${URL}/update-meeting-link/meeting_id`, body)
}

export function* userRequestWorker(action) {
    try {
        yield put({ type: LOADING, payload: { status: true } })
        const { body, onShow } = action.payload;
        const res = yield call(userRequestAPI, body);
        console.log('userRequestWorker', res)
        yield put({ type: LOADING, payload: { status: false } });
        if (res.status === true) {
            onShow(res)
            yield put({ type: LOADING, payload: { status: false } })
        }

    }
    catch (er) {
        yield put({ type: LOADING, payload: { status: false } })
        alert("Something went wrong", er)
    }

}

export function* userRequestWatcher() {
    yield takeEvery(USER_REQUEST, userRequestWorker)
}

//pending meeting List

const pendingMeetingAPI = (body) => {
    return axios.get(`${URL}meeting-schedule-list/${body.user_id}`)
}
export function* pendingMeetingListWorker(action) {
    try {
        yield put({ type: LOADING, payload: { status: true } })
        const { body, onShow } = action.payload;
        // console.log("pendid", body)
        const res = yield call(pendingMeetingAPI, body);
        // console.log('pndingelist', res)
        yield put({ type: LOADING, payload: { status: false } });
        if (res.status === 200) {
            onShow(res)
            yield put({ type: LOADING, payload: { status: false } })
        }
    }
    catch (er) {
        yield put({ type: LOADING, payload: { status: false } })
        alert("Something went wrong", er)
    }

}
export function* pendingMeetingListWatcher() {
    yield takeEvery(PENDING_MEETING_LIST, pendingMeetingListWorker)
}


//update meeting status

const updateMeetingStatusAPI = (body) => {
    console.log("meetingIDAPI", body)
    return axios.get(`${URL}meeting-request-meetingId/${body.meeting_id}`)
}

export function* updateMeetingStatusWorker(action) {
    try {
        yield put({ type: LOADING, payload: { status: true } })
        const { body, onUpdate } = action.payload;
        const res = yield call(updateMeetingStatusAPI, body);
        yield put({ type: LOADING, payload: { status: false } });
        if (res.status === true) {
            onUpdate(res)
            yield put({ type: LOADING, payload: { status: false } })
        }
    }
    catch (er) {
        yield put({ type: LOADING, payload: { status: false } })
        alert("Something went wrong", er)
    }
}

export function* updateMeetingStatusWatcher() {
    yield takeEvery(PENDING_MEETING_UPDATE_STATUS, updateMeetingStatusWorker)
}

//meeting recording
const meetingRecordingAPI = (body) => {
    console.log("session", body.sessionId)
    return axios.get(`${URL}session-recording/${body.sessionId}`)
}

export function* meetingRecordingWorker(action) {
    try {
        yield put({ type: LOADING, payload: { status: true } })
        const { body, onRecord } = action.payload;
        const res = yield call(meetingRecordingAPI, body);
        yield put({ type: LOADING, payload: { status: false } })
        if (res.status === true) {
            onRecord(res)
            yield put({ type: LOADING, payload: { status: false } })
        }
    }
    catch (err) {
        yield put({ type: LOADING, payload: { status: false } })

    }
}

export function* meetingRecordingWatcher() {
    yield takeEvery(MEETING_RECORDING, meetingRecordingWorker)
}

//user joins meeting

const usersJoinsMeetinAPI = (body) => {
    console.log("usersJoinsMeetinAPI", body)
    return axios.post(`${URL}/users-join-meeting`, body)
}

export function* userJoinsMeetingWorker(action) {
    try {

        yield put({ type: LOADING, payload: { status: true } })
        const { body, onUserStatus } = action.payload;
        const res = yield call(usersJoinsMeetinAPI, body);
        yield put({ type: LOADING, payload: { status: false } })
        console.log('res', res)
        if (res.status == 200) {
            onUserStatus(res)
            yield put({ type: LOADING, payload: { status: false } })
        }
    }
    catch (err) {
        yield put({ type: LOADING, payload: { status: false } })
        alert('Something Went Wrong', err)
    }
}

export function* userJoinsMeetingWatcher() {
    yield takeEvery(USERS_JOINS_MEETING, userJoinsMeetingWorker)
}

//get join user list

const getJoinUserListAPI = (body) => {
    return axios.post(`${URL}get-users-join-list/${body.meeting_id}`)
}

export function* getJoinUserListWorker(action) {
    try {
        yield put({ type: LOADING, payload: { status: true } })
        const { body, onShowList } = action.payload
        const res = yield call(getJoinUserListAPI, body)
        yield put({ type: LOADING, payload: { status: false } })
        console.log('res', res)
        if (res.status === 200) {
            onShowList(res)
            yield put({ type: LOADING, payload: { status: false } })
        }
    }
    catch (err) {
        yield put({ type: LOADING, payload: { status: false } })
        alert("Something Went Wrong", err)
    }
}

export function* getJoinUserListWatcher() {
    yield takeEvery(GET_JOIN_USERS_LIST, getJoinUserListWorker)
}