import { Box, Container } from '@mui/material'
import React, { Component } from 'react'
import './Style.css'

class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state={
      showLeft: false,
      showRight: false,
      startAlt: false,
    }
  }
  renderLeft(){
    return(
      <Box sx={{  height: '100vh', bgColor: '#cfe8fc' }}>
        <h1>left</h1>
      </Box>
    )
  }
  renderRight(){
    return(
      <Box sx={{  height: '100vh', bgColor: '#cfe8fc' }}>
        <h1>right</h1>
      </Box>
    )
  }
  handleClick(event){
    let elem = document.getElementById('first')
    let coord = elem.getBoundingClientRect()
    let inWidth = coord.width
    let temp = event.screenX - coord.left
    this.setState({startAlt: true})
    if(this.state.startAlt === false){
      if(inWidth/2 > temp){
        this.setState({showLeft: true, showRight: false})
      }else{
        this.setState({showLeft: false, showRight: true})
      }
    }
  }

  async handleSelect(select){
    if(select === 'agent'){
      await this.setState({showLeft: true, showRight: false})
    }else{
      await this.setState({showLeft: false, showRight: true})
    }
  }

  render() {
    const { showLeft, showRight, startAlt } = this.state
    console.log(showLeft, showRight);
    return (
      <div id="container" onClick={(event) => this.handleClick(event)}>
        <div className={`${!showLeft && !showRight ? 'container' : showLeft ? 'leftBg' : 'rightBg'}`}>
          <img src={require('../../assets/landing_banner.png')} className={`landing-image ${showLeft || showRight ? 'hide' : ''}`} id="first"></img>
          {
            startAlt && (
              <div style={{display: 'flex'}}>
                {
                  showRight && (
                  <div className="textLeft" onClick={() => this.handleSelect('agent')}>
                    <h1>AGENT</h1>
                  </div>
                  )
                }
                <div style={{width: '95%'}}>
                  <img src={require('../../assets/image_gray.png')} className={`landing-image ${ showRight ? 'hide' : 'display'}`} id="gray"></img>
                  <img src={require('../../assets/image_pink.png')} className={`landing-image ${showLeft ? 'hide' : 'display'}`} id="pink"></img>
                </div>
                {
                  showLeft && (
                  <div className="textRight" onClick={() => this.handleSelect('helpa')}>
                    <h1>HELPA</h1>
                  </div>
                  )
                }
              </div>
            )
          }
          {/* <div className="container-50 left">{this.renderLeft()}</div>
          <div className="container-50 right">{this.renderRight()}</div> */}
        </div>
      </div>
    )
  }
}

export default Homepage