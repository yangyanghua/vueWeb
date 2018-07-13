<template>
<main-wrapper>
  <div slot="header">
    添加新角色
  </div>
  <div slot="main">
    <div class="com-block-bg">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" style="padding:20px;"> 
            
            <el-form-item label="角色名称：" prop="name" required>
                 <el-input v-model="ruleForm.name" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="角色描述：" prop="remark" required>
                 <el-input v-model="ruleForm.remark" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="角色权限：" prop="ids" required>
                   <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
									  <el-checkbox-group v-model="ruleForm.ids" @change="handleCheckedCitiesChange">
									    <el-checkbox v-for="item in muendata" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
									 </el-checkbox-group>
            </el-form-item>

        
        	<el-form-item>
                <el-button type="primary" size="medium" @click="addForm('ruleForm')">保存</el-button>
                <el-button size="medium" @click="$router.go(-1)">取消</el-button>
            </el-form-item> 
        </el-form>
      </div>
      
  </div>
</main-wrapper>
</template>

<script>
  import * as Service from '@/common/service/authorityManagement/index.js';
  export default {
    data() {
      return {
      	isIndeterminate:false,
      	muendata:[],
      	checkAll:false,
      	allids:[],
        ruleForm: {
          name:'',
          remark:'',
          ids:[],
          id:''
        },

        rules: {
          name: [
            { required: true, message: '请输入角色名称', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '请输入品牌别称', trigger: 'blur' }
          ],
          ids: [
            { type:'array', required: true, message: '请勾选角色权限', trigger: 'blur' }
          ]
        }

      }
    },
    methods: {
      //change 全选 方法
      handleCheckAllChange(val) {  
        // this.ruleForm.ids = val ? this.allids : [];
        // this.isIndeterminate = false;
      },
      //change 单选 方法
      handleCheckedCitiesChange(value) {
        console.log(this.ruleForm.ids);
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.muendata.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.muendata.length;

      }, 	
      //提交方法   
      addForm(formName) {
      //验证方法      
        this.$refs[formName].validate((valid) => {
          if (valid) {
               let vm = this;
               this.ruleForm.id = this.$route.query.id
               let tdis = [];
               this.ruleForm.ids.forEach((item)=>{
                  tdis.push(item);
               })
               console.log('tdis',tdis)
               let opt = Object.assign({},this.ruleForm);
               opt.ids = tdis.join(','); //
               console.log('tdis',opt.ids)
            if(this.$route.query.id){
              //编辑保存 
                
                /*向后端请求数据 （成功）*/          
               Service.roleEdit(opt).then((res) => { /*新增修改接口*/
                  console.log('保存成功',res);
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                      });
                      this.$router.push('/authorityManagement/list');
                    
             })
               /*向后端请求数据 （失败）*/ 
               .catch((res) => {
                  this.$message({
                    type: 'error',
                    message: res.message
                  });
              })   
            }
             //新增保存 
            else{
                /*向后端请求数据 （成功）*/          
               Service.roleAdd(opt).then((res) => { /*新增修改接口*/
                  console.log('保存成功',res);
                    this.$message({
                        type: 'success',
                        message: '新增成功!'
                      });
                      this.$router.push('/authorityManagement/list');
             })
               /*向后端请求数据 （失败）*/ 
               .catch((res) => {
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
      //获取角色权限列表
      _menusList(){
      	Service.menusList().then((res)=>{
          console.log(res)
      		let vm = this;
      		vm.allids=[];
      		res.forEach((item)=>{
      			vm.allids.push(item.id);
      		})		
      		this.muendata = res;
      	}).catch((res)=>{
      		this.$message({
      			type:'error',
      			message:res.message
      		})
      	})
      }
      
    },
    mounted(){
      this._menusList();
      /*回显编辑内容*/
      let vm = this;
      if(this.$route.query.id){
        this.editStatus = true;
        /*从后端拿*/
        Service.roleInfo({  /*查询指定ID接口*/
                id: this.$route.query.id,
             }).then(res =>{
              // console.log('回显',res);
              this.ruleForm = {
                 name: res.name,
                 remark:res.remark,
                 ids:[],
              };
              if(res.menus.length<this.muendata.length){
                  this.isIndeterminate=true;
              }
              let arr = []
              res.menus.forEach((item)=>{
                arr.push(item.id);
              });
              this.ruleForm.ids = arr;  
            
              // console.log('回显ID',this.ruleForm.roleIds);
             }).catch((res) => {
            this.ruleForm.pwd='*******';
            this.$message({
              type: 'error',
              message: res.message
            });
          }) 
      }
    }    
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
    border: 1px solid #ddd;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
