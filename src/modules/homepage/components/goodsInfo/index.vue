<template>
  <component-wrapper :uuid="initInfo.uuid" :id="initInfo.uuid" :storeList="storeList">
    <van-row slot="left" gutter="8" class="swiper-container">
      <van-col v-for="(item,index) in propsData.goods" :key="item.id" :span="listLength[index]">
        <div class="goods" :class="{'is-simple': propsData.showType===2, 'is-detail':propsData.listType===4}">
          <i class="icon-corner" v-if="cornerIcon" :class="[cornerIcon]">
            <i class="textBg"></i>
            <van-icon :name="cornerIcon" :class="['icon']" />
          </i>
          <img class="icon-corner-defined" v-if="propsData.goodsCorner&&(propsData.cornerType===5)" :src=" propsData.goodsCornerImgUrl">
          <div class="goods-photo" :class="{'is-padding':paddingList[index], 'three-to-two-ratio':propsData.showRatio===1}">
            <img class="img" :src="item.goodsImg" alt="">
          </div>
          <div class="goods-info">
            <p class="goods-title" v-show="propsData.goodsName">
              {{item.goodsName}}
            </p>
            <p class="goods-description" v-show="propsData.goodsDescription">
              {{item.description?item.description:'无商品简介'}}
            </p>
            <p class="goods-price">
              <span v-show="propsData.goodsPrice">¥ {{item.maxPrice}}</span>

            </p>
            <i class="goods-cart" v-show="propsData.goodsBuy">
              <van-icon name="shopping-cart" class="goods-cart_icon" />
            </i>
          </div>
        </div>
      </van-col>
    </van-row>
    <el-card class="box-card" slot="right">
      <div slot="header" class="clearfix">
        <span>商品</span>
      </div>
      <el-form label-width="120px">
        <el-form-item label="商品来源">
          <el-radio-group v-model="propsData.source">
            <el-radio :label="1">商品</el-radio>
            <!-- <el-radio :label="2">商品分组</el-radio> -->
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品" class="form-item-border" v-show="propsData.source===1">
          <img-list></img-list>
          <div class="design-pic" @click="showGoodsDialog">
            <i class="el-icon-plus design-uploader-icon"></i>
          </div>

        </el-form-item>
        <el-form-item label="列表样式">
          <el-radio-group v-model="propsData.listType" class="radio-more">
            <el-radio :label="1">大图</el-radio>
            <el-radio :label="2">小图</el-radio>
            <el-radio :label="3">一大两小</el-radio>
            <el-radio :label="4">详细列表</el-radio>
            <el-radio :label="5">横向滑动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="图片填充方式" v-show="propsData.listType!==4">
          <el-radio-group v-model="propsData.paddingType">
            <el-radio :label="1">填充</el-radio>
            <el-radio :label="2">留白</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="显示比例" v-show="propsData.listType!==4">
          <el-radio-group v-model="propsData.showRatio">
            <el-radio :label="1">3:2</el-radio>
            <el-radio :label="2">1:1</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="显示样式">
          <el-radio-group v-model="propsData.showType">
            <el-radio :label="1">卡片</el-radio>
            <el-radio :label="2">极简</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="显示内容">
          <el-checkbox class="block-box" v-model="propsData.goodsName" v-show="propsData.listType!==4">商品名称</el-checkbox>
          <el-checkbox class="block-box" v-model="propsData.goodsDescription">商品简介</el-checkbox>
          <el-checkbox class="block-box" v-model="propsData.goodsPrice" v-show="propsData.listType!==4">商品价格</el-checkbox>
          <el-checkbox class="block-box" v-model="propsData.goodsBuy">购买按钮</el-checkbox>
          <el-checkbox class="block-box" v-model="propsData.goodsCorner">商品角标</el-checkbox>
          <el-radio-group v-model="propsData.cornerType" class="left-padding radio-more" v-show="propsData.goodsCorner">
            <el-radio :label="1">新品</el-radio>
            <el-radio :label="2">热卖</el-radio>
            <el-radio :label="3">NEW</el-radio>
            <el-radio :label="4">HOT</el-radio>
            <el-radio :label="5">自定义</el-radio>
          </el-radio-group>
          <el-upload v-if="propsData.goodsCorner&&(propsData.cornerType===5)" class="design-pic" action="" :show-file-list="false"
            :before-upload="beforeAvatarUpload">
            <img class="avatar corner-img" v-if="propsData.goodsCornerImgUrl" :src="propsData.goodsCornerImgUrl">
            <i v-else class="el-icon-plus design-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-card>
  </component-wrapper>
