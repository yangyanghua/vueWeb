<template>
  <div class="jjgsaw">
    <div class="edit-box">
      <div class="edit-preview">
        <!-- <img :src="preImgStr"> -->
        <div class="preview-item item1" v-if="jjgsawConfig.show_style === '1'">
          <div :class="'item1'+(index+1)" v-for="(item ,index) in jjgsawConfig.sub_entry" :key="index">
            <img v-if="item.image_url" :src="item.image_url">
          </div>
        </div>
        <div class="preview-item item2" v-if="jjgsawConfig.show_style === '2'">
          <div :class="'item2'+(index+1)" v-for="(item ,index) in jjgsawConfig.sub_entry" :key="index">
            <img v-if="item.image_url" :src="item.image_url">
          </div>
        </div>
        <div class="preview-item item3" v-if="jjgsawConfig.show_style === '3'">
          <div :class="'item3'+(index+1)" v-for="(item ,index) in jjgsawConfig.sub_entry" :key="index">
            <img v-if="item.image_url" :src="item.image_url">
          </div>
        </div>
        <div class="preview-item item4" v-if="jjgsawConfig.show_style === '4'">
          <div :class="'item4'+(index+1)" v-for="(item ,index) in jjgsawConfig.sub_entry" :key="index">
            <img v-if="item.image_url" :src="item.image_url">
          </div>
        </div>
        <div class="preview-item item5" v-if="jjgsawConfig.show_style === '5'">
          <div :class="'item5'+(index+1)" v-for="(item ,index) in jjgsawConfig.sub_entry" :key="index">
            <img v-if="item.image_url" :src="item.image_url">
          </div>
        </div>
        <div class="preview-item item6" v-if="jjgsawConfig.show_style === '6'">
          <div :class="'item6'+(index+1)" v-for="(item ,index) in jjgsawConfig.sub_entry" :key="index">
            <img v-if="item.image_url" :src="item.image_url">
          </div>
        </div>
        <div class="preview-item item7" v-if="jjgsawConfig.show_style === '7'">
          <div :class="'item7'+(index+1)" v-for="(item ,index) in jjgsawConfig.sub_entry" :key="index">
            <img v-if="item.image_url" :src="item.image_url">
          </div>
        </div>
        <div class="preview-item item8" v-if="jjgsawConfig.show_style === '8'">
          <div :class="'item8'+(index+1)" v-for="(item ,index) in jjgsawConfig.sub_entry" :key="index">
            <img v-if="item.image_url" :src="item.image_url">
          </div>
        </div>
      </div>
      <tabs :currentView="currentView"></tabs>
    </div>
    <div class="editer">
      <div class="editer-title">编辑器详情</div>
      <div class="editer-main">
        <div class="tips">
          <div class="tips-title">拼图</div>
          <div class="tips-box">
            <i class="iconfont icon-yinliang"></i>
            <div>
              <span> 规则</span>
            </div>
          </div>
        </div>
        <div class="style">
          <div class="style-title">选择拼图类型</div>
          <div class="style-box">
            <img class="style-img" src="../../../../assets/images/edit/jjgsaw1.png" data-idx="1" data-number="4" @click="changeStyle($event)">
            <img class="style-img" src="../../../../assets/images/edit/jjgsaw2.png" data-idx="2" data-number="3" @click="changeStyle($event)">
            <img class="style-img" src="../../../../assets/images/edit/jjgsaw3.png" data-idx="3" data-number="3" @click="changeStyle($event)">
            <img class="style-img" src="../../../../assets/images/edit/jjgsaw4.png" data-idx="4" data-number="5" @click="changeStyle($event)">
            <img class="style-img" src="../../../../assets/images/edit/jjgsaw5.png" data-idx="5" data-number="2" @click="changeStyle($event)">
            <img class="style-img" src="../../../../assets/images/edit/jjgsaw6.png" data-idx="6" data-number="3" @click="changeStyle($event)">
            <img class="style-img" src="../../../../assets/images/edit/jjgsaw7.png" data-idx="7" data-number="4" @click="changeStyle($event)">
            <img class="style-img" src="../../../../assets/images/edit/jjgsaw8.png" data-idx="8" data-number="8" @click="changeStyle($event)">
          </div>
        </div>
        <div class="content">
          <div class="content-title">编辑内容</div>
          <div class="content-box" :class="`content-box${index+1}`" v-for="(item,index) in jjgsawConfig.sub_entry" :key="index">
            <div class="left">
              <div class="preview-item item1 mini-item" v-if="jjgsawConfig.show_style === '1'" >
                <div class="jjgsaw-item item11"></div>
                <div class="jjgsaw-item item12"></div>
                <div class="jjgsaw-item item13"></div>
                <div class="jjgsaw-item item14"></div>
              </div>
              <div class="preview-item item2 mini-item" v-else-if="jjgsawConfig.show_style === '2'" >
                <div class="jjgsaw-item item21"></div>
                <div class="jjgsaw-item item22"></div>
                <div class="jjgsaw-item item23"></div>
              </div>
              <div class="preview-item item3 mini-item" v-else-if="jjgsawConfig.show_style === '3'" >
                <div class="jjgsaw-item item31"></div>
                <div class="jjgsaw-item item32"></div>
                <div class="jjgsaw-item item33"></div>
              </div>
              <div class="preview-item item4 mini-item" v-else-if="jjgsawConfig.show_style === '4'" >
                <div class="jjgsaw-item item41"></div>
                <div class="jjgsaw-item item42"></div>
                <div class="jjgsaw-item item43"></div>
                <div class="jjgsaw-item item44"></div>
                <div class="jjgsaw-item item45"></div>
              </div>
              <div class="preview-item item5 mini-item" v-else-if="jjgsawConfig.show_style === '5'" >
                <div class="jjgsaw-item item51"></div>
                <div class="jjgsaw-item item52"></div>
              </div>
              <div class="preview-item item6 mini-item" v-else-if="jjgsawConfig.show_style === '6'" >
                <div class="jjgsaw-item item61"></div>
                <div class="jjgsaw-item item62"></div>
                <div class="jjgsaw-item item63"></div>
              </div>
              <div class="preview-item item7 mini-item" v-else-if="jjgsawConfig.show_style === '7'" >
                <div class="jjgsaw-item item71"></div>
                <div class="jjgsaw-item item72"></div>
                <div class="jjgsaw-item item73"></div>
                <div class="jjgsaw-item item74"></div>
              </div>
              <div class="preview-item item8 mini-item" v-else-if="jjgsawConfig.show_style === '8'" >
                <div class="jjgsaw-item item81"></div>
                <div class="jjgsaw-item item82"></div>
                <div class="jjgsaw-item item83"></div>
                <div class="jjgsaw-item item84"></div>
                <div class="jjgsaw-item item85"></div>
                <div class="jjgsaw-item item86"></div>
                <div class="jjgsaw-item item87"></div>
                <div class="jjgsaw-item item88"></div>
              </div>
            </div>
            <div class="right">
              <div class="top">
                <el-upload class="upload-demo" action="" :show-file-list="false" :before-upload="beforeAvatarUpload">
                  <el-button style="display:inline-block;" size="small" type="primary" @click="getIndex(index)">点击上传</el-button>
                </el-upload>
              </div>
              <div class="bottom">
                <span>次级页面类型：</span>
                <span class="to-popup" @click="toPopup($event,item,index)">{{popupObj[item.link_type]}}</span>
                <span class="icon iconfont icon-edit" @click="toPopup($event,item,index)"></span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- <div class="add-more">
          <div class="add-more-right">
            您已经添加了{{jjgsawConfig.sub_entry.length}}个拼图，最多可以添加{{jjgsawConfig.number}}个
          </div>
        </div> -->
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
  import tabs from '@/modules/appHome/components/tabs/tabs.vue';
  import {getUploadImgSrc,saveJson} from '@/common/service/edit/index.js';

  export default {
    props: [],
    data() {
      return {
        currentView:'',
        setting: {},
        popupObj: this.$store.state.edit.popupObj,
        jjgsawConfig: {
          "type": "b_jigsaw",
          "show_style": "",
          "number": "4",
          "sub_entry":[]
        },
        contentBox: {
          "sort": "1",
          "image_url": "",
          "link_type": "goods",
          "link_value": "1"
        },
        toPopupIndex: 0,//sub_entry数组索引
      }

    },
    computed: {
      
    },
    components:{
      tabs
    },
    watch: {
      currentView(){
        // this.setting = this.objCopy(this.$store.state.edit[this.currentView])
      },
      jjgsawConfig:{
        handler: function(){
          this.$store.commit('jjgsaw',{jjgsaw: this.jjgsawConfig});
        },
        deep: true,
      }
    },
    methods: {
      changeStyle(e){
        
        this.$confirm('当前跳转会丢失拼图风格的编辑数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.jjgsawConfig.show_style = e.target.getAttribute('data-idx');
          this.jjgsawConfig.number = e.target.getAttribute('data-number');
          this.activeTarget = e.target;
          this.initJjgsaw();
          this.targetActive(e.target);

          this.tips('success','跳转成功!');
        }).catch(() => {
          this.tips('info','已取消!');
        });
      },
      targetActive(){
        if(!arguments[0]){
          return false;
        }
        this.initActive();
      },
      initActive(){
        let targets = [...document.querySelectorAll('.style-box img')];
        for(let i=0;i<targets.length;i++){
          if(targets[i].getAttribute('data-idx')===this.jjgsawConfig.show_style){
            targets[i].classList.add('active');
          }else{
            targets[i].classList.remove('active');
          }
        }
      },
      toPopup(e,item,index){
        let popupStr = this.popupObj[item.link_type]
        let pageType = this.getObjKey(popupStr,this.popupObj);
        this.$store.commit('toPopupIndexJjgsaw',{toPopupIndex: index})
        console.log(pageType,this.currentView)

        // this.$store.commit('entryAdd',{entryAdd: this.entryConfig.sub_entry})
        this.$router.push({name: 'popupAppHome',params: {'pageType': pageType, 'fromPageType': this.currentView}});
      },
      isRegFn1(){
        let len = this.jjgsawConfig.sub_entry.length;
        return len == this.jjgsawConfig.number;
      },
      isRegFn2(){
        return this.requireValue('image_url');
      },
      isRegFn3(){
        //验证排序是否为等差数列
        let newArr = [];
        let len = this.jjgsawConfig.sub_entry.length;

        for(let i=0;i<len;i++){
          newArr.push(this.jjgsawConfig.sub_entry[i].sort);
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
        let len = this.jjgsawConfig.sub_entry.length;

        for(let i=0;i<len;i++){
          newArr.push(this.jjgsawConfig.sub_entry[i][arguments[0]]);
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
        let isReg1 = this.isRegFn1();
        let isReg2 = this.isRegFn2();
        let isReg3 = this.isRegFn3();
        let isReg4 = this.isRegFn4();
        let isReg5 = this.isRegFn5();
        let isRegAll = isReg1 && isReg2 && isReg3 && isReg4 && isReg5;
        // console.log(isReg1,isReg2,isReg3,isReg4,isReg5);

        let message = '保存成功'
        let message1 = `拼图图片数目应为${this.jjgsawConfig.number}个`;
        let message2 = '未正确上传图片';
        let message3 = '图片排序最小为1，步长为1';
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
          let len = this.jjgsawConfig.sub_entry.length;
          for(let i=0;i<len;i++){
            this.jjgsawConfig.sub_entry[i].sort = this.jjgsawConfig.sub_entry[i].sort.toString();
          }

          //发送到vuex进行公共处理
          this.$store.commit('allParams',{data: this.jjgsawConfig});
          
          let params = {
            // id: this.$store.state.edit.allParams.id,
            // contentId: this.$store.state.edit.allParams.contentId,
            data: "",
          }
          params.data =  JSON.stringify(this.$store.state.edit.allParams.data);
          console.log(params);

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
				getUploadImgSrc(file).then((res)=>{
          
          this.jjgsawConfig.sub_entry[this.toPopupIndex].image_url = res;
          this.jjgsawConfig.sub_entry[this.toPopupIndex].sort = (this.toPopupIndex + 1).toString();
				}).catch((res)=>{
					this.$message.error(res.message);
				})
				
				return false;
      },
      initJjgsaw(){
        
        switch (this.jjgsawConfig.show_style){ 
          case "1":
            this.jjgsawConfig.sub_entry = [{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"}]
            break;
          case "2":
            this.jjgsawConfig.sub_entry = [{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"}]
            break;
          case "3":
            this.jjgsawConfig.sub_entry = [{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"}]
            break;
          case "4":
            this.jjgsawConfig.sub_entry = [{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"}]
            break;
          case "5":
            this.jjgsawConfig.sub_entry = [{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"}]
            break;
          case "6":
            this.jjgsawConfig.sub_entry = [{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"}]
            break;
          case "7":
            this.jjgsawConfig.sub_entry = [{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"}]
            break;
          case "8":
            this.jjgsawConfig.sub_entry = [{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"},{"sort": "1","image_url": "","link_type": "goods","link_value": "1"}]
            break;
        }
      },
      skipTips(){
        
      }
    },
    mounted() {
      this.currentView = location.hash.slice(10);

      if(this.$store.state.edit.jjgsaw.sub_entry && this.$store.state.edit.jjgsaw.sub_entry.length){
        this.jjgsawConfig = this.objCopy(this.$store.state.edit.jjgsaw);
      }

      if(this.jjgsawConfig.sub_entry.length>0){
        this.toPopupIndex = this.$store.state.edit.toPopupIndexJjgsaw || 0;
        this.jjgsawConfig.sub_entry[this.toPopupIndex].link_type = this.$route.params.pageType || this.jjgsawConfig.sub_entry[this.toPopupIndex].link_type || "goods";
        this.jjgsawConfig.sub_entry[this.toPopupIndex].link_value = this.$route.params.id || this.jjgsawConfig.sub_entry[this.toPopupIndex].link_value || "1";
      }

      this.initActive();

      // window.onscroll = function(e){
      //   console.log(window.scrollY);
      //   let target = document.querySelector('.edit-box');
      //   target.style.marginTop = window.scrollY - 100 + 'px';
      // }
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
