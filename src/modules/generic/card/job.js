import React from "react";
import Colors from "common/Colors";
import Ratings from "modules/generic/form/Rating";
import Button from "components/increment/generic/form/Button";
import Helper from "modules/generic/helper/Common";
import { SvgIcon } from "@mui/material";
import { Help, LocationOn, Place, Verified } from "@mui/icons-material";
import { BasicStyles } from "common";
import { ProgressBar } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
export default class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      more: false,
    };
  }

  header(data) {
    return (
      <div>
        <span
          style={{
            width: "100%",
            float: "left",
          }}
        >
          <h3>{Helper.getFirstLetterCapitalize(data.title)}</h3>
        </span>

        <div
          style={{
            width: "100%",
            float: "left",
            paddingTop: 10,
            display: "flex",
            alignItems: "center",
          }}
          className="unset-flex-mobile"
        >
          <div
            style={{
              float: "left",
              paddingRight: 20,
            }}
            className="full-width-mobile mb-mobile-15"
          >
            <Ratings value={data.rating} />
          </div>

          <span
            style={{
              borderLeft: "solid 1px " + Colors.gray,
              paddingLeft: 20,
              paddingRight: 20,
            }}
            className="hide-on-mobile"
          >
            <b>{data.merchant.name}</b>
          </span>
          <span
            style={{
              paddingRight: 20,
              float: "left",
            }}
            className="hide-on-desktop"
          >
            <b>{data.merchant.name}</b>
          </span>
          {data.job_terms && (
            <span
              style={{
                borderLeft: "solid 1px " + Colors.gray,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              <b>
                Hourly:{" "}
                {Helper.getAmountWithCurrency(
                  data.job_terms.currency,
                  data.job_terms.hourly_rate
                )}
              </b>
            </span>
          )}
        </div>
      </div>
    );
  }

  body(data) {
    const { more } = this.state;
    return (
      <div
        style={{
          paddingTop: 20,
          paddingBottom: 20,
          float: "left",
          textAlign: "justify",
        }}
      >
        {data.description &&
          data.description.length > 1000 &&
          more == false && (
            <p>
              {data.description.substr(0, 1000)}
              <b
                style={{
                  paddingLeft: 10,
                  color: Colors.primary,
                }}
                className="href-link"
                onClick={() => {
                  this.setState({
                    more: true,
                  });
                }}
              >
                ...see more
              </b>
            </p>
          )}
        {((data.description && data.description.length <= 1000) ||
          more == true) && (
          <p>
            {data.description}
            {more == true && (
              <b
                style={{
                  paddingLeft: 10,
                  color: Colors.primary,
                }}
                className="href-link"
                onClick={() => {
                  this.setState({
                    more: false,
                  });
                }}
              >
                ...see less
              </b>
            )}
          </p>
        )}
      </div>
    );
  }

  tags(data) {
    return (
      <div
        style={{
          paddingBottom: 20,
          float: "left",
        }}
      >
        {data &&
          data.map((item, index) => (
            <div
              key={index}
              style={{
                height: 30,
                borderRadius: 15,
                marginRight: 20,
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                backgroundColor: Colors.lightGray,
                color: Colors.primary,
                fontWeight: "bold",
                paddingLeft: 20,
                paddingRight: 20,
                fontSize: 11,
                float: "left",
              }}
              className="tag-card-mobile"
            >
              {Helper.getFirstLetterCapitalize(item.name)}
            </div>
          ))}
      </div>
    );
  }

  footer(data) {
    const categories = data.categories ? data.categories : [];
    return (
      <div
        style={{
          width: "100%",
          float: "left",
        }}
      >
        <div
          style={{
            float: "left",
            width: "85%",
          }}
          className="full-width-mobile"
        >
          {/* Tags */}
          {categories && (
            <div
              style={{
                width: "100%",
                float: "left",
              }}
            >
              {this.tags(categories)}
            </div>
          )}
        </div>
        <div
          style={{
            width: "100%",
            float: "left",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="full-width-mobile unset-flex-mobile"
        >
          <div
            style={{
              float: "left",
            }}
            className="full-width-mobile"
          >
            {/* Sections */}

            <div
              style={{
                width: "100%",
                float: "left",
                display: "flex",
                alignItems: "center",
                alignContent: "center",
              }}
              className="full-width-mobile unset-flex-mobile"
            >
              <span
                style={{
                  float: "left",
                }}
                className="full-width-mobile mt-mobile-15"
              >
                <span style={{}}>
                  <SvgIcon
                    component={Verified}
                    style={{
                      fontSize: BasicStyles.largeIcon,
                      color:
                        data.merchant && data.merchant.payment_verified
                          ? Colors.primary
                          : Colors.gray,
                      paddingRight: 5,
                    }}
                  />
                  <b>Payment method</b>
                </span>
              </span>

              {data.matching_score && (
                <span
                  style={{
                    float: "left",
                    paddingLeft: 20,
                    paddingRight: 20,
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                  className="padding-unset full-width-mobile mt-mobile-15"
                >
                  <span
                    style={{
                      float: "left",
                    }}
                    data-tip="The score shows<br />how popular the job<br />from this Agent. "
                  >
                    <ReactTooltip
                      place="top"
                      type="light"
                      effect="solid"
                      multiline={true}
                    />
                    <SvgIcon
                      style={{
                        fontSize: BasicStyles.largeIcon,
                        color: Colors.primary,
                        paddingRight: 5,
                      }}
                      component={Help}
                      className="href-link"
                    />
                  </span>
                  <span
                    style={{
                      float: "left",
                    }}
                  >
                    <b>Matching score</b>
                  </span>

                  <div
                    style={{
                      width: 150,
                      marginLeft: 10,
                      float: "left",
                    }}
                  >
                    <ProgressBar
                      now={data.matching_score}
                      label={`${data.matching_score}%`}
                      variant="progress-bar-color"
                    />
                  </div>
                </span>
              )}

              {data.region && (
                <span
                  style={{
                    float: "left",
                  }}
                  className="full-width-mobile mt-mobile-15"
                >
                  <span style={{}}>
                    <SvgIcon
                      component={Place}
                      style={{
                        marginRight: 5,
                        fontSize: BasicStyles.largeIcon,
                        color: Colors.primary,
                      }}
                    />
                    <b>{data.region}</b>
                  </span>
                </span>
              )}
            </div>
          </div>

          {/* Button  */}
          <span className="full-width-mobile">
            <Button
              title={"View job"}
              onClick={() => {
                this.props.navigate("/jobs/view/" + data.code);
              }}
              style={{
                float: "left",
                backgroundColor: "transparent",
                color: Colors.primary,
                border: "solid 1px " + Colors.primary,
              }}
              className="invert-color full-width-mobile mt-mobile-25"
            />
          </span>
        </div>
      </div>
    );
  }

  render() {
    const { data } = this.props;
    return (
      <div
        style={{
          width: "100%",
          borderRadius: 12,
          minHeight: 200,
          overflowY: "hidden",
          backgroundColor: Colors.activeGray,
          padding: 20,
          marginBottom: 25,
        }}
        onClick={() => {}}
      >
        {this.header(data)}
        {this.body(data)}
        {this.footer(data)}
      </div>
    );
  }
}
