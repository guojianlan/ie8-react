import React from 'react'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import {Link} from 'react-router'
import utils from '../utils/index'
class Index extends React.Component{
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      mobile:'',
      password:'',
      real_name:'',
      email:''
    }
  }
  inputChange($e,key){
    var val = $e.target.value;
    this.setState({
      [key]:val
    })
  }
  submitRegister(){

    fetch('/job/site/register',{
      method:'POST',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body:utils.toQueryString(this.state)
    }).then(resp=>{
      return resp.json()
    }).then(resp=>{
      if(resp.status==0){
        alert(resp.msg)
      }
    })
  }
  render(){
    return (
      <div>
        <Header categoryList={this.props.route.state.list}></Header>
        <div className="site-main-box">
          <div className="site-main-title">用户注册</div>
          <div className="site-main-center">
            <div className="site-center-input-box">
              <div className="input-label">用户名</div>
              <input type="text" value={this.state.mobile} onChange={($event)=>{this.inputChange($event,'mobile')}} placeholder="请输入手机号码" />
            </div>
            <div className="site-center-input-box">
              <div className="input-label">密&nbsp;&nbsp;码</div>
              <input type="password" value={this.state.password}  onChange={($event)=>{this.inputChange($event,'password')}} placeholder="请输入密码" />
            </div>
            <div className="site-center-input-box">
              <div className="input-label">姓&nbsp;&nbsp;名</div>
              <input type="text" value={this.state.real_name}  onChange={($event)=>{this.inputChange($event,'real_name')}} placeholder="请输入姓名" />
            </div>
            <div className="site-center-input-box">
              <div className="input-label">邮&nbsp;&nbsp;箱</div>
              <input type="text" value={this.state.email}  onChange={($event)=>{this.inputChange($event,'email')}} placeholder="请输入邮箱" />
            </div>
            <div className="site-btn" onClick={()=>{this.submitRegister()}}>
              立即注册
            </div>
            <div className="site-btn-tips">
              已有账号？<Link to="/login">请登录</Link>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    
    )
  }
}
export default Index