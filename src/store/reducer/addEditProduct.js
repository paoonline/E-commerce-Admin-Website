import * as actionTypes from '../action/actionTypes'
import { updateObject } from  '../../util/etc'

const initialState = {
    loading: false,
    status: '',
    loadingEdit: false
}

const productStart = (state, action) => {
    return updateObject(state, {error:null, loading: true})
}

const productSave = (state, action) => {
    return updateObject(state, {error:null, loading: false})
}

const productEditStart = (state) => {
    return updateObject(state, {error:null, loadingEdit: true})
}

const productEditGet = (state) => {
    return updateObject(state, {error:null, loadingEdit: false})
}

// return reducer from variable
export const productReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PRODUCT_ADD:
            return productStart(state, action)
        case actionTypes.PRODUCT_SAVE:
            return productSave(state, action)
        case actionTypes.PRODUCT_EDITSTART:
            return productEditStart(state)
        case actionTypes.PRODUCT_EDITGET:
            return productEditGet(state)
        default:
            return state;
    }   
}