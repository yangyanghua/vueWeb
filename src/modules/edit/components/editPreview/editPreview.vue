<template> 
  <div class="edit-preview">
    <!-- <div v-if="previewEditerType.indexOf(currentView)>-1">{{currentView}}编辑器预览</div> -->
    <div v-if="currentView==='jjgsaw'">{{currentView}}</div>
    <div v-else-if="currentView==='popup'">{{currentView}}</div>
    <div v-else-if="currentView==='carousel'" class="carousel-box">
      <!-- <Carousel v-model="value1" loop :radius-dot="setting.radiusDot">
        <CarouselItem>
            <div class="demo-carousel">1</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">2</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">3</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">4</div>
        </CarouselItem>
      </Carousel> -->
      <div v-if="setting.style==1">轮播图1</div>
      <div v-if="setting.style==2">轮播图2</div>
      <div v-if="setting.style==3">轮播图3</div>
      <button @click="changeDots">click me</button>
    </div>
    <div v-else-if="currentView==='entry'">{{currentView}}</div>
    <div v-else-if="currentView==='seize'">{{currentView}}</div>
    <div v-else-if="currentView==='inform'">{{currentView}}</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex' 

  export default{
    data(){
      return{
        previewEditerType: [],
        value1: 0,
        // 当前组件对应配置
        setting: {},
      }
    },
    props:['currentView'],
    watch: {
      currentView(){
        //切换路由后：读取预览编辑器类型和对应读取配置
        this.setting = this.objCopy(this.$store.state.edit[this.currentView]);
        // console.log(this.$store.state.edit.carousel);
      },
      "setting.stlye"(){
        // console.log(this.setting.style);
      },
      state(){
        // console.log(this.$store.state.edit)
      }
      
    },
    computed: {
      
    },
    
    mounted(){
      this.previewEditerType = [...this.$store.state.edit.previewEditerType];
    },
    methods: {
      changeDots(){
        this.setting.radiusDot = !this.setting.radiusDot;
        this.$store.commit('carousel',{carousel:this.setting})
      }
    }
  }
</script>