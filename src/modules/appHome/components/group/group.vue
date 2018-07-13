<template>
  <div class="group">
    <div class="edit-box">
      <div class="edit-preview">
        <div class="big-img" v-if="dataset && dataset.length">
          <img v-if="idx && dataset[idx].imgUrl" :src="dataset[idx].imgUrl">
          <img v-else-if="groupConfig.link_object" :src="groupConfig.link_object.img">
        </div>

        <div class="small-img-box" v-if="goodsDataset && goodsDataset.length">
          <div class="small-img" v-for="(item,index) in goodsDataset" :key="index">
            <img :src="item.image">
            <p>￥{{item.minPrice}}.00</p>
          </div>
        </div>

        <div class="small-img-box" v-else-if="groupConfig.link_object && groupConfig.link_object.goods.length">
          <div class="small-img" v-for="(item,index) in groupConfig.link_object.goods" :key="index">
            <img :src="item.img">
            <p>￥{{item.price}}.00</p>
          </div>
        </div>
        
        
      </div>
      <tabs :currentView="currentView"></tabs>
    </div>
    <div class="editer">
      <div class="editer-title">编辑器详情</div>
      <div class="editer-main">
        <div class="tips">
          <div class="tips-title">商品组</div>
          <div class="tips-box">
            <i class="iconfont icon-yinliang"></i>
            <div>
              <span> 规则</span>
            </div>
          </div>
        </div>

        <div class="tool-box">
          <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="keyWord"></el-input>
          <el-date-picker
            v-model="datetime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <div>
            <el-button plain @click="reset()">重置</el-button>
            <el-button type="success" @click="search()">搜索</el-button>
          </div>
        </div>

        <el-table :data="dataset" :highlight-current-row="true" @current-change="getId" border style="width: 95%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="name" label="商品组名字"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
        </el-table>

        <el-dialog title="商品组详情" :visible.sync="dialogTableVisible">
          <el-table :data="goodsDataset">
            <el-table-column property="productName" label="商品名"></el-table-column>
            <el-table-column property="maxPrice" label="原价"></el-table-column>
            <el-table-column property="minPrice" label="现价"></el-table-column>
            <el-table-column property="storeName" label="店铺"></el-table-column>
            <el-table-column prop="image" label="图片">
              <template slot-scope="scope">
                <img :src="scope.row.image" style="width: 70px;height: 50px">
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>

        <el-pagination
          @current-change="paging"
          :page-size="params.pageSize"
          layout="prev, pager, next, jumper"
          :total="totalRecord">
        </el-pagination>

        <div class="save">
          <el-button :plain="true" @click="addGroup">新增商品组</el-button>
          <el-button :plain="true" type="success" @click="saving">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as Service from '@/common/service/edit/index.js';
  import tabs from '@/modules/appHome/components/tabs/tabs.vue';
  import {getUploadImgSrc,saveJson,productGroup} from '@/common/service/edit/index.js';

  export default {
    props: [],
    data() {
      return {
        currentView:'',
        popupObj: this.$store.state.edit.popupObj,
        groupConfig: {
          "type": "w_goods_group",
          "link_value": "1" //商品组id
        },

        params: {page: 1, pageSize: 8},
        dataset: [],
        idx: null,//商品组索引
        goodsDataset: [],
        totalRecord: null,
        keyWord: '',
        datetime: null,

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
      datetime(){
        // console.log(this.datetime);
      },
      groupConfig:{
        handler: function(){
          console.log(this.groupConfig)
          this.$store.commit('group',{group: this.groupConfig});
        },
        deep: true,
      },
      idx(){
        console.log(this.idx);
        this.$store.commit('idxGroup',{idxGroup: this.idx});
      }
    },
    methods: {
      addGroup(){
        this.$router.push({
          path:'/goodsGroup/list/detail',
          query: {
            path:'/edit/group'
          }
        })
      },
      isRegFn1(){
        let isReg = this.groupConfig.link_value !=="" ? true : false;
        return isReg
      },
      saving(){
        let isReg1 = this.isRegFn1();

        let message = '保存成功'
        let message1 = `未选择商品组`;

        if(!isReg1){
          message = message1;
        }else{
          // let tempGroupConfig = {
          //   "type": "w_goods_group",
          //   "link_value": "12"
          // }
          // this.$store.commit('allParams',{data: tempGroupConfig});
          this.$store.commit('allParams',{data: this.groupConfig});
            
          let params = {
            // id: this.$store.state.edit.allParams.id,
            // contentId: this.$store.state.edit.allParams.contentId,
            data: "",
          }
          params.data =  JSON.stringify(this.$store.state.edit.allParams.data);
          console.log(params)
          
          saveJson(params).then((res)=>{
            console.log(res);
            this.tips('success','保存成功')
          }).catch((res)=>{
            console.log(res)
            this.$message.error(res.message);
          }) 
        }
        this.tips('error',message);

      },
      paging(val) {
        this.params.page = val;
        productGroup(this.params).then((res)=>{
          this.goodsDataset = [];//清空商品
          this.groupConfig.link_value = "";

          this.dataset = [...res.data];
          this.totalRecord = res.totalRecord;
        }).catch((res) => {
          this.$message.error(res.message);
        }) 
      },
      search(){

      },
      reset(){

      },
      getId(val){
        console.log(val)
        if(val===null){
          return false;
        }
        this.groupConfig.link_value = val.id;
        this.idx = this.getIdx(val,this.dataset);

        Service.getGroupById({id: val.id}).then((res) => { 
          
          this.goodsDataset = [...res.productList];
          this.dialogTableVisible = true;
        }).catch((res) => {
          this.$message.error(res.message);
        })
      },
      initGroup(){
        //商品组列表
        productGroup(this.params).then((res)=>{
          this.dataset = [...res.data];
          this.totalRecord = res.totalRecord;
          
        }).catch((res) => {
          this.$message.error(res.message);
        }) 
        console.log(this.idx)

        //商品组id=》商品列表
        // Service.getGroupById({id: this.groupConfig.link_value}).then((result) => { 
        //   this.goodsDataset = [...result.productList];
        // }).catch((res) => {
        //   this.$message.error(res.message);
        // })

      },
    },
    mounted() {
      this.currentView = location.hash.slice(10);
      this.idx = this.$store.state.edit.idxGroup || 0;
      this.initGroup();
      this.groupConfig.link_value = this.$route.query.productGroupId || 1;
      this.groupConfig = this.objCopy(this.$store.state.edit.group);
      console.log(this.groupConfig)
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
