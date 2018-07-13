<template>
<main-wrapper>
  <div slot="header">
    版本管理
  </div>
  <div slot="main">
    <!--筛选查询 -->
      <div class="com-block-bg">
        <h2 class="s_h2"><i></i>筛选查询</h2>
        <el-form :inline="true" :model="preSearchForm" class="demo-form-inline">   
          <el-form-item label="APP名称">
            <el-input size="medium" class="input_150" v-model="preSearchForm.name" placeholder="请输入品牌名"></el-input>
          </el-form-item>
           <el-form-item label="操作系统平台">
        <el-select size="medium" v-model="preSearchForm.system" placeholder="请选择操作系统平台">
          <el-option label="全部" value="0"></el-option>
          <el-option label="android" value="2"></el-option>
          <el-option label="iOS" value="1"></el-option>
        </el-select>
      </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium"  icon="el-icon-search" @click="onSubmit">搜索</el-button>
            <el-button size="medium"  icon="el-icon-refresh" @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>    
      <div class="com-block-bg management">
          <div class="title">
            <el-button type="primary" size="medium" @click="addNewEntry()">创建发布版本</el-button>
          </div>
          
           <el-dropdown size="medium" placement="bottom" @command="exportData" class="optBtn">
              <el-button class="operation-btn" size="medium">导出数据
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{type:'allData'}">全部数据</el-dropdown-item>
                <el-dropdown-item :command="{type:'hookData'}">已勾选数据</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        <table class="table-strip-ls">
          <thead>
            <tr>
              <td width="60">
                <el-checkbox :indeterminate="isIndeterminate" v-model="multiOperationAll" @change="selectAll">
                </el-checkbox>
              </td>
              <td class="table_w90">APP名称</td>
              <td class="table_w90">应用ID</td>
              <td class="table_w90">平台</td>
              <td class="table_w90">版本序号</td>
              <td class="table_w90">升级方式</td>
              <td class="table_w160">升级文案</td>
              <td >升级地址</td>
              <td class="table_w90">备注</td>
              <td class="table_w90">发布于</td>
              <td class="table_w90">状态</td>
              <td class="table_w90">操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(versionList,index) in dataList" :key="versionList.id">
              <td>
                <el-checkbox v-model="multiGoodsStatus[index]"></el-checkbox>
              </td> 
               <td>
                  {{versionList.name}}
              </td> 
              <td>
                {{versionList.applyId}}
              </td>
              <td>
                <i v-if="versionList.system==1">ios</i>
                <i v-if="versionList.system==2">android</i>
              </td>
              <td>
                {{versionList.versionSq}}
              </td>
              <td>
                <i v-if="versionList.upWay==1">强制升级</i>
                <i v-if="versionList.upWay==2">不强制升级</i>
              </td>
              <td>
                {{versionList.upCopy}}
              </td>
              <td>
                {{versionList.upUrl}}
              </td>
              <td>
                {{versionList.remark}}
              </td>
              <td>
                {{versionList.releaseTime}}
              </td>
              <td>
                <i v-if="versionList.status==0">已创建</i>
                <i v-if="versionList.status==1">已发布</i>
              </td>
              <td>
                 <i class="i_edit" @click="editDetail(versionList.id)"><img src="/static/images/edit.png" alt="修改" title="修改"></i> 
                 <i class="i_delete" v-if="versionList.status==0" @click="versionPublish(versionList.id)"><img src="/static/images/edition.png" alt="发布" title="发布"></i> 
              </td>
            </tr>
            <tr v-if="dataList.length===0">
          <td colspan="7" class="com-nodata">暂无数据</td>
        </tr>
          </tbody>
        </table>
      <div class="pagination" v-if="dataList.length!==0">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalRecord">
            </el-pagination>
          </div>

      </div>
  </div>
</main-wrapper>
</template>

