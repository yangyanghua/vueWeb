
import Vue from 'vue';
// import goodsInfo from './goodsInfo/index.vue';
import noticeInfo from './noticeInfo/index.vue';
// import storeInfo from './storeInfo/index.vue';
import textInfo from './textInfo/index.vue';
import titleInfo from './titleInfo/index.vue';
//轮播图组件
import swiperInfo from './swiperInfo/index.vue';
// 全局注册所涉及的组件
// Vue.component('goods-info',goodsInfo);
Vue.component('notice-info',noticeInfo);
Vue.component('swiper-info',swiperInfo);
// Vue.component('store-info',storeInfo);
Vue.component('text-info',textInfo);
Vue.component('title-info',titleInfo);
Vue.component('sub-component', {
    render: function (createElement) {
       if (this.items.length) {
      return createElement(
        'div',
        {'class':{
            'preview-page': true
        }},
        this.items.map((i,index)=>{
          //初始化组件时将对应的item值传入
          return createElement(i.type,  {props: {
            initInfo: i,
            itemIndex: index
          }})
        })
      )
    }
    },
    props: {
      items: {
        type: Array,
        required: true
      }
    }
  });