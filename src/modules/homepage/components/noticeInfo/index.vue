<template>
  <component-wrapper :uuid="initInfo.uuid" :id="initInfo.uuid" :key="initInfo.uuid" :storeList="storeList">
    <!-- 
  <div class="design-component" @click="comClick">
    <div  class="design-component-preview" :class="{'is-active':isAcitve}"> -->
    <van-notice-bar slot="left" :background="propsData.bgColor" :color="propsData.textColor" :scrollable="false" :text="propsData.text?propsData.text:'请填写内容，如果过长，将会在手机上滚动显示'"
      left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png" />
    <!-- <el-popover
  placement="top"
  width="160"
  v-model="comPopoverVisible">
  <p>确定删除？</p>
  <div style="text-align: right; margin: 0">
    <el-button size="mini" type="text" @click="comHidePopover">取消</el-button>
    <el-button type="primary" size="mini" @click="comHidePopover">确定</el-button>
  </div>
     <van-icon slot="reference" name="clear" class="close-btn" />
</el-popover> -->

    <!-- </div> -->
    <!-- <div class="design-component-editor" v-show="showCard"> -->
    <el-card class="box-card" slot="right">
      <div slot="header" class="clearfix">
        <span>公告</span>
      </div>
      <el-form label-width="80px">
        <el-form-item label="公告" required>
          <el-input size="small" v-model="propsData.text" placeholder="请填写内容，如果过长，将会在手机上滚动显示">
          </el-input>
        </el-form-item>
        <el-form-item label="背景颜色">
          <el-color-picker v-model="propsData.bgColor"></el-color-picker>
          <el-button type="text" class="btn-text" @click="resetbgColor">重置</el-button>
        </el-form-item>
        <el-form-item label="文字颜色">
          <el-color-picker v-model="propsData.textColor"></el-color-picker>
          <el-button type="text" class="btn-text" @click="resettextColor">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- </div> -->
    <!-- </div> -->
  </component-wrapper>
</template>
<script>
  const bgColor = '#fff7cc';
  const textColor = '#f60';
  import {
    mixin
  } from '../mixin.js';
  export default {
    mixins: [mixin],
    name: 'notice-info',
    data() {
      return {
        propsData:{
          bgColor: bgColor, //背景颜色
        textColor: textColor, //文字颜色
        text: '',
        }
        
        // isAcitve: false,
      }
    },

    methods: {
      resetbgColor() {
        this.propsData.bgColor = bgColor;
      },
      resettextColor() {
        this.propsData.textColor = textColor;
      }
    },

  }

</script>
<style scoped>
  .btn-text {
    vertical-align: top;
    margin-left: 10px;
  }

</style>
