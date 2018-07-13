<template>
<main-wrapper>
  <div slot="header">
    品牌授权详情
  </div>
  <div slot="main">
    <!--筛选查询 -->
      <div class="com-block-bg">
        <h2 class="s_h2"><i></i>筛选查询</h2>
        <el-form :inline="true" :model="preSearchForm" class="demo-form-inline">   
          <el-form-item label="品牌名">
            <el-input size="medium" class="input_150" v-model="preSearchForm.loginName" placeholder="请输入品牌名"></el-input>
          </el-form-item>
          <el-form-item label="店铺名称">
            <el-input size="medium" class="input_150" v-model="preSearchForm.storeName" placeholder="请输入店铺名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium"  icon="el-icon-search" @click="onSubmit">搜索</el-button>
            <el-button size="medium"  icon="el-icon-refresh" @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>    
      <div class="com-block-bg management">
        <h2 class="s_h2">
          <i></i>数据列表
        </h2>
        <el-dropdown size="medium" placement="bottom" @command="exportData" class="optBtn">
          <el-button class="operation-btn" size="medium">导出数据
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="{type:'allData'}">全部数据</el-dropdown-item>
            <el-dropdown-item :command="{type:'hookData'}">已勾选数据</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <table class="table-strip-ls" style="border-top:none;">
          <thead>
            <tr>
              <td class="table_w90">
                <el-checkbox :indeterminate="isIndeterminate" v-model="multiOperationAll" @change="selectAll">
                </el-checkbox>
              </td>
              <td class="table_w90">店铺名称</td>
              <td class="table_w90">品牌LOGO</td>
              <td >品牌名称</td>
              <td>品牌别名</td>
              <td class="table_w90">有效期</td>
              <td class="table_w90">有效期起</td>
              <td class="table_w160">有效期止 </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(brandList,index) in dataList">
              <td>
                <el-checkbox v-model="multiGoodsStatus[index]"></el-checkbox>
              </td>
              <td>
                {{brandList.storeName}}
              </td> 
               <td>
               <div class="logo" v-bind:style="{backgroundImage: 'url(' + brandList.logo + ')'}"></div>
              </td> 
              <td>
                {{brandList.brandName}}
              </td>
              <td>
                {{brandList.otherName}}
              </td>
              <td>
                {{brandList.empowerTime}}
              </td>
              <td>
                 {{brandList.empowerStart&&brandList.empowerStart.split(' ')[0] }} <!--有就是执行后面不然就为空-->
              </td>
              <td>
                 {{brandList.empowerEnd&&brandList.empowerEnd.split(' ')[0] }}
              </td>
            </tr>
            <tr v-if="dataList.length===0">
          <td colspan="5" class="com-nodata">暂无数据</td>
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
import * as Service from '@/common/service/management/index.js';
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
          loginName:'',
          storeName:'',
          status:''
        },
        preSearchForm:{
          loginName:'',
          storeName:'',
          status:''
        },

        dataList:[
          { 
            logo:'http://img01.iflashbuy.com/img/M00/02/95/CgoKGVRIyWOABqA8AAIXLoi1HCo117_300x300.jpg',
            name:'name',
            alias:'alias',
            authorizationDocument:'http://img01.iflashbuy.com/img/M00/02/95/CgoKGVRIyWOABqA8AAIXLoi1HCo117_300x300.jpg',
            state:'state'
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
          this.multiGoodsStatus.forEach((x,index)=>{
              if(x){
                codes.push(this.dataList[index].merchantBrandId);
              }
            });
          if (codes.length === 0) {
            this.$message('请选择品牌');
            return;
          }
          currentSelectedCode = codes.join(',');
          this.multiGoodsStatus= getMultiStatus(this.pageSize);//重置选框为空
        }
        console.log(httpService+ '/'+Service.exportBrandEmpowerDetail()+'?brandMerchantIds='+currentSelectedCode)
        window.location.href = httpService+ '/'+Service.exportBrandEmpowerDetail()+'?brandMerchantIds='+currentSelectedCode;
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
            loginName:'',
            storeName:'',
            status:''
        },
        this.preSearchForm = {
            loginName:'',
            storeName:'',
            status:''
        },
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
       //列表数据
      getList(){
        let params = {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          brandName:this.preSearchForm.loginName,
          storeName:this.preSearchForm.storeName
        };
        Service.brandListBrandEmpower(params).then(res => {
          console.log('get list ',res);
          this.dataList = res.data;
          //this.totalPage = res.totalPage;
         // this.currentPage = res.currentPage;
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
      padding-top: 20px;
    }
    .logo{
      width:80px;
      height:80px;
      background-size:cover;

    }
    .optBtn{
      width:120px;
      position: absolute;
      top:5px;
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