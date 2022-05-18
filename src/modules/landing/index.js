import React, { Component } from 'react'
import Footer from 'modules/generic/frames/footer.js'
import { Container, Box, Grid } from '@mui/material';
import Button from 'modules/generic/button'
import bgAgent from 'assets/lighterGray.png'
import bgHelpa from 'assets/lighterPink.png'
import './Style.css'
import API from 'services/Api'
import Routes from 'common/Routes'


export class Landing extends Component {
  constructor(props) {
    super(props)
    this.state={
      theme: 'freelance',
      data: null,
      hasFetched: false
    }
  }
  componentDidMount() {
    const {history} = this.props

    this.retrieve()
    if(history.location.pathname.includes('agent')) {
      console.log('agent')
      this.setState({theme: 'agent'})
    }else{
      console.log('helpa')
      this.setState({theme: 'helpa'})
    }
  }
  retrieve(){
    const {data} = this.state;
    let params = {
      condition:[
        {
          column: 'payload',
          clause: '=',
          value: 'agent'
        }
      ]
    }
    API.request(Routes.payloadsRetrieve, params, response => {
      if(response.data.length > 0){
        this.setState({
          ...this.state,
          data: response.data,
          hasFetched: true
        })
      }
    })
  }
  componentWillUnmount(){
    this._isFetching = false;
  }
  renderVideo(){
    const {data} = this.state;
    return(
      <div>
        {
          data.map((item, index)=> {
            if(item.payload_value.helps != null){
              <Grid style={{
                backgroundColor: '#E5E5E5',
                backgroundImage: `url(${bgAgent})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '100%'
              }} container alignItems={'center'} justifyContent={'center'} key={index}>
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
                      }}>{item.payload_value.helps.title}</h3>
                      {(item.payload_value.helps.description).map((val, index)=>{
                        <p key={index}>{val}</p>
                      })}
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
            }
            
          })
        }
     </div>
    );
    
  }
  renderFeatures(){
    const {theme} =  this.state;
    return(
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
                color: '#34475DA3',
                paddingTop: '10%'
              }}>A one-off setup that includes payment details for future work engagements and is editable anytime.</h3>
          <div style={{
            position: 'relative'
          }}>
            <img style={{
              display: 'flex',
              width: '100%',
              height: 'auto',
            }} src={theme =='agent' ? require('../../assets/agent-web-1.png') : require('../../assets/helpa-web-1.png')}></img>
            <h3 style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#34475D'
            }}>Create Agency Profile</h3>
            </div>
          </Grid>

          <Grid item xs={3} style={{
            padding: '0% 0% 5% 5%',
            textAlign: 'center'
          }}>
          <div style={{
            position: 'relative'
          }}>
            <img style={{
            width: '100%',
            height: 'auto',
          }} src={theme =='agent' ? require('../../assets/agent-web-2.png') : require('../../assets/helpa-web-2.png')}></img>
          <h3 style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#34475D'
            }}>Post a job, it's free</h3>
          </div>
            
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
          <div style={{
            position: 'relative'
          }}>
          <img style={{
            width: '100%',
            height: 'auto',
          }} src={theme =='agent' ? require('../../assets/agent-web-3.png') : require('../../assets/helpa-web-3.png')}></img>
          <h3 style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#34475D'
            }}>Choose a Helpa</h3>
          </div>
          </Grid>

          <Grid item xs={3} style={{
            padding: '0% 5% 5% 5%',
            textAlign: 'center'
          }}>
            <div style={{
              position: 'relative'
            }}>
            <img style={{
            width: '100%',
            height: 'auto',
          }} src={theme =='agent' ? require('../../assets/agent-web-4.png') : require('../../assets/helpa-web-4.png')}></img>
            <h3 style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#34475D'
            }}>Pay securely & on time</h3>
            </div>
            <h3 style={{
                color: '#34475DA3'
              }}>KeyHelpa's payment system releases payment once job milestones have been completed to satisfaction and authorization to release funds confirmed.</h3>
          </Grid>
          <Button
          title={'Get Started'}
          style={theme==='agent' ? {
          backgroundColor: '#34475D',color: 'white',
          fontSize: '24px',
          width: '10%'} : {
          backgroundColor: '#E62D7E',color: 'white',
          fontSize: '24px',
          width: '10%'}}
          ></Button>
        </Grid>
    )
  }
  renderBenefits(){
    const {theme, data} = this.state;
    return(
      <div>
        <Grid style={{
        backgroundColor: '#E5E5E5',
        backgroundImage: `url(${bgAgent})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%'
        }} container alignItems={'left'} justifyContent={'left'}>
        {
            data.map((item,index)=>{
              <div key={index}>
                <Grid item xs={6} style={{
                padding: '5%',
                textAlign: 'center'
                }}>
                  <img style={{
                  width: '80%',
                  height: 'auto',
                }} src={require('../../assets/agent-i-1.png')}></img>
                </Grid>
                <Grid item xs={6} style={{
                  padding: '5% 5% 5% 5%',
                  textAlign: 'left'
                }}>
                  <h2 style={{
                    color: ' #34475D'
                  }}>Find the right help.</h2>
                  <h2 style={{
                    color: ' #34475D'
                  }}>Right Now.</h2>
                  <p style={{
                    color: '#34475DA3',
                    fontSize: '18px'
                  }}>Quickly and easily access a pool of available and freelancers who are familiar with the real estate and property management industry, the suburbs where you need work done and the job that needs doing. Search profiles for a freelance or browse by skills, years of experience, area, service and more. Then select the type of help and price that's right for you and your agency. No more full-time wages that you don't need to pay - and more money saved.</p>
                </Grid> 
              </div>
            })
          }
        </Grid>
      </div>
    )
  }
  renderBenefitsA(){
    const {theme, data} = this.state;
    return(
      <div>
      <Grid style={{
        backgroundColor: '#E5E5E5',
        backgroundImage: `url(${bgAgent})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%'
      }} container alignItems={'left'} justifyContent={'left'}>
          <Grid item xs={6} style={{
            padding: '5%',
            textAlign: 'center'
          }}>
            <img style={{
            width: '80%',
            height: 'auto',
          }} src={require('../../assets/agent-i-1.png')}></img>
          </Grid>
          <Grid item xs={6} style={{
            padding: '5% 5% 5% 5%',
            textAlign: 'left'
          }}>
            <h2 style={{
              color: ' #34475D'
            }}>Find the right help.</h2>
            <h2 style={{
              color: ' #34475D'
            }}>Right Now.</h2>
            <p style={{
              color: '#34475DA3',
              fontSize: '18px'
            }}>Quickly and easily access a pool of available and freelancers who are familiar with the real estate and property management industry, the suburbs where you need work done and the job that needs doing. Search profiles for a freelance or browse by skills, years of experience, area, service and more. Then select the type of help and price that's right for you and your agency. No more full-time wages that you don't need to pay - and more money saved.</p>
          </Grid>
          
          
          <Grid item xs={6} style={{
            padding: '5% 5% 5% 5%',
            textAlign: 'left'
          }}>
            <h2 style={{
              color: ' #34475D'
            }}>Total Control.</h2>
            <h2 style={{
              color: ' #34475D'
            }}>Cosntant Contact.</h2>
            <p style={{
              color: '#34475DA3',
              fontSize: '18px'
            }}>Send instant messages to the person you choose as your Helpa. Once a job has been offered and accepted, you can automatically privately message one another so you’re in constant contact throughout. You’re in total control to communicate as and when you need to.</p>
          </Grid>
          <Grid item xs={6} style={{
            padding: '5%',
            textAlign: 'center'
          }}>
            <img style={{
            width: '80%',
            height: 'auto',
          }} src={require('../../assets/agent-i-2.png')}></img>
          </Grid>

          <Grid item xs={6} style={{
            padding: '5%',
            textAlign: 'center'
          }}>
            <img style={{
            width: '80%',
            height: 'auto',
          }} src={require('../../assets/agent-i-3.png')}></img>
          </Grid>
          <Grid item xs={6} style={{
            padding: '5%',
            textAlign: 'left'
          }}>
            <h2 style={{
              color: ' #34475D'
            }}>Your investment.</h2>
            <h2 style={{
              color: ' #34475D'
            }}>Protected.</h2>
            <p style={{
              color: '#34475DA3',
              fontSize: '18px'
            }}>Once your job has been accepted by a Helpa, the agreed payment is securely held by Key Helpas' payment system. Only once the job has been completed to your satisfaction, do you authorise for your Helpa's funds to be released. With the touch of a button, you can approve for a payment to be automatically distributed in the next payment run. So you can get the help you need knowing that your investment is protected.</p>
          </Grid>
            
      </Grid>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: '#E5E5E5',
        backgroundPosition: 'center',
        width: '100%',
        height: '30vh',}}>
      <Button
          title={'Get Started'}
          style={theme==='agent' ? {
          backgroundColor: '#34475D',color: 'white',
          fontSize: '24px',
          width: '10%',
          } : {
          backgroundColor: '#E62D7E',color: 'white',
          fontSize: '24px',
          width: '10%'}}
          ></Button>
      </Box>
      </div>
    )
  }
  renderBenefitsF(){
    const {theme} = this.state;
    return(
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#E5E5E5'
        }}>
        <h1 style={{
        backgroundColor: '#E5E5E5',
        marginBottom: 0
        }}>Lifestyle. Choose your days, hours. </h1>
        <h1 style={{
            color: "#E62D7E",
            backgroundColor: '#E5E5E5',
            marginBottom: 0
          }}>Be your own boss</h1>
        </div>
      
      <Grid style={{
        backgroundColor: '#E5E5E5',
        backgroundImage: `url(${bgAgent})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%'
      }} container alignItems={'left'} justifyContent={'left'}>
        
          <Grid item xs={6} style={{
            padding: '5%',
            textAlign: 'center'
          }}>
            <img style={{
            width: '80%',
            height: 'auto',
          }} src={require('../../assets/Illustration contact.png')}></img>
          </Grid>
          <Grid item xs={6} style={{
            padding: '5% 5% 5% 5%',
            textAlign: 'left'
          }}>
            <h2 style={{
              color: ' #34475D'
            }}>Total Control.</h2>
            <h2 style={{
              color: ' #34475D'
            }}>Constant Contact.</h2>
            <p style={{
              color: '#34475DA3',
              fontSize: '18px'
            }}>Send instant messages to the person you choose as your Helpa. Once a job has been offered and accepted, you can automatically privately message one another so you’re in constant contact throughout. You’re in total control to communicate as and when you need to.</p>
          </Grid>
          
          
          <Grid item xs={6} style={{
            padding: '5%',
            textAlign: 'left'
          }}>
            <h2 style={{
              color: ' #34475D'
            }}>Your investment.</h2>
            <h2 style={{
              color: ' #34475D'
            }}>Protected.</h2>
            <p style={{
              color: '#34475DA3',
              fontSize: '18px'
            }}>Once your job has been accepted by a Helpa, the agreed payment is securely held by Key Helpas' payment system. Only once the job has been completed to your satisfaction, do you authorise for your Helpa's funds to be released. With the touch of a button, you can approve for a payment to be automatically distributed in the next payment run. So you can get the help you need knowing that your investment is protected.</p>
          </Grid>
          <Grid item xs={6} style={{
            padding: '5%',
            textAlign: 'center'
          }}>
            <img style={{
            width: '80%',
            height: 'auto',
          }} src={require('../../assets/Illustration investment.png')}></img>
          </Grid>
      </Grid>
      <Grid style={{
        backgroundColor: '#E5E5E5',
        backgroundImage: `url(${bgAgent})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%'
      }} alignItems={'center'} justifyContent={'center'}>
      </Grid>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: '#E5E5E5',
        backgroundPosition: 'center',
        width: '100%',
        height: '30vh',}}>
      <Button
          title={'Get Started'}
          style={theme==='agent' ? {
          backgroundColor: '#34475D',color: 'white',
          fontSize: '24px',
          width: '10%',
          } : {
          backgroundColor: '#E62D7E',color: 'white',
          fontSize: '24px',
          width: '10%'}}
          ></Button>
      </Box>
      </div>
      
    )
  }
  renderBanner(){
    const {theme, agent, freelance} = this.state;
    return(
      <div>
        <div className={theme === 'helpa' ? 'show' : 'hidden'}>
        <img  className={theme=='helpa' ? 'Helpa' : ''}
        src={require('../../assets/Helpa.png')}></img>
        </div>
        <div className='tooltip' >
        
        <img  className={theme=='agent' ? 'agentRobyn' : ''}
        src={theme =='agent' ? require('../../assets/Robyn.png') : ''}></img>
            <div className='right'>
              <h3>{theme ==='agent' ? 'Robyn': ''}</h3>
              <p >{
              theme ==='agent' ?
              'Robyn is a licence  Real Estate Agent. She just signed four new clients who have all put their properties on the market, and she needs help at the open houses.'
              :
              ''
            }
            </p>
              <i></i>
            </div>
        
        </div>

        <div className='tooltip'>
        
        <img className={theme=='agent' ? 'agentPaul' : 'freelanceSarah'}
        src={theme =='agent' ? require('../../assets/Paul.png') : require('../../assets/Sarah.png')}></img>
            <div className='right'>
              <h3>{theme ==='agent' ? 'Paul': 'Sarah'}</h3>
              <p>{
                theme ==='agent' ?
                'Paul is a senior property manager at a busy real estate office. The agency manages properties, and he has a lot going on dealing with landlords and tenants.'
                :
                "Sarah is a mother of two, a licensed agent with years of experience; due to her family commitments, she is limited by the number of hours she can work each week. However, Sarah's lifestyle dynamics prompted her to find a new way of earning extra money and to be her own boss." 
              }</p>
              <i></i>
            </div>
        
        </div>

        <div className='tooltip'>
        
        <img  className={theme=='agent' ? 'agentTrevor' : 'freelanceAlan'}
        src={theme =='agent' ? require('../../assets/Trevor.png') : require('../../assets/Alan.png')}></img>
            <div className='right'>
              <h3>{theme ==='agent' ? 'Trevor': 'Alan'}</h3>
              <p>
              {
                theme ==='agent' ?
                "Trevor is a Strata Manager at a busy Strata Agents' office. He has a lot going on dealing with annual general meetings, building repairs, tradespeople and budgets."
                :
                "Alan turns to the KeyHelpa platform. It is free to join. He creates his unique business freelancer profile page, selects strata managers category, the days and times he is available to work, and within 2 minutes his profile is live and ready to search for work opportunities in his local area." 
              }
              </p>
              <i></i>
            </div>
        
        </div> 

        <div className='tooltip'>
        
        <img  className={theme=='agent' ? 'agentJohn' : 'freelanceLana'}
        src={theme =='agent' ? require('../../assets/JohnAgent.png') : require('../../assets/Lana.png')}></img>
            <div className='right'>
              <h3>{theme ==='agent' ? 'John': 'Lana'}</h3>
              <p>
              {
                theme ==='agent' ?
                "John is a licensed real estate agent working in a busy real estate office. John needs additional assistance with his open homes and general marketing work."
                :
                "Lana is a talented real estate agent with years of experience; due to the epidemic, she works remotely. This has changed the dynamics of her lifestyle and prompted her to find a new way of earning money and become her own boss." 
              }
              </p>
              <i></i>
            </div>
        
        </div> 

        <div className='tooltip'>
        
        <img  className={theme=='agent' ? 'Agent' : 'freelanceTracey'}
        src={theme =='agent' ? require('../../assets/Agent.png') : require('../../assets/Tracey.png')}></img>
            <div className='right'>
              <h3>{theme ==='agent' ? '': 'Tracey'}</h3>
              <p>
              {
                theme ==='agent' ?
                ""
                :
                "Tracey is a property manager at a busy real estate office. The agency manages properties, and she has a lot going on dealing with landlords and tenants. She needs additional assistance to manage the overload of work." 
              }
              </p>
              <i></i>
            </div>
        
        </div> 

        <div className='tooltip'>
        
        <img  className={theme=='helpa' ? 'freelanceJohn' : ''}
        src={theme =='helpa' ? require('../../assets/JohnHelpa.png') : ''}></img>
            <div className='right'>
              <h3>{theme =='helpa' ? 'John': ''}</h3>
              <p>
              {
                theme ==='helpa' ?
                "John is a licensed real estate agent working in a busy real estate office. John needs additional assistance with his open homes and general marketing work."
                :
                "" 
              }
              </p>
              <i></i>
            </div>
        
        </div> 
        
        
        
        <div className={theme === 'agent' ? 'btnLeft' : 'btnRight'}>
          <h1>{theme === 'agent' ? 'Freelancer' : 'Agents'}</h1>
        </div>
      </div>
    )
  }
  render() {
    const {theme, hasFetched} = this.state
    if(!hasFetched){
      return (
        <h3>Loading...</h3>
      )
    }else{
      return (
        <div className={theme === 'agent' ? ' banner-agent' : 'banner-helpa'}>
          
          {
            this.renderBanner()
          }
          {
            this.renderVideo()
          }
          {
            this.renderFeatures()
          }
          {
            theme === 'agent' ? this.renderBenefitsA() : this.renderBenefitsF()
          }
          {
            // console.log(data)
          }
          <Footer/>
        </div>
      )
    }  
  }
}

export default Landing