import React, {Component} from 'react';
import {Row, Col} from 'antd';
import {Switch, Route, Redirect} from 'react-router-dom';
import LeftNav from '../../components/left-nav'
import './index.less'
import {getItem} from '../../utils/storageUtils'
import Header from '../../components/header'
import Category from '../category'
import Footer from '../../components/footer'
import MemoryUtils from '../../utils/memoryUtils'
import Home from '../home'
export default  class Admin extends Component {
  render () {
    const user= MemoryUtils.user
      console.log(user);
      if(!user||!user._id){
          console.log('sss',user)
        return <Redirect to="/login"/>
      }
    return (
        <Row className='admin'>
          <Col span={4} className='hh'>
            <LeftNav/>
          </Col>
          <Col span={20} className='hhh'>
              <Header/>
              <div className="admin-main">
                  <Switch>
                      <Route path='/home' component={Home}/>
                      <Route path='/category' component={Category}/>
                  </Switch>
              </div>
              <Footer/>
          </Col>
        </Row>
    )
  }
}

