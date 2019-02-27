import React, {Component} from 'react';
import './assets/less/index.less'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Admin from './pages/admin'
import Login from './pages/login'
export default  class App extends Component {
  render () {
    return (
       <Router>
         <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/' component={Admin}/>
         </Switch>
       </Router>
    )
  }
}



