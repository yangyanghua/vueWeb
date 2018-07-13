<template>
  <component-wrapper :uuid="initInfo.uuid" :id="initInfo.uuid" :key="initInfo.uuid" :storeList="storeList">

    <img slot="left" :src="styleUrl" alt="" class="slider-preview">
    <el-card class="box-card" slot="right">
      <div slot="header" class="clearfix">
        <span>图片轮播BANNER</span>
      </div>
      <h3 class="steps notop">
        第一步：选择风格
      </h3>
      <el-row :gutter="20">
        <el-col :span="8" v-for="data in styleTypes" :key="data.id">
          <div class="grid-content bg-purple">
            <img class="style-img" :src="data.url" alt="">
            <el-radio :label="data.id" v-model="propsData.styleType">{{data.name}}</el-radio>
          </div>
        </el-col>
      </el-row>
       <h3 class="steps">
        第二步：编辑内容
      </h3>
      <ul>
        <li>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="true"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </li>
      </ul>
    </el-card>
  </component-wrapper>
</template>
<script>
  import {
    mixin
  } from '../mixin.js';
  export default {
    mixins: [mixin],
    name: 'swiper-info',
    data() {
      return {
        imageUrl: '',
        styleUrl: '',
        styleTypes: [{
          id: 1,
          name: '风格1',
          url: 'https://img.yzcdn.cn/upload_files/2018/02/09/Fii7c8jM-m8c3VhIXsAuP0YKEft9.jpg?imageView2/2/w/520/h/0/q/75/format/webp'
        }, {
          id: 2,
          name: '风格2',
          url: 'http://img01.sys.iflashbuy.com:8282/group2/M00/07/66/wKgF-lpxZ7eACWilAAIPej2NQQg474.png',
        }, {
          id: 3,
          name: '风格3',
          url: 'https://img.yzcdn.cn/upload_files/2018/02/09/FrdT3BBympH1Mmt7g928OJKQgHxU.jpg?imageView2/2/w/520/h/0/q/75/format/webp'
        }],
        propsData: {
          styleType: 1, //风格类型
        }
      }
    },

    watch: {
      'propsData.styleType': {
        handler: 'handleStyleChange',
        immediate: true,
      }
    },
    methods: {
      handleStyleChange(){
          let style = this.styleTypes.find(x=>x.id===this.propsData.styleType);        
         this.styleUrl = style?style.url:'';
         console.log('style : ', this.styleTypes, this.propsData.styleType,this.styleUrl);
      },
       handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    mounted(){
      console.log(666)
      console.log('init 11', this.propsData);
      // debugger;
      this.handleStyleChange();
    }

  }

</script>
<style scoped lang="scss" scoped>
  .btn-text {
    vertical-align: top;
    margin-left: 10px;
  }

  .style-img {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
   

  }
  .steps{
    margin-bottom: 12px;
     margin-top: 40px;
     &.notop{
       margin-top: 0;
     }
  }
.slider-preview{
  width: 100%;
  height: 100%;
}

</style>
