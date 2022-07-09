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
import Helper from './helper'

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

              <Video
                theme={accountType}
                data={Helper.data[accountType].helps}
              />
              <Features
                theme={accountType}
                data={Helper.data[accountType].features}
              />

              <Others
                theme={accountType}
                data={Helper.data[accountType].others}
              />
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