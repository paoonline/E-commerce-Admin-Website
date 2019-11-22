import * as actionTypes from './actionTypes'
import { apiGatewayInstance } from '../../util/axiosInstance'

// return new state before login success
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

// return new state after login success 
export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        // userId: userId
    }
}

// return new state authen fail
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

// return new state remove localStorage for logout
export const logout = () => {
    localStorage.removeItem('token')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

// when click authen then return new state
export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
        }

        apiGatewayInstance.post('/signin', authData)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                dispatch(authSuccess(res.data.token))
            })
            .catch(err => {
                dispatch(authFail(err.response.data))
                if(err){
                    throw err
                }
            })
    }
}

// check token when refresh page then return new token
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }else{
            dispatch(authSuccess(token))
        }
    }
}