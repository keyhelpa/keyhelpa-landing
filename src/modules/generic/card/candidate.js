import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import Colors from 'common/Colors'
import Ratings from 'modules/generic/form/Rating'
import Button from 'components/increment/generic/form/Button'
import { SvgIcon } from '@mui/material';
import { Help, Place, Verified } from '@mui/icons-material';
import { BasicStyles } from 'common';
import Common from 'modules/generic/helper/Common'
import { ProgressBar } from 'react-bootstrap';
import ReactTooltip from "react-tooltip";
export default class SettingMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      more: false
    };
  }

  header(data) {
    return (
      <div>
        {
          data.experience && (
            <span style={{
              width: '100%',
              float: 'left',
              color: Colors.darkGray
            }}
            >
              <h3>{Common.getFirstLetterCapitalize(data.experience.title)}</h3>
            </span>
          )
        }


        <div style={{
          width: '100%',
          float: 'left',
          display: 'flex',
          alignItems: 'center',
          marginTop: 15
        }}
        className="unset-flex-mobile"
        >
          {
            data.rating && (
              <div style={{
                float: 'left',
                paddingRight: 20
              }}
                className="full-width-mobile no-border-mobile no-padding-mobile mb-mobile-15"
              >
                <Ratings value={data.rating} />
              </div>
            )
          }

          {
            data.information && (
              <span style={{
                borderLeft: 'solid 1px ' + Colors.gray,
                paddingLeft: 20,
                paddingRight: 20,
                float: 'left'
              }}
                className="full-width-mobile no-border-mobile no-padding-mobile mb-mobile-15"
              >
                {Common.getCompleteName(data.information)}
              </span>
            )
          }

          {
            data.work_preference && (
              <span style={{
                borderLeft: 'solid 1px ' + Colors.gray,
                paddingLeft: 20,
                paddingRight: 20,
                float: 'left'
              }}
                className="full-width-mobile no-border-mobile no-padding-mobile mb-mobile-15"
              >
                Hourly: <b>{Common.getAmountWithCurrency(data.work_preference.currency, data.work_preference.hourly_rate)}</b>
              </span>
            )
          }

        </div>
      </div>
    )
  }

  body(data) {
    const { more } = this.state;
    return (
      <div style={{
        paddingTop: 20,
        paddingBottom: 20,
        float: 'left',
        textAlign: 'justify'
      }}>
        {
          (data.experience && data.experience.description && data.experience.description.length > 1000 && more == false) && (
            <p>
              {data.experience.description.substr(0, 1000)}
              <b style={{
                paddingLeft: 10,
                color: Colors.primary
              }}
                className="href-link"
                onClick={() => {
                  this.setState({
                    more: true
                  })
                }}
              >...see more</b>
            </p>
          )
        }
        {
          ((data.experience && data.experience.description && data.experience.description.length <= 1000) || more == true) && (
            <p>
              {data.experience.description}
              {
                more == true && (
                  <b style={{
                    paddingLeft: 10,
                    color: Colors.primary
                  }}
                    className="href-link"
                    onClick={() => {
                      this.setState({
                        more: false
                      })
                    }}
                  >...see less</b>
                )
              }

            </p>
          )
        }
      </div>
    )
  }

  tags(data) {
    return (
      <div style={{
        paddingBottom: 20,
        float: 'left'
      }}>
        {
          data && data.map((item, index) => (
            <div key={index} style={{
              height: 30,
              borderRadius: 15,
              marginRight: 20,
              paddingLeft: 15,
              paddingRight: 15,
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: Colors.white,
              color: Colors.gray,
              float: 'left',
              fontSize: 11
            }}
              className="tag-card-mobile"
            >
              {
                item.name
              }
            </div>
          ))
        }
      </div>
    )
  }

  footer(data) {
    return (
      <div style={{
        width: '100%',
        float: 'left'
      }}>
        <div style={{
          float: 'left',
          width: '85%'
        }}
          className="full-width-mobile"
        >
          {/* Tags */}
          <div style={{
            width: '100%',
            float: 'left'
          }}>
            {
              (data.work_preference && data.work_preference.categories) && this.tags(Array.isArray(data.work_preference.categories) ? data.work_preference.categories : JSON.parse(data.work_preference.categories))
            }
          </div>
        </div>


        {/* Sections */}

        <div style={{
          width: '100%',
          float: 'left',
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'space-between'
        }}
          className="full-width-mobile unset-flex-mobile mt-mobile-15"
        >
          <div style={{
            float: 'left'
          }}
            className="full-width-mobile"
          >
            <div style={{
              width: '100%',
              float: 'left',
              display: 'flex',
              alignItems: 'center',
              alignContent: 'center'
            }}

              className="full-width-mobile unset-flex-mobile"
            >
              <span style={{
                float: 'left',
              }}
                className="full-width-mobile no-border-mobile no-padding-mobile text-padding-on-mobile unset-flex-mobile"
              >
                <span style={{
                }}>
                  <SvgIcon
                    component={Verified}
                    style={{
                      fontSize: BasicStyles.iconSize,
                      color: data.payment_verified ? Colors.primary : Colors.lighterText,
                      marginRight: 5
                    }}
                  />
                  <b>Payment verified</b>
                </span>
              </span>

              {
                data.matching_score && (
                  <span style={{
                    float: 'left',
                    paddingLeft: 20,
                    paddingRight: 20,
                    display: 'flex',
                    alignContent: 'center',
                    alignItems: 'center'
                  }}
                    className="full-width-mobile no-border-mobile no-padding-mobile text-padding-on-mobile mt-mobile-15"
                  >
                    <span
                      style={{
                        float: 'left'
                      }}
                      data-tip="The score shows<br />how popular the job<br />from this Agent. ">
                      <ReactTooltip place="top" type="light" effect="solid" multiline={true} />
                      <SvgIcon
                        style={{
                          fontSize: BasicStyles.largeIcon,
                          color: Colors.gray,
                          paddingRight: 5
                        }}
                        component={Help}
                        className="href-link"
                      />
                    </span>
                    <span style={{
                      float: 'left'
                    }}>
                      <b>Popularity</b>
                    </span>

                    <div style={{
                      width: 150,
                      marginLeft: 10,
                      float: 'left',
                    }}>
                      <ProgressBar now={data.matching_score} label={`${data.matching_score}%`} />
                    </div>
                  </span>
                )
              }

              {
                data.work_preference && data.work_preference.region && (
                  <span style={{
                    float: 'left',
                    marginLeft: 10
                  }}
                    className="full-width-mobile no-border-mobile no-padding-mobile text-padding-on-mobile mt-mobile-15"
                  >
                    <span style={{
                    }}>
                      <SvgIcon
                        component={Place}
                        style={{
                          fontSize: BasicStyles.iconSize,
                          color: Colors.primary,
                          marginRight: 5
                        }}
                      />
                      <b>{data.work_preference.region}</b>
                    </span>
                  </span>
                )
              }
            </div>
          </div>
          {/* Button  */}
          <span
            className="full-width-mobile"
          >
            {
              data && data.proposal == null && (
                <Button
                  title={'View candidate'}
                  onClick={() => {
                    this.props.navigate('/candidate/view/' + data.code)
                  }}
                  style={{
                    float: 'left',
                    backgroundColor: 'transparent',
                    color: Colors.primary,
                    border: 'solid 1px ' + Colors.primary
                  }}
                  className="full-width-mobile invert-color mt-mobile-15"
                />
              )
            }

            {
              data && data.proposal != null && (
                <Button
                  title={'View invitation'}
                  onClick={() => {
                    this.props.navigate('/proposals')
                  }}
                  style={{
                    float: 'left',
                    backgroundColor: 'transparent',
                    color: Colors.primary,
                    border: 'solid 1px ' + Colors.primary
                  }}
                  className="full-width-mobile invert-color"
                />
              )
            }

          </span>
        </div>
      </div>
    )

  }

  render() {
    const { data } = this.props;
    return (
      <div
        style={{
          width: '100%',
          borderRadius: 12,
          minHeight: 200,
          overflowY: 'hidden',
          backgroundColor: Colors.activeGray,
          padding: 20,
          marginBottom: 25,
          color: Colors.gray
        }}
        onClick={() => {
        }}
      >
        {
          this.header(data)
        }
        {
          data.experience && this.body(data)
        }
        {
          this.footer(data)
        }
      </div>
    )
  }
}
