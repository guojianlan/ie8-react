
import React from 'react'
import styles from './nav.scss'
import {Link} from 'react-router'
class NavLeft extends React.Component {
  constructor(props){
    super(props)
    this.list_href=[
      {
        type:"",
        name:"敏感词"
      },
      {
        type:"logAccessList",
        name:"访问日志"
      },
      {
        type:"logLoginList",
        name:"登录日志"
      }
    ]
  }
  render(){
    return (
      <div className={styles['container-left']}>
        <ul>
          {this.list_href.map((item,i)=>{
            return (
              <li key={i}>
                {item.type==''?<Link exact activeClassName={this.props.type=='sensitiveWordList'?styles['active']:''} to={{pathname:'/'}}>{item.name}</Link>:<Link activeClassName={styles['active']} to={{pathname:'/',query:{type:item.type}}}>{item.name}</Link>}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
export default NavLeft