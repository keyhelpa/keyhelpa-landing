import React from 'react';
import Colors from 'common/Colors'
import { Modal } from 'react-bootstrap'
import ModalHeader from './header'
import ModalFooter from './footer'
import Style from './style'
import TextInput from "components/increment/generic/form/TextInput"
import TextArea from 'components/increment/generic/form/TextArea'
import API from 'services/api'
import Routes from 'common/Routes'
import { connect } from 'react-redux';

class Stack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            errorMessage: null,
            data: [],
            reason: null,
            errorReason: null,
            message: null,
            errorMessage: null,
            isLoading: false
        };
    }

    validate() {
        const { message, reason } = this.state;
        if (message == null || message == '') {
            this.setState({
                errorMessage: 'Message is required.'
            })
            return
        }
        if (reason == null) {
            this.setState({
                errorMessage: 'Reason is required.'
            })
        }
        this.updateProposal(reason, message)
    }

    updateProposal(reason, message) {
        const { candidate, data } = this.props;
        const { user } = this.props.state;
        if(user == null || (user && user.merchant == null)) return
        if(candidate == null) return
        this.setState({
            isLoading: true
        })
        API.request(Routes.proposalUpdate, {
            id: candidate.proposal.id,
            account_id: user.id,
            freelancer: candidate.id,
            merchant_id: user.merchant.id,
            category: 'proposals',
            job_id: data.id,
            category_status: 'rejected',
            amount: data.job_terms.hourly_rate,
            currency: data.job_terms.currency,
            status: 'rejected',
            type: 'proposals',
            to: candidate.id,
            details: JSON.stringify({
                message: message,
                reason: reason
            })
        }, response => {
            this.setState({
                isLoading: false
            })
            this.props.onComplete()
        }, error => {
            this.setState({
                isLoading: false
            })
        })
    }

    body() {
        const { data, reason, errorReason, message, errorMessage, date, errorDate, time, errorTime } = this.state;
        return (
            <Modal.Body style={{
                paddingLeft: 20,
                paddingRight: 20
            }}>
                <div style={{
                    width: '100%',
                    float: 'left'
                }}>

                    <span style={{
                        width: '100%',
                        float: 'left'
                    }}>
                        <b>Reason for rejecting</b>
                    </span>
                    <span style={{
                        width: '100%',
                        float: 'left'
                    }}>

                        <TextInput
                            placeholder={'Type your reason here...'}
                            type={"text"}
                            value={reason}
                            style={{
                            width: '100%',
                            float: 'left'
                            }}
                            onChange={(reason, errorReason) => {  
                                this.setState({
                                    reason, errorReason
                                })
                            }}
                            validation={{
                            type: 'text_without_space',
                            size: 0,
                            column: 'reason',
                            error: errorReason
                            }}
                        />
                    </span>
                    <span style={{
                        width: '100%',
                        float: 'left',
                        marginTop: 25
                    }}>
                        <span style={{
                            width: '100%',
                            float: 'left'
                        }}>
                            <b>Message to the candidate</b>
                        </span>
                        <TextArea
                            placeholder={'Type your message to the candidate here'}
                            type={"text"}
                            style={{
                                background: 'transparent',
                                paddingLeft: 0,
                                paddingRight: 0,
                                minHeight: 100
                            }}
                            value={message}
                            rows={5}
                            onChange={(message, errorMessage) => {
                                this.setState({
                                    message, errorMessage
                                })
                            }}
                            validation={{
                                type: 'text_without_space',
                                size: 0,
                                column: 'Message',
                                error: errorMessage
                            }}
                        />
                    </span>
                </div>
            </Modal.Body >

        )
    }
    render() {
        const { isLoading } = this.state;
        return (
            <Modal
                show={this.props.show}
                onHide={() => this.props.onCancel()}
                style={Style.modal}
            >

                <ModalHeader
                    title={this.props.title}
                    subTitle={this.props.subTitle}
                    onCancel={() => this.props.onCancel()}
                />

                {
                    this.body()
                }


                <ModalFooter
                    actions={[{
                        title: 'Cancel',
                        style: {
                            backgroundColor: 'transparent',
                            border: 'solid 1px ' + Colors.primary,
                            color: Colors.primary,
                            marginRight: 20
                        }
                    }, {
                        title: 'Send',
                        isLoading: this.state.isLoading
                    }]}
                    onClick={(params) => {
                        if (params.title == 'Cancel') {
                            this.props.onCancel()
                        } else {
                            this.validate()
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

export default connect(mapStateToProps, mapDispatchToProps)(Stack);

