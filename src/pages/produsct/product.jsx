import React, {Component} from 'react';
import Index from './index'
import Detail from './detail'
import Sveupdate from './saveupdate'
import {Switch, Route, Redirect} from 'react-router-dom';
export default  class Product extends Component {
  render () {
    return (
        <Switch>
            <Route path='/product/index' component={Index}/>
            <Route path='/product/detail' component={Detail}/>
            <Route path='/product/saveupdate' component={Sveupdate}/>
            <Redirect to='/product/index'/>
        </Switch>
    )
  }
}

