import React, {Component} from 'react';
import logo from '../../assets/images/logo.png'
import {Menu, Icon} from 'antd';
import {NavLink,withRouter} from 'react-router-dom';
import './index.less'
import menuList from '../../config/menuConfig'
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

  class LeftNave extends Component {
    componentWillMount(){
       this.menu= this.createMenu(menuList)
    }
    createMenu=(menu)=>{
        return menu.map(item=>{
            if(item.children){
               const {pathname}=this.props.location
                //find的返回值完全在回调函数中是怎么处理的
              const result= item.children.find((item)=>
                    pathname.indexOf(item.key)===0
                )
                if(result){
                    this.openKey = item.key
                }
                console.log(this)
return  <SubMenu key={item.key} title={<span><Icon type={item.icon} />{item.title}</span>}>{
    this.createMenu(item.children)
}
</SubMenu>
            }else {
                return <Item key={item.key}>
                    <NavLink to={item.key}>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </NavLink>
                </Item>
            }
        })
    }
  render () {
     let {pathname} = this.props.location;
     if(/^\/product/.test(pathname)){
         pathname='/product'
     }else if (/^\/charts/.test(pathname)){
         pathname='/charts'
     }else if (/^\/saveupdate/.test(pathname)){
         pathname='/saveupdate'
     }

    return (
    <div className="left-nav">
        <NavLink to='/admin'>
        <header>
            <img src={logo} alt="logo"/>
            <h2>硅谷后台</h2>
        </header>
        </NavLink>
        <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[pathname]}
            defaultOpenKeys={[this.openKey]}
        >
            {
                this.menu
            }
        </Menu>
      </div>
    )
  }
}
export default withRouter(LeftNave)
