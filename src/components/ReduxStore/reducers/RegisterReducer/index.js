
import * as types from '../../types'



const initialState={

  name: '',
  email: '',
  password:'',
  resData: [],
  error: null,
  
}
                                       
export const registerReducer =(state=initialState,action)=>{
    switch(action.type){               
        case types.GET_USERS_REGISTER:
            return {
                ...state, 
                name:action.name,
                email: action.email,
                password: action.password
            }
            case types.GET_USERS_RESPONSE:
                console.log(action,'www')
                return{
                    ...state,
                    resData: action.resData
                }
            case  types.GET_USERS_FAILED:
                console.log('eee',action)
                return{
                    ...state,
                    error: action.error
                }
            default:
                return state;
    }
}














