
import React, {Component} from 'react';
import {reqProductsList} from '../../API'
import {Card, Button, Icon, Table, Select, Input, message} from 'antd';
const Option = Select.Option;
export default  class Index extends Component {
    state={
        products: [],
        total: 0
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
        const result= await reqProductsList(pageNum, pageSize)
        if (result.status ===0){
            this.setState({
                products:result.data.list,
                total:result.data.total
            })
        }else {
            message.error('加载失败')
        }
    }
    componentDidMount(){
        this.getProducts(1,3)
    }
    render () {
        const {products,total}=this.state
        return (
            <Card
                title={
                    <div>
                        <Select value='1'>
                            <Option value='1'>根据商品名称</Option>
                            <Option value='2'>根据商品描述</Option>
                        </Select>
                        <Input placeholder='关键字' style={{width: 200, marginLeft: 10, marginRight: 10}}/>
                        <Button type='primary'>搜索</Button>
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
                    loading={products.length === 0}
                />
            </Card>
        )
    }
}