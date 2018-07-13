import {http, api} from '@/common/http/http.js';
import  qs from 'qs';

//商家角色权限
//
//角色列表
export const roleList = (params = {}) => {
  return http.post(api.roleList, params);
}
//删除角色
export const roleDelete = (params = {}) => {
  return http.get(api.roleDelete, {params});
}
//新增角色

export const roleAdd = (params = {}) => {
  return http.post(api.roleAdd, params);
}

//编辑角色
export const roleEdit = (params = {}) => {
  return http.post(api.roleEdit, params);
}
//获取角色
export const roleInfo = (params = {}) => {
  return http.get(api.roleInfo, {params});
}
//查询角色
export const roleFind = (params = {}) => {
  return http.get(api.roleFind, {params});
}

//查询角色
export const menusList = (params = {}) => {
  return http.post(api.menusList, params);
}


