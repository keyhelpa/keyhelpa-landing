import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextInput from "components/increment/generic/form/TextInput"
import Colors from 'common/Colors'
import { faLock, faCreditCard, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Color } from 'common';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeComponent from 'components/increment/generic/paymentMethods/StripeComponent';
import config from 'config';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import stripe_logo from 'assets/img/stripe_logo.png'
import { Delete } from "@mui/icons-material";
import { SvgIcon } from '@mui/material'
import Button from 'components/increment/generic/form/Button'
import API from 'services/api'
import Routes from 'common/Routes'
import Footer from '../button/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcAmex, faCcDiscover, faCcDinersClub } from '@fortawesome/fontawesome-free-brands';
import Confirmation from 'modules/generic/modal/confirmation'

const cardList = [
  {
    name: 'Visa',
    icon: faCcVisa,
  },
  {
    name: 'Matercard',
    icon: faCcMastercard,
  },
  {
    name: 'American Express',
    icon: faCcAmex,
  },
  {
    name: 'Discover',
    icon: faCcDiscover,
  },
  {
    name: 'Diners',
    icon: faCcDinersClub,
  },
  {
    name: 'China UnionPay',
    icon: faCreditCard,
  },
  {
    name: 'Japan Credit Bureau',
    icon: faCcAmex,
  },
]

