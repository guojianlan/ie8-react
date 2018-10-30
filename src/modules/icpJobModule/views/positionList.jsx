import React from 'react'
import Header from '../components/header/header'
import Banner from '../components/banner/banner'
import Footer from '../components/footer/footer'
import styles from './positionList.scss'
import {Link} from 'react-router'
class PositionList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      Data:null,
    }
    // this.fetchPositionData();
  }
  componentWillMount(){
    console.log('componentWillMount')
  }
  componentDidMount(){
    console.log('componentDidMount')
    this.fetchPositionData();
  }
  componentDidUpdate(prevProps){
    // this.fetchPositionData();
    let oldId = prevProps.location.query.id
    let newId = this.props.location.query.id
    if(oldId!=newId){
      this.fetchPositionData();
    }
  }
  componentWillUnmount () {
    // 上面步骤四，在组件移除前忽略正在进行中的请求
    this.ignoreLastFetch = true
  }
  fetchPositionData(){
    var that = this;
    fetch('/job/job/positionList?category_id=' + this.props.location.query.id).then(resp=>{
      return resp.json()
    }).then(resp=>{
      if(!that.ignoreLastFetch){
        that.setState({
          Data:resp.data
        })
      }
    }).catch(err=>{
      alert('获取错误');
    })
  }
  render(){
    console.log('render')
    return (
      <div className="main-box">
        <Header categoryList={this.props.route.state.list}></Header>
        <Banner />
        {this.state.Data!=null?
        <div className={styles['position-container']}>
          {this.state.Data.list.map((item,index)=>{
            return (
              <div key={index} className={styles['position-list']}>
                <div className={styles['position-list-item']}>
                  <div className={styles['top']}>
                    <div className={styles['left']}>
                      <div className={styles['position-name']}>
                        <Link to={{pathname:'/positionItem',query:{id:item.id}}}>
                          {item.title}
                        </Link>
                      </div>
                    </div>
                    <div className={styles['center']}>
                      <div className={styles['salary']}>
                        {item.salary}
                      </div>
                    </div>
                    <div className={styles['right']}>
                      <div className={styles['company-name']}>
                        <Link to={{pathname:'/positionItem',query:{id:item.id}}}>{item.company_name}</Link>
                      </div>
                    </div>
                  </div>
                  <div className={styles['second']}>
                    <div className={styles['left']}>
                      <div className="location">{item.location}</div>
                    </div>
                    <div className={styles['center']}>
                      <div className="time">{item.ctime}</div>
                    </div>
                    <div className={styles['right']}>
                      <div className="department">{item.department}</div>
                    </div>
                  </div>
                  {item.tags.list && item.tags.list.length>0?
                    <div className={styles['tags']}>
                      {item.tags.list.map((item,index)=>{
                        return (
                          <div key={'tag'+index} className={styles['tag-item']}> {item}</div>
                        )
                      })}
                    </div>
                    :""}
                </div>
              </div>
            )
          })}
        </div>:'刷新中...'}
        <Footer></Footer>
      </div>
    )
  }
}
export default PositionList