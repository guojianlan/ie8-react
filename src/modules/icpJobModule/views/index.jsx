import React from 'react'
import Header from '../components/header/header'
import Banner from '../components/banner/banner'
import Footer from '../components/footer/footer'
import {Link} from 'react-router'
import styles from './index.scss'
class Index extends React.Component{
  constructor(props){
    super(props)
    this.state={
      Data:null
    }
  }
  componentWillMount(){
    this.fetchIndexData();
  }
  fetchIndexData(){
    var that = this;
    fetch('/job/job/indexList').then(resp=>{
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
      <div>
        <Header categoryList={this.props.route.state.list}></Header>
        <Banner />
        <div className="main-box">
          {this.state.Data!=null?
            <div>
              <div className={styles['index-center-nav']}>
                <div className="reward-box">
                  <div className={styles['reward-title']}>
                    <span>悬赏职位</span>
                  </div>
                  <div className={styles['reward-list']}>
                      {this.state.Data.reward.list.map((item,index)=>{
                        return (
                          <div key={index} className={styles['reward-list-item']}>
                            <div className={styles['top']}>
                              <div className={styles['position-name']}>
                                <Link to={{pathname:'/positionItem',query:{id:item.id}}}>
                                  {item.title}
                                </Link>
                              </div>
                              <div className={styles['salary']}>{item.salary}</div>
                            </div>
                            <div className={styles['center']}>
                              <div className={styles['company-name']}>
                                <Link to="/">{item.company_name}</Link>
                              </div>
                              <div className={styles['location']}>{item.location}</div>
                            </div>
                            <div className={styles['down']}>
                              <div className={styles['down-btn']}>
                                <Link to={{pathname:'/positionItem',query:{id:item.id}}}>了解详情</Link>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              </div>
              <div className={styles['index-center-nav']}>
                <div className={styles['list-box']}>
                  {this.state.Data.index.list.map((item,index)=>{
                    return (
                      <div key={index} className={styles['list-box-container']}>
                        {item.list.map((childItem,childIndex)=>{
                          return (
                            <div key={"child"+childIndex} className={styles['list-box-container-item']}>
                              <div className={styles['list-box-item']}>
                                <div className={styles['top']}>
                                    <div className={styles['position-name']}>
                                      <Link to={{pathname:'/positionItem',query:{id:childItem.id}}}>
                                        {childItem.title}
                                      </Link>
                                    </div>
                                  <div className={styles['salary']}>{childItem.salary}</div>
                                </div>
                                <div className={styles['center']}>
                                  <div className={styles['company-name']}>
                                    <Link to={{pathname:'/positionItem',query:{id:childItem.id}}}>{childItem.company_name}</Link>
                                  </div>
                                  <div className={styles['location']}>{childItem.location}</div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          :"刷新中..."}
          <Footer></Footer>
        </div>
      </div>
    
    )
  }
}
export default Index