class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.stripeRef = React.createRef();
    this.state = {
      errorAccountName: null,
      accountName: null,
      errorAccountNumber: null,
      accountNumber: null,
      errorBSB: null,
      bsb: null,
      isLoading: false,
      isAuthorize: false,
      errorMessage: null,
      paymentMethod: null,
      clientSecret: null,
      data: [],
      confirm: false,
      toBeDeletedId: null,
      customerId: null,
    };
  }

  componentDidMount() {
    this.retrieve();
  }

  retrievePaymentMethods(callback) {
    const { user } = this.props.state;
    if (user == null) return null;
    let params = {
      condition: [
        {
          column: 'account_id',
          clause: '=',
          value: user.id
        }
      ]
    }
    this.setState({ isLoading: true })
    API.request(Routes.retrievePaymentMethods, params, response => {
      this.setState({ isLoading: false })
      if (response.data !== null) {
        callback(response.data)
      } else {
        callback(null);
      }
    })
  }

  retrieve() {
    const { user } = this.props.state;
    if (user == null) return null
    this.retrievePaymentMethods((res => {
      if (res == null) {
        this.setState({ paymentMethod: null })
        this.setState({ isLoading: true })
        API.request(Routes.createPaymentIntent, { email: user.email }, response => {
          this.setState({ isLoading: false })
          if (response.data) {
            this.setState({ clientSecret: response.data.client_secret, data: response.data })
          }
        })
      } else {
        let method = res.details.details.source.card.brand
        let card = cardList.filter(item => { return item.name === method })
        res['icon'] = card.length > 0 ? card[0].icon : faCreditCard
        this.setState({ paymentMethod: res })
      }
    }));
  }

  confirmDelete(id, customerId) {
    this.setState({
      toBeDeletedId: id,
      customerId: customerId,
      confirm: true
    })
  }


  removeMethod() {
    const { toBeDeletedId, customerId } = this.state
    this.setState({ isLoading: true })
    let params = {
      id: toBeDeletedId,
      customer_id: customerId
    }
    API.request(Routes.deleteMethods, params, response => {
      this.setState({ confirm: false, errorMessage: null })
      this.retrieve()
    })
  }


  handleNext(isAuthorize) {
    const { user } = this.props.state;
    console.log('----------', isAuthorize);
    if (this.state.paymentMethod === null) {
      this.setState({ errorMessage: 'Banking details is not yet authorize' })
      console.log('========[ERROR]: authorize your banking details')
    } else {

      const { login } = this.props;
      const { token } = this.props.state;
      login({
        ...user,
        status: '/setup/verification'
      }, token)
      this.setState({ errorMessage: null })
      this.props.history.push('/setup/verification')
    }
  }

  renderMethodList(paymentMethod) {
    return (
      <div style={{
        width: '100%',
        marginRight: '5%',
        float: 'left'
      }}>
        <div style={{
          width: '100%',
          height: 150,
          marginBottom: 25,
          alignContent: 'center',
          alignItems: 'center',
          borderRadius: 25,
          float: 'right',
          padding: 30,
          color: Colors.gray,
          backgroundColor: Colors.activeGray
        }}>
          <div style={{ float: 'right', cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faTrash} color={Colors.danger} size="2x" onClick={() => this.confirmDelete(paymentMethod.id, paymentMethod.details.token)} />
          </div>
          <div>
            <p>
              <b>Account Number:</b> {'*********' + paymentMethod.details.details.source.card.last4}
            </p>
            <p><b>Expiry Date:</b> {paymentMethod.details.details.source.card.exp_month + '/' + paymentMethod.details.details.source.card.exp_year}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={paymentMethod.icon} size="2x" />
          </div>
        </div>
      </div>
    )
  }

  renderLeft() {
    const { data, clientSecret, paymentMethod, isLoading } = this.state
    console.log(paymentMethod);
    return (
      <div style={{
        width: '100%',
        marginRight: '5%',
        float: 'left',
        marginBottom: 25
      }}
        className="full-width-mobile">
        <Elements stripe={loadStripe(config.stripe.pk)} options={{ clientSecret: clientSecret }}>
          <p style={{ color: Color.danger }}>{this.state.errorMessage}</p>
          <ElementsConsumer>
            {({ stripe, elements }) => (
              <StripeComponent
                bill={true}
                stripeFunc={this.stripeRef}
                {...this.props}
                isLoading={isLoading}
                stripe={stripe} elements={elements}
                retrievePaymentMethods={() => this.retrieve()}
              />
            )}
          </ElementsConsumer>
        </Elements>
      </div>
    )
  }

  renderRight() {
    const { user } = this.props.state;
    return (
      <div style={{
        width: '100%',
        minHeight: 150,
        marginBottom: 25,
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        float: 'right',
        padding: 30,
        color: Colors.gray,
        backgroundColor: Colors.activeGray
      }}>
        <span>
          <p>
            Please provide your online banking details KeyHelpa uses Stripe for secure payments and financial services.
          </p>
          <div>
            <img src={stripe_logo} style={{ width: '70px', height: 'auto' }}></img>
          </div>
        </span>
      </div>
    )
  }

  render() {
    const { isLoading, paymentMethod, clientSecret, confirm } = this.state
    return (
      <div style={{
        width: '100%',
        float: 'left',
      }}>
        <div className="container-100" style={{ marginBottom: '2%' }}>
          <div className="container-45-full-mobile" style={{ marginRight: 100 }}>
            {
              !isLoading && paymentMethod == null && clientSecret != null && (
                this.renderLeft()
              )
            }
            {
              isLoading && (
                <Skeleton height={200} style={{ marginBottom: 20, borderRadius: 5 }} />
              )
            }
            {
              !isLoading && paymentMethod !== null && (
                this.renderMethodList(paymentMethod)
              )
            }
          </div>
          <div style={{ width: '45%' }} className="container-45-full-mobile">
            {this.renderRight()}
          </div>
        </div>

        {
          this.props.agent && this.props.agent === true && (
            <div style={{ width: '100%' }}>
              <p style={{
                color: Colors.gray,
                fontSize: '14px',
              }}><b>Payment logic:</b> Your credit card will be deducted for the amount equal to a 1-week payment, until
                the job contract is completed or cancelled.<br /><br />

                <b>Payments day:</b> On Monday of each week for the duration of the term of the contract the freelancer
                submits a payment request. The payment is equal to "weekly payment''. Payer receives a notification
                email of payment due. The payer is not required to take any action unless he/she declines the
                payment by clicking the decline link.<br /><br />

                <b>Decline payment:</b> Payer is required to provide reasons for the cancellation of the contract and for
                declining payment. A notification is sent to the freelancer for their reply. The payment held in Stripe
                is held in Keyhelpa's disputed account until the dispute is settled within the terms and conditions.</p>
            </div>
          )
        }
        <Confirmation
          show={confirm}
          message={'Are you sure you want to remove your billing details?'}
          onContinue={() => this.removeMethod()}
          onCancel={() => {
            this.setState({ confirm: false })
          }}
        />

        {
          this.props.location.pathname.includes('setup') && (
            <div style={{
              width: '100%',
              float: 'left',
              marginBottom: 100
            }}>
              <Footer
                onNext={() => {
                  this.handleNext(this.state.isAuthorize)
                }}
              />
            </div>
          )
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('reduxhandler');
  return {
    login: (user, token) => { dispatch(actions.login(user, token)) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Billing));

