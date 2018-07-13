<template>
	<main-wrapper>
		<div class="toph" slot="header">
			<span>商品组</span>
		</div>
		<div slot="main" class="com-block-bg media">
			<div class="ml_header">
				<span>{{isEdit?'编辑':'新增'}}商品组</span>
			</div>
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
					<el-form-item label="商品组名称：" prop="name">
						<el-input style="width: 500px;" v-model="ruleForm.name" placeholder="输入商品组名称"></el-input>
					</el-form-item>

					<el-form-item label="Banner图片：" prop="imgUrl">
						<el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeAvatarUpload">
							<img v-if="ruleForm.imgUrl" :src="ruleForm.imgUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择商品：">
						<div class="proContent">
							<div class="classificationGoods">
								<div class="classifList">
									<ul class="classList">
										<li class="classItem ischeck" @click="loadAllpro">全部商品</li>
									</ul>
								</div>
							</div>
							<div class="proListContent">
								<div style="width: 60%;margin: auto;margin-top: 5px;margin-bottom: 5px;">
									<el-input placeholder="请输入内容" v-model="productForm.name" size="mini" class="input-with-select">
										<el-button slot="append" @click="seachProduct" icon="el-icon-search"></el-button>
									</el-input>
								</div>
								<div class="proList" @scroll="loadMorePro" id="productList">
									<ul class="proUl">
										<li class="proItem" v-for="item in productList" :title="item.productName" v-bind:class="{'ischeck':ruleForm.productIds.indexOf(item.id||item.productId)!=-1}" @click="checkPro(item.id)">
											<img :src="item.image" />
											<span class="active"><i class="gou el-icon-check"></i></span>
										</li>
									</ul>
									<p style="font-size: 14px;color: #999999;text-align: center;" v-if="productList.length==0">暂无数据</p>
								</div>
							</div>
						</div>
					</el-form-item>
				</el-form>
				<div class="btnBox" style="padding: 30px 0;text-align: center;">
					 <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
				</div>
			</div>


		</div>

	</main-wrapper>
</template>

