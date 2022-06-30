import { all } from 'redux-saga/effects';
import loginSaga from './Login/loginSaga';
import { registerSaga } from './Registration/registerSaga'
import {
    tokBoxSessionWatcher, createMeetingWatcher, userRequestWatcher, pendingMeetingListWatcher,
    updateMeetingStatusWatcher,
    meetingRecordingWatcher,
    userJoinsMeetingWatcher,
    getJoinUserListWatcher
} from '../VideoConference/redux/saga/authSaga'


export default function* watch() {

    yield all([
        loginSaga(),
        registerSaga(),

        //Video  Conference authSaga
        tokBoxSessionWatcher(),
        createMeetingWatcher(),
        userRequestWatcher(),
        pendingMeetingListWatcher(),
        updateMeetingStatusWatcher(),
        meetingRecordingWatcher(),
        userJoinsMeetingWatcher(),
        getJoinUserListWatcher()
    ]);


}






