<template>
  <div class="edit">
    <div class="crumbs">首页编辑</div>
    <router-view></router-view>
  </div>
</template>

<script>
  import * as Service from '@/common/service/edit/index.js';
  // import {tempRes} from './dataset';

  require('./edit.scss');
  
  export default {
    data() {
      return {
        appJson:{},
        pageTypeArr: this.$store.state.edit.previewEditerType,
        tempArr: [],
      }
      
    },
    computed: {},
    methods: {
      initEdit(){
        let params = {
          // id: this.$store.state.edit.allParams.id,
          // contentId: this.$store.state.edit.allParams.contentId,
        }

        Service.getJson(params).then((res) => { 
          this.appJson = this.objCopy(res);
          this.$store.commit('appJson',{appJson: res.page});//把组件json派发到vuex
          this.initConfig();
          // console.log(this.appJson.page[3].link_value);
        }).catch((res) => {})
        
      },
      initConfig(){
        let len = this.appJson.page.length;
        for(let i=0;i<len;i++){
          if(this.appJson.page[i].type === "b_title"){
            this.$store.commit('title',{title: this.appJson.page[i]});
          }else if(this.appJson.page[i].type === "b_notice"){
            // let tempArr = [{"id":1,"content": "测试内容3-1","title": "测试标题3-1","columnId": 1},{"id":1,"content": "测试内容3-1","title": "测试标题3-1","columnId": 1}]
            // this.appJson.page[i].link_data = [...tempArr]
            // console.log(this.appJson.page[i]) link_data null
            this.$store.commit('inform',{inform: this.appJson.page[i].link_data});
            this.$store.commit('informLinkVal',{informLinkVal: this.appJson.page[i].link_value});
          }else if(this.appJson.page[i].type === "w_goods_group"){
            //link_object null
            this.$store.commit('group',{group: this.appJson.page[i]});
          }else if(this.appJson.page[i].type === "w_shop"){
            this.$store.commit('shop',{shop: this.appJson.page[i]});
          }else if(this.appJson.page[i].type === "w_brand"){
            this.$store.commit('brand',{brand: this.appJson.page[i]});
          }else if(this.appJson.page[i].type === "b_placeholder_img"){
            this.$store.commit('seize',{seize: this.appJson.page[i]});
          }else if(this.appJson.page[i].type === "b_jigsaw"){
            this.$store.commit('jjgsaw',{jjgsaw: this.appJson.page[i]});
          }else if(this.appJson.page[i].type === "b_quick_entry"){
            this.$store.commit('entry',{entry: this.appJson.page[i]});
          }else if(this.appJson.page[i].type === "b_image_ad"){
            this.$store.commit('carousel',{carousel: this.appJson.page[i]});
          }
        }
      },
    },
    components: {
    },
    mounted() {
      this.initEdit();
    }
 }

</script>
<style lang="scss">
  

</style>
