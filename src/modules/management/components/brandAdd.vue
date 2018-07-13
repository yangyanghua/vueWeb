<template>
<main-wrapper>
  <div slot="header">
    添加新品牌
  </div>
  <div slot="main">
    <div class="com-block-bg">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" style="padding:20px;"> 
            
            <el-form-item label="品牌名称：" prop="name" required>
                 <el-input v-model="ruleForm.name" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="品牌别称：" prop="otherName" required>
                 <el-input v-model="ruleForm.otherName" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="品牌字母：" prop="letter" required>
                 <el-input v-model="ruleForm.letter" placeholder=""></el-input>
            </el-form-item>
               
          <el-form-item label="品牌LOGO："  prop="logoUrl"  >
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :before-upload="beforeAvatarUploadLogo">
              <img v-if="ruleForm.logoUrl" :src="ruleForm.logoUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </el-form-item> 

            <el-form-item label="品牌故事：">
              <el-input type="textarea" v-model="ruleForm.brandStory"></el-input>
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
  import * as Service from '@/common/service/management/index.js';
  import {getUploadImgSrc} from '@/common/service/common.js'; //上传图片接口
  export default {
    data() {
      //大写字母验证
      var capital = (rule, value, callback) => {
         if(!(/^[A-Z]*$/.test(value))){
            callback(new Error('请输入大写字母'));
         } else{
          callback();
         }
        }
      return {
        ruleForm: {
          name:'',
          otherName:'',
          letter:'',
          logoUrl:'',
          brandStory:''
        },

        rules: {
          name: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' }
          ],
          otherName: [
            { required: true, message: '请输入品牌别称', trigger: 'blur' }
          ],
          letter: [
            { required: true, message: '请输入品牌字母', trigger: 'blur' },
            { validator: capital, trigger: 'blur' }
          ],
          logoUrl: [
            { required: true, message: '请上传品牌LOGO', trigger: 'blur' },
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
              this.ruleForm.logoUrl = res;
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
            Service.brandAdd(this.ruleForm).then((res) => {
                  this.$message({
                      type: 'success',
                      message: '添加成功！'
                  });
                  this.$router.push({
                    path: '/management/list'
                 })      
            }).catch((res) => {
              console.log('error ', res);
              this.$message({
                type: 'error',
                message: res.message
              });  
            })      
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
