import React from "react";
import { BasicStyles } from "common";
import Colors from "common/Colors";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class RightClick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  clickHandler = (item) => {
    const { from, data } = this.props;
    switch (item.title.toLowerCase()) {
      case "view details":
        this.props.history.push("/folder");
        break;
      case "view file":
        this.props.history.push("/file");
        break;
      case "add new client":
        this.props.onCreate();
        break;
      case "rename":
        this.props.onRename();
        break;
      case "remove":
        this.props.onDelete();
        break;
      case "download":
        break;
      case "move to":
        break;
      case "go to analysis":
        this.props.history.push("/analysis");
        break;
    }
  };

  render() {
    const { menu } = this.props;
    return (
      <div
        style={{
          position: "relative",
          right: -75,
          top: this.props.from == "file" ? 50 : -30,
          height: 250,
          width: 250,
          backgroundColor: Colors.white,
          borderRadius: 5,
          zIndex: 900,
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        }}
      >
        <span
          style={{
            position: "relative",
            top: this.props.from == "file" ? -180 : 0,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          {menu &&
            menu.map((item, index) => (
              <div
                style={{
                  width: "100%",
                  padding: 10,
                  zIndex: 999,
                  color: item.color,
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                }}
                className="href-link-dropdown"
                key={index}
                onClick={() => {
                  this.clickHandler(item);
                }}
              >
                <FontAwesomeIcon icon={item.icon} size={"lg"} />
                <b
                  style={{
                    paddingLeft: 10,
                  }}
                >
                  {item.title}
                </b>
              </div>
            ))}
        </span>
      </div>
    );
  }
}

export default withRouter(RightClick);
