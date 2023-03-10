import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Colors from "common/Colors";
import { Modal } from "react-bootstrap";
import { SvgIcon } from "@mui/material";
import { Close } from "@mui/icons-material";
import { BasicStyles } from "common";
export default class Stack extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal.Header
        style={{
          border: "none",
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
              float: "left",
              width: "100%",
              textAlign: "right",
            }}
          >
            <SvgIcon
              component={Close}
              style={{
                color: Colors.gray,
                fontSize: BasicStyles.iconSize,
              }}
              className="cursor-hover"
              onClick={() => {
                this.props.onCancel();
              }}
            />
          </span>
          <h1
            style={{
              textAlign: "center",
            }}
          >
            {this.props.title}
          </h1>
          {this.props.subTitle && (
            <p
              style={{
                textAlign: "center",
                // marginTop: 25
              }}
            >
              {this.props.subTitle}
            </p>
          )}
          {this.props.subTitle1 && (
            <p
              style={{
                textAlign: "center",
                marginTop: 25,
              }}
            >
              {this.props.subTitle1}
            </p>
          )}
        </div>
      </Modal.Header>
    );
  }
}
