import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import { authReducer, listReducer, productReducer } from './store/reducer/'
import thunk from 'redux-thunk'

export default ({ children, intl = {} }) => {

    // redux devtool
    const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

    // combine reducer
    const rootReducer = combineReducers({
        auth: authReducer,
        list: listReducer,
        product: productReducer
    })

    const store = createStore(rootReducer, intl, composeEnhancers(applyMiddleware(thunk)))
    return (
        <Provider store={store}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </Provider>
    )
}