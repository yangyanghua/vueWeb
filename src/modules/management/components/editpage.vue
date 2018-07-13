<template>
	<main-wrapper>
		<div slot="header">
			品牌管理
		</div>

		<div slot="main">
			<div class="storeContent">
				<h2 class="s_title">
						<span>品牌展示页编辑</span>
						<el-button style="float: right;"  type="primary" @click="saveEdit"  size="small" >保存</el-button>
				</h2>
				<div class="store">
						<div class="s_header pPiece" v-bind:style="{backgroundImage: 'url(' + brandForm.background + ')'}" >
							<div class="storeInfo">							
								<div class="s_logo">
									<img :src="brandDetail.brand.logoUrl"/>
								</div>
								<div class="s_name">
									<h1>{{brandDetail.brand.name}}</h1>
									<h2>
										<span>全程溯源</span>
										<span>则造商直供</span>
									</h2>
								</div>							
							</div>
							
								<div class=" piece">
									<p class="editTitlt">品牌背景</p>
									<el-form label-width="0">
										<el-form-item label="">
											<div class="bgUpload">
												<el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeAvatarUploadBG">
													<img v-if="brandForm.background" :src="brandForm.background" class="avatar">
													<i v-else class="el-icon-plus avatar-uploader-icon"></i>
												</el-upload>
											</div>
											<p style="color: #999999;font-size: 12px;">建议尺寸750*350像素</p>
										</el-form-item>
										<!--<el-form-item label="链接：" label-width="60px">
															<el-select v-model="value" placeholder="请选择">
																<el-option label="链接1" value="001">
																</el-option>
															</el-select>
														</el-form-item>-->
									</el-form>
								</div>							
						</div>
					
					<div class="storebody">
						<div class="banner pPiece">
							<p class="flag">真知码全球质量溯源体系成员</p>
							<p class="txt">真品宣言：</p>
							<p class="txt">
								闪购平台与品牌供应商直接合作，使用自主知识产权的真知码技术，引入第三方检测机构，实现工厂级别溯源，确保每一件商品都是真品。
							</p>

						</div>

						<div class="proContent " style="margin-top: 10px;padding-top: 10px;">
							<ul class="porList">
								<li class="proItem pPiece" v-for="(item,index) in recommends" v-if="item.showType!=1" v-bind:class="{'isedit':item.edit}" >
									<p class="deleteRecom el-icon-close" @click="deleteRecom(index)" ></p>
									<div class="recmContent" @click="handlEdit(index)" >
										<img :src="item.image" />
									</div>
									
									<div class="piece" style="left: 114%;" v-if="item.edit">
										<p class="editTitlt">精选推荐</p>
										<el-form label-width="0">
											<el-form-item label="">
												<div class="bgUpload">
													<el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeAvatarUpload">
														<img v-if="recomEditForm.image" :src="recomEditForm.image" class="avatar">
														<i v-else class="el-icon-plus avatar-uploader-icon"></i>
													</el-upload>
													<p style="color: #999999;font-size: 12px;">建议尺寸750*350像素</p>
												</div>
											</el-form-item>

											<el-form-item label="" label-width="0px">
												<p>关联链接（选填）：</p>
												  <el-input placeholder="请输入内容" @blur="setUrltoForm" v-model="recomEditForm.url">
												    <template slot="prepend">Http://</template>
												  </el-input>
											</el-form-item>
										</el-form>
									</div>

								</li>
								<li class="addRem">
									<el-button type="text" icon="el-icon-plus" @click="addrecommend">添加推荐</el-button>
								</li>
							</ul>
						</div>
						<h2 class="title" style="margin-top: 10px;" >精选商品</h2>
						<div class="proContent pPiece" style="min-height: 900px;">
							<ul class="porList">
								<li class="proItem pPiece" v-for="(item,index) in recommends" v-if="item.showType == 1" v-bind:class="{'isedit':item.edit}" >
									<!--<p class="deleteRecom el-icon-close" @click="deleteRecom(index)" ></p>-->
									<div class="recmContent" @click="handlEdit(index)" >
										<img :src="item.image" />
									</div>
									<div class="piece" style="left: 114%;" v-if="item.edit">
										<p class="editTitlt">精选广告</p>
										<el-form label-width="0">
											<el-form-item label="">
												<div class="bgUpload">
													<el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeAvatarUpload">
														<img v-if="recomEditForm.image" :src="recomEditForm.image" class="avatar">
														<i v-else class="el-icon-plus avatar-uploader-icon"></i>
													</el-upload>
													<p style="color: #999999;font-size: 12px;">建议尺寸750*350像素</p>
												</div>
											</el-form-item>
											<el-form-item label="" label-width="0px">
												<p>关联链接（选填）：</p>	
												  <el-input placeholder="请输入内容" @blur="setUrltoForm" v-model="recomEditForm.url">
												    <template slot="prepend">Http://</template>
												  </el-input>
											</el-form-item>
										</el-form>
									</div>

								</li>								
							</ul>							
							<ul class="proList1">
									<li  class="proItem" v-for="item in brandDetail.simpleVOS" >
										<img :src="item.image"/>
										<p class="proName">{{item.productName}}</p>
										<p class="price">¥{{item.maxPrice}}{{'~¥'+item.minPrice}}</p>
										<span class="collection"></span>
									</li>	
							</ul>
							<div class="piece" style="top: 460px;width: 528px;">
								<p class="editTitlt">精选商品</p>
								<div class="proContentCois">
									<div class="classificationGoods">
										<div class="classifList">
											<ul class="classList">
												<li class="classItem ischeck" @click="loadAllpro">全部商品</li>
											</ul>
										</div>
									</div>
									<div class="proListContent">
										<div style="width: 60%;margin: auto;margin-top: 5px;margin-bottom: 5px;">
											<el-input placeholder="请输入内容" v-model="productForm.productName" size="mini" class="input-with-select">
												<el-button slot="append" @click="seachProduct" icon="el-icon-search"></el-button>
											</el-input>
										</div>
										<div class="proList" @scroll="loadMorePro" id="productList">
											<ul class="proUl">
												<li class="proItem " v-for="item in productList" :title="item.productName" v-bind:class="{'ischeck':productIds.indexOf(Number(item.id))!=-1}" @click="checkPro(item)">
													<img :src="item.image" />
													<span class="active"><i class="gou el-icon-check"></i></span>
												</li>
											</ul>
											<!--<p style="font-size: 14px;color: #999999;text-align: center;" v-if="productList.length==0">暂无数据</p>-->
										</div>
									</div>
								</div>								
							</div>
						</div>
					</div>
				</div>

			</div>

		</div>
	</main-wrapper>
