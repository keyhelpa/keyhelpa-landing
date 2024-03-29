// const liveUrl = "https://api.sandbox.keyhelpa.com/public/increment/v1"
// const localUrl = "http://localhost/keyhelpa/keyhelpa-api/public/increment/v1"
// const isDev = false
// const baseUrl = isDev ? localUrl : liveUrl
import CONFIG from "config";

const {
  REACT_APP_FREELANCER_SANDBOX_URL,
  REACT_APP_AGENT_SANDBOX_URL,
  REACT_APP_API_URL,
} = process.env;

export default {
  payloadsRetrieve: `${REACT_APP_API_URL}payloads/retrieve_authorize`,
  createContact: `${REACT_APP_API_URL}contactus/create_with_email`,
  freelancer: `${REACT_APP_FREELANCER_SANDBOX_URL}`,
  agent: `${REACT_APP_AGENT_SANDBOX_URL}`,
  contactForm: `${REACT_APP_API_URL}contact-form`,
};
