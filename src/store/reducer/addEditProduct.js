import * as actionTypes from '../action/actionTypes'
import { updateObject } from  '../../util/etc'

const initialState = {
    loading: false,
    status: ''
}

const productStart = (state, action) => {
    return updateObject(state, {error:null, loading: true})
}

const productSave = (state, action) => {
    return updateObject(state, {error:null, loading: false})
}

// return reducer from variable
export const productReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PRODUCT_ADD:
            return productStart(state, action)
        case actionTypes.PRODUCT_SAVE:
            return productSave(state, action)
        default:
            return state;
    }   
}