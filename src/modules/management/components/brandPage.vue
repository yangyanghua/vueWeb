<template>
		<main-wrapper>
			<div slot="header">
				品牌管理
			</div>
			
			<div slot="main">
				<div class="storeContent">
					<h2 class="s_title">
						<span>品牌展示页</span>
						<el-button style="float: right;"  type="primary" @click="toEdit"  size="small" >编辑品牌页</el-button>
					</h2>					
					<div class="store">
						<div class="s_header" v-bind:style="{backgroundImage: 'url(' + brandDetail.brand.background + ')'}" >
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

						</div>
						<div class="storebody">
						<div class="banner" >
							<p class="flag">真知码全球质量溯源体系成员</p>
							<p class="txt">真品宣言：</p>
							<p class="txt">
								闪购平台与品牌供应商直接合作，使用自主知识产权的真知码技术，引入第三方检测机构，实现工厂级别溯源，确保每一件商品都是真品。
							</p>
						</div>													
							<div class="proContent" style="margin-top: 10px;">
								<ul class="porList">
									<li  class="proItem"  v-for="item in brandDetail.brandShows" v-if="item.showType==0" >
										<img :src="item.image"/>
									</li>								
								</ul>
							</div>
							<h2 class="title">精选商品</h2>
							<div class="proContent" style="padding-top: 0;">
								<ul class="porList">
									<li  class="proItem"  v-for="item in brandDetail.brandShows" v-if="item.showType==1"  >
										<img :src="item.image"/>
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
								
							</div>							
						</div>
					</div>
					
				</div>

			</div>	
		</main-wrapper>		
</template>

<script>
import {getBrandForEdit} from '@/common/service/management/index.js'
	export default {
		data() {
			return {

			   
				brandDetail:{
					brandShows:[],
					brand:[],
					simpleVOS:[],
				},

			}
		},
		filters: {

		},
		methods: {

			toEdit(){
				this.$router.push({
					path: '/management/brandManagement/pageedit',
					query: {id:this.$route.query.id}
				})			
			},
			_getBrandForEdit(id){
				getBrandForEdit({brandId:id}).then((res)=>{
					this.brandDetail = res;
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
			
		}

	}
</script>

<style lang="scss" scoped>
	.storeContent{
		background: #FFFFFF;
		padding: 10px;
	}
	.s_title{
		height: 30px;
		line-height: 30px;
		font-size:$fontSize-h3;
		color: $color-heavy;
	}
	.store{
		width: 375px;
		height: auto;
		margin: auto;
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
	
	.storebody{
		border: 1px solid $color-border-efe;
		border-top:none ;
		width: 375px;
		.banner{
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
		.proContent{
			width: 100%;
			min-height: 160px;
			padding: 10px;
			background: #FFFFFF;
			.porList{
				position: relative;
				margin-bottom: 10px;
				img{
					width: 100%;
					height: 180px;
				}
				.proName{
					margin-top: 10px;
					font-size: 14px;
					color: #4A4A4A;
					line-height: 18px;					
				}
				.price{
					font-size: 14px;
					color: #FF3D4F;	
					margin-top: 5px;				
				}
				.proItem{
					box-shadow: 0 0 5px 1px #999999;
					margin-bottom: 10px;
					position: relative;
				}
				
				.collection{
					position: absolute;
					display: inline-block;
					height: 30px;
					width: 30px;
					right: 0;
					bottom: 20px;
					
					background-size:20px 20px ;
				}
			}
			.proList1{
				text-align: left;
				width: 100%;
				.proItem:nth-child(2n){
					float: right;
				}
				.proItem{
					margin-bottom: 10px;
					display: inline-block;
					width:49%;
					img{
						width: 100%;
						height: 191px;
					}
					.proName{
						margin-top: 10px;
						text-align: left;
						font-size: 13px;
						color: #4A4A4A;
						line-height: 15px;						
					}
					.price{
						text-align: left;
						margin-top: 8px;
						font-size: 13px;
						color: #FF3D4F;
						line-height: 12px;						
					}					
				}

			}
							
		}
		.morePro{
			height: 30px;
			line-height: 30px;
			text-align: right;
		}

	}
	
</style>