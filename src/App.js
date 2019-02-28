import React, {Component} from 'react';
import './assets/less/index.less'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Admin from './pages/admin'
import Login from './pages/login'
import MemoryUtils from  './utils/memoryUtils'
import {getItem} from './utils/storageUtils'
export default  class App extends Component {
  render () {
      const user =getItem()
      if (user&&user._id){
          MemoryUtils.user=user
      }
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



