import React from 'react';
import 'antd/dist/antd.css';
import { Admin } from './layout'
import { Login, ProductList } from './page'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/action/index'

const App = (props) => {
  let auth = (
    <Switch>
      <Route path="/login" component={() => AuthenRoute(Login)} />
      <Route path="/" component={() => AuthenRoute(<ProductList />)} />
      <Route path="/productList" component={() => AuthenRoute(<ProductList />)} />
    </Switch>
  )
  props.onTryAutoSignup()

  const AuthenRoute = Component => {
    let ComponentAuthen = null
    //authen
    if (props.isAuthenticated) {
      ComponentAuthen = (
        <Admin>
          <ProductList />
        </Admin>
      )
    }
    //not authen
    if (!props.isAuthenticated) {
      ComponentAuthen = <Login />
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