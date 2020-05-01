import * as actionTypes from '../action/actionTypes'
import { updateObject } from  '../../util/etc'

const initialState = {
    token: null,
    error: null,
    loading: false,
}

// return new state before login success
const authStart = (state, action) => {
    return updateObject(state, {error:null, loading:true})
}

// return new state after login success 
const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        error: null,
        loading: false
    })
}

// return new state authen fail
const authFail = (state, action) => {
    return updateObject(state,{
        error: action.error,
        loading: false
    })
}

// return new state remove localStorage for logout
const authLogout = (state, action) => {
    return updateObject(state, {token: null})
}

// return reducer from variable
export const authReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return authStart(state, action)
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action)
        case actionTypes.AUTH_FAIL:
            return authFail(state, action)
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action)
        default:
            return state;
    }   
}