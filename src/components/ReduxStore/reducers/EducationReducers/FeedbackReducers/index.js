import * as types from '../../../Actions/EducationActions/FeedbackActions/type';


const initialState={

    subject: '',
    feedback: '',
    
    feedData: [],
    error: [],
    
  }
                                         
  export const feedbackReducer =(state=initialState,action)=>{
      switch(action.type){               
          case types.FEEDBACK_REQ:
              return {
                  ...state, 
                  subject:action.subject,
                  feedback: action.feedback,
                 
              }
              case types.FEEDBACK_RES:
                //   console.log(action,'www')
                  return{
                      ...state,
                      feedData: action.feedData
                  }
              case  types.FEEDBACK_FAIL:
                //   console.log('eee',action)
                  return{
                      ...state,
                      error: action.error
                  }
              default:
                  return state;
      }
  }
  
  


