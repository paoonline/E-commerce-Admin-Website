import * as actionTypes from './actionTypes'
import service from '../../util/axiosInstance'

export const productFetch = () => {
    return dispatch => {
        dispatch(productStart())
        try {
            service().get('/product_list').then((val) => {
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
            return service().put('/product_create', params).then((val) => {
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
            return service().post('/image_upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
            service().get(`/product_search?productName=${text}`).then((val) => {
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
            service().delete(`/product_delete?_id=${id}`, ).then(() => {
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
            return service().get(`/product_editone?_id=${params}`).then((res) => {
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
            return service().post('/product_update', params).then((val) => {
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
