<template>
  <div class="brand">
    <div class="edit-box">
      <div class="edit-preview">
        <div class="big-img" v-if="brandConfig.image_url">
          <img :src="brandConfig.image_url">
        </div>
        <div class="small-img-box">
          <!-- <div class="small-img" v-for="(item,index) in goodsDataset" :key="index">
            <img :src="item.image">
            <p>￥{{item.minPrice}}.00</p>
          </div> -->
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
          <el-table ref="multipleTable" v-if="brands && brands.length" :data="brands" tooltip-effect="dark" style="width: 95%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="30"></el-table-column>
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
            <el-button type="primary" @click="saveBrand()">确 定</el-button>
          </div>
        </el-dialog>

        
        <div class="save">
          <el-button :plain="true">新增商品组</el-button>
          <el-button :plain="true" type="success" @click="saving">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as Service from '@/common/service/edit/index.js';
  import tabs from '@/modules/edit/components/tabs/tabs.vue';
  import {getUploadImgSrc,saveJson,getBrandList} from '@/common/service/edit/index.js';

  export default {
    props: [],
    data() {
      return {
        currentView:'',
        popupObj: this.$store.state.edit.popupObj,
        
        toPopupIndex: 0,//sub_entry数组索引
        brandConfig: {
          "type": "w_brand",
          "show_style": 1,
          "image_url": "",
          "link_value": "",
        },
        brands: [],//dialog
        activeBrands: [],
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
          // this.$store.commit('brand',{brand: this.brandConfig});
        },
        deep: true,
      },
    },
    methods: {
      initBrand(){
        this.dialogTableVisible = true;

        getBrandList(this.brandParams).then((res)=>{
          console.log(res);
          this.brands = [...res.data];
          this.totalRecord = res.totalRecord;
          this.tips('success','请求数据成功')
        }).catch((res) => {}) 
      },
      saveBrand(){
        this.dialogTableVisible = !this.dialogTableVisible;
      },//选择品牌关联值
      saving(){
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

				}).catch((res)=>{
					this.$message.error(res.message);
				})
				
				return false;
      },
      handleSelectionChange(val) {
        // console.log(val);
        // if(val.length){
        //   for(let i=0;i<val.length;i++){
        //     this.activeBrands.push(val);
        //   }
        // }
      },
      paging(val) {

        this.brandParams.currentPage = val;
        this.initBrand();
      },
    },
    mounted() {
      this.currentView = location.hash.slice(7);

      
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
