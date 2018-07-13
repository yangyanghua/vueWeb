<template>
  <div class="jjgsaw">
    <div class="edit-box">
      <div class="edit-preview"></div>
      <tabs :currentView="currentView"></tabs>
    </div>
    <div class="editer">
      <div class="editer-title">编辑器详情</div>
      <div class="editer-main">
        <div class="tips">
          <div class="tips-title">商品组</div>
          <div class="tips-box">
            <i class="iconfont icon-yinliang"></i>
            <div>
              <span> 规则</span>
            </div>
          </div>
        </div>
        
        <div class="save">
          <el-button :plain="true" type="success" @click="saving">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as Service from '@/common/service/index/index.js';
  import tabs from '@/modules/appHome/components/tabs/tabs.vue';
  import {getUploadImgSrc,saveJson} from '@/common/service/edit/index.js';

  export default {
    props: [],
    data() {
      return {
        currentView:'',
        popupObj: this.$store.state.edit.popupObj,
        
        toPopupIndex: 0,//sub_entry数组索引

        appJson: [],
      }

    },
    computed: {
      
    },
    components:{
      tabs
    },
    watch: {
      currentView(){
      },
      
    },
    methods: {
      toPopup(e,item,index){
        
      },
      saving(){},
      initConfig(){
        // this.appJson = Object.assign(this.$store.state.edit.allParams.data,)
        let tempArr = [...this.$store.state.edit.allParams.data];
        for(let i=0;i<tempArr.length;i++){
          if(tempArr[i].type === this.$route.params.config.type){
            tempArr[i] = Object.assign(tempArr[i],this.$route.params.config);
          }
        }
        // console.log(this.$store.state.edit.allParams.data)
        // console.log(this.$route.params.config);
        // console.log(tempArr);
      },
    },
    mounted() {
      window.scrollTo(0,0);
      this.currentView = location.hash.slice(7);

      this.$route.params.config && this.initConfig();
    },
        
 }

</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
