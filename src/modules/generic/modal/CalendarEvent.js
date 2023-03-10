import React from "react";
import Colors from "common/Colors";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import ModalHeader from "./header";
import ModalFooter from "./footer";
import Style from "./style";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextInput from "components/increment/generic/form/TextInput";
import CalendarPicker from "components/increment/generic/form/Calendar";
import API from "services/api";
import Routes from "common/Routes";

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      errorMessage: null,
      name: null,
      nameError: null,
      location: null,
      locationError: null,
      description: null,
      descriptionError: null,
      startDate: null,
      start: null,
      end: null,
      valDate: new Date(),
      endDate: null,
      isLoading: false,
    };
  }

  getFullDate(e) {
    const year = e.getFullYear();
    const date = e.getDate();
    const month = e.getMonth() + 1;
    return year + "-" + month + "-" + date;
  }
  onChangeDate(e, date) {
    this.setState({
      startDate: date,
      valDate: e,
      start: this.getFullDate(e),
    });
  }

  onChangeEndDate(e, date) {
    this.setState({
      endDate: date,
      valDate: e,
      end: this.getFullDate(e),
    });
  }

  submit() {
    const { user } = this.props.state;
    const { name, location, description, startDate, endDate } = this.state;
    const { start, end, startTime, endTime } = this.state;
    if (user == null) return;
    if (
      name == null ||
      name == "" ||
      location == null ||
      location == "" ||
      description == null ||
      description == ""
    ) {
      this.setState({
        errorMessage: "Please fill up the required fields.",
      });
    }
    if (
      startTime == null ||
      startTime == "" ||
      endTime == null ||
      endTime == ""
    ) {
      this.setState({
        errorMessage: "Please fill up the required fields.",
      });
    }
    this.setState({
      isLoading: true,
    });
    let parameter = {
      account_id: user.id,
      merchant_id: user.merchant.id,
      title: name,
      location,
      description,
      start_date: start,
      start_time: startTime,
      end_date: end,
      end_time: endTime,
    };
    API.request(
      Routes.eventsCreate,
      parameter,
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
        this.props.onComplete();
      }
    );
  }

  body() {
    const {
      name,
      nameError,
      location,
      locationError,
      description,
      descriptionError,
    } = this.state;
    const { startDate, valDate, endDate, startTime, endTime } = this.state;
    return (
      <Modal.Body
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            float: "left",
            marginTop: 25,
          }}
        >
          <div
            style={{
              float: "left",
              width: "60%",
            }}
          >
            <CalendarPicker
              value={startDate}
              valueLabel={startDate}
              placeholder={"Start date"}
              minDates={valDate}
              onChange={(value, label) => {
                this.onChangeDate(value, label);
              }}
            />
          </div>
          <div
            style={{
              float: "left",
              width: "40%",
            }}
          >
            <input
              type="time"
              value={startTime}
              style={{
                height: 53,
                border: "none",
                width: "100%",
                float: "left",
                background: "transparent",
                borderBottom: "solid 3px " + Colors.gray,
              }}
              onChange={(e) => {
                this.setState({
                  startTime: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            float: "left",
            marginTop: 25,
          }}
        >
          <div
            style={{
              float: "left",
              width: "60%",
            }}
          >
            <CalendarPicker
              value={endDate}
              valueLabel={endDate}
              placeholder={"End date"}
              minDates={valDate}
              onChange={(value, label) => {
                this.onChangeEndDate(value, label);
              }}
            />
          </div>
          <div
            style={{
              float: "left",
              width: "40%",
            }}
          >
            <input
              type="time"
              value={endTime}
              style={{
                height: 53,
                border: "none",
                width: "100%",
                float: "left",
                background: "transparent",
                borderBottom: "solid 3px " + Colors.gray,
              }}
              onChange={(e) => {
                this.setState({
                  endTime: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            float: "left",
            marginTop: 25,
          }}
        >
          <TextInput
            placeholder={"Name"}
            type={"text"}
            style={{
              background: "transparent",
            }}
            value={name}
            onChange={(name, nameError) => {
              this.setState({
                name,
                nameError,
              });
            }}
            inputStyle={{
              paddingRight: 0,
            }}
            validation={{
              type: "number",
              size: 2,
              column: "Name",
            }}
          />
        </div>

        <div
          style={{
            width: "100%",
            float: "left",
            marginTop: 25,
          }}
        >
          <TextInput
            placeholder={"Location"}
            type={"text"}
            style={{
              background: "transparent",
            }}
            value={location}
            onChange={(location, locationError) => {
              this.setState({
                location,
                locationError,
              });
            }}
            inputStyle={{
              paddingRight: 0,
            }}
            validation={{
              type: "number",
              size: 2,
              column: "Location",
            }}
          />
        </div>

        <div
          style={{
            width: "100%",
            float: "left",
            marginTop: 25,
          }}
        >
          <TextInput
            placeholder={"Description"}
            type={"text"}
            style={{
              background: "transparent",
            }}
            value={description}
            onChange={(description, descriptionError) => {
              this.setState({
                description,
                descriptionError,
              });
            }}
            inputStyle={{
              paddingRight: 0,
            }}
            validation={{
              type: "text",
              size: 2,
              column: "Description",
            }}
          />
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
              title: "Add event",
              isLoading: isLoading,
            },
          ]}
          onClick={(params) => {
            this.submit();
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
