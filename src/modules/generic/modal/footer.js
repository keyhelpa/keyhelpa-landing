import React from "react";
import Colors from "common/Colors";
import Button from "components/increment/generic/form/Button";
import { Modal } from "react-bootstrap";
export default class Stack extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions } = this.props;
    return (
      <Modal.Footer
        style={{
          border: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            float: "left",
            justifyContent: "center",
            textAlign: "center",
            marginBottom: 25,
          }}
        >
          {actions &&
            actions.map((item, index) => (
              <Button
                key={index}
                title={item.title}
                onClick={() => this.props.onClick(item)}
                style={{
                  backgroundColor: Colors.primary,
                  color: Colors.white,
                  ...item.style,
                }}
                isLoading={item.isLoading}
              />
            ))}

          {this.props.bottomLabel && (
            <p
              style={{
                textAlign: "center",
                marginTop: 15,
              }}
            >
              {this.props.bottomLabel}
            </p>
          )}

          {this.props.bottomComponent && (
            <div
              style={{
                textAlign: "center",
                marginTop: 15,
                width: "100%",
                float: "left",
              }}
            >
              {this.props.bottomComponent()}
            </div>
          )}

          {this.props.cancel && (
            <p
              style={{
                textAlign: "center",
                marginTop: 15,
                fontWeight: "bold",
              }}
              onClick={() => {
                this.props.onCancel();
              }}
              className="cursor-hover"
            >
              Close
            </p>
          )}
        </div>
      </Modal.Footer>
    );
  }
}
