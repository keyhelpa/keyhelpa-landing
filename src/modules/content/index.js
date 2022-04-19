import { Box, Container } from '@mui/material'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helper } from 'common'
import './Style.css'

class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state={
      showLeft: false,
      agent: false,
      showRight: false,
      startAlt: false,
    }
  }
  async componentDidMount() {
    if(this.props !== undefined) {
      const {selectedUser} = this.props.state
      console.log('>>>>', selectedUser);
      if(selectedUser == null){
        this.setState({
          showLeft: false,
          showRight: false,
          agent: false,
          startAlt: false,
        })
      }
    }
    let userType = await localStorage.getItem('user_type');
    if(userType){
      this.setState({startAlt: true})
      await this.handleSelect(userType)
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
    const {setSelectedUser, setRightMenu} = this.props;
    let elem = document.getElementById('first')
    let coord = elem.getBoundingClientRect()
    let inWidth = coord.width
    let temp = event.screenX - coord.left
    this.setState({startAlt: true})
    if(this.state.startAlt === false){
      if(inWidth/2 > temp){
        setSelectedUser('agent')
        localStorage.setItem('user_type', 'agent')
        this.setState({showLeft: true, showRight: false})
      }else{
        setSelectedUser('helpa')
        localStorage.setItem('user_type', 'helpa')
        this.setState({showLeft: false, showRight: true})
      }
      setRightMenu()
    }
  }

  async handleSelect(select){
    const {setSelectedUser, setRightMenu} = this.props;
    if(select === 'agent'){
      setSelectedUser('agent')
      localStorage.setItem('user_type', 'agent')
      await this.setState({showLeft: true, showRight: false, agent: true})
    }else{
      setSelectedUser('helpa')
      localStorage.setItem('user_type', 'helpa')
      await this.setState({showLeft: false, showRight: true, agent: true})
    }
    setRightMenu()
  }

  render() {
    const { showLeft, showRight, startAlt } = this.state
    console.log(showLeft, showRight);
    return (
      <div id="container" onClick={(event) => this.handleClick(event)}>
        <div className={`${!showLeft && !showRight ? 'containers' : showLeft ? 'leftBg' : 'rightBg'}`}>
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

const mapStateToProps = (state) => ({state: state});
const mapDispatchToProps = (dispatch) =>{
  const { actions } = require('reduxhandler');
  return {
    setSelectedUser: (user) => {dispatch(actions.setSelectedUser(user))},
    setRightMenu: () => dispatch(actions.setRightMenu())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Homepage));