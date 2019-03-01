import React, {Component} from 'react';
import {reqCategories} from '../../API'
import { Card, Button, Icon, Table,message, Modal } from 'antd';
import AddCategoryForm from '../../components/add-category-form'
import {reqAddCategory} from '../../API'

    export default class Category extends Component {
    state={
        categories:[],
        isShowAdd: false
    }
    getCategories=async parentId =>{
        const result = await reqCategories(parentId);
        console.log(result);
        if(result.status===0){
            this.setState({
                categories:result.data
            })
            console.log(this.state);
        }else {
            message.error('获取分类列表数据失败~');
        }
    }
        addCategory = async()=>{
            const {parentId, categoryName} = this.form.getFieldsValue();
            const result = await reqAddCategory(parentId, categoryName);
            if (result.status ===0){
                message.success('添加分类成功~');
                this.setState({
                    categories: [...this.state.categories, result.data],
                    isShowAdd: false
                })
            }else {
                message.error('添加分类失败~');
                this.setState({
                    isShowAdd: false
                })
            }
        }
    componentDidMount(){
      this.getCategories('0')
    }
    render () {
        const columns = [{
            title: '品类名称',  //表头名称
            dataIndex: 'name',
            // render: text => text,  //自定义渲染文本的规则
        }, {
            title: '操作',
            width: 300,
            render: xxx => {
                return <div>
                  <a href="javascript:void(0)">修改名称</a> &nbsp;&nbsp;&nbsp;
                  <a href="javascript:void(0)">查看其子品类</a>
                </div>
            }
        }];

        const {categories,isShowAdd} = this.state

        return (
            <Card
                title="一级分类列表"
                extra={<Button type='primary' onClick={()=>this.setState({isShowAdd:true})}><Icon type="plus" />添加品类</Button>}
            >
              <Table
                  columns={columns}
                  dataSource={categories}
                  bordered
                  pagination={{
                      pageSize: 3,
                      showSizeChanger: true,
                      pageSizeOptions: ['3', '6', '9', '12'],
                      showQuickJumper: true
                  }}
                  rowKey='_id'
                  loading={categories.length === 0}
              />
                <Modal
                    title="商品分类"
                    visible={isShowAdd}
                    okText='确认'
                    cancelText='取消'
                     onOk={this.addCategory}
                    onCancel={() => this.setState({isShowAdd: false})}
                >
                    <AddCategoryForm categories={categories} setFrom={form=>this.form=form}/>
                </Modal>
            </Card>
        )
    }
}