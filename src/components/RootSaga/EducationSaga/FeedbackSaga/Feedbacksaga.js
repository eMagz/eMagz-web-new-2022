import {takeEvery,put,call} from 'redux-saga/effects';
// import {resgetusers} from '../../ReduxStore/Actions/users';
import axios from 'axios';
import * as feedbackActions from '../../../ReduxStore/Actions/EducationActions/FeedbackActions';
import * as types from '../../../ReduxStore/Actions/EducationActions/FeedbackActions/type';
import { BaseUrl, ImageUrl } from '../../../API'


function getfeedbackApi(subject,feedback){
console.log(subject,feedback)
    return axios.post(BaseUrl+'/feedback',{
        subject,
        feedback
    });
}





function* feedbackAsync(action){

console.log("gsdgsdg")

    
    try{
      const resfeedback =  yield call(getfeedbackApi,action.subject, action.feedback);
    
         console.log('feed', action);
        yield put(feedbackActions.feedbackRes(resfeedback.data));
    
    }catch(error){
        console.log('error',error)
        yield put(feedbackfail.feedbackfail(error))
    }
        
         
    
    }






    export default function* FeedbackSaga(){
        yield takeEvery(types.FEEDBACK_REQ,feedbackAsync)
    }





