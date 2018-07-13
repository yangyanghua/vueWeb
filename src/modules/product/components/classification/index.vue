<template>
	<main-wrapper>
		<div class="toph" slot="header">
			<span>商品品类</span>

		</div>

		<div slot="main" class="com-block-bg media">
			<div class="cl_header">
				<span>品类列表</span>
			</div>
			<div class="tableContent">
				<div class="Level Level1">
					<h2>一级品类</h2>
					<div class="addBtn">						
						<el-button type="text" size="mini" icon="el-icon-plus" @click="addClssify(1)" >添加品类</el-button>
					</div>					
					<ul class="LevelList Level1List">
						<li  v-for="(item,index) in classifyList">
								<div class="LevelItem" v-bind:class="{'active':item.active}" @click="showLeve2(item.id,index,item.classifyName)" >
									<p class="calssImg"><img :src="item.logoUrl"/></p>
									<p class="calssName">
									<span>{{item.classifyName}}</span>
									<span class="rightIocn el-icon-arrow-right"></span>
								</p>							
							</div>
						<div class="btnBox">							
							<p class="editBtn el-icon-edit-outline" @click="edit(item,index,1)" ></p>
							<p class="deleteBtn el-icon-delete" @click="_classifyDelete(item.id,index,1)"></p>
						</div>	
						</li>					
					</ul>
					<p style="text-align: center;margin-top: 20px;color: #999999;" v-if="classifyList.length<=0" >暂无数据</p>
				</div>
				<div class="Level Level2">					
					<h2>二级品类</h2>
					<div class="addBtn">						
						<el-button v-if="classifyList.length>0" type="text" size="mini" icon="el-icon-plus" @click="addClssify(2)" >添加品类</el-button>
					</div>					
					<ul class="LevelList Level1List">
						<li  v-for="(item,index) in classifyLeve2List" >
							<div class="LevelItem" v-bind:class="{'active':item.active}" @click="showLeve3(item.id,index,item.classifyName)" >
								<p class="calssImg"><img :src="item.logoUrl"/></p>
								<p class="calssName">
								<span class="name">{{item.classifyName}}</span>
								<span class="rightIocn el-icon-arrow-right"></span>
							</p>							
						</div>
						<div class="btnBox">							
							<p class="editBtn el-icon-edit-outline" @click="edit(item,index,2)" ></p>
							<p class="deleteBtn el-icon-delete" @click="_classifyDelete(item.id,index,2)"></p>
						</div>							
						</li>						
					</ul>
					<p style="text-align: center;margin-top: 20px;color: #999999;" v-if="classifyLeve2List.length<=0" >暂无数据</p>
				</div>				
				<div class="Level Level3">
					<h2>三级品类</h2>
					<div class="addBtn" >			
						<el-button v-if="classifyLeve2List.length>0" type="text" size="mini" icon="el-icon-plus" @click="addClssify(3)" >添加品类</el-button>
					</div>					
					<ul class="LevelList Level1List">
						<li  v-for="(item,index) in classifyLeve3List" >
							<div class="LevelItem">
								<p class="calssImg"><img :src="item.logoUrl"/></p>
								<p class="calssName">
								<span class="name">{{item.classifyName}}</span>
								</p>							
						</div>
						<div class="btnBox">							
							<p class="editBtn el-icon-edit-outline" @click="edit(item,index,3)" ></p>
							<p class="deleteBtn el-icon-delete" @click="_classifyDelete(item.id,index,3)"></p>
						</div>							
						</li>
					</ul>
					<p style="text-align: center;margin-top: 20px;color: #999999;" v-if="classifyLeve3List.length<=0" >暂无数据</p>
				</div>					
				

			</div>
			<!--
	作者：1063676593@qq.com
	时间：2018-03-27
	描述：转移商品
			-->

			<el-dialog title="增加类目" :visible.sync="transferProDialog" width="50%">

				<el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">

					<el-form-item label="类目名称：" prop="classifyName">
						<el-input v-model="addForm.classifyName"></el-input>
					</el-form-item>

					<el-form-item label="上级类目：">
						<p>{{pName}}</p>
					</el-form-item>

					<el-form-item label="排序：" prop="sortValue">
						<el-input type="number" style="width: 100px;" v-model="addForm.sortValue"></el-input>
					</el-form-item>

					<el-form-item label="类目图标：" prop="sortValue">

						<el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeAvatarUpload">
							<img v-if="addForm.logoUrl" :src="addForm.logoUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>

					</el-form-item>

					<el-form-item>
					<div style="text-align: right;">
					    <el-button @click="transferProDialog = false">取消</el-button>
					    <el-button type="primary" @click="submitForm('addForm')">立即创建</el-button>						
					</div>   
					</el-form-item>


				</el-form>

			</el-dialog>

		</div>
	</main-wrapper>

