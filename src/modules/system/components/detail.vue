<template>
<main-wrapper>
<div slot="header">
    {{ editStatus?'编辑':'创建' }}APP
  </div> 
  <div slot="main">
    <div class="com-block-bg">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" style="padding:20px;"> 
            
            <el-form-item label="APP名称：" prop="name" required>
                 <el-input v-model="ruleForm.name" placeholder=""></el-input>
            </el-form-item>
            <el-form-item prop="system" label="平台：" required>
                <el-radio-group v-model="ruleForm.system">
                    <el-radio label="2" class="mgr10">
                      android
                    </el-radio>
                    <el-radio label="1" class="mgr10">
                      ios
                    </el-radio> 
                </el-radio-group>
            </el-form-item>
            <el-form-item label="应用ID：" prop="applyId" required>
                 <el-input v-model="ruleForm.applyId" placeholder=""></el-input>
            </el-form-item>
               
          <el-form-item label="LOGO："  prop="logoPath"  >
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :before-upload="beforeAvatarUploadLogo">
              <img v-if="ruleForm.logoPath" :src="ruleForm.logoPath" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </el-form-item> 

            <el-form-item label="说明：">
              <el-input type="textarea" v-model="ruleForm.remark"></el-input>
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
  import * as Service from '@/common/service/system/index.js';
  import {getUploadImgSrc} from '@/common/service/common.js'; //上传图片接口
  export default {
    data() {
      
      return {
        editStatus:false,
        ruleForm: {
          id: '',
          name:'',
          applyId:'',
          system:'',
          logoPath:'',
          remark:''
        },

        rules: {
          name: [
            { required: true, message: '请输入APP名称', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          applyId: [
            { required: true, message: '请输入应用ID', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }

          ],
          system: [
            { required: true, message: '请选择平台', trigger: 'blur' }
          ],
          logoPath: [
            { required: true, message: '请上传LOGO', trigger: 'blur' },
          ],

        }

      }
    },
    methods: {
      //上传图片方法
      beforeAvatarUploadLogo(file) {
          const isJPG = file.type === 'image/jpeg';
          const isPNG = file.type === 'image/png';
          const isLt2M = file.size / 1024 / 1024 < 2;


          if (!isJPG&&!isPNG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            return false
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            return false;
          }
       getUploadImgSrc(file).then((res) => {
              this.ruleForm.logoPath = res;
            }).catch((res) => {
              console.log('error ', res);
              this.$message({
                type: 'error',
                message: res.message
              });  
        })          
      },
      //提交方法   
      addForm(formName) {
        //验证通过
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.ruleForm.id) {
              Service.appManagerEdit({app:this.ruleForm}).then((res) => {
                  this.$message({
                      type: 'success',
                      message: '修改成功！'
                  });
                  this.$router.push({
                    path: '/system/list'
                 })      
              }).catch((res) => {
                console.log('error ', res);
                this.$message({
                  type: 'error',
                  message: res.message
                });  
              });
            } else {
              Service.appManagerAdd({app:this.ruleForm}).then((res) => {
                  this.$message({
                      type: 'success',
                      message: '添加成功！'
                  });
                  this.$router.push({
                    path: '/system/list'
                 })      
              }).catch((res) => {
                console.log('error ', res);
                this.$message({
                  type: 'error',
                  message: res.message
                });  
              });     
            }
          } else {
              console.log('error submit!!');
              return false;
          }
            
        });
      },
      getDetail() {

        let id = this.$route.query.id;
        if (!id) {
          return;
        }
        this.editStatus=true;
        Service.appManagerInfo({'id':id}).then((res) => {
          console.log(res);
          this.ruleForm= res;
          let systemS = res.system;
          this.ruleForm.system = String(systemS);
        });
      }
    },
    mounted(){
      this.getDetail();
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
