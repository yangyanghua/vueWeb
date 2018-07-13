<template>
  <div class="popup">
    <el-dialog title="公共弹出组件" :visible.sync="isPopupVisible" @close="cancel">
      <el-tabs :tab-position="tabPosition"  v-model="currentTab" @tab-click="getPageType">
        <el-tab-pane label="商品" name="1" :disabled="isUsable">
          <div class="tool-box">
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="goodsKeyWord"></el-input>
            <el-button plain @click="goodsReset()">重置</el-button>
            <el-button type="success" @click="goodsSearch()">确定</el-button>
          </div>
          <el-table :data="goodsDataset" highlight-current-row @current-change="goodsGetId" height="270" border style="width: 100%">
            <el-table-column prop="id" label="商品ID" width="180"></el-table-column>
            <el-table-column prop="productName" label="商品名" width="180"></el-table-column>
            <el-table-column prop="image" label="图片">
              <template slot-scope="scope">
                <img :src="scope.row.image" style="width: 50px;height: 28px">
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="goodsPaging"
            :page-size="goodsParams.pSize"
            layout="prev, pager, next, jumper"
            :total="goodsTotalRecord">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="商品组" name="2" :disabled="isUsable">
          <div class="tool-box">
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="groupKeyWord"></el-input>
            <el-button plain @click="groupReset()">重置</el-button>
            <el-button type="success" @click="groupSearch()">确定</el-button>
          </div>
          <el-table :data="groupDataset" highlight-current-row @current-change="groupGetId" height="270" border style="width: 100%">
            <el-table-column prop="id" label="商品组ID"></el-table-column>
            <el-table-column prop="name" label="名字"></el-table-column>
            <el-table-column prop="productNum" label="商品数量"></el-table-column>
            <el-table-column prop="createPerson" label="创建人"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
          </el-table>
          <el-pagination
            @current-change="groupPaging"
            :page-size="groupParams.pageSize"
            layout="prev, pager, next, jumper"
            :total="groupTotalRecord">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="专题" name="3" :disabled="isUsable">
          subject
        </el-tab-pane>
        <el-tab-pane label="品牌" name="4" :disabled="isUsable">
          <div class="tool-box">
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="brandKeyWord"></el-input>
            <el-button plain @click="brandReset()">重置</el-button>
            <el-button type="success" @click="brandSearch()">确定</el-button>
          </div>
          <el-table :data="brandDataset" highlight-current-row @current-change="brandGetId" height="270" border style="width: 100%">
            <!-- <thead>
              <tr>
                <el-table-column v-for="(key,value) in brandDataset[0]" :key="key" prop="key">{{key}}---{{value}}</el-table-column>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in brandDataset" :key="index">
                <el-table-column v-for="(key,value) in item" :key="key" :prop="key" :label="value"></el-table-column>
              </tr>
            </tbody> -->
            <el-table-column prop="id" label="品牌ID"></el-table-column>
            <el-table-column prop="name" label="品牌名"></el-table-column>
            <el-table-column prop="otherName" label="品牌别名"></el-table-column>
            <el-table-column prop="logo" label="图片">
              <template slot-scope="scope">
                <img :src="scope.row.logo" style="width: 50px;height: 28px">
              </template>
            </el-table-column>
            <el-table-column prop="createBy" label="创建人"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
          </el-table>
          <el-pagination
            @current-change="brandPaging"
            :page-size="brandParams.pageSize"
            layout="prev, pager, next, jumper"
            :total="brandTotalRecord">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="店铺" name="5">
          <div class="tool-box">
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="shopKeyWord"></el-input>
            <el-button plain @click="shopReset()">重置</el-button>
            <el-button type="success" @click="shopSearch()">确定</el-button>
          </div>
          <el-table :data="shopDataset" highlight-current-row @current-change="shopGetId" height="270" border style="width: 100%">
            <el-table-column prop="id" label="店铺ID"></el-table-column>
            <el-table-column prop="name" label="店铺名"></el-table-column>
            <el-table-column prop="logo" label="图片">
              <template slot-scope="scope">
                <img :src="scope.row.logo" style="width: 50px;height: 28px">
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="shopPaging"
            :page-size="shopParams.pageSize"
            layout="prev, pager, next, jumper"
            :total="shopTotalRecord">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="H5页面" name="6" :disabled="isUsable">
          <div class="url-tips">请输入链接的H5页面地址：</div>
          <el-input  placeholder="输入有效的H5链接：" v-model="url" clearable></el-input>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="toPage()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as Service from '@/common/service/edit/index.js';
  import {productGroup,getBrandList,getShopList} from '@/common/service/edit/index.js';

  export default {
    data() {
      return {
        currentView:'',
        isPopupVisible: true,
        tabPosition: 'left',
        fromPageType: this.$route.params.fromPageType,//路由来源
        editTypeArr: this.$store.state.edit.previewEditerType,
        popupTypeStr: this.$route.params.pageType || 'goods',//tabs
        popupTypeArr: ['goods','goods_group','subject','brand','shop','url'],
        popupObj: {"goods":"商品","goods_group":"商品组","subject":"专题","brand":"品牌","shop":"店铺","url":"H5页面"},
        currentTab: '1',

        goodsDataset:[],
        goodsParams: {p: 1, pSize: 8},
        goodsTotalRecord: null,
        goodsKeyWord: '',

        groupParams: {page: 1, pageSize: 8},
        groupDataset: [],
        groupTotalRecord: null,
        groupKeyWord: '',

        brandParams: {currentPage: 1, pageSize: 8},
        brandDataset: [],
        // brandCols: [{
        //   "ID":"品牌ID",
        //   "name":"品牌名",
        //   "otherName":"品牌别名",
        //   "logo":"图片",
        //   "createBy":"创建人",
        //   "createTime":"创建时间",
        // }],
        brandTotalRecord: null,
        brandKeyWord: '',

        shopParams: {nowPage: 1, pageSize: 8},
        shopDataset: [],
        shopTotalRecord: null,
        shopKeyWord: '',
        shopIdx: null,

        currentId: null,//商品id，对应为sub_entry.link_value
        url: null,
        isUsable: false, //标签可用
      }
    },
    computed: {},
    watch: {
      currentView(){
        this.currentTab = (this.popupTypeArr.indexOf(this.popupTypeStr) + 1).toString();
      },
      isPopupVisible(){       
        
      },
      popupTypeStr(){
        
        this.initPopup();
      }
    },
    methods: {
      cancel(){
        if(this.fromPageType == undefined){
          this.fromPageType = 'carousel';
        }
        this.$router.push({name: `${this.fromPageType}AppHome`});
      },
      //点击确定：不同路由来源执行不同逻辑
      toPage(){
        switch (this.fromPageType){ 
          case this.editTypeArr[0]:
            this.toJjgsaw();
            break;
          case this.editTypeArr[1]:
            this.toTitle();
            break;
          case this.editTypeArr[2]:
            this.toCarousel();
            break;
          case this.editTypeArr[3]:
            this.toEntry();
            break;
          case this.editTypeArr[4]:
            this.toSeize();
            break;
          case this.editTypeArr[5]:
            this.toInform();
            break;
          case this.editTypeArr[6]:
            break;
          case this.editTypeArr[7]:
            this.toShop();
            break;
          case this.editTypeArr[8]:
            break;
          case undefined:
            this.$router.push({name: `carouselAppHome`});
        }
      },
      toCarousel(){
        //currentTab：url、其它
        if(this.currentTab==6){
          if(this.url != null){
            this.$router.push({
              name:'carouselAppHome',
              params:{
                id : this.url,
                pageType: 'url',
              }
            });
            this.isPopupVisible = false;
          }else {
            this.tips('error','请输入有效的url');
          }
        }else{
          if(this.currentId != null){
            if(this.popupTypeStr==="goodsGroup"){
              this.popupTypeStr = "goods_group";
            }
            this.$router.push({
              name:'carouselAppHome',
              params:{
                id : this.currentId,
                pageType: this.popupTypeStr || 'goods',
              }
            });
            this.isPopupVisible = false;
          }else {
            this.tips('error','ID值不能为空');
          }
        }
      },
      toEntry(){
        if(this.currentTab==6){
          if(this.url != null){
            this.$router.push({
              name:'entryAppHome',
              params:{
                id : this.url,
                pageType: 'url',
              }
            });
            this.isPopupVisible = false;
          }else {
            this.tips('error','请输入有效的url');
          }
        }else{
          if(this.currentId != null){
            if(this.popupTypeStr==="goodsGroup"){
              this.popupTypeStr = "goods_group";
            }
            this.$router.push({
              name:'entryAppHome',
              params:{
                id : this.currentId,
                pageType: this.popupTypeStr || 'goods',
              }
            });
            this.isPopupVisible = false;
          }else {
            this.tips('error','ID值不能为空');
          }
        }
      },
      toJjgsaw(){
        if(this.currentTab==6){
          if(this.url != null){
            this.$router.push({
              name:'jjgsawAppHome',
              params:{
                id : this.url,
                pageType: 'url',
              }
            });
            this.isPopupVisible = false;
          }else {
            this.tips('error','请输入有效的url');
          }
        }else{
          if(this.currentId != null){
            if(this.popupTypeStr==="goodsGroup"){
              this.popupTypeStr = "goods_group";
            }
            this.$router.push({
              name:'jjgsawAppHome',
              params:{
                id : this.currentId,
                pageType: this.popupTypeStr || 'goods',
              }
            });
            this.isPopupVisible = false;
          }else {
            this.tips('error','ID值不能为空');
          }
        }
      },
      toSeize(){
        if(this.currentTab==6){
          if(this.url != null){
            this.$router.push({
              name:'seizeAppHome',
              params:{
                id : this.url,
                pageType: 'url',
              }
            });
            this.isPopupVisible = false;
          }else {
            this.tips('error','请输入有效的url');
          }
        }else{
          if(this.currentId != null){
            if(this.popupTypeStr==="goodsGroup"){
              this.popupTypeStr = "goods_group";
            }
            this.$router.push({
              name:'seizeAppHome',
              params:{
                id : this.currentId,
                pageType: this.popupTypeStr || 'goods',
              }
            });
            this.isPopupVisible = false;
          }else {
            this.tips('error','ID值不能为空');
          }
        }
      },
      toTitle(){
        if(this.currentTab==6){
          if(this.url != null){
            this.$router.push({
              name:'titleAppHome',
              params:{
                id : this.url,
                pageType: 'url',
              }
            });
            this.isPopupVisible = false;
          }else {
            this.tips('error','请输入有效的url');
          }
        }else{
          if(this.currentId != null){
            if(this.popupTypeStr==="goodsGroup"){
              this.popupTypeStr = "goods_group";
            }
            this.$router.push({
              name:'titleAppHome',
              params:{
                id : this.currentId,
                pageType: this.popupTypeStr || 'goods',
              }
            });
            this.isPopupVisible = false;
          }else {
            this.tips('error','ID值不能为空');
          }
        }
      },
      toShop(){
        if(this.currentId != null){
          this.$router.push({
            name:'shopAppHome',
            params:{
              id : this.currentId || 1,
              shopName: this.shopDataset[this.shopIdx].name,
              shopImg: this.shopDataset[this.shopIdx].logo,
            }
          });
          this.isPopupVisible = false;
        }else {
          this.tips('error','ID值不能为空');
        }

      },
      
      getPageType(tab,e){
        let popupStr = e.target.innerHTML;
        this.popupTypeStr = this.getObjKey(popupStr,this.popupObj);
      },

      goodsGetId(val){
        val!= null && (this.currentId = val.id);
      },
      //分页
      goodsPaging(val) {
        this.goodsParams.p = val;
        this.initGoods();
      },
      goodsSearch(){

      },
      goodsReset(){

      },

      groupGetId(val){
        val!= null && (this.currentId = val.id)
      },
      //分页
      groupPaging(val) {
        this.groupParams.page = val;
        this.initGroup();
      },
      groupSearch(){

      },
      groupReset(){

      },

      brandGetId(val){
        val!= null && (this.currentId = val.id)
      },
      brandPaging(val) {
        this.brandParams.currentPage = val;
        this.initBrand();
      },
      brandSearch(){

      },
      brandReset(){

      },
      
      shopGetId(val){
        val!= null && (this.currentId = val.id);
        this.shopIdx =  this.getIdx(val,this.shopDataset);
      },
      //分页
      shopPaging(val) {
        this.shopParams.nowPage = val;
        this.initShop();
      },
      shopSearch(){

      },
      shopReset(){

      },

      initPopup(){
        switch (this.popupTypeStr){ 
          case this.popupTypeArr[0]:
            this.initGoods();
            break;
          case this.popupTypeArr[1]:
            this.initGroup();
            break;
          case this.popupTypeArr[2]:
            // 专题
            break;
          case this.popupTypeArr[3]:
            this.initBrand();
            break;
          case this.popupTypeArr[4]:
            this.initShop();
            break;
          case this.popupTypeArr[5]:
            this.initUrl();
            break;
        }
      },
      //切换tabs渲染数据
      initGoods(){
        Service.goodslistPage(this.goodsParams).then((res) => { 
          this.goodsDataset = [...res.data];
          this.goodsTotalRecord = res.totalRecord;
        }).catch((res) => {
          this.$message.error(res.message);
        })
      },
      initGroup(){
        productGroup(this.groupParams).then((res)=>{
          this.groupDataset = [...res.data];
          this.groupTotalRecord = res.totalRecord;
        }).catch((res) => {
          this.$message.error(res.message);
        }) 
      },
      initBrand(){
        console.log('---------')
        getBrandList(this.brandParams).then((res)=>{
          this.brandDataset = [...res.data];
          this.brandTotalRecord = res.totalRecord;
        }).catch((res) => {
          this.$message.error(res.message);
        }) 
      },
      initShop(){
        getShopList(this.shopParams).then((res)=>{
          this.shopDataset = [...res.content];
          console.log(this.shopDataset)
          this.shopTotalRecord = res.totalRow;
        }).catch((res) => {
          this.$message.error(res.message);
        }) 
      },
      initUrl(){
        // console.log('url')
      }
    },
    components:{
      
    },
    mounted() {
      this.currentView = location.hash.slice(10);
      this.fromPageType=='shop' && (this.isUsable = true);

      //默认初始页面
      this.initPopup();
      this.initShop();
    },
    updated() {
    }
 }

</script>
<style lang="scss" scoped>

</style>
