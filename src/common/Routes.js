// const liveUrl = "https://api.sandbox.keyhelpa.com/public/increment/v1"
// const localUrl = "http://localhost/keyhelpa/keyhelpa-api/public/increment/v1"
// const isDev = false
// const baseUrl = isDev ? localUrl : liveUrl
import CONFIG from 'config'

export default{
  payloadsRetrieve: CONFIG.BACKEND_URL + '/payloads/retrieve_authorize',
  createContact: CONFIG.BACKEND_URL + '/contact_us/create',
  freelancer: 'https://sandbox.keyhelpa.com',
  agent: 'https://agent.sandbox.keyhelpa.com',
}