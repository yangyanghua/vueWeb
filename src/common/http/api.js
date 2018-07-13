
//导航管理
export const navigation_getAll = '/admin/api/navigation/search';
// 上传图片
export const uploadImg = '/admin/v1/upload/uploadImg';


//商品品类
export const getClassify = '/admin/v1/classify/listByLevelPid';
export const classifyAdd = '/admin/v1/classify/add';
export const classifyDelete = '/admin/v1/classify/del/';
export const classifyUpdate = '/admin/v1/classify/update';
export const getProductList = '/admin/v1/product/listPage';//获取分页商品



//商品组
export const getProductGroupList = '/admin/v1/productGroup/list';//商品组列表
export const productGroupAdd = '/admin/v1/productGroup/add';//新增商品组
export const productGroupUpdata = '/admin/v1/productGroup/edit';//编辑保存
export const productGroupDelete = '/admin/v1/productGroup/delete';//删除
export const productGroupInfo = '/admin/v1/productGroup/info';//获取商品组详情

//登录模块
export const login = '/admin/v1/user/login';//用户登录接口
export const getCheckcode = '/admin/v1/user/getVcode';//获取验证码图片
export const logout = '/admin/v1/user/logout';//-用户退出

//品牌管理
export const brandAdd = 'admin/v1/brand/add';//创建品牌
export const brandList = 'admin/v1/brand/list';//品牌管理列表
export const brandListBrandEmpower = 'admin/v1/brand/listBrandEmpower';//品牌授权详情、品牌审核管理、品牌审核管理列表
export const brandAudit = 'admin/v1/brand/audit';//审核授权品牌
export const exportBrand = 'admin/v1/brand/exportBrand';//导出品牌管理数据
export const exportBrandEmpowerDetail = 'admin/v1/brand/exportBrandEmpowerDetail';//导出品牌授权数据
export const exportBrandAduit = 'admin/v1/brand/exportBrandAudit';//导出品牌审核管理数据
export const exportBrandAduitLog = 'admin/v1/brand/exportBrandAuditLog';//导出品牌审核日志数据
export const getBrandForEdit = '/admin/v1/brand/getBrandForEdit';//品牌展示
export const getProductForBrand = '/admin/v1/product/getProductForBrand';//根据商品名查询商品(编辑品牌)
export const updateBrandForShow = '/admin/v1/brand/updateBrandForShow';//更新品牌展示页




//系统设置
//APP管理
export const appManagerListPage = '/admin/v1/appManager/listPage';//app管理分页列表查询接口
export const appManagerList = '/admin/v1/appManager/list';//app管理列表查询接口
export const appManagerAdd = '/admin/v1/appManager/add';//app管理新增接口
export const appManagerEdit = '/admin/v1/appManager/edit';//app管理编辑接口
export const appManagerDelete = '/admin/v1/appManager/delete';//app管理删除接口
export const appManagerInfo = '/admin/v1/appManager/info';//app管理查询接口
export const appManagerExport = '/admin/v1/appManager/exportApp';//app管理导出接口

//版本管理
export const appVersionListPage = '/admin/v1/appVersionManager/list';//版本管理分页列表查询接口
export const appVersionAdd = '/admin/v1/appVersionManager/add';//版本管理新增接口
export const appVersionEdit = '/admin/v1/appVersionManager/edit';//版本管理编辑接口
export const appVersionDelete = '/admin/v1/appVersionManager/delete';//版本管理删除接口
export const appVersionInfo = '/admin/v1/appVersionManager/info';//版本管理查询接口
export const appVersionExport = '/admin/v1/appVersionManager/exportAppVersion';//版本管理导出接口
export const appVersionPublish = '/admin/v1/appVersionManager/publish';//版本管理发布接口
export const appVersionMxVersion = '/admin/v1/appVersionManager/maxVersion';//获取最大版本号接口


//参数配置
export const paramListPage = '/admin/v1/param/listPage';//参数管理分页列表查询接口
export const paramAdd = '/admin/v1/param/add';//参数管理新增接口
export const paramEdit = '/admin/v1/param/edit';//参数管理编辑接口
export const paramDelete = '/admin/v1/param/delete';//参数管理删除接口
export const paramInfo = '/admin/v1/param/info';//参数管理查询接口
export const paramExport = '/admin/v1/param/exportParam';//参数管理导出接口

