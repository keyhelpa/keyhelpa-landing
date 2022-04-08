import axios from "axios"
export default{
  request: (url, parameter, callback) => {
    axios.post(url, parameter, callback).then(res => {
      callback(res)
    }, (err) => {
      callback(err)
    })
  }
}