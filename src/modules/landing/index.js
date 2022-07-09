import React, { Component } from 'react'
import Features from 'modules/landing/features.js'
import Video from 'modules/landing/video.js'
import Others from 'modules/landing/others.js'
import Banner from 'modules/landing/banner.js'
import { Container, Box, Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import './Style.css'
import API from 'services/api'
import Routes from 'common/Routes'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Color } from 'common'
import {agent, helpa} from './data'

class Landing extends Component {
  constructor(props) {
    super(props)
    this.state={
      theme: 'agent',
      data: [],
      isLoading: false,
      hasHelps: false,
      hasFeatures: false,
      hasOthers: false,
      othersData: [],
      featuresData: [],
      accountType: null
    }
  }

  componentDidMount() {
    const {setColor, setSelectedUser, history} = this.props
    const {data} = this.state
    this.setState({
      accountType: history.location.pathname.includes('agent') ? 'agent' : 'helpa'
    })
    setColor(history.location.pathname.includes('agent') ? 'agent' : 'helpa')
    setSelectedUser(history.location.pathname.includes('agent') ? 'agent' : 'helpa')
  }
  
  render() {
    const {theme, isLoading, hasFeatures, hasHelps, hasOthers, data, featuresData, othersData} = this.state
    
    return (
      <div>
        
        {
          isLoading && data.length <= 0 && (
            <Box sx={{
              margin: 0,
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)'
            }}>
              <CircularProgress style={{color: Color.helpaDarkPink}}/>
            </Box>
          )
        } 
        {
          accountType != null && (
            <div className={selectedUser === 'agent' ? ' banner-agent' : 'banner-helpa'}>
                {
                  <Banner 
                    {...this.props}
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
                  featuresData.length > 0 ? 
                  <Features 
                  theme={selectedUser}
                  data={featuresData}
                  /> 
                  : 
                  ""
                }
                {
                  othersData.length > 0 ? 
                  <Others
                  theme={selectedUser}
                  data={othersData}
                  />
                  :
                  ""
                }
            </div>
          )
        }
      </div>
    )
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