//APP广告
export const appStartAdListPage = '/admin/v1/appStartAd/list';//APP广告查询接口
export const appStartAdAdd = '/admin/v1/appStartAd/add';//APP广告新增接口
export const appStartAdEdit = '/admin/v1/appStartAd/edit';//APP广告编辑接口
export const appStartAdDelete = '/admin/v1/appStartAd/delete';//APP广告删除接口
export const appStartAdInfo = '/admin/v1/appStartAd/info';//APP广告查询接口
export const appStartAdExport = '/admin/v1/appStartAd/exportAppStartAd';//APP广告导出接口
export const appStartAdUp = '/admin/v1/appStartAd/up';//APP广告上线接口
export const appStartAdDown = '/admin/v1/appStartAd/down';//APP广告下线接口


//区域设置
export const allprovince = 'admin/v1/area/allprovince';//获取所有的省信息
export const city = 'admin/v1/area/province/city';//获取省下面的所有的市信息
export const dist = 'admin/v1/area/city/dist';//获取市下面的所有的区
export const street = 'admin/v1/area/dist/street';//获取区下面的所有街道

export const cityAdd = 'admin/v1/area/city/add';//添加市信息
export const districtAdd = 'admin/v1/area/district/add';//添加区信息
export const streetAdd = 'admin/v1/area/street/add';//添加街道信息

export const cityEdit = 'admin/v1/area/city/edit';//修改市信息
export const districtEdit = 'admin/v1/area/district/edit';//修改区信息
export const streetEdit = 'admin/v1/area/street/edit';//修改街道信息

export const cityDelete = 'admin/v1/area/city/delete';//删除市信息
export const districtDelete = 'admin/v1/area/district/delete';// 删除区信息
export const streetDelete = 'admin/v1/area/street/delete';//删除街道信息

//消息模板设置
export const businessList = 'admin/v1/business/lists';//消息模板设置
export const businessSendorNot = '/admin/v1/business/config/sendconfig/edit';//消息是否发送
export const busineMsgtmpEdit = '/admin/v1/business/config/msgtmp/edit';//消息编辑
export const busineMsgtmpAdd = '/admin/v1/business/config/msgtmp/add';//消息新增



//消息标签列表
export const mlabelList = 'admin/v1/mlabel/lists';//消息标签列表
export const mlabelAdd = 'admin/v1/mlabel/add';//添加消息标签
export const mlabelEdit = 'admin/v1/mlabel/edit';//修改消息标签
export const mlabelDelete = 'admin/v1/mlabel/delete';//删除消息标签

// APP首屏
export const saveJson = '/admin/v1/appHome/saveJson';//存储组件 post,form(data为string),
export const getJson = '/admin/v1/appHome/getJson';//获取组件 get,
export const previewApp = '/admin/v1/appHome/preview';//预览 post,form(data为string)
//首屏精选
// export const saveJson = '/admin/v1/appChoiceColumn/saveJson';//存储组件 post,form(data为string),
// export const getJson = '/admin/v1/appChoiceColumn/getJson';//获取组件 get,
// export const previewApp = '/admin/v1/appChoiceColumn/preview';//预览 post,form(data为string)
export const goodslistPage = '/admin/v1/product/listPage';//商品 get
export const productGroup = '/admin/v1/productGroup/list';//商品组分页 post,json
export const getGroupById = '/admin/v1/productGroup/info';//获取单个商品组 get
export const getBrandList = '/admin/v1/brand/list';//品牌 post,json
export const getBrandByIds = '/admin/v1/brand/getBrandByIds';//单个品牌 post
export const getShopList = '/admin/v1/merchantStore/list';//店铺 post,json
export const getStoreById = 'admin/v1/merchantStore/getStoreById';//店铺 post,json
export const insertInform = '/admin/v1/moduleNotice/add';//插入消息 post form
export const getInform = '/admin/v1/moduleNotice/info';//消息详情 get
export const getInformList = '/admin/v1/moduleNotice/list';//消息列表 get
export const delInform = '/admin/v1/moduleNotice/del';//删除消息 get
export const editInform = '/admin/v1/moduleNotice/edit';//编辑消息 post form
export const getCouponById = '/admin/v1/coupon/select'; //优惠券 get  

//角色权限管理

//商家角色权限
export const roleList = '/admin/v1/mrole/list';//角色列表
export const roleDelete = '/admin/v1/mrole/del';//删除角色
export const roleAdd = '/admin/v1/mrole/add';//新增角色
export const roleEdit = '/admin/v1/mrole/edit';//编辑角色
export const roleInfo = '/admin/v1/mrole/info';//获取角色
export const menusList = '/admin/v1/mrole/menus/list';//查询所有菜单