<script>
import * as Service from '@/common/service/system/index.js';
import {httpService} from '@/common/http/http.js';
   /*列表全选*/
  const getMultiStatus = (num, setVal = false) => {
    return new Array(num).fill(setVal);
  };
  export default {
    data() {
      return {
        /*列表全选*/
        multiOperationAll: false,
        multiGoodsStatus: getMultiStatus(10),
        isIndeterminate: false,

        searchForm: {
          name:'',
          system:''
        },
        preSearchForm:{
          name:'',
          system:''
        },

        dataList:[
          { 
            logo:'http://img01.iflashbuy.com/img/M00/02/95/CgoKGVRIyWOABqA8AAIXLoi1HCo117_300x300.jpg',
            applyId:'name',
            name:'alias',
            system:'applicationid',
            versionSq:'explain',
            upWay:'upWay',
            upCopy:'upCopy',
            upUrl:'upUrl',
            remark:'remark',
            releaseTime:'releaseTime',
            status:'status',
          }
        ],
        currentPage:1,
        pageSize:10,
        totalRecord:0
      }
    },
    /*列表全选*/
    watch: {
      multiGoodsStatus: function (val) {
        if (val.every(x => x === true)) {
          this.multiOperationAll = true;
          this.isIndeterminate = false;
        } else if (val.every(x => x === false)) {
          this.multiOperationAll = false;
          this.isIndeterminate = false;
        } else {
          this.isIndeterminate = true;
          this.multiOperationAll = false;
        }
      }
    },
    methods: {
      /*列表全选*/
      selectAll(val) {
        console.log('全选： ', val);
        this.multiGoodsStatus = getMultiStatus(this.dataList.length, val);
      },
      //导出数据
     methodData(type) {
       let currentSelectedCode;
        //导出全部数据
        if(type === 'all') {
          currentSelectedCode ='';
        } else if(type === 'hook') {
          let codes = [];
          console.log('select code ', this.multiGoodsStatus,codes);  //打印自行前的codes
          this.multiGoodsStatus.forEach((x,index)=>{
              if(x){
                codes.push(this.dataList[index].id);
              }
            });
          console.log('select code ', this.multiGoodsStatus,codes);//打印自行后的codes
          if (codes.length === 0) {
            this.$message('请选择品牌');
            return;
          }
          currentSelectedCode = codes.join(',');
          this.multiGoodsStatus= getMultiStatus(this.pageSize);//重置选框为空
        }
        console.log(httpService+ '/'+Service.appVersionExport()+'?ids='+currentSelectedCode)
        window.location.href = httpService+Service.appVersionExport()+'?ids='+currentSelectedCode;
      },
      //导出数据方法
      exportData(command) {
        if (command.type === 'hookData') {
          this.methodData('hook');
        } else if (command.type === 'allData') {
          this.methodData('all');
        }
      },
     /*搜索 */
      onSubmit(){
        this.currentPage =1;
        this.searchForm = Object.assign({},this.preSearchForm);  
        this.getList();
      },
       /*重置*/
      onReset(){
        this.currentPage =1;
        this.searchForm = {
            name:'',
            system:''
        },
        this.preSearchForm = {
            name:'',
            system:''
        }
        this.getList();
      },
      handleSizeChange(val){
        console.log(`每页 ${val} 条`);
        this.currentPage = 1;
        this.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val){
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getList();
      },
       /*编辑*/
      editDetail(bannerId){
        this.$router.push({
          path:'/system/versionManagement/detail',
          query:{
            id:bannerId
          }
        })
      },
      /*新增*/
      addNewEntry(){
        this.$router.push({
          path:'/system/versionManagement/detail'
        })
      },
      /*发布*/
      versionPublish(_id) {
        this.$confirm('确定发布吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('id',_id);
          Service.appVersionPublish({id:_id}).then(res => {
            this.$message({
              type: 'success',
              message: '发布成功!'
            });
            this.getList();
          }).catch(res => {
            this.$message.error(res.message);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          });
        });
      },
      //列表数据
      getList(){
        let params = {
          pageSize: this.pageSize,
          page: this.currentPage,
          system: this.preSearchForm.system || 0,
          nameOrApplyId: this.preSearchForm.name
        };
        Service.appVersionListPage(params).then(res => {
          console.log('get list ',res);
           this.dataList = res.data;
           this.pageSize = res.pageSize;
           this.totalRecord = res.totalRecord;
        }).catch(res => {
            this.$message.error(res.message);
        })
      },
      

    },
    mounted(){
      this.getList();
    }
  }
</script>

<style lang="scss" scoped>
  .management{
    margin-top: 20px;
    position: relative;
    .title{
      padding:10px 20px;
    }
    .logo{
      width:80px;
      height:80px;
      background-size:cover;

    }
    .optBtn{
      width:120px;
      position: absolute;
      top:10px;
      right:10px;
    }
  }
  .pagination{
    position: relative;
    .brand_btn{
      position: absolute;
      top:20px;
      left:0;
    }
  }
</style>