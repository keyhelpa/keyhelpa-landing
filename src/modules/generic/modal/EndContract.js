import React from 'react';
import { BasicStyles } from 'common'
import { Modal } from 'react-bootstrap'
import TextInput from "components/increment/generic/form/TextInput"
import Ratings from 'modules/generic/form/Rating'
import CheckBox from 'modules/generic/form/CheckBox'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import ModalHeader from './header'
import ModalFooter from './footer'
import Style from './style'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reasons: null,
      errorReasons: null,
      ratings: 3,
      terms: [{
        title: 'I request you release the weekly payment held in escrow'
      }, {
        title: 'I authorize KeyHelpa to refund the agent all funds held in the escrow account.'
      }],
      selectedTerms: []
    };
  }

  onClick(){
    const { reasons, selectedTerms } = this.state;
    if(reasons == null || reasons == ''){
      this.setState({
        errorReasons: 'Feedback is required.'
      })
      return
    }
    this.props.onClick({
      reasons,
      details: JSON.stringify(selectedTerms)
    });
  }

  renderBody() {
    const { reasons, errorReasons, ratings } = this.state;
    return (
      <Modal.Body style={{
        paddingTop: 20,
        paddingBottom: 50,
        paddingLeft: 20,
        paddingRight: 20
      }}>
        {
          [
            `You'll be prompted to provide the reason for ending this job and provide feedback.`
          ].map((item,index) => (
            <p key={index} style={{
              textAlign: 'justify'
            }}>
              {
                item
              }
            </p>
          ))
        }
        <div>
          <ol type='number'>
            {
              [
                'Funds held in escrow account will be dealt in accordance to the terms and conditions.',
                'You can dispute the payment if you have a legitimate reason.'
              ].map(item => (
                <li>{item}</li>
              ))
            }
          </ol>
        </div>
        {
          this.props.withOption && (
            <select style={{
              ...BasicStyles.formControlContainer,
              ...BasicStyles.formControl
            }}>
              {
                [
                  'Select your reason',
                  'Contract ended due to agent misleading job description',
                  'Contract ended due to a personal reason',
                  'Contract ended due to other reasons'
                ].map((item, index) => (
                  <option disabled={index == 0 ? true : false} selected={index == 0 ? true : false}>{item}</option>
                ))
              }
            </select>
          )
        }
        <div>
          {
            this.props.withInput && (
              <TextInput
                style={{
                  marginBottom: 20
                }}
                placeholder={'Enter your feedback'}
                type={"text"}
                label={''}
                value={reasons}
                onChange={(reasons, errorReasons) => {
                  this.setState({
                    reasons, errorReasons
                  })
                }}
                validation={{
                  type: 'text',
                  size: 0,
                  column: 'Feedback',
                  error: errorReasons
                }}></TextInput>
            )}

          {
            this.props.withRating && (
              <div>
                <p>Feedback</p>
              </div>
            )
          }
          {
            this.props.withRating && [{
              value: ratings,
              description: 'Job is as described in the contract'
            }, {
              value: ratings,
              description: 'Communication Skills'
            }, {
              value: ratings,
              description: 'Agent being responsive'
            }, {
              value: ratings,
              description: 'Would you recommend this agent?'
            }].map(item => (
              <Row>
                <Col>
                  <Ratings value={ratings} />
                </Col>
                <Col>
                  <p>{item.description}</p>
                </Col>
              </Row>
            ))
          }
          <div style={{
            marginTop: 20
          }}>
            <CheckBox
              data={this.state.terms}
              selected={this.state.selectedTerms}
              onChange={(selected) => {
                this.setState({
                  selectedTerms: selected
                })
              }}
            />
          </div>
        </div>
      </Modal.Body>
    )
  }
  render() {
    const { actions } = this.state;
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.onCancel()}
        style={Style.modal}
      >

        <ModalHeader
          title={this.props.title}
          subTitle={"Are you sure you want to end this contract?"}
          onCancel={() => this.props.onCancel()}
        />

        {
          this.renderBody()
        }


        <ModalFooter
          actions={this.props.actions}
          onClick={(params) => {
            this.onClick()
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
