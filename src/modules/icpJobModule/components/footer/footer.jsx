import React from 'react'
class Footer extends React.Component{
  constructor(props){
    super(props)
    this.state
  }
  render(){
    return (
     <div className="footer-main">
      <div className="beian">
        <span>Copyright © {new Date().getFullYear()} 来学LikeShare（
          <a href="http://www.miibeian.gov.cn/" target="_blank">粤ICP备14076343号</a>）</span>
        </div>
     </div>
    )
  }
}
export default Footer