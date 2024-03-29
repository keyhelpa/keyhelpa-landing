import React from "react";
import { BasicStyles } from "common";
import Colors from "common/Colors";
import Validator from "./Validator.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
  }

  getValidationResponse(value, validation) {
    return Validator.validate(value, validation);
  }

  getValidationError() {
    const { validation } = this.props;

    if (!Array.isArray(validation)) {
      return validation.error;
    }

    return validation.map((validator) => validator.error).find((err) => !!err);
  }

  validation = (e) => {
    const { validation, type } = this.props;
    const { value } = e.target;

    const response = !Array.isArray(validation)
      ? this.getValidationResponse(value, validation)
      : validation
          .map((validator) => this.getValidationResponse(value, validator))
          .find((resp) => !!resp) || null;

    if (!response) {
      if (type === "file") {
        this.props.onChange(e.target.files[0], null);
      } else {
        this.props.onChange(e.target.value, null);
      }
    } else {
      if (type === "file") {
        this.props.onChange(e.target.files[0], response);
      } else {
        this.props.onChange(e.target.value, response);
      }
    }
  };

  render() {
    return (
      <div
        style={{
          width: "100%",
          float: "left",
        }}
      >
        {this.props.label && (
          <label
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              fontWeight: "bold",
            }}
          >
            {this.props.label}
          </label>
        )}

        <div
          style={{
            ...BasicStyles.formControlContainer,
            ...this.props.style,
            display: "flex",
          }}
        >
          {this.props.iconLeft && (
            <span
              style={{
                float: "left",
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                height: 50,
              }}
              className="href-link"
              onClick={() => {
                this.props.onClickLeftIcon();
              }}
            >
              <FontAwesomeIcon
                icon={this.props.iconLeft}
                color={
                  this.props.iconStyle != null ? this.props.iconStyle : "black"
                }
                size="lg"
              />
            </span>
          )}

          {this.props.prefix && (
            <span
              style={{
                float: "left",
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                height: 50,
                fontWeight: 600,
              }}
            >
              <span>{this.props.prefix}</span>
            </span>
          )}

          <input
            type={this.props.type}
            placeholder={this.props.placeholder}
            value={this.props.value ?? ""}
            disabled={this.props.disable ? this.props.disable : false}
            maxLength={this.props.max ? this.props.max : "60000"}
            style={{
              ...BasicStyles.formControl,
              width:
                this.props.iconRight ||
                this.props.rightLabel ||
                this.props.iconLeft
                  ? "90%"
                  : BasicStyles.formControl.width,
              float: "left",
              ...this.props.inputStyle,
            }}
            onChange={(e) => {
              if (this.props.numbersOnly) {
                const { value } = e.target;
                e.target.value = value
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\.*)\./g, "$1");
              }
              this.validation(e);
            }}
            max={this.props.max}
            min={this.props.min}
            onKeyDown={(event) =>
              event.key === "Enter" &&
              this.props.enterEnable &&
              this.props.onEnter()
            }
          ></input>
          {this.props.iconRight && (
            <span
              style={{
                width: "10%",
                float: "left",
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
                height: 50,
              }}
              className="href-link"
              onClick={() => {
                this.props.onClickRightIcon();
              }}
            >
              <FontAwesomeIcon
                icon={this.props.iconRight}
                color={
                  this.props.iconStyle != null ? this.props.iconStyle : "black"
                }
                size="lg"
              />
            </span>
          )}
          {this.props.rightLabel && (
            <span
              style={{
                width: "10%",
                float: "left",
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
                height: 50,
              }}
            >
              {this.props.rightLabel}
            </span>
          )}
        </div>
        <div
          style={{
            width: "100%",
            float: "left",
          }}
        >
          {this.props.validation && this.getValidationError() && (
            <label
              style={{
                color: Colors.danger,
                ...this.props.errorStyle,
              }}
            >
              <b>Oops!</b> {this.getValidationError()}
            </label>
          )}
        </div>
      </div>
    );
  }
}
