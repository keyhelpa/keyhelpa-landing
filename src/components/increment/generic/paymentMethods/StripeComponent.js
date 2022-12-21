
import React, { useEffect, useState } from 'react'
import {
  PaymentElement,
  CardElement,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';
import Button from 'components/increment/generic/form/Button'
import Colors from 'common/Colors';
import style from './style.js'
import {
  CreditCard
} from "@mui/icons-material";
import { SvgIcon } from '@mui/material'
import API from 'services/api'
import Routes from 'common/Routes'
import config from 'config';


const StripeComponent = (props) => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false)
  // useEffect(() => {
  //   props.stripeFunc.current = handleSubmit
  // }, [])
  const handleSubmit = async (event) => {
    const { user } = props.state;
    const { elements, stripe } = props

    if (!stripe || !elements) {
      return;
    }
    await stripe.createSource(elements.getElement('cardNumber')).then(async res => {
      console.log('------------>><<', res);
      if (res.error) {
        // setError(res.error.message)
      } else {
        setError(null)
        await stripe.createToken(elements.getElement('cardNumber')).then(response => {
          console.log('<<<<<<<<<<<<<<<<<<<<<<<<<', response);
          createMethod(res.source, response)
        })
      }
    }).catch(err => {
      console.log('------------>>[eror]<<', err.error);
      setError(err.error.message)
    })
  }

  const createMethod = (source, token) => {
    const { user } = props.state
    if (!user) return;
    let parameter = {
      source: source,
      code: user.code,
      account_id: user.id,
      email: user.email,
      name: user.information.first_name + ' ' + user.information.last_name,
      status: 'authorized',
      method: 'visa',
      card_token: token.token.id

    }
    if (props.hasNoRoute === undefined) {
      parameter['next_route'] = '/setup/verification'
    }
    setLoading(true)
    API.request(Routes.stripeCreate, parameter, response => {
      setLoading(false)
      props.retrievePaymentMethods()
    })
  }

  const handlePayment_InputChange = (name, label) => (elementData) => {
    //store values

    let stateErrors = errors || {};

    if (!elementData.complete && !elementData.error) {
      stateErrors[name] = `Your ${label} is incomplete or invalid.`;
    } else if (elementData.complete && !elementData.error) {
      setError(null)
      delete stateErrors[name];
    }

    setErrors(stateErrors);
  }

  const renderCardNumber = (name, label, className, type = "text") => {
    let err = errors ? (errors[name] || '') : '';
    return (
      <div>
        <div>
          <label htmlFor="cardNumber" style={{ color: Colors.billingText }}>{label}</label>
          <div style={{
            ...style.fieldStyle,
            float: 'left'
          }}>
            <div style={{
              float: 'left',
              height: 40,
              width: '90%'
            }}>
              <CardNumberElement
                showIcon={true}
                id="cardNumber"
                onChange={handlePayment_InputChange(name, label)}
                options={style.StripeElementsStyles}
              />
            </div>
            <div style={{
              float: 'right'
            }}>
              <SvgIcon component={CreditCard}
                style={{
                  fontSize: 20,
                  float: 'right',
                }}
              />
            </div>
          </div>
        </div>
        {err && <p style={{color: Colors.danger}}>{err}</p>}
      </div>
    )
  }

  const renderCardExpiryElement = (name, label, className, type = "text") => {
    let err = errors ? (errors[name] || '') : '';
    return (
      <div>
        <div>
          <label htmlFor="cardExpiry" style={{ color: Colors.billingText }}>{label}</label>
          <div style={style.fieldStyle}>
            <CardExpiryElement
              id="cardExpiry"
              onChange={handlePayment_InputChange(name, label)}
              options={style.StripeElementsStyles}
            />
          </div>
        </div>
        {err && <p style={{color: Colors.danger}}>{err}</p>}
      </div>
    )
  }


  const renderCardCvcElement = (name, label, className, type = "text") => {
    let err = errors ? (errors[name] || '') : '';
    return (
      <div>
        <div >
          <label htmlFor="cardCvc" style={{ color: Colors.billingText }}>{label}</label>
          <div style={style.fieldStyle}>
            <CardCvcElement
              id="cardCvc"
              onChange={handlePayment_InputChange(name, label)}
              options={style.StripeElementsStyles}
            />
          </div>
        </div>
        {err && <p style={{color: Colors.danger}}>{err}</p>}
      </div>
    )
  }

  return (
    <div className="container-100">
      <p style={{ color: Colors.danger }}>{error}</p>
      <div className="container-100">
        {renderCardNumber('cardNumber', 'Card Number ')}
      </div>
      <div className="container-45-full-mobile" style={{ marginRight: '30px', marginTop: '20px' }}>
        {renderCardExpiryElement('cardExpiry', 'Expiry Date')}
      </div>
      <div className="container-45-full-mobile" style={{ marginTop: '20px' }}>
        {renderCardCvcElement('cardCvc', 'Card Verification Code (CVC)')}
      </div>
      <div style={{
        float: 'left',
        width: '100%'
      }}>
        <Button
          title={'Authorize'}
          onClick={() => {
            handleSubmit()
          }}
          style={{
            backgroundColor: (Object.keys(errors).length > 0) ? Colors.activeGray : Colors.primary,
            color: Colors.white,
            marginTop: 30,
            paddingRight: props.bill ? '5%' : '0%',
            paddingLeft: props.bill ? '5%' : '0%',
          }}
          key={2}
          isLoading={isLoading}
          className="full-width-mobile"
        />
      </div>

    </div>
  )
}

export default StripeComponent