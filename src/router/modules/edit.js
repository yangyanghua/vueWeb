import edit from '@/modules/edit/edit.vue';
import jjgsaw from '@/modules/edit/components/jjgsaw/jjgsaw.vue'
import popup from '@/modules/edit/components/popup/popup.vue'
import carousel from '@/modules/edit/components/carousel/carousel.vue'
import entry from '@/modules/edit/components/entry/entry.vue'
import seize from '@/modules/edit/components/seize/seize.vue'
import inform from '@/modules/edit/components/inform/inform.vue'
import title from '@/modules/edit/components/title/title.vue'
import group from '@/modules/edit/components/group/group.vue'
import shop from '@/modules/edit/components/shop/shop.vue'
import brand from '@/modules/edit/components/brand/brand.vue'


export default [{
  path: 'edit',
  component: edit,
  children:[
    { path: '/', component: jjgsaw},
    { path: 'jjgsaw',name:'jjgsaw', component: jjgsaw },
    { path: 'popup', name:'popup', component: popup},
    { path: 'carousel',name:'carousel', component: carousel},
    { path: 'entry',name:'entry', component: entry },
    { path: 'seize',name:'seize', component: seize },
    { path: 'inform',name:'inform', component: inform },
    { path: 'title', name: 'title', component: title },
    { path: 'group', name: 'group', component: group },//重名
    { path: 'shop', name: 'shop', component: shop },
    { path: 'brand', name: 'brand', component: brand },
  ]
}];
