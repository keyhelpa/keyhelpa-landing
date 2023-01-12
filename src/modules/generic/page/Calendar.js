import React from "react";
import Colors from "common/Colors";
import { connect } from "react-redux";
import Style from "./Style";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { withRouter } from "react-router-dom";
import moment from "moment";
import BreadCrumbs from "modules/generic/breadcrumbs";
import DesktopView from "modules/generic/page/DesktopOnlyView";
import EventModal from "modules/generic/modal/CalendarEvent";
import API from "services/api";
import Routes from "common/Routes";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

// [{
//   allDay: false,
//   end: new Date('2022-07-19T20:38:28.061Z'),
//   start: new Date('2022-07-19T19:38:28.061Z'),
//   title: 'test'
// }]

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      events: [],
    };
  }

  componentDidMount() {
    this.retrieve();
  }

  retrieve() {
    const { user } = this.props.state;
    if (user == null) return;
    this.setState({
      isLoading: true,
    });
    API.request(
      Routes.eventsRetrieve,
      {
        condition: [
          {
            value: user.id,
            column: "account_id",
            clause: "=",
          },
        ],
      },
      (response) => {
        this.setState({
          isLoading: false,
        });
        if (response.data.length > 0) {
          let events = response.data.map((item) => {
            return {
              ...item,
              end: new Date(item.end_date + " " + item.end_time),
              start: new Date(item.start_date + " " + item.start_time),
              allDay: false,
            };
          });
          this.setState({
            events,
          });
        } else {
        }
      },
      (error) => {
        this.setState({
          isLoading: false,
        });
      }
    );
  }

  render() {
    const { modal } = this.state;
    return (
      <div
        style={{
          float: "left",
          width: "100%",
          marginBottom: 100,
          marginTop: 50,
        }}
      >
        <BreadCrumbs
          title={"Calendar"}
          page={"calendar"}
          backIcon={true}
          description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam."
          style={{
            borderBottomWidth: 0,
          }}
          onClickButton={() => {
            this.setState({
              modal: true,
            });
          }}
        />

        <div
          style={{
            width: "100%",
            float: "left",
          }}
          className="hide-on-mobile"
        >
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={this.state.events}
            style={{ height: "100vh" }}
          />
        </div>

        <div
          style={{
            width: "100%",
            float: "left",
          }}
          className="hide-on-desktop"
        >
          <DesktopView />
        </div>
        {modal && (
          <EventModal
            show={true}
            title="Add Event"
            subTitle="Add event to your calendar"
            onCancel={() => {
              this.setState({
                modal: false,
              });
            }}
            onComplete={() => {
              this.retrieve();
              this.setState({
                modal: false,
              });
            }}
          />
        )}
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
