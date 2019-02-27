import React, {Component} from 'react';
import {Row, Col} from 'antd';
import {Switch, Route, Redirect} from 'react-router-dom';
import LeftNav from '../../components/left-nav'
import './index.less'
import Header from '../../components/header'
import Category from '../category'
import Footer from '../../components/footer'
export default  class Admin extends Component {
  render () {
    return (
        <Row className='admin'>
          <Col span={4} className='hh'>
            <LeftNav/>
          </Col>
          <Col span={20} className='hhh'>
              <Header/>
              <div className="admin-main">
                  <Category/>
              </div>
              <Footer/>
          </Col>
        </Row>
    )
  }
}

