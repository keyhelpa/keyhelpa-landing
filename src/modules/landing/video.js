import React, { Component } from 'react'
import Colors from 'common/Colors';
import AgentVideoThumbnail from 'assets/agent-video-thumbnail.png'
import HelpaVideoThumbnail from 'assets/helpa-video-thumbnail.png'
import { PlayArrow, PlayCircleFilled } from '@mui/icons-material';
import VideoModal from 'modules/generic/modal/video'
import { SvgIcon } from '@mui/material';
export class Video extends Component {
<<<<<<< HEAD
  constructor(props) {
    super(props)
    this.state = {
      video: null
=======
    constructor(props) {
      super(props)
      this.state={
        theme: this.props.theme,
        data: this.props.data,
        features: [],
        hasFetched: false
      }
      this.iframe = React.createRef();
>>>>>>> 60744eda2cebc3404fb28908e75a1c47ab3f5522
    }
  }



  renderLeft(data) {
    const { theme } = this.props;
    return (
      <div style={{
        width: '100%',
        float: 'left',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingRight: '40%'
      }}
      className="video-text-mobile"
      >
        <div>
          <h1 style={{
            color: theme == 'agent' ? Colors.agentTextTitle : Colors.helpaTextTitle,
            marginBottom: 25
          }}>
            {
              data.title
            }
          </h1>
          {
            data.description()
          }
        </div>
      </div>
    )
  }

  renderRight(data) {
    const { theme } = this.props;
    return (
      <div style={{
        float: 'left',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        height: '100vh',
      }}>
        <div>
          {
            data && data.length > 0 && data.map((item) => (
              <div style={{
                float: 'left',
                width: '100%',
                marginBottom: 25
              }}>
                <div style={{
                  width: '60%',
                  float: 'left',
                  height: '300px',
                  // background: theme == 'agent' ? Colors.agentTextTitle : Colors.helpaTextTitle,
                  backgroundImage: `url(${theme == 'agent' ? AgentVideoThumbnail : HelpaVideoThumbnail})`,
                  alignItems: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100% 100%',
                  display: 'flex',
                  alignContent: 'center',
                  justifyContent: 'center'
                }}
                className="active-color-hover full-width-mobile video-player-holder"
                onClick={() => {
                  this.setState({
                    video: item
                  })
                }}
                >
                  <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50px',
                    float: 'left',
                    background: theme == 'agent' ? Colors.agentGray : Colors.helpaPink,
                    alignItems: 'center',
                    alignContent: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                  >
                    <SvgIcon
                      component={PlayArrow}
                      style={{
                        color: Colors.white,
                        fontSize: 60
                      }}
                    />
                  </div>
                </div>
                <div style={{
                  float: 'left',
                  width: '40%',
                  paddingLeft: 20
                }}
                className="full-width-mobile video-player-text-holder"
                >
                  <h2 style={{
                    color: theme == 'agent' ? Colors.agentTextTitle : Colors.helpaTextTitle
                  }}>
                    {
                      item.title
                    }
                  </h2>
                  <p style={{
                    color: theme == 'agent' ? Colors.agentTextTitle : Colors.helpaTextTitle
                  }}>
                    {
                      item.description()
                    }
                  </p>
<<<<<<< HEAD
                </div>
              </div>
            ))
          }
=======
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
                            <div style={{
                              borderRadius: 10,
                              width: 400,
                              height: 300,
                            }}>
                              <div ref={"iframe"} dangerouslySetInnerHTML={{__html: item.payload_value.helps.url}}></div>
                            </div>
                          </div>
                      </Box> 
                    </div>
                    )
                  }
                })
                }
              
              </Grid>
          </Grid>
>>>>>>> 60744eda2cebc3404fb28908e75a1c47ab3f5522
        </div>
      </div>
    )
  }
  render() {
    const { data, theme } = this.props;
    const { video } = this.state;
    return (
      <div style={{
        width: '100%',
        float: 'left',
        minHeight: '100vh'
      }}>
        <div style={{
          float: 'left',
          width: '50%',
          paddingLeft: 20,
          paddingRight: 20
        }}
        className="full-width-mobile"
        >
          {
            this.renderLeft(theme == 'agent' ? {
              title: 'What do you need a Helpa for?',
              description: () => {
                return (
                  <p style={{
                    color: theme == 'agent' ? Colors.agentTextTitle : Colors.helpaTextTitle
                  }}>
                    Do you need help with your property opens this weekend? Need more manpower to complete your inspection reports?

                    <br />
                    Let KeyHelpa find the freelance help you need.
                  </p>
                )
              }
            } : {
              title: 'What kind of work can I help with?',
              description: () => {
                return (
                  <p style={{
                    color: theme == 'agent' ? Colors.agentTextTitle : Colors.helpaTextTitle
                  }}>
                    We’ve got real estate agencies, agents and property managers looking for help from experienced people just like you. You’ll find a range of real estate industry-related jobs right here.
                  </p>
                )
              }
            })
          }

        </div>
        <div style={{
          float: 'left',
          width: '50%'
        }}
        className="full-width-mobile"
        >
          {
            this.renderRight(data)
          }
        </div>

        {
          video && (
            <VideoModal
              show={true}
              data={video}
              onCancel={() => {
                this.setState({
                  video: null
                })
              }}
            />
          )
        }
      </div>

    );
  }
}

export default Video