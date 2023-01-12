import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextInput from "components/increment/generic/form/TextInput";
import Button from "@mui/material/Button";
import ButtonGeneric from "components/increment/generic/form/Button";
import Colors from "common/Colors";
import Grid from "@mui/material/Grid";
import {
  AttachFile,
  SentimentSatisfiedAltRounded,
  SearchRounded,
  SendRounded,
} from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import { BasicStyles } from "common";
import API from "services/api";
import Routes from "common/Routes";
import _ from "lodash";
import Picker from "emoji-picker-react";
import { FilePicker } from "react-file-picker";
import CONFIG from "config";
import moment from "moment";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {
  requestForToken,
  onMessageListener,
  subscibe,
} from "services/firebase";

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null,
      error: null,
      isLoading: false,
      showEmoji: false,
    };
  }

  attachfile = (file) => {
    const { user } = this.props.state;
    const { activeMessage, messages } = this.props;
    if (user == null || activeMessage == null) return;
    let formData = new FormData();
    formData.append("file", file);
    formData.append("file_url", file.name);
    formData.append("account_id", user.id);
    formData.append("category", "from-message");
    formData.append("messenger_group_id", activeMessage.id);
    formData.append("message", "file attached");
    formData.append("to", null);
    formData.append("title", "File attachment");
    formData.append("topic", "Keyhelpa-" + user.id);
    this.setState({ isLoading: true });
    API.upload(
      Routes.messagesCreateWithFile,
      formData,
      (response) => {
        this.setState({ isLoading: false });
        if (response.data) {
          // this.props.updateMessage(response.data)
        }
      },
      (error) => {
        this.setState({ isLoading: false });
      }
    );
  };

  saveToMessages = (image) => {
    const { user } = this.props.state;
    const { activeMessage, messages } = this.props;
    if (user == null || activeMessage == null) return;
    let parameter = {
      url: image.data,
      account_id: user.id,
      messenger_group_id: activeMessage.id,
      payload: "image",
      payload_value: null,
      message: null,
      status: 0,
      code: messages.length + 1,
    };
    this.setState({
      isLoading: true,
      showEmoji: false,
    });
    API.request(
      Routes.createImageWithoutPayload,
      parameter,
      (response) => {
        this.setState({ isLoading: false });
        if (response.data) {
          let temp = messages;
          temp.push({
            id: response.data.id,
            message: null,
            title: user.information
              ? user.information.first_name + " " + user.information.last_name
              : user.username,
            position: "Sales manager, realtor",
            read: false,
            created_at: new Date(),
          });
          this.props.updateMessage(temp);
        }
        this.setState({
          text: "",
        });
      },
      (error) => {
        this.setState({ isLoading: false });
      }
    );
  };

  sendMessage = () => {
    const { user } = this.props.state;
    const { activeMessage, messages } = this.props;
    this.setState({
      showEmoji: false,
    });
    if (user === null) return;
    const { text } = this.state;
    let parameter = {
      messenger_group_id: activeMessage.id,
      account_id: user.id,
      payload: "text",
      message: text,
      to: this.props.activeMessage?.account?.id,
    };
    this.setState({ isLoading: true });
    API.request(
      Routes.messagesCreate,
      parameter,
      (response) => {
        this.setState({ isLoading: false });
        if (response.data) {
          onMessageListener();
          let temp = messages;
          let m = {
            account: {
              profile: user.profile,
            },
            id: response.data.id,
            message: text,
            messenger_group_id: activeMessage.id,
            title: user.information
              ? user.information.first_name + " " + user.information.last_name
              : user.username,
            position: activeMessage.position,
            payload: "text",
            read: false,
            created_at: moment(new Date()).format("MMMM DD YYYY, h:mm a"),
          };
          temp.unshift(m);
          this.props.updateMessage(temp);
        }
        this.setState({
          text: "",
        });
      },
      (error) => {
        this.setState({ isLoading: false });
      }
    );
  };

  render() {
    const { text, showEmoji } = this.state;
    return (
      <div
        style={{
          padding: 20,
          height: "13vh",
          borderTop: "solid 1px " + Colors.activeGray,
          display: "flex",
        }}
      >
        {showEmoji && (
          <div
            style={{
              position: "fixed",
              width: "280px",
              height: "320px",
              top: "25%",
              left: "25%",
              right: "25%",
              bottom: "25%",
              margin: "auto",
              zIndex: 1,
            }}
          >
            <Picker
              onEmojiClick={(event, emojiObject) => {
                this.setState({
                  text: (text ? text : "") + emojiObject.emoji,
                });
              }}
            />
          </div>
        )}
        <div
          style={{
            width: "100%",
            float: "left",
            display: "flex",
            aligItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FilePicker
            extensions={["jpeg", "jpg", "png", "pdf"]}
            onChange={(file) => {
              this.attachfile(file);
            }}
            onError={(errMsg) => {}}
            style={{
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Button
              style={{
                color: Colors.primary,
              }}
            >
              <SvgIcon
                component={AttachFile}
                style={{
                  fontSize: BasicStyles.iconSize,
                }}
              />
            </Button>
          </FilePicker>
          <Button
            style={{
              color: Colors.primary,
            }}
            onClick={() => {
              this.setState({ showEmoji: !showEmoji });
            }}
          >
            <SvgIcon
              component={SentimentSatisfiedAltRounded}
              style={{
                fontSize: BasicStyles.iconSize,
              }}
            />
          </Button>
          <div
            style={{
              width: "70%",
            }}
            className="width-mobile-90"
          >
            <TextInput
              placeholder={"Enter your message"}
              type={"text"}
              value={text}
              onChange={(text, error) => {
                this.setState({
                  text,
                  error,
                });
              }}
              validation={{
                type: "text_without_space",
                size: 1,
                column: "Enter your message",
                error: this.state.error,
              }}
              enterEnable={true}
              onEnter={() => {
                this.sendMessage();
              }}
            />
          </div>

          <div
            style={{
              width: "15%",
            }}
            className="hide-on-mobile"
          >
            <ButtonGeneric
              title={"Send"}
              onClick={() => {
                if (!this.state.isLoading) {
                  this.sendMessage();
                }
              }}
              iconLeft={faPaperPlane}
              style={{
                backgroundColor: "transparent",
                color: Colors.primary,
                border: "solid 1px " + Colors.primary,
              }}
              isLoading={this.state.isLoading}
              className="invert-color hide-on-mobile"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("reduxhandler");
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));
