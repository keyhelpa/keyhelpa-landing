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
import Loading from 'components/increment/generic/loading/spinner.js'
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
    const {history} = this.props
    const {data} = this.state
    if(history.location.pathname.includes('agent')) {
      console.log('agent')
      this.setState({theme: 'agent'})
      this.handleStateChange
    }else{
      console.log('helpa')
      this.setState({theme: 'helpa'})
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
    return(
      <div>
        <div className={theme === 'helpa' ? 'show' : 'hidden'}>
        <img  className={theme=='helpa' ? 'Helpa' : ''}
        src={require('../../assets/Helpa.png')}></img>
        </div>
        <div className='tooltip' >
        
        <img  className={theme=='agent' ? 'agentRobyn' : ''}
        src={theme =='agent' ? require('../../assets/Robyn.png') : ''}></img>
            <div className='right'>
              <h3>{theme ==='agent' ? 'Robyn': ''}</h3>
              <p >{
              theme ==='agent' ?
              'Robyn is a licence  Real Estate Agent. She just signed four new clients who have all put their properties on the market, and she needs help at the open houses.'
              :
              ''
            }
            </p>
              <i></i>
            </div>
        
        </div>

        <div className='tooltip'>
        
        <img className={theme=='agent' ? 'agentPaul' : 'freelanceSarah'}
        src={theme =='agent' ? require('../../assets/Paul.png') : require('../../assets/Sarah.png')}></img>
            <div className='right'>
              <h3>{theme ==='agent' ? 'Paul': 'Sarah'}</h3>
              <p>{
                theme ==='agent' ?
                'Paul is a senior property manager at a busy real estate office. The agency manages properties, and he has a lot going on dealing with landlords and tenants.'
                :
                "Sarah is a mother of two, a licensed agent with years of experience; due to her family commitments, she is limited by the number of hours she can work each week. However, Sarah's lifestyle dynamics prompted her to find a new way of earning extra money and to be her own boss." 
              }</p>
              <i></i>
            </div>
        
        </div>

        <div className='tooltip'>
        
        <img  className={theme=='agent' ? 'agentTrevor' : 'freelanceAlan'}
        src={theme =='agent' ? require('../../assets/Trevor.png') : require('../../assets/Alan.png')}></img>
            <div className='right'>
              <h3>{theme ==='agent' ? 'Trevor': 'Alan'}</h3>
              <p>
              {
                theme ==='agent' ?
                "Trevor is a Strata Manager at a busy Strata Agents' office. He has a lot going on dealing with annual general meetings, building repairs, tradespeople and budgets."
                :
                "Alan turns to the KeyHelpa platform. It is free to join. He creates his unique business freelancer profile page, selects strata managers category, the days and times he is available to work, and within 2 minutes his profile is live and ready to search for work opportunities in his local area." 
              }
              </p>
              <i></i>
            </div>
        
        </div> 

        <div className='tooltip'>
        
        <img  className={theme=='agent' ? 'agentJohn' : 'freelanceLana'}
        src={theme =='agent' ? require('../../assets/JohnAgent.png') : require('../../assets/Lana.png')}></img>
            <div className='right'>
              <h3>{theme ==='agent' ? 'John': 'Lana'}</h3>
              <p>
              {
                theme ==='agent' ?
                "John is a licensed real estate agent working in a busy real estate office. John needs additional assistance with his open homes and general marketing work."
                :
                "Lana is a talented real estate agent with years of experience; due to the epidemic, she works remotely. This has changed the dynamics of her lifestyle and prompted her to find a new way of earning money and become her own boss." 
              }
              </p>
              <i></i>
            </div>
        
        </div> 

        <div className='tooltip'>
        
        <img  className={theme=='agent' ? 'Agent' : 'freelanceTracey'}
        src={theme =='agent' ? require('../../assets/Agent.png') : require('../../assets/Tracey.png')}></img>
            <div className='right'>
              <h3>{theme ==='agent' ? '': 'Tracey'}</h3>
              <p>
              {
                theme ==='agent' ?
                ""
                :
                "Tracey is a property manager at a busy real estate office. The agency manages properties, and she has a lot going on dealing with landlords and tenants. She needs additional assistance to manage the overload of work." 
              }
              </p>
              <i></i>
            </div>
        
        </div> 

        <div className='tooltip'>
        
        <img  className={theme=='helpa' ? 'freelanceJohn' : ''}
        src={theme =='helpa' ? require('../../assets/JohnHelpa.png') : ''}></img>
            <div className='right'>
              <h3>{theme =='helpa' ? 'John': ''}</h3>
              <p>
              {
                theme ==='helpa' ?
                "John is a licensed real estate agent working in a busy real estate office. John needs additional assistance with his open homes and general marketing work."
                :
                "" 
              }
              </p>
              <i></i>
            </div>
        
        </div> 
        
        
        
        <div className={theme === 'agent' ? 'btnLeft' : 'btnRight'}>
          <h1>{theme === 'agent' ? 'Freelancer' : 'Agents'}</h1>
        </div>
      </div>
    )
  }
  render() {
    const {theme, hasFetched, hasFeatures, hasHelps, hasOthers, data} = this.state
    console.log('KKKKKKKKKKKKKKKK', this.props.state);
    if(!hasFetched){
      return (
        
        <Loading></Loading>
      )
    }else{
        return (
          <div>
                <div className={theme === 'agent' ? ' banner-agent' : 'banner-helpa'}>
                
                {
                  <Banner 
                  theme={theme}
                  />
                }
                {
                  hasHelps ? 
                  <Video
                  theme={theme}
                  data={data}
                  />
                  :
                  ""
                }
                {
                  hasFeatures ? 
                  <Features 
                  theme={theme}
                  data={data}
                  /> 
                  : 
                  ""
                }
                {
                  hasOthers ? 
                  <Others
                  theme={theme}
                  data={data}
                  />
                  :
                  ""
                }
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
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Landing))