</template>
<script>
  //引入混合内容
  import {
    mixin
  } from '../mixin.js';
  import componentWrapper from '../common/index.vue';
  import {
    SET_GOODS_DIALOG,
    SET_GOODS_DIALOG_ID
  } from '@/store/mutation-types';
  // import {
  //   getUploadImgSrc
  // } from '@/common/js/service.js';
  import imgList from '../common/imgs.vue';
  export default {
    name: 'goods-info',
    mixins: [mixin],
    data() {
      return {
        paddingList: [],
        propsData: {
          source: 1,
          listType: 1,
          paddingType: 1,
          showType: 1, //显示样式
          cornerType: 1, //角标类型
          goodsName: true,
          goodsPrice: true,
          goodsDescription: true,
          goodsBuy: true,
          goodsCorner: false,
          goodsCornerImgUrl: 'https://img.yzcdn.cn/upload_files/2018/02/09/FrdT3BBympH1Mmt7g928OJKQgHxU.jpg?imageView2/2/w/520/h/0/q/75/format/webp',
          showRatio: 1,
          "goods": [],
        }
      }
    },
    components: {
      imgList,
    },
    watch: {
      'propsData.listType': function (newVal) {
        if (newVal === 4) {
          this.propsData.showRatio = 2;
          this.propsData.paddingType = 1;
          this.propsData.goodsName = true;
          this.propsData.goodsPrice = true;
          this.propsData.goodsDescription = true;
        }
        console.log('propsData.showType change ', this.propsData);

      },
      'propsData.showRatio': function () {
        this.resetPaddingList();

      },
      'propsData.paddingType': function () {
        this.resetPaddingList();
      },
      'propsData.goods': {
        handler: function (newVal) {
          this.resetPaddingList();
        },
        deep: true
      },
      '$store.state.dialog.isListChanged': function(newVal){
        if(newVal){
          this.propsData.goods = [...this.$store.state.dialog.list];
        }
      }
    },
    methods: {
      showGoodsDialog() {
        console.log('showGoodsDialog ', this.initInfo.uuid,);
        this.$store.commit(SET_GOODS_DIALOG_ID, this.initInfo.uuid);
        this.$store.commit(SET_GOODS_DIALOG, true);
      },
      resetPaddingList() {
        this.paddingList = this.propsData.goods.map(this.getPadding);
      },
      beforeAvatarUpload(file) {
        getUploadImgSrc(file).then((res) => {
          this.$set(this.propsData, 'goodsCornerImgUrl', res);
          console.log(this.propsData, this.propsData.goodsCornerImgUrl);
        });
        return false;
      },
      getPadding(item, index) {
        console.log('get padding ', item);
        let img = new Image();
        img.src = item.goodsImg;
        let vm = this;
        img.onload = function () {
          //是否宽度大于高度
          let isWidthLtHeight = img.width > (img.height * (vm.propsData.showRatio === 1 ? 1.5 : 1));
          let needPaddingHeight = (vm.propsData.paddingType === 2 && isWidthLtHeight) || (vm.propsData.paddingType ===
            1 && (!isWidthLtHeight));
          console.log('load img finish ', index, img.width, img.height, isWidthLtHeight, needPaddingHeight);
          vm.$set(vm.paddingList, index, !needPaddingHeight);
        };
      },
      addSwiper() {
        //如果选择横后滑动 TODO
        return;
        this.$nextTick(() => {
          var mySwiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            loop: true,

            // // 如果需要分页器
            // pagination: '.swiper-pagination',

            // // 如果需要前进后退按钮
            // nextButton: '.swiper-button-next',
            // prevButton: '.swiper-button-prev',

            // // 如果需要滚动条
            // scrollbar: '.swiper-scrollbar',
          })
        });
      }
    },
    mounted() {
      this.addSwiper();
    },
    computed: {
      cornerIcon: function () {
        if (!this.propsData.goodsCorner) {
          return false;
        }
        const typeName = ['new-arrival', 'hot-sale', 'new', 'hot'];
        if (this.propsData.cornerType !== 5) {
          return typeName[this.propsData.cornerType - 1];
        }
      },
      listLength: function () {
        let data, arr;
        //  return 12;
        if ((this.propsData.listType == 1) || (this.propsData.listType == 2)) {
          data = 24 / (this.propsData.listType);
          arr = new Array(this.propsData.goods.length).fill(data);
        } else if (this.propsData.listType == 3) {
          // data = 12;
          arr = this.propsData.goods.map((x, i) => {
            if (i % 3 === 0) {
              return 24;
            } else {
              return 12;
            }
          })
        } else if (this.propsData.listType == 4) {
          arr = new Array(this.propsData.goods.length).fill(24);

        } else {
          arr = new Array(this.propsData.goods.length).fill(8);
        }
        return arr;
      }
    }

  }

