import React, {Component} from 'react';
import {Row, Col, Modal} from 'antd';
import {withRouter} from 'react-router-dom';
import './index.less'
import MemoryUtils from '../../utils/memoryUtils'
import {removeItem} from '../../utils/storageUtils';
import menuList from '../../config/menuConfig';
class Header extends Component {
    logOut = () => {
        Modal.confirm({
            title: '您确认要退出登录吗?',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                //点击确认时触发回调函数
                //清除用户信息（localStorage 内存）
                removeItem();
                MemoryUtils.user = {};
                //返回到登录页面
                this.props.history.replace('/login');
            }
        });
    }
    getTile=(menu)=>{
        const {pathname} = this.props.location;
      for(var i=0;i<menu.length;i++){
        let item=menu[i]
        if(item.children){
            for (var j = 0; j < item.children.length; j++) {
               const title=this.getTile(item.children)
                if (title) {
                    return title;
                }
            }
        } else
          {
            if(item.key===pathname){
                return item.title
            }
        }
      }
    }
  render () {
      const {_id}=MemoryUtils.user
      const title=this.getTile(menuList)
    return (
    <div className="header">
      <Row className='header-top'>
        <span>欢迎,{_id}</span>
        <a href="javascript:void(0);" onClick={this.logOut}>退出</a>
      </Row>
      <Row className='header-bottom'>
        <Col span={6} className='header-bottom-left'>{title}</Col>
        <Col span={18} className='header-bottom-right'>时间 + 天气</Col>
      </Row>
      </div>
    )
  }
}
export default withRouter(Header)
