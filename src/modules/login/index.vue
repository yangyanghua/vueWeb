<template>
  <section class="login_content">
    <div class="header">
      <img src="/static/images/sghslogo.png" alt="">
    </div>
    <div class="banner">
        <div class="logoConter">
            <div class="mail">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="登录" name="signIn">
                      <div class="loginForm">
                        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px">
                         <el-form-item >
                            <input type="hidden"  v-model="ruleForm2.uuid" />
                        </el-form-item>

                        <el-form-item prop="loginName">
                          <label class="inlable">
                            <input type="text"  v-model="ruleForm2.account" class="input_328" placeholder="账号"/>
                            <p><img src="/static/images/logo-2.png" alt=""></p>
                          </label> 
                          
                        </el-form-item>
                        <el-form-item prop="password">    
                          <label class="inlable passw">
                            <input type="password"  v-model="ruleForm2.pwd" class="input_328" placeholder="密码"/>
                            <p><img src="/static/images/logo-3.png" alt=""></p>
                          </label>
                        </el-form-item>
                        <div class="checkCode" >
                          <label class="inlable">
                            <input type="tetx"  v-model="ruleForm2.vcode" class="input_204" placeholder="验证码" @keyup.enter="enterKeyLogin1"/>
                            <p class="p1"><img src="/static/images/logo-4.png" alt=""></p>
                          </label>
                          <div class="checkCodeImg" @click="getCheckcode" id="v_container">
                            <img :src="ruleForm2.src" style="height: 100%;" />
                          </div>
                        </div>   
                       <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
                        <el-form-item style="width:100%;margin-top: 40px;">
                          <!-- :loading 属性显示加载等待 ，true表示正在加载-->   <el-button type="primary" class="btn" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>   
                          <!--<el-button type="text" @click="forgetPassword=true" >忘记密码</el-button>-->
                        </el-form-item>
                      </el-form>  
                  </div> 
                  </el-tab-pane>
                 <!--  <el-tab-pane label="注册" name="register">
               <div class="registeredForm loginForm">
              <el-form :model="regForm" :rules="regRules" ref="regForm" label-width="0" >
                <el-form-item  prop="phone">
                  <el-input v-model="regForm.phone" :maxlength="11" placeholder="手机号码" ></el-input>
                </el-form-item>
                <el-form-item  prop="vCode">
                  <el-input style="width: 160px;" v-model="regForm.vCode" placeholder="手机验证码" ></el-input>
                  <el-button style="width: 164px;"  type="primary" @click="_getVcode" :disabled="!isCanSendCode" >{{getcodeTxt}}</el-button>
                </el-form-item>
                <el-form-item  prop="password">
                  <el-input type="password" v-model="regForm.password" placeholder="密码" @keyup.enter.native="enterKeyLogin2"></el-input>
                </el-form-item>  
              </el-form>
              <el-button type="primary" :loading="regloading"  @click.native.prevent="_register" class="btn">注册</el-button>
            </div>
                  </el-tab-pane> -->
                </el-tabs>
            </div>
        </div>  
    </div>
 <!--注册成功提示框--> 
 <!-- <div v-if="regSuccess" class="regSuccess">
    <div class="regSuccess_2">
      <h2><i>账号注册成功！</i><br >系统将在<a>{{countdown}}s</a>内跳转至店铺入驻页面</h2>
    </div>
 </div> -->
 
 
 
</section>
</template>

