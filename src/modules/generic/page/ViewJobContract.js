import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors'
import Helper from 'modules/generic/helper/Common'
import HelperConfig from 'common/Helper'
import Button from 'components/increment/generic/form/Button'
import ConfirmationModal from 'modules/generic/modal/confirmBox'
import ContentJobContract from './ContentJobContract';

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmFlag: false
    }
  }

  header(data) {
    return (
      <div style={{
        borderBottom: 'solid 1px ' + Colors.lightGray,
        ...style.full,
      }}
        className="full-width-mobile no-border-mobile no-padding-mobile">
        <div style={{
          width: '60%',
          float: 'left',
          paddingBottom: 20,
          padding: 20
        }}
          className="full-width-mobile">
          <span style={style.full}>
            <h2>{Helper.getFirstLetterCapitalize(data.proposal.job.title)}</h2>
          </span>

          <span style={{
            ...style.full,
            fontWeight: 'bold'
          }}>
            {data.merchant.name}
          </span>

          {/* <span style={{
            ...style.full,
            color: Colors.gray
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
              <b>{data.region}</b>
            </span>
          </span> */}

          {/* <div style={style.full}>
            <Ratings value={data.rating} />
          </div> */}
        </div>
        <div style={{
          width: '40%',
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
            {
              data.proposal != null && (
                <Button
                  title={HelperConfig.ACCOUNT_TYPE == 'Freelancer' ? 'Message Agent' : 'Message Helpa'}
                  onClick={() => {
                    if (this.props.payload && this.props.payload == 'preview') {
                      //
                    } else {
                      this.props.navigate('/messages/' + data.proposal.code)
                    }
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    color: Colors.primary,
                    border: 'solid 1px ' + Colors.primary
                  }}
                  className="invert-color" />
              )
            }


            {
              data.proposal == null && HelperConfig.ACCOUNT_TYPE == 'Freelancer' && (
                <Button
                  title={'Submit proposal'}
                  onClick={() => {
                    if (this.props.payload && this.props.payload == 'preview') {
                      //
                    } else {
                      this.props.submitProposal(data)
                      // this.setState({
                      //   confirmFlag: true
                      // })
                    }
                  }}
                  style={{
                    backgroundColor: Colors.primary,
                    color: Colors.white,
                    border: 'solid 1px ' + Colors.primary,
                    marginLeft: 20
                  }}
                  className="invert-color" />
              )
            }
          </span>

          <span style={{
            color: Colors.primary,
            width: '100%',
            textAlign: 'right',
            float: 'left',
            marginTop: 25
          }}
            className="href-link"
          >
            <p style={{
              fontWeight: 'bold',
              textDecoration: 'underline'
            }}
              onClick={() => {
                this.props.navigate('/terms_and_conditions')
              }}
            >
              View KeyHelpa's terms & conditions
            </p>
          </span>
        </div>
      </div>
    )
  }

  render() {
    const { data } = this.props;
    const { confirmFlag } = this.state;
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
          data && data.proposal && data.proposal.job && this.header(data)
        }

        {
          data && data.proposal && data.proposal.job && (
            <ContentJobContract
              data={data}
              from={'jobs'}
              submitProposal={(data) => {
                this.props.submitProposal(data)
              }}
              cancelProposal={(data) => {
                this.setState({
                  confirmFlag: true
                })
              }}
            />
          )
        }

        {
          data && data.proposal && data.proposal.job === undefined && (
            <div style={{
              textAlign: 'center',
              paddingTop: '5%'
            }}>
              <h2>No job details</h2>
            </div>
          )
        }

        {
          data && data.proposal && data.proposal.job && (
            <div style={{
              width: '100%',
              float: 'left'
            }}
              className="show-on-mobile full-width-mobiles">
              <Button
                title={'Message agent'}
                onClick={() => {
                  if (this.props.payload && this.props.payload == 'preview') {
                    //
                  } else {
                    this.props.navigate('/messages')
                  }
                }}
                style={{
                  backgroundColor: 'red',
                  color: Colors.primary,
                  float: 'left',
                  marginBottom: 25,
                  width: '100%',
                  border: 'solid 1px ' + Colors.primary
                }}
                className="invert-color" />

              {
                HelperConfig.ACCOUNT_TYPE == 'Freelancer' && (
                  <Button
                    title={'Submit proposal'}
                    onClick={() => {
                      if (this.props.payload && this.props.payload == 'preview') {
                        //
                      } else {
                        this.props.submitProposal(data)
                      }
                    }}
                    style={{
                      backgroundColor: Colors.primary,
                      color: Colors.white,
                      width: '100%',
                      marginBottom: 25,
                      float: 'left',
                      border: 'solid 1px ' + Colors.primary
                    }}
                    className="invert-color" />
                )
              }


              <p style={{
                fontWeight: 'bold',
                color: Colors.primary,
                textAlign: 'center',
                textDecoration: 'underline'
              }}
                onClick={() => {
                  this.props.navigate('/terms_and_conditions')
                }}
                className="href-link">
                View KeyHelpa's Terms And Conditions
              </p>
            </div>
          )
        }

        {
          confirmFlag && (
            <ConfirmationModal
              show={confirmFlag}
              onCancel={() => {
                this.setState({
                  confirmFlag: false
                })
              }}
              onContinue={() => {
                this.setState({
                  confirmFlag: false
                })
                setTimeout(() => {
                  this.props.submitProposal(data)
                }, 100)

              }}
            />
          )
        }
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

