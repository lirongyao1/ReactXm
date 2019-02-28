import React, {Component} from 'react';
import LoginForm from '../../components/login-form';
import {reqLogin} from '../../API'
import logo from '../../assets/images/logo.png'
import {setItem} from  '../../utils/storageUtils'
import MemoryUtils from '../../utils/memoryUtils'
import './index.less'

export default  class Login extends Component {
    state = {
        errMsg: ''
    }
    login=async(username, password)=>{
      const value=  await reqLogin(username,password)
          // console.log(value.data.status);
          //   console.log(value.data.msg);
  if(value.status===0){
      setItem(value.data)
      MemoryUtils.user=value.data
      console.log(value.data)
      console.log( MemoryUtils.user)
      this.props.history.replace('/')
  }else {
      this.setState({
          errMsg: value.data.msg
      })
  }
  }
  render () {
      const {errMsg}=this.state
      const height = errMsg ? 30 : 0;
    return (
    <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo"/>
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section className="login-form">
          <div className='err-msg' style={{height}}>{errMsg}</div>
        <h2>用户登录</h2>
        <LoginForm login={this.login}/>
      </section>
    </div>
    )
  }
}

