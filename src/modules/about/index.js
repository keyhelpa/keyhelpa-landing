import React, { Component } from 'react'
import './Style.css'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Footer from 'modules/generic/frames/footer.js'
import Routes from 'common/Routes'
import API from 'services/api'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import Colors from 'common/Colors'
export class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: 'agent',
      data: null,
      isLoading: false,
      content: () => {
        return (
          <div className='contentContainer' style={{
            color: "red"
          }}>
            <p>KeyHelpa originated from the question of how to improve the profitability of real estate agencies given the high cost of labour and overhead expenses, employment regulations and the competitive nature of the real estate industry.</p>
            <p>
              The founders bring to the table their knowledge of accountancy, law and real estate practice to provide agency principals with the flexibility and versatility to deal with their high-volume activities without the need to undertake expensive employment and recruitment expenses. It allows  experienced real estate personnel the flexibility to choose their working times to suit their own individual lifestyles
            </p>
          </div>
        )
      }
    }
  }
  componentDidMount() {
    const { history } = this.props
    // this.retrieve()
    if (history.location.pathname.includes('agent')) {
      this.setState({ theme: 'agent' })
    } else {
      this.setState({ theme: 'helpa' })
    }
  }

  retrieve() {
    const { user } = this.props.state
    const { aboutUs } = this.state
    let params = {
      condition: [
        {
          column: 'payload',
          clause: '=',
          value: 'about_us'
        }
      ]
    }

    API.request(Routes.payloadsRetrieve, params, response => {
      if (response.data.length > 0) {
        this.setState({ aboutUs: response.data[0] })
        console.log('response', aboutUs)

      }
    })
  }
  renderContent() {
    const { theme, content } = this.state
    const { accountType } = this.props.state;
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div style={{
          width: '100%',
        }}>
          <div
            style={{
              width: '40%',
              float: 'left'
            }}
            className="full-width-mobile">
            <h1
              style={{
                color: accountType == 'agent' ? Colors.agentText : Colors.helpaText,
                textAlign: 'center',
                marginTop: 100,
                fontSize: '13vw'
              }}
              className="hide-on-desktop"
            >About us</h1>
            <div className='imageContainer'>
              <img src={accountType === 'agent' ? require('assets/man-gray.png') : require('assets/man-pink.png')} className="image-left"></img>
            </div>
          </div>
          <div
            style={{
              width: '60%',
              float: 'left'
            }}
            className="full-width-mobile mt-mobile-25">
            <h1
              style={{
                color: accountType == 'agent' ? Colors.agentText : Colors.helpaText,
                marginTop: '10%'
              }}
              className="hide-on-mobile"
            >About us</h1>
            {
              content()
            }
          </div>
        </div>
      </div>
    )
  }
  render() {
    const { theme, isLoading, data, aboutUs } = this.state
    return (
      <div style={{
        float: 'left',
        width: '100%',
        marginTop: '10%'
      }}>
        <div>
        {
          this.renderContent()
        }
        </div>
        
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(About));