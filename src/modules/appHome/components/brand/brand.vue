<template>
  <div class="brand">
    <div class="edit-box">
      <div class="edit-preview">
        <div class="big-img" v-if="brandConfig.image_url">
          <img :src="brandConfig.image_url">
        </div>
        <div class="small-img-box">
          <div class="small-img" v-for="(item,index) in finalBrands" :key="index">
            <img :src="item.logoUrl || item.logo">
            <p>{{item.name}}</p>
          </div>
        </div>
      </div>
      <tabs :currentView="currentView"></tabs>
    </div>
    <div class="editer">
      <div class="editer-title">编辑器详情</div>
      <div class="editer-main">
        <div class="tips">
          <div class="tips-title">品牌</div>
          <div class="tips-box">
            <i class="iconfont icon-yinliang"></i>
            <div>
              <span> 规则：品牌展示需添加4个或8个品牌</span>
            </div>
          </div>
        </div>

        <div class="style">
          <div class="style-title">页面设置</div>
          <el-upload class="upload-demo" drag action="" :show-file-list="false" :before-upload="beforeAvatarUpload" >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </div>

        <el-button type="primary" @click="initBrand()">添加品牌</el-button>

        <el-dialog title="品牌列表" :visible.sync="dialogTableVisible">
          <el-table ref="multipleTable" v-if="brands && brands.length" :data="brands" tooltip-effect="dark" style="width: 95%" @selection-change="handleSelectionChange" @row-click="rowClick">
            <el-table-column type="selection" width="30"></el-table-column>
            <el-table-column prop="id" label="品牌ID"></el-table-column>
            <el-table-column prop="name" label="品牌名"></el-table-column>
            <el-table-column prop="otherName" label="品牌别名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="logo" label="图片">
              <template slot-scope="scope">
                <img :src="scope.row.logo" style="width: 50px;height: 28px">
              </template>
            </el-table-column>
            <el-table-column prop="createName" label="创建人"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop="name" label="品牌名"></el-table-column>
          </el-table>
          <el-pagination
            @current-change="paging"
            :page-size="brandParams.pageSize"
            layout="prev, pager, next, jumper"
            :total="totalRecord">
          </el-pagination>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="ensure()">确 定</el-button>
          </div>
        </el-dialog>

        
        <div class="save">
          <el-button :plain="true" type="success" @click="saving">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as Service from '@/common/service/edit/index.js';
  import tabs from '@/modules/appHome/components/tabs/tabs.vue';
  import {getUploadImgSrc,saveJson,getBrandList,getBrandByIds} from '@/common/service/edit/index.js';

  export default {
    props: [],
    data() {
      return {
        currentView:'',
        popupObj: this.$store.state.edit.popupObj,
        
        brandConfig: {
          "type": "w_brand",
          "show_style": 1,
          "image_url": "",
          "link_value": "",
        },
        brands: [],//dialog展示
        currentVal: [],
        activeBrands: [],
        finalBrands: [],
        id: [],
        brandParams: {
          currentPage: 1, 
          pageSize: 5
        },
        totalRecord: null,

        dialogTableVisible: false,
      }
    },
    computed: {
      
    },
    components:{
      tabs
    },
    watch: {
      currentView(){
      },
      brandConfig:{
        handler: function(){
          console.log(this.brandConfig)
          this.$store.commit('brand',{brand: this.brandConfig});
        },
        deep: true,
      },
    },
    methods: {
      initBrand(){
        this.dialogTableVisible = true;

        getBrandList(this.brandParams).then((res)=>{
          console.log(res.data)
          this.brands = [...res.data];
          this.totalRecord = res.totalRecord;
        }).catch((res) => {
          this.$message.error(res.message);
        }) 
      },
      initPage(){
        let params = {
          brandIds: this.brandConfig.link_value
        }

        console.log(params)
        getBrandByIds(params).then((res)=>{
          this.finalBrands = [...res];
          console.log(this.finalBrands)
        }).catch((res) => {
          this.$message.error(res.message);
        }) 
      },
      //选择品牌关联值
      ensure(){
        this.dialogTableVisible = !this.dialogTableVisible;

        //分页和确定都得保存当前被选中项
        if(this.currentVal.length){
          this.activeBrands.push(this.currentVal);
        }

        this.finalBrands = this.uniqueArrObj(this.flattenDepth(this.activeBrands));
        this.brandConfig.link_value = this.getArrByKey('id',this.finalBrands).join(',');
        
      },
      isRegFn1(){
        let isReg = this.brandConfig.show_style !=="" ? true : false;
        return isReg
      },
      isRegFn2(){
        let isReg = this.brandConfig.image_url !=="" ? true : false;
        return isReg
      },
      isRegFn3(){
        let arr = this.brandConfig.link_value.split(',');
        let isReg = (arr.length==4 || arr.length==8) ? true : false;
        return isReg
      },
      saving(){
        console.log(this.brandConfig)
        let isReg1 = this.isRegFn1();
        let isReg2 = this.isRegFn2();
        let isReg3 = this.isRegFn3();
        let isRegAll = isReg1 && isReg2 && isReg3;

        let message = '保存成功'
        let message1 = '品牌展示风格不能为空';
        let message2 = '未正确上传品牌主图片';
        let message3 = '品牌数目应为4或8';
        let type = 'error';
        
        if(!isReg1){
          message = message1;
        }else if(!isReg2){
          message = message2;
        }else if(!isReg3){
          message = message3;
        }else if(isRegAll){

          //发送到vuex进行公共处理
          this.$store.commit('allParams',{data: this.brandConfig});
          
          let params = {
            // id: this.$store.state.edit.allParams.id,
            // contentId: this.$store.state.edit.allParams.contentId,
            data: "",
          }
          params.data =  JSON.stringify(this.$store.state.edit.allParams.data);
          console.log(params.data)

          saveJson(params).then((res)=>{
            this.tips('success','保存成功')
          }).catch((res)=>{
            console.log(res)
            this.$message.error(res.message);
          }) 
        }
        this.tips('error',message);
      },
      beforeAvatarUpload(file,e) {
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
          this.brandConfig.image_url = res;
          console.log(this.brandConfig)
				}).catch((res)=>{
					this.$message.error(res.message);
				})
				
				return false;
      },
      handleSelectionChange(val) {
        console.log(val);
        this.currentVal = val;
      },
      rowClick(row, event, column){
        // console.log(row.id)
        // let checkbox = event.target.parentNode.parentNode.children[0].children[0].children[0];
        // checkbox.setAttribute('aria-checked',true);
        // checkbox.classList.add('is-checked');
        // checkbox.children[0].classList.add('is-checked');
        // this.currentVal = row;
        // console.log(checkbox)
        // console.log(this.$refs)
      },
      paging(val) {
        if(this.currentVal.length){
          this.activeBrands.push(this.currentVal);
        }
        
        this.brandParams.currentPage = val;
        this.initBrand();
      },
    },
    mounted() {
      this.currentView = location.hash.slice(10);
      // this.brandConfig = this.objCopy(this.$store.state.edit.brand);
      this.brandConfig = Object.assign(this.brandConfig, this.$store.state.edit.brand);
      this.initPage();
    },
        
 }

</script>
<style lang="scss" scoped>
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
</style>
