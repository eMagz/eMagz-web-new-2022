
import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import * as types from '../../ReduxStore/types';
import * as registerActions from '../../ReduxStore/Actions/registerActions';
import { useHistory } from 'react-router-dom';
import { BaseUrl, ImageUrl } from '../../API'


// 


function registerUserApi(name,email, password) {
    return axios.post(BaseUrl+'/register', {
      name,
      email,
      password
      
    });
  }

function* registerAsync(action){


   try{
       const res = yield call(registerUserApi, action.name,action.email, action.password);
       
        

       yield put(registerActions.getRegisterRes(res.data));
      //  yield put({ type: 'GET_USERS_REGISTER', res: res })
      //  yield put({type: 'GET_USERS_REGISTER', res})
      //  return res
      //  if(res.data.status=== true){
      //   history.push('/dashboard')
      //  }
   }catch(e){
     console.log('sagaerr',e);
      yield put (registerActions.getRegisterfailed(e))
   }
}




export function* registerSaga() {
    yield takeEvery(types.GET_USERS_REGISTER, registerAsync);
  }