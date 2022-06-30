
import axios from 'axios'
import * as types from '../../types'
import {BaseUrl} from "../../../API"

export function getLogin(email, password) {
    return {
        type: types.LOGIN_USER_REQ,
        email,
        password
    }
}
export function getLoginRes(loginData) {
    return {
        type: types.LOGIN_USER_RES,
        loginData
    }
}

export function getLoginfailed(error) {
    return {
        type: types.LOGIN_USER_FAIL,
        error
    }
}


export function getVendorDetails(vendorData)  {
    return {
        type: types.GET_VENDOR_RES,
        payload: vendorData
    }
}

// export const getVendorDetails = (id) =>async(dispatch)=>{
//     try {
//         dispatch({
//             type: types.GET_VENDOR_REQ
//         })    
//         const res = axios.get(`${BaseUrl}/view-vendor/${id}`)
//         dispatch({
//             type: types.GET_VENDOR_RES,
//             payload: res.data.data
//         })
//     } catch (error) {
//         console.log('Error', error)
//     }
    
// }


