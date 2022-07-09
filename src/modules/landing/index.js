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
import Helper from './helper'
import Colors from 'common/Colors'
import AgentLogoBackground from 'assets/lighterGray.png'
import HelpaLogoBackground from 'assets/lighterPink.png'

class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: 'agent',
      accountType: null
    }
  }

  componentDidMount() {
    const { setColor, setSelectedUser, history } = this.props
    let user = history.location.pathname.includes('agent') ? 'agent' : 'helpa'
    this.setState({
      accountType: user
    })
    setColor(user)
    setSelectedUser(user)
  }

  render() {
    const { accountType } = this.state

    return (
      <div>
        {
          accountType != null && (
            <div className={accountType === 'agent' ? ' banner-agent' : 'banner-helpa'}>
              
              {
                <Banner
                  {...this.props}
                  theme={accountType}
                />
              }
              <div style={{
                width: '100%',
                float: 'left',
                paddingLeft: '5%',
                paddingRight: '5%',
                background: accountType == 'agent' ? Colors.agentBackgroundColor : Colors.helpeBackgroundColor
              }}>

              <div style={{
                backgroundImage: `url(${accountType == 'agent' ? AgentLogoBackground : HelpaLogoBackground})`,
                backgroundPosition: 'center',
                backgroundSize: 'auto 60%',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                float: 'left'
              }}>
              <Video
                theme={accountType}
                data={Helper.data[accountType].helps}
              />
              </div>
              <Features
                theme={accountType}
                data={Helper.data[accountType].features}
              />

              <Others
                theme={accountType}
                data={Helper.data[accountType].others}
              />
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => {
  const { actions } = require('reduxhandler');
  return {
    setColor: (type) => dispatch(actions.setColor(type)),
    setSelectedUser: (user) => { dispatch(actions.setSelectedUser(user)) },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Landing))