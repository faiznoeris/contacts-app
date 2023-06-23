import axios from 'axios';

import config from '../config';

const api = axios.create({
  baseURL: config.api.url,
  timeout: 120000,
});

export default api;
