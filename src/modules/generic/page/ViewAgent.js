import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors'
import Helper from 'common/Helper'
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

  renderDetails(data) {
    return (
      <div>
        <span style={{
          float: 'left',
          width: '100%',
          paddingBottom: 10,
          padding: 0
        }}>
          <h2>{data.information.first_name + ' ' + data.information.last_name}</h2>
        </span>

        <span style={{
          ...style.full,
          fontWeight: 'bold',
          padding: 0
        }}>
          {data.title}
        </span>

        <span style={{
          ...style.full,
          color: Colors.gray,
          padding: 0
        }}>
          <span style={{
          }}>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              color={Colors.primary}
              style={{
                marginRight: 5
              }}
            />
            {data.location}
          </span>
        </span>

        <div style={{
          ...style.full,
          padding: 0
        }}>
          <Ratings value={data.rating} />
        </div>
      </div>
    )
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
              ...style.full,
              paddingLeft: 0
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
            </div>
          </span>

          {
            data.merchant && (
              <span style={{
                ...style.full,
                color: Colors.gray,
                padding: 5,
                paddingLeft: 0
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
              marginBottom: 25,
              paddingLeft: 0
            }}
            className="center-on-mobile"
          >
            <Ratings value={data.rating ? data.rating : 0} />
          </div>

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

  renderText(data, border = true) {
    return (
      <div style={{
        color: Colors.gray
      }}>
        <h3 style={{
          marginBottom: 20,
          fontWeight: 'bold'
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
            title: 'About the agent',
            content: () => {
              return (
                <span>
                  <p style={{
                    textAlign: 'justify'
                  }}>
                    {data.merchant && JSON.parse(data.merchant.addition_informations).about}
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

  left(data) {
    return (
      <div style={{
        ...style.full,
        color: Colors.gray
      }}
        className="preview-profile-left"
      >
        {
          data.total_jobs != null && this.renderRow({
            value: data.total_jobs,
            label: 'Total jobs posted'
          })
        }
        {
          data.total_paid && this.renderRow({
            value: Common.getAmountWithCurrency(data.total_paid.currency, data.total_paid.amount),
            label: 'Total paid'
          })
        }

        {
          data.total_hired != null && this.renderRow({
            value: data.total_hired,
            label: 'Total hired'
          })
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
        backgroundColor: Colors.activeGray,
        marginBottom: 25
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
              this.right(data)
            }
          </div>
        </div>
      </div >
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

