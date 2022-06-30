import axios from 'axios';
import { BaseUrl } from '../../../../API';


const getCategoryList = () => {
    axios.get(`${BaseUrl}/view-business-category`).then(
        res => {
            return res.data.data
        }
    )
}

const getSubategoryList = (category) => {
    axios.get(`${BaseUrl}/view-business-sub-category/${category}`).then(
        res => {
            return res.data.data
        }
    )
}

const getGstPercentage = () => {

    axios.get(`${BaseUrl}/viewgst`).then(
        res => {
            return {
                setGstlist: res.data.data.gst,
                setGsttypelist: res.data.data.type
            }
        }
    )

}