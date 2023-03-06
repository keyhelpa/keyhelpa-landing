import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Colors from "common/Colors";
import Common from "modules/generic/helper/Common";
import { HelpOutline, Verified } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import Helper from "modules/generic/helper/Common";
import { BasicStyles } from "common";
import HelperConfig from "common/Helper";
import ConfirmationModal from "modules/generic/modal/confirmation";
import API from "services/api";
import Routes from "common/Routes";

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requirements: null,
      additionalInformations: null,
      admin_fees: 0,
    };
  }

  componentDidMount() {
    const { data } = this.props;
    let parameter = {
      condition: [
        {
          column: "payload",
          value: "service_fee",
          clause: "=",
        },
        {
          column: "category",
          value: "service_fee",
          clause: "=",
        },
      ],
    };
    API.request(Routes.payloadsRetrieve, parameter, (response) => {
      if (response.data) {
        this.setState({
          admin_fees: response.data[0].payload_value,
        });
      }
    });
    if (
      data &&
      data.proposal.job.merchant &&
      data.proposal.job.merchant.addition_informations
    ) {
      this.setState({
        additionalInformations: JSON.parse(
          data.proposal.job.merchant.addition_informations
        ),
      });
    }
  }

  onCancel() {
    const { selected } = this.state;
    const { data } = this.props;
    if (data == null || (data && data.proposal == null)) return;
    this.setState({
      modalLoading: true,
    });
    API.request(
      Routes.proposalUpdate,
      {
        id: data.proposal.id,
        status: "cancelled",
      },
      (response) => {
        this.setState({
          modalLoading: false,
          cancelProposal: false,
        });
        this.props.onCancelProposal();
      },
      (error) => {
        this.setState({
          modalLoading: false,
          cancelProposal: false,
        });
      }
    );
  }

  renderRow(data) {
    return (
      <span style={style.full}>
        <h4
          style={{
            fontWeight: "bolder",
          }}
        >
          {data.value}
        </h4>
        <p
          style={{
            fontWeight: "bold",
            color: Colors.gray,
          }}
        >
          {data.label}
        </p>
      </span>
    );
  }

  handleCategory(index) {
    const { data } = this.props;
    if (
      data &&
      data.proposal.job.categories &&
      data.proposal.job.categories.length > 0
    ) {
      return data.proposal.job.categories[index].name;
    }
  }

  renderMobileLeft(data) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ paddingLeft: 20 }} className="full-width-mobile">
          {data.hourly_rate &&
            this.renderRow({
              value:
                Common.getAmountWithCurrency(data.currency, data.hourly_rate) +
                "/hr",
              label: "Hourly rate",
            })}

          {data.additional_details &&
            data.additional_details.weekly_payment &&
            this.renderRow({
              value: Common.getAmountWithCurrency(
                data.currency,
                data.additional_details.weekly_payment
              ),
              label: "Weekly payment",
            })}

          {data.additional_details &&
            data.additional_details.total_hours &&
            this.renderRow({
              value: data.additional_details.total_hours + " hrs",
              label: "Total number of hours",
            })}

          {data.additional_details &&
            data.additional_details.total_value &&
            this.renderRow({
              value: Common.getAmountWithCurrency(
                data.currency,
                data.additional_details.total_value
              ),
              label: "Total value",
              icon: true,
            })}
        </div>

        <div style={{ width: "100%" }}>
          {data.additional_details &&
            data.additional_details.number_of_weeks &&
            this.renderRow({
              value: data.additional_details.number_of_weeks,
              label: "Total number of weeks",
            })}

          {data.additional_details &&
            data.additional_details.daily_schedule &&
            this.renderRow({
              value: data.additional_details.daily_schedule.title,
              label: "Time slot",
            })}

          {this.renderRowPopularity({
            value: 0,
            label: "Job popularity",
          })}

          {data.merchant &&
            this.renderRowPaymentVerified({
              value: data.merchant.payment_verified,
              label: "Payment method verified",
            })}
        </div>
      </div>
    );
  }

  renderRowPaymentVerified(data) {
    return (
      <span style={style.full}>
        <SvgIcon
          component={Verified}
          style={{
            fontSize: BasicStyles.iconSize,
            color: data.payment_verified ? Colors.primary : Colors.lighterText,
          }}
        />
        <b>{data.label}</b>
      </span>
    );
  }

  renderRowPopularity(data) {
    return (
      <span style={style.full}>
        <SvgIcon
          component={Verified}
          style={{
            fontSize: BasicStyles.iconSize,
            color: data.payment_verified ? Colors.primary : Colors.lighterText,
          }}
        />
        <span
          style={{
            ...style.full,
            fontWeight: "bold",
            color: Colors.lighterText,
          }}
        >
          {data.label}
          <SvgIcon
            component={HelpOutline}
            style={{
              marginLeft: 5,
              fontSize: BasicStyles.iconSize,
            }}
          />
        </span>
      </span>
    );
  }

  left(data) {
    return (
      <div
        style={{
          ...style.full,
          paddingLeft: 20,
          paddingRight: 20,
          color: Colors.gray,
        }}
      >
        {data.hourly_rate &&
          this.renderRow({
            value:
              Common.getAmountWithCurrency(
                data.currency,
                Number(data.hourly_rate)
              ) + "/hr",
            label: "Hourly rate",
          })}

        {data.additional_details &&
          data.additional_details.weekly_payment &&
          this.renderRow({
            value: Common.getAmountWithCurrency(
              data.currency,
              data.additional_details.weekly_payment
            ),
            label: "Weekly payment",
          })}

        {data.additional_details &&
          data.additional_details.total_hours &&
          this.renderRow({
            value: data.additional_details.total_hours + " hrs",
            label: "Total number of hours",
          })}

        {data.additional_details &&
          data.additional_details.total_value &&
          this.renderRow({
            value: Common.getAmountWithCurrency(
              data.currency,
              data.additional_details.total_value
            ),
            label: "Total value",
            icon: true,
          })}

        {data.additional_details &&
          data.additional_details.number_of_weeks &&
          this.renderRow({
            value: data.additional_details.number_of_weeks,
            label: "Total number of weeks",
          })}

        {data.additional_details &&
          data.additional_details.daily_schedule &&
          this.renderRow({
            value: data.additional_details.daily_schedule.title,
            label: "Time slot",
          })}

        {this.renderRowPopularity({
          value: 0,
          label: "Job popularity",
        })}
        {data.merchant &&
          this.renderRowPaymentVerified({
            value: data.merchant.payment_verified,
            label: "Payment method verified",
          })}
      </div>
    );
  }

  renderText(data, border = true) {
    return (
      <div
        style={{
          padding: 30,
          borderBottom: border ? "solid 1px " + Colors.lightGray : "none",
          color: Colors.gray,
          width: "100%",
          float: "left",
        }}
      >
        <h3
          style={{
            marginBottom: 20,
            fontWeight: "bold",
          }}
        >
          {data.title}
        </h3>
        {data.content()}
      </div>
    );
  }

  leftExperience(cert, from = null) {
    return (
      <div
        style={{
          width: "100%",
          float: "left",
        }}
      >
        {cert !== null && cert.length > 0 && (
          <span>
            <p style={{ fontWeight: "bold" }}>{cert[0].title}</p>
            <p
              style={{
                color: Colors.lighterText,
              }}
            >
              Experience in real estate industry
            </p>
          </span>
        )}
      </div>
    );
  }

  category(datum, from = null) {
    return (
      <div
        style={{
          width: "100%",
          float: "left",
        }}
      >
        {datum?.experience &&
          datum?.experience.map((item, index) => (
            <div key={index} className="container-50-full-mobile">
              <span>
                <p style={{ fontWeight: "bold" }}>{item.title}</p>
                <p
                  style={{
                    color: Colors.lighterText,
                  }}
                >
                  Experience in {this.handleCategory(index)}
                </p>
              </span>
            </div>
          ))}
      </div>
    );
  }

  rightExperience(vaccine) {
    return (
      <div
        style={{
          width: "100%",
          float: "left",
        }}
      >
        {vaccine && (
          <span>
            <p style={{ fontWeight: "bold" }}>{vaccine?.title}</p>
            <p
              style={{
                color: Colors.lighterText,
              }}
            >
              Vaccination status
            </p>
          </span>
        )}
      </div>
    );
  }

  right(data, from) {
    const { additionalInformations } = this.state;
    return (
      <div
        style={{
          ...style.full,
        }}
        className="full-width-mobile no-padding-mobile"
      >
        {data && data.proposal && (
          <div
            style={{
              paddingTop: 30,
              paddingLeft: 30,
              paddingRight: 30,
              // borderBottom: 'solid 1px ' + Colors.lightGray,
              width: "100%",
              float: "left",
            }}
          >
            {HelperConfig.ACCOUNT_TYPE == "Freelancer" ? (
              <h3
                style={{
                  marginBottom: 20,
                  fontWeight: "bold",
                }}
              >
                Your proposed terms
              </h3>
            ) : (
              <h3
                style={{
                  marginBottom: 20,
                  fontWeight: "bold",
                }}
              >
                Helpa's proposed terms
              </h3>
            )}

            <div
              style={{
                width: "100%",
                float: "left",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: 25,
                paddingTop: 5,
                borderBottom: "solid 1px " + Colors.lightGray,
              }}
            >
              {HelperConfig.ACCOUNT_TYPE == "Freelancer" ? (
                <b>Your proposed hourly rate</b>
              ) : (
                <b>Helpa's proposed hourly rate</b>
              )}

              <b>
                {Helper.getAmountWithCurrency(
                  data.proposal.currency,
                  data.proposal.amount
                )}
              </b>
            </div>
            <div
              style={{
                width: "100%",
                float: "left",
                marginTop: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: 25,
                paddingTop: 5,
                borderBottom: "solid 1px " + Colors.lightGray,
              }}
            >
              <span
                style={{
                  // ...style.full,
                  fontWeight: "bold",
                }}
              >
                KeyHelpa's service fee is {this.state.admin_fees}%
                <SvgIcon
                  component={HelpOutline}
                  style={{
                    marginLeft: 5,
                    marginBottom: 5,
                    color: Colors.lighterText,
                    fontSize: BasicStyles.iconSize - 10,
                  }}
                />
              </span>

              <b>
                {Helper.getFeeCalculation(
                  {
                    type: "percentage",
                    fee: this.state.admin_fees,
                  },
                  data.proposal.amount,
                  data.proposal.currency
                )}
              </b>
            </div>

            <div
              style={{
                width: "100%",
                float: "left",
                marginTop: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: 25,
                paddingTop: 5,
                borderBottom: "solid 1px " + Colors.lightGray,
              }}
            >
              {HelperConfig.ACCOUNT_TYPE == "Freelancer" ? (
                <span
                  style={{
                    // ...style.full,
                    fontWeight: "bold",
                  }}
                >
                  You'll receive
                  <SvgIcon
                    component={HelpOutline}
                    style={{
                      marginLeft: 5,
                      marginBottom: 5,
                      color: Colors.lighterText,
                      fontSize: BasicStyles.iconSize - 10,
                    }}
                  />
                </span>
              ) : (
                <span
                  style={{
                    // ...style.full,
                    fontWeight: "bold",
                  }}
                >
                  Helpa will receive
                  <SvgIcon
                    component={HelpOutline}
                    style={{
                      marginLeft: 5,
                      marginBottom: 5,
                      color: Colors.lighterText,
                      fontSize: BasicStyles.iconSize - 10,
                    }}
                  />
                </span>
              )}
              <b>
                {Helper.getReceiveFeeCalculation(
                  {
                    type: "percentage",
                    fee: this.state.admin_fees,
                  },
                  data.proposal.amount,
                  data.proposal.currency
                )}
              </b>
            </div>

            <div style={{ marginLeft: -30 }}>
              {this.renderText(
                {
                  title:
                    "Message to you by Helpa why they are fit for the job.",
                  content: () => {
                    return (
                      <span>
                        <p>{data.proposal.details.message}</p>
                      </span>
                    );
                  },
                },
                { border: true }
              )}
            </div>
          </div>
        )}

        {this.renderText({
          title: "About the job",
          content: () => {
            return (
              <span
                style={{
                  textAlign: "justify",
                }}
              >
                <p>{data.proposal.job.description}</p>
              </span>
            );
          },
        })}

        {data.proposal.job.requirements &&
          data.proposal.job.requirements?.tasks &&
          data.proposal.job.requirements?.tasks.length > 0 &&
          this.renderText({
            title: "Tasks & responsibilities",
            content: () => {
              return (
                <ul>
                  {data.proposal.job.requirements?.tasks.map((el, index) => (
                    <li key={index}>{el}</li>
                  ))}
                </ul>
              );
            },
          })}

        {data.proposal.job.requirements &&
          this.renderText({
            title: "Job requirements",
            content: () => {
              return (
                <div
                  style={{
                    width: "100%",
                    float: "left",
                    marginBottom: 50,
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      float: "left",
                    }}
                  >
                    {data.proposal.job.requirements !== null &&
                      data.proposal.job.requirements?.experience.length > 0 &&
                      this.category(data.proposal.job.requirements)}
                  </div>

                  <div
                    style={{
                      width: "100%",
                      float: "left",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        float: "left",
                      }}
                    >
                      {data.proposal.job.requirements !== null &&
                        this.leftExperience(
                          data.proposal.job.requirements.cert
                        )}
                    </div>

                    <div
                      style={{
                        width: "100%",
                        float: "left",
                      }}
                    >
                      {data.proposal.job.requirements &&
                        this.rightExperience(
                          data.proposal.job.requirements.vaccine
                        )}
                    </div>
                  </div>
                  <p style={{ fontWeight: "bold" }}>
                    This job requires you to travel between properties listed
                    below
                  </p>
                  <div>
                    <ol>
                      {data &&
                        data?.proposal.job.job_terms?.daily_schedule &&
                        data?.proposal.job.job_terms?.daily_schedule.length >
                          0 &&
                        data?.proposal.job.job_terms?.daily_schedule.map(
                          (el, ndx) => (
                            <li
                              key={ndx}
                              style={{
                                borderSpacing: "10px",
                                borderCollapse: "separate",
                                display: "flex",
                                justifyContent: "space-between",
                                marginRight: "50%",
                              }}
                              className="container-100"
                            >
                              <span>
                                {ndx +
                                  1 +
                                  ". " +
                                  el.address.charAt(0).toUpperCase() +
                                  el.address.substring(1).toLowerCase()}
                              </span>
                              <span>{el.hours_per_day} hour/s per day</span>
                              <span>{el.start_date + " - " + el.end_date}</span>
                              <span>{el.instructions}</span>
                            </li>
                          )
                        )}
                    </ol>
                  </div>
                </div>
              );
            },
          })}

        {additionalInformations &&
          additionalInformations.about &&
          this.renderText(
            {
              title: "About the agency",
              content: () => {
                return (
                  <div
                    style={{
                      width: "100%",
                      float: "left",
                      paddingBottom: 50,
                    }}
                  >
                    <p>{additionalInformations.about}</p>
                  </div>
                );
              },
            },
            false
          )}
      </div>
    );
  }

  render() {
    const { data, from } = this.props;
    const { cancelProposal } = this.state;
    return (
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
          className="hide-on-mobile"
        >
          {data &&
            data.proposal.job.job_terms &&
            this.left(data.proposal.job.job_terms)}
        </div>

        <div
          style={{
            width: "100%",
            float: "left",
          }}
          className="show-on-mobile"
        >
          {data &&
            data.proposal.job.job_terms &&
            this.renderMobileLeft(data.proposal.job.job_terms)}
        </div>

        <div
          style={{
            width: "80%",
            float: "left",
            borderLeft: "solid 1px " + Colors.lightGray,
          }}
          className="full-width-mobile no-border-mobile no-padding-mobile"
        >
          {this.right(data, from)}
        </div>

        {cancelProposal && (
          <ConfirmationModal
            show={cancelProposal}
            title="Confirmation"
            message="Are you sure you want to end this contract?"
            onCancel={() => {
              this.setState({
                cancelProposal: false,
              });
            }}
            isLoading={this.state.modalLoading}
            onContinue={() => {
              this.onEnd();
            }}
          />
        )}
      </div>
    );
  }
}

const style = {
  full: {
    float: "left",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
  },
};
const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("reduxhandler");
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));
