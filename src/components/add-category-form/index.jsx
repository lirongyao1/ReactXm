import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Form, Input,Select } from 'antd'
const Option = Select.Option;

 class AddCategorForm extends Component {
    static propTypes={
        categories: PropTypes.array.isRequired,
        setFrom: PropTypes.func.isRequired
    }
    componentWillMount(){
        this.props.setFrom(this.props.form)
    }
  render () {
      const {categories} = this.props;
      const {getFieldDecorator} = this.props.form;
    return (
        <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item label='所属分类'>
                {getFieldDecorator(
                    'parentId',
                    {
                        initialValue: '0'
                    }
                )( <Select >
                    <Option value="0"> 一级类表</Option>
                    {
                        categories.map((item)=>{
                            return  <Option key={item._id} value={item._id}>{item.name}</Option>
                        })
                    }
                </Select>)}
            </Form.Item>
            <Form.Item label='分类名称'>
                {getFieldDecorator(
                    'categoryName',
                    {}
                )(<Input placeholder="输入商品名称" />)}
            </Form.Item>
        </Form>
    )
  }
}
export default Form.create()(AddCategorForm)
