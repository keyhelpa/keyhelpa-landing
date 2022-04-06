import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

export class Contacts extends Component {
  constructor(props) {
    super(props)
  }
  renderContent(){
    const {selectedUser} = this.props.state
    return (
      <div className={selectedUser === 'agent' ? 'about-banner agent' : 'about-banner helpa'}>

      </div>
    )
  }
  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({state: state})

const mapDispatchToProps = (dispatch) =>{
  const { actions } = require('reduxHandler');
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Contacts))