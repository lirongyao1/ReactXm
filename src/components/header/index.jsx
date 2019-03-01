import React, {Component} from 'react';
import {Row, Col, Modal,message} from 'antd';
import {withRouter} from 'react-router-dom';
import dayjs from 'dayjs'
import './index.less'
import {reqWeather}  from '../../API'
import MemoryUtils from '../../utils/memoryUtils'
import {removeItem} from '../../utils/storageUtils';
import menuList from '../../config/menuConfig';
class Header extends Component {
    state={
        sysTime:dayjs().format('YYYY-MM-DD-HH:mm:ss'),
        dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/qing.png',
        weather: '晴11'
    }
    componentDidMount(){
        this.updateTime()
        this.getWeather('北京');
    }
    getWeather=(oo)=>{
        reqWeather(oo)
            .then(res=>{
                console.log(res)
                this.setState({
                    dayPictureUrl: res.dayPictureUrl,
                    weather: res.weather
                })
            })
            .catch(err=>{
                message.error(err);
            })
    }
    updateTime=()=>{
      this.intervalID=  setInterval(()=>{
            this.setState({
                sysTime:dayjs().format('YYYY-MM-DD-HH:mm:ss')
            })
        },1000)
    }
    componentWillUnmout(){
        clearInterval(this.intervalID)
    }
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
        const {sysTime,dayPictureUrl,weather}=this.state
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
        <Col span={18} className='header-bottom-right'>{sysTime} <span>{weather}</span><img src={dayPictureUrl} alt="天气"></img></Col>
      </Row>
      </div>
    )
  }
}
export default withRouter(Header)
