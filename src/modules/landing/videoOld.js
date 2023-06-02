import React, { Component } from "react";
import Footer from "modules/generic/frames/footer.js";
import { Container, Box, Grid } from "@mui/material";
import Button from "modules/generic/button";
import bgAgent from "assets/lighterGray.png";
import bgHelpa from "assets/lighterPink.png";
import "./Style.css";
import API from "services/api";
import Routes from "common/Routes";

export class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: this.props.theme,
      data: this.props.data,
      features: [],
      hasFetched: false,
    };
  }
  render() {
    const { data, theme } = this.state;
    return (
      <div>
        {/* Web */}
        <div className="web">
          <div>
            <Grid
              className="gridBg"
              style={
                theme === "agent"
                  ? {
                      backgroundImage: `url(${bgAgent})`,
                      backgroundColor: "#F1F5FB",
                    }
                  : {
                      backgroundImage: `url(${bgHelpa})`,
                      backgroundColor: "#FFFAFC",
                    }
              }
              container
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Grid
                item
                xs={6}
                style={{
                  padding: "5%",
                  textAlign: "left",
                }}
              >
                <h1
                  className="h1-lg"
                  style={{
                    fontWeight: "bold",
                    fontSize: "64px",
                    color: "#34475D",
                    marginBottom: "10%",
                  }}
                >
                  {theme === "agent"
                    ? "What do you need a Helpa for?"
                    : "What kind of work can I help with?"}
                </h1>
                <p
                  style={{
                    fontSize: "18px",
                    color: "#34475DA3",
                  }}
                >
                  {theme === "agent"
                    ? "Do you need help with your property opens this weekend? Need more manpower to complete your inspection reports? Let KeyHelpa find the freelance help you need."
                    : "We’ve got real estate agencies, agents and property managers looking for help from experienced people just like you. You’ll find a range of real estate industry - related jobs right here."}
                </p>
              </Grid>
              <Grid
                item
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
                xs={6}
                textAlign={"right"}
                padding={"5%"}
              >
                {data.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "right",
                        flexBasis: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          textAlign: "right",
                          flexDirection: "column",
                          marginRight: "25px",
                        }}
                      >
                        <h3
                          style={{
                            fontWeight: "bold",
                            fontSize: "20px",
                            color: "#34475D",
                          }}
                        >
                          {item.title}
                        </h3>
                        {item.description.map((val, ctr) => {
                          return <p key={ctr}>{val}</p>;
                        })}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                      >
                        <div
                          style={{
                            marginTop: "25px",
                          }}
                        >
                          <div
                            className="video"
                            dangerouslySetInnerHTML={{ __html: item.url }}
                          ></div>
                          {/* <iframe  width="400" height="300" src={`${item.payload_value.helps.url}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                        </div>
                      </Box>
                    </div>
                  );
                })}
              </Grid>
            </Grid>
          </div>
        </div>
        {/* Mobile */}
        <div className="mobile">
          <Grid
            className="gridBg"
            style={
              theme === "agent"
                ? {
                    backgroundImage: `url(${bgAgent})`,
                    backgroundColor: "#F1F5FB",
                  }
                : {
                    backgroundImage: `url(${bgHelpa})`,
                    backgroundColor: "#FFFAFC",
                  }
            }
            container
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Grid
              item
              xs={10}
              style={{
                padding: "5%",
                textAlign: "left",
              }}
            >
              <h1 className="videoHeader">
                {theme === "agent"
                  ? "What do you need a Helpa for?"
                  : "What kind of work can I help with?"}
              </h1>
              <h3 className="videoSubHeader">
                {theme === "agent"
                  ? "Do you need help with your property opens this weekend? Need more manpower to complete your inspection reports? Let KeyHelpa find the freelance help you need."
                  : "We’ve got real estate agencies, agents and property managers looking for help from experienced people just like you. You’ll find a range of real estate industry-related jobs right here."}
              </h3>
              {data.map((item, index) => {
                return (
                  <div key={index}>
                    <Box
                      sx={{
                        justifyContent: "center",
                        textAlign: "center",
                        flexDirection: "column",
                        marginTop: "25px",
                        marginBottom: "25px",
                      }}
                    >
                      <div dangerouslySetInnerHTML={{ __html: item.url }}></div>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                        flexDirection: "column",
                        marginRight: "25px",
                      }}
                    >
                      <h3
                        style={{
                          fontWeight: "bold",
                          fontSize: "20px",
                          color: "#34475D",
                          marginTop: "25px",
                        }}
                      >
                        {item.title}
                      </h3>
                      {item.description.map((val, ctr) => {
                        return <p key={ctr}>{val}</p>;
                      })}
                    </Box>
                  </div>
                );
              })}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Video;
