import React from 'react'
import banner1 from 'assets/images/1.jpg'
import banner2 from 'assets/images/2.jpg'
class Banner extends React.Component{
  
  componentWillUnmount(){
    console.log('componentDidMount-banner')
    if (this.swiper) { // 销毁swiper
      this.swiper.destroy()
    }
  }
  componentDidMount(){
    console.log('componentDidMount-banner')
    if(this.swiper){
      this.swiper.swipeTo(0, 0)
      this.swiper.destroy()
      this.swiper = null;
    }
    this.swiper = new Swiper(this.refs['swiper-obj'], {
      autoplay : 5000,//可选选项，自动滑动
      loop : true,//可选选项，开启循环
      pagination : '.swiper-pagination',
      paginationClickable :true,
    });
  }
  render(){
    return (
      <div className="swiper-container" ref="swiper-obj" style={{height:'330px'}}>
        <div className="swiper-wrapper">
          <div className="swiper-slide banner-image-box" style={{
            "backgroundImage":"url("+banner1+")"
          }}></div>
          <div className="swiper-slide banner-image-box" style={{
            "backgroundImage":"url("+banner2+")"
          }}></div>
        </div>
        <div className="swiper-pagination"></div>
      </div>
    )
  }
}
export default Banner