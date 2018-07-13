<template>
  <div class="inform">
    <div class="edit-box">
      <div class="edit-preview">
        <div class="inform-box" v-for="(item,index) in informs" :key="index">
          <el-button type="text" disabled>消息标题{{index+1}}：{{item.title}}</el-button>
          <h2>消息内容{{index+1}}：{{item.content}}</h2>
        </div>
        <!-- <img v-if="seizeConfig.image_url" :src="seizeConfig.image_url" class="avatar"> -->
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
              <el-input v-model="informConfig.title" auto-complete="off" clearable @focus="focus($event)"></el-input>
            </el-form-item>
            <el-form-item label="消息内容" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="informConfig.content" @focus="focus($event)"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addInform()">添加</el-button>
          </div>
        </el-dialog>
        <!-- 弹出框：编辑 -->
        <el-dialog title="编辑消息" :visible.sync="dialogFormVisible2" v-if="informs[currentIndex]">
          <el-form>
            <el-form-item label="消息标题" :label-width="formLabelWidth">
              <el-input v-model="title" auto-complete="off" clearable @focus="focus($event)"></el-input>
            </el-form-item>
            <el-form-item label="消息内容" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="content" @focus="focus($event)"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleClick()">编辑</el-button>
          </div>
        </el-dialog>
        <el-table :data="informs" highlight-current-row border style="width: 100%">
          <el-table-column prop="title" label="消息" width="250"></el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="previewInform(scope.$index,informs)"
                type="text"
                size="small">
                预览
              </el-button>
              <el-button
                @click.native.prevent="editRow(scope.$index,informs)"
                type="text"
                size="small">
                编辑
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
  import * as Service from '@/common/service/index/index.js';
  import tabs from '@/modules/edit/components/tabs/tabs.vue';
  import {insertInform,saveJson,getInform,editInform} from '@/common/service/edit/index.js';
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        currentView:'',
        popupObj: this.$store.state.edit.popupObj,
        inform: {
          "type": "b_notice",
          "link_value": "",
        },
        informConfig: {
          "title": "",
          "content": "",
          "columnId": 1,
        },
        informs: [],
        currentIndex: 0,

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
      informs:{
        handler: function(){
          this.$store.commit('inform',{inform: this.informs});
        },
        deep: true,
      }
    },
    methods: {
      
      previewInform(){},
      editRow(index){
        this.currentIndex = index;
        this.dialogFormVisible2 = !this.dialogFormVisible2;
      },
      handleClick(){
        let params = this.objCopy(this.informs[this.currentIndex]);
        params.columnId = this.$store.state.edit.allParams.contentId;
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
          return;
        }
        insertInform(this.informConfig).then((res)=>{
          let tempObj = {
            id: res,
            title: this.informConfig.title,
            content: this.informConfig.content,
            columnId: this.informConfig.columnId,
          }
          this.informs.splice(this.informs.length,1,tempObj);

          console.log(this.informs);
          this.dialogFormVisible = !this.dialogFormVisible;
          this.tips("success","保存成功");
          
        }).catch((res)=>{
          this.$message.error(res.message);
        })
      },
      focus(event) {
        event.currentTarget.select();
      },
      saving(){
        this.inform.link_value = this.getArrByKey('id',this.informs).join(',');

        this.$store.commit('allParams',{data: this.inform});
          
        let params = {
          id: this.$store.state.edit.allParams.id,
          contentId: this.$store.state.edit.allParams.contentId,
          data: "",
        }
        params.data =  JSON.stringify(this.$store.state.edit.allParams.data);
        
        saveJson(params).then((res)=>{
          console.log(res)
          this.tips('success','保存成功');
        }).catch((res)=>{
          console.log(res)
        }) 
      },
    },
    components:{
      tabs
    },
    mounted() {
      this.currentView = location.hash.slice(7);
      this.informs = [...this.$store.state.edit.inform];
      console.log(this.informs);
      console.log(this.currentView)
    },
    updated() {
    }
 }

</script>
<style lang="scss" scoped>

</style>
