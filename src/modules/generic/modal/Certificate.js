import React from "react";
import Colors from "common/Colors";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import Style from "./style";
import { BasicStyles, Color } from "common";
import ModalHeader from "./header";
import ModalFooter from "./footer";
import { SvgIcon } from "@mui/material";
import { Download } from "@mui/icons-material";
import { withRouter } from "react-router-dom";

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    if (this.props.data) {
      this.setState({
        data: this.props.data,
      });
    }
  }

  body() {
    const { data } = this.state;
    return (
      <Modal.Body
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          overflowY: "scroll",
        }}
      >
        <div
          style={{
            width: "100%",
            float: "left",
          }}
        >
          <div
            style={{
              width: "100%",
              float: "left",
              height: "40vh",
              background: Color.activeGray,
              borderRadius: BasicStyles.borderRadius,
            }}
          ></div>
          <div
            style={{
              width: "100%",
              float: "left",
              textAlign: "center",
              fontSize: BasicStyles.fontSize,
            }}
          >
            <SvgIcon
              component={Download}
              style={{
                fontSize: BasicStyles.iconSize,
                marginRight: 10,
              }}
            />
            Download
          </div>
        </div>
      </Modal.Body>
    );
  }

  render() {
    const { data } = this.state;
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.onCancel()}
        style={Style.modal}
        size="lg"
      >
        <ModalHeader
          title={"Certificate"}
          subTitle={"Helpa: Ada Lovelace"}
          onCancel={() => this.props.onCancel()}
        />

        {data && this.body()}

        <ModalFooter
          actions={[
            {
              title: "Reject",
              style: {
                marginRight: 10,
                backgroundColor: "transparent",
                color: Color.primary,
                border: "solid 1px " + Color.primary,
              },
            },
            {
              title: "Accept",
            },
          ]}
          onClick={(params) => {
            this.props.onClick(params);
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <p
            style={{
              display: "inline-block",
              fontSize: 20,
              cursor: "pointer",
            }}
            onClick={() => {
              this.props.history.push("/terms_and_conditions");
            }}
          >
            View KeyHelpa's terms & conditions
          </p>
        </div>
      </Modal>
    );
  }
}

const style = {
  title: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  icon: {
    marginRight: 5,
  },
};

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("reduxhandler");
  return {
    setNavigationActive: (flag) => dispatch(actions.setNavigationActive(flag)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));
