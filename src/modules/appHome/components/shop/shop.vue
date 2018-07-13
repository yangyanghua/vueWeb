<template>
  <div class="shop">
    <div class="edit-box">
      <div class="edit-preview">
        <p v-if="shopName">{{shopName}}</p>
        <img v-if="shopImg" :src="shopImg">
        <el-table ref="multipleTable" v-if="coupons && coupons.length" :data="coupons" tooltip-effect="dark" style="width: 95%" @selection-change="handleSelectionChange" @row-click="changeRow">
          <el-table-column prop="value" label="优惠券"></el-table-column>
          <el-table-column prop="validTime" label="有效期" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
      <tabs :currentView="currentView"></tabs>
    </div>
    <div class="editer">
      <div class="editer-title">编辑器详情</div>
      <div class="editer-main">
        <div class="tips">
          <div class="tips-title">店铺</div>
          <div class="tips-box">
            <i class="iconfont icon-yinliang"></i>
            <div>
              <span> 规则</span>
            </div>
          </div>
        </div>
        <div class="style" @click="toPopup($event)">
          <div class="style-left">
            选择店铺
          </div>
          <div class="style-right" >
            <p v-if="shopName">{{shopName}}</p>
            <img v-if="shopImg" :src="shopImg">
          </div>
        </div>

        <div class="content">
          <div class="content-title">选择优惠券</div>
          <el-table ref="multipleTable" v-if="coupons && coupons.length" :data="coupons" tooltip-effect="dark" style="width: 95%" @selection-change="handleSelectionChange" @row-click="changeRow">
            <el-table-column type="selection" width="30"></el-table-column>
            <el-table-column prop="value" label="优惠券"></el-table-column>
            <el-table-column prop="validTime" label="有效期" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
        
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
  import {getUploadImgSrc,saveJson} from '@/common/service/edit/index.js';

  export default {
    props: [],
    data() {
      return {
        currentView:'',
        popupObj: this.$store.state.edit.popupObj,
        shopConfig: {
          "type": "w_shop",
          "link_value": "",
          "link_coupon": "",
        },
        shopImg: null,
        shopName: null,

        coupons: [],
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
      shopConfig:{
        handler: function(){
          console.log(this.shopConfig)
          this.$store.commit('shop',{shop: this.shopConfig});
        },
        deep: true,
      },
    },
    methods: {
      toPopup(e){
        this.$router.push({
          name: 'popupAppHome',
          params: {
            'pageType': 'shop', 
            'fromPageType': this.currentView,
          }
        });
      },
      initShop(){
        
        let params = {
          storeId: this.shopConfig.link_value,
          // storeId: 6
        }
        console.log(params);

        Service.getCouponById(params).then((res) => { 
          this.coupons = [...res];
        }).catch((res) => {
          this.$message.error(res.message);
        })

        Service.getStoreById(params).then((res) => { 
          if(res){
            this.shopName = res.name || this.$route.params.shopName;
            this.shopImg = res.logo || this.$route.params.shopImg;
          }
        }).catch((res) => {
          this.$message.error(res.message);
        })
        
      },
      isRegFn1(){
        let isReg = this.shopConfig.link_value !=="" ? true : false;
        return isReg
      },
      isRegFn2(){
        let isReg = this.shopConfig.link_coupon !=="" ? true : false;
        return isReg
      },
      isRegFn3(){
        let isReg = this.shopConfig.link_coupon.split(',').length > 3 ? false : true;
        return isReg
      },
      saving(){
        let isReg1 = this.isRegFn1();
        let isReg2 = this.isRegFn2();
        let isReg3 = this.isRegFn3();
        let isRegAll = isReg1 && isReg2 && isReg3;
        console.log(isReg1,isReg2,isReg3);

        let message = '保存成功'
        let message1 = `未选择店铺`;
        let message2 = '至少选择一个优惠券';
        let message3 = '至多选择三个优惠券';
        
        if(!isReg1){
          message = message1;
        }else if(!isReg2){
          message = message2;
        }else if(!isReg3){
          message = message3;
        }else if(isRegAll){
          this.$store.commit('allParams',{data: this.shopConfig});
          
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
            this.$message.error(res.message);
          }) 
        }
        this.tips('error',message);
      },
      handleSelectionChange(val) {
        this.shopConfig.link_coupon = this.getArrByKey('id',val).join(',')
      },
      changeRow(row){
      }
    },
    mounted() {
      this.currentView = location.hash.slice(10);
      
      this.shopConfig.link_value =  this.$route.params.id || this.$store.state.edit.shop.link_value || 1 ; 
      
      this.initShop();
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