</template>

<script>
import {getBrandForEdit,getProductForBrand,updateBrandForShow} from '@/common/service/management/index.js'	
import moreChoice from '@/components/moreChoice/index.vue';
import {getUploadImgSrc} from '@/common/service/common.js';
import * as Code from '@/common/js/code.js';	

	export default {
		data() {
			return {
				loading:false,
				proList: [],
				editIndex: 0,
				productList:[],	
				productIds:[],
				oldProductIds:[],
				addProductIds:[],
				deleteProductIds:[],
				recomEditForm:{
					image:'',
					url:'',
				},
		        productForm: {
		          productName:'',
		          currentPage: 1,
		          pageSize: 20,
		          brandId: '',
		        },

				brandDetail:{
					brandShows:[],
					brand:[],
					simpleVOS:[],
				},	
				brandForm:{
					brandId:'',
					background:'',
					newShows:[],
					delShowsId:[],
					newProductId:[],
					oldProductId:[]
				},
			    recommends:[],
			    oldRecommends:[],
				storeDetail: {
					recommends: [],
					simples: [],
					store: {},
					showCouponInfoVos:[],
					noShowCouponInfoVos:[],
				},
			}
		},
		filters: {

		},
	
		methods: {
			  setUrltoForm(){
				var rge = /^(http:\/\/).*/;
				var rge1 = /^(https:\/\/).*/;
				if(this.recomEditForm.url){
					if(rge.test(this.recomEditForm.url) || rge1.test(this.recomEditForm.url)){
						console.log(this.recomEditForm.url);
					}else{
						this.recomEditForm.url = "http://" + this.recomEditForm.url
					}					
				}			
				this.recommends[this.editIndex].url = this.recomEditForm.url
			  },
				loadMorePro() {
					let productBox = document.getElementById('productList');
					if(productBox.scrollTop == productBox.scrollHeight - 300) {
						this.productForm.currentPage++;
						this._getProductForBrand(this.productForm,false);
					}
				},
				loadAllpro() {
					this.productForm.productName = '';
					this.productForm.currentPage = 1;
					this._getProductForBrand(this.productForm,true);
				},
				seachProduct() {
					this.productForm.currentPage = 1;
					this._getProductForBrand(this.productForm, true);
				},				
				checkPro(product) {
					let vm = this;
					if(this.productIds.indexOf(product.id) != -1) {
						this.productIds.splice(this.productIds.indexOf(product.id), 1)
						this.brandDetail.simpleVOS.forEach((item,index)=>{
							if(item.id==product.id){
								vm.brandDetail.simpleVOS.splice(index,1);
							}
						})
					} else {

						this.productIds.push(product.id);
						this.brandDetail.simpleVOS.push(product);  							
					}

					if(this.oldProductIds.indexOf(product.id) == -1) {
						if(this.addProductIds.indexOf(product.id) == -1) {
							this.addProductIds.push(product.id);
						} else {
							this.addProductIds.splice(this.addProductIds.indexOf(product.id), 1)
						}
					} else {
						if(this.deleteProductIds.indexOf(product.id) == -1) {
							this.deleteProductIds.push(product.id);
						} else {
							this.deleteProductIds.splice(this.deleteProductIds.indexOf(product.id), 1)
						}
					}
					console.log(this.oldProductIds);
					console.log(this.productIds);
					console.log(this.deleteProductIds);
				},
			saveEdit(){
			 	
			 	let vm = this;
				this.brandForm.newProductId = this.addProductIds;
				this.brandForm.oldProductId = this.deleteProductIds;
				
				vm.brandForm.delShowId = []; 
				vm.brandForm.newShows = []; 
				for(let i = 0;i < this.recommends.length ; i++){
					this.recommends[i].edit = false;
				};

				this.oldRecommends.forEach((item,index)=>{
						vm.brandForm.delShowId.push(item.id);
				})	
				let isEveryPass = this.recommends.every(item=>item.image!=='');   
				if(!isEveryPass){				   
							vm.$message({
								type:'error',
								message:'请上传推荐主图',
							})
						return false;						
				}
				this.recommends.forEach((item,index)=>{
					vm.brandForm.newShows.push({url:item.url,image:item.image,showType:item.showType,})
				})
				this._updateBrandForShow(this.brandForm);

			},

			deleteRecom(index){
				this.recommends.splice(index,1);
			},
			beforeAvatarUploadBG(file) {
				const isJPG = file.type === 'image/jpeg';
				const isPNG = file.type === 'image/png';
				const isLt2M = file.size / 1024 / 1024 < 2;
				if(!isJPG&&!isPNG) {
					this.$message.error('上传图片只能是 JPG/PNG格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传图片大小不能超过 2MB!');
				}
				
				getUploadImgSrc(file).then((res)=>{
					
					this.brandForm.background = res;
					
				}).catch((res)=>{
					this.$message({
						type:'error',
						message:res.message
					})
				})

				return false;
			},
			beforeAvatarUpload(file){

				const isJPG = file.type === 'image/jpeg';
				const isPNG = file.type === 'image/png';
				
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isJPG&&!isPNG) {
					this.$message.error('上传图片只能是 JPG、PNG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传图片大小不能超过 2MB!');
				}
				getUploadImgSrc(file).then((res)=>{
					
					this.recommends[this.editIndex].image = res; 
				
				}).catch((res)=>{
					this.$message({
						type:'error',
						message:res.message
					})
				})

				return false;
			},		
			handlEdit(index) {				
				this.editIndex = index;
				this.recomEditForm = this.recommends[index];

				for(let i = 0; i < this.recommends.length; i++) {
					this.recommends[i].edit = false;
				}
				this.recommends[index].edit = true;
			},
			addrecommend() {	
				this.recommends.push({
						id:'',
						image:'',
						url:'',
						edit:false,
						showType:'0'	///	类型 0 精选推荐 1 精选广告是 
				})
			},
			_getBrandForEdit(id){
				getBrandForEdit({brandId:id}).then((res)=>{
					this.brandForm.brandId = res.brand.id;
					this.brandForm.background = res.brand.background;
					this.recommends = [];
					this.productIds = [];
					this.oldProductIds = [];
					let vm = this;
					res.simpleVOS.forEach((item)=>{
						vm.productIds.push(item.id);
						vm.oldProductIds.push(item.id);
					})	
					if(res.brandShows.length==0){
						this.recommends = [{
							id:'',
							image:'',
							url:'',
							edit:false,
							showType:1	///	类型 0 精选推荐 1 精选广告是 							
						}];			
					}else{
			            res.brandShows.forEach((item,index)=>{		  
							vm.recommends.push({...item,edit:false})
							vm.oldRecommends.push({...item});
			            })						
					}
					

					this.brandDetail = res;
				}).catch((res)=>{
					this.$message({
						type:'error',
						message:res.message
					})
				})
			},
			_getProductForBrand(opt,empty){
				getProductForBrand(opt).then((res)=>{
					if(empty) {
						this.productList = res;
					} else {
						this.productList = this.productList.concat(res);
					}					
					
				}).catch((res)=>{
					this.$message({
						type:'error',
						message:res.message
					})					
				})
			},
			_updateBrandForShow(opt){
				updateBrandForShow(opt).then((res)=>{
						this.$message({
						type:'success',
						message:'保存成功'
					})
					this.$router.push({
						path: '/management/brandManagement/brandindex',
						query: {id:opt.brandId}
					})	
				}).catch((res)=>{
					this.$message({
						type:'error',
						message:res.message
					})						
				})
			}
		},
		mounted() {
			this._getBrandForEdit(this.$route.query.id);
			this.productForm.brandId = this.$route.query.id;
			this._getProductForBrand(this.productForm,true);
			
		}

	}
