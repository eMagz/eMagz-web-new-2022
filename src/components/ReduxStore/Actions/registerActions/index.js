import * as types from '../../types';




export function getregister(name,email,password){

    return{
        type: types.GET_USERS_REGISTER,
       name,
       email,
       password
    }
//     {
//         types: types.USERS_REGISTER_SUCCESS,
//     userData
//    }
    }


export function getRegisterRes(resData){

return{
    type: types.GET_USERS_RESPONSE,
    resData
}

}

export function getRegisterfailed(error){


return{
    type: types.GET_USERS_FAILED,
    error
}


}












