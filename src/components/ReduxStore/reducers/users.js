import * as type from '../types';




const initialState={
    users:[],

}

export default function users(state=initialState,actions){

switch(actions.type)
  {
    case type.GET_USERS:
        return {
            ...state,
            users: actions.payload
        }
        case type.GET_USERS_RESPONSE:
            return{
                ...state,
                users: actions.data
            }
        default:
             return state;
    }


}













