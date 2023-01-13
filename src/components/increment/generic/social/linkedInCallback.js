import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import config from "config";
import { faLinkedinIn } from "@fortawesome/fontawesome-free-brands";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { withRouter, useLocation } from "react-router-dom";
const {
  REACT_APP_LINKEDIN_ID,
  REACT_APP_LINKEDIN_SECRET,
  REACT_APP_LINKEDIN_REDIRECT_URL,
} = process.env;
function Stack() {
  const { search } = useLocation();
  const [code, setCode] = useState(null);

  const getToken = () => {
    axios
      .post(
        "https://www.linkedin.com/oauth/v2/accessToken",
        {
          headers: {
            "Content-Type": "x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
          },
        },
        {
          grant_type: "authorization_code",
          code: code,
          client_id: REACT_APP_LINKEDIN_ID,
          client_secret: REACT_APP_LINKEDIN_SECRET,
          redirect_uri: REACT_APP_LINKEDIN_REDIRECT_URL,
        }
      )
      .then((response) => {
        console.log({
          response,
        });
      });
  };
  useEffect(() => {
    if (code == null) {
      setCode(new URLSearchParams(search).get("code"));
      getToken();
    }
  });

  console.log({
    code,
  });
  return (
    <div
      onClick={() => {
        this.initialize();
      }}
    ></div>
  );
}

export default withRouter(Stack);
