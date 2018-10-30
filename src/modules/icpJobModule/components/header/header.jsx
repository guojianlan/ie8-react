import React from 'react'
import {Link} from 'react-router'
import logo from 'assets/images/logo.png'
class Header extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div className="header-box">
        <div className="header-container">
          <div className="header-logo">
            <Link to={{pathname:'/'}}>
              <img src={logo} />
            </Link>
          </div>
          <div className="header-center">
            <Link activeClassName="active" to={{pathname:'/'}}>首页</Link>
            {this.props.categoryList.map((item,index)=>{
              return  <Link activeClassName="active" key={index} to={{pathname:'/positionList',query:{id:item.id}}}>{item.title}</Link>
            })}
          </div>
          <div className="header-right">
            <Link  to={{pathname:'/login'}}>登录</Link>
            <Link to={{pathname:'/register'}}>注册</Link>
          </div>
        </div>
      </div>
    )
  }
}
export default Header