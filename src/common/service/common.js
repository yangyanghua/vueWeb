import qs from 'qs';
import {
  api,
  httpService,
  http
} from '@/common/http/http.js';

const getToken = () => {
  return JSON.parse(localStorage.getItem('user'));
};

//获取菜单内容
// export const getNavList = (params = {}) => {
//   params.service = location.origin+location.pathname;
//   let promise = new Promise(function(resolve,reject){
//     http.post(api.getNavList+location.search,qs.stringify(params),{
//       headers:{
//             'Content-Type': 'application/x-www-form-urlencoded'
//       }}).then((res)=>{
//         // history.replace(location.origin+location.pathname);
//         //如果匹配到ticket参数
//         if(location.search.match('ticket')){
//         history.pushState({}, "", location.origin+location.pathname);     
//         }
//         resolve(res);
//         // window.location.href = location.origin+location.pathname+'#/';
//     }).catch((res)=>{
//       reject(res);
//     });
//   });
//   return promise;
// }
export const getNavList = (params = {}) => {
  params.service = location.origin+location.pathname;
  let promise = new Promise(function(resolve,reject){
    let data = {
      userName: '用户名',
      navList: [
        {id: 1, name: '首页', completeName: '系统首页', icon: 'home',link:"/index",
      child:[
        {id: 11, pid: 1, name: "系统首页", link:"/index"},
      ]},
        {id: 3, name: '商品', completeName: '商品管理', icon: 'commodity',  link:"/product",child:[
//        {id: 31, pid: 3, name: "商品列表", link:"/goods/list"},
//        {id: 32, pid: 3, name: "发布商品", link:"/goods/detail"},
//        {id: 33, pid: 3, name: "品牌管理", link:"/goods/brand"},
          {id: 33, pid: 3, name: "商品品类", link:"/product/classification"},
        ]},


        {id: 8, name: '商品组', completeName: '商品组', icon: 'order',link:"/goodsGroup",child:[
          {id: 81, pid: 8, name: "商品组列表", link:"/goodsGroup/list"},
        ]},
        {id: 9, name: '角色', completeName: '角色权限管理', icon: 'order',link:"/authorityManagement",child:[
          {id: 91, pid: 9, name: "商家权限列表", link:"/authorityManagement/list"},
          // {id: 92, pid: 9, name: "运营权限列表", link:"/authorityManagement/operateManagement/list"},
        ]},
        {id: 4, name: '品牌', completeName: '品牌管理', icon: 'order',link:"/management",child:[
          {id: 41, pid: 4, name: "品牌管理", link:"/management/brandManagement"},
          {id: 42, pid: 4, name: "品牌审核管理", link:"/management/list"},
          {id: 43, pid: 4, name: "品牌授权详情", link:"/management/brandAuthorization"},
         
        ]},
        // {id: 6, name: '首屏', completeName: '首屏管理', icon: 'homepage',link:"/homepage",child:[
        //   // {id: 61, pid: 6, name: "商家清算管理", link:"/order/entLiquidation"},
        //    {id: 61, pid: 6, name: "首屏管理", link:"/homepage"},
        //  ]},
        {id: 6, name: 'APP首页', completeName: 'APP首页', icon: 'promotion', link: "/appHome", child: [
            { id: 61, pid: 6, name: "APP首页", link: "/appHome" },
          ]
        },
        {id:5, name: '首屏精选', completeName: '首页编辑', icon: 'promotion', link:"/edit",child:[
          { id: 51, pid: 5, name: "首页", link: "/edit" },
          { id: 52, pid: 5, name: "母婴", link: "/edit/motherBaby" },
          { id: 53, pid: 5, name: "保健品", link: "/edit/healthFood" },
          // {id: 51, pid: 5, name: "拼图", link: "/edit/jjgsaw" },
          // {id: 52, pid: 5, name: "公共弹出组件", link: "/edit/popup" },
          // {id: 53, pid: 5, name: "图片轮播", link:"/edit/carousel"},
          // {id: 54, pid: 5, name: "快捷入口", link: "/edit/entry" },
          // {id: 55, pid: 5, name: "占位图片", link: "/edit/seize" },
          // {id: 56, pid: 5, name: "消息通知", link: "/edit/inform" },
        ]},
        
        {id: 7, name: '系统', completeName: '系统设置', icon: 'order',link:"/system",child:[
          // {id: 61, pid: 6, name: "商家清算管理", link:"/order/entLiquidation"},
           {id: 71, pid: 7, name: "app管理", link:"/system/list"},
           {id: 72, pid: 7, name: "版本管理", link:"/system/versionManagement/list"}, 
           {id: 73, pid: 7, name: "参数配置", link:"/system/parameter/list"},
           {id: 74, pid: 7, name: "APP启动广告", link:"/system/appAdvertisement/list"},
           {id: 75, pid: 7, name: "区域设置", link:"/system/regionalSetting/list"},
           {id: 76, pid: 7, name: "消息模板设置", link:"/system/messageTemplate/list"},
           {id: 77, pid: 7, name: "消息配置", link:"/system/configurationMessage/list"},
         ]},
      ]
    };
      resolve(data);
  });
  return promise;
}
//获取上传图片接口
export const getUploadImg = (params = {}) => {
  return http.post(api.uploadImg,params,{
    headers:{
          'Content-Type': 'multipart/form-data'
    }});
}

export const getUploadImgSrc = (file) => {
  let formdata = new FormData();
  formdata.append('file',file);
  let promise = new Promise(function(resolve, reject){
    getUploadImg(formdata).then(res => {
      console.log('img res ', res);
      resolve(res.ftpUrl);
    }).catch(res => {
      reject(res);
    });
  });
  return promise;
};

//打开支付宝收银平台
export const openAliPay = function (outTradeNo, openInCurrentPage) {
  console.log('ali ')
  let accessToken = getToken() ? getToken().accessToken : '';
  let openUrl = httpService + api.payOrder + '?outTradeNo=' + outTradeNo + '&accessToken=' + accessToken;
  // let openUrl ="http://192.168.9.222:8080/api/v1/alipayPagePay/tradePay?outTradeNo=20171017101010&tradeNo=20171017101010order";  

if (openInCurrentPage) {
    window.location.href = openUrl;
} else {
    window.open(openUrl);
}
};

//打开银联收银平台
export const openYLPay = function (outTradeNo, openInCurrentPage) {
  console.log('yinlian ')
  let accessToken = getToken() ? getToken().accessToken : '';
  let openUrl = httpService + api.payYinlianOrder + '?gateId=2000&orderId=' + outTradeNo + '&accessToken=' + accessToken;
  // let openUrl ="http://192.168.9.222:8080/api/v1/alipayPagePay/tradePay?outTradeNo=20171017101010&tradeNo=20171017101010order";
  if (openInCurrentPage) {
    window.location.href = openUrl;
  } else {
    window.open(openUrl);
  }
};


