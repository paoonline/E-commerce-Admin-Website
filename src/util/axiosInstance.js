import axios from 'axios';
import config from './config';

/* config */
axios.defaults.headers.common = {
  Accept: 'application/json; charset=utf-8',
}

axios.defaults.headers.post = {
  'Access-Control-Allow-Origin': '*',
}

const apiGatewayInstance = axios.create({
  baseURL: config.service,
});


const service = () => {
  const getToken = localStorage.getItem("token")
  if (getToken) {
    apiGatewayInstance.interceptors.request.use((config) => {
      config.headers.authorization = getToken
      return config
    })
    
  }
  return apiGatewayInstance
}
export default service
