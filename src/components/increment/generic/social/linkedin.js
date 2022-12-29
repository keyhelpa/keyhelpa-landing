import React from 'react';
import {Helmet} from "react-helmet";
import config from 'config'
import { faLinkedinIn } from '@fortawesome/fontawesome-free-brands'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
const{REACT_APP_LINKEDIN_ID,REACT_APP_LINKEDIN_REDIRECT_URL}=process.env;
export default class Stack extends React.Component {
  constructor(props) {
    super(props);
  }

  initialize(){
    console.log('LinkedIn Authorize')
    let route = 'https://www.linkedin.com/oauth/v2/authorization?'
    route += `response_type=code&client_id=${REACT_APP_LINKEDIN_ID}`
    route += `&redirect_uri=${REACT_APP_LINKEDIN_REDIRECT_URL}`
    route += '&state=DCEeFWf45A53sdfKef424keyhelpa'
    route += '&scope=r_liteprofile%20r_emailaddress'
    window.location.href = route
  }

  render() {
    return (
        <div
            onClick={() => {
                this.initialize()
            }}
        >
          <FontAwesomeIcon
              icon={faLinkedinIn}
              size="1x"
              />
        </div>
    )
  }
}
