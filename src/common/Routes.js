const liveUrl = "https://api.sandbox.keyhelpa.com/public/increment/v1"
const localUrl = "http://localhost/keyhelpa/keyhelpa-api/public/increment/v1"
const isDev = false
const baseUrl = isDev ? localUrl : liveUrl

export default{
  payloadsRetrieve: baseUrl + '/payloads/retrieve',
  createContact: baseUrl + '/contact_us/create',
  freelancer: 'https://sandbox.keyhelpa.com',
  agent: 'https://agent.sandbox.keyhelpa.com',
}