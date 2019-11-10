import axios from 'axios';
import config from './config';

const axiosInstance = axios.create();

const apiGatewayInstance = axios.create({
  baseURL: config.service,
});

export { axiosInstance, apiGatewayInstance };
