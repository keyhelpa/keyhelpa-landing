import React, { Component } from 'react'
import Footer from 'modules/generic/frames/footer.js'
import { Container, Box, Grid } from '@mui/material';
import Button from 'modules/generic/button'
import bgAgent from 'assets/lighterGray.png'
import bgHelpa from 'assets/lighterPink.png'
import './Style.css'
import API from 'services/api'
import Routes from 'common/Routes'

export class Features extends Component {
    constructor(props) {
      super(props)
      this.state={
        theme: this.props.theme,
        data: this.props.data,
        features: [],
        hasFetched: false
      }
    }
    render(){
        const {theme, data, features} =  this.state;
    {
      if(features.length === 0){
      data.map((item, index) => {
          if(item.payload_value.features != null || item.payload_value.features != undefined){
            features.push(item.payload_value.features)
          }
        })
      }
    }
    if(features.length > 0){
      return(
        <div>
          {/* Web */}
          <div className='web'>
          <Grid className='gridBg' style={
            theme == 'agent' ? {backgroundImage: `url(${bgAgent})`, backgroundColor: '#F1F5FB'} : {backgroundImage: `url(${bgHelpa})`, backgroundColor: '#FFFAFC'}
        } container alignItems={'center'} justifyContent={'center'}>
            {
              features.map((item, index) => {
                // console.log('features', item);
                if(index != 3){
                  // circle with arrows
                  if(index % 2 === 0){
                    return(
                      // pointing up
                        <Grid item xs={3} style={{
                          padding: '5% 0% 5% 5%',
                          textAlign: 'center'
                        }}>

                        <h3 style={{
                              color: '#34475DA3',
                              paddingTop: '10%'
                            }}>{item.description}</h3>
                        <div style={{
                          position: 'relative'
                        }}>
                          <img style={{
                            display: 'flex',
                            width: '100%',
                            height: 'auto',
                          }} src={theme =='agent' ? require('../../assets/uniform_images/agent-circle.png') : require('../../assets/uniform_images/helpa-circle.png')}></img>
                          <h3 style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: '#34475D'
                          }}>{item.title}</h3>
                          </div>
                        </Grid>
                    );
                  }else{
                    // pointing down
                    return(
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
                      }} src={theme =='agent' ? require('../../assets/uniform_images/agent-circle-1.png') : require('../../assets/uniform_images/helpa-circle-1.png')}></img>
                      <h3 style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                          color: '#34475D'
                        }}>{item.title}</h3>
                      </div>
                        
                        <h3 style={{
                            color: '#34475DA3'
                          }}>{item.description}</h3>
                        
                      </Grid>
                    )
                  }
                }else{
                  return(
                    // last circle
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
                    }} src={theme =='agent' ? require('../../assets/uniform_images/agent-circle-2.png') : require('../../assets/uniform_images/helpa-circle-2.png')}></img>
                      <h3 style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: '#34475D'
                      }}>{item.title}</h3>
                      </div>
                      <h3 style={{
                          color: '#34475DA3'
                        }}>{item.description}</h3>
                    </Grid>
                  );
                }
              })
            }
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
          </div>
          {/* Mobile */}
          <div className='mobile'>
          <Grid className='gridBg' style={
            theme == 'agent' ? {backgroundImage: `url(${bgAgent})`, backgroundColor: '#F1F5FB'} : {backgroundImage: `url(${bgHelpa})`, backgroundColor: '#FFFAFC'}
        } container alignItems={'center'} justifyContent={'center'}>
            <Box sx={{
              width: '100%',
              margin: '10px'
            }}>
            {
              features.map((item, index) => {
                if(index != 3){
                  if(index %2 === 0){
                    // left
                    return(
                      <div style={{
                        display: 'flex',
                      }}>
                        <Grid item xs={6} style={{
                        textAlign: 'center'
                      }}>
                        <div style={{
                        position: 'relative'
                      }}>
                        <img style={{
                        width: '100%',
                        height: 'auto',
                      }} src={theme =='agent' ? require('../../assets/uniform_images/agent-mobile-circle.png') : require('../../assets/uniform_images/helpa-mobile-circle.png')}></img>
                      <h3 style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                          color: '#34475D'
                        }}>{item.title}</h3>
                      </div>
                        
                      </Grid>
                      <Grid item xs={6} style={{
                        textAlign: 'center',
                        alignSelf: 'center'
                      }}>
                      <h3 style={{
                            color: '#34475DA3'
                          }}>{item.description}
                          
                        </h3>
                      </Grid>
                      </div>
                    )
                  }else{
                    // right
                    return(
                      <div style={{
                        display: 'flex',
                      }}>
                      <Grid item xs={6} style={{
                      textAlign: 'center',
                      alignSelf: 'center'
                      }}>
                      <h3 style={{
                          color: '#34475DA3'
                        }}>{item.description}
                        
                      </h3>
                      </Grid>
                        <Grid item xs={6} style={{
                        textAlign: 'center'
                      }}>
                        <div style={{
                        position: 'relative'
                      }}>
                        <img style={{
                        width: '100%',
                        height: 'auto',
                      }} src={theme =='agent' ? require('../../assets/uniform_images/agent-mobile-circle-1.png') : require('../../assets/uniform_images/helpa-mobile-circle-1.png')}></img>
                      <h3 style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                          color: '#34475D'
                        }}>{item.title}</h3>
                      </div>
                      </Grid>
                      </div>
                    )
                  }
                }else{
                  // last circle
                  return(
                    <div style={{
                      display: 'flex',
                    }}>
                    <Grid item xs={6} style={{
                    textAlign: 'center',
                    alignSelf: 'center'
                    }}>
                    <h3 style={{
                        color: '#34475DA3'
                      }}>{item.description}
                      
                    </h3>
                    </Grid>
                      <Grid item xs={6} style={{
                      textAlign: 'center'
                    }}>
                      <div style={{
                      position: 'relative'
                    }}>
                      <img style={{
                      width: '100%',
                      height: 'auto',
                    }} src={theme =='agent' ? require('../../assets/uniform_images/agent-mobile-circle-2.png') : require('../../assets/uniform_images/helpa-mobile-circle-2.png')}></img>
                    <h3 style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: '#34475D'
                      }}>{item.title}</h3>
                    </div>
                    </Grid>
                    
                    </div>
                  )
                }
              })
            }
            </Box>
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
          </div>
        </div>
      
    )}
    }
}

export default Features