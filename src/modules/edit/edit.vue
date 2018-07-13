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
      }
      
    },
    computed: {},
    methods: {
      initEdit(){
        let params = {
          id: this.$store.state.edit.allParams.id,
          contentId: this.$store.state.edit.allParams.contentId,
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
          //派发config
          // console.log(this.appJson.page[i].type);
          if(this.appJson.page[i].type === "b_title"){
            this.$store.commit('title',{title: this.appJson.page[i]});
          }else if(this.appJson.page[i].type === "b_notice"){
            this.$store.commit('inform',{inform: this.appJson.page[i].link_data});
          }else if(this.appJson.page[i].type === "w_goods_group"){
            // console.log(this.appJson.page[i]) link_object null
            this.$store.commit('group',{group: this.appJson.page[i]});
          }else if(this.appJson.page[i].type === "w_shop"){
            this.$store.commit('shop',{shop: this.appJson.page[i]});
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
