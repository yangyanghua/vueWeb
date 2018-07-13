<template> 
  <div class="tabs">
    <el-row>
      <div class="base-component" v-for="(item,key) in editObj" :key="key" @click="toEditPage($event,key)">
        <el-button plain :class="[ key===currentView ? 'active' : false]">{{item}}</el-button>
      </div>
      <div class="widget"  v-for="(item,key) in widgetObj " :key="key" @click="toEditPage($event,key)">
        <el-button plain :class="[ key===currentView ? 'active' : false]">{{item}}</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>

  export default{
    data(){
      return{
        editObj: {
          "carousel": "图片轮播",
          "entry":"快捷入口",
          "jjgsaw": "拼图",
          "seize":"占位图片",
          "inform":"消息通知",
          "title":"标题",
        },
        widgetObj: {
          "group":"商品组",
          "shop":"店铺",
          "brand":"品牌"
        },
        isActive: false,
      }
    },
    props:['currentView'],
    computed: {},
    components:{},
    watch: {
      currentView(){
        //给类名active
        // let newArr = [...Object.keys(this.editObj)];
        // this.isActive = this.in_array(newArr,this.currentView);
      },
    },
    methods: {
      toEditPage(e,key){
        this.$router.push({name: `${key}AppHome` })
      },
    },
    mounted(){
    }
  }
</script>