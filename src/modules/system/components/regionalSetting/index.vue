<template>
<main-wrapper>
  <div slot="header">
    区域设置
  </div>
  <div slot="main">
      <div class="com-block-bg management">
         
             
        <table class="table-strip-ls">
          <thead>
            <tr>
              <td width="20%">省/自治区/直辖市</td>
              <td width="20%">地级市</td>
              <td width="20%">市辖区/县/县级市</td>
              <td >乡/镇/街道</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
               <p class="regional_p" v-for="item in provinces" :key="item.adcode" @click="province(item.adcode)">
                {{item.name}},{{item.adcode}}
               </p>
                <p class="p_center" v-if="provinces.length===0"> 暂无数据</p>
              </td> 
              <td>
                <p class="regional_p" v-for="item in citys" :key="item.adcode" @click="city(item.adcode)">
                  {{item.name}},{{item.adcode}}
                  <span class="regional_h">
                    <i class="i_edit" @click="editDetail(item)"><img src="/static/images/edit.png" alt="修改"  title="修改"></i> 
                   <i class="i_mal i_delete" @click="deleteEntry(item.id)"><img src="/static/images/delete.png" alt="删除" title="删除"></i>
                  </span>
               </p>
                <p class="p_center" v-if="citys.length===0"> 暂无数据</p>
                <p class="p_left" v-if="citys.length!==0"> 
                    <el-button type="primary" size="medium" @click="addCity()">新增</el-button>
                </p>
              </td>
              <td>
                <p class="regional_p" v-for="item in dists" :key="item.adcode" @click="dist(item.adcode)">
                  {{item.name}},{{item.adcode}}
                  <span class="regional_h">
                    <i class="i_edit" @click="disEditDetail(item)"><img src="/static/images/edit.png" alt="修改" title="修改"></i> 
                    <i class="i_mal i_delete" @click="disDeleteEntry(item.id)"><img src="/static/images/delete.png" alt="删除" title="删除"></i>
                  </span>
               </p>
               <p class="p_center" v-if="dists.length===0"> 暂无数据</p>
               <p class="p_left" v-if="dists.length!==0"> 
                    <el-button type="primary" size="medium" @click="addDist()">新增</el-button>
                </p>
              </td>
              <td>
                <p class="regional_p" v-for="item in streets" >
                {{item.name}},{{item.adcode}}
                <span class="regional_h">
                    <i class="i_edit" @click="strEditDetail(item)"><img src="/static/images/edit.png" alt="修改" title="修改"></i> 
                    <i class="i_mal i_delete" @click="strDeleteEntry(item.id)"><img src="/static/images/delete.png" alt="删除" title="删除"></i>
                  </span>
               </p>
               <p class="p_center" v-if="streets.length===0"> 暂无数据</p>
               <p class="p_left" v-if="streets.length!==0"> 
                    <el-button type="primary" size="medium" @click="addStreet()">新增</el-button>
                </p>
              </td>
            </tr>
             <!--  <tr v-if="dataList.length===0">
                <td colspan="7" class="com-nodata">暂无数据</td>
              </tr> -->
          </tbody>
        </table>
        <!--市添加-->
        <el-dialog title="区域管理" :visible.sync="brandAudit" width="500px">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
             <el-form-item label="地区代码：" prop="code" required>
                 <el-input v-model="ruleForm.code" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="名称：" prop="name" required>
                 <el-input v-model="ruleForm.name" placeholder=""></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="brandAudit = false">取 消</el-button>
            <el-button type="primary" @click="submitCity('ruleForm')">提 交</el-button>
          </div>
        </el-dialog>
        <!--区添加-->
        <el-dialog title="区域管理" :visible.sync="brandAudit2" width="500px">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
             <el-form-item label="地区代码：" prop="code" required>
                 <el-input v-model="ruleForm.code" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="名称：" prop="name" required>
                 <el-input v-model="ruleForm.name" placeholder=""></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="brandAudit2 = false">取 消</el-button>
            <el-button type="primary" @click="submitDist('ruleForm')">提 交</el-button>
          </div>
        </el-dialog>
        <!--街道添加-->
        <el-dialog title="区域管理" :visible.sync="brandAudit3" width="500px">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
             <!-- <el-form-item label="地区代码：" prop="code" required>
                 <el-input v-model="ruleForm.code" placeholder=""></el-input>
            </el-form-item> -->
            <el-form-item label="名称：" prop="name" required>
                 <el-input v-model="ruleForm.name" placeholder=""></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="brandAudit3 = false">取 消</el-button>
            <el-button type="primary" @click="submitStreet('ruleForm')">提 交</el-button>
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
      //验证数字
      var capital = (rule, value, callback) => {
         if(!(/^[0-9]*$/.test(value))){
            callback(new Error('请输入数字'));
         } else{
          callback();
         }
        }
      return {
        currentCity: '', //自定义字段获取省code
        currentDistrict: '', //自定义字段获取市code
        currentStreet: '', //自定义字段获取区code

        brandAudit:false,//新增弹窗
        brandAudit2:false,//新增弹窗
        brandAudit3:false,//新增弹窗
        provinces:[],
        citys:[],
        dists:[],
        streets:[],
        ruleForm:{
          code:'',
          name:''
        },
        rules: {
          code: [
            { required: true, message: '请输入地区代码', trigger: 'blur' },
            { validator: capital, trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
           
          ],

        }
      }
    },
   
    methods: {
       /*市编辑*/
      editDetail(row){

        this.ruleForm = {
          code:row.adcode,
          name:row.name,
          id:row.id
        }
         this.brandAudit = true;

      },
      // /*市删除*/
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
          Service.cityDelete(params).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this._getCity(this.currentCity);
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
       //添加市接口
      addCity(){
          this.brandAudit = true;
          this.ruleForm = {
            code: '',
            name: ''
          };
          this.$refs["ruleForm"].resetFields();
      },
      //修改市提交接口
      submitCity(formName){
           //验证通过
        this.$refs[formName].validate((valid) => {
          if (valid) {

            if(this.ruleForm.id){
                let params = {
                id: this.ruleForm.id,
                adcode: this.ruleForm.code,
                name:this.ruleForm.name
              };
            Service.cityEdit(params).then((res) => {
                  this.$message({
                      type: 'success',
                      message: '修改成功！'
                  });
                  this.brandAudit = false;
                 this._getCity(this.currentCity);     
            }).catch((res) => {
              console.log('error ', res);
              this.$message({
                type: 'error',
                message: res.message
              });  
            })   
            }else{
              let params = {
                provinceCode: this.currentCity,
                adcode: this.ruleForm.code,
                name:this.ruleForm.name
              };
            Service.cityAdd(params).then((res) => {
                  this.$message({
                      type: 'success',
                      message: '添加成功！'
                  });
                  this.brandAudit = false;
                 this._getCity(this.currentCity);   
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
      /*区编辑*/
      disEditDetail(row){
         this.brandAudit2 = true;
         this.ruleForm = {
            code:row.adcode,
            name:row.name,
            id:row.id
          };
      },
      // /*区删除*/
      disDeleteEntry(_id) {
        this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
             id : _id
          };
          console.log('id',_id);
          Service.districtDelete(params).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this._getdist(this.currentDistrict); 
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
      //添加区接口
      addDist(){
          this.brandAudit2 = true;
          this.ruleForm = {
            code:'',
            name:'',
          };
          this.$refs["ruleForm"].resetFields();
      },
      //修改区提交接口
      submitDist(formName){
           //验证通过
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.ruleForm.id){
                console.log('edit info ');
                let params = {
                id: this.ruleForm.id,
                adcode: this.ruleForm.code,
                name:this.ruleForm.name
              };
            Service.districtEdit(params).then((res) => {
                  this.$message({
                      type: 'success',
                      message: '修改成功！'
                  });
                  this.brandAudit2 = false;
                  this._getdist(this.currentDistrict);    
            }).catch((res) => {
              console.log('error ',res);
              this.$message({
                type: 'error',
                message: res.message
              });  
            })   
            }else{
              let params = {
                cityCode: this.currentDistrict,
                adcode: this.ruleForm.code,
                name:this.ruleForm.name
              };
            Service.districtAdd(params).then((res) => {
                  this.$message({
                      type: 'success',
                      message: '添加成功！'
                  });
                  this.brandAudit2 = false;
                 this._getdist(this.currentDistrict);   
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
       /*街道编辑*/
      strEditDetail(row){
         this.brandAudit3 = true;
         this.ruleForm = {
            name:row.name,
            id:row.id
          };
      },
      // /*街道删除*/
      strDeleteEntry(_id) {
        this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
             id : _id
          };
          Service.streetDelete(params).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
           this._getstreet(this.currentStreet); 
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
      //添加街道接口
      addStreet(){
          this.brandAudit3 = true;
          this.ruleForm = {
            name:'',
          };
          this.$refs["ruleForm"].resetFields();
      },
      //修改街道提交接口
      submitStreet(formName){
           //验证通过
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.ruleForm.id){
                console.log('edit info', this.ruleForm.id);
                let params = {
                  id: this.ruleForm.id,
                  name: this.ruleForm.name
                };
                Service.streetEdit(params).then((res) => {
                      this.$message({
                          type: 'success',
                          message: '修改成功！'
                      });
                      this.brandAudit3 = false;

                      this._getstreet(this.currentStreet);
                }).catch((res) => {
                  console.log('error ', res);
                  this.$message({
                    type: 'error',
                    message: res.message
                  });  
                })

            }else{
              let params = {
                districtCode: this.currentStreet,
                name:this.ruleForm.name
              };
            Service.streetAdd(params).then((res) => {
                  this.$message({
                      type: 'success',
                      message: '添加成功！'
                  });
                  this.brandAudit3 = false;
                  this._getstreet(this.currentStreet);   
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
      //点击省获取市
      province(code){
          this._getCity(code); 
          this.citys = '';
          this.dists = '';
          this.streets = '';
          this.currentCity = code;
      },
      //点击市获取区
      city(code){
        //alert(code)
        this._getdist(code);
        this.currentDistrict = code;
      },
      //点击区获取乡/镇/街道列表
      dist(code){
        this._getstreet(code);
        this.currentStreet = code;
      },
      //获取省列表
      _allprovince() {
        Service.allprovince().then((res) => {
          this.provinces = res;

        }).catch((res) => {
          this.$message({
            type: 'error',
            message: res.message
          })
        })
      },
      //获取市列表
      _getCity(code) {
        Service.city({
          provinceCode: code
        }).then((res) => {
          console.log(res)
          this.citys = res;
        }).catch((res) => {
          this.$message({
            type: 'error',
            message: res.message
          })
        })
      },
      //获取市辖区/县/县级市列表
      _getdist(code) {
        Service.dist({
          cityCode: code
        }).then((res) => {
          this.dists = res;
        }).catch((res) => {
          this.$message({
            type: 'error',
            message: res.message
          })
        })
      },
      //获取乡/镇/街道列表
      _getstreet(code) {
        Service.street({
          districtCode: code
        }).then((res) => {
          this.streets = res;
        }).catch((res) => {
          this.$message({
            type: 'error',
            message: res.message
          })
        })
      },
       //列表数据
      // getList(){
      //   let params = {
      //     pageSize: this.pageSize,
      //     currentPage: this.currentPage,
      //     brandName:this.preSearchForm.loginName
      //   };
      //   Service.brandList(params).then(res => {
      //     console.log('get list ',res);
      //     this.dataList = res.data;
      //     //this.totalPage = res.totalPage;
      //    // this.currentPage = res.currentPage;
      //     this.pageSize = res.pageSize;
      //     this.totalRecord = res.totalRecord;
      //   }).catch(res => {
      //       this.$message.error(res.message);
      //   })
      // },
      

    },
    mounted(){
      //this.getList();
      this._allprovince();
    }
  }
</script>

<style lang="scss" scoped>
  .management{
    margin-top: 20px;
    position: relative;
  }
  .regional_p{
    margin:10px 0;
    padding-left:20px;
    cursor: pointer;
    
  }
  .table-strip-ls tbody tr td{
      vertical-align:top;
      text-align: left;
      position: relative;
      .p_center{
        text-align: center;
        margin-top: 10px;
      }
      .p_left{
        border-top:1px solid #ddd;
        height: 50px;
        padding-top:10px;
        padding-left:20px;
      }
       .regional_p{
        position: relative;
        &:hover{
           .regional_h{
            display:block;
           }
        }
       }
      .regional_h{
        height: 40px;
        position: absolute;
        top:0px;
        right:0px;
        width:80px;
        display:none;

      }
  }

</style>