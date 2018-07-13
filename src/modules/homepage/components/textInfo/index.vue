<template>
  <component-wrapper :uuid="initInfo.uuid" :id="initInfo.uuid" :key="initInfo.uuid" :storeList="storeList">

      <van-row slot="left">
				<p><a class="textLink"  v-bind:style="{fontSize:propsData.fontSize,color:propsData.color,backgroundColor:propsData.backgroundColor,textAlign:propsData.textAlign}" style="padding:10px;display: block;transition: all 0.3s;">{{propsData.content}}</a></p>

      </van-row>

    <el-card class="box-card storeInfoOptions"  slot="right">
      <div slot="header" class="clearfix">
        <span>文本</span>
      </div>
      
<el-form ref="propsData" :model="propsData" label-width="100px">
						  <el-form-item label="文本内容：" 
					    :rules="[
					      { required: true, message: '请输入文本内容', trigger: 'blur' },
					    ]">	
						    <el-input type="textarea" placeholder="请输入要说明的文字，最多100个字"  v-model="propsData.content"></el-input>
						  </el-form-item>			  
						  <el-form-item label="字体大小：" >	
						    <el-radio-group v-model="propsData.fontSize">
						      <el-radio label="16px">大</el-radio>
						      <el-radio label="14px">中</el-radio>
						      <el-radio label="12px">小</el-radio>
						    </el-radio-group>						   	
						  </el-form-item>
						  <el-form-item label="字体颜色：" >	
								<el-color-picker v-model="propsData.color" size="small"></el-color-picker>	
								<el-button type="mini" style="margin-top: -25px;margin-left: 15px;" @click="propsData.color='#333333'" >重置</el-button>
						  </el-form-item>						  
						  <el-form-item label="背景颜色：" >	
								<el-color-picker v-model="propsData.backgroundColor" size="small"></el-color-picker>				   	
						  	<el-button type="mini" style="margin-top: -25px;margin-left: 15px;" @click="propsData.backgroundColor='#ffffff'">重置</el-button>
						  </el-form-item>	
						  <el-form-item label="显示位置：" >	
						    <el-radio-group v-model="propsData.textAlign">
						      <el-radio label="left">居左</el-radio>
						      <el-radio label="center">居中</el-radio>
						      <el-radio label="right">居右</el-radio>
						    </el-radio-group>						   	
						  </el-form-item>

						  <el-form-item label="链接：" >	
								  <el-select v-model="propsData.url" placeholder="请选择跳转到的页面">
								    <el-option
								      v-for="item in miniPages"
								      :key="item.id"
								      :label="item.name"
								      :value="item.url">
								    </el-option>
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
      		content:'文字内容',
	      		fontSize:'14px',
	      		color:'#333333',
	      		backgroundColor:'#ffffff',
	      		textAlign:'left',      			
      		url:'#',
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
