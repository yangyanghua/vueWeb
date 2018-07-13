<template>
 	<main-wrapper>
		<div class="toph" slot="header">
			<span>消息模板设置</span>
		</div>
		<div slot="main" class=" media">
    <div class="preview com-block-bg">
      <sub-component :items="list">
      </sub-component>
    </div>
    <div class="gounps">
      <el-button type="primary" plain v-for="item in btnList" :key="item.type" @click="addComponent(item)">{{item.name}}</el-button>
    </div>
    <div>
      <el-button type="primary" @click="saveMiniPage">保存</el-button>
    </div>
    <!-- <goods-dialog>
    </goods-dialog> -->
  </div>
   	</main-wrapper>
</template>
<script>
  import Components from './components/index.js';
  // import goodsDialog from '@/components/goods/index.vue';
  import {
    getBtnList
  } from './components/config.js';
  import {
    GetUUID
  } from '@/common/js/uuid.js';
  import {
    SET_SELECTED_COMPONENT,
    ADD_COMPONENT
  } from '@/store/mutation-types';
  import * as Service from '@/common/service/store/miniPage.js';

  export default {
    data() {
      return {
        form: {
          styleType: 'stype1',
          bgImageUrl: '',
        },
        list: [],
        btnList: getBtnList(),
        sortble2: {},
      }
    },

    methods: {
      //初始化编辑器时加载组件 TODO 目前组件为固定的
      initComponent(){
        Service.loadGroupsComponent({editorId: 0}).then(res => {
          console.log('get components ', res);
        });
      },
      //点击保存时操作
      saveMiniPage() {
        console.log('save ', this.list, this.$store.state.miniPage.list);
        this.list = this.list.filter(item => {
          return this.$store.state.miniPage.list.indexOf(item.uuid)>-1
        });
        console.log('filter delete item ', this.list);
        let params = {
          editorId: 0,
          pageType: 'index',
          status: 1,
          pageName: '自定义名称'
        }
        params.componentProp = JSON.stringify(this.list.map(x => {
          if (x.type === 'goods-info') {
            x.goodsId = x.propsData.goods.map(y => y.id);
          }
          return x;
        }));
        console.log('params ', params);
        Service.saveMiniPage(params).then(res => {
          console.log(res);
        })
      },
      addComponent(item) {
        //为新添加的组件设置uuid
        let uuid = GetUUID();
        this.list.push({ ...item,
          uuid
        });
        //设置新组件为当前被选中组件
        this.$store.commit(SET_SELECTED_COMPONENT, uuid);
        //将新组件添加到要显示的组件当中
        this.$store.commit(ADD_COMPONENT, uuid);
        console.log(this.list);
        var el = document.getElementsByClassName('preview-page');
        if (el.length != 0) {
          var _this = this;
          this.sortble2 = Sortable.create(el[0], {
            sort: true,
            group: {
              name: 'advanced',
              pull: false,
              put: true
            },
            animation: 150,
            onUpdate: function (evt) {
              //重新排序数组
              var item = _this.list[evt.oldIndex];
              _this.list.splice(evt.oldIndex, 1);
              _this.list.splice(evt.newIndex, 0, item)
              console.log('sort update', _this.list);
            }
          });
        }
      }
    },
    components: {
      // goodsDialog
    },
    mounted() {
      this.initComponent();
      var el = document.getElementsByClassName('preview-page');
      if (el.length != 0) {
        var _this = this;
        this.sortble2 = Sortable.create(el[0], {
          sort: true,
          group: {
            name: 'advanced',
            pull: false,
            put: true
          },
          animation: 150,
          onUpdate: function (evt) {
            var item = _this.list[evt.oldIndex];
            var item = _this.list[evt.oldIndex];
            _this.list.splice(evt.oldIndex, 1);
            _this.list.splice(evt.newIndex, 0, item)

          }
        });
      }
         this.addComponent(this.btnList[0]);
    }
  }

</script>
<style lang="scss" scoped>
  .preview-page {
    width: 320px;
    min-height: 450px;
    position: relative; // border: 1px solid #e5e5e5;
  }

  .preview {
    width: 320px;
    min-height: 450px;
    border: 1px solid #e5e5e5;
    padding-bottom: 5px;

  }

  .gounps {
    // position: relative;
    // margin-top: 20px;
    width: 320px;
    border: 1px solid #e5e5e5;
    border-top: none;
    padding: 20px;

  }

  /deep/ .design-component {
    position: relative;
    border: 1px dashed transparent;

    &.is-active {
      border: 1px dashed $color-primary;
    }
    &.is-active:hover,
    &:hover {
      border: 1px dashed $color-primary;
      .close-btn {
        display: inline-block;
        font-size: 16px;
        z-index: 5;
        cursor: pointer;
        &:hover {
          color: $color-primary;
        }
      }
    }
  }

  /deep/ .design-component-preview {
    cursor: move;
    position: relative;
    border: 1px dashed transparent;

    .close-btn {
      position: absolute;
      right: 0;
      top: -8px;
      right: -8px;
      display: none;
      background-color: #fff;
    }


  }

  /deep/ .design-component-editor {
    width: 520px;
    position: absolute;
    top: 0; //  padding: 12px 10px;
    margin-left: 20px;
    left: 100%;
    min-height: 50px;
    background-color: #fff; //  border: 1px solid #e5e5e5;
  }

  /deep/ .radio-more {
    padding-top: 11px;
    line-height: 30px;
    .el-radio {
      margin-left: 0;
      margin-right: 30px;
      display: inline;
    }
  }

  /deep/ .design-pic {
    position: relative;
    margin-top: 11px;
    // float: left;
    width: 50px;
    height: 50px;
    cursor: pointer;
    margin: 0 10px 10px 0;
    display: inline-block;
    vertical-align: top;
    border: 1px dashed #ddd;
    background-color: #fff;
    text-align: center;
    .design-uploader-icon {
      line-height: 50px;
      font-size: 24px;
      color: $color-light;

    }
    &:hover .design-uploader-icon {
      color: $color-primary;
    }
  }

  /deep/ .form-item-border {
    padding: 10px 0;
    margin-top: -10px;
    border: 1px solid #f0f0f0;
  }

</style>
