import React from 'react'
import styles from './login.scss'
import utils from '../utils/index'
class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:''
    }
  }
  handleChange(e,key){
    this.setState({
      [key]:e.target.value
    })
  }
  login(){
    fetch('/admin/site/login',{
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
      }else{
        // window.location.href="/";
        window.location.reload();
      }
    })
  }
  render(){
    return (
      <div className={styles['login-main']}>
        <div className={styles['container']}>
          <div className={styles['input-box']}>
            <div className={styles['input-label']}>用户名</div>
            <input value={this.state.username} onChange={($event)=>{this.handleChange($event,'username')}}/>
          </div>
          <div className={styles['input-box']}>
          <div className={styles['input-label']}>密码</div>
            <input value={this.state.password} type="password" onChange={($event)=>{this.handleChange($event,'password')}}/>
          </div>
          <div className={styles['btn-box']} onClick={()=>{this.login()}}>
            登录
          </div>
        </div>
      </div>
    )
  }
}
export default Login