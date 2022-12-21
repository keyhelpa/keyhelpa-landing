import React from 'react';
import Colors from 'common/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faLinkedinIn } from '@fortawesome/fontawesome-free-brands'
import Facebook from 'components/increment/generic/social/facebook'
import Google from 'components/increment/generic/social/google'
import LinkedIn from 'components/increment/generic/social/linkedin'
export default class HeaderLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{
        width: '100%',
        float: 'left'
      }}>
        <div style={{
            width: '100%',
            textAlign: 'center',
            float: 'left',
            display: 'flex',
            alignItems: 'center'
        }}>
          <span style={{
            width: '45%',
            float: 'left',
            borderBottom: 'solid 2px ' + Colors.gray 
          }}>
          </span>
          <label style={{
            width: '10%',
            float: 'left',
            textAlign: 'center'
          }}><b>or</b></label>
          <span style={{
            width: '45%',
            float: 'right',
            borderBottom: 'solid 2px ' + Colors.gray 
          }}>
          </span>
        </div>
        <span style={{
          width: '100%',
          float: 'left',
          textAlign: 'center',
          justifyContent: 'center',
          display: 'flex',
          marginTop: 20,
          marginBottom: 20,
          color: Colors.primary
        }}>
          <span style={{
            width: '40%',
            display: 'flex',
            justifyContent: 'center'
          }}
          className="full-width-mobile"
          >
            <span style={style.icon} className="cursor-hover">
              <Facebook
                payload={this.props.payload}
                isLoading={(flag) =>
                  this.props.isLoading(flag)
                }
                errorMessage={(messsage) => this.props.errorMessage(messsage)}
              />
            </span>
            <span style={style.icon} className="cursor-hover">
              <Google
                payload={this.props.payload}
                isLoading={(flag) =>
                  this.props.isLoading(flag)
                }
                errorMessage={(messsage) => this.props.errorMessage(messsage)}
                />
            </span>
            
            <span style={style.icon} className="cursor-hover">
              <LinkedIn
                payload={this.props.payload}
                isLoading={(flag) =>
                  this.props.isLoading(flag)
                }/>
            </span>
          </span>
        </span>
      </div>
    )
  }
}

const style = {
  icon: {
    width: 40,
    height: 40,
    float: 'left',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.primary,
    color: Colors.white,
    marginRight: 10,
    marginLeft: 10
  }
}