import React, {Component} from 'react';
import LoginForm from '../../components/login-form';
import {reqLogin} from '../../API'
import logo from '../../assets/images/logo.png'
import {message} from 'antd'
import './index.less'

export default  class Login extends Component {
    state = {
        errMsg: ''
    }
    login=async(username, password)=>{
      const value=  await reqLogin(username,password)
      console.log(value.data.status);
        console.log(value.data.msg);
  if(value.data.status===0){
      this.props.history.replace('/')
  }else {
      this.setState({
          errMsg: value.data.msg
      })
      message.error(this.state.errMsg,2);
  }
  }
  render () {
    return (
    <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo"/>
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section className="login-form">
        <h2>用户登录</h2>
        <LoginForm login={this.login}/>
      </section>
    </div>
    )
  }
}

