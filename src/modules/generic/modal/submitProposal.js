import React from 'react';
import Colors from 'common/Colors'
import { Modal } from 'react-bootstrap'
import ModalHeader from './header'
import ModalFooter from './footer'
import Style from './style'
import CheckBox from 'modules/generic/form/CheckBox'
import TextInput from "components/increment/generic/form/TextInput"
import TextArea from 'components/increment/generic/form/TextArea'
import { connect } from 'react-redux';
import { withRouter,Link } from 'react-router-dom';
import API from 'services/api'
import Routes from 'common/Routes'
import Helper from 'modules/generic/helper/Common'
import { SvgIcon } from '@mui/material';
import { HelpOutline } from '@mui/icons-material';
import { BasicStyles } from 'common';

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      errorMessage: null,
      terms: [],
      con: false,
      service: false,
      isLoading: false,
      image: null,
      actions: [{
        title: 'Submit proposal',
        isLoading: false
      }],
      hourlyRate: 0,
      hourlyRateError: null,
      currency: 'AUD',
      admin_fees: 0
    };
  }

  componentDidMount() {
    const { data } = this.props;
    let parameter = {
      condition: [{
        column: 'payload',
        value: 'service_fee',
        clause: '='
      }, {
        column: 'category',
        value: 'service_fee',
        clause: '='
      }]
    }
    API.request(Routes.payloadsRetrieve, parameter, response => {
      if (response.data) {
        this.setState({
          admin_fees: response.data[0].payload_value
        })
      }
    })
    // if (data && data.proposal == null) {
    //   this.retrieveHourlyRate()
    // }
    if (data && data.proposal == null && data.job_terms) {
      this.setState({
        // hourlyRate: data.amount > 0 ? data.amount : 0,
        currency: data.job_terms.currency
      })
    } else if (data && data.proposal !== null && (data.proposal.category !== 'invite')) {
      this.setState({
        hourlyRate: data.proposal.amount,
        currency: data.proposal.currency,
        actions: [{
          title: 'Update proposal',
          isLoading: false
        }]
      })
    }
    if (data && data.proposal && data.proposal.category !== 'invite') {
      this.setState({
        message: data.proposal?.details.message,
        // image: data.proposal !== null ? JSON.parse(data.proposal.details).cv : null,
        terms: data.proposal?.details.terms
      })
    }
  }

  retrieveHourlyRate() {
    const { user } = this.props.state;
    let parameter = {
      condition: [{
        column: 'account_id',
        value: user.id,
        clause: '='
      }]
    }
    API.request(Routes.workPreferenceRetrieve, parameter, response => {
      if (response.data.length > 0) {
        this.setState({
          hourlyRate: response.data[0].hourly_rate
        })
      }
    })
  }

  setLoading(param, value) {
    const { actions } = this.state;
    let newActions = actions.map(item => {
      if (item.title === param.title) {
        return {
          ...item,
          isLoading: value
        }
      }
    })
    this.setState({
      actions: newActions
    })
  }

  updateInvite() {
    const { data } = this.props;
    const { hourlyRate, currency, message, terms } = this.state;
    if (data && data.proposal == null) return
    if (hourlyRate < 1) {
      this.setState({
        errorMessage: 'Hourly rate must be greater than A$1'
      })
      return
    }
    if (message == null || message === '') {
      this.setState({
        errorMessage: 'Message is required.'
      })
      return
    }
    let parameter = {
      id: data.proposal.id,
      to: data.account_id,
      category: 'invite',
      category_status: 'accepted',
      amount: hourlyRate,
      currency: currency,
      details: JSON.stringify({
        message: message,
        terms: terms
      })
    }
    API.request(Routes.proposalUpdate, parameter, response => {
      if (response && response.data) {
        this.props.history.push('/proposals')
      }
    }, error => {
      console.log('[error]', error)
    })
  }

  update(param) {
    const { data } = this.props
    const { hourlyRate, currency, message, terms } = this.state;
    this.setState({
      errorMessage: null
    })
    let cons = terms.filter(el => { return el.value === 'conditions' });
    let serve = terms.filter(el => { return el.value === 'service_fee' });
    let percentage = terms.filter(el => { return el.value === 'percent' });
    if (data && data.proposal == null) return
    if (hourlyRate === 0 || hourlyRate < 0) {
      this.setState({
        errorMessage: 'Hourly rate must be greater than A$1'
      })
      return
    }

    if (message == null || message === '') {
      this.setState({
        errorMessage: 'Message is required.'
      })
      return
    }

    if (cons.length === 0 || serve.length === 0 || percentage.length === 0) {
      this.setState({
        errorMessage: 'Terms are required.'
      })
      return
    }
    this.setLoading(param, true)
    let parameter = {
      id: data.proposal.id,
      to: data.account_id,
      category: data.proposal.category,
      category_status: data.proposal.category_status,
      status: data.proposal.status,
      amount: hourlyRate,
      currency: currency,
      details: JSON.stringify({
        message: message,
        terms: terms
      })
    }
    this.setLoading(param, true)
    API.request(Routes.proposalUpdate, parameter, response => {
      this.setLoading(param, false)
      if (response && response.data) {
        this.props.onCancel()
        this.props.history.push('/proposals')
      } else {
      }
    }, error => {
      this.setLoading(param, false)
    })
  }
  submit(param) {
    const { message, terms, image, con, service, hourlyRate, currency } = this.state;
    this.setState({
      errorMessage: null
    })
    let cons = terms.filter(el => { return el.value === 'conditions' });
    let serve = terms.filter(el => { return el.value === 'service_fee' });
    let percentage = terms.filter(el => { return el.value === 'percent' });
    const { data } = this.props;
    const { user } = this.props.state;
    if (data == null) return null
    if (user == null) return null
    if (hourlyRate === 0 || hourlyRate < 0) {
      this.setState({
        errorMessage: 'Hourly rate must be greater than A$1'
      })
      return
    }
    if (message == null || message === '') {
      this.setState({
        errorMessage: 'Message is required.'
      })
      return
    }
    if (cons.length === 0 || serve.length === 0 || percentage.length === 0) {
      this.setState({
        errorMessage: 'Please accept and acknowledge the following terms and conditions.'
      })
      return
    }

    let parameter = {
      account_id: data.account_id,
      freelancer: user.id,
      merchant_id: data.merchant_id,
      category: 'proposals',
      job_id: data.id,
      category_status: 'pending',
      status: 'pending',
      amount: hourlyRate,
      currency: currency,
      type: 'proposals',
      to: data.account_id,
      details: JSON.stringify({
        message: message,
        terms: terms
      })
    }
    this.setLoading(param, true)
    API.request(Routes.proposalCreate, parameter, response => {
      this.setLoading(param, false)
      if (response && response.data) {
        if (data && data.proposal && data.proposal.category === 'invite' && data.proposal.category_status === 'pending') {
          this.updateInvite()
        } else {
          this.props.history.push('/proposals')
        }
      } else {
      }
    }, error => {
      this.setLoading(param, false)
    })

  }

  // Format: (Custom)
  renderDetails() {
    const { data } = this.props;
    const { hourlyRateError, hourlyRate, currency } = this.state;
    return (
      <div>
        <div style={{
          width: '100%',
          float: 'left'
        }}>
          {/* <span style={{
            width: '100%'
          }}>
            {
              data && data.job && data.job.job_terms && (
                <h4 style={{
                  fontWeight: 'bolder'
                }}>{Helper.getAmountWithCurrency(data.job.job_terms.curreny, data.job.job_terms.hourly_rate)}</h4>
              )
            }

            {
              data && data.job_terms && (
                <h4 style={{
                  fontWeight: 'bolder'
                }}>{Helper.getAmountWithCurrency(data.job_terms.curreny, data.job_terms.hourly_rate)}</h4>
              )
            }

            <p style={{
              fontWeight: 'bold',
              color: Colors.lightGray
            }}>
              Agent hourly rate
            </p>

          </span> */}


          <span style={{
            width: '100%',
            float: 'left',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 15,
            paddingTop: 15,
            borderBottom: BasicStyles.borderBottomColor
          }}>
            {/* <h4 style={{
              fontWeight: 'bolder'
            }}>$70.00/hr</h4>
            <p style={{
              fontWeight: 'bold',
              color: Colors.lightGray
            }}>
              Your propose hourly rate
            </p> */}
            <b>
              Your propose hourly rate
            </b>

            <div>
              <TextInput
                placeholder={'Hourly rate'}
                type={"number"}
                style={{
                  background: 'transparent',
                  borderBottom: 'none'
                }}
                value={hourlyRate}
                onChange={(hourlyRate, hourlyRateError) => {
                  this.setState({
                    hourlyRate, hourlyRateError
                  })
                }}
                inputStyle={{
                  textAlign: 'right',
                  paddingRight: 0
                }}
                validation={{
                  type: 'number',
                  size: 3,
                  column: 'Hourly rate',
                  error: hourlyRateError
                }}
              />
            </div>
          </span>
        </div>
        <div style={{
          width: '100%',
          float: 'left',
          marginTop: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 25,
          paddingTop: 15,
          borderBottom: BasicStyles.borderBottomColor
        }}>
          <b>
            KeyHelpa's service fee is {this.state.admin_fees}%
            <SvgIcon component={HelpOutline}
              style={{
                fontSize: BasicStyles.iconSize
              }}
              className="cursor-hover"
            />

          </b>

          <b>{Helper.getFeeCalculation({
            type: 'percentage',
            fee: this.state.admin_fees
          }, hourlyRate, currency)}</b>
        </div>

        <div style={{
          width: '100%',
          float: 'left',
          marginTop: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 25,
          paddingTop: 15,
          borderBottom: BasicStyles.borderBottomColor
        }}>
          <b>
            You'll receive
            <SvgIcon component={HelpOutline}
              style={{
                fontSize: BasicStyles.iconSize
              }}
              className="cursor-hover"
            />

          </b>
          <b>{Helper.getReceiveFeeCalculation({
            type: 'percentage',
            fee: this.state.admin_fees
          }, hourlyRate, currency)}</b>
        </div>
        {/* <div style={{
          width: '100%',
          float: 'left',
          backgroundColor: Colors.activeGray,
          minHeight: 100,
          overflowY: 'hidden',
          borderRadius: 12,
          padding: 10,
          fontWeight: 'bold',
          marginTop: 20
        }}>
          <p style={{
            color: Colors.primary
          }}>KeyHelpa's service fee is 11%</p>
          <p>
            You will be charged an 11% service fee on all money earned for the duration of this job.
          </p>
          <p>On this job your weekly earn is {Helper.getAmountWithCurrency(data.job_terms.curreny, data.job_terms.details.weekly_payment)} less service fee of {data.job_terms.details.weekly_payment * .11} = ${(Helper.getAmountWithCurrency(data.job_terms.curreny, (data.job_terms.details.weekly_payment - (data.job_terms.details.weekly_payment * .11))))}</p>
        </div> */}
      </div>
    )
  }

  body() {
    const { message, errorMesssage, terms } = this.state;
    return (
      <Modal.Body style={{
        paddingLeft: 20,
        paddingRight: 20,
        maxHeight: '60vh',
        overflowY: 'scroll'
      }}>
        {
          this.state.errorMessage !== null && (
            <div>
              <p style={{
                color: Colors.dangerText
              }}>
                {this.state.errorMessage}
              </p>
            </div>
          )
        }

        {
          this.renderDetails()
        }

        <div style={{
          width: '100%',
          float: 'left',
          marginTop: 25
        }}>


          <TextArea
            placeholder={'Message to the hiring agent'}
            type={"text"}
            style={{
              background: 'transparent',
              paddingLeft: 0,
              paddingRight: 0,
              minHeight: 150
            }}
            inputStyle={{
              height: 150
            }}
            value={message}
            rows={15}
            onChange={(message, errorMesssage) => {
              if (message.length <= 150) {
                this.setState({
                  message, errorMesssage
                })
              }

            }}
            validation={{
              type: 'text_without_space',
              size: 0,
              column: 'Message',
              error: errorMesssage
            }}
          />
          <p style={{
            color: Colors.lightGray
          }}>
            In less than 150 words tell the hiring agent why you’re the perfect fit for the job.
          </p>
        </div>

        {/* <div style={{
          width: '100%',
          float: 'left'
        }}>
          <b style={{
            marginTop: 10,
            marginBottom: 10,
            float: 'left',
            width: '100%'
          }}>
            Upload your CV
          </b>
          <FileUpload
            style={{ width: 100 }}
            accepted={{ format: "application/pdf,image/*" }}
            category={'proposal'}
            route={'proposal'}
            image_url={(image) => {
              this.setState({
                image: image
              })
            }}
            layout={true} />
        </div> */}


        <div style={{
          float: 'left',
          marginTop: 25
        }}>
          <CheckBox
            data={[{
              title: "Yes, I understand and agree to KeyHelpa's Terms of Conditions, including the Privacy Policy",
              value: 'conditions',
              component: () => {
                return (
                  <span style={{ marginLeft: 12, textAlign: 'left' }}>
                    Yes, I understand and agree to KeyHelpa's
                    <Link to= "/helpa/terms_and_conditions" target="_blank" rel="noopener noreferrer">
                    <b style={{
                      color: Colors.primary
                    }}
                    >Terms of Conditions</b>
                    , including the
                    </Link>

                  <Link to="/helpa/privacy_policy" target="_blank" rel="noopener noreferrer">
                    <b style={{
                      color: Colors.primary
                    }}
                    >Privacy Policy</b>
                    </Link>
                  </span>
                )
              }
            }, {
              title: `Yes, I understand that I will be charged by KeyHelpa Pty Ltd an ${this.state.admin_fees}% service fee on all earned money for the lifetime of this job.`,
              value: 'service_fee'
            }, {
              title: "I acknowledge that the work I, or any entity I control, undertake is done so as a Personal Services Business. More specifically, no more than 80% of the annual revenue derives from less than 20% of the clients/customers for whom the work is performed. To the extent I have any doubt about this position I have confirmed it via appropriate, independent, advice.",
              value: 'percent'
            }]}
            selected={terms}
            onChange={async (item) => {
              await this.setState({
                terms: item
              })
            }}
          />
        </div>
      </Modal.Body>

    )
  }

  getTitle(data){
    if(data == null){
      return null
    }
    if(data.proposal){
      if(data.proposal.job){
        return data.proposal.job.title
      }
    }else{
      return data.title
    }
  }
  render() {
    const { feedbackText, errorText, actions } = this.state;
    const { data } = this.props;
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.onCancel()}
        style={Style.modal}
      >

        <ModalHeader
          title={data && data.proposal && data.proposal.category !== 'invite' ? 'Update proposal' : 'Submit proposal'}
          subTitle={(data && data.proposal ? 'Update' : 'Submit') + ' proposal for job' + ' "' + this.getTitle(data) + '" '}
          onCancel={() => this.props.onCancel()}
        />

        {
          this.body()
        }


        <ModalFooter
          actions={actions}
          onClick={(param) => {
            if (data && data.proposal === null && param.title === 'Submit proposal' || (data.proposal.category === 'invite')) {
              this.submit(param)
            } else {
              this.update(param)
            }
          }}
        />
      </Modal>
    )
  }
}


const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('reduxhandler');
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));

