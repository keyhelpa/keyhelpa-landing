import React from 'react';
import { BasicStyles } from 'common'
import { Modal } from 'react-bootstrap'
import TextInput from "components/increment/generic/form/TextInput"
import TextArea from "components/increment/generic/form/TextArea"
import Ratings from 'modules/generic/form/RatingInput'
import CheckBox from 'modules/generic/form/CheckBox'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import ModalHeader from './header'
import ModalFooter from './footer'
import Style from './style'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors'
import SelectInput from "components/increment/generic/form/SelectInput"

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reasons: null,
      errorReasons: null,
      ratings: null,
      terms: [{
        title: 'I authorise that you release the weekly payment held in escrow'
      }, {
        title: 'I authorise KeyHelpa to refund the agent all funds held in the escrow account.'
      }],
      selectedTerms: [],
      selectedOption: 'Select your reason',
      errorMessage: null,
      feedback: null
    };
  }

  onClick() {
    const { reasons, selectedTerms, selectedOption, feedback, ratings } = this.state;
    this.setState({
      errorMessage: null
    })
    if (this.props.withOption && selectedOption == 'Select your reason') {
      this.setState({
        errorMessage: 'Reason is required.'
      })
      return
    }
    if (this.props.feedback && (ratings == null || ratings == 0)) {
      this.setState({
        errorMessage: 'Ratings is required.'
      })
      return
    }
    if (this.props.feedback && (feedback == null || feedback == '')) {
      this.setState({
        errorMessage: 'Feedback is required.'
      })
      return
    }
    if (this.props.withInput && (feedback == null || feedback == '')) {
      this.setState({
        errorMessage: 'Feedback is required.'
      })
      return
    }
    this.props.onClick({
      reasons: selectedOption,
      details: JSON.stringify(selectedTerms),
      ratings,
      feedback
    });
  }

  renderBody() {
    const { reasons, errorReasons, ratings, selectedOption, feedback, errorMessage } = this.state;
    return (
      <Modal.Body style={{
        paddingTop: 20,
        paddingBottom: 50,
        paddingLeft: 20,
        paddingRight: 20
      }}>
        {
          errorMessage && (
            <p style={{
              color: Colors.danger,
              textAlign: 'center'
            }}>
              <b>Opps!</b>
              {
                ' ' + errorMessage
              }
            </p>
          )
        }
        {
          [
            `You'll be prompted to provide the reason for ${this.props.message ? this.props.message : ' ending this job'} and give feedback.`
          ].map(item => (
            <p style={{
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
                'Funds held in the escrow account will be dealt with accordance to the terms and conditions.',
                'You can dispute the payment if you have a legitimate reason.'
              ].map(item => (
                <li>{item}</li>
              ))
            }
          </ol>
        </div>

        {
          this.props.withOption && (
            <div style={{
              float: 'left',
              width: '100%'
            }}>
              <SelectInput
                items={[
                  'Select your reason',
                  'Contract ended due to agent misleading job description',
                  'Contract ended due to a personal reason',
                  'Contract ended due to other reasons'
                ]}
                value={selectedOption}
                onChange={(e) => {
                  this.setState({
                    selectedOption: e
                  })
                }}
                con={true}
              />
            </div>
          )
        }
        <div>
          {
            this.props.withInput && (
              <TextInput
                style={{
                  marginBottom: 20
                }}
                placeholder={'Enter your reason/comments'}
                type={"text"}
                label={''}
                value={feedback}
                onChange={(feedback, errorFeedback) => {
                  this.setState({
                    feedback, errorFeedback
                  })
                }}
                validation={{
                  type: 'text',
                  size: 0,
                  column: 'Feedback'
                }}></TextInput>
            )}

          {
            this.props.feedback && (
              <div style={{
                width: '100%',
                float: 'left'
              }}>
                <div style={{
                  width: '100%',
                  float: 'left',
                  marginTop: 25,
                  marginBottom: 25
                }}>
                  <Ratings
                    onChange={(ratings) => {
                      this.setState({
                        ratings
                      })
                    }} />
                </div>


                <div>
                  <TextArea
                    style={{
                      marginBottom: 20
                    }}
                    placeholder={'Enter your feedback'}
                    type={"text"}
                    value={feedback}
                    onChange={(feedback, errorFeedback) => {
                      this.setState({
                        feedback, errorFeedback
                      })
                    }}
                    validation={{
                      type: 'text',
                      size: 0,
                      column: 'Feedback'
                    }} />
                </div>
              </div>
            )
          }

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
          subTitle={this.props.subTitle ? this.props.subTitle : "Are you sure you want to end this contract?"}
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
