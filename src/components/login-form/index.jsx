import React, {Component} from 'react';
import './index.less'
import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';

 class LoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(err);
            if (!err) {
                console.log('Received values of form: ', values);
            }else {
                this.props.form.resetFields(['password']);
            }
        });
    }
     checkPassword=(rule, value, callback)=>{
        // console.log(rule, value)
         if (!value) {
             callback('必须输入密码');
         } else if (value.length < 4) {
             callback('密码长度必须超过4位');
         } else if (value.length > 11) {
             callback('密码长度必须小于11位');
         } else if (!(/^[a-zA-Z0-9_]+$/.test(value))) {
             //代表校验不通过
             callback('密码只能包含大小写英文、数字或者下划线')
         } else {
             //代表校验通过
             callback();
         }
     }


  render () {
      const { getFieldDecorator } = this.props.form;
    return (
        <Form onSubmit={this.handleSubmit} className="login-form-container">
            <Form.Item>
                {getFieldDecorator('username',{
                    rules: [{ required: true, message: '用户名不能为空' },
                        {max:11,message:'用户名不得大于11位'},
                        {min:4,message:'用户名最少为4位'},
                        {pattern:/^[a-zA-Z0-9_]+$/,message:'密码只能是数字、字母或下划线'}
                    ]
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />)}
            </Form.Item>
            <Form.Item>
                {/*{getFieldDecorator('password',{*/}
                    {/*rules: [{ required: true, message: '密码不能为空' },*/}
                        {/*{max:11,message:'密码不能超过11位'},*/}
                        {/*{min:4,message:'密码最小长度为4位'},*/}
                        {/*{pattern:/^[a-zA-Z0-9_]+$/,message:'密码只能是数字、字母或下划线'}*/}
                    {/*],*/}
                {/*})(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />)}*/}
                {getFieldDecorator('password',{
                    rules: [
                        {validator: this.checkPassword}
                    ]
                })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />)}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
            </Form.Item>
        </Form>
    )
  }
}
const WrappedLoginForm =Form.create()(LoginForm)
export default WrappedLoginForm;
