import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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