<script>
import {login,getCheckcode} from '@/common/service/login/index.js';
// import * as Service from '@/common/service/account/index.js';
import {currentHost,api,httpService} from '@/common/http/http.js';
  export default {
    data() {
      return {
        regloading:false,
        countdown:3,
        regSuccess:false,
        checkCodeImg:'',
        logining: false,
        forgetPassword:false,
        errorQty:0,
        isCanSendCode:true,
        verifyCode:'',
        getcodeTxt:'获取手机验证码',
        regForm:{
          phone:'',
          vCode:'',
          password:'',
        }, 
         regRules: {
          phone: [
            { required: true,  message: '请输入手机号码', trigger: 'blur' },
          ],
          vCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]          
        },         
        ruleForm2: {
          account: '',
          pwd: '',
          vcode:'',
           //base64验证码
          src:'',
          //标识符
          uuid:'',
          
        },
        activeName: 'signIn',
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      //获取手机验证码
  _getVcode(){
    if(this.regForm.phone.length == 11){
        getVcode({phone:this.regForm.phone}).then((res) => {
            this.$message({
              type: 'success',
              message: '验证码发送成功，请注意查收。'
            });
          this.isCanSendCode = false; 
          let i = 60;
          let _this = this;
          let tiemer = setInterval(function(){
            if(i > 0){
            i--;
             _this.getcodeTxt = '重新获取验证码（'+i +'）';                
            }else{
                clearInterval(tiemer);
               _this.isCanSendCode = true;
               _this.getcodeTxt = '重新获取验证码';
               
            }
          },1000)
          }).catch((res) => {
            console.log('error ', res);
            this.$message({
              type: 'error',
              message: res.message
            });  
      })      
    }else{
            this.$message({
              type: 'error',
              message: '请输入正确手机号码'
            });       
    }

  },      
      //注册
  _register(){
    this.regloading = true;
    let _this = this;
     _this.$refs.regForm.validate((valid) => {
              if (valid) {
            let regParams = this.regForm;
            register(regParams).then((res) => {
            
            localStorage.setItem('user', JSON.stringify(res));
            //设置登录超时时间，12个小时后超时
            localStorage.setItem('timeOut', new Date().getTime()+12*60*60*1000);
           this.regSuccess = true;            
          let i = 3;
          let _this = this;
          let tiemer = setInterval(function(){
            if(i > 0){
            i--;
             _this.countdown = i ;                
            }else{
                clearInterval(tiemer);
                   _this.$router.push({
                     path:'/join',
                    })                  
               _this.regSuccess = false;
                   _this.$router.push({
                     path:'/index',
                    })  
            }
          },1000)           
            
              }).catch((res) => {
                this.regloading = false;
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
  },
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      getCheckcode(){
         getCheckcode().then((res) => {
              this.ruleForm2.src = res.src;
              this.ruleForm2.uuid = res.uuid;   
       })
         /*向后端请求数据 （失败）*/ 
         .catch((res) => {
          this.$message({
            type: 'error',
            message: res.message
          });
        })
      },
      /*登录方法*/
      handleSubmit2() {
        var _this = this;
        _this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
              _this.logining = true;  
            var loginParams =  _this.ruleForm2;  
              //src赋值null
              this.ruleForm2.src = null;
        login(loginParams).then((res) => {
        //console.log(res);
        localStorage.setItem('user', JSON.stringify(res));
        //设置登录超时时间，12个小时后超时
        localStorage.setItem('timeOut', new Date().getTime()+12*60*60*1000);
          _this.logining = false; 
          this.$router.push('/management/list');
          // if(res.isJoin){//已经入驻过的账号跳转到首页
       //         if(res.store){//有店铺的
       //           if(res.store.status=="WAIT_AUDIT" || res.store.status=="AUDIT_FALL"){//在审核或审核失败                   
           //            this.$router.push({
           //            path:'/join/stroeaudit',
           //            query:{ status:res.store.status,id:res.store.id}
           //         })  
       //           }else{
       //             _this.$router.push('/index');
       //           } 
       //         }else{//没店铺的
       //           _this.$router.push('/join/joinSuccess');
       //         }

          // }else{//没有入驻的账号，开始入驻
          //  if(res.userEnter){
           //   if(res.userEnter.status == 'WAIT_AUDIT' || res.userEnter.status == 'AUDIT_FALL'){//待审核
           //     this.$router.push('/join/audit');
           //   }else if(res.userEnter.status == 'AUDIT_SUCCESS'){
           //     this.$router.push('/join/pay');
           //   }else if(res.userEnter.status =='NEW'){
           //     this.$router.push('/join/writeInfo');
           //   }else{
           //     this.$router.push('/join');
           //   }
          //  }else{
          //    this.$router.push('/join');
          //  }
            
          // }                 
          }).catch((res) => {
            console.log('error ', res);
            //如果出现异常，重新请求接口获取验证码
            this.getCheckcode();
//            if(res.code == 400) {
//                
//            }
            this.$message({
              type: 'error',
              message: res.message
            });
           _this.logining = false;     
      })                        
         } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      enterKeyLogin(_event){
        //alert(_event.code+"|"+_event.keyCode);
        this.handleSubmit2();
      },
      //按enter键触发该方法
       enterKeyLogin1(_event){
        //alert(_event.code+"|"+_event.keyCode);
        this.handleSubmit2();
      },
       //注册按enter键触发该方法
       enterKeyLogin2(_event){

        //alert(_event.code+"|"+_event.keyCode);
        this._register();
      },
      //切换的方法
       handleClick(tab, event) {
        console.log(tab, event);
      }

    },
  mounted() {
    //获取验证码
    this.getCheckcode();
   },    
    
  }

</script>

<style lang="scss" scoped>
html,body{
  width:100%;
  height:100%;
}
  .header{
  height: 120px;
  padding:20px 0 0 120px; 
  }
  .banner{
    height: 600px;
    background: url(/static/images/banner.jpg) center center;
    background-size:cover;
    position: relative;
  }
  .login_content{
    width: 100%;
    height: 100vh;
    background: #fff;
  }
  .logoConter{
    width: 382px;
    height: 444px;
    background: rgba(255,255,255,.5);
    position: absolute;
    top: 77px;
    right: 10%;
    .mail{
      width: 360px;
      height: 420px;
      background: #fff;
      margin: 12px auto;
      position: relative;
      padding:15px;
    }
  }


  .loginForm{
     width:328px;
     height:412px;
     .logo{
      text-align: center;
      padding-bottom:14px;
     }
     input::-webkit-input-placeholder{
      color:#dddddd;
     }
     input::-moz-input-placeholder{
      color:#dddddd;
     }
     input::-ms-input-placeholder{
      color:#dddddd;
     }

     .input_328,.input_204{
      height:54px;
      border-radius:5px;
      border:1px solid #dddddd;
      color:#666;
      padding-left:60px;
     }
     .input_328:hover,.input_204:hover{
      border:1px solid #6fb9e9;
     }
    
    .input_328:focus,.input_204:focus{
      border:1px solid #6fb9e9;
     }
     
      .input_328{
        width:328px;
      }
      .input_204{
        width:204px;
      }
     .inlable{
       position: relative;
     }
     p{
      position: absolute;
      top:-12px;
      left:15px;
      opacity: .5;
      &:hover{
        opacity: 1;
      }
     }
     .p1{
        top:-8px;
      }
      .btn{
        height:54px;
        border-radius:5px;
        background:rgb(77,169,228);
        color:#fff;
        text-align: center;
        width:328px;
        border:none;
        font-size:18px;
      }
      .btn:hover{
        background:rgba(77,169,228,.8);
      }
      .checkCodeImg{
        padding:10px;
        background:rgb(255,255,255);
        width:99px;
        height: 54px;
        border-radius:5px;
        position: absolute;
        cursor:pointer;
        right:0;
        top:0;
        border:1px solid #ddd;
      }

  }
.checkCode{
  clear:both;
  position: relative;
}
.regSuccess{
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: rgba(0,0,0,.8);
  
  .regSuccess_2{
    width: 320px;
    height: 100px;
    background: #FFFFFF;
    top: 50%;
    left: 50%;
    z-index: 101;
    margin-left: -160px;
    margin-top: -50px;
    position: absolute;
    h2{
      width: 100%;
      text-align: center;
      font-size: 14px;
      margin-top: 25px;
      i{
        color: #4da9e4;
        font-weight: 700;
      }
      a{
        color: #4da9e4;
        font-weight: 700;
      }
    }

  }
  
}

  
</style>