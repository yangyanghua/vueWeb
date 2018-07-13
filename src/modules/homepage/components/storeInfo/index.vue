<template>
  <component-wrapper :uuid="initInfo.uuid" :id="initInfo.uuid" :key="initInfo.uuid" :storeList="storeList">

      <van-row slot="left">
    	<div id="storeInfo" :class="propsData.styleType">
    		<div class="storeInfoBg" v-bind:style="{backgroundImage: 'url(' + propsData.bgImageUrl + ')'}" style="background-size:cover ;" ></div>
    		<div class="storeInfoDetail">
    			<div class="storeLogo" v-bind:style="{backgroundImage: 'url(' + propsData.storeLogo + ')'}" style="background-size:cover ;"></div>
    			<div class="storeTextInfo">
    			<h1 class="storeName"><span>{{propsData.storeName}}</span></h1>
    			<p class="productTotal"><a href="#">全部商品{{propsData.productTotal}}</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#">上新{{propsData.newProductTotal}}</a></p>
    			<p class="storeActivity"><span class="ActivityTip">{{propsData.storeActivityTip}}</span>{{propsData.storeActivity}}</p>    				
    			</div>
    		</div> 
			</div> 	
      </van-row>

    <el-card class="box-card storeInfoOptions"  slot="right">
      <div slot="header" class="clearfix">
        <span>店铺信息</span>
      </div>
      
<el-form ref="propsData" :model="propsData" label-width="90px">
  <el-form-item label="显示样式：">
			  <el-radio-group v-model="propsData.styleType" style="line-height: 30px;margin-top: 10px;" >
			    <el-radio label="stype1">样式1</el-radio>
			    <el-radio label="stype2">样式2</el-radio>
			    <el-radio label="stype3">样式3</el-radio>
			    <el-radio label="stype4">样式4</el-radio>
			    <el-radio label="stype5">样式5</el-radio>
			  </el-radio-group>	
  </el-form-item>

  <el-form-item label="背景图片：">
					<el-upload
					  class="avatar-uploader"
					  action=""
					  :show-file-list="false"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="propsData.bgImageUrl" :src="propsData.bgImageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>		
  </el-form-item>	
</el-form>
      
    </el-card>
    <!-- </div> -->
    <!-- </div> -->
  </component-wrapper>
</template>
<script>
// import {getUploadImgSrc} from '@/common/js/service.js';
  import {
    mixin
  } from '../mixin.js';
  export default {
    mixins: [mixin],
    name: 'notice-info',
    data() {
      return {
        propsData:{
          styleType:'stype1', //展示样式
        bgImageUrl:'http://a2.att.hudong.com/79/22/01000000000000119062273272179.jpg', //背景图片
        storeName:'这是店铺的名字',
        storeLogo:'http://www.qqzhi.com/uploadpic/2015-01-10/194231948.jpg',//店铺logo
        storeActivity:'全场满150减50，满200减100。',//店铺活动
        storeActivityTip:'满减',//活动标签
        productTotal:'666',//店铺商品总量
        newProductTotal:'20'  //新品         
        }
        
        // isAcitve: false,
      }
    },

    methods: {
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG&&!isPNG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
          return false
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return false;
        }
		 getUploadImgSrc(file).then((res) => {
						this.propsData.bgImageUrl = res;
					}).catch((res) => {
						console.log('error ', res);
						this.$message({
							type: 'error',
							message: res.message
						});	 
			})  
      },
    },

  }

