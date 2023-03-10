import React from "react";
import VerifyButton from "@passbase/button/react";
import Colors from "common/Colors";
import config from "config.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SelectInput from "components/increment/generic/form/SelectInput";
import Calendar from "components/increment/generic/form/Calendar";
import TextInput from "components/increment/generic/form/TextInput";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: null,
      sortSelected: "Jobs",
      start: null,
      startLabel: null,
      end: null,
      endLabel: null,
    };
  }

  manageDate(date) {
    let yy = date.getFullYear();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    return yy + "-" + mm + "-" + dd;
  }

  render() {
    const { searchValue, sortSelected, start, startLabel, end, endLabel } =
      this.state;
    return (
      <div
        style={{
          float: "left",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 25,
        }}
      >
        <div
          style={{
            float: "left",
            width: "40%",
          }}
        >
          <div
            style={{
              float: "left",
              width: 250,
            }}
          >
            <Calendar
              value={start}
              valueLabel={startLabel}
              placeholder={"Start date"}
              onChange={(start, startLabel) => {
                this.setState({
                  start,
                  startLabel,
                });
              }}
            />
          </div>
          <div
            style={{
              float: "left",
              marginLeft: "1%",
              width: 250,
            }}
          >
            {start && (
              <Calendar
                value={start}
                valueLabel={endLabel}
                placeholder={"End date"}
                minDates={start}
                onChange={(end, endLabel) => {
                  this.setState({
                    end,
                    endLabel,
                  });
                  setTimeout(() => {
                    this.props.retrieve({
                      start: this.manageDate(start),
                      end: this.manageDate(end),
                      searchValue,
                    });
                  }, 100);
                }}
              />
            )}
          </div>
        </div>
        <div
          style={{
            float: "left",
          }}
        >
          <div
            style={{
              float: "left",
              width: 200,
            }}
          >
            <TextInput
              placeholder={"Search"}
              type={"text"}
              style={{
                background: "transparent",
                float: "left",
              }}
              value={searchValue}
              onChange={(searchValue, error) => {
                this.setState({
                  searchValue,
                });
              }}
              iconLeft={faSearch}
              iconStyle={Colors.gray}
              validation={{
                type: "text_without_space",
                size: 0,
                column: "Region",
              }}
            />
          </div>

          <div
            style={{
              float: "left",
              marginLeft: 10,
              width: 200,
            }}
          >
            <SelectInput
              items={this.props.sortData}
              value={sortSelected}
              onChange={(sortSelected) => {
                this.props.manageSort(sortSelected);
                this.setState({
                  sortSelected,
                });
              }}
              selectStyle={{
                borderBottom: "solid 3px " + Colors.borderBottom,
              }}
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
