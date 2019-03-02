import React, {Component} from 'react';
import { Card, Button, Icon, Table,message, Modal } from 'antd';
import AddCategoryForm from '../../components/add-category-form'
import {reqAddCategory,reqCategories,reqUpdateCategoryName} from '../../API'
import UpdateCategoryNameForm from '../../components/update-category-name-form'
    export default class Category extends Component {
    state={
        categories:[],
        isShowAdd: false,
        isShowUpdate:false,
        category:{},
        subCategories:[],
        parentName: '',
        parentId:'0'
    }
    updateCategoryName= async()=>{
        const categoryName = this.form.getFieldValue('categoryName');
        const {name, _id} = this.state.category;
        if(categoryName===name){
            message.warn('请修改分类名称~');
        }else {
            // const result= await reqUpdateCategoryName(categoryName,_id)
            const result = await reqUpdateCategoryName(_id, categoryName);
            if (result.status===0){
                message.success('修改分类名称成功')
                this.setState({
                    isShowUpdate:false,
                    categories:this.state.categories.map((item)=>{
                        if(item._id===_id){
                            item.name=categoryName
                        }
                        return item
                    }),
                    subCategories:this.state.subCategories.map((item)=>{
                        if(item._id===_id){
                            item.name=categoryName
                        }
                        return item
                    })
                })
            }else {
                message.error('修改分类名称失败');
                this.setState({
                    isShowUpdate:false
                })
            }
        }
        }
    getCategories=async parentId =>{
        const result = await reqCategories(parentId);
        console.log(result);
        if(result.status===0){
            if(parentId==='0'){
                this.setState({
                    categories:result.data,
                    parentId
                })
            }else {
                this.setState({
                    subCategories:result.data,
                    parentId
                })
            }


        }else {
            message.error('获取分类列表数据失败~');
        }
    }
        addCategory = async()=>{
            const {parentId, categoryName} = this.form.getFieldsValue();
            const result = await reqAddCategory(parentId, categoryName);
            let updateState = {isShowAdd: false};
            if (result.status ===0){
                message.success('添加分类成功~');
                const currentId = this.state.parentId;
               if(parentId === '0'){
                   updateState.categories = [...this.state.categories, result.data];
               }else {
                   if(currentId === parentId){
                       updateState.subCategories = [...this.state.subCategories, result.data];
                   }
               }
            }else {
                message.error('添加分类失败~');
            }
            this.form.resetFields();
            this.setState(updateState);
        }
        componentWillMount(){
            this.columns = [
                {
                    title: '品类名称',  //表头名称
                    dataIndex: 'name',
                    // render: text => text,  //自定义渲染文本的规则
                }, {
                    title: '操作',
                    width: 300,
                    render: category => {
                        const {parentId} = this.state;
                        if(parentId==='0'){
                            return   <div>
                                <a href="javascript:void(0)"  onClick={()=>this.setState({isShowUpdate:true,category})}>修改名称</a> &nbsp;&nbsp;&nbsp;
                                <a href="javascript:void(0)" onClick={()=>{
                                    this.setState({parentName:category.name})
                                    this.getCategories(category._id)
                                }
                                }>查看其子品类</a>
                            </div>
                        }else {
                            return <a href="javascript:void(0)" onClick={()=>this.setState({isShowUpdate:true,category})}>修改名称</a>
                        }
                }
            }];
        }
    componentDidMount(){
      this.getCategories('0')
    }
    render () {
        const {categories,isShowAdd,isShowUpdate,category,parentId,subCategories,parentName} = this.state
const isCategory=parentId==='0'
        const data = isCategory ? categories : subCategories;
        console.log(data,parentId);
        return (
            <Card
                title={
                    isCategory
                        ? '一级分类列表'
                        : <div><span>一级分类列表&nbsp;&nbsp;</span><a href="javascript:void(0)" onClick={() => {
                        this.setState({parentId: '0'})
                        }} ><Icon type="arrow-right" />&nbsp;&nbsp;{parentName}</a></div>
                }
                extra={<Button type='primary' onClick={()=>this.setState({isShowAdd:true})}><Icon type="plus" />添加品类</Button>}
            >
              <Table
                  columns={this.columns}
                  dataSource={data}
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
                    title="更新分类"
                    visible={isShowUpdate}
                    okText='确认'
                    cancelText='取消'
                    onOk={this.updateCategoryName}
                    onCancel={() => this.setState({isShowUpdate: false})}
                    width={300}
                >
                    <UpdateCategoryNameForm categoryName={category.name} setForm={form => this.form = form}/>
                </Modal>
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