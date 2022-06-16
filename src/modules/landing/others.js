import React, { Component } from 'react'
import Footer from 'modules/generic/frames/footer.js'
import { Container, Box, Grid } from '@mui/material';
import Button from 'modules/generic/button'
import bgAgent from 'assets/lighterGray.png'
import bgHelpa from 'assets/lighterPink.png'
import './Style.css'
import API from 'services/api'
import Routes from 'common/Routes'
import Config from "config";

export class Others extends Component {
    constructor(props) {
      super(props)
      this.state={
        theme: this.props.theme,
        hasFetched: false
      }
    }
<<<<<<< HEAD
    render(){
    const {theme, data, others} = this.state;
    if(others.length === 0){
        data.map((item, index)=> {
          if(item.payload_value.others != null || item.payload_value.others != undefined){
          others.push(item.payload_value.others)
        }
      })
    }
    if(others.length > 0){
      console.log('props', this.props)
      return(
=======
    renderContent(others){
      const {theme} = this.state;
      return (
>>>>>>> c01069210a318f5cf9909494683539b9603b7227
        <div>
            {/* Web */}
          <div className='web'>
<<<<<<< HEAD
          <Grid className='gridBg' style={
            theme == 'agent' ? {backgroundImage: `url(${bgAgent})`, backgroundColor: '#F1F5FB'} : {backgroundImage: `url(${bgHelpa})`, backgroundColor: '#FFFAFC'}
        } container alignItems={'left'} justifyContent={'left'}>
            {
              others.map((item,index)=>{
                if(index % 2 === 0){
                  return(
                    // img left
                    <div key={index} style={{
                      display: 'flex'
                    }}>
                      <Grid item xs={6} style={{
                      padding: '5%',
                      textAlign: 'center',
                      }}>
                        <img style={{
                        width: '80%',
                        height: 'auto',
                      }} src={`${item.url}`}></img>
                      </Grid>
                      <Grid item xs={6} style={{
                        padding: '5% 5% 5% 5%',
                        textAlign: 'left'
=======
            <Grid className='gridBg' style={
              theme == 'agent' ? {backgroundImage: `url(${bgAgent})`, backgroundColor: '#F1F5FB'} : {backgroundImage: `url(${bgHelpa})`, backgroundColor: '#FFFAFC'}}
              container alignItems={'left'} justifyContent={'left'}>
              {
                others.map((item,index)=>{
                  // console.log('others', others)
                  if(index % 2 === 0){
                    return(
                      // img left
                      <div key={index} style={{
                        display: 'flex'
>>>>>>> c01069210a318f5cf9909494683539b9603b7227
                      }}>
                        <Grid item xs={6} style={{
                        padding: '5%',
                        textAlign: 'center',
                        }}>
                          <img style={{
                          width: '80%',
                          height: 'auto',
                        }} src={`${item.url}`}></img>
                        </Grid>
                        <Grid item xs={6} style={{
                          padding: '5% 5% 5% 5%',
                          textAlign: 'left'
                        }}>
                          <h2 style={{
                            color: ' #34475D'
                          }}>{item.title}</h2>
                          <p style={{
                            color: '#34475DA3',
                            fontSize: '18px'
                          }}>{item.description}</p>
                        </Grid> 
                      </div>
                    )
                  }else{
                    return(
                      // img right
                      <div style={{
                        display: 'flex'
                      }}>
                        <Grid item xs={6} style={{
                            padding: '5% 5% 5% 5%',
                            textAlign: 'left'
                          }}>
                            <h2 style={{
                              color: ' #34475D'
                            }}>{item.title}</h2>
                            <p style={{
                              color: '#34475DA3',
                              fontSize: '18px'
                            }}>{item.description}</p>
                          </Grid>
                          <Grid item xs={6} style={{
                            padding: '5%',
                            textAlign: 'center'
                          }}>
                            <img style={{
                            width: '80%',
                            height: 'auto',
                          }} src={`${item.url}`}></img>
                          </Grid>
                          
                      </div>
                    )
                  }
                })
              }
            </Grid>
          <div className='flex-center' style={
          theme == 'agent' ? {backgroundColor: '#F1F5FB'} : {backgroundColor: '#FFFAFC'}}>
          <Button
              title={'Get Started'}
              style={theme==='agent' ? {
                backgroundColor: '#34475D',color: 'white',
                fontSize: '24px',
                width: '10%'} : {
                backgroundColor: '#E62D7E',color: 'white',
                fontSize: '24px',
                width: '10%'
              }}
              onChange={() => window.location.href = Config.HELPA}
              ></Button>
          </div>
          </div>
          {/* Mobile */}
          <div className='mobile'>
            <Grid className='gridBg' style={
              theme == 'agent' ? {backgroundImage: `url(${bgAgent})`, backgroundColor: '#F1F5FB'} : {backgroundImage: `url(${bgHelpa})`, backgroundColor: '#FFFAFC'}}
              container alignItems={'center'} justifyContent={'center'}>
              {
                others.map((item,index)=>{
                  return(
                    <div key={index} style={{
                      display: 'flex',
                    }}>
                      <Grid item xs={12} style={{
                      padding: '5%',
                      justifyContent: 'center'
                      }}>
                        <img style={{
                        width: '100%',
                        height: 'auto',
                        marginTop: '25px',
                        marginBottom: '25px',
                      }} src={`${item.url}`}></img>
                      <div style={{
                        textAlign: 'left',
                      }}>
                        <h2 style={{
                          color: ' #34475D',
                          marginTop: '25px',
                          marginBottom: '25px',
                        }}>{item.title}</h2>
                        <p style={{
                          color: '#34475DA3',
                          fontSize: '18px'
                        }}>{item.description}</p>
                      </div>
                      
                      </Grid>
                      
                    </div>
                  )
                })
              }
              <Button
                title={'Get Started'}
                style={theme==='agent' ? {
                  backgroundColor: '#34475D',color: 'white',
                  fontSize: '24px',
                  width: '10%', marginBottom: '25px'} : {
                  backgroundColor: '#E62D7E',color: 'white',
                  fontSize: '24px',
                  width: '10%', marginBottom: '25px'
                }}
                onChange={() => window.location.href = Config.HELPA}
              ></Button>
            </Grid>
          </div>
        </div>
      )
    }
    render(){
    const {theme, others} = this.state;
    const {data} = this.props
    return(
        <div>
          {data && (this.renderContent(data))}
      </div>
      )
    }
}

export default Others