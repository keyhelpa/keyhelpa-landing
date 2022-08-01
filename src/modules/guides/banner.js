import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Banner from './banner'
class Guide extends Component{
    constructor(props) {
        super(props)
    }

    render(){
        return(
            <div style={{
                width: '100%',
                float: 'left'
            }}>
                <Banner />

            </div>
        )
    }
}
const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => {
  const { actions } = require('reduxhandler');
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Guide));