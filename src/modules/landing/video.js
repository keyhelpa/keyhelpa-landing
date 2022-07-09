import React, { Component } from 'react'
import Footer from 'modules/generic/frames/footer.js'
import { Container, Box, Grid, SvgIcon } from '@mui/material';
import Button from 'modules/generic/button'
import bgAgent from 'assets/lighterGray.png'
import bgHelpa from 'assets/lighterPink.png'
import './Style.css'
import API from 'services/api'
import Routes from 'common/Routes'
import Colors from 'common/Colors';
import AgentVideoThumbnail from 'assets/agent-video-thumbnail.png'
import HelpaVideoThumbnail from 'assets/helpa-video-thumbnail.png'
import { PlayArrow, PlayCircleFilled } from '@mui/icons-material';
export class Video extends Component {
  constructor(props) {
    super(props)
  }

  renderLeft(data) {
    const { theme } = this.props;
    return (
      <div style={{
        width: '100%',
        float: 'left',
        height: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{
            color: theme == 'agent' ? Colors.agentTextTitle : Colors.helpaTextTitle
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
                  height: '350px',
                  // background: theme == 'agent' ? Colors.agentTextTitle : Colors.helpaTextTitle,
                  backgroundImage: `url(${theme == 'agent' ? AgentVideoThumbnail : HelpaVideoThumbnail})`,
                  alignItems: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100% 100%',
                  display: 'flex',
                  alignContent: 'center',
                  justifyContent: 'center'
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
                    className="active-color-hover"
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
                }}>
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
                      item.description
                    }
                  </p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
  render() {
    const { data, theme } = this.props;
    return (
      <div style={{
        width: '100%',
        float: 'left',
        minHeight: '100vh'
      }}>
        <div style={{
          float: 'left',
          width: '40%',
          paddingLeft: 20,
          paddingRight: 20
        }}>
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
          width: '60%'
        }}>
          {
            this.renderRight(data)
          }

        </div>
      </div>

    );
  }
}

export default Video