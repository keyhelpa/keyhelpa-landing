import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors'
import Ratings from 'modules/generic/form/Rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import Button from 'components/increment/generic/form/Button'
import ProfilePicture from 'modules/generic/card/profilePicture'
import HireModal from 'modules/generic/modal/iconText'
import SendInviteModal from 'modules/generic/modal/SendInvite'
import Image from 'assets/img/successful_hired.png'
import Common from '../helper/Common';
import { SvgIcon } from '@mui/material';
import { HelpOutline, Verified, WarningAmber, WarningRounded } from '@mui/icons-material';
import { BasicStyles } from 'common'
import { faFacebookF, faInstagram, faLinkedinIn, faYoutube } from '@fortawesome/fontawesome-free-brands'
import IconTextModal from '../modal/iconText'
import API from 'services/api'
import Routes from 'common/Routes'

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hireModal: false,
      modal: null,
      jobs: null,
      selectJobs: false
    }
  }

  componentDidMount() {
    this.retrieveJobs()
  }

  retrieveJobs(status = 'published') {
    const { data } = this.props
    const { user } = this.props.state;
    if (user == null) return
    if (data == null) return
    this.setState({
      isLoading: true
    })
    API.request(Routes.jobRetrieve, {
      condition: [{
        value: user.id,
        column: 'account_id',
        clause: '='
      }, {
        value: status,
        column: 'status',
        clause: '='
      }],
      account_id: data.id
    }, response => {
      this.setState({
        isLoading: false
      })
      if (response && response.data && response.data.length > 0) {
        this.setState({
          jobs: response.data
        })
      } else {
        this.setState({
          jobs: null
        })
      }
    }, error => {
      this.setState({
        isLoading: false
      })
    })
  }

  checkJobs(payload) {
    const { jobs } = this.state;
    if (jobs == null) {
      if (payload == 'hire') {
        this.setState({
          modal: {
            title: 'Create a job',
            description: 'Unfortunately, you cannot hire a candidate until you have created at least one job. Please create a job and new candidates will open up for you.',
            icon: WarningRounded,
            type: 'icon',
            actions: [{
              title: 'Create a job'
            }]
          }
        })
      } else if (payload == 'interview') {
        this.setState({
          modal: {
            title: 'Create a job',
            description: 'Unfortunately, you cannot interview a candidate until you have created at least one job. Please create a job and new candidates will open up for you.',
            icon: WarningRounded,
            type: 'icon',
            actions: [{
              title: 'Create a job'
            }]
          }
        })
      } else {
        this.setState({
          modal: {
            title: 'Create a job',
            description: 'Unfortunately, you cannot invite a candidate until you have created at least one job. Please create a job and new candidates will open up for you.',
            icon: WarningRounded,
            type: 'icon',
            actions: [{
              title: 'Create a job'
            }]
          }
        })
      }
    } else {
      // this.props.history.push('/jobs/create')
      // invite here
      this.setState({
        selectJobs: true
      })
    }
  }

  renderDetails(data) {
    return (
      <div style={{
        width: '100%',
        float: 'left'
      }}>
        {
          data.experience && (
            <span style={{
              ...style.full,
              padding: 0
            }}
              className="center-on-mobile"
            >
              <h3 style={{
                fontSize: 18,
                color: Colors.gray,
                fontWeight: 'bolder',
              }}>{data.experience.title}</h3>
            </span>
          )
        }

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
                fontWeight: 600
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

          <span style={{
            paddingLeft: 5,
            paddingRight: 5,
            backgroundColor: Colors.gray,
            color: Colors.white,
            borderRadius: 2,
            fontSize: (BasicStyles.fontSize - 2),
            marginLeft: 20
          }}>
            <small>VACCINATED</small>
          </span>
        </div>
        {
          data.work_preference && data.work_preference.region && (
            <span style={{
              ...style.full,
              color: Colors.lighterText,
              padding: 0
            }}
              className="center-on-mobile"
            >
              <span style={{
              }}>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  color={Colors.lighterText}
                  style={{
                    marginRight: 5
                  }}
                />
                {data.work_preference.region}
              </span>
            </span>
          )
        }
        {
          data.rating && (
            <div
              style={style.full}
              className="center-on-mobile"
            >
              <Ratings value={data.rating} />
            </div>
          )
        }

      </div>
    )
  }

  renderActions() {
    const { data } = this.props;
    return (
      <span style={{
        float: 'right',
        width: '100%',
        textAlign: 'right',
        marginTop: 25
      }}
        className="float-left-mobile"
      >
        {
          data && data.proposal == null && (
            <Button
              title={'Invite'}
              onClick={() => {
                this.checkJobs('invite')
              }}
              style={{
                backgroundColor: 'transparent',
                color: Colors.primary,
                border: 'solid 1px ' + Colors.primary
              }}
              className="invert-color full-width-mobile mb-mobile-25"
            />
          )
        }

        {
          data && data.proposal && data.proposal.category == 'invite' && (
            <Button
              title={'Interview'}
              onClick={() => {
                this.checkJobs('interview')
              }}
              style={{
                backgroundColor: 'transparent',
                color: Colors.primary,
                border: 'solid 1px ' + Colors.primary,
                marginRight: 20
              }}

              className="invert-color full-width-mobile mb-mobile-25"
            />
          )
        }
        {
          data && data.proposal && data.proposal.category == 'interview' && (
            <Button
              title={'Hire'}
              onClick={() => {
                this.checkJobs('hire')
              }}
              style={{
                backgroundColor: 'transparent',
                color: Colors.primary,
                border: 'solid 1px ' + Colors.primary
              }}

              className="invert-color full-width-mobile mb-mobile-25"
            />
          )
        }
        {
          data && data.proposal && (
            <Button
              title={'View messages'}
              onClick={() => {
                this.props.history.push('/messages/' + data.proposal.code)
              }}
              style={{
                backgroundColor: 'transparent',
                color: Colors.primary,
                border: 'solid 1px ' + Colors.primary,
                marginRight: 20
              }}

              className="invert-color full-width-mobile mb-mobile-25"
            />
          )
        }
      </span>
    )
  }
  header(data) {
    return (
      <div style={{
        borderBottom: 'solid 1px ' + Colors.headerGray,
        ...style.full,
      }}
      >

        <div style={{
          width: '60%',
          float: 'left',
          paddingBottom: 20,
          padding: 20,
        }}
          className="full-width-mobile"
        >

          <div style={{
            float: 'left',
            marginRight: 20
          }}
            className="center-on-mobile mb-mobile-25"
          >
            <ProfilePicture
              size={150}
            />
          </div>

          <div style={{
            float: 'left',
            width: '70%'
          }}
            className="full-width-mobile"
          >
            {
              this.renderDetails(data)
            }
          </div>

        </div>
        <div style={{
          width: '40%',
          float: 'left',
          paddingRight: 20
        }}
          className="full-width-mobile hide-on-mobile"
        >
          <div style={{
            width: '100%',
            flaot: 'left'
          }}
          >
            {
              this.renderActions()
            }
          </div>

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
              textDecoration: 'underline',
            }}
              onClick={() => {
                this.props.history.push('/terms_and_conditions')
              }}
              className="cursor-hover"
            >
              View KeyHelpa's terms & conditions
            </p>
          </span>
        </div>

      </div>
    )
  }
  renderModal() {
    const { hireModal } = this.state;
    return (
      <HireModal
        show={hireModal}
        type={'image'}
        src={Image}
        title={'You Hired a Candidate'}
        description={'You hired this candidate. For detailed information about this contract, go to the contacts section. While the offer is awaiting confirmation from the freelancer, it will be displayed as pending.'}
        actions={[{
          title: 'Ok'
        }]}
        onClick={() => {
          this.setState({
            hireModal: false
          })

        }}
        onCancel={() => {
          this.setState({
            hireModal: false
          })
        }}
      />
    );
  }

  renderRow(data) {
    return (
      <span style={style.full}>
        <h4 style={{
          fontWeight: 'bolder'
        }}>{data.value}</h4>
        <p style={{
          fontWeight: 'bold',
          color: Colors.lighterText
        }}>
          {data.label}
        </p>
      </span>
    )
  }
  renderRowPaymentVerified(data) {
    return (
      <span style={style.full}>
        <SvgIcon
          component={Verified}
          style={{
            fontSize: BasicStyles.iconSize,
            color: data.payment_verified ? Colors.primary : Colors.lighterText
          }}
        />
        <b>{data.label}</b>
      </span>
    )
  }
  
  left(data) {
    const socialMedias = Common.getSocialMedia(data.social)
    return (
      <div style={{
        ...style.full,
        paddingLeft: 20,
        paddingRight: 20,
        color: Colors.gray
      }}>

        {
          data.work_preference && this.renderRow({
            value: Common.getAmountWithCurrency(data.work_preference.currency, data.work_preference.hourly_rate) + '/hr',
            label: 'Hourly rate'
          })
        }

        {
          data.work_preference && this.renderRow({
            value: data.work_preference.hours_per_week + ' hours per week',
            label: 'Availability'
          })
        }

        {
          data.experience && data.work_preference && (
            this.experience(data.experience.details.otherData, data.work_preference.categories)
          )
        }

        {
          data.experience && data.experience.details && data.experience.details.otherData && (
            this.license(data.experience.details.otherData)
          )
        }

        {
          this.renderRowPaymentVerified({
            value: data.payment_verified,
            label: 'Payment method verified'
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
        padding: 50,
        paddingTop: 10,
        borderBottom: border ? 'solid 1px ' + Colors.lightGray : 'none',
        color: Colors.gray
      }}
        className="p-20-on-mobile"
      >
        <h3 style={{
          marginBottom: 20,
          color: Colors.gray,
          fontWeight: 'bolder'
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
      }}>
        {
          this.renderText({
            title: 'About the candidate',
            content: () => {
              return (
                <span>
                  <p style={{
                    color: Colors.lighterText
                  }}>
                    {
                      data.description
                    }
                  </p>
                </span>
              )
            }
          }
          )
        }
        <div style={{
          ...style.full
        }}
          className="hide-on-desktop"
        >
          {
            this.renderActions()
          }
        </div>
      </div>
    )
  }

  render() {
    const { data } = this.props;
    const { hireModal, modal, selectJobs, jobs } = this.state;
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
            borderRight: 'solid 1px ' + Colors.headerGray
          }}
            className="full-width-mobile remove-border-right-on-mobile"
          >
            {
              this.left(data)
            }
          </div>

          <div style={{
            width: '80%',
            float: 'left'
          }}
            className="full-width-mobile"
          >
            {
              data.experience && this.right(data.experience)
            }
          </div>
        </div>
        {
          hireModal && (this.renderModal())
        }
        {
          modal && (
            <IconTextModal
              show={true}
              title={modal.title}
              src={modal.icon}
              type={modal.type}
              description={modal.description}
              actions={modal.actions}
              textStyle={{
                color: Colors.lighterText
              }}
              onCancel={() => {
                this.setState({
                  modal: null
                })
              }}
              onClick={(item) => {
                if (item.title == 'Create a job') {
                  this.props.history.push('/jobs/create')
                }
              }}
            />
          )
        }
        {
          selectJobs && (
            <SendInviteModal
              show={true}
              title={'Send invite'}
              data={jobs}
              candidate={data}
              onCancel={() => {
                this.setState({
                  selectJobs: false
                })
              }}
              onComplete={() => {
                this.props.history.push('/proposals')
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
  },
  icon: {
    width: 40,
    height: 40,
    float: 'left',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: 20,
    backgroundColor: Colors.primary,
    color: Colors.white
  }
}
const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('reduxhandler');
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));

