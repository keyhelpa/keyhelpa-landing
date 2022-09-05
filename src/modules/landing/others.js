import React, { Component } from 'react'
import './Style.css'
import Colors from 'common/Colors';
import Button from 'modules/generic/button'
import './others.css'
import Config from "config";
export class Others extends Component {
  constructor(props) {
    super(props)
  }

  renderContent(item, index) {
    const { theme } = this.props;
    return (
      <div style={{
        float: 'left',
        width: '100%',
        marginBottom: 100
      }}>
        {
          item.template == 'left' && (
            <div style={{
              float: 'left',
              width: '50%'
            }}
              className={"full-width-mobile desktop-other-card-" + index}
            >
                <img style={{
                  height: 'auto',
                  width: 'auto'
                }}  src={item.url}></img>
            </div>
          )
        }
        <div style={{
          float: 'left',
          width: '50%',
          paddingLeft: item.template == 'right' ? 0 : '5%',
          paddingRight: item.template == 'right' ? '5%' : 0,
        }}
          className="full-width-mobile others-mobile-reset"
        >
          <h1 style={{
            color: theme == 'agent' ? Colors.agentTextTitle : Colors.helpaTextTitle,
            marginBottom: 25
          }}>
            {
              item.title
            }
          </h1>
          <p style={{
            color: theme == 'agent' ? Colors.agentText : Colors.helpaOthersText,
            marginBottom: 25
          }}  >
            {
              item.description()
            }
          </p>

        </div>

        {
          item.template == 'right' && (
            <div style={{
              float: 'left',
              width: '50%',
              paddingLeft: '5%'
            }}
              className={"full-width-mobile others-mobile-reset desktop-other-card-" + index}
            >
              <img style={{
                height: 'auto',
                width: 'auto'
              }} src={item.url}></img>
            </div>
          )
        }
      </div>
    )
  }

  renderContentMobile(item, index) {
    const { theme } = this.props;
    return (
      <div style={{
        float: 'left',
        width: '100%',
        marginBottom: 50
      }}>
        <div style={{
          float: 'left',
          width: '50%'
        }}
          className={"full-width-mobile mobile-other-card-" + index}
        >
          <img style={{
            height: 'auto',
            width: '100%'
          }} src={item.url}></img>
        </div>

        <div style={{
          float: 'left',
          width: '50%',
          paddingLeft: item.template == 'right' ? 0 : '5%',
          paddingRight: item.template == 'right' ? '5%' : 0,
          marginTop: 50
        }}
          className="full-width-mobile others-mobile-reset"
        >
          <h1 style={{
            color: theme == 'agent' ? Colors.agentTextTitle : Colors.helpaTextTitle,
            marginBottom: 25,
            width: '80%'
          }}>
            {
              item.title
            }
          </h1>
          <p style={{
            color: theme == 'agent' ? Colors.agentText : Colors.helpaOthersText,
            marginBottom: 25
          }}  >
            {
              item.description()
            }
          </p>

        </div>
      </div>
    )
  }


  render() {
    const { data, theme } = this.props
    return (
      <div style={{
        width: '100%',
        float: 'left',
        marginTop: 100
      }}>
        <div className="hide-on-mobile">
          {
            data && data.length > 0 && data.map((item, index) => (
              <div style={{
                width: '100%',
                float: 'left'
              }}>
                {
                  this.renderContent(item, index)
                }
              </div>
            ))
          }
        </div>

        <div className="hide-on-desktop">
          {
            data && data.length > 0 && data.map((item, index) => (
              <div style={{
                width: '100%',
                float: 'left'
              }}>
                {
                  this.renderContentMobile(item, index)
                }
              </div>
            ))
          }
        </div>
        <div style={{
          textAlign: 'center',
          width: '100%',
          float: 'left',
          marginBottom: 100
        }}>
          <Button
            title={'Get Started'}
            style={{
              backgroundColor: theme == 'agent' ? Colors.agentDarkGray : Colors.helpaDarkPink,
              color: 'white',
              fontSize: '24px',
              width: '10%'
            }}
            onChange={() => window.location.href = Config.HELPA}
          ></Button>
        </div>


      </div>
    )
  }
}

export default Others