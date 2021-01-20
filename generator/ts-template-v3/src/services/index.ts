import request from './request';
import urls from './RESTFULURL';

const FUNS = {};

Object.keys(urls).forEach((key) => {
  FUNS[key] = (options = {}) => {
    return request(urls[key], options);
  };
});

export function setGlobalProperties(app) {
  app.config.globalProperties.$services = FUNS;
}

export default FUNS;
