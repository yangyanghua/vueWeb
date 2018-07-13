<template>
<main-wrapper>
  <div slot="header">
    运营权限管理
  </div>
  <div slot="main">
    
      <div class="com-block-bg management">
       
          <div class="title">
            <el-button type="primary" size="medium" @click="addNewEntry()">添加角色</el-button>
          </div>

          <table class="table-strip-ls">
            <thead>
              <tr>
                <td>角色名称</td>
                <td >角色描述</td>
                <td class="table_w160">创建时间</td>
                <td class="table_w160">操作 </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(brandList,index) in dataList" >
                <td>
                  {{brandList.name}}
                </td>
                <td>
                  {{brandList.remark}}
                </td>
                 <td>
                  {{brandList.createTime}}
                </td>
                
                <td>
                  <i class="i_edit" @click="editDetail(brandList.id)"><img src="/static/images/edit.png" alt="修改" title="修改"></i> 
                 <i class="i_delete" @click="deleteEntry(brandList.id)"><img src="/static/images/delete.png" alt="删除" title="删除"></i> 
                  
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
import * as Service from '@/common/service/authorityManagement/index.js';
  export default {
    data() {
      return {
        dataList:[
          { 
            name:'name',
            remark:'remark',
            time:'time',
          }
        ],
        currentPage:1,
        pageSize:10,
        totalRecord:0
      }
    },
    methods: {
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
          path:'/authorityManagement/detail',
          query:{
            id:bannerId
          }
        })
      },
      /*新增*/
      addNewEntry(){
        this.$router.push({
          path:'/authorityManagement/detail'
        })
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
          Service.roleDelete(params).then(res => {
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
       //列表数据
      getList(){
        let params = {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
        };
        Service.roleList(params).then(res => {
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
      padding:20px 0;
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