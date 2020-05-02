import * as actionTypes from './actionTypes'
import { apiGatewayInstance } from '../../util/axiosInstance'

const getToken = localStorage.getItem("token")

export const productFetch = () => {
    return dispatch => {
        dispatch(productStart())
        try {
            apiGatewayInstance.get('/product_list', {
                headers: {
                    authorization: getToken,
                },
            }).then((val) => {
                dispatch(productSuccess(val.data))
            })
        } catch (error) {
            throw error
        }
    }
}

export const productSearch = (text) => {
    return dispatch => {
        try {
            apiGatewayInstance.get(`/product_search?productName=${text}`, {
                headers: {
                    authorization: getToken,
                },
            }).then((val) => {
                dispatch(productSuccess(val.data))
            })
        } catch (error) {
            throw error
        }
    }
}


export const productDelete = (id, list) => {
    return dispatch => {
        dispatch(productStart('delete'))
        try {
            apiGatewayInstance.delete(`/product_delete?_id=${id}`, {
                headers: {
                    authorization: getToken,
                },
            }).then(() => {
                dispatch(productSuccess(list, 'delete'))
                dispatch(productStatusDelete(true))
            }).catch(() => dispatch(productStatusDelete(false)))
        } catch (error) {
            dispatch(productStatusDelete(false))
        }
    }
}

export const productStatusDelete = (params) => {
    return  {
        type: actionTypes.PRODUCT_DELETESTATUS,
        status: params
    }
}

export const productStart = () => {
    return  {
        type: actionTypes.PRODUCT_START,
    }
}

export const productSuccess = (params) => {
    return {
        type: actionTypes.PRODUCT_LIST,
        data: params,
    }
}
