import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors'
import Ratings from 'modules/generic/form/Rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import Button from 'components/increment/generic/form/Button'
import ProfilePicture from 'modules/generic/card/profilePicture'
import ContractModal from 'modules/generic/modal/contract'
import JobsContractContent from './JobsContractContent';
import ContractSubHeader from './ContractSubHeader';
import Common from '../helper/Common';
import { BasicStyles } from 'common'
import { SvgIcon } from '@mui/material';
import { Report, Verified, WarningRounded } from '@mui/icons-material';
import API from 'services/api'
import Routes from 'common/Routes'
import IconTextModal from 'modules/generic/modal/iconText'
import Helper from 'common/Helper';
import String from '../helper/String';
import HelperConfig from 'common/Helper'
import ContractImage from 'modules/generic/modal/contract.png'

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disputeModal: false,
      endModal: false,
      endModalSecond: false,
      endModalThird: false,
      pausePending: false,
      pauseModal: false,
      status: null,
      footerActionDispute: [{
        title: 'Open dispute',
        isLoading: false
      }],
      footerActionPause: [{
        title: 'Pause contract',
        isLoading: false
      }],
      footerActionsEndFirst: [{
        title: 'I understand',
        isLoading: false
      }],
      footerActionsEndSecond: [{
        title: 'End contract',
        isLoading: false
      }],
      attemptsInMonth: 0,
      reachAttempModal: false
    }
  }

  retrieveTotalEndAttempts() {
    //
  }


  hideModal(status) {
    switch (status) {
      case 'end_pending': this.setState({
        endModalSecond: false,
        endModalThird: true
      })
        break
      case 'pause_pending': this.setState({
        pauseModal: false
      })
        break
      case 'dispute_pending': this.setState({
        disputeModal: false
      })
        break
      case 'pause': this.setState({
        pauseModal: false
      })
        break
      case 'dispute': this.setState({
        disputeModal: false
      })
        break
      case 'end': this.setState({
        endModalSecond: false,
        endModalThird: true
      })
        break
    }
  }

  manageModalLoading(value, payload) {
    if (payload == 'pause') {
      const { footerActionPause } = this.state;
      let newAction = footerActionPause.map((item, index) => {
        if (index == 0) {
          return {
            ...item,
            isLoading: value
          }
        }
        return item
      })
      this.setState({
        footerActionPause: newAction
      })
    } else if (payload == 'dispute') {
      const { footerActionDispute } = this.state;
      let newAction = footerActionDispute.map((item, index) => {
        if (index == 0) {
          return {
            ...item,
            isLoading: value
          }
        }
        return item
      })
      this.setState({
        footerActionDispute: newAction
      })
    } else if (payload == 'end') {
      const { footerActionsEndSecond } = this.state;
      let newAction = footerActionsEndSecond.map((item, index) => {
        if (index == 0) {
          return {
            ...item,
            isLoading: value
          }
        }
        return item
      })
      this.setState({
        footerActionsEndSecond: newAction
      })
    }
  }

  submit(params) {
    const { data } = this.props;
    const { user } = this.props.state;

    if (user == null || data == null) return

    this.manageModalLoading(true, data.status)
    let parameter = {
      contract_id: data.id,
      job_id: data.job_id,
      to: Helper.ACCOUNT_TYPE == 'Agent' ? data.freelancer : data.account_id,
      ...params
    };

    if (user.id == data.account_id) { 
      parameter['account_id'] = user.id
    } else {
      parameter['freelancer'] = user.id
      parameter['account_id'] = data.account_id
    }

    API.request(data.status === 'active' ? Routes.contractActionCreate : Routes.contractActionUpdate, parameter, response => {
      this.manageModalLoading(false, data.status)
      if (response && response.data) {
        this.renderSuccessful(params.status)
      }
    }, error => {
      this.manageModalLoading(false, data.status)
    })
  }

  renderDetails(data) {
    return (
      <div>
        {
          data.job && (
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
              }}>{data.job.title}</h3>
            </span>
          )
        }
        <div style={{
          display: 'flex',
          alignItems: 'center',
          ...style.full
        }}
          className="center-on-mobile">
          {
            (data.freelancer_account && data.freelancer_account.information) && (
              <span style={{
                padding: 0,
                color: Colors.gray,
                fontWeight: 600
              }}
              >
                {Common.getCompleteName(data.freelancer_account.information)}
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

          {/* <span style={{
            paddingLeft: 5,
            paddingRight: 5,
            backgroundColor: Colors.gray,
            color: Colors.white,
            borderRadius: 2,
            fontSize: (BasicStyles.fontSize - 2),
            marginLeft: 20
          }}>
            <small>Vaccination</small>
          </span> */}
        </div>
        {
          data.job && (
            <span style={{
              ...style.full,
              color: Colors.gray,
              padding: 0
            }}
              className="center-on-mobile"
            >
              <span style={{
                color: Colors.lighterText
              }}>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  color={Colors.lighterText}
                  style={{
                    marginRight: 5
                  }}
                />
                {data.job.region}
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

  renderActions(data) {
    const { attemptsInMonth } = this.state;
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
          data.status !== 'pending' && (
            <Button
              title={'Pause'}
              onClick={() => {
                this.setState({
                  pauseModal: true
                })
              }}
              style={{
                backgroundColor: 'transparent',
                color: Colors.primary,
                border: 'solid 1px ' + Colors.primary,
                marginRight: 20
              }}
              className="invert-color full-width-mobile mb-mobile-25" />
          )
        }

        {
          data.status !== 'pending' && (
            <Button
              title={'End'}
              onClick={() => {
                if (attemptsInMonth < String.END_CONTRACT_MAX_ATTEMPTS) {
                  this.setState({
                    endModal: true
                  })
                } else {
                  this.setState({
                    reachAttempModal: true
                  })
                }
              }}
              style={{
                backgroundColor: 'transparent',
                color: Colors.primary,
                border: 'solid 1px ' + Colors.primary,
                marginRight: 20
              }}
              className="invert-color full-width-mobile mb-mobile-25" />
          )
        }

        {
          data.status !== 'pending' && (
            <Button
              title={'Dispute'}
              onClick={() => {
                this.setState({
                  disputeModal: true
                })
              }}
              style={{
                backgroundColor: 'transparent',
                color: Colors.primary,
                border: 'solid 1px ' + Colors.primary
              }}
              className="invert-color full-width-mobile mb-mobile-25" />
          )
        }

        {
          data.status === 'pending' && (
            <Button
              title={HelperConfig.ACCOUNT_TYPE == 'Freelancer' ? 'Message Agent' : 'Message Helpa'}
              onClick={() => {
                this.props.navigate('/messages/' + data.proposal.code)
              }}
              style={{
                backgroundColor: 'transparent',
                color: Colors.primary,
                border: 'solid 1px ' + Colors.primary
              }}
              className="invert-color" />
          )
        }

        <span style={{
          color: Colors.primary,
          width: '100%',
          textAlign: 'right',
          float: 'left',
          marginTop: 25
        }}
          className="href-link center-on-mobile"
        >
          <p style={{
            fontWeight: 'bold',
            textDecoration: 'underline',
          }}
          onClick={() => {
            this.props.navigate('/terms_and_conditions')
          }}>
            View KeyHelpa's Terms And Conditions
          </p>
        </span>
      </span>
    )
  }


  header(data) {
    return (
      <div style={{
        borderBottom: 'solid 1px ' + Colors.lightGray,
        ...style.full,
      }}>
        <div style={{
          width: '60%',
          float: 'left',
          paddingBottom: 20,
          padding: 20
        }}
          className="full-width-mobile">

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
          className="hide-on-mobile">

          {
            this.renderActions(data)
          }

        </div>

      </div>
    )
  }

  renderDisputeModal() {
    const { disputeModal, footerActionDispute } = this.state;
    return (
      <ContractModal
        show={disputeModal}
        title={'Open Dispute'}
        withInput={true}
        subTitle={"Are you sure you want to dispute this contract?"}
        message={"disputing this job"}
        actions={footerActionDispute}
        onClick={(data) => {
          this.submit({
            ...data,
            status: Helper.ACCOUNT_TYPE == 'Agent' ? 'dispute' : 'dispute_pending',
            action: 'dispute'
          })
        }}
        onCancel={() => {
          this.hideModal(Helper.ACCOUNT_TYPE == 'Agent' ? 'dispute' : 'dispute_pending')
        }}
      />
    );
  }

  renderPause() {
    const { pauseModal, footerActionPause } = this.state;
    return (
      <ContractModal
        show={pauseModal}
        title={'Pause Contract'}
        subTitle={"Are you sure you want to pause this contract?"}
        withInput={true}
        message={'pausing this job'}
        data={this.props.data}
        actions={footerActionPause}
        onClick={(data) => {
          this.submit({
            ...data,
            status: Helper.ACCOUNT_TYPE == 'Agent' ? 'pause' : 'pause_pending',
            action: 'pause'
          })
        }}
        onCancel={() => {
          this.hideModal(Helper.ACCOUNT_TYPE == 'Agent' ? 'pause' : 'pause_pending')
        }}
      />
    );
  }

  renderEnd() {
    const { endModal, footerActionsEndFirst } = this.state;
    return (
      <IconTextModal
        show={endModal}
        title={'End Contract'}
        subTitle={'Are you sure you want to end this contact?'}
        type={'icon'}
        src={WarningRounded}
        iconColor={{
          color: Colors.primary
        }}
        onCancel={() => {
          this.setState({
            endModal: false
          })
        }}
        list={true}
        description={() => {
          return (
            <div>
              <p>
                General tips to terminate your contract:
              </p>
              <ul className="red-bullet-list">
                {
                  [
                    'Give plenty of notice;',
                    'Communicate with a peaceful state of mind and avoid writing when angry;',
                    'Try to make it fair for both parties;',
                    'Offer an alternate option to the agent;',
                    'You should ensure that you are aware of the obligations you and your hiring agent have so that you do not violate them and find yourself in breach of contract.'
                  ].map(item => (
                    <li>{item}</li>
                  ))
                }
              </ul>
              <span style={{
                borderRadius: 12,
                backgroundColor: Colors.activeGray,
                padding: 5,
                width: '100%',
                float: 'left',
                minHeight: 10,
                marginTop: 25
              }}>
                <b style={{
                  color: Colors.primary,
                  fontStyle: 'italic'
                }}>
                  If you cancel a job 3 times within month, your profile will be blocked automatically.
                </b>
              </span>
            </div>
          )
        }}
        actions={footerActionsEndFirst}
        onClick={(selected) => {
          if (selected.title == 'I understand') {
            // show step 2 modal
            this.setState({
              endModal: false,
              endModalSecond: true
            })
          }
        }}

      />

    )
  }

  renderEndSecond() {
    const { endModalSecond, footerActionsEndSecond } = this.state;
    return (
      <ContractModal
        show={endModalSecond}
        title={'End Contract'}
        data={this.props.data}
        withOption={true}
        actions={footerActionsEndSecond}
        onClick={(data) => {
          this.submit({
            ...data,
            status: Helper.ACCOUNT_TYPE == 'Agent' ? 'end' : 'end_pending',
            action: 'end'
          })
        }}
        feedback={true}
        onCancel={() => {
          this.setState({
            endModalSecond: false
          })
        }}
      />
    );
  }

  renderEndThird() {
    const { endModalThird } = this.state;
    return (
      <IconTextModal
        show={endModalThird}
        title={'Contract ended'}
        subTitle={new Date().toLocaleDateString()}
        type={'image'}
        src={ContractImage}
        iconColor={{
          color: Colors.primary
        }}
        onCancel={() => {
          this.setState({
            endModalThird: false
          })
          this.props.navigate('/contracts')
        }}
        actions={[{
          title: 'Done'
        }]}
        description={"The contract was terminated. Thanks for your work. We wish you good luck with your search."}
        onClick={(selected) => {
          if (selected.title == 'Done') {
            // show step 2 modal
            this.setState({
              endModalThird: false
            })
            this.props.navigate('/contracts')
          }
        }}

      />

    )
  }

  renderSuccessful(status) {
    this.setState({
      status: status
    })
    switch (status) {
      case 'end_pending': this.setState({
        endModalSecond: false,
        endModalThird: true
      })
        break
      case 'pause_pending': this.setState({
        pauseModal: false,
        pausePending: true
      })
        break
      case 'dispute_pending': this.setState({
        disputeModal: false,
        pausePending: true
      })
        break
      case 'pause': this.setState({
        pauseModal: false
      })
        break
      case 'dispute': this.setState({
        disputeModal: false
      })
        break
      case 'end': this.setState({
        endModalSecond: false,
        endModalThird: true
      })
        break
    }
  }

  renderSuccessModal(){
    const { pausePending, status } = this.state;
    return (
      <IconTextModal
        show={pausePending}
        title={'Notice!'}
        type={'icon'}
        src={Report}
        iconColor={{
          color: Colors.primary
        }}
        onCancel={() => {
          this.setState({
            pausePending: false
          })
          this.props.navigate('/contracts')
        }}
        list={true}
        description={() => {
          return (
            <div>
              <p style={{
                textAlign: 'center'
              }}>
                Your request has successfully raised to the agent. Please stay posted.
              </p>
            </div>
          )
        }}
      />
    )
  }

  renderReachAttemptModal() {
    const { reachAttempModal } = this.state;
    return (
      <IconTextModal
        show={reachAttempModal}
        title={'Ooops!'}
        type={'icon'}
        src={Report}
        iconColor={{
          color: Colors.primary
        }}
        onCancel={() => {
          this.setState({
            reachAttempModal: false
          })
        }}
        list={true}
        description={() => {
          return (
            <div>
              <p style={{
                textAlign: 'center'
              }}>
                You have made three attempts to close the contact. Your profile has been blocked.
                <b style={{
                  color: Colors.primary
                }} className="text-underline-hover">Contact Support</b>
              </p>
            </div>
          )
        }}
      />
    )
  }

  render() {
    const { data } = this.props;
    const { disputeModal, endModal, pauseModal } = this.state;
    const { endModalSecond, endModalThird, reachAttempModal, pausePending } = this.state;
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

        <ContractSubHeader data={data} />

        <JobsContractContent data={data.job} from={'contract'} />

        {
          disputeModal && (this.renderDisputeModal())
        }
        {
          endModal && (this.renderEnd())
        }
        {
          pauseModal && (this.renderPause())
        }
        {
          endModalSecond && this.renderEndSecond()
        }
        {
          reachAttempModal && this.renderReachAttemptModal()
        }
        {
          endModalThird && (this.renderEndThird())
        }
        {
          pausePending && (this.renderSuccessModal())
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

