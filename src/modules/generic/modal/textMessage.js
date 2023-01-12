import React, { createRef } from 'react';
import Colors from 'common/Colors'
import { Modal } from 'react-bootstrap'
import ModalHeader from './header'
import ModalFooter from './footer'
import Style from './style'
import TextInput from "components/increment/generic/form/TextInput"
import countryCodes from 'country-codes-list';
import { BasicStyles } from 'common';

export default class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.menu = createRef()
    this.state = {
      message: null,
      errorMessage: null,
      errorLastName: null,
      contactNumber: null,
      mobilePrefixes: countryCodes.customList('countryCode', '{countryCode} +{countryCallingCode}'),
      countryCode: null
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    this.setState({ countryCode: this.menu.value })
  }

  body() {
    const { message, errorMesssage,
      contactNumber, mobilePrefixes,
      errorLastName, addMobile
    } = this.state;
    return (
      <Modal.Body style={{
        paddingLeft: 20,
        paddingRight: 20
      }}>

        <div
          style={{
            width: '100%',
            float: 'left',
          }}
          className="full-width-mobile"
        >
          <select style={{
            ...BasicStyles.formControl,
            width: '28%',
            float: 'left',
            marginLeft: '4%',
            borderBottom: '2px solid rgb(86, 102, 121)',
            height: '52px'
          }}
            className="full-width-mobile"
            value={this.state.countryCode}
            ref={(input) => this.menu = input}
            onChange={this.handleChange}
          >
            {
              Object.values(mobilePrefixes).map((item,index) => (
                <option key={index} value={item}>{item}</option>
              ))
            }
          </select>
          <div
            style={{
              width: '58%',
              float: 'left',
              padding: '0',
              marginRight: '4%',
              marginLeft: '5%'
            }}
            className="full-width-mobile"
          >
            <TextInput
              placeholder={'Mobile'}
              type={"text"}
              value={contactNumber}
              style={{
                width: '100%',
                float: 'left',
              }}

              onChange={(e) => {
                // this.validation(e)
                this.setState({
                  contactNumber: e
                })
              }}
              validation={{
                type: 'text_without_space',
                size: 11,
                column: 'contactNumber',
                error: errorLastName
              }}
            />
          </div>
        </div>
      </Modal.Body>

    )
  }

  render() {
    const { contactNumber, countryCode } = this.state;
    return (

      <Modal
        show={this.props.show}
        onHide={() => this.props.onCancel()}
        style={Style.modal}
      >

        <ModalHeader
          title={'Add your mobile'}
          subTitle={'Text message verification'}
          onCancel={() => this.props.onCancel()}
        />

        {
          this.body()
        }

        <ModalFooter
          actions={[{
            title: 'Next'
          }]}
          onClick={(params) => {
            this.props.next(countryCode, contactNumber)
          }}
          bottomLabel="Messaging rates may apply."
        />

      </Modal>

    )
  }
}