</template>

<script>
	import { getClassify, classifyAdd ,classifyDelete,classifyUpdate } from '@/common/service/product/index.js'
	import {getUploadImgSrc} from '@/common/service/common.js'
	export default {
		data() {
			return {
				transferProDialog: false,
				addPindex:'',
				pName:'',
				classifyList: [],
				editingIndex:'',
				editingLevel:'',
				classifyLeve2List: [],
				classifyLeve3List: [],
				checkLeve1Id:'',
				checkLeve1Name:'',
				checkLeve2Id:'',
				checkLeve2Name:'',
				addForm: {
					pid: 0,
					classifyName: '',
					sortValue: '',
					logoUrl: '',
					classifyLevel: 1,
				},
				
				rules: {
					classifyName: [{
						required: true,
						message: '请输入品类名称',
						trigger: 'blur'
					}, ]
				}

			}
		},
		methods: {
			edit(row,index,level){
				this.editingIndex =index;
				this.editingLevel = level;				
				if(level==1){
					this.pName = '';				
					this.addForm = {
						pid: 0,
						classifyName: row.classifyName,
						sortValue: index,
						logoUrl: row.logoUrl,
						classifyLevel: 1,
						id:row.id
					}
				}else if(level==2){	
					this.pName  =  this.checkLeve1Name;
					this.addForm = {
						pid: this.checkLeve1Id,
						classifyName: row.classifyName,
						sortValue: index,
						logoUrl: row.logoUrl,
						classifyLevel: 2,
						id:row.id
					}					
				}else if(level==3){
					this.pName  = this.checkLeve2Name;
					this.addForm = {
						pid: this.checkLeve2Id,
						classifyName: row.classifyName,
						sortValue: index,
						logoUrl: row.logoUrl,
						classifyLevel: 2,
						id:row.id
					}					
				}
			 this.transferProDialog = true;	
			},
			showLeve2(id,index,pname){
				this.classifyList.forEach((item)=>{
					item.active = false;
				})
				this.checkLeve1Id = id;
				this.checkLeve1Name = pname;
				
				this.classifyList[index].active = true;
				this._getClassify({'level': 2,'pid':id});
			},
			showLeve3(id,index,pname){
				this.classifyLeve2List.forEach((item)=>{
					item.active = false;
				})
				this.checkLeve2Id = id;
				this.checkLeve2Name = pname;				
				this.classifyLeve2List[index].active = true;
				this._getClassify({'level': 3,'pid':id});				
			},

			//添加品类
			addClssify(level) {
				let vm = this;
				vm.addForm = {
					pid: 0,
					classifyName: '',
					sortValue: '',
					logoUrl: '',
					classifyLevel: 1,
				};				
				if(level==1){
					this.addForm.pid = 0;
					this.addForm.classifyLevel = 1;

				}else if(level==2){
					this.addForm.pid = this.checkLeve1Id;
					this.addForm.classifyLevel = 2;	
					this.classifyList.forEach((item)=>{						
						if(item.id == vm.checkLeve1Id){
							vm.pName = item.classifyName;
						}
					})					
				}else if(level==3){
					this.addForm.pid = this.checkLeve2Id;
					this.classifyLeve2List.forEach((item)=>{
						if(item.id==vm.checkLeve2Id){
							vm.pName = item.classifyName;
						}
					})						
					this.addForm.classifyLevel = 3;						
				}				
				this.transferProDialog = true;
				
		},	
			_getClassify(opt) {
				getClassify(opt).then((res) => {
						res.forEach((item) => {
							item.active = false;
						})					
					 if(opt.level==1){
					 	this.classifyList = res;
						if(res.length!=0){
							this.classifyList[0].active = true;
					 		this.checkLeve1Id = res[0].id
					 		this.checkLeve1Name = res[0].classifyName;
					 		this._getClassify({
									'level': 2,
									'pid': res[0].id
								})							
						}
					 }else if(opt.level==2){
					 	this.classifyLeve2List = res;				 	
						if(res.length!=0){
							this.checkLeve2Id = res[0].id
							this.checkLeve2Name = res[0].classifyName;
							this.classifyLeve2List[0].active = true;
					 		this._getClassify({
									'level': 3,
									'pid': res[0].id
								})							
						}else{
							this.classifyLeve3List=[];
						}
					 }else if(opt.level==3){
					 	this.classifyLeve3List = res;
						if(res.length!=0){
							this.classifyLeve3List[0].active = true;
						}
					 	
					 }	
				}).catch((res) => {
					this.$message({
					type:'error',
					message: res.message
				})
				})
			},
			_classifyAdd(opt) {
				classifyAdd(opt).then((res) => {
							this.$message({
								type:'success',
								message:'添加成功'
							})
						if(opt.classifyLevel==1){
								this._getClassify({'level': 1,'pid': 0});								
						}else if(opt.classifyLevel==2){
							    this._getClassify({'level': 2,'pid': opt.pid});	
						}else if(opt.classifyLevel==3){
								this._getClassify({'level': 3,'pid': opt.pid});	
						}
						this.transferProDialog = false;
						}).catch((res) => {
							this.$message({
								type:'error',
								message:res.message
							})
							
						})

			},
			_classifyUpdate(opt){
				classifyUpdate(opt).then((res)=>{
							this.$message({
								type:'success',
								message:'修改成功'
							})		
					if(this.editingLevel==1){
						this.classifyList[this.editingIndex] = opt;
					}else if(this.editingLevel==2){
						this.classifyLeve2List[this.editingIndex] = opt;
					}else if(this.editingLevel==3){
						this.classifyLeve3List[this.editingIndex] = opt;
					}
					this.transferProDialog = false;
				}).catch((res)=>{
					this.$message.error(res.message);
				})
			},	
			_classifyDelete(id,index,level){
			        this.$confirm('此操作将永久删除该品类, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning',
			          center: true
			        }).then(() => {
						classifyDelete(id).then((res)=>{
							this.$message({
								type:'success',
								message:'删除成功'
							})
							if(level == 1){
								if(!this.classifyList[index].active){
									this.classifyList.splice(index,1);
								}else{
									this._getClassify({'level': 1,'pid': 0});	
								}
							}
							if(level == 2){
								if(!this.classifyLeve2List[index].active){
									this.classifyLeve2List.splice(index,1);
								}else{
									this.classifyLeve2List.splice(index,1);
									if(this.classifyLeve2List.length>0){
										this.classifyLeve2List[0].active = true;
										this._getClassify({'level': 3,'pid': this.classifyLeve2List[0].id});										
									}else{
										this.classifyLeve3List = [];
									}
	
								}								
							}
							if(level == 3){

									this.classifyLeve3List.splice(index,1);							
							}														
						}).catch((res)=>{
							this.$message.error(res.message);
						})
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消删除'
			          });
			        });

			},			
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isPNG = file.type === 'image/png';
				const isLt2M = file.size / 1024 / 1024 < 2;
				if(!isJPG && !isPNG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				getUploadImgSrc(file).then((res)=>{
					this.addForm.logoUrl = res;					
				}).catch((res)=>{
					this.$message.error(res.message);
				})
				
				return false;
			},
		    submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            if(this.addForm.id){
		            	this._classifyUpdate(this.addForm);
		            }else{
		            	this._classifyAdd(this.addForm);
		            }
		           
		            
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		      },			

		},
		mounted() {
			this._getClassify({
				'level': 1,
				'pid': 0
			});
		}

	}