</script>
<style lang="scss" scoped>
  .block-box.el-checkbox {
    display: block;
    margin-left: 0;
  }

  .left-padding {
    padding-left: 24px;
  }

  .swiper-container {
    width: 100%; // height: 100%;
    // height: 200px;
  }

  .goods {
    position: relative;
    border: 1px solid #e5e5e5;
    margin: 6px;
    &.is-simple {
      border: none;
      margin: 0;
    } // border-right: 1px solid #ddd;
    .icon-corner-defined {
      position: absolute;
      top: 0;
      left: 0;
      width: 36px;
      height: 36px;
      display: inline-block;
      z-index: 1;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .icon-corner {
      position: absolute;
      top: 6px;
      left: 0;
      display: inline-block;


      .textBg {
        background-color: #fff;
        z-index: 1;
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        height: 13px;
        width: 32px;
      }
      &.hot-sale {
        .textBg {
          margin-left: 5px;
          width: 22px;
          height: 13px;
          transform: rotate(-45deg);
        }
      }
      &.new {
        .textBg {
          width: 22px;
          height: 10px;
          transform: rotate(-45deg);
        }
        .icon {
          top: -5px;
        }
      }
      &.hot {
        .textBg {
          width: 25px;
          height: 15px;
          margin-left: 3px;
          margin-top: 2px;
        }
        .icon {
          top: -5px;
        }
      }

      .icon {
        color: #f44;
        z-index: 2;
        font-size: 32px;
        top: -9px;
      }

    }
    .goods-info {
      padding: 8px;
      position: relative;

    } //填充时样式
    .goods-photo {
      width: 100%;
      min-height: 50px;
      max-height: 500px;
      padding-top: 100%;
      position: relative;
      overflow: hidden;
      vertical-align: middle;
      .img {
        width: 100%;
        margin: auto;
        height: auto;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
      &.three-to-two-ratio {
        padding-top: 66.7%;
      }
      &.is-padding {
        .img {
          width: auto;
          max-width: none;
          height: 100%;
          left: 50%;
          transform: translate(-50%);
        }

      }
      .goods-title {
        padding-top: 0;
        margin-top: 0;
      }
      .goods-cart {
        bottom: 8px;
      }
    }
    p {
      margin-bottom: 6px; // text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &-title {
      margin-top: 6px;
      color: $color-normal;
      font-size: 14px;
    }
    &-description {
      color: $color-light;
      font-size: 12px;
    }
    &-price {
      color: $color-primary;
      font-size: 16px;

    }
    .goods-cart {
      position: absolute;
      right: 8px;
      bottom: 14px;
      font-size: 16px;
      color: $color-primary;
      display: inline-block;
      width: 24px;
      height: 24px;
      text-align: center;
      border-radius: 50%;
      border: 1px solid $color-primary;
      .goods-cart_icon {
        line-height: 24px;

      }
    } //详情列表样式
    &.is-detail {
      padding: 10px 15px 10px 0;
      position: relative;
      .goods-photo {
        margin-right: 15px;
        float: left;
        width: 98px;
        height: 98px;
        padding-top: 98px;
        min-height: auto;
      }
      .goods-title {
        margin-top: 0;
      }
      .goods-info {
        margin-left: 113px;
        text-align: left;
        height: 98px;
        padding: 0;
      }
      .goods-price {
        position: absolute;
        bottom: 0;
        margin-bottom: 0;
      }
      .goods-cart {
        bottom: 0;
      }
      &.is-simple {
        border: none;
        border-bottom: 1px solid #e5e5e5; // margin: 0;
      }
    }
  }

  .design-pic {
    // margin-left: 24px;
  } // .fileUplod {
  //   display: none;
  // }
  .corner-img {
    display: inline-block;
    width: 50px;
    height: 50px;
  }

</style>
