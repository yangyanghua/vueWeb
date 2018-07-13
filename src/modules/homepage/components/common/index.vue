<template>
  <div class="design-component" :class="{'is-active':isAcitve}" @click="comClick" v-if="storeList.find(x=>x===uuid)">
    <div class="design-component-preview">
      <slot name="left">show content</slot>
      <el-popover placement="top" width="160" v-model="comPopoverVisible">
        <p>确定删除？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="comHidePopover">取消</el-button>
          <el-button type="primary" size="mini" @click="deleteComponent">确定</el-button>
        </div>
        <van-icon slot="reference" name="clear" class="close-btn" />
      </el-popover>

    </div>
    <div class="design-component-editor" v-show="isAcitve">
      <slot name="right">edit content</slot>
      <!-- <el-card class="box-card">
      </el-card> -->
    </div>
  </div>
</template>
<script>
  //SET_SELECTED_COMPONENT设置当前所选组件uuid，只有当前uuid与所存一致才激活,DELETE_COMPONENT删除组件
  import {
    SET_SELECTED_COMPONENT,
    DELETE_COMPONENT
  } from '@/store/mutation-types';

  export default {
    data: function () {
      return {
        comPopoverVisible: false,
      }
    },
    props: {
      uuid: {
        required: true
      },
      storeList: {
        required: true
      }
    },
    computed: {
      isAcitve: function () {
        console.log('uuid currentUUID', this.uuid,this.currentUUID,this.uuid === this.currentUUID);
        return this.uuid === this.currentUUID;
      },
      currentUUID: function () {
        return this.$store.getters.currentSelectionComponent;
      }
    },
    methods: {
      comHidePopover() {
        this.comPopoverVisible = false;
      },
      deleteComponent() {
        //将该组件从显示组件中删除
        this.$store.commit(DELETE_COMPONENT, this.uuid);
      },
      comClick() {
        this.$store.commit(SET_SELECTED_COMPONENT, this.uuid);
        console.log('uuid :  ', this.uuid);
        console.log('uuid currentUUID', this.uuid,this.currentUUID,this.uuid === this.currentUUID);
        
      }
    }
  }

</script>
