<template>
<main-wrapper>
  <div slot="header">
    APP启动广告
  </div>
  <div slot="main">
      <div class="com-block-bg management">
          <div class="title">
            <el-button type="primary" size="medium" @click="addNewEntry()">新建APP广告</el-button>
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
              <td class="table_w90">广告图片</td>
              <td >名称</td>
              <td class="table_w90">播放时间</td>
              <td>APP</td>
              <td class="table_w160">有效期</td>
              <td class="table_w90">状态</td>
              <td class="table_w160">创建于</td>
              <td class="table_w160">操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(adList,index) in dataList" :key="adList.id">
              <td>
                <el-checkbox v-model="multiGoodsStatus[index]"></el-checkbox>
              </td> 
               <td>
               <div class="logo" v-bind:style="{backgroundImage: 'url(' + adList.imgUrl + ')'}"></div>
              </td> 
              <td>
                {{adList.name}}
              </td>
              <td>
                {{adList.playTime+'s'}}
              </td>
              <td>
                {{adList.appName}}
              </td>
              <td>
                <p>{{adList.onLineStart}}</p> 
                {{adList.onLineEnd}}
              </td>
              <td>
                <i v-if="adList.status==0">未上线</i>
                <i v-if="adList.status==1">上线</i>
                <i v-if="adList.status==2">下线</i>
                <i v-if="adList.status==3">失效</i>
              </td>
              <td>
                <p>{{adList.createBy}}</p>
                {{adList.createTime}}
              </td>
              <td>
                 <i class="i_edit" @click="editDetail(adList.id)"><img src="/static/images/edit.png" alt="修改" title="修改"></i> 
                 <i class="i_delete" @click="deleteEntry(adList.id)"><img src="/static/images/delete.png" alt="删除" title="删除"></i> 
                 <i v-if="adList.status==0" class="i_edit" @click="onlineDetail(adList.id)"><img src="/static/images/online.png" alt="上线" title="上线"></i> 
                 <i v-if="adList.status==1" class="i_edit" @click="offlineDetail(adList.id)"><img src="/static/images/offline.png" alt="下线" title="下线"></i> 
                 <i v-if="adList.status==2" class="i_edit" @click="onlineDetail(adList.id)"><img src="/static/images/online.png" alt="上线" title="上线"></i> 
              </td>
            </tr>
            <tr v-if="dataList.length===0">
          <td colspan="9" class="com-nodata">暂无数据</td>
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
          loginName:'',
          operating:''
        },
        preSearchForm:{
          loginName:'',
          operating:''
        },

        dataList:[
          { 
            imgUrl:'http://img01.iflashbuy.com/img/M00/02/95/CgoKGVRIyWOABqA8AAIXLoi1HCo117_300x300.jpg',
            name:'name',
            playTime:'1s',
            appName:'appName',
            onLineStart:'2018-03-01',
            onLineEnd:'2018-12-10',
            status:'1',
            createBy:'超级管理员',
            createTime:'2018-03-29 16:45:06',
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
            this.$message('请选择记录');
            return;
          }
          currentSelectedCode = codes.join(',');
          this.multiGoodsStatus= getMultiStatus(this.pageSize);//重置选框为空
        }
        console.log(httpService+ '/'+Service.appStartAdExport()+'?ids='+currentSelectedCode)
        window.location.href = httpService+Service.appStartAdExport()+'?ids='+currentSelectedCode;
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
            operating:''
        },
        this.preSearchForm = {
            loginName:'',
            operating:''
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
          path:'/system/appAdvertisement/detail',
          query:{
            id:bannerId
          }
        })
      },
       /*上线*/
      onlineDetail(bannerId){
        this.$confirm('确定上线吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Service.appStartAdUp({id:bannerId}).then(res => {
            this.$message({
              type: 'success',
              message: '上线成功!'
            });
            this.getList();
          }).catch(res => {
            this.$message.error(res.message);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消上线'
          });
        });
      },
       /*下线*/
      offlineDetail(bannerId){
         this.$confirm('确定下线吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
              id : bannerId
          };
          console.log('id',bannerId);
          Service.appStartAdDown(params).then(res => {
            this.$message({
              type: 'success',
              message: '下线成功!'
            });
            this.getList();
          }).catch(res => {
            this.$message.error(res.message);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下线'
          });
        });
      },
       // /*删除*/
      deleteEntry(_id) {
        this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
              id : _id
          };
          console.log('id',_id);
          Service.appStartAdDelete(params).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          }).catch(res => {
            this.$message.error(res.message);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }, 
      /*新增*/
      addNewEntry(){
        this.$router.push({
          path:'/system/appAdvertisement/detail'
        })
      },
      
       //列表数据
      getList(){
        let params = {
          pageSize: this.pageSize,
          nowPage: this.currentPage
        };
        Service.appStartAdListPage(params).then(res => {
          console.log('get list ',res);
          this.dataList = res.data;
          this.totalPage = res.totalPage;
          this.currentPage = res.currentPage;
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
  	padding: 20px;
    position: relative;
    .title{
      padding-bottom: 10px;
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