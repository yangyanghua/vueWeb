<template>
<main-wrapper>
  <div slot="header">
    消息标签配置
  </div>
  <div slot="main">
      <div class="com-block-bg management">
          <div class="title">
            <el-button type="primary" size="medium" @click="addNewEntry()">新建消息标签</el-button>
          </div>
        <table class="table-strip-ls">
          <thead>
            <tr>
              <td>key</td>
              <td >说明</td>
              <td class="table_w160">操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="configuraList in dataList" :key="configuraList.id">
              <td>
                {{configuraList.code}}
              </td>
              <td>
                {{configuraList.name}}
              </td>
              <td>
                 <i class="i_edit" @click="editDetail(configuraList)"><img src="/static/images/edit.png" alt="修改" title="修改"></i> 
                 <i class="i_mal i_delete" @click="deleteEntry(configuraList.id)"><img src="/static/images/delete.png" alt="删除" title="删除"></i>
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
      <!--新增-->
        <el-dialog title="消息配置管理" :visible.sync="brandAudit" width="500px">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
             <el-form-item label="key：" prop="code" required>
                 <el-input v-model="ruleForm.code" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="说明：" prop="name" required>
                 <el-input v-model="ruleForm.name" placeholder=""></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="brandAudit = false">取 消</el-button>
            <el-button type="primary" @click="submitStreet('ruleForm')">保存</el-button>
          </div>
        </el-dialog>
      </div>

  </div>
</main-wrapper>
</template>

<script>
import * as Service from '@/common/service/system/index.js';
  export default {
    data() {
      return {
        brandAudit:false,
        dataList:[],
        ruleForm:{
          code:'',
          name:''
        },
        rules: {
          code: [
            { required: true, message: '请输入key', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入内容', trigger: 'blur' },
           
          ],
        },
        currentPage:1,
        pageSize:10,
        totalRecord:0
      }
    },
    
    methods: {
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
          Service.mlabelDelete(params).then(res => {

            this.getList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
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
       /*编辑*/
      editDetail(row){
         this.brandAudit = true;
          this.ruleForm = {
            code:row.code,
            name:row.name,
            id:row.id
          };
      },
      //创建
      addNewEntry(){
          this.brandAudit = true;
          this.ruleForm = {
            code: '',
            name: ''
          };
           this.$refs["ruleForm"].resetFields();
      },
      //修改
      submitStreet(formName){
           //验证通过
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.ruleForm.id){
                console.log('edit info', this.ruleForm.id);
                let params = {
                  code: this.ruleForm.code,
                  name: this.ruleForm.name,
                  id: this.ruleForm.id
                };
                Service.mlabelEdit(params).then((res) => {
                      this.$message({
                          type: 'success',
                          message: '修改成功！'
                      });
                      this.brandAudit = false;

                      this.getList();
                }).catch((res) => {
                  console.log('error ', res);
                  this.$message({
                    type: 'error',
                    message: res.message
                  });  
                })

            }else{
              let params = {
                code:this.ruleForm.code,
                name:this.ruleForm.name
              };
            Service.mlabelAdd(params).then((res) => {
                  this.$message({
                      type: 'success',
                      message: '添加成功！'
                  });
                  this.brandAudit = false;
                  this.getList();   
            }).catch((res) => {
              console.log('error ', res);
              this.$message({
                type: 'error',
                message: res.message
              });  
            })
            }    
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
          p: this.currentPage
        };
        Service.mlabelList(params).then(res => {
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