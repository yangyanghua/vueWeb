//存放组件初始化数据及说明
export const getBtnList = () => {
    let list= [
      {
        name: '轮播图',
        /*轮播图组件*/
        type: 'swiper-info',
        propsData: {
          styleType: 2, /*风格类型*/
        }
      },
      {
        name: '公告',
        /*公告组件*/
        type: 'notice-info',
        propsData: {
          bgColor: '#fff7cc', /*背景颜色*/
          textColor: '#f60',/*文字颜色*/
          text: '',/*公告内容*/
        }
      },
      // {
      //   name: '商品',
      //   /*商品组件*/
      //   type: 'goods-info',
      //   propsData: {
      //     source: 1,/*商品来源 1商品 2商品分组*/
      //     listType: 1,/*列表样式 1大图 2小图 3一大两小 4详细列表 5横向滑动*/
      //     paddingType: 1,/*图片填充方式  1填充 2留白*/
      //     showRatio: 1, /*显示比例 1对应 3：2   2对应 1：1*/
      //     showType: 1, /*显示样式 1卡片 2极简*/
      //     cornerType: 1, /*角标类型  1新品 2热卖 3NEW 4HOT 5自定义*/
      //     cornerImg: '', /*角标为自定义时显示的图片地址*/
      //     goodsName: true,  /*是否显示商品名称 true 显示  false不显示*/
      //     goodsPrice: true, /*是否显示商品价格 true 显示  false不显示*/
      //     goodsDescription: false, /*是否显示商品简介 true显示 false不显示*/ 
      //     goodsBuy: true, /*是否显示购买按钮 true 显示  false不显示*/
      //     goodsCorner: false,/*是否显示商品角标 true 显示  false不显示*/
      //     goodsCornerImgUrl: 'https://img.yzcdn.cn/upload_files/2018/02/09/FrdT3BBympH1Mmt7g928OJKQgHxU.jpg?imageView2/2/w/520/h/0/q/75/format/webp',
      //     /*商品来源对应的（按顺序）商品列表内容，需要的信息包括商品名称、商品描述、商品Id、商品价格、商品链接地址（后期放在app点击可进入商品详情页）、商品加入购物车链接（待定），可参考商品列表返回的内容
      //     */
      //     "goods": [{
      //         "id": "408300009",
      //         "url": "https:\/\/h5.youzan.com\/v2\/showcase\/goods?alias=366mp8taa24f8",
      //         "goodsImg": "http://img01.sys.iflashbuy.com:8282/group2/M00/07/66/wKgF-lpyxoOAR37SAACYZ_vUYYY930.jpg",
      //         "goodsImg":"https://img.yzcdn.cn/upload_files/2018/02/09/FrdT3BBympH1Mmt7g928OJKQgHxU.jpg?imageView2/2/w/520/h/0/q/75/format/webp",
      //         "image_id": "",
      //         "maxPrice": "11",
      //         "goodsName": "测试商品1",
      //         "description": "好吃",
      //         "buy_url": "",
      //         "alias": "366mp8taa24f8",
      //         "postage": "0",
      //         "buy_way": "1",
      //         "origin": "",
      //         "width": 640,
      //         "height": 640,
      //         "sub_goodsName": "",
      //         "is_virtual": "0",
      //         "total_stock": "100",
      //         "sold_status": "1"
      //       }, {
      //         "id": "408300008",
      //         "url": "https:\/\/h5.youzan.com\/v2\/showcase\/goods?alias=366mp8taa24f8",
      //         "goodsImg": "http://img01.sys.iflashbuy.com:8282/group2/M00/07/66/wKgF-lpxZ7eACWilAAIPej2NQQg474.png",
      //         "goodsImg":"https://img.yzcdn.cn/upload_files/2018/02/09/Fii7c8jM-m8c3VhIXsAuP0YKEft9.jpg?imageView2/2/w/520/h/0/q/75/format/webp",
      //         "image_id": "",
      //         "maxPrice": "22",
      //         "goodsName": "测试商品2",
      //         "description": "好玩",
      //         "buy_url": "",
      //         "alias": "366mp8taa24f8",
      //         "postage": "0",
      //         "buy_way": "1",
      //         "origin": "",
      //         "width": 640,
      //         "height": 640,
      //         "sub_goodsName": "",
      //         "is_virtual": "0",
      //         "total_stock": "100",
      //         "sold_status": "1"
      //       },
      //       {
      //         "id": "4083000097",
      //         "url": "https:\/\/h5.youzan.com\/v2\/showcase\/goods?alias=366mp8taa24f8",
      //         "goodsImg": "http://img01.sys.iflashbuy.com:8282/group2/M00/00/49/wKgFZFp6cKuAIpWxAAOarr0YzVU485.png",
      //         "goodsImg":"https://img.yzcdn.cn/upload_files/2018/02/09/FrdT3BBympH1Mmt7g928OJKQgHxU.jpg?imageView2/2/w/520/h/0/q/75/format/webp",
      //         "image_id": "",
      //         "maxPrice": "33",
      //         "goodsName": "测试商品3",
      //         "description": "好看",
      //         "buy_url": "",
      //         "alias": "366mp8taa24f8",
      //         "postage": "0",
      //         "buy_way": "1",
      //         "origin": "",
      //         "width": 640,
      //         "height": 640,
      //         "sub_goodsName": "",
      //         "is_virtual": "0",
      //         "total_stock": "100",
      //         "sold_status": "1"
      //       },
      //       {
      //         "id": "4083000099",
      //         "url": "https:\/\/h5.youzan.com\/v2\/showcase\/goods?alias=366mp8taa24f8",
      //         "goodsImg": "http://img01.sys.iflashbuy.com:8282/group2/M00/00/49/wKgFZFp6cKuAIpWxAAOarr0YzVU485.png",
      //         "goodsImg":"https://img.yzcdn.cn/upload_files/2018/02/09/FrdT3BBympH1Mmt7g928OJKQgHxU.jpg?imageView2/2/w/520/h/0/q/75/format/webp",
      //         "image_id": "",
      //         "maxPrice": "33",
      //         "goodsName": "测试商品3",
      //         "description": "好看",
      //         "buy_url": "",
      //         "alias": "366mp8taa24f8",
      //         "postage": "0",
      //         "buy_way": "1",
      //         "origin": "",
      //         "width": 640,
      //         "height": 640,
      //         "sub_goodsName": "",
      //         "is_virtual": "0",
      //         "total_stock": "100",
      //         "sold_status": "1"
      //       },
      //       {
      //         "id": "123",
      //         "url": "https:\/\/h5.youzan.com\/v2\/showcase\/goods?alias=366mp8taa24f8",
      //         "goodsImg": "http://img01.sys.iflashbuy.com:8282/group2/M00/00/49/wKgFZFp6cKuAIpWxAAOarr0YzVU485.png",
      //         "goodsImg":"https://bpic.588ku.com/special_image/18/01/16/332be68248532713db90056ecad24e18.jpg",
      //         "image_id": "",
      //         "maxPrice": "33",
      //         "goodsName": "测试商品3",
      //         "description": "好看",
      //         "buy_url": "",
      //         "alias": "366mp8taa24f8",
      //         "postage": "0",
      //         "buy_way": "1",
      //         "origin": "",
      //         "width": 640,
      //         "height": 640,
      //         "sub_goodsName": "",
      //         "is_virtual": "0",
      //         "total_stock": "100",
      //         "sold_status": "1"
      //       },
      //       {
      //         "id": "324",
      //         "url": "https:\/\/h5.youzan.com\/v2\/showcase\/goods?alias=366mp8taa24f8",
      //         "goodsImg": "http://img01.sys.iflashbuy.com:8282/group2/M00/00/49/wKgFZFp6cKuAIpWxAAOarr0YzVU485.png",
      //         "goodsImg":"https://bpic.588ku.com/special_image/18/01/16/332be68248532713db90056ecad24e18.jpg",
      //         "image_id": "",
      //         "maxPrice": "33",
      //         "goodsName": "测试商品3",
      //         "description": "好看",
      //         "buy_url": "",
      //         "alias": "366mp8taa24f8",
      //         "postage": "0",
      //         "buy_way": "1",
      //         "origin": "",
      //         "width": 900,
      //         "height": 640,
      //         "sub_goodsName": "",
      //         "is_virtual": "0",
      //         "total_stock": "100",
      //         "sold_status": "1"
      //       }
      //     ],
      //   }
      // },
      // {
      //   name: '店铺信息',
      //   //店铺组件
      //   type: 'store-info',
      //   propsData: {
      //   styleType:'stype1', //展示样式
      //   bgImageUrl:'http://a2.att.hudong.com/79/22/01000000000000119062273272179.jpg', //背景图片
      //   storeName:'这是店铺的名字',
      //   storeLogo:'http://www.qqzhi.com/uploadpic/2015-01-10/194231948.jpg',//店铺logo
      //   storeActivity:'全场满150减50，满200减100。',//店铺活动
      //   storeActivityTip:'满减',//活动标签
      //   productTotal:'666',//店铺商品总量
      //   newProductTotal:'20'  //新品 
      //   }
      // },   
      {
        name: '文本',
        //文本组件
        type: 'text-info',
        propsData: {
      		content:'文字内容',//文本内容
	      		fontSize:'14px',
	      		color:'#333333',
	      		backgroundColor:'#ffffff',
	      		textAlign:'left',      			
      		url:'#',//url
        }
      }, 
      {
        name: '标题',
        //标题组件
        type: 'title-info',
        propsData: {
      		name:'',//标题名
      		styleType:'type1',//标题样式
      		textAlign:'left',//对齐方式
      		subtitle:'',//副标题
      		backgroundColor:'#ffffff',//背景颜色
      		urlName:'',//链接名字
      		linktype:'',//链接类型
      		date:'',//日期
      		author:'',//作者
      		url:'',//链接地址
        }
      }    
      
      
      
    ];
    return list;
}