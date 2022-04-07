import React, { Component } from 'react'
import Footer from 'modules/frame/footer.js'
import { Container, Box, Grid } from '@mui/material';
import bgAgent from 'assets/lighterGray.png'
import bgHelpa from 'assets/lighterPink.png'


export class Landing extends Component {
  constructor(props) {
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
      <div className='banner-agent'>
        <img style={{
          width: '100%',
          height: 'auto',
        }} src={require('../../assets/agent-bg.png')}></img>
        <Grid style={{
          backgroundColor: '#E5E5E5',
          backgroundImage: `url(${bgAgent})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%'
        }} container alignItems={'center'} justifyContent={'center'}>
            <Grid item xs={5} style={{
              padding: '5%',
              textAlign: 'left'
            }}>
                <h1 className='h1-lg' style={{
                  fontSize: '80px',
                  fontWeight: 'bold',
                  color: '#34475D',
                }}>What do you need a Helpa for?</h1>
                <h3 style={{
                  color: '#34475DA3'
                }}>Do you need help with your property opens this weekend? Need more manpower to complete your inspection reports? Let KeyHelpa find the freelance help you need.</h3>
            </Grid>
            <Grid item xs={3} textAlign={'right'} padding={'5%'} direction={'column'}>
              <Grid item xs={5}>
              <h3 style={{
                  fontWeight: 'bold',
                  fontSize: '20px',
                  color: '#34475D'
                }}>Property Management Help</h3>
                <p>Open for inspections</p>
                <p>Condition Report</p>
                <p>Account</p>
              </Grid>
              <Grid item xs={5} style={{marginTop: '25px'}}>
              <h3 style={{
                  fontWeight: 'bold',
                  fontSize: '20px',
                  color: '#34475D'
                }}>Sales Assistance Help</h3>
                <p>Open for inspections</p>
                <p>Admin Support</p>
                <p>Marketing</p>
              </Grid>

            </Grid>
            <Grid item xs={3} textAlign={'center'} padding={'5%'} >
              <div style={{marginTop: '25px'}}>
                <iframe  width="300" height="250" src="https://www.youtube.com/embed/iqlH4okiQqg?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>

            <iframe width="300" height="250" src="https://www.youtube.com/embed/iqlH4okiQqg?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </Grid>
       </Grid>
       <Grid style={{
          backgroundColor: '#E5E5E5',
          backgroundImage: `url(${bgAgent})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%'
        }} container alignItems={'center'} justifyContent={'center'}>
          <Grid item xs={3} style={{
              padding: '5% 0% 5% 5%',
              textAlign: 'center'
            }}>
              <h3 style={{
                  color: '#34475DA3'
                }}>A one-off setup that includes payment details for future work engagements and is editable anytime.</h3>
              <img style={{
              width: '100%',
              height: 'auto',
            }} src={theme =='agent' ? require('../../assets/agent-web-1.png') : require('../../assets/helpa-web-1.png')}></img>
            </Grid>
            <Grid item xs={3} style={{
              padding: '0% 0% 5% 5%',
              textAlign: 'center'
            }}>
              <img style={{
              width: '100%',
              height: 'auto',
            }} src={require('../../assets/agent-web-2.png')}></img>
              <h3 style={{
                  color: '#34475DA3'
                }}>Draft and upload your job requirements then automatically receive proposals from qualified freelancers. Or, browse through profiles.</h3>
              
            </Grid>
            <Grid item xs={3} style={{
              padding: '5% 0% 0% 5%',
              textAlign: 'center'
            }}>
              <h3 style={{
                  color: '#34475DA3'
                }}>Review Helpa profiles, message in real-time, compare offers and accept what's right for you.</h3>
              <img style={{
              width: '100%',
              height: 'auto',
            }} src={require('../../assets/agent-web-3.png')}></img>
            </Grid>
            <Grid item xs={3} style={{
              padding: '0% 5% 5% 5%',
              textAlign: 'center'
            }}>
              <img style={{
              width: '100%',
              height: 'auto',
            }} src={require('../../assets/agent-web-4.png')}></img>
              <h3 style={{
                  color: '#34475DA3'
                }}>KeyHelpa's payment system releases payment once job milestones have been completed to satisfaction and authorization to release funds confirmed.</h3>
              
            </Grid>
        </Grid>

        <Footer/>
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({state: state});
// const mapDispatchToProps = (dispatch) =>{
//   const { actions } = require('reduxHandler');
//   return {
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Landing));
export default Landing