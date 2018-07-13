<template>
<main-wrapper>
  <div slot="header">
    {{ editStatus?'编辑':'新建' }}参数
  </div>
  <div slot="main">
    <div class="com-block-bg">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" style="padding:20px;"> 
            <el-form-item label="参数名" required prop="code">
              <el-input size="medium" class="input_150" v-model="ruleForm.code" placeholder="请输入参数名"></el-input>
            </el-form-item>
            <el-form-item label="参数中文名" required prop="name">
              <el-input size="medium" class="input_150" v-model="ruleForm.name" placeholder="请输入参数中文名"></el-input>
            </el-form-item>
            <el-form-item label="值类型" prop="type" required >
                <el-radio-group v-model="ruleForm.type"  @change="typeChange" >
                    <el-radio label="0" class="mgr10">
                      单值
                    </el-radio>
                    <el-radio label="1" class="mgr10">
                      值列表
                    </el-radio> 
                </el-radio-group>
            </el-form-item>
             <el-form-item label="参数值"  :error="errorMag"  required >
              
             <p  v-show="ruleForm.type==1"><el-button size="medium" type="primary" @click="addArea">添加</el-button> <el-button size="medium" @click="empty">清空</el-button></p>
               <el-input v-show="ruleForm.type==0" v-for="(item,index) in ruleForm.value "  :key="index" size="medium" class="input_150" v-model="item.content" placeholder="请输入参数值"></el-input>
               <div v-show="ruleForm.type==1" style="width:600px"  >
                  <p  v-for="(item,index) in ruleForm.value "  style="margin-top:10px;" >
                    <el-input placeholder="请输入内容" v-model="item.content" >
                      <el-button slot="append" @click="deleteValue(index)" >删除</el-button>
                    </el-input>
                </p>  

                </div>
            </el-form-item>


            <el-form-item label="说明">
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
      //大写字母验证
      var capital = (rule, value, callback) => {
         if(!(/^[A-Z_]+$/.test(value))){
            callback(new Error('请输入大写字母加只支持大写字母和下划线'));
         } else{
          callback();
         }
        }

      return {
        editStatus:false,
        errorMag:'',
        ruleForm: {
          code:'',
          name:'',
          type:'',
          value:[{content:''}],
          remark:''
        }, 

        rules: {
          code: [
            { required: true, message: '请输入参数名', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' },
            { validator: capital, trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入版本号', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 30 个字符', trigger: 'blur' }

          ],
          type: [
            { required: true, message: '请选择平台', trigger: 'blur' }
          ],


        }

      }
    },
    methods: {
      //单值表
      typeChange(){
          if(this.ruleForm.type==0){
             this.ruleForm.value = [{content:''}];
          }
      },
      //值列表删除单个
      deleteValue(index){
        this.ruleForm.value.splice(index,1);
      },
      //添加值列表
     addArea(){
          this.ruleForm.value.push({
                content:''
          }) 
        },
      //清空值列表
      empty(){
           this.ruleForm.value = [];
      },
      //提交方法   
      addForm(formName) {
          let vm = this;

          let isEveryPass = this.ruleForm.value.every(item=>item.content!=='');        
          if(!isEveryPass){
             vm.errorMag = '参数值不能为空';
          } 
     
        //验证通过
        this.$refs[formName].validate((valid) => {
          if (valid) {
                let isEveryPass = vm.ruleForm.value.every(item=>item.content!=='');        
                if(!isEveryPass){
                   vm.errorMag = '参数值不能为空';
                   return;
                } 
                vm.errorMag = '';
                //自定义一个数组
                let values = []; 
                this.ruleForm.value.forEach((item)=>{                  
                    values.push(item.content);
                })
                 let opt = Object.assign({},this.ruleForm);
                 opt.value = values.join(','); //
             //修改保存     
            if (this.ruleForm.id) {
               Service.paramEdit(opt).then((res) => { 
                  this.$message({
                      type: 'success',
                      message: '修改成功！'
                  });
                  this.$router.push({
                    path: '/system/parameter/list'
                 })
               
              }).catch((res) => {
                console.log('error ', res);
                this.$message({
                  type: 'error',
                 message: res.message
                });  
              }); 
            } else {
              //添加
              Service.paramAdd(opt).then((res) => {
                  this.$message({
                      type: 'success',
                      message: '添加成功！'
                  });
                  this.$router.push({
                    path: '/system/parameter/list'
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
      //详情回显
      getInfo() {
        let id = this.$route.query.id;
        if (!id)  return;
        Service.paramInfo({id: id}).then( (res) => {
            this.ruleForm = res;
            let arr = res.value.split(',');  //把字符串转化成数组  
            let arr1 = [];  
            arr.forEach((item)=>{    //循环遍历数组
                arr1.push(     //新建的数组，一个一个的content循环添加item
                    {
                      content:item
                    }
                  )
            })
            this.ruleForm.value = arr1;
            //转化成数字类型  
            let types = res.type;
            this.ruleForm.type = String(types);
        }).catch((res) => {
            console.log('error ', res);
            this.$message({
                type: 'error',
                message: res.message
            });  
        });
      }
    },
    mounted() {
      this.getInfo();
    }
  }
</script>

<style lang="scss" scoped>
  .input_150{
    width:80%;
  }
</style>
