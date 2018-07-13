import { http, api } from '@/common/http/http.js';
import qs from 'qs';

//get
export const goodslistPage = (params = {}) => {
  return http.get(api.goodslistPage, { params });
}

export const getJson = (params = {}) => {
  return http.get(api.getJson, { params });
}

export const getGroupById = (params = {}) => {
  return http.get(api.getGroupById, { params });
}

export const getCouponById = (params = {}) => {
  return http.get(api.getCouponById, { params });
}

export const getStoreById = (params = {}) => {
  return http.get(api.getStoreById, { params });
}

export const getInform = (params = {}) => {
  return http.get(api.getInform, { params });
}

export const getInformList = (params = {}) => {
  return http.get(api.getInformList, { params });
}

export const delInform = (params = {}) => {
  return http.get(api.delInform, { params });
}




//post
export const getUploadImg = (params = {}) => {
  return http.post(api.uploadImg, params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export const getUploadImgSrc = (file) => {
  let formdata = new FormData();
  formdata.append('file', file);
  let promise = new Promise(function (resolve, reject) {
    getUploadImg(formdata).then(res => {
      console.log('img res ', res);
      resolve(res.ftpUrl);
    }).catch(res => {
      reject(res);
    });
  });
  return promise;
};

export const saveJson = (params = {}) => {
  return http.post(api.saveJson, qs.stringify(params), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

export const previewApp = (params = {}) => {
  return http.post(api.previewApp, qs.stringify(params), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

export const insertInform = (params = {}) => {
  return http.post(api.insertInform, qs.stringify(params), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

export const editInform = (params = {}) => {
  return http.post(api.editInform, qs.stringify(params), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

export const productGroup = (params = {}) => {
  return http.post(api.productGroup, params);
}

export const getBrandList = (params = {}) => {
  return http.post(api.getBrandList, params);
}

export const getBrandByIds = (params = {}) => {
  return http.post(api.getBrandByIds, params);
}

export const getShopList = (params = {}) => {
  return http.post(api.getShopList, params);
}

// export const saveJson = (params = {}) => {
//   return http.get(api.saveJson, { params });
// }
