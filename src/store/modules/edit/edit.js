//在vuex中引入vue实例
import vm from '@/main.js'

let state = {
  dataset: [],
  appJson: [],
  allParams: {
    id: 3,
    contentId: 3,
    data: [
    //   {
    //     "type": "b_image_ad",
    //     "image_show_style": 1,
    //   　　"sub_entry": [
    //         {
    //           "sort": 1, 
    // 　　　　		"image_url": "http://img.yzcdn.cn/upload_files/2018/03/26/FgcpC0irgAsMSgwYm33_sY7aTp82.jpg",
    //         "link_type": "goods", 
    //         "link_value": "1" 
    //       }
    //     ]
    //   }
    ],
  },
  //预览编辑器类型
  previewEditerType: ['jjgsaw','title','carousel','entry','seize','inform','goodsGroup','shop', 'brand'],
  //popup页面tabs
  popupObj: { "goods": "商品", "goods_group": "商品组", "subject": "专题", "brand": "品牌", "shop": "店铺", "url": "H5页面" },
  "jjgsaw": {
    // "sub_entry": []
  },
  "popup": [
  ],
  "carousel": {
    "style": "1",
    "carouselStyle": "1",
  },
  "entry": {
  },
  "seize": {
  },
  "inform": [
  ],
  "title": {
  },
  "group": {
  },
  "shop":{
  },
  "brand":{
  },
}

let getters = {
  carousel: state=> {
    return state.carousel;
  }
}


var typeArr = [];
const mutations = {
  appJson(state,payload){
    state.allParams.data = [...payload.appJson];//<=
  },
  allParams(state,payload){//=>
    let len = state.allParams.data.length;

    if(len===0){
      typeArr.push(payload.data.type);
    }
    for (let i = 0; i < len;i++){
      typeArr.push(state.allParams.data[i].type);
    }
    typeArr = Array.from(new Set(typeArr));
    
    if(len===0){
      state.allParams.data.push(payload.data);
    }
    for(let j=0;j<len;j++){
      if(state.allParams.data[j].type===payload.data.type){
        // console.log(payload.data)
        state.allParams.data[j] = payload.data;
        break;
      }else if(typeArr.indexOf(payload.data.type)==(-1)){
        state.allParams.data.push(payload.data);
        break;
      }
    }

    
    //顺序处理
    let tempArr = [];
    let ruleArr = ["b_image_ad", "b_quick_entry", "b_notice", "b_jigsaw", "b_placeholder_img", "b_spacing", "w_brand", "w_goods_group", "w_shop", "b_title"];
    // state.allParams.data.splice(3,2); 控制某组件的数目
    for (let k = 0, len = state.allParams.data.length; k < len; k++) {
      for(let l =0,len2 = ruleArr.length;l<len2;l++){
        if (state.allParams.data[k].type === ruleArr[l]) {
          tempArr.push(vm.objCopy(state.allParams.data[k]));
          break;
        }
      }
    }
    state.allParams.data = [];
    state.allParams.data = [...tempArr];
    console.log(state.allParams.data);
  },

  //base component
  carousel(state,payload){
    //hack：mutation handlers ：数组用slice()
    state.carousel = vm.objCopy(payload.carousel);
  },
  carouselAdd(state,payload){
    state.carousel.sub_entry = vm.objCopy(payload.carouselAdd);
  },
  carouselStyle(state, payload) {
    state.carousel.image_show_style = vm.objCopy(payload.carouselStyle);
  },
  jjgsaw(state, payload) {
    state.jjgsaw = vm.objCopy(payload.jjgsaw);
  },
  entry(state, payload) {
    state.entry = vm.objCopy(payload.entry);
  },
  entryAdd(state, payload) {
    state.entry.sub_entry = vm.objCopy(payload.entryAdd);
  },
  toPopupIndex(state,payload){//carousel
    state.toPopupIndexCarousel = vm.objCopy(payload.toPopupIndex);
  },
  toPopupIndexEntry(state, payload) {//entry
    state.toPopupIndexEntry = vm.objCopy(payload.toPopupIndex);
  },
  toPopupIndexJjgsaw(state, payload) {//jjgsaw
    state.toPopupIndexJjgsaw = vm.objCopy(payload.toPopupIndex);
  },
  idxGroup(state, payload){
    state.idxGroup = vm.objCopy(payload.idxGroup);
  },
  popup(state,payload){
    var len = state.popup.length;
    if(len==0){
      state.popup.push(vm.objCopy(payload.popup));
    }else{
      for(let i=0;i<len; i++){
        if (state.popup[i].popupType == payload.popup.popupType){
          state.popup[i] = vm.objCopy(payload.popup);
        }else{
          state.popup[i+1] = vm.objCopy(payload.popup);
          break;
        }
      }
    }
  },
  clearPopup(state){
    state.popup = [];
  },
  seize(state, payload) {
    state.seize = vm.objCopy(payload.seize);
  },
  inform(state, payload) {
    state.inform = Array.from(new Set(payload.inform));
    // state.inform = vm.objCopy(payload.inform);
  },
  informLinkVal(state, payload) {
    state.informLinkVal = payload.informLinkVal;
  },
  title(state, payload) {
    state.title = vm.objCopy(payload.title);
  },
  //inform
  updateTitle(state, payload){
    state.inform[payload.index].title = payload.title;
  },
  updateContent(state, payload) {
    state.inform[payload.index].content = payload.content;
  },
  //title
  updateTitleTitle(state, payload) {
    state.title.title = payload.title;
  },
  updateSubTitle(state, payload) {
    state.title.sub_title = payload.sub;
  },
  updateShowLocation(state, payload) {
    state.title.show_location = payload.location;
  },
  updateColor(state, payload) {
    state.title.color = payload.color;
  },

  //widget
  group(state, payload) {
    state.group = vm.objCopy(payload.group);
  },
  shop(state, payload) {
    state.shop = vm.objCopy(payload.shop);
  },
  brand(state, payload) {
    state.brand = vm.objCopy(payload.brand);
  },

}

const actions = {
  
}

export default {
  state,
  mutations,
  getters,
  actions
}