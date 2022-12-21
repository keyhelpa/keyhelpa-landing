import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors'
import Ratings from 'modules/generic/form/Rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import Button from 'components/increment/generic/form/Button'
import ProfilePicture from 'modules/generic/card/profilePicture'
import Strings from 'modules/generic/helper/String'
import Common from 'modules/generic/helper/Common'
import { SvgIcon } from '@mui/material';
import { Verified } from '@mui/icons-material';
import { BasicStyles } from 'common'

class Stack extends React.Component {
  constructor(props) {
    super(props);
  }

  checkIfVaccinated(experience) {
    if (experience && experience.details) {
      let details = experience.details
      if (details.otherData) {
        if (details.otherData.vaccination) {
          return details.otherData.vaccination.title
        }
      }
    }
    return null
  }

  header(data) {
    return (
      <div style={{
        borderBottom: 'solid 1px ' + Colors.lightGray,
        ...style.full,
      }}
        className="full-width-mobile no-border-mobile no-padding-mobile">
        <div style={{
          float: 'left',
          marginTop: 30,
          paddingLeft: 20
        }}

          className="full-width-mobile center-on-mobile"
        >
          <ProfilePicture
            data={data.profile}
            size={150}
          />
        </div>
        <div style={{
          width: '52%',
          float: 'left',
          marginLeft: '3%',
          marginTop: 20
        }}
          className="full-width-mobile">
          <span style={{
            ...style.full,
            padding: 0
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              ...style.full
            }}
              className="center-on-mobile"
            >

              {
                data.information && (
                  <span style={{
                    padding: 0,
                    color: Colors.gray,
                    fontWeight: 'bold',
                  }}
                  >
                    {Common.getCompleteName(data.information)}
                  </span>
                )
              }

              <SvgIcon
                component={Verified}
                style={{
                  fontSize: BasicStyles.iconSize,
                  color: data.payment_verified ? Colors.primary : Colors.lighterText,
                  marginLeft: 20
                }}
              />

              {
                this.checkIfVaccinated(data.experience) && (
                  <span style={{
                    paddingLeft: 5,
                    paddingRight: 5,
                    backgroundColor: Colors.primary,
                    color: Colors.white,
                    borderRadius: 2,
                    fontSize: (BasicStyles.fontSize - 2),
                    marginLeft: 20
                  }}>
                    <small>{this.checkIfVaccinated(data.experience)}</small>
                  </span>
                )
              }

            </div>
          </span>

          {
            data.experience && (
              <span style={{
                ...style.full,
                fontWeight: 'bold',
                padding: 5
              }}
                className="center-on-mobile"

              >
                {data.experience.title}
              </span>
            )
          }


          {
            data.merchant && (
              <span style={{
                ...style.full,
                color: Colors.gray,
                padding: 5
              }}
                className="center-on-mobile">
                <span style={{
                }}>
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    color={Colors.primary}
                    style={{
                      marginRight: 5
                    }}
                  />
                  {Common.getCompleteAddress(data.merchant.addition_informations)}
                </span>
              </span>
            )
          }


          <div
            style={{
              ...style.full,
              padding: 5,
              marginBottom: 25
            }}
            className="center-on-mobile"
          >
            <Ratings value={data.rating} />
          </div>
        </div>
        <div style={{
          width: '30%',
          float: 'left',
          paddingRight: 20
        }}
          className="hide-on-mobile">
          <span style={{
            float: 'right',
            width: '100%',
            textAlign: 'right',
            marginTop: 25
          }}>
            <Button
              title={'Message'}
              onClick={() => {
              }}
              style={{
                backgroundColor: 'transparent',
                color: Colors.primary,
                border: 'solid 1px ' + Colors.primary,
                marginRight: 20
              }} />

            <Button
              title={'Hire'}
              onClick={() => {
              }}
              style={{
                backgroundColor: Colors.primary,
                color: Colors.white,
                border: 'solid 1px ' + Colors.primary
              }} />
          </span>
        </div>

      </div>
    )
  }


  renderRow(data) {
    return (
      <span style={style.full}>
        <span style={{
          fontWeight: 'bold',
          ...style.full,
          padding: 0
        }}>{data.value}</span>
        <p style={{
          color: Colors.gray
        }}>
          {data.label}
        </p>
      </span>
    )
  }



  left(data) {
    const socialMedias = Common.getSocialMedia(data.social)
    return (
      <div style={{
        ...style.full,
        color: Colors.gray
      }}
      className="preview-profile-left"
      >

        {
          data.work_preference && this.renderRow({
            value: Common.getAvailability(data.work_preference.availability),
            label: 'Availability'
          })
        }

        {
          data.work_preference &&
          this.renderRow({
            value: Common.getHourlyRate(data.work_preference) + '/hr',
            label: 'Hourly rate'
          })
        }

        {
          this.renderRow({
            value: 'Waiting',
            label: 'Experience'
          })
        }

        {
          this.renderRow({
            value: 'Waiting',
            label: 'License'
          })
        }


        {
          socialMedias && socialMedias.length > 0 && (
            <span style={style.full}>
              {
                socialMedias.map((item) => (
                  <span
                    style={{
                      width: 40,
                      height: 40,
                      float: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 20,
                      marginRight: 20,
                      marginLeft: .4,
                      marginBottom: 5,
                      color: Colors.white,
                      backgroundColor: Colors.primary
                    }}
                    className="cursor-hover"
                    onClick={() => {
                      window.open(item.url)
                    }}
                  >
                    <FontAwesomeIcon icon={item.icon} size="1x" />
                  </span>
                ))
              }
              <span style={style.full}>
                Social media
              </span>
            </span>
          )
        }


      </div>
    )
  }

  renderText(data, border = true) {
    return (
      <div style={{
        // borderBottom: border ? 'solid 1px ' + Colors.lightGray : 'none',
        color: Colors.gray
      }}>
        <h3 style={{
          marginBottom: 20
        }}>{data.title}</h3>
        {
          data.content()
        }
      </div>
    )
  }

  right(data) {
    return (
      <div style={{
        ...style.full
      }}
      className="preview-profile-right"
      >
        {
          this.renderText({
            title: data.experience.title,
            content: () => {
              return (
                <span style={{
                  textAlign: 'justify'
                }}>
                  <p>
                    {data.experience.description}
                  </p>
                </span>
              )
            }
          }
          )
        }
      </div>
    )
  }

  render() {
    const { data } = this.props;
    return (
      <div style={{
        width: '100%',
        borderRadius: 12,
        minHeight: 200,
        overflowY: 'hidden',
        backgroundColor: Colors.activeGray
      }}>
        {
          this.header(data)
        }
        <div style={{
          width: '100%',
          float: 'left'
        }}>
          <div style={{
            width: '20%',
            float: 'left',
            minHeight: '50vh'
          }}
          className="full-width-mobile"
          >
            {
              this.left(data)
            }
          </div>

          <div style={{
            width: '80%',
            float: 'left',
            minHeight: '50vh'
          }}
          className="full-width-mobile preview-profile-border"
          >
            {
              data.experience && this.right(data)
            }
          </div>
        </div>
      </div>
    )
  }
}

const style = {
  full: {
    float: 'left',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10
  }
}
const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('reduxhandler');
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));

