import React, { Component } from 'react'
import Footer from 'modules/generic/frames/footer.js'
import Features from 'modules/landing/features.js'
import Video from 'modules/landing/video.js'
import Others from 'modules/landing/others.js'
import Banner from 'modules/landing/banner.js'
import { Container, Box, Grid } from '@mui/material';
import Button from 'modules/generic/button'
import bgAgent from 'assets/lighterGray.png'
import bgHelpa from 'assets/lighterPink.png'
import './Style.css'
import API from 'services/api'
import Routes from 'common/Routes'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Landing extends Component {
  constructor(props) {
    super(props)
    this.state={
      theme: 'agent',
      data: null,
      hasFetched: false,
      hasHelps: false,
      hasFeatures: false,
      hasOthers: false
    }
  }
  handleStateChange = () => {
    console.log('fired')
    this.setState({})
  }
  componentDidMount() {
    const {setColor, setSelectedUser, history} = this.props
    const {data} = this.state
    if(history.location.pathname.includes('agent')) {
      console.log('agent')
      this.setState({theme: 'agent'})
      this.handleStateChange
      setColor('agent')
      setSelectedUser('agent')
    }else{
      console.log('helpa')
      this.setState({theme: 'helpa'})
      setColor('helpa')
      setSelectedUser('helpa')
      this.handleStateChange
    }
    this.retrieve()
  }
  retrieve(){
    const {history} = this.props
    let status = history.location.pathname.includes('agent') ? 'agent' : 'helpa'
    let param = {
      condition:[
        {
          column: 'payload',
          clause: '=',
          value: status
        }
      ]
    }
    API.request(Routes.payloadsRetrieve, param, response => {
      if(response.data.length > 0){
        this.setState({
          ...this.state,
          data: response.data,
          hasFetched: true
        })
        this.runChecks()
      }
    })
  }
  runChecks(){
    const {data} = this.state;
    return(
      data.map((item, index)=> {
        if(item.payload_value.helps != null || item.payload_value.helps != undefined){
          this.setState({
            ...this.state,
            hasHelps: true
          })
        }
        if(item.payload_value.features != null || item.payload_value.features != undefined){
          this.setState({
            ...this.state,
            hasFeatures: true
          })
        }
        if(item.payload_value.others != null || item.payload_value.others != undefined){
          this.setState({
            ...this.state,
            hasOthers: true
          })
        }
      })
    )
  }
  componentWillUnmount(){
    this._isFetching = false;
  }
  renderBanner(){
    const {theme} = this.state;
    const {selectedUser} = this.props.state
    return(
      <div>
        <div className={selectedUser === 'helpa' ? 'show' : 'hidden'}>
        <img  className={selectedUser=='helpa' ? 'Helpa' : ''}
        src={require('../../assets/Helpa.png')}></img>
        </div>
        <div className='tooltip' >
        
        <img  className={selectedUser=='agent' ? 'agentRobyn' : ''}
        src={selectedUser =='agent' ? require('../../assets/Robyn.png') : ''}></img>
            <div className='right'>
              <h3>{selectedUser ==='agent' ? 'Robyn': ''}</h3>
              <p >{
              selectedUser ==='agent' ?
              'Robyn is a licence  Real Estate Agent. She just signed four new clients who have all put their properties on the market, and she needs help at the open houses.'
              :
              ''
            }
            </p>
              <i></i>
            </div>
        
        </div>

        <div className='tooltip'>
        
        <img className={selectedUser=='agent' ? 'agentPaul' : 'freelanceSarah'}
        src={selectedUser =='agent' ? require('../../assets/Paul.png') : require('../../assets/Sarah.png')}></img>
            <div className='right'>
              <h3>{selectedUser ==='agent' ? 'Paul': 'Sarah'}</h3>
              <p>{
                selectedUser ==='agent' ?
                'Paul is a senior property manager at a busy real estate office. The agency manages properties, and he has a lot going on dealing with landlords and tenants.'
                :
                "Sarah is a mother of two, a licensed agent with years of experience; due to her family commitments, she is limited by the number of hours she can work each week. However, Sarah's lifestyle dynamics prompted her to find a new way of earning extra money and to be her own boss." 
              }</p>
              <i></i>
            </div>
        
        </div>

        <div className='tooltip'>
        
        <img  className={selectedUser=='agent' ? 'agentTrevor' : 'freelanceAlan'}
        src={selectedUser =='agent' ? require('../../assets/Trevor.png') : require('../../assets/Alan.png')}></img>
            <div className='right'>
              <h3>{selectedUser ==='agent' ? 'Trevor': 'Alan'}</h3>
              <p>
              {
                selectedUser ==='agent' ?
                "Trevor is a Strata Manager at a busy Strata Agents' office. He has a lot going on dealing with annual general meetings, building repairs, tradespeople and budgets."
                :
                "Alan turns to the KeyHelpa platform. It is free to join. He creates his unique business freelancer profile page, selects strata managers category, the days and times he is available to work, and within 2 minutes his profile is live and ready to search for work opportunities in his local area." 
              }
              </p>
              <i></i>
            </div>
        
        </div> 

        <div className='tooltip'>
        
        <img  className={selectedUser=='agent' ? 'agentJohn' : 'freelanceLana'}
        src={selectedUser =='agent' ? require('../../assets/JohnAgent.png') : require('../../assets/Lana.png')}></img>
            <div className='right'>
              <h3>{selectedUser ==='agent' ? 'John': 'Lana'}</h3>
              <p>
              {
                selectedUser ==='agent' ?
                "John is a licensed real estate agent working in a busy real estate office. John needs additional assistance with his open homes and general marketing work."
                :
                "Lana is a talented real estate agent with years of experience; due to the epidemic, she works remotely. This has changed the dynamics of her lifestyle and prompted her to find a new way of earning money and become her own boss." 
              }
              </p>
              <i></i>
            </div>
        
        </div> 

        <div className='tooltip'>
        
        <img  className={selectedUser=='agent' ? 'Agent' : 'freelanceTracey'}
        src={selectedUser =='agent' ? require('../../assets/Agent.png') : require('../../assets/Tracey.png')}></img>
            <div className='right'>
              <h3>{selectedUser ==='agent' ? '': 'Tracey'}</h3>
              <p>
              {
                selectedUser ==='agent' ?
                ""
                :
                "Tracey is a property manager at a busy real estate office. The agency manages properties, and she has a lot going on dealing with landlords and tenants. She needs additional assistance to manage the overload of work." 
              }
              </p>
              <i></i>
            </div>
        
        </div> 

        <div className='tooltip'>
        
        <img  className={selectedUser=='helpa' ? 'freelanceJohn' : ''}
        src={selectedUser =='helpa' ? require('../../assets/JohnHelpa.png') : ''}></img>
            <div className='right'>
              <h3>{selectedUser =='helpa' ? 'John': ''}</h3>
              <p>
              {
                selectedUser ==='helpa' ?
                "John is a licensed real estate agent working in a busy real estate office. John needs additional assistance with his open homes and general marketing work."
                :
                "" 
              }
              </p>
              <i></i>
            </div>
        
        </div> 
        
        
        
        <div className={selectedUser === 'agent' ? 'btnLeft' : 'btnRight'}>
          <h1>{selectedUser === 'agent' ? 'Freelancer' : 'Agents'}</h1>
        </div>
      </div>
    )
  }
  render() {
    const {theme, hasFetched, hasFeatures, hasHelps, hasOthers, data} = this.state
    const {selectedUser} = this.props.state;
    console.log('KKKKKKKKKKKKKKKK', this.props.state);
    if(!hasFetched){
      return (
        <h3 style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>Loading...</h3>
      )
    }else{
        return (
          <div>
                <div className={selectedUser === 'agent' ? ' banner-agent' : 'banner-helpa'}>
                
                {
                  <Banner 
                  theme={selectedUser}
                  />
                }
                {
                  hasHelps ? 
                  <Video
                  theme={selectedUser}
                  data={data}
                  />
                  :
                  ""
                }
                {
                  hasFeatures ? 
                  <Features 
                  theme={selectedUser}
                  data={data}
                  /> 
                  : 
                  ""
                }
                {
                  hasOthers ? 
                  <Others
                  theme={selectedUser}
                  data={data}
                  />
                  :
                  ""
                }
                {/* <Footer/> */}
              </div>
            </div>
        )
    }  
  }
}

const mapStateToProps = (state) => ({state: state});
const mapDispatchToProps = (dispatch) =>{
  const { actions } = require('reduxhandler');
  return {
    setColor: (type) => dispatch(actions.setColor(type)),
    setSelectedUser: (user) => {dispatch(actions.setSelectedUser(user))},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Landing))