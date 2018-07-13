import {http, api} from '@/common/http/http.js';


export const getProductGroupList = (params = {}) => {
    return http.post(api.getProductGroupList, params);
  };

export const productGroupDelete = (params = {}) => {
    return http.get(api.productGroupDelete, {params});
  };

export const productGroupInfo = (params = {}) => {
    return http.get(api.productGroupInfo, {params});
  };


export const getProductList = (params = {}) => {
    return http.get(api.getProductList, {params});
  };

export const productGroupAdd = (params = {}) => {
    return http.post(api.productGroupAdd, params);
  };


export const productGroupUpdata = (params = {}) => {
    return http.post(api.productGroupUpdata, params);
  };



