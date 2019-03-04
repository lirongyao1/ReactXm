
import React, {Component} from 'react';
import {reqProductsList,reqSearchProductsList} from '../../API'
import {Card, Button, Icon, Table, Select, Input, message} from 'antd';
const Option = Select.Option;
export default  class Index extends Component {
    state={
        products: [],
        total: 0,
        searchType: 'productName',
        searchName: '',
        isSubCategoriesLoading:true
    }
    componentWillMount(){
        this.columns = [
            {
                title: '商品名称',  //表头名称
                dataIndex: 'name',
                // render: text => text,  //自定义渲染文本的规则
            }, {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                width: 200,
                render: text => '¥'+ text
            },
            {
                title: '状态',
                width: 200,
                render: category => {
                    return <div>
                        <Button type='primary'>上架</Button>&nbsp;&nbsp;
                        已下架
                    </div>
                }
            },
            {
                title: '操作',
                width: 200,
                render: category => {

                    return (
                        <div>
                            <a  onClick={() => {}}>详情 </a>&nbsp;&nbsp;
                            <a  onClick={() => {}}>修改</a>
                        </div>
                    )
                }
            }
        ];
    }
    getProducts=async(pageNum, pageSize)=>{
        const {searchName, searchType} = this.state;
        let result;

        if (searchName) {
            result = await reqSearchProductsList({searchName, searchType, pageNum, pageSize});
        } else {
            result = await reqProductsList(pageNum, pageSize);
        }
        console.log(result)
        if (result.status === 0) {
            if (result.data.list.length!==0){
                this.setState({
                    products: result.data.list,
                    total: result.data.total,
                    isSubCategoriesLoading:true
                })
            }else {
                this.setState({
                    products: result.data.list,
                    total: result.data.total,
                    isSubCategoriesLoading:false
                })
            }

        } else {
            message.error('获取分页商品数据失败');
        }
        console.log(this.state.products);
    }
    handleChange=(name,value)=>{
        this.setState({
            [name]: value
        })
    }
    // getProducts=async(pageNum, pageSize)=>{
    //     const result= await reqProductsList(pageNum, pageSize)
    //     if (result.status ===0){
    //         this.setState({
    //             products:result.data.list,
    //             total:result.data.total
    //         })
    //     }else {
    //         message.error('加载失败')
    //     }
    // }
    componentDidMount(){
        this.getProducts(1,3)
    }
    render () {
        const {products,total,isSubCategoriesLoading}=this.state
        let isLoading=products.length?products.length===0:isSubCategoriesLoading
        console.log(isSubCategoriesLoading);
        return (
            <Card
                title={
                    <div>
                        <Select defaultValue='productName' onChange={value => this.handleChange('searchType', value)}>
                            <Option value='productName' >根据商品名称</Option>
                            <Option value='productDesc'>根据商品描述</Option>
                        </Select>
                        <Input placeholder='关键字' onChange={e => this.handleChange('searchName', e.target.value)} style={{width: 200, marginLeft: 10, marginRight: 10}}/>
                        <Button type='primary' onClick={() => this.getProducts(1, 3)}>搜索</Button>
                    </div>
                }
                extra={<Button type='primary'><Icon type='plus'/>添加产品</Button>}
            >
                <Table
                    columns={this.columns}
                    dataSource={products}
                    bordered
                    pagination={{
                        defaultPageSize: 3,
                        showSizeChanger: true,
                        pageSizeOptions: ['3', '6', '9', '12'],
                        showQuickJumper: true,
                        total,
                        onChange: this.getProducts,
                        onShowSizeChange: this.getProducts
                    }}
                    rowKey='_id'
                    loading={isLoading}
                />
            </Card>
        )
    }
}