let PRODUCTION_BACKEND_URL = 'https://api.sandbox.keyhelpa.com/public/increment/v1'
let DEV_BACKEND_URL = 'http://localhost/keyhelpa/keyhelpa-api/public/increment/v1'
let stage = 0
let HELPA, AGENT, HOST = null
let BACKEND_URL, OTHER_HOST = null
switch(stage){
  case 0:{
    BACKEND_URL = DEV_BACKEND_URL
    OTHER_HOST = 'http://localhost:3001'
    AGENT = 'http://agent.sandbox.keyhelpa.com'
    HELPA = 'http://sandbox.keyhelpa.com'
    HOST = 'http://sandbox.keyhelpa.com'
    break
  }
  case 1: {
    BACKEND_URL = PRODUCTION_BACKEND_URL
    OTHER_HOST = 'KeyHelpa'
    AGENT = 'http://agent.sandbox.keyhelpa.com'
    HELPA = 'http://sandbox.keyhelpa.com'
    HELPA = 'http://sandbox.keyhelpa.com'
    HOST = 'http://sandbox.keyhelpa.com'
    break
  }
}
export default{
  HOST,
  AGENT,
  HELPA,
  BACKEND_URL: BACKEND_URL,
  API_URL: BACKEND_URL + '/',
  TEST: false,
  OTHER_HOST: OTHER_HOST,
  facebook: {
    id: '300589438805553',
    secret: '1b3887393d0b39c4b2ceca3eb8c1e49a'
  },
  google: {
    id: '1728235959-sf5g0uqqh638c0s81hju144vgvhb56fi.apps.googleusercontent.com',
    secret: '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',
    key: 'AIzaSyAvKGglEKKJDIFLDOGMhYEYiQZfgidFof8'
  },
  linkedIn: {
    id: '86urtd5l7db10e',
    secret: '6pq4yXqTMQ2q1JMM',
    redirectUrl: 'https://localhost:3000/linkedin'
  },
  stripe: {
    sk: 'sk_test_51KHia4HLWCunMCw203Hh7cBN2b4K8a7bRfEGzsZWF9DhMEO046JYHPWRb5ZR8IwGPuqebWVPLCjI87940ns8vjRO00dJkjxMqz',
    pk: 'pk_test_51KHia4HLWCunMCw2BMy1TqBc8rHDk06mzJTeeSpAImvlgS3wjQRMzHUM6Mc9ui0XdSCADnpxiJb8a2qFhcClIWUb00RfDnffJH'
  }
}