<template>
  <div class="entry">
    <div class="edit-box">
      <div class="edit-preview">
        <!-- <img :src="preImgStr"> -->
        <div class="img-box" v-if="entryConfig.sub_entry" v-for="(item, index) in entryConfig.sub_entry" :key="index">
          <img :src="item.image_url">
          <p>{{item.name}}</p>
        </div>
      </div>
      <tabs :currentView="currentView"></tabs>
    </div>
    <div class="editer">
      <div class="editer-title">编辑器详情</div>
      <div class="editer-main">
        <div class="tips">
          <div class="tips-title">快捷入口</div>
          <div class="tips-box">
            <i class="iconfont icon-yinliang"></i>
            <div>
              <span> 图片大小（待定）</span>
              <span>最少5个，超过5个不到10个，第5个显示更多。</span>
            </div>
          </div>
        </div>
        
        <div class="content">
          <div class="content-title">编辑快捷入口内容</div>
          <div class="content-box" v-for="(item,index) in entryConfig.sub_entry" :key="index">
            <div class="left" @click="getIndex(index)">
              <el-upload class="avatar-uploader" list-type="picture-card" action="" :show-file-list="false" :before-upload="beforeAvatarUpload">
                <img v-if="item.image_url" :src="item.image_url">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-input v-model="item.name" size="mini" placeholder="请输入名称" @focus="focus($event)"></el-input>
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
            您已经添加了{{entryConfig.sub_entry.length}}个快捷入口，最多可以添加10个
          </div>
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
    props: [],
    data() {
      return {
        currentView:'',
        setting: {},
        popupObj: this.$store.state.edit.popupObj,
        entryConfig: {
          "type": "b_quick_entry",
          "sub_entry":[]
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
        this.setting = this.objCopy(this.$store.state.edit[this.currentView])
      },
      entryConfig:{
        handler: function(){
          // console.log(this.entryConfig)
        },
        deep: true,
      }
    },
    methods: {
      focus(event) {
        event.currentTarget.select();
      },
      toPopup(e,item,index){
        let popupStr = this.popupObj[item.link_type]
        this.$store.commit('toPopupIndexEntry',{toPopupIndex: index})

        //路由跳转前保存：数组对象
        this.$store.commit('entryAdd',{entryAdd: this.entryConfig.sub_entry})
        let pageType = this.getObjKey(popupStr,this.popupObj);
        this.$router.push({name: 'popup',params: {'pageType': pageType, 'fromPageType': this.currentView}});
      },
      handleChange(value) {
        // console.log(value)
      },
      deleteContentBox(e,index) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.entryConfig.sub_entry.splice(index,1);

          this.tips('success','删除成功!');
        }).catch(() => {
          this.tips('info','已取消删除!');
        });
      },
      isRegFn1(){
        //图片数目验证
        let len = this.entryConfig.sub_entry.length;
        // return len> 4 && len< 10;
        return len>0;
      },
      isRegFn2(){
        return this.requireValue('image_url');
      },
      isRegFn3(){
        //验证排序是否为等差数列
        let newArr = [];
        let len = this.entryConfig.sub_entry.length;

        for(let i=0;i<len;i++){
          newArr.push(this.entryConfig.sub_entry[i].sort);
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
      isRegFn6(){
        return this.requireValue('name');
      },
      requireValue(){
        let newArr = [];
        let isReg = false;
        let len = this.entryConfig.sub_entry.length;

        for(let i=0;i<len;i++){
          newArr.push(this.entryConfig.sub_entry[i][arguments[0]]);
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
        console.log(this.entryConfig)
        let isReg1 = this.isRegFn1();
        let isReg2 = this.isRegFn2();
        let isReg3 = this.isRegFn3();
        let isReg4 = this.isRegFn4();
        let isReg5 = this.isRegFn5();
        let isReg6 = this.isRegFn6();
        let isRegAll = isReg1 && isReg2 && isReg3 && isReg4 && isReg5 && isReg6;
        // console.log(isReg1,isReg2,isReg3,isReg4,isReg5);

        let message = '保存成功'
        let message1 = '快捷入口最少5个，不超过10个';
        let message2 = '未正确上传图片';
        let message3 = '图片排序最小为1，步长为1';
        let message4 = '次级页面类型不能为空';
        let message5 = '次级页面类型的值不能为空';
        let message6 = '快捷入口名不能为空';
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
        }else if(!isReg6){  
          message = message6;
        }else if(isRegAll){
          //sort处理
          let len = this.entryConfig.sub_entry.length;
          for(let i=0;i<len;i++){
            this.entryConfig.sub_entry[i].sort = this.entryConfig.sub_entry[i].sort.toString();
          }

          //发送到vuex进行公共处理
          this.$store.commit('allParams',{data: this.entryConfig});
          
          let params = {
            id: this.$store.state.edit.allParams.id,
            contentId: this.$store.state.edit.allParams.contentId,
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
      addContentBox(){
        this.entryConfig.sub_entry.push({
          "sort": "1",
          "name": "",
          "image_url": "",
          "link_type": "goods",
          "link_value": "1"
        })
        this.$store.commit('entryAdd',{entryAdd: this.entryConfig.sub_entry})
        console.log(this.$store.state.edit.entry.entryAdd)
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
          this.entryConfig.sub_entry[this.toPopupIndex].image_url = res;
          this.$store.commit('entryAdd',{entryAdd: this.entryConfig.sub_entry});

				}).catch((res)=>{
					this.$message.error(res.message);
				})
				
				return false;
      },
    },
    mounted() {
      this.currentView = location.hash.slice(7);

      //组件初始化前：挂上数组对象
      this.entryConfig.sub_entry 
        = Array.from(new Set(this.$store.state.edit.entry.entryAdd));

      if(this.entryConfig.sub_entry.length>0){
        this.toPopupIndex = this.$store.state.edit.entry.toPopupIndex || 0;
        this.entryConfig.sub_entry[this.toPopupIndex].link_type = this.$route.params.pageType || this.entryConfig.sub_entry[this.toPopupIndex].link_type || "goods";
        this.entryConfig.sub_entry[this.toPopupIndex].link_value = this.$route.params.id || this.entryConfig.sub_entry[this.toPopupIndex].link_value || "1";
        this.$store.commit('entryAdd',{entryAdd: this.entryConfig.sub_entry});
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
