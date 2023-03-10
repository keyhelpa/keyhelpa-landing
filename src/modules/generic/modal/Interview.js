import React from "react";
import Colors from "common/Colors";
import { Modal } from "react-bootstrap";
import ModalHeader from "./header";
import ModalFooter from "./footer";
import Style from "./style";
import TextInput from "components/increment/generic/form/TextInput";
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
      job: null,
      errorJob: null,
      message: null,
      errorMessage: null,
      isLoading: false,
      date: null,
      endDate: null,
      errorEndDate: null,
      endTime: null,
      errorEndTime: null,
      errorDate: null,
      time: null,
      errorTime: null,
    };
  }

  componentDidMount() {
    const { data, candidate } = this.props;
    this.setState({
      job: data ? data.title : null,
      message: candidate ? candidate.details?.message : null,
      date: candidate ? candidate.details?.date : null,
      endDate: candidate ? candidate.details?.endDate : null,
      time: candidate ? candidate.details?.time : null,
      endTime: candidate ? candidate.details?.endTime : null,
    });
  }

  validate() {
    const { data } = this.props;
    const { message, job, date, time, endDate, endTime } = this.state;
    if (message == null || message == "") {
      this.setState({
        errorMessage: "Message is required.",
      });
      return;
    }
    if (job == null) {
      this.setState({
        errorMessage: "Job is required.",
      });
    }
    if (date == null) {
      this.setState({
        errorMessage: "Start date is required.",
      });
    }
    if (time == null) {
      this.setState({
        errorMessage: "Start time is required.",
      });
    }
    if (endTime == null) {
      this.setState({
        errorMessage: "End time is required.",
      });
    }
    if (endDate == null) {
      this.setState({
        errorMessage: "End date is required.",
      });
    }
    if (this.props.update === true) {
      this.updateInterview(job, message, date, time, endDate, endTime);
    } else {
      this.createInterview(job, message, date, time, endDate, endTime);
    }
  }

  updateInterview(job, message, date, time, end_date, end_time) {
    const { candidate, data } = this.props;
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
        category: "interview",
        job_id: data.id,
        category_status: "pending",
        status: "pending",
        amount: data.job_terms.hourly_rate,
        currency: data.job_terms.currency,
        type: "proposals",
        to: candidate.freelancer,
        details: JSON.stringify({
          message: message,
          date: date,
          time: time,
          endDate: end_date,
          endTime: end_time,
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

  createInterview(job, message, date, time, end_date, end_time) {
    const { candidate, data } = this.props;
    const { user } = this.props.state;
    if (user == null || (user && user.merchant == null)) return;
    if (candidate == null) return;
    this.setState({
      isLoading: true,
    });
    API.request(
      Routes.proposalUpdate,
      {
        id: candidate.proposal.id,
        account_id: user.id,
        freelancer: candidate.id,
        merchant_id: user.merchant.id,
        category: "proposals",
        job_id: data.id,
        category_status: "accepted",
        status: "accepted",
        amount: data.job_terms.hourly_rate,
        currency: data.job_terms.currency,
        type: "proposals",
        to: candidate.id,
        details: JSON.stringify({
          message: message,
          date: date,
          time: time,
          endDate: end_date,
          endTime: end_time,
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
    const {
      data,
      job,
      errorJob,
      message,
      errorMessage,
      date,
      errorDate,
      time,
      errorTime,
      endDate,
      errorEndDate,
      endTime,
      errorEndTime,
    } = this.state;
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
            <b>Job</b>
          </span>
          <span
            style={{
              width: "100%",
              float: "left",
            }}
          >
            <TextInput
              placeholder={"Job"}
              type={"text"}
              value={job}
              style={{
                width: "100%",
                float: "left",
              }}
              disable={true}
              onChange={(job, errorJob) => {
                this.setState({
                  job,
                  errorJob,
                });
              }}
              validation={{
                type: "text_without_space",
                size: 0,
                column: "job",
                error: errorJob,
              }}
              // items={data}
              // style={{ marginTop: 25 }}
              // value={data[selectedIndex]}
              // onChange={(value) => {
              //     this.setState({
              //         selectedIndex: value
              //     })
              // }}
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
                minHeight: 100,
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
          <span
            style={{
              width: "100%",
              float: "left",
              marginTop: 25,
            }}
          >
            <div className="container-50-full-mobile">
              <span
                style={{
                  width: "100%",
                  float: "left",
                }}
              >
                <b>Start date</b>
              </span>
              <TextInput
                placeholder={"Start date"}
                type={"date"}
                value={date}
                style={{
                  width: "100%",
                  float: "left",
                }}
                onChange={(date, errorDate) => {
                  this.setState({
                    date,
                    errorDate,
                  });
                }}
                validation={{
                  type: "text_without_space",
                  size: 0,
                  column: "date",
                  error: errorDate,
                }}
              />
            </div>
            <div className="container-50-full-mobile">
              <span
                style={{
                  width: "100%",
                  float: "left",
                }}
              >
                <b>Start time</b>
              </span>
              <TextInput
                placeholder={"Start time"}
                type={"time"}
                value={time}
                style={{
                  width: "100%",
                  float: "left",
                }}
                onChange={(time, errorTime) => {
                  this.setState({
                    time,
                    errorTime,
                  });
                }}
                validation={{
                  type: "text_without_space",
                  size: 0,
                  column: "time",
                  error: errorTime,
                }}
              />
            </div>
          </span>

          <span
            style={{
              width: "100%",
              float: "left",
              marginTop: 25,
            }}
          >
            <div className="container-50-full-mobile">
              <span
                style={{
                  width: "100%",
                  float: "left",
                }}
              >
                <b>End date</b>
              </span>
              <TextInput
                placeholder={"End date"}
                type={"date"}
                value={endDate}
                style={{
                  width: "100%",
                  float: "left",
                }}
                onChange={(endDate, errorEndDate) => {
                  this.setState({
                    endDate,
                    errorEndDate,
                  });
                }}
                validation={{
                  type: "text_without_space",
                  size: 0,
                  column: "endDate",
                  error: errorDate,
                }}
              />
            </div>
            <div className="container-50-full-mobile">
              <span
                style={{
                  width: "100%",
                  float: "left",
                }}
              >
                <b>End time</b>
              </span>
              <TextInput
                placeholder={"End time"}
                type={"time"}
                value={endTime}
                style={{
                  width: "100%",
                  float: "left",
                }}
                onChange={(endTime, errorEndTime) => {
                  this.setState({
                    endTime,
                    errorEndTime,
                  });
                }}
                validation={{
                  type: "text_without_space",
                  size: 0,
                  column: "endTime",
                  error: errorEndTime,
                }}
              />
            </div>
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
              title: "Close",
              style: {
                backgroundColor: "transparent",
                border: "solid 1px " + Colors.primary,
                color: Colors.primary,
                marginRight: 20,
              },
            },
            {
              title: this.props.update ? "Update" : "Send",
              isLoading: this.state.isLoading,
            },
          ]}
          onClick={(params) => {
            if (params.title == "Close") {
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
