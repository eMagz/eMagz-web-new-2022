import * as types from '../types';



export function resgetusers(data){

return{
    type: types.GET_USERS_RESPONSE,
    data
}

}


export function getUsers(users){
    return{
        type: types.GET_USERS,
        payload: users,
    }
}


export function getLoginData(logdata){

  return{
      type: types.LOGIN_USER,
      logdata
  }


}










