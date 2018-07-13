import {http, api} from '@/common/http/http.js';
import  qs from 'qs';


//获取所有的省信息
export const allprovince = (params = {}) => {
  return http.get(api.allprovince, {params}); 
}

//获取省下面的所有的市信息
export const city = (params = {}) => {
  return http.get(api.city, {params});
}
//获取市下面的所有的区
export const dist = (params = {}) => {
  return http.get(api.dist, {params});
}
//获取区下面的所有街道
export const street = (params = {}) => {
  return http.get(api.street, {params});
}

//删除市信息
export const cityDelete = (params = {}) => {
  return http.get(api.cityDelete, {params});
}
//删除区信息
export const districtDelete = (params = {}) => {
  return http.get(api.districtDelete, {params});
}
//删除街道信息
export const streetDelete = (params = {}) => {
  return http.get(api.streetDelete, {params});
}

//添加市信息
export const cityAdd = (params = {}) => {
  return http.post(api.cityAdd, params);
}

//添加区信息
export const districtAdd = (params = {}) => {
  return http.post(api.districtAdd, params);
}
//添加街道信息
export const streetAdd = (params = {}) => {
  return http.post(api.streetAdd, params);
}

//修改市信息
export const cityEdit = (params = {}) => {
  return http.post(api.cityEdit, params);
}

//修改区信息
export const districtEdit = (params = {}) => {
  return http.post(api.districtEdit, params);
}
//修改街道信息
export const streetEdit = (params = {}) => {
  return http.post(api.streetEdit, params);
}

//消息模板设置
//
//业务消息配置列表
export const businessList = (params = {}) => {
  return http.get(api.businessList, {params});
}

export const businessSendorNot = (params = {}) => {
   	return http.post(api.businessSendorNot,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}

export const busineMsgtmpEdit = (params = {}) => {
   	return http.post(api.busineMsgtmpEdit,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}
export const busineMsgtmpAdd = (params = {}) => {
  return http.post(api.busineMsgtmpAdd, params);
}



// 系统管理
//app管理分页列表查询 
export const appManagerListPage = (params = {}) => {
  return http.post(api.appManagerListPage, {params});
}
//app管理列表查询
export const appManagerList = (params = {}) => {
  return http.post(api.appManagerList, params);
}
//app管理新增
export const appManagerAdd = (params = {}) => {
  return http.post(api.appManagerAdd, params);
}
//app管理编辑
export const appManagerEdit = (params = {}) => {
  return http.post(api.appManagerEdit, params);
}
//app管理删除
export const appManagerDelete = (params = {}) => {
  return http.post(api.appManagerDelete, {params});
}
//app管理查询
export const appManagerInfo = (params = {}) => {
  return http.get(api.appManagerInfo, {params});
}
//app管理导出
export const appManagerExport = (params = {}) => {
  return (api.appManagerExport);
}
//获取最大版本号接口
export const appVersionMxVersion = (params = {}) => {
  return http.get(api.appVersionMxVersion, {params});
}


//参数配置
//参数管理分页列表查询接口
export const paramListPage = (params = {}) => {
  return http.get(api.paramListPage, {params});
}
//参数管理新增接口
export const paramAdd = (params = {}) => {
  return http.post(api.paramAdd, params);
}
//参数管理编辑接口
export const paramEdit = (params = {}) => {
  return http.post(api.paramEdit, params);
}
//参数管理删除接口
export const paramDelete = (params = {}) => {
  return http.get(api.paramDelete, {params});
}
//参数管理查询接口
export const paramInfo = (params = {}) => {
  return http.get(api.paramInfo, {params});
}
//参数管理导出接口
export const paramExport = (params = {}) => {
  return(api.paramExport);
}


//版本管理
//版本管理分页列表查询 
export const appVersionListPage = (params = {}) => {
  return http.post(api.appVersionListPage, params);
}
//版本管理新增
export const appVersionAdd = (params = {}) => {
  return http.post(api.appVersionAdd, params);
}
//版本管理编辑
export const appVersionEdit = (params = {}) => {
  return http.post(api.appVersionEdit, params);
}
//版本管理删除
export const appVersionDelete = (params = {}) => {
  return http.post(api.appVersionDelete, {params});
}
//版本管理查询
export const appVersionInfo = (params = {}) => {
  return http.get(api.appVersionInfo, {params});
}

//版本管理导出 
export const appVersionExport = (params = {}) => {
  return (api.appVersionExport);
}
//版本管理发布
export const appVersionPublish = (params = {}) => {
  return http.get(api.appVersionPublish, {params});
}


//APP广告
//APP广告查询接口
export const appStartAdListPage = (params = {}) => {
  return http.post(api.appStartAdListPage, params);
}
//APP广告新增
export const appStartAdAdd = (params = {}) => {
  return http.post(api.appStartAdAdd, params);
}
//APP广告编辑
export const appStartAdEdit = (params = {}) => {
  return http.post(api.appStartAdEdit, params);
}
//APP广告删除
export const appStartAdDelete = (params = {}) => {
  return http.get(api.appStartAdDelete, {params});
}
//APP广告查询
export const appStartAdInfo = (params = {}) => {
  return http.get(api.appStartAdInfo, {params});
}
//APP广告导出
export const appStartAdExport = (params = {}) => {
  return (api.appStartAdExport);
}

//APP广告up
export const appStartAdUp = (params = {}) => {
  return http.get(api.appStartAdUp, {params});
}
//APP广告down
export const appStartAdDown = (params = {}) => {
  return http.get(api.appStartAdDown, {params});
}


//消息标签配置

//消息标签列表
export const mlabelList = (params = {}) => {
  return http.get(api.mlabelList, {params});
}
//添加消息标签
export const mlabelAdd = (params = {}) => {
  return http.post(api.mlabelAdd, params);
}
//修改消息标签
export const mlabelEdit = (params = {}) => {
  return http.post(api.mlabelEdit, params);
}
//删除消息标签
export const mlabelDelete = (params = {}) => {
  return http.get(api.mlabelDelete, {params});
}


