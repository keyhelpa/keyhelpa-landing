import React, { Component } from 'react'
import './Style.css'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
export class About extends Component {
  constructor(props){
    super(props)
    this.state={
      theme: 'agent'
    }
  }
  componentDidMount() {
    const {history} = this.props
    if(history.location.pathname.includes('agent')) {
      this.setState({theme: 'agent'})
    }else{
      this.setState({theme: 'helpa'})
    }
  }
  render() {
    const {theme} = this.state
    return (
      <div className={theme === 'agent' ? 'about-banner agent' : 'about-banner helpa'}>
          <img src={require('assets/logo_icon.png')} className="image-logo"></img>
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
              <p>KeyHelpa originated from the question of how to improve the
              profitability of real estate agencies given the high cost of labour
              and overhead expenses, employment regulations and the
              competitive nature of the real estate industry.<br/><br/>
              The founders bring to the table their knowledge of accountancy,
              law and real estate practice to provide agency principals with the
              flexibility and versatility to deal with their high-volume activities
              without the need to undertake expensive employment and
              recruitment expenses. It allows  experienced real estate
              personnel the flexibility to choose their working times to suit
              their own individual lifestyles.</p>
            </div>
          </section>
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