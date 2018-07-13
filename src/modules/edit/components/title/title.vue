<template>
  <div class="title">
    <div class="edit-box">
      <div class="edit-preview title-box">
        <p class="spe_title">{{titleConfig.title}}</p>
        <p class="sub_title">{{titleConfig.sub_title}}</p>
      </div>
      <tabs :currentView="currentView"></tabs>
    </div>
    <div class="editer">
      <div class="editer-title">编辑器详情</div>
      <div class="editer-main">
        <div class="tips">
          <div class="tips-title">消息通知</div>
          <div class="tips-box">
            <i class="iconfont icon-yinliang"></i>
            <div>
              <span>规则：</span>
              <span></span>
            </div>
          </div>
        </div>
        <el-form :label-position="labelPosition" label-width="60px" :model="titleConfig">
          <el-form-item label="*标题">
            <el-input v-model="titleConfig.title" placeholder="输入标题内容"></el-input>
          </el-form-item>
          <el-form-item label="副标题">
            <el-input v-model="titleConfig.sub_title"></el-input>
          </el-form-item>
          <el-radio-group v-model="titleConfig.show_location" size="small">
            <h3 style="display:inline-block;margin:0 20px 20px 0">显示位置：</h3>
            <el-radio label="1" >左侧对齐</el-radio>
            <el-radio label="2" >水平居中</el-radio>
            <el-radio label="3" >右侧对齐</el-radio>
          </el-radio-group>
          <div class="title-bg">
            <h3 style="display:inline-block;margin-right:20px">*背景</h3>
            <!-- <el-color-picker v-model="titleConfig.color" size="mini"></el-color-picker> -->
            <el-upload class="upload-demo" action="" :show-file-list="false" :before-upload="beforeAvatarUpload">
              <el-button style="display:inline-block;" size="small" type="primary">点击上传</el-button>
              <!-- <img v-if="item.image_url" :src="item.image_url"> -->
              <!-- <img v-if="item.image_url" :src="item.image_url" class="avatar"> -->
              <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
            </el-upload>
          </div>
        </el-form>
        <div class="second-page">
          <span>次级页面类型：</span>
          <span class="to-popup" @click="toPopup()">{{popupObj[titleConfig.link_type]}}</span>
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
  import {saveJson,getUploadImgSrc} from '@/common/service/edit/index.js';

  export default {
    data() {
      return {
        currentView:'',
        popupObj: this.$store.state.edit.popupObj,
        titleConfig: {
          "type": "b_title", 
          "title": "",
          "sub_title": "", 
          "show_location": "1",
          "color": "#e72525",
          "background_img": "",
          "link_type": "goods",
          "link_value": "1"
        },
        labelPosition: "left",
      }
    },
    computed: {
      title: {
        get(){
          return this.$store.state.edit.title.title;
        },
        set(value){
          this.$store.commit('updateTitleTitle',{title: value});
        }
      },
      sub: {
        get(){
          return this.$store.state.edit.title.sub_title;
        },
        set(value){
          this.$store.commit('updateSubTitle',{sub: value});
        }
      },
      location: {
        get(){
          return this.$store.state.edit.title.show_location;
        },
        set(value){
          this.$store.commit('updateShowLocation',{location: value});
        }
      },
      color: {
        get(){
          return this.$store.state.edit.title.color;
        },
        set(value){
          this.$store.commit('updateColor',{color: value});
        }
      },
    },
    watch: {
      titleConfig:{
        handler: function(){
          this.$store.commit('title',{title: this.titleConfig});
        },
        deep: true,
      },
      "titleConfig.show_location": function(){
        let title = document.querySelectorAll('.title-box p');

        switch(this.titleConfig.show_location){
        case "1":
          title[0].style.textAlign = 'left';
          title[1].style.textAlign = 'left';
          break;
        case "2":
          title[0].style.textAlign = 'center';
          title[1].style.textAlign = 'center';
          break;
        case "3":
          title[0].style.textAlign = 'right';
          title[1].style.textAlign = 'right';
          break;
        }
      },
      "titleConfig.background_img": function(){
        let titleBox = document.querySelector('.title-box');
        titleBox.style.backgroundImage = `url(${this.titleConfig.background_img})`
      }
    },
    methods: {
      saving(){
        this.$store.commit('allParams',{data: this.titleConfig});
          
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
          console.log(res)
          this.$message.error(res.message);
        }) 
      },
      toPopup(){
        let popupStr = this.popupObj[this.titleConfig.link_type]
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
          this.titleConfig.background_img = res;
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

      this.titleConfig = Object.assign(this.titleConfig, this.$store.state.edit.title);
      this.titleConfig.link_type = this.$route.params.pageType || this.titleConfig.link_type || "goods";
      this.titleConfig.link_value = this.$route.params.id || this.titleConfig.link_value || "1";
    },
    updated() {
    }
 }

</script>
<style lang="scss" scoped>

</style>
