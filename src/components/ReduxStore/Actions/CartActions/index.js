import * as types from "../../types";

export function getCartData(cartdata) {
  console.log("rt", cartdata);
  return {
    type: types.ADD_TO_CART,
    cartdata,
  };
}
