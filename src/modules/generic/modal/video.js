import React from "react";
import { Modal } from "react-bootstrap";
import ModalHeader from "./header";
import Style from "./style";
import Colors from "common/Colors";
import YouTube, { YouTubeProps } from "react-youtube";

export default class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  body() {
    const { data } = this.props;
    return (
      <Modal.Body
        style={{
          textAlign: "center",
          padding: 0,
          margin: 0,
          height: "60vh",
        }}
      >
        <YouTube
          videoId={data.url}
          opts={{
            playerVars: {
              autoplay: 1,
            },
          }}
        />
      </Modal.Body>
    );
  }
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.onCancel()}
        style={{
          ...Style.modal,
          padding: 0,
          marginTop: "20vh",
        }}
        size="lg"
      >
        {this.body()}
      </Modal>
    );
  }
}
