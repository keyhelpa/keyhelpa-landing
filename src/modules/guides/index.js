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

class Guide extends Component{
    constructor(props) {
        super(props)
        this.state = {
            theme: 'agent'
        }
    }
    componentDidMount(){

    }
    render(){
        const {theme} = this.state
    }
}
const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => {
  const { actions } = require('reduxhandler');
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Guide));