<script>
	import {
		productGroupInfo,
		getProductList,
		productGroupAdd,
		productGroupUpdata
	} from '@/common/service/goodsGroup/index.js'
	import { getUploadImgSrc } from '@/common/service/common.js'

	export default {
		data() {
			return {
				isEdit: false,
				productList: [],
				ruleForm: {
					name: '',
					imgUrl: '',
					productIds: [],
				},
				productForm: {
					name: '',
					p: 1,
					pSize: 20
				},
				groupDetail: {},
				rules: {
					name: [{
						required: true,
						message: '请输入商品组名称',
						trigger: 'blur'
					}, ],
					imgUrl: [{
						required: true,
						message: '请上传商品组banner图',
						trigger: 'blur'
					}, ]
				}
			}
		},

		methods: {
			checkPro(id) {
				if(this.ruleForm.productIds.indexOf(id) != -1) {
					this.ruleForm.productIds.splice(this.ruleForm.productIds.indexOf(id), 1)
				} else {
					this.ruleForm.productIds.push(id);
				}
			},
			loadMorePro() {
				let productBox = document.getElementById('productList');
				if(productBox.scrollTop == productBox.scrollHeight - 300) {
					this.productForm.p++;
					this._getProductList(this.productForm, false);
				}
			},
			seachProduct() {
				this.productForm.p = 1;
				this._getProductList(this.productForm, true);
			},
			loadAllpro() {
				this.productForm.name = '';
				this.productForm.p = 1;
				this._getProductList(this.productForm, true);
			},

			editGroup(id) {
				this.isEdit = true;
				productGroupInfo({
					id: id
				}).then((res) => {
					let ids = res.productIds.split(','); 
					for(let i=0;i < ids.length;i++){
						ids[i]  =  Number(ids[i]);
					};		
					this.groupDetail = res;
					this.ruleForm = {
						name: res.name,
						imgUrl: res.imgUrl,
						productIds: ids,
						id: res.id
					};

				}).catch((res) => {
					this.$message({
						type: 'error',
						message: res.message
					})
				})
			},



			submitForm(formName) {

				this.$refs[formName].validate((valid) => {
					if(valid) {
						let opt = {
							name: this.ruleForm.name,
							imgUrl: this.ruleForm.imgUrl,
							productIds: this.ruleForm.productIds.join(',')
						};
						if(this.isEdit) {
							opt.id = this.ruleForm.id;
							this._productGroupUpdata(opt);
						} else {
							this._productGroupAdd(opt);
						}

					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isJPG) {
					this.$message.error('上传图片只能是 JPG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传图片大小不能超过 2MB!');
				}
				getUploadImgSrc(file).then((res) => {
					this.ruleForm.imgUrl = res;
				}).catch((res) => {
					this.$message({
						type: 'error',
						message: res.message
					})
				})

				return false;
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
			_productGroupAdd(opt) {
				//诡异的传参
				productGroupAdd({
					"moduleProductGroup": opt
				}).then((res) => {
					this.$message({
						type: 'success',
						message: '新增成功'
					})
					
					if(this.$route.query.path){
				        this.$router.push({
				          path:this.$route.query.path,
				          query:{
				            productGroupId:res.productGroupId
				          }			          
				        })							
					}else{				
				       this.$router.push({
				          path:'/goodsGroup/list',
				        })							
					}
				}).catch((res) => {
					this.$message({
						type: 'error',
						message: res.message
					})
				})
			},

			_productGroupUpdata(opt) {
				productGroupUpdata({
					"moduleProductGroup": opt
				}).then((res) => {
					this.$message({
						type: 'success',
						message: '修改成功'
					})
			        this.$router.push({
			          path:'/goodsGroup/list',
			        })	
				}).catch((res) => {
					this.$message({
						type: 'error',
						message: res.message
					})
				})
			}

		},
		mounted() {
			if(this.$route.query.id){
				this.editGroup(this.$route.query.id);
			}
			this._getProductList(this.productForm, true);
		}

	}
</script>

<style lang="scss" scoped>
	.ml_header {
		height: 50px;
		line-height: 50px;
		padding: 0 20px;
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
		width: 320px;
		height: 150px;
		line-height: 150px;
		text-align: center;
	}
	
	.avatar {
		width: 300px;
		height: 150px;
		display: block;
	}
	
	.proContent {
		width: 600px;
		min-height: 160px;
		border: 1px solid $color-border-efe;
		display: flex;
	}
	
	.classificationGoods {
		flex: 0 0 120px;
		border-right: 1px solid $color-border-efe;
		h2 {
			height: 40px;
			line-height: 40px;
			font-size: $fontSize-h3;
			text-align: center;
		}
	}
	
	.proListContent {
		width: 100%;
	}
	
	.proList {
		width: 100%;
		max-height: 300px;
		overflow-y: auto;
		.proUl {
			padding: 10px;
			width: 100%;
			.proItem {
				position: relative;
				width: 70px;
				height: 70px;
				overflow: hidden;
				cursor: pointer;
				display: inline-block;
				margin-left: 10px;
				margin-bottom: 10px;
				border: 2px solid #FFFFFF;
				&.ischeck {
					border: 2px solid #67C23A;
					.active {
						display: block;
					}
				}
				img {
					width: 68px;
					height: 68px;
				}
				.active {
					display: none;
					position: absolute;
					bottom: -5px;
					right: -15px;
					transform: rotateZ(-45deg);
					height: 20px;
					color: #FFFFFF;
					text-align: center;
					line-height: 20px;
					width: 40px;
					background: #67C23A;
					.gou {
						transform: rotateZ(40deg);
					}
				}
			}
		}
	}
	
	.classList {
		width: 100%;
		.classItem {
			width: 100%;
			text-align: left;
			padding-left: 20px;
			overflow: hidden;
			height: 30px;
			line-height: 30px;
			cursor: pointer;
			&.ischeck {
				color: #409EFF;
				background-color: $color-bj-shallow;
			}
		}
		.classItem:hover {
			background-color: $color-bj-shallow;
			color: #666666;
		}
	}
</style>