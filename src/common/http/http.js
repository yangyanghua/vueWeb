import axios from 'axios';
import * as api from './api.js';
let httpService = '';
var currentHost = location.host;


if (currentHost == 'localhost:8090'||currentHost == '192.168.9.243:8080' || currentHost == '192.168.9.218:8380') {

  //httpService = 'http://192.168.17.156:8080';
  //httpService = 'http://192.168.17.205:8095'; //戴拖
  //httpService = 'http://192.168.9.251:8081'; //杨顺
  httpService = 'http://192.168.9.235:8081'; //锦锋  
  //  httpService = 'http://192.168.9.180:8081'; //波霖
 
  // httpService = 'http://192.168.9.246:8082'; //太旷  
  httpService = 'http://192.168.9.227:8091'
  //httpService = 'http://192.168.9.251:8081'; //杨顺
 // httpService = 'http://192.168.9.235:8081'; //锦锋  
  //httpService = 'http://192.168.9.108:8092'; //叶艺
  // httpService = 'http://192.168.9.206:8081';//俊科
   //httpService = 'http://192.168.9.202:8081'; //波霖
  // httpService = 'http://192.168.9.202:8081'; //波霖
  //httpService = 'http://192.168.9.247:8081'; //作齐
 // httpService = 'http://192.168.9.252:8081';//思琪
  //httpService = 'http://192.168.9.239:8082'; //曹凯     
  //httpService = 'http://tsgmerchant-api.iflashbuy.com:8383'; //測試/預生產
  //httpService = 'http://tsgmerchant-api.iflashbuy.com:8383';  
} else if (currentHost == 't-web-admin-chongqing.z-code.cn:8383') {
  httpService = '//192.168.5.53:8082'; //測試/預生產
} else if (currentHost == 'sgmerchant-web.iflashbuy.com') {
  httpService = 'http://sgmerchant-api.iflashbuy.com'; //生產
}

//开发时的请求设置，不因请求地址的地址端口而变化
//if(process.env.NODE_ENV === 'development'){
//// httpService = 'http://tsgmerchant-api.iflashbuy.com:8383';   
// httpService = 'http://192.168.9.202:8081'; 
// httpService = 'http://192.168.9.248:8081'; 
// 
//}
//开发时的请求设置，不因请求地址的地址端口而变化
if(process.env.NODE_ENV === 'development'){
  // httpService = 'http://tsgmerchant-api.iflashbuy.com:8383';   
 httpService = 'http://192.168.9.202:8081'; 
 httpService = 'http://192.168.9.248:8081'; 
 httpService = 'http://192.168.9.250:8082'; //杨顺
 httpService = 'http://192.168.9.241:8082'; //波霖 
 //httpService = 'http://192.168.9.239:8082'; //曹凯   
 
 httpService = '//192.168.5.53:8082'; //測試/預生產     
 httpService = 'http://192.168.9.253:8082';//思琪    
 httpService = 'http://192.168.9.230:8082';//曾燃道    
httpService = '//192.168.5.53:8082'; //測試/預生產     
// httpService = '//192.168.5.53:8082'; //測試/預生產     
// httpService = 'http://192.168.9.239:8082'; //曹凯        
// httpService = 'http://192.168.9.252:8088'; //锦锋
//
//  httpService = 'http://192.168.9.230:8082'; //燃道

}

const getToken = () => {
  return JSON.parse(localStorage.getItem('user'));
};
let http = axios.create({
  baseURL: httpService,
  //   headers:{
  //     'Content-Type':'application/x-www-form-urlencoded'
  // },
  //   transformRequest: [function (data) {
  //     data = Qs.stringify(data);
  //     return data;
  // }],
  // withCredentials: true //加了这段就可以跨域了
});
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

http.interceptors.request.use(function (config) {
  // Do something before request is sent 
  let Token = getToken() ? getToken().token : '';
    config.headers.Authorization = Token;
    // let storeId = '';
  // let params = {
  //   storeId
  // };
  // config.params = Object.assign(config.params || {}, params);
  
  let accessToken = getToken() ? getToken().accessToken : '';
  let params = {
    accessToken
  };
 // config.params = Object.assign(config.params || {}, params, {storeId: 0});
  return config;
});
http.interceptors.response.use(function (response) {

  let data = response.data || {};
  if (data.code == '0') {
    console.log("请求成功：" + data.message);
    return response.data.data;
// return response.data;
  }

     if (data.code == '3') {
       location.href = "http://" + location.host + '/#/login';
     }
  let tipMessage = {
    code: data.code,
    message: data.message
  }
  return Promise.reject(tipMessage);
}, function (error) {
  let tipMessage = {
    code: '-1',
    message: '网络或系统错误'
  }

  return Promise.reject(tipMessage);
});
export default http;

export {
  api,
  http,
  httpService,
  currentHost
};
