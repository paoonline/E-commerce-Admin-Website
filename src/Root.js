import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import reduxPromise from 'redux-promise'
import { BrowserRouter } from 'react-router-dom'

export default ({ children, intl = {} }) => {

    // redux devtool
    const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

    // combine reducer
    const rootReducer = combineReducers({
        auth: ''
    })

    const store = createStore(rootReducer, intl, composeEnhancers(applyMiddleware(reduxPromise)))
    return (
        <Provider store={store}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </Provider>
    )
}