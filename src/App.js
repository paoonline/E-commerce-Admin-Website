import React from 'react';
import 'antd/dist/antd.css';
import { Admin } from './layout'
import { Login, ProductList } from './page'
import { Switch, Route } from 'react-router-dom'

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={() => <Admin />} />
      <Route exact path="/productList" component={() => <Admin><ProductList /></Admin>} />
      <Route path="/login" component={Login} />
    </Switch>
  );
}

export default App;