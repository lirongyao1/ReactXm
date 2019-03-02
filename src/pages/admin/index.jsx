import React, {Component} from 'react';
import {Layout} from 'antd';
import {Switch, Route, Redirect} from 'react-router-dom';
import LeftNav from '../../components/left-nav'
// import {getItem} from '../../utils/storageUtils'
import Header from '../../components/header'
import Category from '../category'
import Footer from '../../components/footer'
import MemoryUtils from '../../utils/memoryUtils'
import Product from '../produsct'
import Home from '../home'
const {
     Content, Sider
} = Layout
export default  class Admin extends Component {
  render () {
    const user= MemoryUtils.user
      console.log(user);
      if(!user||!user._id){
        return <Redirect to="/login"/>
      }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
            <LeftNav/>
            </Sider>
            <Layout>
              <Header/>
                <Content style={{margin: 18}}>
                  <Switch>
                      <Route path='/home' component={Home}/>
                      <Route path='/category' component={Category}/>
                      <Route path='/product' component={Product}/>
                  </Switch>
                </Content>
              <Footer />
          </Layout>
        </Layout>
    )
  }
}

