<template>
  <component-wrapper :uuid="initInfo.uuid" :id="initInfo.uuid" :key="initInfo.uuid" :storeList="storeList">

      <van-row slot="left">
				<div class="titleInfo">
					<div style="padding: 10px;" v-bind:style="{textAlign:propsData.textAlign,backgroundColor:propsData.backgroundColor}">
						<p v-if="propsData.name==''" style="font-size: 16px;">『标题名字』</p>
						<h2 style="display: inline;font-size: 16px;line-height: 22px;">{{propsData.name}}</h2>
						<label v-if="propsData.styleType=='type1'&&propsData.urlName"  style="margin-left: 10px;">—&nbsp;&nbsp;<a>{{propsData.urlName}}</a></label>
						<h3 v-if="propsData.styleType=='type1'"  style="color: #999999;font-size: 12px;">{{propsData.subtitle}}</h3>
						<p v-if="propsData.styleType=='type2'">
							<span>2018-02-14&nbsp;&nbsp;{{propsData.author}}&nbsp;&nbsp;</span>&nbsp;&nbsp;<a>{{propsData.urlName}}</a>
						</p>
					</div>	
				</div>
      </van-row>

    <el-card class="box-card storeInfoOptions"  slot="right">
      <div slot="header" class="clearfix">
        <span>标题</span>
      </div>
      
<el-form :model="propsData" ref="propsData" label-width="100px">
  <el-form-item
    label="标题名："
    :rules="[
      { required: true, message: '请输入标题名称', trigger: 'blur' },
    ]"
  >
    <el-input v-model="propsData.name"></el-input>
  </el-form-item>
  <el-form-item label="标题模板：">
    <el-radio-group v-model="propsData.styleType">
      <el-radio label="type1">传统样式</el-radio>
      <el-radio label="type2">模仿微信图文页样式</el-radio>
    </el-radio-group>
    
  </el-form-item>
  <el-form-item label="显示位置：">
    <el-radio-group v-model="propsData.textAlign">
      <el-radio label="left">居左</el-radio>
      <el-radio label="center">居中</el-radio>
      <el-radio label="right">居右</el-radio>
    </el-radio-group>
  </el-form-item>
  <div v-if="propsData.styleType=='type1'">
	  <el-form-item label="副标题：">
 				<el-input v-model="propsData.subtitle"></el-input>
	  </el-form-item> 
		<el-form-item label="背景颜色：" >	
			<el-color-picker v-model="propsData.backgroundColor" size="small"></el-color-picker>				   	
			<el-button type="mini" style="margin-top: -25px;margin-left: 15px;" @click="propsData.backgroundColor='#ffffff'">重置</el-button>
		</el-form-item>	
  </div>
  <div v-if="propsData.styleType=='type2'">
	  <el-form-item label="日期：">
	    <el-date-picker
	      v-model="propsData.date"
	      type="date"
	      placeholder="选择日期">
    	</el-date-picker> 				
	  </el-form-item> 
		<el-form-item label="作者：" >	
			<el-input v-model="propsData.author"></el-input>
		</el-form-item>	
  </div>  
  
  
  
	  <el-form-item label="链接标题：">
 				<el-input v-model="propsData.urlName"></el-input>
	  </el-form-item> 
	  <el-form-item label="链接到：">
				<el-select v-model="propsData.linktype" placeholder="请选择跳转到的页面">
						<el-option label="微页面" value="miniPage"></el-option>
						<el-option label="店铺首页" value="storeIndex"></el-option>
						<el-option label="商品及商品分类" value="product"></el-option>
						<el-option label="营销活动" value="storeActivity"></el-option>
						<el-option label="自定义链接" value="DIYlink"></el-option>					    
				</el-select>
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
      		name:'',
      		styleType:'type1',
      		textAlign:'left',
      		subtitle:'',
      		backgroundColor:'#ffffff',
      		urlName:'',
      		linktype:'',
      		date:'',
      		author:'',
      		url:'',
        },
      	miniPages:[
      		{name:'测试页面1',url:'http://www.baidu.com',id:'1'},
      		{name:'测试页面2',url:'http://www.jd.com',id:'2'},
      		{name:'测试页面3',url:'http://www.taobao.com',id:'3'},
      		{name:'测试页面4',url:'http://www.80s.tw',id:'4'},
      	],        
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


</style>
