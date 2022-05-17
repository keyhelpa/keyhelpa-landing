import React, { Component } from 'react'
import './Style.css'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Footer from 'modules/generic/frames/footer.js'
import Routes from 'common/Routes'
import API from 'services/Api'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
export class About extends Component {
  constructor(props){
    super(props)
    this.state={
      theme: 'agent',
      
      data: null,
      isLoading: false,
      aboutUs: null
    }
  }
  componentDidMount() {
    const {history} = this.props
    this.retrieve()
    if(history.location.pathname.includes('agent')) {
      this.setState({theme: 'agent'})
    }else{
      this.setState({theme: 'helpa'})
    }
  }

  retrieve(){
    const {user} = this.props.state
    let params = {
      condition:[
        {
          column: 'payload',
          clause: '=',
          value: 'about_us'
        }
      ]
    }

    API.request(Routes.payloadsRetrieve, params, response => {
      if(response.data.length > 0){
        this.setState({aboutUs: response.data[0]})
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
                this.state.aboutUs !== null && (
                  <p dangerouslySetInnerHTML={{__html: this.state.aboutUs?.payload_value}}></p>
                )
              }
            </div>
          </section>
      </div>
    )
  }
  render() {
    const {theme, isLoading, data, aboutUs} = this.state
    return (
      <div>
        {
          this.renderContent()
        }
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({state: state});
const mapDispatchToProps = (dispatch) =>{
  const { actions } = require('reduxhandler');
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(About));