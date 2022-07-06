import React, { Component } from 'react'
import './Style.css'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Footer from 'modules/generic/frames/footer.js'
import Routes from 'common/Routes'
import API from 'services/api'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
export class About extends Component {
  constructor(props){
    super(props)
    this.state={
      theme: 'agent',
      data: null,
      isLoading: false,
      aboutUs:{
        payload_value:  `<p>KeyHelpa originated from the question of how to improve the profitability of real estate agencies given the high cost of labour and overhead expenses, employment regulations and the competitive nature of the real estate industry.</p><br/>
        <p>The founders bring to the table their knowledge of accountancy, law and real estate practice to provide agency principals with the flexibility and versatility to deal with their high-volume activities without the need to undertake expensive employment and recruitment expenses. It allows  experienced real estate personnel the flexibility to choose their working times to suit their own individual lifestyles.</p>`
      }
    }
  }
  componentDidMount() {
    const {history} = this.props
    // this.retrieve()
    if(history.location.pathname.includes('agent')) {
      this.setState({theme: 'agent'})
    }else{
      this.setState({theme: 'helpa'})
    }
  }

  retrieve(){
    const {user} = this.props.state
    const {aboutUs} = this.state
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
        console.log('response', aboutUs)

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