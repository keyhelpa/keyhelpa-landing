import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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