import request from './request';
import urls from './RESTFULURL';

const FUNS = {};

Object.keys(urls).forEach((key) => {
  FUNS[key] = (options = {}) => {
    return request(urls[key], options);
  };
});

export default FUNS;
