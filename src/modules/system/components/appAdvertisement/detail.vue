<template>
<main-wrapper>
  <div slot="header">
    <p>{{ editStatus?'编辑':'创建' }}APP广告</p>
  </div>
  <div slot="main">
    <div class="com-block-bg">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" style="padding:20px;"> 
            
            <el-form-item label="名称" prop="name" required>
              <el-input size="medium" class="input_150" v-model="ruleForm.name" placeholder="请输入名称"></el-input>
            </el-form-item>

            <el-form-item label="广告图片：" prop="imgUrl" required>
							<el-upload
							  class="avatar-uploader"
							  action=""
							  :show-file-list="false"
							  :before-upload="beforeAvatarUpload">
							  <img v-if="ruleForm.imgUrl" :src="ruleForm.imgUrl" class="avatar">
							  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>          			
            </el-form-item>
            <el-form-item label="播放时长：" prop="playTime" required>
              <el-input size="medium" class="input_150" v-model="ruleForm.playTime" placeholder="请输入播放时长"></el-input>
            </el-form-item>
            <el-form-item label="上线时间：" :error="errorMag" required>  <!--:error="errorMag"-->
              <el-col :span="5">  
                <el-form-item prop="onLineStart">
                  <el-date-picker :picker-options="pickerBeginDateAfter" class="mgr10" v-model="ruleForm.onLineStart" type="datetime"
                    placeholder="开始日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="1">至</el-col>
              <el-col :span="5"> 
                <el-form-item prop="onLineEnd">
                  <el-date-picker :picker-options="pickerBeginDateAfter" class="mgr10" v-model="ruleForm.onLineEnd" type="datetime"
                    placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="APP名称：" prop="appIds" required>
            <el-select size="medium" v-model="ruleForm.appIds"  placeholder="全部">
                      <el-option
                        v-for="item in options4"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-width="38px" >
								<p>配置广告次级页面：</p>
								<div class="pageSet">
									<div class="p_header">
									  <el-select v-model="pageType" @change="pageTypeChange" placeholder="请选择">
									    <el-option
									      v-for="item in options"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
									  </el-select>										
										<el-input  v-if="pageType!=4" v-model="searchName" style="width: 300px;" placeholder="请输入内容"></el-input>
										<el-button v-if="pageType!=4" type="primary" size="small" @click="handeSearch" icon="el-icon-search" >搜索</el-button>
										<el-button v-if="pageType!=4" size="small" @click="resetSearch">重置</el-button>
									</div>
									<div class="proContent" v-if="pageType!=4">
										<div class="prolistCon allpro" id="productList" @scroll="loadMorePro" >
											<ul class="proList" v-if="pageType==1">
												<li v-for="(item,index) in productList" :key="index" @click="checkLeft(item.image,item.productName,item.id)" >
													<div class="proimg">
														<img :src="item.image" />
													</div>
													<div class="name">
						
														<p>{{item.productName}}</p>
													</div>
													<span v-if="item.id == checkedobj.id" class="checked">已选</span>
												</li>										
											</ul>
											<ul class="proList" v-if="pageType==2">
												<li v-for="(item,index) in productGroupList" :key="index" @click="checkLeft(item.imgUrl,item.name,item.id)">
													<div class="proimg">
														<img :src="item.imgUrl" />
													</div>
													<div class="name">
														<p>{{item.name}}</p>
													</div>
													<span v-if="item.id == checkedobj.id" class="checked">已选</span>
												</li>										
											</ul>												
											<ul class="proList" v-if="pageType==3" >
												<li v-for="(item,index) in brandList" :key="index" @click="checkLeft(item.logo,item.brandName,item.id)">
													<div class="proimg">
														<img :src="item.logo" />
													</div>
													<div class="name">
						
														<p>{{item.brandName}}</p>
													</div>
													<span v-if="item.id == checkedobj.id" class="checked">已选</span>
												</li>										
											</ul>											
										</div>
										<div class="prolistCon proChecked">
											<ul class="proList">
													<li v-if="checkedobj.id">
														<div class="proimg">
															<img :src="checkedobj.image" />
														</div>
														<div class="name">
															<p>{{checkedobj.name}}</p>
														</div>							
													</li>
											</ul>
										</div>												
									</div>
									<div class="urlInput" v-if="pageType==4" >
								  <el-input placeholder="请输入内容" v-model="h5Url">
								    <template slot="prepend">Http://</template>
								  </el-input>								
									</div>
								</div>							
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
	import {
		getProductList,
	} from '@/common/service/goodsGroup/index.js'
  import {brandListBrandEmpower} from '@/common/service/management/index.js';
	import {
		getProductGroupList,
	} from '@/common/service/goodsGroup/index.js';
  
  import {getUploadImgSrc} from '@/common/service/common.js'; //上传图片接口
  export default {
    data() {
      
      return {
      	h5Url:'',
      	searchName:'',
      	pageType:1,
        errorMag:'',
      	// value4:[],
      	isChecked:[],

				productForm: {
					name: '',
					p: 1,
					pSize: 20
				}, 
				brandForm:{
					brandName:'',
					currentPage:1,
					pageSize:20,
				},
				groupform: {
					groupName: '',
					createPerson: '',
					page: 1,
					pageSize: 10,
					startTime: '',
					endTime: '',
				},				
				checkedobj:{
    			image:'',    			
    			name:'',
    			id:''					
				},
				brandList:[],
				productGroupList:[],
				productList:[],			
      	options:[{label:'商品',value:1},{label:'商品组',value:2},{label:'品牌',value:3},{label:'H5页面',value:4}],
      	
      	checkedList:[],
        editStatus:false,
        ruleForm: {
          name:'',
          imgUrl:'',
          playTime:'',
          // onlineTime:'',
          onLineStart:'',
          onLineEnd:'',
          appIds:'',
          moduleType:'',
          moduleData:''
        }, 
        options4:[],      //下拉的品牌列表
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          imgUrl: [
            { required: true, message: '请上传图片', trigger: 'blur' },
          ],
          playTime: [
            { required: true, message: '请输入广告播放时长', trigger: 'blur' },
          ],
          onLineStart: [
            {type: 'date', required: true, message: '请选择开始时间', trigger: 'change' },
          ],
          onLineEnd: [
            {type: 'date', required: true, message: '请选择结束时间', trigger: 'change' },
          ],
          appIds: [
            { required: true, message: '请选择APP名称', trigger: 'blur' },
          ],

        },
        //判断在这之前的时间不能选
        pickerBeginDateAfter: {
          disabledDate: (time) => {
            let beginDateVal = new Date().getTime() - 24 * 3600 * 1000;
            return time.getTime() < beginDateVal;
          }
        },
      }
    },
    methods: {    	
    	checkLeft(image,name,id){
 	    		this.checkedobj = {
	    			"image":image,    			
	    			"name":name,
	    			"id":id
	    		}   		
    	},
    	resetSearch(){
				this.pageTypeChange(this.pageType);    		
    	},
    	handeSearch(){
    		if(this.pageType==1){
    			 this.productForm.p = 1;
    			 this.productForm.name = this.searchName;
    			 this._getProductList(this.productForm,true);
    		}else if(this.pageType==3){
					 this.brandForm.brandName = this.searchName;
					 this.brandForm.currentPage = 1;
 					 this._brandListBrandEmpower(this.brandForm,true);
    		}else if(this.pageType==2){
    			 this.groupform.groupName = this.searchName;
    			 this.groupform.page = 1;
    			 this._getProductGroupList(this.groupform,true);  	
    		}    		
    	},
    	pageTypeChange(val){
    		if(val==1){
    			 this.productForm.p = 1;
    			 this.productForm.name = '';
    			 this._getProductList(this.productForm,true);
    		}else if(val==3){
					 this.brandForm.brandName = '';
					 this.brandForm.currentPage = 1;
 					 this._brandListBrandEmpower(this.brandForm,true);
    		}else if(val==2){
    			 this.groupform.groupName = '';
    			 this.groupform.page = 1;
    			 this._getProductGroupList(this.groupform,true);  	
    		}
    	},
			loadMorePro() {
				let productBox = document.getElementById('productList');				
				if(productBox.scrollTop == productBox.scrollHeight - 340) {
					if(this.pageType==1){
						this.productForm.p++;
						this._getProductList(this.productForm, false);						
					}else if(this.pageType==3){
						this.brandForm.currentPage++;
						this._brandListBrandEmpower(this.brandForm,false);  
					}else if(this.pageType==2){
						this.groupform.page++;
						this._getProductGroupList(this.groupform,false);
					}
					

				}
			},    	
      //上传图片方法
      beforeAvatarUpload(file) {
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
              this.ruleForm.imgUrl = res;
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
         console.log('==== ',this.ruleForm.onLineStart ,this.ruleForm.onLineEnd )
           if (Number(this.ruleForm.onLineStart) > Number(this.ruleForm.onLineEnd)) {
             this.errorMag = '结束时间不能早于开始时间';
             return false;
           }
        //验证通过
        this.$refs[formName].validate((valid) => {

          if (valid) {
            //时间转换
            this.ruleForm.onLineStart = this.ruleForm.onLineStart.Format('yyyy-MM-dd hh:mm:ss');
            this.ruleForm.onLineEnd = this.ruleForm.onLineEnd.Format('yyyy-MM-dd hh:mm:ss');
              if(this.pageType==''){
                this.ruleForm.moduleType = "none"
              }
              if(this.pageType==1){
                this.ruleForm.moduleType = 'goods'
              }
              if(this.pageType==2){
                this.ruleForm.moduleType = 'goods_group'
              }
              if(this.pageType==3){
                this.ruleForm.moduleType = 'brand'
              }
              if(this.pageType==4){
                this.ruleForm.moduleType = 'url'
								var rge = /^(http:\/\/).*/;
								var rge1 = /^(https:\/\/).*/;
									if(this.h5Url){
										if(rge.test(this.h5Url) || rge1.test(this.h5Url)){
											console.log(this.h5Url);
										}else{
											this.h5Url = "http://" + this.h5Url
										}					
									}			
										this.ruleForm.moduleData = this.h5Url;
							  }else{
							  	this.ruleForm.moduleData = this.checkedobj.id;
							  };

            if(this.ruleForm.id){
                Service.appStartAdEdit(this.ruleForm).then((res) => {
                    this.$message({
                        type: 'success',
                        message: '修改成功！'
                    });
                    this.$router.push({
                      path: '/system/appAdvertisement/list'
                   })
                 
              }).catch((res) => {
                console.log('error ', res);
                this.$message({
                  type: 'error',
                  message: res.message
                });  
              })  
            }else{
                Service.appStartAdAdd(this.ruleForm).then((res) => {
                    this.$message({
                        type: 'success',
                        message: '添加成功！'
                    });
                    this.$router.push({
                      path: '/system/appAdvertisement/list'
                   })
                 
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
      //回显
      getInfo() {
        let id = this.$route.query.id;
        if (!id) return;
        this.editStatus = true;
        Service.appStartAdInfo({id:id}).then( (res) => {
            this.ruleForm = res;
            this.ruleForm.onLineStart = new Date(res.onLineStart);
            this.ruleForm.onLineEnd = new Date(res.onLineEnd);
            let vm = this;
            if(res.moduleDataList.length!=0){	    		
	  	    		this.checkedobj = res.moduleDataList[0];  
	  	    		this.ruleForm.moduleData= this.checkedobj.id;
            } 
            console.log(res.apps);
            res.apps.forEach((item)=>{    //循环遍历数组
              vm.ruleForm.appIds = item.appId
            }); 

            	if(res.moduleType == "none" ){
                this.pageType=1;
                this._getProductList(this.productForm,true); 
             }
              if(res.moduleType == 'goods'){
               			this.pageType=1;
               			this._getProductList(this.productForm,true); 
              }
              if(res.moduleType == 'goods_group'){
               			this.pageType=2;
										this._getProductGroupList(this.groupform,true); 
              }
              if(res.moduleType == 'brand'){
               			this.pageType=3;
               			this._brandListBrandEmpower(this.brandForm,true);
               			
              }
              if(res.moduleType == 'url'){
                    this.pageType=4
                    this.h5Url = res.moduleData;
              }

            this.ruleForm.moduleType = res.moduleType;
        });
      },
			_getProductList(opt, empty) {
				getProductList(opt).then((res) => {

					if(empty) {
						this.productList = res.data;
					} else {
						this.productList = this.productList.concat(res.data);
					}	
				}).catch((res) => {
					this.$message({
						type: 'error',
						message: res.message
					})
				})
			},
			_brandListBrandEmpower(opt,empty){
				brandListBrandEmpower(opt).then((res)=>{
					if(empty) {
						this.brandList = res.data;

					} else {
						this.brandList = this.brandList.concat(res.data);
					}					
					
				}).catch((res)=>{
					this.$message({
						type: 'error',
						message: res.message
					})					
				})
			},
			_getProductGroupList(opt,empty){
				getProductGroupList(opt).then((res)=>{
					if(empty) {
						this.productGroupList = res.data;

					} else {
						this.productGroupList = this.productGroupList.concat(res.data);
					}							
				}).catch((res)=>{
						this.$message({
							type: 'error',
							message: res.message
						})							
				})
			},

       
      
    },
    mounted() {
    this.getInfo();
	    if(!this.$route.query.id){
	    	 this._getProductList(this.productForm,true); 
	    }
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

  .avatar-uploader .el-upload {
    
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
   .avatar-uploader-icon:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
  	border: 1px dashed #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  
  .pageSet{
  	width: 760px;
  	height: 400px;
  	border: 1px solid gainsboro;
  	.p_header{
  		padding: 10px;
  		height: 60px;
  		border-bottom: 1px solid gainsboro;
  	}
  	.prolistCon{
  		display: inline-block;
  		width: 49%;
  		height: 340px;
  		padding: 10px;
  		&.allpro{
  			border-right:1px solid gainsboro ;
  			overflow: auto;
  		}
  		&.proChecked{
  			float: right;
  			margin-right: 15px;
  		}
  		.proList{
  			width: 100%;
  			li{
  				position: relative;
  				overflow: hidden;
  				width: 100%;
  				height:80px;
  				margin-bottom: 5px;
  				padding-left: 10px;
  				border: 1px solid gainsboro;
  				display: flex;
  				.checked{
  					position: absolute;
  					height: 20px;
  					line-height: 20px;
  					text-align: center;
  					width: 65px;
  					transform: rotateZ(-45deg);
  					top: 59px;
  					font-size: 12px;
  					right: -18px;
  					background:#67C23A ;
  					color: #FFFFFF;
  					i{
  						transform: rotateZ(45deg);
  					}					
  				}
  				.proimg{
  					flex: 0 0 70px;
  					padding-top: 8px;
  					img{
  						height: 60px;
  						width: 60px;
  					}
  				}
  				.name{
  					padding-top: 10px;
  					overflow: hidden;
  					flex: 1;
  					padding-left: 10px;
  					p{
  						font-size: 12px;
  						line-height: 18px;
  						color: #333333;
  						&.sku{
  							margin-top: 5px;
  							color: #999999;
  						}
  					}
  				}
  				
  				
  			}
  		}
  	}
  	.urlInput{
  		padding:20px;
  	}
  }
  
</style>
