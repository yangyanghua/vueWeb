<template>
  <div class="inform">
    <div class="edit-box">
      <div class="edit-preview">
        <!--   -->
        <div class="inform-box" v-for="(item,index) in activeDataset" :style="{backgroundImage: 'url(' +item.imgUrl+ ')'}" :key="index">
          <el-button type="text" disabled>消息标题{{index+1}}：{{item.title}}</el-button>
          <h2>消息内容{{index+1}}：{{item.content}}</h2>
        </div>
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
        <el-button type="success" @click="dialogFormVisible = true">添加</el-button>
        <!-- 弹出框：添加 -->
        <el-dialog title="添加消息" :visible.sync="dialogFormVisible">
          <el-form>
            <el-form-item label="消息标题" :label-width="formLabelWidth">
              <el-input v-model="inform.title" auto-complete="off" clearable @focus="focus($event)"></el-input>
            </el-form-item>
            <el-form-item class="style">
              <div class="style-title">上传图片</div>
              <el-upload class="upload-demo" drag action="" :show-file-list="false" :before-upload="beforeAvatarUpload" >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
            </el-form-item>
            <el-form-item label="消息内容" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="inform.content" @focus="focus($event)"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addInform()">添加</el-button>
          </div>
        </el-dialog>

        <!-- 弹出框：编辑 -->
        <el-dialog title="编辑消息" :visible.sync="dialogFormVisible2" v-if="dataset[currentIndex]">
          <el-form>
            <el-form-item label="消息标题" :label-width="formLabelWidth">
              <el-input v-model="dataset[currentIndex].title" auto-complete="off" clearable @focus="focus($event)"></el-input>
            </el-form-item>
            <div class="img-box">
              <h2 style="display:inline-block;" >消息图片</h2>
              <el-upload style="display:inline-block;margin-left:10px;" class="upload-demo" action="" :show-file-list="false" :before-upload="editUpload">
                <el-button  size="small" type="primary">点击更换图片</el-button>
              </el-upload>
              <el-button style="display:inline-block;margin-left:10px;" class="delBg" type="danger" icon="el-icon-delete" round size="mini" @click="delBg()"></el-button>
              <img v-if="dataset[currentIndex].imgUrl" :src="dataset[currentIndex].imgUrl">
            </div>
            <el-form-item label="消息内容" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="dataset[currentIndex].content" @focus="focus($event)"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleClick()">编辑</el-button>
          </div>
        </el-dialog>

        <el-table :data="dataset" highlight-current-row border @selection-change="handleSelectionChange" style="width: 100%">
          <el-table-column type="selection" width="30"></el-table-column>
          <el-table-column prop="title" label="消息" width="250"></el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="previewInform(scope.$index,dataset)"
                type="text"
                size="small">
                预览
              </el-button>
              <el-button
                @click.native.prevent="editRow(scope.$index,dataset)"
                type="text"
                size="small">
                编辑
              </el-button>
              <el-button
                @click.native.prevent="delRow(scope.$index,dataset)"
                type="text"
                size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="save">
          <el-button :plain="true">预览</el-button>
          <el-button :plain="true" type="success" @click="saving">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as Service from '@/common/service/edit/index.js';
  import tabs from '@/modules/appHome/components/tabs/tabs.vue';
  import {insertInform,saveJson,getInform,editInform,getUploadImgSrc} from '@/common/service/edit/index.js';
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        currentView:'',
        popupObj: this.$store.state.edit.popupObj,
        informConfig: {
          "type": "b_notice",
          "link_value": "",
        },
        inform: {
          "title": "",
          "content": "",
          "columnId": 1,
          "imgUrl": null,
        },
        params: {
          "columnId": 1,
          "nowPage": 1,
          "pageSize": 1000
        },
        dataset: [],
        activeDataset: [],
        totalRecord: null,
        idx: null,
        currentIndex: null,//消息列表索引

        dialogFormVisible: false,
        dialogFormVisible2: false,
        formLabelWidth: '120px',
      }

    },
    computed: {
      //v-model + vuex 解决方案
      title: {
        get(){
          return this.$store.state.edit.inform[this.currentIndex].title;
        },
        set(value){
          this.$store.commit('updateTitle',{title: value, index: this.currentIndex});
        }
      },
      content: {
        get(){
          return this.$store.state.edit.inform[this.currentIndex].content;
        },
        set(value){
          this.$store.commit('updateContent',{content: value,index: this.currentIndex});
        }
      }
    },
    watch: {
      informConfig:{
        handler: function(){
          this.$store.commit('informLinkVal',{informLinkVal: this.informConfig.link_value});
        },
        deep: true,
      },
    },
    methods: {
      initInform(){
        Service.getInformList(this.params).then((res) => { 
          console.log(res)
          this.dataset = [...res.data];
          console.log(this.dataset);
        }).catch((res) => {
          this.$message.error(res.message);
        })

        this.activeDataset = [...this.$store.state.edit.inform];
      },
      handleSelectionChange(val,idx) {
        this.activeDataset = [];
        this.activeDataset= [...val];

        // let informBox = document.querySelectorAll('.inform-box');
        // console.log(informBox);
      },
      previewInform(){},
      delRow(idx){
        let params = {
          id: this.dataset[idx].id,
          columnId: this.inform.columnId,
        }
        Service.delInform(params).then((res) => { 
          this.dataset.splice(idx,1);
          this.tips('success','删除成功!')
        }).catch((res) => {
          // this.$message.error(res.message);
        })

        // this.$confirm('是否删除?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {

        //   let params = {
        //     id: this.dataset[idx].id,
        //     columnId: this.inform.columnId,
        //   }
        //   Service.delInform(params).then((res) => { 
        //     this.dataset.splice(idx,1);
        //     this.tips('success','删除成功!')
        //   }).catch((res) => {
        //     // this.$message.error(res.message);
        //   })
          
        // }).catch(() => {
        //   this.tips('info','已取消删除')        
        // });
      },
      editRow(idx){
        this.currentIndex = idx;
        this.dialogFormVisible2 = !this.dialogFormVisible2;
      },
      handleClick(){
        let params = this.objCopy(this.dataset[this.currentIndex]);
        params.columnId = this.inform.columnId;
        console.log(params)

        editInform(params).then((res)=>{
          this.dialogFormVisible2 = !this.dialogFormVisible2;
          this.tips("success","保存成功");
        }).catch((res)=>{
          this.$message.error(res.message);
        })
      },
      addInform(){
        if(this.informConfig.title=="" && this.informConfig.content==""){
          this.tips('error','输入不能为空');
          this.dialogFormVisible = false;
          return false;
        }
        insertInform(this.inform).then((res)=>{
          console.log(res);
          let tempObj = {
            id: res,
            title: this.inform.title,
            content: this.inform.content,
            columnId: this.inform.columnId,
          }
          this.dataset.push(tempObj);
          // this.dialogFormVisible = !this.dialogFormVisible;
          this.tips("success","添加成功");
          
        }).catch((res)=>{
          this.$message.error(res.message);
        })
      },
      focus(event) {
        event.currentTarget.select();
      },
      isRegFn1(){
        let isReg = this.activeDataset.length !=0 ? true : false;
        console.log(isReg)
        return isReg
      },
      isRegFn2(){
        let isReg = true ;
        for(let i=0;i<this.activeDataset.length;i++){
          if(this.activeDataset[i].imgUrl===""){
            isReg = false;
            break;
          }
        }
        return isReg;
      },
      saving(){
        let isReg1 = this.isRegFn1();
        let isReg2 = this.isRegFn2();

        let message = '保存成功'
        let message1 = `至少选择一个消息`;
        let message2 = `消息图片不能为空`;

        if(!isReg1){
          message = message1;
        }else if(!isReg2){
          message = message2;
        }else{
          this.informConfig.link_value = this.getArrByKey('id',this.activeDataset).join(',')
  
          this.$store.commit('allParams',{data: this.informConfig});
          console.log(this.informConfig.link_value)
            
          let params = {
            // id: this.$store.state.edit.allParams.id,
            // contentId: this.$store.state.edit.allParams.contentId,
            data: "",
          }
          params.data =  JSON.stringify(this.$store.state.edit.allParams.data);
          console.log(params);
          
          saveJson(params).then((res)=>{
            this.tips('success','保存成功');
          }).catch((res)=>{
            this.$message.error(res.message);
          }) 
        }
        this.tips('error',message);
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
          // this.seizeConfig.image_url = res;
          this.inform.imgUrl = res;
          console.log(this.inform);
				}).catch((res)=>{
					this.$message.error(res.message);
				})
				
				return false;
      },
      editUpload(file,e) {
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
          this.dataset[this.currentIndex].imgUrl = res;
          console.log(this.dataset[this.currentIndex]);
				}).catch((res)=>{
					this.$message.error(res.message);
				})
				
				return false;
      },
      delBg(){
        this.$confirm('是否删除背景图?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dataset[this.currentIndex].imgUrl = "";

          this.tips('success','删除成功!');
        }).catch(() => {
          this.tips('info','已取消删除!');
        });
      },
    },
    components:{
      tabs
    },
    mounted() {
      this.currentView = location.hash.slice(10);
      this.informConfig.link_value = this.$store.state.edit.informLinkVal;
      this.initInform();
    },
    updated() {
    }
 }

</script>
<style lang="scss" scoped>

</style>
