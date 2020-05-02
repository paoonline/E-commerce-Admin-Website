import * as actionTypes from '../action/actionTypes'
import { updateObject } from  '../../util/etc'

const initialState = {
    loading: false,
    list: [],
    status: ""
}

const productStart = (state, action) => {
    return updateObject(state, {error:null, loading:true, status: ""})
}

const productList = (state, action) => {
    return updateObject(state, {loading:false, list:[...action.data] })
}

const productDeleteStatus = (state, action) => {
    return updateObject(state, {loading:false, status: action.status })
}

export const listReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PRODUCT_START:
            return productStart(state, action)
        case actionTypes.PRODUCT_LIST:
            return productList(state, action)
        case actionTypes.PRODUCT_DELETESTATUS:
            return productDeleteStatus(state, action)
        default:
            return state;
    }   
}