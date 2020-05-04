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

export const productAddAsync = (params) => {
    return dispatch => {
        dispatch(productAdd())
        try {
            return apiGatewayInstance.put('/product_create', params, {
                headers: {
                    authorization: getToken,
                }
            }).then((val) => {
                dispatch(productSave(true))
                return {status: true, id: val.data._id}
            }).catch(() => {
                dispatch(productSave(false))
                return false
            })
        } catch (error) {
            throw error
        }
    }
}

export const productAddImage = (formData) => {
    return () => {
        try {
            return apiGatewayInstance.post('/image_upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: getToken,
                }
            }).then((val) => {
                return true
            }).catch(() => {
                return false
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

export const getProductEditData = (params) => {
    return dispatch => {
        dispatch(productEditStart())
        try {
            return apiGatewayInstance.get(`/product_editone?_id=${params}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: getToken,
                }
            }).then((res) => {
                dispatch(productEditGet())
                return res.data
            }).catch(() => {
                dispatch(productEditGet())
                return false
            })
        } catch (error) {
            throw error
        }
    }
}

export const productEditAsync = (params) => {
    return dispatch => {
        dispatch(productAdd())
        try {
            return apiGatewayInstance.post('/product_update', params, {
                headers: {
                    authorization: getToken,
                }
            }).then((val) => {
                dispatch(productSave(true))
                return {status: true, id: val.data._id}
            }).catch(() => {
                dispatch(productSave(false))
                return false
            })
        } catch (error) {
            throw error
        }
    }
}

export const productEditStart = (params) => {
    return {
        type: actionTypes.PRODUCT_EDITSTART,
        status: params
    }
}

export const productEditGet = (params) => {
    return {
        type: actionTypes.PRODUCT_EDITGET,
        status: params
    }
}

export const productAdd = (params) => {
    return {
        type: actionTypes.PRODUCT_ADD,
        status: params
    }
}

export const productSave = (params) => {
    return {
        type: actionTypes.PRODUCT_SAVE,
        status: params
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
