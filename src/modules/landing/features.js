import React, { useState, useEffect, useCallback } from "react";
import Button from 'modules/generic/button'
import './Style.css'
import AgentCircleUp from 'assets/uniform_images/agent-circle-up.png';
import AgentCircleDown from 'assets/uniform_images/agent-circle-down.png';
import AgentCircle from 'assets/uniform_images/agent-circle.png';
import AgentMobileCircleLeft from 'assets/uniform_images/agent-mobile-circle-left.png';
import AgentMobileCircleRight from 'assets/uniform_images/agent-mobile-circle-right.png';
import AgentMobileCircle from 'assets/uniform_images/agent-mobile-circle.png';
import HelpaCircleUp from 'assets/uniform_images/helpa-circle-up.png';
import HelpaCircleDown from 'assets/uniform_images/helpa-circle-down.png';
import HelpaCircle from 'assets/uniform_images/helpa-circle.png';
import HelpaMobileCircleLeft from 'assets/uniform_images/helpa-mobile-circle-left.png';
import HelpaMobileCircleRight from 'assets/uniform_images/helpa-mobile-circle-right.png';
import HelpaMobileCircle from 'assets/uniform_images/helpa-mobile-circle.png';
import Colors from 'common/Colors'
import './featureStyle.css'
import Config from "config";

function Features(props) {
  const [features, setFeatures] = useState([]);
  const { data, theme } = props;



  const getImage = (template, device) => {
    if (device == 'desktop') {
      switch (template) {
        case 'up': return AgentCircleUp
        case 'down': return AgentCircleDown
        case 'circle': return AgentCircle
        case 'up-pink': return HelpaCircleUp
        case 'down-pink': return HelpaCircleDown
        case 'circle-pink': return HelpaCircle
      }
    } else {
      switch (template) {
        case 'up': return AgentMobileCircleRight
        case 'down': return AgentMobileCircleLeft
        case 'circle': return AgentMobileCircle
        case 'up-pink': return HelpaMobileCircleRight
        case 'down-pink': return HelpaMobileCircleLeft
        case 'circle-pink': return HelpaMobileCircle
      }
    }

  }
  const renderCircle = (title, template, device = 'desktop') => {
    return (
      <div style={{
        width: '300px',
        height: '300px',
        backgroundImage: `url(${getImage(template, device)})`,
        backgroundPosition: 'center',
        backgroundSize: '300px 300px',
        backgroundRepeat: 'no-repeat',
        float: 'left',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h2 style={{
          width: 300,
          paddingLeft: 50,
          paddingRight: 50,
          textAlign: 'center',
          color: theme == 'agent' ? Colors.agentTextTitle : Colors.helpaTextTitle,
        }}>
          {
            title
          }
        </h2>
      </div>
    )
  }



  const renderDesktop = (data) => {
    return (
      <div style={{
        width: '100%',
        float: 'left',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        {
          data && data.map((item, index) => (
            <div style={{
              width: '300px',
            }}
              className={"desktop-feature-card-" + index}
            >
              {
                (item.template.includes('down') || item.template.includes('circle')) && renderCircle(item.title, item.template)
              }
              <div style={{
                float: 'left',
                width: '100%'
              }}>
                <p style={{
                  color: theme == 'agent' ? Colors.agentTextTitle : Colors.helpaTextTitle,
                  textAlign: 'center'
                }}>
                  {
                    item.description
                  }
                </p>
              </div>
              {
                (item.template.includes('up')) && renderCircle(item.title, item.template)
              }
            </div>
          ))
        }

      </div>
    )
  }

  const renderCircleMobile = (title, template, device = 'desktop') => {
    return (
      <div style={{
        width: '50%',
        height: '200px',
        backgroundImage: `url(${getImage(template, device)})`,
        backgroundPosition: 'center',
        backgroundSize: '100% auto',
        backgroundRepeat: 'no-repeat',
        float: 'left',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h2 style={{
          width: '100%',
          paddingLeft: 50,
          paddingRight: 50,
          textAlign: 'center',
          color: theme == 'agent' ? Colors.agentTextTitle : Colors.helpaTextTitle,
          fontSize: 16
        }}>
          {
            title
          }
        </h2>
      </div>
    )
  }

  const renderMobile = (data) => {
    return (
      <div style={{
        width: '100%',
        float: 'left',
      }}>
        {
          data && data.map((item, index) => (
            <div style={{
              width: '100%',
            }}
              className={"mobile-feature-card-" + index}
            >
              {
                (item.template.includes('up')) && renderCircleMobile(item.title, item.template, 'mobile')
              }
              <div style={{
                float: 'left',
                width: '50%',
                height: '200px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <p style={{
                  color: theme == 'agent' ? Colors.agentTextTitle : Colors.helpaTextTitle,
                  textAlign: 'center'
                }}>
                  {
                    item.description
                  }
                </p>
              </div>
              {
                (item.template.includes('down') || item.template.includes('circle')) && renderCircleMobile(item.title, item.template, 'mobile')
              }
            </div>
          ))
        }

      </div>
    )
  }

  return (
    <div style={{
      width: '100%',
      float: 'left',
      minHeight: '100vh',
    }}>
      <div style={{
        width: '100%',
        float: 'left',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center'
      }}>
        <div
          className="hide-on-mobile"
          style={{
            width: '100%',
            float: 'left'
          }}
        >
          {
            renderDesktop(data)
          }
        </div>
        <div className="hide-on-desktop">
          {
            renderMobile(data)
          }
        </div>
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

export default Features;