import componentWrapper from './common/index.vue';
import {generateUUID} from '@/common/js/uuid.js';

export const mixin = {
    components:{
        componentWrapper
      },
      props: {
        initInfo: {
          type: Object,
          required: true
        },
        itemIndex: {
        }
      },

      mounted(){
        console.log('init ', this.initInfo, this.itemIndex);
        this.propsData = {...this.initInfo.propsData};
      },
      computed: {
          storeList: function(){
              return this.$store.state.miniPage.list;
          }
      },

    methods: {
  
    }
  };