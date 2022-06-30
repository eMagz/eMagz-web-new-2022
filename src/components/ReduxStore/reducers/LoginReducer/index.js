import * as types from "../../types";

export const loginReducer = (
  state = { userDetails: {}, adminDetails: {} },
  action
) => {
  switch (action.type) {
    case types.LOGIN_USER_REQ:
      return {
        ...state,
      };
    case types.LOGIN_USER_RES:
      console.log("action.loginData", action.loginData);
      if (action.loginData.name === "admin") {
        return { adminDetails: action.loginData };
      }
      return { userDetails: action.loginData };

    case types.LOGIN_USER_FAIL:
      console.log("eee", action);
      return {
        ...state,
        error: action.error.response.data,
      };
    default:
      return state;
  }
};

export const vendorReducer = (state = { vendorDetails: {} }, action) => {
  switch (action.type) {
    case types.GET_VENDOR_RES:
      return {
        vendorDetails: action.payload,
      };
    default:
      return state;
  }
};
