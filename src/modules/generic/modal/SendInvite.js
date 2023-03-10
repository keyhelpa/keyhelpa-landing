import React from "react";
import Colors from "common/Colors";
import { Modal } from "react-bootstrap";
import ModalHeader from "./header";
import ModalFooter from "./footer";
import Style from "./style";
import SelectInput from "components/increment/generic/form/SelectInputObject";
import TextArea from "components/increment/generic/form/TextArea";
import API from "services/api";
import Routes from "common/Routes";
import { connect } from "react-redux";

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      errorMessage: null,
      data: [],
      selectedIndex: null,
      message: null,
      errorMessage: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    const { data, candidate } = this.props;
    this.setState({
      data: data,
      selectedIndex: 0,
      message: candidate.details ? candidate.details.message : null,
    });
  }

  validate() {
    const { data, update } = this.props;
    const { message, selectedIndex } = this.state;
    if (message == null || message == "") {
      this.setState({
        errorMessage: "Message is required.",
      });
      return;
    }
    if (selectedIndex == null) {
      this.setState({
        errorMessage: "Job is required.",
      });
    }
    if (update === true) {
      this.updateInvite(data[selectedIndex], message);
    } else {
      this.sendInvite(data[selectedIndex], message);
    }
  }

  updateInvite(job, message) {
    const { candidate } = this.props;
    const { user } = this.props.state;
    if (user == null || (user && user.merchant == null)) return;
    if (candidate == null) return;
    this.setState({
      isLoading: true,
    });
    API.request(
      Routes.proposalUpdate,
      {
        id: candidate.id,
        account_id: user.id,
        freelancer: candidate.freelancer,
        merchant_id: user.merchant.id,
        category: "invite",
        job_id: job.id,
        category_status: "pending",
        status: "pending",
        amount: job.job_terms.hourly_rate,
        currency: job.job_terms.currency,
        type: "proposals",
        to: candidate.freelancer,
        details: JSON.stringify({
          message: message,
        }),
      },
      (response) => {
        this.setState({
          isLoading: false,
        });
        this.props.onComplete();
      },
      (error) => {
        this.setState({
          isLoading: false,
        });
      }
    );
  }

  sendInvite(job, message) {
    const { candidate } = this.props;
    const { user } = this.props.state;
    if (user == null || (user && user.merchant == null)) return;
    if (candidate == null) return;
    this.setState({
      isLoading: true,
    });
    API.request(
      Routes.proposalCreate,
      {
        account_id: user.id,
        freelancer: candidate.id,
        merchant_id: user.merchant.id,
        category: "invite",
        job_id: job.id,
        category_status: "pending",
        status: "pending",
        amount: job.job_terms.hourly_rate,
        currency: job.job_terms.currency,
        type: "proposals",
        to: candidate.id,
        details: JSON.stringify({
          message: message,
        }),
      },
      (response) => {
        this.setState({
          isLoading: false,
        });
        this.props.onComplete();
      },
      (error) => {
        this.setState({
          isLoading: false,
        });
      }
    );
  }

  body() {
    const { data, selectedIndex, message, errorMessage } = this.state;
    return (
      <Modal.Body
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <div
          style={{
            width: "100%",
            float: "left",
          }}
        >
          <span
            style={{
              width: "100%",
              float: "left",
            }}
          >
            <b>Jobs</b>
          </span>
          <span
            style={{
              width: "100%",
              float: "left",
            }}
          >
            <SelectInput
              items={data}
              style={{ marginTop: 25 }}
              value={data[selectedIndex ? selectedIndex : 0]}
              con={true}
              onChange={(value) => {
                this.setState({
                  selectedIndex: parseInt(value),
                });
              }}
            />
          </span>
          <span
            style={{
              width: "100%",
              float: "left",
              marginTop: 25,
            }}
          >
            <span
              style={{
                width: "100%",
                float: "left",
              }}
            >
              <b>Message to the candidate</b>
            </span>
            <TextArea
              placeholder={"Type your message to the candidate here"}
              type={"text"}
              style={{
                background: "transparent",
                paddingLeft: 0,
                paddingRight: 0,
                minHeight: 150,
              }}
              value={message}
              rows={5}
              onChange={(message, errorMessage) => {
                this.setState({
                  message,
                  errorMessage,
                });
              }}
              validation={{
                type: "text_without_space",
                size: 0,
                column: "Message",
                error: errorMessage,
              }}
            />
          </span>
        </div>
      </Modal.Body>
    );
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

        {this.body()}

        <ModalFooter
          actions={[
            {
              title: "Cancel",
              style: {
                backgroundColor: "white",
                border: "solid 1px " + Colors.primary,
                color: Colors.primary,
                marginRight: 20,
              },
            },
            {
              title: "Send",
              isLoading: this.state.isLoading,
            },
          ]}
          onClick={(params) => {
            if (params.title == "Cancel") {
              this.props.onCancel();
            } else {
              this.validate();
            }
          }}
        />
      </Modal>
    );
  }
}
const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("reduxhandler");
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Stack);
