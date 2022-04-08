import React, { Component } from 'react'
import './Style.css'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Footer from 'modules/frame/footer.js'
import Routes from 'common/Routes'
import API from 'services/Api'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
export class About extends Component {
  constructor(props){
    super(props)
    this.state={
      theme: 'agent',
      data: null,
      isLoading: false
    }
  }
  componentDidMount() {
    const {history} = this.props
    if(history.location.pathname.includes('agent')) {
      this.setState({theme: 'agent'})
    }else{
      this.setState({theme: 'helpa'})
    }
    this.retrieve()
  }
  retrieve(){
    let params = {
      condition: [
        {
          column: 'payload',
          clause: '=',
          value: 'helpa'
        }, {
          column: 'payload',
          clause: 'or',
          value: 'agent'
        }
      ]
    }
    this.setState({isLoading: false})
    API.request(Routes.retrievePayload, params, response => {
      this.setState({isLoading: false})
      if(response.data.length > 0) {
        console.log('======', this.state.theme);
        if(this.state.theme === 'agent'){
          let agentData = response.data.filter(item => {return item.payload === 'agent'});
          console.log('========', agentData);
          if(agentData.length > 0){
            agentData[0].payload_value.about = agentData[0].payload_value.about.replace(/\n/g,"<br />");
            this.setState({data: agentData[0].payload_value.about})
          }
        }else{
          let helpaData = response.data.filter(item => {return item.payload === 'helpa'});
          if(helpaData.length > 0){
            helpaData[0].payload_value.about = helpaData[0].payload_value.about.replace(/\n/g,"<br />")
            this.setState({data: helpaData[0].payload_value.about})
          }
        }
      }
    })
  }
  renderContent(){
    const {theme, isLoading, data} = this.state
    return (
      <div className={theme === 'agent' ? 'about-banner agent' : 'about-banner helpa'}>
          {
            theme === 'agent' ? (
              <img src={require('assets/lighterGray.png')} className="image-logo"></img>
            ) : (
              <img src={require('assets/lighterPink.png')} className="image-logo"></img>
            )
          }
          <section className="flex-page content">
            <div className="column-45">
              {
                theme === 'agent' ? (
                  <img src={require('assets/man-gray.png')} className="image-left"></img>
                ) : (
                  <img src={require('assets/man-pink.png')} className="image-left"></img>
                )
              }
            </div>
            <div className="column-75 content-left">
              <h1 className={theme==='agent' ? 'agent' : 'helpa'}>About Us</h1>
              {
                !isLoading && data !== null ? (
                  <p  dangerouslySetInnerHTML={{ __html: data}}></p>
                ) : (
                  <Skeleton height={50} />
                )
              }
            </div>
          </section>
      </div>
    )
  }
  render() {
    const {theme, isLoading, data} = this.state
    return (
      <div>
        {this.renderContent()}
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({state: state});
const mapDispatchToProps = (dispatch) =>{
  const { actions } = require('reduxHandler');
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(About));