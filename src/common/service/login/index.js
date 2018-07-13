import {http, api} from '@/common/http/http.js';
import  qs from 'qs';



export const login = (params = {}) => {
  return http.post(api.login, params);
}
//验证码 
export const getCheckcode = (params = {}) => {
  return http.get(api.getCheckcode, {params});
}
//退出
export const logout = (params = {}) => {
  return http.get(api.logout, {params});
}