</script>

<style lang="scss" scoped>
	.toph {
		padding-right: $spacing-20;
		text-align: right;
		span {
			float: left;
		}
	}
	
	.cl_header {
		height: 50px;
		line-height: 50px;
		padding: 0 $spacing-20;
		text-align: right;
		span {
			font-size: $fontSize-h3;
			color: $color-heavy;
			float: left;
		}
	}
	
	.tableContent {
		min-height: 400px;
		width: 900px;
		margin: auto;
		padding: $spacing-10;
		display: flex;
		padding-bottom: 30px;
		.addBtn{
			padding-left: 10px;
			height: 30px;
		}
		.Level{
			flex: 1;
			border-right: 1px solid gainsboro;
			h2{
				position: relative;
				font-size: 14px;
				text-align: center;
				margin-bottom: 20px;
			}
			h2::before{
				content: '';
				position: absolute;
				width: 40px;
				height: 2px;
				background: #0074D9;
				bottom: 0;
				left: 50%;
				margin-left: -20px;
			}
			.LevelList{
				width: 100%;
				li{
					position: relative;
				}
				li .btnBox{
					overflow: hidden;
					position: absolute;
					right: 0;
					top: 0;
					height: 60px;
					width: 0;
					transition: all 0.3s;
					p{
						width: 40px;
						height: 30px;
						line-height: 30px;
						text-align: center;
						font-size: 16px;
						color: white;
						cursor: pointer;
					}
					p:hover{
						opacity: 0.8;
					}
					.deleteBtn{
						background: #F04134;
					}
					.editBtn{
						background: #3E74B3;
					}
				}
				li:hover .btnBox{
					width: 40px;
				}
				.LevelItem{
					position: relative;
					height: 60px;
					line-height: 60px;
					text-align: center;
					display: flex;
					cursor: pointer;
					&.active{
						background:$color-bj-shallow;
						color: #099FDE;						
					}
					p{
						font-size: 14px;
					}
					.calssImg{
						flex: 0 0 60px;
						img{
							height: 40px;
							width: 40px;
						}
					}
					.calssName{
						position: relative;
						flex: 1;
						text-align: left;
						padding-left: 10px;
						overflow: hidden;
						.name{
							display: block;
							width: 90%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;							
						}
						.rightIocn{
							display: block;
							position: absolute;
							height: 20px;
							width: 20px;
							right: 10px;
							top: 50%;
							margin-top: -10px;
							font-size: 14px;
							text-align: center;
							line-height: 20px;
						}
					}
					.deleteBtns{
						position: absolute;
						top: -3px;
						right: 10px;
					}
				}
				.LevelItem:hover{
					background:$color-bj-shallow;
					color: #099FDE;
				}
			}
			
		}	
		.Level:last-child{border: none;}
		
	}
	
	.avatar-uploader .el-upload {
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .avatar-uploader-icon:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 20px;
		color: #8c939d;
		width: 100px;
		height: 100px;
		border-radius: 6px;
		line-height: 100px;
		text-align: center;
		border: 1px dashed #d9d9d9;
	}
	
	.avatar {
		width: 100px;
		height: 100px;
		display: block;
	}
</style>