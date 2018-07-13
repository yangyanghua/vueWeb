import appHome from '@/modules/appHome/edit.vue';
import jjgsaw from '@/modules/appHome/components/jjgsaw/jjgsaw.vue'
import popup from '@/modules/appHome/components/popup/popup.vue'
import carousel from '@/modules/appHome/components/carousel/carousel.vue'
import entry from '@/modules/appHome/components/entry/entry.vue'
import seize from '@/modules/appHome/components/seize/seize.vue'
import inform from '@/modules/appHome/components/inform/inform.vue'
import title from '@/modules/appHome/components/title/title.vue'
import group from '@/modules/appHome/components/group/group.vue'
import shop from '@/modules/appHome/components/shop/shop.vue'
import brand from '@/modules/appHome/components/brand/brand.vue'
import common from '@/modules/appHome/components/common.vue'


export default [{
  path: 'appHome',
  component: appHome,
  children:[
    { path: '/',name:'appHome', component: common},
    { path: 'jjgsaw',name: 'jjgsawAppHome', component: jjgsaw },
    { path: 'popup',name: 'popupAppHome', component: popup},
    { path: 'carousel',name: 'carouselAppHome', component: carousel},
    { path: 'entry', name: 'entryAppHome', component: entry },
    { path: 'seize', name: 'seizeAppHome', component: seize },
    { path: 'inform', name: 'informAppHome', component: inform },
    { path: 'title', name: 'titleAppHome', component: title },
    { path: 'group', name: 'groupAppHome', component: group },//重名
    { path: 'shop', name: 'shopAppHome', component: shop },
    { path: 'brand', name: 'brandAppHome', component: brand },
  ]
}];
