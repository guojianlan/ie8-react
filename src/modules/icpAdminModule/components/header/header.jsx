import React from 'react'
import {Link} from 'react-router'
import styles from './header.scss'
class Header extends React.Component{
  constructor(props){
    super(props)
  }
  logout(){
    fetch('/admin/site/logout').then(resp=>{
      return resp.json()
    }).then(resp=>{
      if(resp.status==1){
        window.location.href="/"
      }
    })
  }
  render(){
    return (
      <div className={styles['header']}>
        <div className={styles['header-left']}>审计系统</div>
        <div className={styles['header-right']} onClick={()=>{this.logout()}}>退出</div>
      </div>
    )
  }
}
export default Header