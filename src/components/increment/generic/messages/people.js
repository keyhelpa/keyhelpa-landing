import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Colors from "common/Colors";
import API from "services/api";
import Routes from "common/Routes";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import _ from "lodash";
import Config from "config";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Helper from "modules/generic/helper/Common";
const { REACT_APP_API_URL } = process.env;
class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      limit: 4,
      offset: 0,
      data: [],
    };
  }

  componentDidMount() {
    this.retrieveMessengerGroup(false);
    document
      .getElementsByClassName("people-container")[0]
      .addEventListener("scroll", (event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
          this.retrieve();
        }
      });
  }

  retrieveMessengerGroup = (flag) => {
    const { user } = this.props.state;
    const { limit, offset, data } = this.state;
    if (user === null) return;
    let parameter = {
      account_id: user.id,
    };
    this.setState({ isLoading: true });
    API.request(
      Routes.messengerGroupRetrieve,
      parameter,
      (response) => {
        this.setState({ isLoading: false });
        console.log({
          response,
        });
        if (response.data.length > 0) {
          let temp = response.data.map((item) => {
            return {
              ...item,
              position: null,
              read: false,
            };
          });
          this.setState({
            data: flag === false ? temp : _.uniqBy([...data, ...temp], "id"),
            offset: flag === false ? 1 : offset + 1,
          });
        } else {
          this.setState({
            data: flag === false ? [] : data,
            offset: flag === false ? 0 : offset,
          });
        }
      },
      (error) => {
        this.setState({ isLoading: false });
      }
    );
  };

  retrieve = () => {
    this.retrieveMessengerGroup(true);
  };

  renderProfile(item) {
    return (
      <div>
        {item.account.profile && item.account.profile.url ? (
          <img
            src={REACT_APP_API_URL + item.account.profile.url}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              marginRight: 20,
              border: "1px solid #E62D7E",
            }}
          />
        ) : (
          <AccountCircleIcon
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              marginRight: 20,
              border: "1px solid #E62D7E",
            }}
          />
        )}
      </div>
    );
  }

  renderBody(item) {
    return (
      <div
        style={{
          width: "90%",
          float: "left",
        }}
      >
        <div
          style={{
            width: "100%",
            float: "left",
          }}
        >
          {item.account && item.account.information && (
            <span
              style={{
                color: Colors.gray,
                fontWeight: "bold",
                float: "left",
              }}
            >
              {Helper.getCompleteName(item.account.information)}
            </span>
          )}

          <span
            style={{
              color: Colors.rgbaGray,
              float: "right",
            }}
          >
            {item.created_at}
          </span>
        </div>
        {item.account && item.account.experience && (
          <span
            style={{
              color: Colors.rgbaGray,
              width: "100%",
              float: "left",
            }}
          >
            {item.account.experience.title}
          </span>
        )}

        {item.last_message && (
          <span
            style={{
              color: Colors.darkGray,
              fontWeight: "bold",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
            }}
          >
            {item.last_message.message}
          </span>
        )}
      </div>
    );
  }

  render() {
    const { data, isLoading } = this.state;
    const { user } = this.props.state;
    return (
      <div
        style={{
          overflowY: "scroll",
          height: "56vh",
          padding: "0px 25px 25px 25px",
        }}
        className={"people-container"}
      >
        {isLoading &&
          [1, 2, 3, 4].map((item, index) => (
            <Skeleton
              key={index}
              height={150}
              style={{ marginBottom: 20, borderRadius: 5 }}
            />
          ))}
        {data.length === 0 && !isLoading && (
          <p>You have no messages as of the moment.</p>
        )}
        {data.length > 0 &&
          data.map((item, ndx) => {
            return (
              <div
                key={"msg" + ndx}
                id={"msg" + ndx}
                style={{
                  width: "100% !important",
                  marginTop: "10px",
                  marginBottom: ndx + 1 === data.length ? "60px" : "10px",
                  display: "flex",
                  background: Colors.activeGray,
                  padding: 15,
                  paddingTop: 20,
                  paddingBottom: 20,
                  borderRadius: 25,
                  cursor: "pointer",
                  justifyContent: "space-between",
                }}
                onClick={() => {
                  this.props.setActiveMessage(item);
                }}
              >
                {item.account && item.account && this.renderProfile(item)}
                {this.renderBody(item)}
              </div>
            );
          })}
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
