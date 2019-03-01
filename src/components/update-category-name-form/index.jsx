import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Input} from "antd";

 class UpdateCategoryNameForm  extends Component {
     static propTypes = {
         categoryName: PropTypes.string.isRequired,
         setForm: PropTypes.func.isRequired
     }
     componentWillMount(){
         this.props.setForm(this.props.form)
     }
  render () {
      const {getFieldDecorator} =this.props.form
      const {categoryName}=this.props
    return (
        <Form>
            <Form.Item>
                {
                    getFieldDecorator(
                        'categoryName',
                        {
                            initialValue: categoryName
                        }
                    )(
                        <Input />
                    )
                }
           </Form.Item>
        </Form>
    )
  }
}
export default Form.create()(UpdateCategoryNameForm)
