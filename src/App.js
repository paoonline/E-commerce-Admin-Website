import React from 'react';
import 'antd/dist/antd.css';
import { Admin } from './layout'
import { Login, ProductList, ProductAdd, ProductEdit } from './container'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/action/index'

const App = (props) => {
  if (!props.isAuthenticated) {
    props.onTryAutoSignup()
  }

  let auth = (
    <Switch>
      <Route path="/login" component={() => props.isAuthenticated ? null : AuthenRoute(Login)} />
      <Route exact path="/" component={() => AuthenRoute(<ProductList/>)} />
      <Route path="/products/productList" component={() => AuthenRoute(<ProductList/>)} />
      <Route path="/products/productAdd" component={() => AuthenRoute(<ProductAdd/>)} />
      <Route path="/products/productEdit/:id" component={() => AuthenRoute(<ProductEdit/>)} />
    </Switch>
  )

  const AuthenRoute = Component => {
    let ComponentAuthen = null

    //authen
    if (props.isAuthenticated) {
      ComponentAuthen = (
        <Admin>
          {Component}
        </Admin>
      )
    }
    //not authen
    if (!props.isAuthenticated) {
      ComponentAuthen = (
        <Login />
      )
    }
    return ComponentAuthen
  }
  return auth
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null // token from authen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));