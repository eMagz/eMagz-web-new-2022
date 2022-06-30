import * as types from './type';



export function feedbackReq(subject,feedback){
    return{
        type: types.FEEDBACK_REQ,
       subject,
       feedback
    }

    }


    export function feedbackRes(feedData){

        return{
            type: types.FEEDBACK_RES,
           feedData
        }
    
        }
    

        export function feedbackfail(error){

            return{
                type: types.FEEDBACK_FAIL,
               error
            }
        
            }








