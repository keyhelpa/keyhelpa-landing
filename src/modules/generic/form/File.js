import React from "react";
import { BasicStyles } from "common";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faImage } from "@fortawesome/free-solid-svg-icons";
import Colors from "common/Colors";
import API from "services/api";
import Routes from "common/Routes";
import ProfilePicture from "modules/generic/card/profilePicture";
import { SvgIcon } from "@mui/material";
import { CloudUploadOutlined } from "@mui/icons-material";
import DropZone from "./DropZone";
class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.file = null;
    this.state = {
      selected: [],
    };
  }

  fileChangeHandler = (e) => {
    if (e && e.target !== undefined) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return false;
      } else {
        this.props.onChange(files[0]);
      }
    }
    if (e && e.target == undefined) {
      this.props.onChange(e[0]);
    }
  };

  renderEmpty() {
    return (
      <DropZone
        {...this.props}
        handleFiles={(file) => this.fileChangeHandler(file)}
      />
    );
  }

  render() {
    const { data } = this.props;
    const { active } = this.state;
    return (
      <div
        style={{
          width: "100%",
          float: "left",
        }}
        className="cursor-hover"
      >
        <div
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            alignItems: "center",
            height: 200,
            border: "dashed 2px " + Colors.primary,
            borderRadius: 12,
          }}
          onClick={() => {
            this.newFile.click();
          }}
          className="href-link"
        >
          <input
            ref={(ref) => (this.newFile = ref)}
            type="file"
            name="file"
            className="file-upload"
            id="newFile"
            accept={
              this.props.accepted ? this.props.accepted.format : "image/*"
            }
            onChange={this.fileChangeHandler}
          />
          {data && (
            <div
              style={{
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ProfilePicture
                  size={this.props.style.width}
                  iconSize={"lg"}
                  data={data}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  float: "left",
                  textAlign: "center",
                  paddingTop: 10,
                }}
              >
                <p>Change image</p>
              </div>
            </div>
          )}
          {data == null && this.renderEmpty()}
        </div>
        <span
          style={{
            width: "100%",
            float: "left",
            marginTop: 25,
          }}
        >
          {this.props.layout ? (
            <span
              style={{
                float: "left",
                paddingLeft: 20,
                color: Colors.gray,
              }}
            >
              <p>
                <b
                  style={{
                    color: Colors.lightGray,
                  }}
                >
                  {
                    "You may attach up to 10 files under the size of 25MB each. Include work samples or other documents to support your application."
                  }
                </b>
              </p>
            </span>
          ) : this.props.noContent ? (
            <div></div>
          ) : (
            <div>
              <span
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: Colors.primary,
                  float: "left",
                }}
              >
                <FontAwesomeIcon
                  icon={faImage}
                  color={Colors.white}
                  size="2x"
                />
              </span>
              <span
                style={{
                  float: "left",
                  paddingLeft: 20,
                  color: Colors.gray,
                }}
              >
                <p>
                  <b>
                    {this.props.accepted ? this.props.accepted.title : "Images"}
                  </b>
                  <br />

                  <b
                    style={{
                      color: Colors.lightGray,
                    }}
                  >
                    {this.props.accepted
                      ? this.props.accepted.label
                      : "PNG, JPG, in-app cropping"}
                  </b>
                </p>
              </span>
            </div>
          )}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("reduxhandler");
  return {
    login: (user, token) => {
      dispatch(actions.login(user, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));
