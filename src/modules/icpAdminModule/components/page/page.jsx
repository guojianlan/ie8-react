import React from 'react'
import utils from '../../utils/index'
import styles from './page.scss'
import {Link} from 'react-router'
class Pages extends React.Component { 
  constructor(props){
    super(props);
  }
  render(){
    var pageSize = 10;
    let totalNum = Math.ceil(this.props.count/pageSize);
    var pageArr = utils.getInterval(this.props.currentPage,pageSize,totalNum)
    return (
      <div className={styles['page-box']}>
        {this.props.currentPage>1?<Link to={{pathname:'/',query:{type:this.props.type,page:this.props.currentPage-1}}}>&lt;</Link>:''}
        {pageArr.map((item,i)=>{
          return (
            <Link key={i} to={{pathname:'/',query:{type:this.props.type,page:item}}}>{item}</Link>
          )
        })}
        <Link to={{pathname:'/',query:{type:this.props.type,page:(pageArr[pageArr.length-1]+1)}}}>&gt;</Link>
      </div>
    )
  }
}
export default Pages