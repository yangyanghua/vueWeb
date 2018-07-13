<template>
<main-wrapper>
  <div slot="header">
    {{ editStatus?'编辑':'创建' }}发布版本
  </div>
  <div slot="main">
    <div class="com-block-bg">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" style="padding:20px;"> 
            
             <el-form-item label="APP名称" prop="appId" required>
              <el-select size="medium" v-model="ruleForm.appId" placeholder="全部" @change="handleChange">
                      <el-option
                        v-for="item in options4"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="平台">
                <i v-if="ruleForm.system==1">ios</i>
                <i v-if="ruleForm.system==2">android</i>
              <!-- <el-radio-group v-model="ruleForm.system">
                  <el-radio label="2" class="mgr10">
                    android
                  </el-radio>
                  <el-radio label="1" class="mgr10">
                    ios
                  </el-radio> 
              </el-radio-group> -->
            </el-form-item>
            <el-form-item label="版本号" required prop="version">
              <el-input size="medium" class="input_150" v-model="ruleForm.version" placeholder="请输入版本号"></el-input>
              <span>最近一次升级版本号为{{sionMxVersion}}</span>
            </el-form-item>
            <el-form-item label="升级方式" prop="upWay" required>
                <el-radio-group v-model="ruleForm.upWay">
                    <el-radio label="1" class="mgr10">
                      强制升级
                    </el-radio>
                    <el-radio label="2" class="mgr10">
                      不强制升级
                    </el-radio> 
                </el-radio-group>
            </el-form-item>
             
            <el-form-item label="官方升级地址" prop="upUrl" class="classupUrl">
              <el-input size="medium" class="input_150" v-model="ruleForm.upUrl" placeholder="请输入地址"></el-input>
              <el-upload
            class="upload"
            action=""
            :before-upload="beforeAvatarUploadLogo">
            <el-button size="medium" icon="el-icon-upload2" type="primary">上传文件</el-button>
          </el-upload>
            </el-form-item>
            <el-form-item label="升级文案" prop="upCopy" v-show="ruleForm.upWay==2" >
              <el-input type="textarea" v-model="ruleForm.upCopy "></el-input>
            </el-form-item>  

            <el-form-item label="备注">
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
      //验证不强制升级
      var capital = (rule, value, callback) => {
         if(this.ruleForm.upWay==2 && value==''){
            callback(new Error('请输入升级方案'));
         } else{
          callback();
         }
        }
        //验证强制升级
      var capitalq = (rule, value, callback) => {
         if(this.ruleForm.upWay==1 && value==''){
            callback(new Error('请输入升级地址'));
         } else{
          callback();
         }
        }
      return {
        sionMxVersion:'', //最大版本号
        options4:[],      //下拉的品牌列表
        editStatus:false,
        ruleForm: {
          system:'',
          version:'',
          upWay:'',
          upCopy:'',
          upUrl:'',
          appId:''
        }, 
        rules: {
          appId: [
            { required: true, message: '请选择APP名称', trigger: 'blur' },
            // { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          // system: [
          //   { required: true, message: '请选择平台', trigger: 'blur' },
          //   // { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          // ],
          version: [
            { required: true, message: '请输入版本号', trigger: 'blur' },
            // { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }

          ],
          upWay: [
            { required: true, message: '请选择升级方式', trigger: 'blur' }
          ],
          upCopy: [
            { validator: capital, trigger: 'blur' }
          ],
          upUrl: [
            { validator: capitalq, trigger: 'blur' }
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
              this.ruleForm.upUrl = res;
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
                Service.appVersionEdit({'appVersion':this.ruleForm}).then((res) => {  //包一层提交
                    this.$message({
                        type: 'success',
                        message: '修改成功！'
                    });
                    this.$router.push({
                      path: 'list'
                   })
                 
              }).catch((res) => {
                console.log('error ', res);
                this.$message({
                  type: 'error',
                  message: res.message
                });  
              });

            } else {
              Service.appVersionAdd({'appVersion':this.ruleForm}).then((res) => {
                  this.$message({
                      type: 'success',
                      message: '添加成功！'
                  });
                  this.$router.push({
                    path: 'list'
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
      getInfo() {
        let id = this.$route.query.id;
        if (!id)  return;
        this.editStatus=true;

        Service.appVersionInfo({id:id}).then( (res) => {
          console.log(res);
          this.ruleForm = res;
          // let systemS = res.system;
          // this.ruleForm.system = String(systemS);
          let upWayS = res.upWay;
          this.ruleForm.upWay = String(upWayS);

         //获取最大版本号接口
            Service.appVersionMxVersion({appId:res.appId}).then((res1) => {
              this.sionMxVersion = res1
                }).catch((res) => {
                  console.log('error ', res1);
                  this.$message({
                    type: 'error',
                    message: res1.message
                  });  
            });
        }).catch((res) => {
              console.log('error ', res);
              this.$message({
                type: 'error',
                message: res.message
              });  
        });


      },
      handleChange(){
            //获取最大版本号接口
            Service.appVersionMxVersion({appId:this.ruleForm.appId}).then((res) => {
              this.sionMxVersion = res
                }).catch((res) => {
                  console.log('error ', res);
                  this.$message({
                    type: 'error',
                    message: res.message
                  });  
            });
            let vm = this;
            this.options4.forEach((item)=>{
                if(item.id==vm.ruleForm.appId){
                   vm.ruleForm.system = item.system;
                }

            })
      }
    },
    mounted() {
      this.getInfo();
      //获取app名称 列表 
      let params = {
          pageSize: 100,
          page:1 ,
        };
      Service.appManagerList(params).then((res) => {
                this.options4 = res;
              }).catch((res) => {
                console.log('error ', res);
                this.$message({
                  type: 'error',
                  message: res.message
                });  
          });
      
      
    }
  }
</script>

<style lang="scss" scoped>
  .input_150{
    width:80%;
  }
  .classupUrl{
    position: relative;
     .upload{
      position: absolute;
      top:0px;
      right:0px;
    }
  }
 
</style>
