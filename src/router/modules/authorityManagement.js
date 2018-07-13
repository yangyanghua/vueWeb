import authorityManagement from '@/modules/authorityManagement/index.vue';
import authorityManagementList from '@/modules/authorityManagement/components/list.vue';
import authorityManagementDetail from '@/modules/authorityManagement/components/detail.vue';

//消息模板设置
import operateManagement from '@/modules/authorityManagement/components/operateManagement.vue';
import operateManagementList from '@/modules/authorityManagement/components/operateManagement/index.vue';
import operateManagementDetail from '@/modules/authorityManagement/components/operateManagement/detail.vue';

export default [{
  path: 'authorityManagement',
  component: authorityManagement,
//   alias: '/goods/list',
  redirect: '/authorityManagement/list',
  children: [{
      path: 'list',
      component: authorityManagementList
    },
    {
      path: 'detail',
      component: authorityManagementDetail
    },//版本管理
    {
      path: 'operateManagement',
      component: operateManagement,
      redirect: '/authorityManagement/operateManagement/list',
      children:[{
        path:'list',
        component:operateManagementList
      },
      {
        path:'detail',
        component:operateManagementDetail
      }]
    }]
}];