</script>

<style lang="scss" scoped>
	.storeContent {
		background: #FFFFFF;
		padding: 10px;
		padding-bottom: 80px;
	}
	
	.pPiece {
		position: relative;
		.piece {
			position: absolute;
			left: 110%;
			background: #FFFFFF;
			top: 20px;
			margin-bottom: 30px;
			padding: 10px;
			border-radius: 6px;
			min-height: 100px;
			border: 1px solid $color-border-efe;
			width: 450px;
		}
		.piece::before {
			content: '';
			position: absolute;
			height: 25px;
			width: 25px;
			background: #FFFFFF;
			left: -14px;
			top: 20px;
			transform: rotateZ(45deg);
			border: 1px solid $color-border-efe;
			border-top: none;
			border-right: none;
		}
		.editTitlt {
			margin-bottom: 10px;
			font-size: $fontSize-h3;
			color: #999999;
		}
		.bgUpload {
			margin-top: 10px;
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
				border: 1px dashed #d9d9d9;
				font-size: 18px;
				color: #8c939d;
				width: 350px;
				height: 180px;
				line-height: 180px;
				text-align: center;
			}
			.avatar {
				width: 350px;
				height: 180px;
				display: block;
			}
		}
	}
	
	.store {
		width: 375px;
		height: auto;
		display: inline-block;
		margin-left: 180px;
		min-height: 400px;
		margin-top: 30px;
		background: #EFEFF4;
	}

	.s_header{
		width:374px;
		position: relative;
		height:210px;
		background:url(../../../assets/images/edit/u507.png) no-repeat 50% 50%;
		background-size:cover ;		
		.storeInfo{
			width: 100%;
			height: 150px;
			position: absolute;
			left: 0;
			z-index: 5;
			bottom: 0;
			.s_logo{
				text-align: left;
				width: 100%;
				padding-left: 20px;
				height: 70px;
				img{
					margin-top: 10px;
					height: 60px;
					width: 60px;
				}
			}
			.s_name{
				width: 100%;
				height: 100px;
				padding-left: 20px;
				margin-top: 10px;
				h1{
					color:#FFFFFF ;
					font-size: 15px;
					width: 100%;
					height: 25px;
					overflow: hidden;
				}
				h2{
					margin-top: 5px;
					span{
						padding:5px 10px;
						background: #D9D9D9;
						border-radius:100px;
						font-size: 12px;
						color: #000000;
					}				
				}
			}
		}
		
	}
	.s_header::before{
		content: '';
		background:rgba(3,3,3,0.3);
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}
	
	
	.storebody {
		border: 1px solid $color-border-efe;
		border-top: none;
		width: 375px;
		.banner {
			background: #FFFFFF;
			padding: 10px;
			height:180px;
			width: 100%;
			.flag{
				height: 35px;
				line-height: 35px;
				width: 100%;
				margin: auto;
				margin-top: 10px;
				text-align: left;
				background: #CAAE86;
				color: #FFFFFF;
				font-size: 14px;
				padding:0 20px;
				margin-bottom: 20px;
			}
			.txt{
				margin-bottom: 5px;
				font-size: 12px;
				color: #999999;
			}
		}
		.title{
			position: relative;
			margin-top: 10px;
			height: 40px;
			line-height: 40px;
			text-align: left;
			padding-left: 30px;
			font-size: 14px;
			color: #999999;
			background: #FFFFFF;
		}
		.title::before{
			content: '';
			position: absolute;
			top: 13px;
			left: 10px;
			height: 14px;
			width: 3px;
			transform: rotateZ(20deg);
			background: #099FDE;				
		}
		.title::after{
			content: '';
			position: absolute;
			top: 13px;
			left: 18px;
			height: 14px;
			width: 3px;
			transform: rotateZ(20deg);
			background: #099FDE;
			opacity: 0.6;				
		}	
		.proContent {
			width: 100%;
			min-height: 500px;
			padding: 10px;
			padding-top: 0;
			background: #FFFFFF;
			.porList {
				position: relative;
				margin-bottom: 10px;
				img {
					width: 100%;
					height: 180px;
				}
				.proName {
					min-height: 25px;
					margin-top: 10px;
					font-size: 14px;
					color: #4A4A4A;
					line-height: 18px;
				}
				.price {
					font-size: 14px;
					color: #FF3D4F;
					margin-top: 5px;
				}
				.proItem {
					margin-bottom: 20px;
					position: relative;
					border: 1px solid #FFFFFF;
					&.isedit {
						border: 1px dashed #409EFF;
					}
					.deleteRecom{
						cursor: pointer;
						display: none;
						font-size: 14px;
						right: -10px;
						top: -10px;
						position: absolute;
						color: #FE417B;
						width: 20px;
						height: 20px;
						text-align: center;
						line-height: 20px;
						border: 1px solid  #FE417B;
						border-radius:50%;
						
					}
					
				}
				.proItem:hover {
					border: 1px dashed #409EFF;
				}
				.proItem:hover .deleteRecom {
					display: block;
				}				
				
				.collection {
					position: absolute;
					display: inline-block;
					height: 30px;
					width: 30px;
					right: 0;
					bottom: 20px;
					background-size: 20px 20px;
				}
			}
			.proList1 {
				text-align: left;
				width: 100%;
				.proItem:nth-child(2n-1) {
					margin-right: 3px;
				}
				.proItem {
					margin-bottom: 10px;
					display: inline-block;
					box-sizing: border-box;
					width: 49.5%;
					img {
						width: 100%;
						height: 191px;
					}
					.proName {
						margin-top: 10px;
						text-align: left;
						font-size: 13px;
						color: #4A4A4A;
						line-height: 15px;
					}
					.price {
						text-align: left;
						margin-top: 8px;
						font-size: 13px;
						color: #FF3D4F;
						line-height: 12px;
					}
				}
			}
		}
	}
	
	.addRem {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}

.proContentCois {
		width: 507px;
		min-height: 160px;
		border: 1px solid $color-border-efe;
		display: flex;
	}
	
	.classificationGoods {
		flex: 0 0 100px;
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