<template>
  <div class="carousel">
    <div class="edit-box">
      <div class="edit-preview">
        <img :src="preImgStr">
      </div>
      <tabs :currentView="currentView"></tabs>
    </div>
    <div class="editer">
      <div class="editer-title">编辑器详情</div>
      <div class="editer-main">
        <div class="tips">
          <div class="tips-title">图片轮播BANNER</div>
          <div class="tips-box">
            <i class="iconfont icon-yinliang"></i>
            <div>
              <span> 图片大小（待定）</span>
              <span>最少1张，最多8张</span>
            </div>
          </div>
        </div>
        <div class="style">
          <div class="style-title">第一步：选择风格</div>
          <div class="style-box">
            <img src="../../../../assets/images/edit/u503.png" data-idx="1" @click="changeStyle($event)">
            <img src="../../../../assets/images/edit/u505.png" data-idx="2" @click="changeStyle($event)">
            <img src="../../../../assets/images/edit/u507.png" data-idx="3" @click="changeStyle($event)">
          </div>
        </div>
        <div class="content">
          <div class="content-title">第二部：编辑内容</div>
          <div class="content-box" v-for="(item,index) in carouselConfig.sub_entry" :key="index">
            <div class="left" @click="getIndex(index)">
              <el-upload class="avatar-uploader" list-type="picture-card" action="" :show-file-list="false" :before-upload="beforeAvatarUpload">
                <img v-if="item.image_url" :src="item.image_url">
                <!-- <img v-if="item.image_url" :src="item.image_url" class="avatar"> -->
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="right">
              <div class="top">
                <span>次级页面类型：</span>
                <span class="to-popup" @click="toPopup($event,item,index)">{{popupObj[item.link_type]}}</span>
                <span class="icon iconfont icon-edit" @click="toPopup($event,item,index)"></span>
              </div>
              <div class="bottom">
                <span class="sort">排序： </span>
                <el-input-number style="width:100px;" v-model="item.sort" controls-position="right" @change="handleChange" :min="1"></el-input-number>
              </div>
            </div>
            <el-button class="deleteContentBox" type="danger" icon="el-icon-delete" round size="mini" @click="deleteContentBox($event,index)"></el-button>
          </div>
          
        </div>
        <div class="add-more">
          <div class="add-more-left" @click="addContentBox()">
            <i class="iconfont icon-jiahao"></i>
            <span>继续添加</span>
          </div>
          <div class="add-more-right">
            您已经添加了{{carouselConfig.sub_entry.length}}个轮播图片，最多可以添加8个
          </div>
        </div>
        <div class="save">
          <el-tooltip class="item" effect="light" content="先预览再保存" placement="top-end">
            <el-button :plain="true" @click="toPreview()">预览</el-button>
          </el-tooltip>  
          <el-tooltip class="item" effect="light" content="先预览再保存" placement="top-end">
            <el-button :plain="true" type="success" @click="saving">保存</el-button>
          </el-tooltip>    
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as Service from '@/common/service/index/index.js';
  import tabs from '@/modules/appHome/components/tabs/tabs.vue';
  import {getUploadImgSrc,saveJson,previewApp} from '@/common/service/edit/index.js';

  export default {
    props: [],
    data() {
      return {
        currentView:'',
        setting: {},
        // popup页面子标签
        // popupObj: {"goods":"商品","goodsGroup":"商品组","subject":"专题","brand":"品牌","shop":"店铺","url":"H5页面"},
        popupObj: this.$store.state.edit.popupObj,
        carouselConfig: {
          "type": "b_image_ad",
          "image_show_style": "1",
          "sub_entry":[]
        },
        toPopupIndex: 0,//sub_entry数组索引
        preImgArr: ['u503.png','u505.png','u507.png'],
        preImgStr: require('../../../../assets/images/edit/u503.png'),

      }

    },
    computed: {

    },
    components:{
      tabs,
    },
    watch: {
      currentView(){
        this.setting = this.objCopy(this.$store.state.edit[this.currentView])
      },
      "carouselConfig.image_show_style"(){
        //vue的动态图片hack：1、require，2、映射到static目录
        this.preImgStr = require(`../../../../assets/images/edit/${this.preImgArr[this.$store.state.edit.carousel.image_show_style-1]}`)
      },
      carouselConfig:{
        handler: function(){
          // console.log(this.carouselConfig)
          // this.$store.commit('carousel',{carousel: this.carouselConfig});
        },
        deep: true,
      },
    },
    methods: {
      toPreview(){
        this.$router.push({name: 'appHome',params: {"config": this.carouselConfig}});
        
        //   id: this.$store.state.edit.allParams.id,
        //   contentId: this.$store.state.edit.allParams.contentId,
        //   data: ""
        // }
        // params.data =  JSON.stringify(this.$store.state.edit.allParams.data);

        // console.log(params);
        // previewApp(params).then((res)=>{
        //   console.log(res);
        // }).catch((res)=>{
        //   this.$message.error(res.message);
        // }) 
      },
      changeStyle(e){
        
        this.carouselConfig.image_show_style = e.target.getAttribute('data-idx');
        this.$store.commit('carouselStyle',{carouselStyle: e.target.getAttribute('data-idx')})
      },
      toPopup(e,item,index){
        // let popupStr = e.target.innerHTML;
        let popupStr = this.popupObj[item.link_type]

        //跳转路由前保存当前content-box的index
        this.$store.commit('toPopupIndex',{toPopupIndex: index})

        //路由跳转前保存：数组对象
        console.log(this.carouselConfig.sub_entry)
        this.$store.commit('carouselAdd',{carouselAdd: this.carouselConfig.sub_entry})
        let pageType = this.getObjKey(popupStr,this.popupObj);
        this.$router.push({name: 'popupAppHome',params: {'pageType': pageType, 'fromPageType': this.currentView}});
      },
      handleChange(value) {
        value = value.toString();
      },
      deleteContentBox(e,index) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.carouselConfig.sub_entry.splice(index,1);

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      isRegFn1(){
        //轮播图数目验证
        let len = this.carouselConfig.sub_entry.length;
        return len> 0 && len<= 8;
      },
      isRegFn2(){
        return this.requireValue('image_url');
      },
      isRegFn3(){
        //验证排序是否为等差数列
        let newArr = [];
        let len = this.carouselConfig.sub_entry.length;

        for(let i=0;i<len;i++){
          newArr.push(this.carouselConfig.sub_entry[i].sort);
        }
        newArr = [...newArr.sort()];

        let isReg1 = newArr[0]==1 ;
        let isReg2 = newArr[newArr.length-1]==newArr.length ;
        let isReg3;

        if(newArr.length>1){
          for(let j=0;j<newArr.length;j++){
            isReg3= j? newArr[j] - newArr[j-1] == 1: false;
          }
        }else{
          isReg3 = true;
        }

        return isReg1 && isReg2 && isReg3;
      },
      isRegFn4(){
        return this.requireValue('link_type');
      },
      isRegFn5(){
        return this.requireValue('link_value');
      },
      requireValue(){
        let newArr = [];
        let isReg = false;
        let len = this.carouselConfig.sub_entry.length;

        for(let i=0;i<len;i++){
          newArr.push(this.carouselConfig.sub_entry[i][arguments[0]]);
        }

        for(let j=0;j<newArr.length;j++){
          if(newArr[j]=='' || newArr[j]==undefined){
            isReg= false;
            break;
          }else{
            isReg= true;
          }
        }
        return isReg;
      },
      saving(){
        console.log(this.carouselConfig)
        let isReg1 = this.isRegFn1();
        let isReg2 = this.isRegFn2();
        let isReg3 = this.isRegFn3();
        let isReg4 = this.isRegFn4();
        let isReg5 = this.isRegFn5();
        let isRegAll = isReg1 && isReg2 && isReg3 && isReg4 && isReg5;
        // console.log(isReg1,isReg2,isReg3,isReg4,isReg5);

        let message = '保存成功'
        let message1 = '轮播图数目应在1-8之间';
        let message2 = '未正确上传轮播图';
        let message3 = '轮播图排序最小为1，步长为1';
        let message4 = '次级页面类型不能为空';
        let message5 = '次级页面类型的值不能为空';
        let type = 'error';
        
        if(!isReg1){
          message = message1;
        }else if(!isReg2){
          message = message2;
        }else if(!isReg3){
          message = message3;
        }else if(!isReg4){
          message = message4;
        }else if(!isReg5){  
          message = message5;
        }else if(isRegAll){
          //sort处理
          let len = this.carouselConfig.sub_entry.length;
          for(let i=0;i<len;i++){
            this.carouselConfig.sub_entry[i].sort = this.carouselConfig.sub_entry[i].sort.toString();
          }

          //发送到vuex进行公共处理
          this.$store.commit('allParams',{data: this.carouselConfig});
          
          let params = {
            // id: this.$store.state.edit.allParams.id,
            // contentId: this.$store.state.edit.allParams.contentId,
            data: "",
          }
          params.data =  JSON.stringify(this.$store.state.edit.allParams.data);
          console.log(params.data)

          saveJson(params).then((res)=>{
            console.log(res);
            this.tips('success','保存成功')
          }).catch((res)=>{
            console.log(res)
            this.$message.error(res.message);
          }) 
        }
        this.tips('error',message);
      },
      addContentBox(){
        if(this.carouselConfig.sub_entry.length >= 8){
          this.tips('error','至多添加8个轮播图');
          return false;
        }
        this.carouselConfig.sub_entry.push({
          "sort": "1",
          "image_url": "",
          "link_type": "goods",
          "link_value": "1"
        })
        this.$store.commit('carouselAdd',{carouselAdd: this.carouselConfig.sub_entry})
        console.log(this.$store.state.edit.carousel)
      },
      getIndex(index){
        this.toPopupIndex = index;
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
        console.log('------------')
				getUploadImgSrc(file).then((res)=>{
          console.log(res);
          this.carouselConfig.sub_entry[this.toPopupIndex].image_url = res;
          this.$store.commit('carouselAdd',{carouselAdd: this.carouselConfig.sub_entry});

				}).catch((res)=>{
					this.$message.error(res.message);
				})
				
				return false;
      },
      
    },
    mounted() {
      this.currentView = location.hash.slice(10);//给tabs组件判断active

      // this.carouselConfig.sub_entry 
      //   = Array.from(new Set(this.$store.state.edit.carousel.carouselAdd));
      // this.carouselConfig.image_show_style 
      //   = this.$store.state.edit.carousel.carouselStyle;
      this.carouselConfig = Object.assign(this.carouselConfig, this.$store.state.edit.carousel);
      console.log(this.carouselConfig)
      // this.objCopy(this.$store.state.edit.carousel);
      

      if(this.carouselConfig.sub_entry.length>0){
        this.toPopupIndex = this.$store.state.edit.toPopupIndexCarousel || 0;
        this.carouselConfig.sub_entry[this.toPopupIndex].link_type = this.$route.params.pageType || this.carouselConfig.sub_entry[this.toPopupIndex].link_type || "goods";
        this.carouselConfig.sub_entry[this.toPopupIndex].link_value = this.$route.params.id || this.carouselConfig.sub_entry[this.toPopupIndex].link_value || "1";
        this.$store.commit('carouselAdd',{carouselAdd: this.carouselConfig.sub_entry});
      }
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
