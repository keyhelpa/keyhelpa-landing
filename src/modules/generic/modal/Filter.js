import React from "react";
import Colors from "common/Colors";
import { Modal } from "react-bootstrap";
import ModalHeader from "./header";
import ModalFooter from "./footer";
import Style from "./style";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SvgIcon } from "@mui/material";
import Helper from "common/Helper";
import AutoComplete from "components/increment/generic/form/AutoComplete";
import CheckBox from "modules/generic/form/CheckBox";
import HelperString from "modules/generic/helper/String";
import API from "services/api";
import Routes from "common/Routes";
import States from "modules/generic/helper/states";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Filter jobs",
      subTitle:
        "Set your preferred job details to get matches relevant to your desired work.",
      categories: [],
      filter: null,
      states: [],
    };
  }

  async componentDidMount() {
    if (Helper.ACCOUNT_TYPE == "Agent") {
      this.setState({
        title: "Filter candidates",
        subTitle:
          "Set your preferred details to get matches relevant to your desired candidate for the job.",
      });
    } else if (Helper.ACCOUNT_TYPE == "Freelancer") {
      this.setState({
        title: "Filter jobs",
        subTitle:
          "Set your preferred job details to get matches relevant to your desired work.",
      });
    }
    this.setState({
      filter: this.props.state.filter,
    });
    this.retrieveCategories();
    const states = await States.getStatesObject();
    this.setState({
      states,
    });
  }

  retrieveCategories() {
    this.setState({
      isLoading: true,
    });
    API.request(
      Routes.categoriesRetrieve,
      {
        sort: {
          name: "asc",
        },
      },
      (response) => {
        this.setState({
          isLoading: false,
        });
        if (response && response.data) {
          let newData = response.data.map((item) => {
            return {
              title: item.name,
              value: null,
            };
          });
          this.setState({
            categories: newData,
          });
        }
      },
      (error) => {
        this.setState({
          isLoading: false,
        });
      }
    );
  }

  renderCheckbox(label, data, variable) {
    const { filter } = this.state;
    return (
      <div
        style={{
          width: "100%",
          float: "left",
          textAlign: "left",
          marginTop: 25,
        }}
      >
        <span
          style={{
            float: "left",
            width: "100%",
            marginBottom: 15,
          }}
        >
          <b>{label}</b>
        </span>
        <CheckBox
          data={data}
          selected={filter && filter[variable] ? filter[variable] : []}
          onChange={(data) => {
            if (filter == null) {
              this.setState({
                filter: {
                  [variable]: data,
                },
              });
            } else {
              this.setState({
                filter: {
                  ...filter,
                  [variable]: data,
                },
              });
            }
          }}
        />
      </div>
    );
  }

  renderDropdown(label, data, variable) {
    return (
      <div
        style={{
          width: "48%",
          float: "left",
        }}
      >
        <AutoComplete data={data} label={label} />
      </div>
    );
  }

  renderAgent() {
    const { categories, states } = this.state;
    return (
      <div
        style={{
          width: "100%",
          float: "left",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {this.renderCheckbox("States", states, "region")}
          {categories &&
            categories.length > 0 &&
            this.renderCheckbox("Categories", categories, "categories")}
        </div>

        <div
          style={{
            width: "100%",
            float: "left",
          }}
        >
          <div
            style={{
              float: "left",
              width: "50%",
            }}
            className="full-width-mobile"
          >
            {this.renderCheckbox(
              "Hourly rate",
              HelperString.hourlyRate,
              "hourly_rate"
            )}
            {this.renderCheckbox(
              "Experience",
              HelperString.experience,
              "experience"
            )}
            {this.renderCheckbox(
              "Cetification",
              HelperString.certification,
              "certification"
            )}
          </div>
          <div
            style={{
              float: "left",
              width: "50%",
            }}
            className="full-width-mobile"
          >
            {this.renderCheckbox(
              "Vaccination",
              HelperString.vaccination,
              "vaccination"
            )}
          </div>
        </div>
      </div>
    );
  }

  renderFreelancer() {
    const { categories, states } = this.state;
    return (
      <div
        style={{
          width: "100%",
          float: "left",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {this.renderCheckbox("States", states, "region")}
          {categories &&
            categories.length > 0 &&
            this.renderCheckbox("Categories", categories, "categories")}
        </div>

        <div
          style={{
            width: "100%",
            float: "left",
          }}
        >
          <div
            style={{
              float: "left",
              width: "50%",
            }}
            className="full-width-mobile"
          >
            {this.renderCheckbox(
              "Hourly rate",
              HelperString.hourlyRate,
              "hourly_rate"
            )}
            {this.renderCheckbox(
              "Experience",
              HelperString.experience,
              "experience"
            )}
            {this.renderCheckbox(
              "Cetification",
              HelperString.certification,
              "certification"
            )}
          </div>
          <div
            style={{
              float: "left",
              width: "50%",
            }}
            className="full-width-mobile"
          >
            {this.renderCheckbox(
              "Vaccination",
              HelperString.vaccination,
              "vaccination"
            )}
          </div>
        </div>
      </div>
    );
  }
  body() {
    return (
      <Modal.Body
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          textAlign: "center",
        }}
      >
        {Helper.ACCOUNT_TYPE == "Agent" && this.renderAgent()}
        {Helper.ACCOUNT_TYPE == "Freelancer" && this.renderFreelancer()}
      </Modal.Body>
    );
  }
  render() {
    return (
      <Modal
        show={this.props.show}
        size="lg"
        onHide={() => this.props.onCancel()}
        style={Style.modal}
      >
        <ModalHeader
          title={this.state.title}
          subTitle={this.state.subTitle}
          onCancel={() => this.props.onCancel()}
        />

        {this.body()}

        <ModalFooter
          actions={[
            {
              title: "Clear all",
              isLoading: false,
              style: {
                backgroundColor: Colors.white,
                marginRight: 20,
                color: Colors.primary,
                border: "solid 1px " + Colors.primary,
              },
            },
            {
              title: "Set filter",
              isLoading: false,
              style: {
                backgroundColor: Colors.primary,
                marginRight: 20,
              },
            },
          ]}
          onClick={(params) => {
            if (params.title == "Set filter") {
              this.props.setFilter(this.state.filter);
            } else {
              this.props.setFilter(null);
              this.setState({
                filter: null,
              });
            }
            this.props.onCancel();
            window.location.reload();
          }}
        />
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("reduxhandler");
  return {
    setFilter: (filter) => {
      dispatch(actions.setFilter(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));
