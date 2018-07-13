import {http, api} from '@/common/http/http.js';
import  qs from 'qs';


//创建品牌
export const brandAdd = (params = {}) => {
  return http.post(api.brandAdd, params);
}
//品牌列表
export const brandList = (params = {}) => {
  return http.post(api.brandList, params);
}
//品牌授权详情、品牌审核管理、品牌审核管理列表
export const brandListBrandEmpower = (params = {}) => {
  return http.post(api.brandListBrandEmpower, params);
}
//审核授权品牌
export const brandAudit = (params = {}) => {
  return http.post(api.brandAudit, params);
}
//导出品牌管理数据
export const exportBrand = (params = {}) => {
  return (api.exportBrand);
}
//导出品牌授权数据
export const exportBrandEmpowerDetail = (params = {}) => {
  return (api.exportBrandEmpowerDetail);
}
//导出品牌审核管理数据
export const exportBrandAduit = (params = {}) => {
  return (api.exportBrandAduit);
}
//导出品牌审核日志数据
export const exportBrandAduitLog = (params = {}) => {
  return (api.exportBrandAduitLog);
}

export const getBrandForEdit = (params = {}) => {
  return http.get(api.getBrandForEdit, {params});
}

export const getProductForBrand = (params = {}) => {
  return http.get(api.getProductForBrand, {params});
}

export const updateBrandForShow = (params = {}) => {
  return http.post(api.updateBrandForShow, params);
}





// export const getCheckcode = (params = {}) => {
//   return http.get(api.getCheckcode, {params});
// }




