<template>
  <div class="seize">
    <div class="edit-box">
      <div class="edit-preview">
        <img v-if="seizeConfig.image_url" :src="seizeConfig.image_url" class="avatar">
      </div>
      <tabs :currentView="currentView"></tabs>
    </div>
    <div class="editer">
      <div class="editer-title">编辑器详情</div>
      <div class="editer-main">
        <div class="tips">
          <div class="tips-title">占位图</div>
          <div class="tips-box">
            <i class="iconfont icon-yinliang"></i>
            <div>
              <span>规则：</span>
              <span></span>
            </div>
          </div>
        </div>
        <div class="style">
          <div class="style-title">上传图片</div>
          <el-upload class="upload-demo" drag action="" :show-file-list="false" :before-upload="beforeAvatarUpload" >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
        <div class="switch">
          <el-switch 
            v-model="seizeConfig.is_open" 
            active-color="#13ce66" 
            active-text="触摸图片可打开次级页面（默认只是占位图，触摸或点击无法打开页面）"
            inactive-color="#ccc">
          </el-switch>
        </div>
        <div class="second-page" v-if="seizeConfig.is_open">
          <span>次级页面类型：</span>
          <span class="to-popup" @click="toPopup()">{{popupObj[seizeConfig.link_type]}}</span>
          <span class="icon iconfont icon-edit" @click="toPopup()"></span>
        </div>
        <div class="save">
          <el-button :plain="true">预览</el-button>
          <el-button :plain="true" type="success" @click="saving">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as Service from '@/common/service/index/index.js';
  import tabs from '@/modules/edit/components/tabs/tabs.vue';
  import {getUploadImgSrc,saveJson} from '@/common/service/edit/index.js';

  export default {
    data() {
      return {
        currentView:'',
        popupObj: this.$store.state.edit.popupObj,
        seizeConfig: {
          "type": "b_placeholder_img", 
          "is_open": false,
          "image_url": "",
          "link_type": "goods", 
          "link_value": "1" 
        },
        
      }

    },
    computed: {},
    watch: {
      //深度监听
      seizeConfig:{
        handler: function(){
          this.$store.commit('seize',{seize: this.seizeConfig});
        },
        deep: true,
      }
    },
    methods: {
      saving(){
        this.$store.commit('allParams',{data: this.seizeConfig});
          
        let params = {
          id: this.$store.state.edit.allParams.id,
          contentId: this.$store.state.edit.allParams.contentId,
          data: "",
        }
        params.data =  JSON.stringify(this.$store.state.edit.allParams.data);
        console.log(params)

        saveJson(params).then((res)=>{
          console.log(res)
          this.tips('success','保存成功');
        }).catch((res)=>{
          this.$message.error(res.message);
        }) 
      },
      toPopup(){
        let popupStr = this.popupObj[this.seizeConfig.link_type]
        let pageType = this.getObjKey(popupStr,this.popupObj);
        
        this.$router.push({
          name: 'popup',
          params: {
            'pageType': pageType, 
            'fromPageType': this.currentView
          }
        });
      },
      beforeAvatarUpload(file,e) {
				const isJPG = file.type === 'image/jpeg';
				const isPNG = file.type === 'image/png';
				const isLt2M = file.size / 1024 / 1024 < 2;
				if(!isJPG && !isPNG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				getUploadImgSrc(file).then((res)=>{
          this.seizeConfig.image_url = res;

				}).catch((res)=>{
					this.$message.error(res.message);
				})
				
				return false;
      },
    },
    components:{
      tabs
    },
    mounted() {
      this.currentView = location.hash.slice(7);
      console.log(this.$route.params.pageType)
      this.seizeConfig = Object.assign(this.seizeConfig, this.$store.state.edit.seize);
      this.seizeConfig.link_type = this.$route.params.pageType || this.seizeConfig.link_type || "goods";
      this.seizeConfig.link_value = this.$route.params.id || this.seizeConfig.link_value || "1";
    },
    updated() {
    }
 }

</script>
<style lang="scss" scoped>

</style>
