import { combineReducers } from "redux";

import { registerReducer } from "./RegisterReducer";

import authReducers from "../../VideoConference/redux/reducers/authReducers";
import { loginReducer, vendorReducer } from "./LoginReducer";
import { feedbackReducer } from "./EducationReducers/FeedbackReducers";
import { cartReducer } from "./CartReducer";

const rootReducer = combineReducers({
  registerReducer,
  loginReducer,
  feedbackReducer,
  cart: cartReducer,
  vendorReducer,
  authReducers
});

export default rootReducer;
