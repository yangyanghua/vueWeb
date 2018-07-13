import management from '@/modules/management/index.vue';
import list from '@/modules/management/components/list.vue';
import brandAuthorization from '@/modules/management/components/brandAuthorization.vue';
import brandManagement from '@/modules/management/components/brandManagement.vue';
import brandAdd from '@/modules/management/components/brandAdd.vue';
import brandPage from '@/modules/management/components/brandPage.vue';
import editpage from '@/modules/management/components/editpage.vue';

export default [{
  path: 'management',
  component: management,
//   alias: '/goods/list',
  redirect: '/management/list',
  children: [{
      path: 'list',
      component: list
    },
    {
      path: 'brandAuthorization',
      component: brandAuthorization
    },
    {
      path: 'brandManagement',
      component: brandManagement
    },
    {
      path: 'brandAdd',
      component: brandAdd
    },
    {
      path: 'brandManagement/brandindex',
      component: brandPage
    },
    {
      path: 'brandManagement/pageedit',
      component: editpage
    },    
  ]
}];
