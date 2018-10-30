import React from 'react'
import Header from '../components/header/header'
import NavLeft from '../components/nav/nav'
import Pages from '../components/page/page'
import styles from './index.scss'
import utils from '../utils/index'
import {Link} from 'react-router'
class SensitiveWordListTable extends React.Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    console.log(this.props)
  }
  render(){
    return (
      <div className="table-box">
        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>序号</th>
                <th>敏感词</th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.list.map((item,i)=>{
                return (<tr key={i}>
                <th>{item.id}</th>
                <td >{item.content}</td>
              </tr>)
              })}
            </tbody>
          </table>
        </div>
        {this.props.data.count<=10?"":<Pages type={this.props.type} currentPage={this.props.data.page} count={this.props.data.count} />
        }
      </div>
    )
  }
}
class LogAccessListTable extends React.Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    console.log(this.props.data)
  }
  render(){
    return (
      <div className="table-box">
        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>序号</th>
                <th>用户名</th>
                <th>访问url</th>
                <th>Ip</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.list.map((item,i)=>{
                return (<tr>
                <th>{item.id}</th>
                <td >{item.user_name}</td>
                <td >{item.url}</td>
                <td >{item.ip}</td>
                <td >{item.ctime}</td>
              </tr>)
              })}
            </tbody>
          </table>
        </div>
        {this.props.data.count<=10?"":<Pages type={this.props.type} currentPage={this.props.data.page} count={this.props.data.count} />
        }
      </div>
    )
  }
}
class LogLoginListTable extends React.Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    console.log(this.props.data)
  }
  render(){
    return (
      <div className="table-box">
        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>序号</th>
                <th>用户名</th>
                <th>Ip</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.list.map((item,i)=>{
                return (<tr>
                <th>{item.id}</th>
                <td >{item.user_name}</td>
                <td >{item.ip}</td>
                <td >{item.ctime}</td>
              </tr>)
              })}
            </tbody>
          </table>
        </div>
        {this.props.data.count<=10?"":<Pages type={this.props.type} currentPage={this.props.data.page} count={this.props.data.count} />
        }
      </div>
    )
  }
}
class Index extends React.Component{
  constructor(props){
    super(props);
    
    this.state={
      Data:null,
      type:utils.getQueryString('type') ? utils.getQueryString('type'):'sensitiveWordList'
    }
  }
  componentWillMount(){
    console.log('componentWillMount')
  }
  componentDidMount(){
    console.log('componentDidMount')
    this.fetchData();
  }
  componentDidUpdate(prevProps){
    // this.fetchPositionData();
    let oldId = prevProps.location.query.type
    let newId = this.props.location.query.type
    let oldPage = prevProps.location.query.page
    let newPage = this.props.location.query.page
    if(oldId!=newId || oldPage!=newPage){
      this.fetchData();
    }
  }
  componentWillUnmount () {
    // 上面步骤四，在组件移除前忽略正在进行中的请求
    this.ignoreLastFetch = true
  }
  fetchData(){
    var that = this;
    fetch('/admin/system/' + (this.props.location.query.type || 'sensitiveWordList')+"?page="+(this.props.location.query.page || '1')).then(resp=>{
      return resp.json()
    }).then(resp=>{
      if(!that.ignoreLastFetch){
        that.setState({
          Data:resp.data,
          type:(this.props.location.query.type || 'sensitiveWordList')
        })
      }
    }).catch(err=>{
      alert('获取错误');
    })
  }
  render(){
    return (
      <div className={styles['icp-admin-box']}>
        <Header></Header>
        <div className={styles['container']}>
          <NavLeft type={this.state.type} />
          <div className={styles['container-right']}>
            <div className={styles['container-right-box']}>
              {this.state.Data?(this.state.type=='sensitiveWordList'?<SensitiveWordListTable type={this.state.type} data={this.state.Data} />:(this.state.type=='logAccessList'?<LogAccessListTable type={this.state.type} data={this.state.Data} />:(this.state.type=='logLoginList'?<LogLoginListTable type={this.state.type} data={this.state.Data} />:""))):<div className={styles['loading']}>刷新中...</div>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Index