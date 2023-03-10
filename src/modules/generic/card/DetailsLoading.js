import React from "react";
import Skeleton from "react-loading-skeleton";
import Colors from "common/Colors";
const style = {
  full: {
    float: "left",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
  },
};
export default class Stack extends React.Component {
  header() {
    return (
      <div
        style={{
          borderBottom: "solid 1px " + Colors.lightGray,
          ...style.full,
        }}
      >
        <Skeleton
          height={200}
          style={{
            backgroundColor: Colors.activeGray,
            borderRadius: 12,
            marginBottom: 25,
          }}
        />
      </div>
    );
  }

  left() {
    return (
      <div
        style={{
          ...style.full,
        }}
      >
        <div className="hide-on-mobile">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <Skeleton
              key={index}
              height={100}
              style={{
                backgroundColor: Colors.activeGray,
                borderRadius: 12,
                marginBottom: 25,
              }}
            />
          ))}
        </div>

        <div className="hide-on-desktop">
          {[1].map((item, index) => (
            <Skeleton
              key={index}
              height={100}
              style={{
                backgroundColor: Colors.activeGray,
                borderRadius: 12,
                marginBottom: 10,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  right() {
    return (
      <div
        style={{
          ...style.full,
          paddingLeft: 25,
        }}
        className="no-pl-on-mobile"
      >
        <Skeleton
          height={"70vh"}
          style={{
            backgroundColor: Colors.activeGray,
            borderRadius: 12,
            marginBottom: 25,
          }}
        />
      </div>
    );
  }

  render() {
    return (
      <div
        style={{
          width: "100%",
          borderRadius: 12,
          minHeight: 200,
          overflowY: "hidden",
          marginBottom: 25,
        }}
      >
        {this.header()}
        <div
          style={{
            width: "100%",
            float: "left",
          }}
        >
          <div
            style={{
              width: "20%",
              float: "left",
            }}
            className="full-width-mobile"
          >
            {this.left()}
          </div>

          <div
            style={{
              width: "80%",
              float: "left",
              borderLeft: "solid 1px " + Colors.lightGray,
            }}
            className="full-width-mobile"
          >
            {this.right()}
          </div>
        </div>
      </div>
    );
  }
}
