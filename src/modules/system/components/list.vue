<template>
<main-wrapper>
  <div slot="header">
    App管理
  </div>
  <div slot="main">
      <div class="com-block-bg management">
          <div class="title">
            <el-button type="primary" size="medium" @click="addNewEntry()">创建APP</el-button>
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
              <td class="table_w90">
                <el-checkbox :indeterminate="isIndeterminate" v-model="multiOperationAll" @change="selectAll">
                </el-checkbox>
              </td>
              <td class="table_w90">LOGO</td>
              <td >APP名称</td>
              <td>平台</td>
              <td class="table_w160">APPLICATIONID</td>
              <td >说明</td>
              <td class="table_w90">操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(appList,index) in dataList" :key="appList.id">
              <td>
                <el-checkbox v-model="multiGoodsStatus[index]"></el-checkbox>
              </td> 
               <td>
               <div class="logo" v-bind:style="{backgroundImage: 'url(' + appList.logoPath + ')'}"></div>
              </td> 
              <td>
                {{appList.name}}
              </td>
              <td>
                {{appList.system}}
              </td>
              <td>
                {{appList.applyId}}
              </td>
              <td>
                {{appList.remark}}
              </td>
              <td>
                 <i class="i_edit" @click="editDetail(appList.id)"><img src="/static/images/edit.png" alt="修改" title="修改"></i> 
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
          loginName:''
        },
        preSearchForm:{
          loginName:''
        },

        dataList:[
          { 
            logo:'http://img01.iflashbuy.com/img/M00/02/95/CgoKGVRIyWOABqA8AAIXLoi1HCo117_300x300.jpg',
            name:'name',
            platform:'alias',
            applicationid:'applicationid',
            explain:'explain'
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
        console.log(httpService+ '/'+Service.appManagerExport()+'?ids='+currentSelectedCode)
        window.location.href = httpService+Service.appManagerExport()+'?ids='+currentSelectedCode;
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
            loginName:''
        },
        this.preSearchForm = {
            loginName:''
        }
        this.getList();
      },
      handleSizeChange(val){
        console.log(`每页 ${val} 条`);
        this.currentPage = 1;
        this.pageSize = val;
        //this.getList();
      },
      handleCurrentChange(val){
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getList();

      },

       /*详情*/
      editDetail(bannerId){
        this.$router.push({
          path:'/system/detail',
          query:{
            id:bannerId
          }
        })
      },
      /*编辑*/
      addNewEntry(){
        this.$router.push({
          path:'/system/detail'
        })
      },
      
     //列表数据
      getList(){
        let params = {
          pageSize: this.pageSize,
          page: this.currentPage
        };
        Service.appManagerListPage(params).then(res => {
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