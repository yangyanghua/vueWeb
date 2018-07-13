<template>
<main-wrapper>
  <div slot="header">
    品牌审核管理
  </div>
  <div slot="main">
    <!--筛选查询 -->
      <div class="com-block-bg">
        <h2 class="s_h2"><i></i>筛选查询</h2>
        <el-form :inline="true" :model="preSearchForm" class="demo-form-inline">   
          <el-form-item label="品牌">
            <el-input size="medium" class="input_150" v-model="preSearchForm.loginName" placeholder="请输入品牌名"></el-input>
          </el-form-item>
          <el-form-item label="店铺"> 
            <el-input size="medium" class="input_150" v-model="preSearchForm.storeName" placeholder="请输入店铺"></el-input>
          </el-form-item>
           <!-- <el-form-item label="状态">
        <el-select size="medium" v-model="preSearchForm.status" placeholder="全部">
          <el-option label="待审核" value="0"></el-option>
          <el-option label="已审核" value="1"></el-option>
          <el-option label="审核失败" value="3"></el-option>
        </el-select>
      </el-form-item> -->
          <el-form-item>
            <el-button type="primary" size="medium"  icon="el-icon-search" @click="onSubmit">搜索</el-button>
            <el-button size="medium"  icon="el-icon-refresh" @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>    
      <div class="com-block-bg management">
       
          <div class="brandTab">
            <el-tabs v-model="couponName" @tab-click="handlemenu">
              <el-tab-pane label="审核品牌" name="0">
                <div class="title">
              <h2 class="s_h2">
                <i></i>数据列表
              </h2>

              <el-dropdown size="medium" placement="bottom" @command="exportData" class="optBtn2">
                    <el-button class="operation-btn" size="medium">导出数据
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="{type:'allData'}">全部数据</el-dropdown-item>
                      <el-dropdown-item :command="{type:'hookData'}">已勾选数据</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
           </div>
          <table class="table-strip-ls" style="border-top:none;">
            <thead>
              <tr>
                <td class="table_w90">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="multiOperationAll" @change="selectAll">
                  </el-checkbox>
                </td>
                <td class="table_w90">品牌LOGO</td>
                <td >品牌名称</td>
                <td>品牌别名</td>
                <td>申请店铺</td>
                <!-- <td class="table_w90">授权文件</td> -->
                <td class="table_w90">类型</td>
                <!-- <td class="table_w90">授权时间</td> -->
                <td class="table_w90">申请时间</td>
                <td class="table_w90">状态 </td>
                <td class="table_w90">操作 </td>

              </tr>
            </thead>
            <tbody>
              <tr v-for="(brandList,index) in dataList" >
                <td>
                  <el-checkbox v-model="multiGoodsStatus[index]"></el-checkbox>
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
                  {{brandList.storeName}}
                </td>
                <!-- <td>
                  <div class="logo" v-bind:style="{backgroundImage: 'url(' + brandList.empowerUrl + ')'}"></div>
                </td> -->
                 <td>
                  <span v-if="brandList.createType==0">平台建</span> 
                  <span v-if="brandList.createType==1">商家自建</span> 
                </td>
                <!-- <td>
                  {{brandList.empowerTime}}
                </td> -->
                 <td>
                  {{brandList.applyTime}}
                </td>
                <td>
                   <span v-if="brandList.status==0">待审核</span> 
                   <span v-if="brandList.status==1">已审核</span> 
                   <span v-if="brandList.status==3">审核失败</span> 
                </td>
                <td>
                   <i class="btn_sh" @click="examineVerify(brandList.merchantBrandId)"> 审核 </i> 
                  
                </td>
              </tr>
              <tr v-if="dataList.length===0">
            <td colspan="5" class="com-nodata">暂无数据</td>
          </tr>
            </tbody>
          </table>
          <div class="pagination" v-if="dataList.length!==0">
                <div class="brand_btn">
                   <el-checkbox :indeterminate="isIndeterminate" v-model="multiOperationAll" @change="selectAll">全选
                    </el-checkbox>
                  <el-dropdown size="medium" placement="bottom" @command="handleCommand" class="optBtn">
                    <el-button class="operation-btn" size="medium">批量操作
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="{type:'examine'}">批量审核</el-dropdown-item>
                      <el-dropdown-item :command="{type:'adopt'}">批量拒绝</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalRecord">
                </el-pagination>
          </div>
              </el-tab-pane>
              <el-tab-pane label="审核日志" name="1">
                <div class="title">
              <h2 class="s_h2">
                <i></i>数据列表
              </h2>
              <el-dropdown size="medium" placement="bottom" @command="journalExportData" class="optBtn2">
                    <el-button class="operation-btn" size="medium">导出数据
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="{type:'allData'}">全部数据</el-dropdown-item>
                      <el-dropdown-item :command="{type:'hookData'}">已勾选数据</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
           </div>
          <table class="table-strip-ls" style="border-top:none">
            <thead>
              <tr>
                <td class="table_w90">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="multiOperationAll" @change="selectAll">
                  </el-checkbox>
                </td>
                <td class="table_w90">品牌LOGO</td>
                <td >品牌名称</td>
                <td>申请店铺</td>
                <td class="table_w90">类型</td>
                <td class="table_w90">提交时间</td>
                <td class="table_w90">审核时间</td>
                <td class="table_w90">审核人</td>
                <td class="table_w90">审核结果 </td>
                <td >备注 </td>

              </tr>
            </thead>
            <tbody>
              <tr v-for="(brandList,index) in dataList">
                <td>
                  <el-checkbox v-model="multiGoodsStatus[index]"></el-checkbox>
                </td> 
                 <td>
                 <div class="logo" v-bind:style="{backgroundImage: 'url(' + brandList.logo + ')'}"></div>
                </td> 
                <td>
                  {{brandList.brandName}}
                </td>
               <!--  <td>
                  {{brandList.otherName}}
                </td> -->
                <td>
                  {{brandList.storeName}}
                </td>
                
                 <td>
                  <span v-if="brandList.createType==0">平台建</span> 
                  <span v-if="brandList.createType==1">商家自建</span> 
                </td>
                <td>
                  {{brandList.applyTime}}
                </td>
                 <td>
                  {{brandList.auditTime}}
                </td>
                 <td>
                   {{brandList.auditName}}
                </td>
                <td>
                   <span v-if="brandList.status==0">待审核</span> 
                   <span v-if="brandList.status==1">已审核</span> 
                   <span v-if="brandList.status==3">审核失败</span>
                </td>

                <td>
                   {{brandList.remark}}
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
              </el-tab-pane>
          </el-tabs>    
          </div>
          <!--品牌审核-->
        <el-dialog title="品牌审核" :visible.sync="brandAudit" width="500px">
          <el-form >
            <el-form-item label="审核：" label-width="100px" required>
                <el-radio v-model="checkResult" label="0">通过</el-radio>
                <el-radio v-model="checkResult" label="1">不通过</el-radio>
            </el-form-item>
            <el-form-item label="拒绝理由：" v-show="checkResult==1" label-width="100px" required>
              <el-input  type="textarea"
                :rows="3"
                placeholder="请输入内容"
                 v-model="unPassReason"> 

              </el-input>
                  <div class="el-form-item__error" v-show="errorReason">{{errorReason}}</div>
              
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="brandAudit = false">取 消</el-button>
            <el-button type="primary" @click="submitCheckResult">提 交</el-button>
          </div>
        </el-dialog>
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
        //品牌审核 弹窗
        brandAudit:false,
        checkResult: '',//审核0通过 1不通过
        unPassReason: '',//拒绝理由
        errorReason: '',
        currentSelectedCode: '',//当前选中状态
        status:'0',//状态
        /*列表全选*/
        multiOperationAll: false,
        multiGoodsStatus: getMultiStatus(10),
        isIndeterminate: false,

        preSearchForm:{
          loginName:'',
          storeName:''
        },
        couponName:'0',//切换

        dataList:[
          { 
            logo:'http://img01.iflashbuy.com/img/M00/02/95/CgoKGVRIyWOABqA8AAIXLoi1HCo117_300x300.jpg',
            name:'name',
            otherName:'otherName',
            shop:'shop',
            empowerUrl:'http://img01.iflashbuy.com/img/M00/02/95/CgoKGVRIyWOABqA8AAIXLoi1HCo117_300x300.jpg',
            type:'平台品牌',
            authorization:'1年',
            apply:'1',
            status:'待审核'
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
        //console.log('全选： ', val);
        this.multiGoodsStatus = getMultiStatus(this.dataList.length, val);
      },
      //批量操作
      orBatchExport(type) {
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
        this.brandAudit = true;
        if(type === 'on') {
           this.checkResult = '0'
           
        } else if(type === 'off') {
          this.checkResult = '1'
        } 
        this.currentSelectedCode = codes.join(',');
      },
      //批量操作方法
      handleCommand(command) {
        if (command.type === 'examine') {
          this.orBatchExport('on');
        } else if (command.type === 'adopt') {
          this.orBatchExport('off');
        }
      },
      //审核品牌导出数据
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
        console.log(httpService+ '/'+Service.exportBrandAduit()+'?brandMerchantIds='+currentSelectedCode)
        window.location.href = httpService+ '/'+Service.exportBrandAduit()+'?brandMerchantIds='+currentSelectedCode;
      },
      //审核品牌导出数据方法
      exportData(command) {
        if (command.type === 'hookData') {
          this.methodData('hook');
        } else if (command.type === 'allData') {
          this.methodData('all');
        }
      },
      //审核日志导出数据
     journalData(type) {
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
        console.log(httpService+ '/'+Service.exportBrandAduitLog()+'?brandMerchantIds='+currentSelectedCode)
        window.location.href = httpService+ '/'+Service.exportBrandAduitLog()+'?brandMerchantIds='+currentSelectedCode;
      },
      //审核日志导出数据方法
      journalExportData(command) {
        if (command.type === 'hookData') {
          this.journalData('hook');
        } else if (command.type === 'allData') {
          this.journalData('all');
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
            storeName:''
        },
        this.preSearchForm = {
            loginName:'',
            storeName:''
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
      //品牌审核 弹窗
      examineVerify(code){
        this.checkResult = '';
        this.unPassReason = '';
        this.errorReason = '';
        this.brandAudit = true;
       this.currentSelectedCode = code;
      },

      submitCheckResult(){
        console.log('用户审核结果 ', this.checkResult);
          if(this.checkResult==1){
            if(!this.unPassReason){
              this.errorReason = '请输入拒绝理由';
            } else if(this.unPassReason.length>256){
              this.errorReason = '长度不能超过256个字符';
            } else {
              this.errorReason = '';
            }
          }
          if(this.errorReason){
            return;
          } 
        let params = {
          merchantBrandId: this.currentSelectedCode,
          status: this.checkResult,
          remark: this.unPassReason,
        };
        Service.brandAudit(params).then(res=>{
          this.brandAudit = false;
            this.$message({
                  type:'success',
                  message:'审核成功！'
              });

          this.getList();
          this.multiGoodsStatus= getMultiStatus(this.pageSize);//重置选框为空
        }).catch(res=>{
          this.$message.error(res.message);
        });
        
      },
      /*编辑*/
      editDetail(bannerId){
        this.$router.push({
          path:'/management/detail',
          query:{
            id:bannerId
          }
        })
      },
      //tab切换
      handlemenu(status) {
        this.getList();
      },
      
       //列表数据
      getList(){
        let params = {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          brandName:this.preSearchForm.loginName,
          storeName:this.preSearchForm.storeName,
          status: this.couponName==0?'0':this.couponName,
        };
        Service.brandListBrandEmpower(params).then(res => {
          console.log('get list ',res);
          this.dataList = res.data;
          this.pageSize = res.pageSize;
          this.totalRecord = res.totalRecord;
        }).catch(res => {
            this.$message.error(res.message);
        })
      }

    },
    mounted(){
      this.getList();
    }
  }
</script>

<style lang="scss" scoped>
  .management{
    margin-top: 20px;
    padding:0 20px;
    .title{
      position: relative;
        .btn_fr{
          position: absolute;
          top:10px;
          left:0px;
        }
    }
    .logo{
      width:80px;
      height:80px;
      background-size:cover;

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
  .optBtn{
    width:120px;
    margin-left: 20px;
  }
   .optBtn2{
    width:120px;
    position: absolute;
    top:5px;
    right:10px;
  }
  .btn_sh{
    color:$color-primary;
    cursor: pointer;
  }
  .el-dropdown-menu__item{
    width:120px;
  }
</style>