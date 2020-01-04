import reducer from '../reducer/reducer'
import * as actionTypes from '../action/actionTypes'

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            error: null,
            loading: false,
        })
    })

    it('should store the token upon login', () => {
        expect(reducer({
            token: null,
            error: null,
            loading: false,
        },{
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
        })).toEqual({
            token: 'some-token',
            error: null,
            loading: false,
        })
    })

    it('should store the token upon login faild', () => {
        expect(reducer({
            error: null,
            loading: false,
        },{
            type: actionTypes.AUTH_FAIL,
            error: 'some-error'
        })).toEqual({
            error: 'some-error',
            loading: false,
        })
    })

    it('should remove token then logout', () => {
        expect(reducer({
            token:null
        },{
            type: actionTypes.AUTH_LOGOUT,
            token:null
        })).toEqual({
            token:null
        })

    })
})