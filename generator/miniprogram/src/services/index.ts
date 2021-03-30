import request from './request';
import urls from './RESTFULURL';

let FUNS = {};

Object.keys(urls).forEach((key) => {
  FUNS[key] = (options = {}) => {
    return request.safeRequest(urls[key], options);
  };
});

export default FUNS;
