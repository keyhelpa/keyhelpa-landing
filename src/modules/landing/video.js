import React, { Component } from 'react'
import Footer from 'modules/generic/frames/footer.js'
import { Container, Box, Grid } from '@mui/material';
import Button from 'modules/generic/button'
import bgAgent from 'assets/lighterGray.png'
import bgHelpa from 'assets/lighterPink.png'
import './Style.css'
import API from 'services/api'
import Routes from 'common/Routes'

export class Video extends Component {
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
        const {data} = this.state;
    return(
      <div>
        <Grid style={{
          backgroundColor: '#E5E5E5',
          backgroundImage: `url(${bgAgent})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%'
        }} container alignItems={'center'} justifyContent={'center'} >
            <Grid item xs={6} style={{
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
            <Grid item style={{
              display: 'flex',
              flexWrap: 'wrap',
            }} xs={6} textAlign={'right'} padding={'5%'} >
              {
                data.map((item, index) => {
                if(item.payload_value.helps != undefined){
                  return(
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'right',
                    flexBasis: '100%',
                  }}>
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      textAlign: 'right',
                      flexDirection: 'column',
                      marginRight: '25px'
                    }}>
                      <h3 style={{
                        fontWeight: 'bold',
                        fontSize: '20px',
                        color: '#34475D'
                      }} >{item.payload_value.helps.title}</h3>
                      {(item.payload_value.helps.description).map((val, ctr)=>{
                        return(<p key={ctr}>{val}</p>)
                      })}
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center', 
                      flexDirection: 'row'
                    }}>
                      <div style={{
                          marginTop: '25px',
                        }}>
                          <iframe  width="400" height="300" src={`${item.payload_value.helps.url}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </Box> 
                  </div>
                  )
                }
              })
              }
             
            </Grid>
        </Grid>
     </div>
      );
    }
}

export default Video