import { configure } from 'axios-hooks';
import Axios from 'axios';
import { throttleAdapterEnhancer } from 'axios-extensions';
import queryString from 'query-string';

const UnauthorizedHttpCode = 401;
const UnprocessableEntityHttpCode = 422;

const HttpGetMethod = ['GET', 'HEAD'];

const axios = Axios.create({
  baseURL: document.querySelector('meta[name="api-host"]').getAttribute('content'),
  paramsSerializer: (params) => {
    return queryString.stringify(params, {
      arrayFormat: process.env.QS_ARRAY_FORMAT || 'bracket',
    });
  },
  adapter: throttleAdapterEnhancer(Axios.defaults.adapter),
});

configure({ axios });
