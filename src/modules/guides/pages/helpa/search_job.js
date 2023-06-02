import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Colors from "common/Colors";
import VideoCard from "modules/guides/videoCard";
import "./helpa.css";
import Data from "modules/guides/data";
import Config from "common/Config";
class Stack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Data.helpa,
      url: null,
    };
  }
  componentDidMount() {
    this.handleLoad();
  }
  handleLoad() {
    const { data } = this.state;
    return (
      <div>
        {data.map((item) => {
          if (this.props.history.location.pathname === item.route) {
            this.setState({
              url: item.url,
            });
          }
        })}
      </div>
    );
  }
  renderContent() {
    return (
      <div
        style={{
          marginTop: 30,
        }}
      >
        <p>
          Use KeyHelpa’s filter search to filter jobs based on your preferences.
        </p>
        <ul>
          <li>
            Once your account is done with profile setup and has been validated,
            your web app header will have a search field where you can filter
            your search on the jobs that match your skills and interests.
          </li>
          <li>
            On your “Find work” page is where you will see all the results of
            your search or where you could view your matched jobs.
          </li>
        </ul>
        <p>Follow the instructions below to know how filter works:</p>
        <ol type="1">
          <li>
            On your web app header, click the “” icon on the search field. Then
            you will be prompted to “Filter jobs” modal or pop-up.
          </li>
          <li>
            On the “Filter jobs” modal, you may set the following filters:
          </li>
          <ul>
            <li>
              <b className="b-helpa">Region</b> - you may select from what
              regions you want your preferred job is/are from.
            </li>
            <li>
              <b className="b-helpa">Categories</b> - you can select as many
              categories as you want depending on your interest in skills such
              as residentials sales, sales marketing, accounts management, and
              many more.
            </li>
            <li>
              <b className="b-helpa">Hourly Rate</b> - you can select the hourly
              range of the job costs that you want to get paid.
            </li>
            <li>
              <b className="b-helpa">Vaccination</b> - you can set the
              vaccination status of the job requirements you are looking for
              such as fully vaccinated, not vaccinated or not negotiable.
            </li>
            <li>
              <b className="b-helpa">Experience</b> - you can set the experience
              level you are looking for a job hiring.
            </li>
            <li>
              <b className="b-helpa">Payment</b> - you can select those jobs
              whose Agent has Payment Verified status or Not Verified.
            </li>
            <li>
              <b className="b-helpa">Certification</b> - you can set your
              certification requirements status that an Agent has set for the
              job to be qualified to the job Agent is hiring.
            </li>
            <li>
              <b className="b-helpa">Popularity</b> - you can set the percentage
              of popularity of an Agent when doing job contracts with Helpas.
            </li>
          </ul>
          <p>
            Once done with setting all the parameters you want to be filtered,
            just click the “Set Filter” button to save your filter settings.
            Otherwise, click the “Clear All” if you want to reset your filter
            settings.{" "}
          </p>
          <li>
            After you click the “Set Filter” button, the “Filter jobs” modal
            will automatically close and on the “Find works” page will give you
            the matched job hiring results of your filter. Otherwise, if the
            filter is reset, the matched jobs will be back into the default
            random results.
          </li>
        </ol>
        <p>
          If you have any concerns or inquiries, please don’t hesitate to{" "}
          <a href="../contact_us">contact us</a>.{" "}
        </p>
      </div>
    );
  }
  render() {
    const { url } = this.state;
    const { theme } = this.props;
    return (
      <div
        style={{
          width: "100%",
          float: "left",
        }}
      >
        <p
          style={{
            color:
              theme === "agent" ? Colors.agentTextTitle : Colors.helpaTextTitle,
            marginBottom: "5%",
          }}
        >
          Are you looking for freelancer jobs where you could work on real
          estate projects at your preferred location, experience, or
          availability? Get the chance to work on the jobs that match your
          interests and skills. Start searching among the job postings published
          by our Agent now!
        </p>
        {url && <VideoCard url={url} />}
        {this.renderContent()}
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
