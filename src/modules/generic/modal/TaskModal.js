import React from "react";
import Colors from "common/Colors";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import Style from "./style";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCalendar,
  faCheckSquare,
  faComment,
  faEye,
  faPager,
  faTimes,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { SvgIcon } from "@mui/material";
import TextArea from "components/increment/generic/form/TextArea";
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import { Close } from "@mui/icons-material";
import { BasicStyles, Color } from "common";
import ProfilePicture from "modules/generic/card/profilePicture";
import TextInput from "components/increment/generic/form/TextInput";
import Common from "modules/generic/helper/Common";
import Calendar from "components/increment/generic/form/CalendarIconOnly";
import API from "services/api";
import Routes from "common/Routes";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const rightOptions = [
  //     {
  //     title: 'Members',
  //     icon: faUser
  // },
  // {
  //     title: 'Checklist',
  //     icon: faCheckSquare
  // },
  {
    title: "Date started",
    icon: faCalendar,
  },
  {
    title: "Deadline",
    icon: faCalendarCheck,
  },
];

const actions = [
  {
    title: "Delete",
    icon: faTrash,
  },
];

const commentData = [
  {
    content: "This is a test",
    date: "Today",
  },
  {
    content: "This is a test",
    date: "Today",
  },
  {
    content: "This is a test",
    date: "Today",
  },
  {
    content: "This is a test",
    date: "Today",
  },
];

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: null,
      data: null,
      comments: [],
      commentIsLoading: false,
      newCommentLoading: false,
    };
  }

  componentDidMount() {
    if (this.props.data) {
      this.setState({
        data: this.props.data,
      });
      this.retrieveComments(this.props.data);
    }
  }

  retrieveComments(data) {
    if (data == null) return null;
    let parameter = {
      condition: [
        {
          column: "payload",
          value: "tasks",
          clause: "=",
        },
        {
          column: "payload_value",
          clause: "=",
          value: data.id,
        },
      ],
      sort: {
        created_at: "desc",
      },
    };
    this.setState({
      commentIsLoading: true,
    });
    API.request(
      Routes.commentRetrieve,
      parameter,
      (response) => {
        this.setState({
          commentIsLoading: false,
        });
        if (response && response.data && response.data.length > 0) {
          this.setState({
            comments: response.data,
          });
        }
      },
      (error) => {
        this.setState({
          commentIsLoading: false,
        });
      }
    );
  }

  createComment() {
    console.log("hello");
    const { data, newComment } = this.state;
    const { user } = this.props.state;
    if (user == null) return null;
    if (data == null || newComment == null || newComment == "") return null;
    console.log({
      data,
      newComment,
      user,
    });
    if (data == null) return null;
    let parameter = {
      account_id: user.id,
      payload: "tasks",
      payload_value: data.id,
      text: newComment,
    };
    this.setState({
      newCommentLoading: true,
    });
    API.request(
      Routes.commentCreate,
      parameter,
      (response) => {
        this.setState({
          newCommentLoading: false,
        });
        if (response && response.data) {
          let comments = this.state.comments;
          if (comments && comments.length >= 0) {
            comments.unshift({
              ...parameter,
              created_at: "Just now",
              id: response.data,
            });
            this.setState({
              comments,
              newComment: null,
            });
          }
        }
      },
      (error) => {
        this.setState({
          newCommentLoading: false,
        });
      }
    );
  }

  handleRightAction(item) {
    if (item) {
      switch (item.title.toLowerCase()) {
        case "delete":
          {
            this.props.onDelete(this.props.data);
          }
          break;
      }
    }
  }

  header() {
    const { data } = this.state;
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
        </div>
      </Modal.Header>
    );
  }

  title(title, icon) {
    return (
      <p style={style.title}>
        <FontAwesomeIcon icon={icon} style={style.icon} />
        {title}
      </p>
    );
  }
  description() {
    const { data } = this.state;
    return (
      <div>
        {this.title("Description", faBars)}
        <TextArea
          placeholder={"Description"}
          type={"text"}
          value={data.description}
          onChange={(description) => {
            this.setState({
              data: {
                ...data,
                description,
              },
            });
          }}
          enterEnable={true}
          onEnter={() => {
            this.props.onUpdate({
              ...this.props.data,
              description: data.description,
            });
          }}
          style={{
            height: 150,
            marginTop: "10px",
            marginBottom: "10px",
            fontSize: BasicStyles.fontSize,
          }}
          rows={5}
          validation={{
            type: "text_without_space",
            size: 0,
            column: "Message",
          }}
        />
      </div>
    );
  }

  newComment() {
    const { user } = this.props.state;
    const { newComment, newCommentLoading } = this.state;
    return (
      <div
        style={{
          width: "100%",
          float: "left",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            float: "left",
            width: "10%",
          }}
        >
          <ProfilePicture size={30} iconSize={"lg"} data={user?.profile} />
        </div>

        <div
          style={{
            float: "left",
            width: "90%",
          }}
        >
          {newCommentLoading && <Skeleton height={50} />}
          {!newCommentLoading && (
            <TextInput
              placeholder={"Write a comment"}
              type={"text"}
              style={{
                background: "transparent",
                float: "left",
              }}
              value={newComment}
              onChange={(newComment, error) => {
                this.setState({
                  newComment,
                });
              }}
              enterEnable={true}
              onEnter={() => {
                this.createComment();
              }}
              iconStyle={Colors.gray}
              validation={{
                type: "text",
                size: 0,
                column: "Comment",
              }}
            />
          )}
        </div>
      </div>
    );
  }

  commentHeader(account, createdAt) {
    return (
      <div
        style={{
          width: "100%",
          float: "left",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            float: "left",
          }}
        >
          <ProfilePicture size={30} iconSize={"lg"} data={account?.profile} />
        </div>
        <div
          style={{
            width: "90%",
            float: "left",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              paddingLeft: 20,
            }}
          >
            <b>
              {account &&
                account.information &&
                Common.getCompleteName(account.information)}
            </b>
          </div>
          <div>{createdAt}</div>
        </div>
      </div>
    );
  }

  comments() {
    const { comments, commentIsLoading } = this.state;
    return (
      <div>
        {this.title("Comments", faComment)}
        <div
          style={{
            width: "100%",
            float: "left",
          }}
        >
          {this.props.data &&
            (this.props.data.deleted_at == null ||
              this.props.data.deleted_at == "") &&
            this.newComment()}
          {commentIsLoading && <Skeleton height={50} />}
          {!commentIsLoading && (
            <div
              style={{
                width: "100%",
                float: "left",
                marginTop: 20,
                marginBottom: 100,
              }}
            >
              {this.props.data && this.props.data.deleted_at && (
                <div
                  style={{
                    float: "left",
                    width: "100%",
                    marginBottom: 10,
                  }}
                >
                  <p
                    style={{
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {this.props.data.deleted_at != "Just now"
                      ? "Deleted on " + this.props.data.deleted_at
                      : "Deleted just not by you"}
                  </p>
                </div>
              )}
              {comments &&
                comments.map((item) => (
                  <div
                    style={{
                      float: "left",
                      width: "100%",
                      marginBottom: 10,
                    }}
                  >
                    {this.commentHeader(item.account, item.created_at)}
                    <div
                      style={{
                        float: "left",
                        width: "100%",
                        background: Color.activeGray,
                        padding: 10,
                        borderRadius: 12,
                        marginTop: 10,
                      }}
                    >
                      <p
                        style={{
                          padding: 0,
                          margin: 0,
                        }}
                      >
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  rightOption() {
    const { data } = this.state;
    return (
      <div
        style={{
          paddingLeft: 20,
        }}
      >
        <p style={style.title}>Add to card</p>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {rightOptions.map((item) => (
            <li
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 20,
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "space-between",
              }}
              className="cursor-hover task-action-hover"
              onClick={() => {
                this.handleRightAction(item);
              }}
            >
              <span>
                <FontAwesomeIcon icon={item.icon} style={style.icon} />
                {item.title}
              </span>
              {item.title == "Deadline" && (
                <Calendar
                  value={data.due_date}
                  onChange={(value, label) => {}}
                  type={"input"}
                />
              )}
            </li>
          ))}
        </ul>

        <p
          style={{
            ...style.title,
            marginTop: 25,
          }}
        >
          Actions
        </p>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {actions.map((item) => (
            <li
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 20,
              }}
              className="cursor-hover task-action-hover"
              onClick={() => {
                this.handleRightAction(item);
              }}
            >
              <FontAwesomeIcon icon={item.icon} style={style.icon} />
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  status(data) {
    return (
      <div
        style={{
          width: "100%",
          float: "left",
        }}
      >
        <p>
          Status:
          <b
            style={{
              paddingLeft: 5,
              color: Colors.primary,
            }}
          >
            {data.status}
          </b>
        </p>
      </div>
    );
  }

  dueDate(data) {
    return (
      <div
        style={{
          width: "100%",
          float: "left",
        }}
      >
        <p>
          Deadline:
          <b
            style={{
              paddingLeft: 5,
              color: Colors.primary,
            }}
          >
            {data.due_date}
          </b>
        </p>
      </div>
    );
  }

  members(data) {
    return (
      <div
        style={{
          marginBottom: 20,
          width: "100%",
          float: "left",
        }}
      >
        <p>
          <b>Members</b>
        </p>
        <div
          style={{
            width: "100%",
            float: "left",
            display: "flex",
            alignItems: "center",
          }}
        >
          {data.members.map((item) => (
            <div
              style={{
                float: "left",
                marginRight: 10,
              }}
            >
              <ProfilePicture size={40} iconSize={"lg"} data={item.profile} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  checkList(data) {
    return (
      <div
        style={{
          marginBottom: 20,
          width: "100%",
          float: "left",
        }}
      >
        <p>
          <b>Checklist</b>
        </p>
        <div
          style={{
            width: "100%",
            float: "left",
            display: "flex",
            alignItems: "center",
          }}
        ></div>
      </div>
    );
  }

  body() {
    const { data } = this.state;
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
          <div
            style={{
              width: "65%",
              float: "left",
            }}
          >
            {this.title(data.title, faPager)}
            {this.status(data)}
            {data.due_date && this.dueDate(data)}
            {data.members && this.members(data)}
            {this.description()}
            {this.checkList()}
            {this.comments()}
          </div>
          <div
            style={{
              float: "left",
              width: "35%",
            }}
          >
            {this.rightOption()}
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
        scrollable={true}
      >
        {data && this.header()}

        {data && this.body()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Stack);
