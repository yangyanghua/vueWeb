import goodsGroup from '@/modules/goodsGroup/index.vue';
import goodsGroupList from '@/modules/goodsGroup/components/list.vue';
import goodsDetail from '@/modules/goodsGroup/components/detail.vue';
export default [{
  path: 'goodsGroup',
  component: goodsGroup,
  redirect: '/goodsGroup/list',
    children: [
    {
      path: 'list',
      component: goodsGroupList
    },
    {
      path: '/goodsGroup/list/detail',
      component: goodsDetail
    },    
    ]
}];
