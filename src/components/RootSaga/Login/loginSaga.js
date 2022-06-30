import {takeEvery,put,call} from 'redux-saga/effects';
// import {resgetusers} from '../../ReduxStore/Actions/users';
import axios from 'axios';
import * as loginActions from '../../ReduxStore/Actions/loginActions';
import * as types from '../../ReduxStore/types';
import { BaseUrl, ImageUrl } from '../../API'
function getusersApi(email,password){
    return axios.post(BaseUrl+'/login',{
        email,
        password
    });
}




function* loginAsync(action){



    
try{
  const reslogin =  yield call(getusersApi,action.email, action.password);

    // console.log('login=', action);
    yield put(loginActions.getLoginRes(reslogin.data));

}catch(error){
    console.log('error',error)
    yield put(loginActions.getLoginfailed(error))
}
    
     

}












export default function* LoginSaga(){
    yield takeEvery(types.LOGIN_USER_REQ,loginAsync)
}