</script>
<style lang="scss" scoped>
  .btn-text {
    vertical-align: top;
    margin-left: 10px;
  }

	#storeInfo.stype1{transition: all 0.3s;position: relative;height:185px;width: 100%;}
	#storeInfo.stype1	.storeInfoBg{	transition: all 0.3s;position: absolute;top: 0;left: 0;height: 185px;width: 100%; }
	#storeInfo.stype1	.storeInfoDetail{transition: all 0.3s;padding: 12px;width: 100%;position: absolute;bottom: 0;left: 0;display: flex;z-index: 10;}
	#storeInfo.stype1	.storeLogo{transition: all 0.3s;flex: 0 0 60px;height: 60px;background: gainsboro;}
	#storeInfo.stype1	.storeTextInfo{transition: all 0.3s;flex: 1;width: 82%;padding-left: 8px;}
	#storeInfo.stype1	.storeName{transition: all 0.3s;width: 100%;font-size: 16px;color: #FFFFFF;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
	#storeInfo.stype1	.productTotal{display: none;}
	// #storeInfo.stype1	.storeActivity{transition: all 0.3s;width: 100%;padding-top: 5px;color: #FFFFFF;padding-right: 10px;background: url(../../../../../../assets/images/right.png) no-repeat 100% 60%;background-size:12px 12px ;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
	#storeInfo.stype1 .ActivityTip{transition: all 0.3s;margin-right: 5px;color: #FFFFFF;padding: 2px 6px;background: #FF3D4F;}
	
	#storeInfo.stype3{
		transition: all 0.3s;
		position: relative;
		height:185px;
		width: 100%;
		.storeInfoBg{
			transition: all 0.3s;
			position: absolute;
			top: 0;
			left: 0;
			height: 185px;
			width: 100%;
			 
		}
		.storeInfoDetail{
			transition: all 0.3s;
			padding: 12px;
			width: 100%;
			position: absolute;
			bottom: 0;
			left: 0;
			display: flex;
			z-index: 10;
			.storeLogo{
				transition: all 0.3s;
				flex: 0 0 60px;
				height: 60px;
				background: gainsboro;
			}
			.storeTextInfo{
				transition: all 0.3s;
				flex: 1;
				width: 82%;
				padding-left: 8px;
				
			}
			.storeName{
				transition: all 0.3s;
				width: 100%;
				font-size: 16px;
				color: #FFFFFF;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
			.productTotal{
				transition: all 0.3s;
				margin-top: 5px;
				color: #FFFFFF;
				display: block;
				a{
					color: #FFFFFF;
				}
				
			}			
			.storeActivity{
				display: none;
			}

		}



	}

	#storeInfo.stype2{
		transition: all 0.3s;
		position: relative;
		height:238px;
		width: 100%;
		background: #FFFFFF;	
		.storeInfoBg{
			transition: all 0.3s;
			position: absolute;
			top: 0;
			left: 0;
			height: 185px;
			width: 100%;
			 
		}
		.storeInfoDetail{
			transition: all 0.3s;
			padding: 12px;
			width: 100%;
			position: absolute;
			bottom: 10px;
			left: 0;
			display: flex;
			z-index: 10;
			.storeLogo{
				transition: all 0.3s;
				flex: 0 0 60px;
				height: 60px;
				border-radius:100px ;
				background: gainsboro;
			}
			.storeTextInfo{
				transition: all 0.3s;
				flex: 1;
				width: 82%;
				padding-left: 8px;
				
			}
			.storeName{
				transition: all 0.3s;
				width: 100%;
				font-size: 16px;
				color: #FFFFFF;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
			.productTotal{
				transition: all 0.3s;
				a{
					color: #999999;
				}
			}
			.storeActivity{
				display: none;
			
			}
		}
	}

	#storeInfo.stype4{
		transition: all 0.3s;
		position: relative;
		height:258px;
		width: 100%;
		background: #FFFFFF;	
		.storeInfoBg{
			transition: all 0.3s;
			position: absolute;
			top: 0;
			left: 0;
			height: 165px;
			width: 100%;
			 
		}
		.storeInfoDetail{
			transition: all 0.3s;
			padding: 12px;
			width: 100%;
			position: absolute;
			bottom:-13px;
			left: 0;
			z-index: 10;
			.storeLogo{
				transition: all 0.3s;
				margin: auto;
				width: 60px;
				height: 60px;
				border-radius:100px ;
				background: gainsboro;
			}
			.storeTextInfo{
				transition: all 0.3s;
				text-align: center;
				margin: auto;
				width: 100%;				
			}
			.storeName{
				transition: all 0.3s;
				margin-top: 10px;
				width: 100%;
				font-size: 16px;
				color: #222222;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
			.productTotal{
				transition: all 0.3s;
				color: #999999;
				margin-top: 5px;
				a{
					color: #999999;
				}
			}
			.storeActivity{
				display: none;
			}
		}
	}

	#storeInfo.stype5{
		transition: all 0.3s;
		position: relative;
		height:250px;
		width: 100%;
		background: #FFFFFF;	
		.storeInfoBg{
			transition: all 0.3s;
			position: absolute;
			top: 0;
			left: 0;
			height: 250px;
			width: 100%;
			 
		}
		.storeInfoDetail{
			transition: all 0.3s;
			padding: 12px;
			width: 100%;
			position: absolute;
			bottom: 25px;
			left: 0;
			z-index: 10;
			.storeLogo{
				transition: all 0.3s;
				margin: auto;
				width: 60px;
				height: 60px;
				border-radius:100px ;
				background: gainsboro;
			}
			.storeTextInfo{
				transition: all 0.3s;
				text-align: center;
				margin: auto;
				width: 100%;		
			}
			.storeName{
				transition: all 0.3s;
				margin-top: 20px;
				width: 100%;
				font-size: 16px;
				padding-bottom: 11px;
				color: #FFFFFF;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				span{
					padding-bottom: 10px;
					border-bottom: 1px solid #FFFFFF;
				}
			}
			.productTotal{
				transition: all 0.3s;
				color: #FFFFFF;
				margin-top: 5px;
				a{
					color: #FFFFFF;
				}
			}
			.storeActivity{
				display: none;
			}
		}
	}


	 .storeInfoOptions .avatar-uploader{
	 	 width: 260px;
	 }
  .storeInfoOptions .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
   
  }
   .storeInfoOptions .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
   .storeInfoOptions .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 260px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
   .storeInfoOptions .avatar {
    width: 260px;
    height: 120px;
    display: block;
  }




</style>
