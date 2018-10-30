import React from 'react'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import styles from './positionItem.scss'
import {Link} from 'react-router'
import utils from '../utils/index'
class PositionItem extends React.Component{
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
    fetch('/job/job/positionItem?id=' + this.props.location.query.id).then(resp=>{
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
    return (
      <div className="main-box">
        <Header categoryList={this.props.route.state.list}></Header>
        {this.state.Data!=null?
          <div className={styles['position-item-container']}>
            <div className={styles['top-main']}>
              <div className={styles['top']}>
                <div className={styles['position-name']}>{this.state.Data.title}</div>
                <div className={styles['salary']}>{this.state.Data.salary}</div>
                <div className={styles['top-btn']}>
                  <Link to="/login">投递简历</Link>
                </div>
                <div className={styles['top-center']}>
                  <div className={styles['center-container-list']}>
                    <div className={styles['center-container-item']}>
                      <div className={styles['center-container-item-box']}>
                        <div className={styles['item-label']}>招聘部门</div>
                        <div className={styles['item-value']}>{this.state.Data.department}</div>
                      </div>
                    </div>
                    <div className={styles['center-container-item']}>
                      <div className={styles['center-container-item-box']}>
                        <div className={styles['item-label']}>招聘人数</div>
                        <div className={styles['item-value']}>{this.state.Data.num_requirement}</div>
                      </div>
                    </div>
                    <div className={styles['center-container-item']}>
                      <div className={styles['center-container-item-box']}>
                        <div className={styles['item-label']}>学历要求</div>
                        <div className={styles['item-value']}>{this.state.Data.edu_requirement}</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles['center-container-list']}>
                    <div className={styles['center-container-item']}>
                      <div className={styles['center-container-item-box']}>
                        <div className={styles['item-label']}>工作经验</div>
                        <div className={styles['item-value']}>{this.state.Data.work_experience}</div>
                      </div>
                    </div>
                    <div className={styles['center-container-item']}>
                      <div className={styles['center-container-item-box']}>
                        <div className={styles['item-label']}>性别要求</div>
                        <div className={styles['item-value']}>{this.state.Data.gender_requirement}</div>
                      </div>
                    </div>
                    <div className={styles['center-container-item']}>
                      <div className={styles['center-container-item-box']}>
                        <div className={styles['item-label']}>年龄要求</div>
                        <div className={styles['item-value']}>{this.state.Data.age_requirement}</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles['center-container-city']}>
                      <div className={styles['item-label']}>详细地址</div>
                      <div className={styles['item-value']}>{this.state.Data.address}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles['middle-box']}>
              <div className={styles['middle-box-title']}>
                职位简介
              </div>
              <div className={styles['middle-box-introduction']}>
                <div dangerouslySetInnerHTML={{__html:utils.rawhtml(this.state.Data.introduction)}}></div>
              </div>
            </div>
          </div>
          :"刷新中..."}
          <Footer></Footer>
      </div>
    )
  }
}
export default PositionItem;