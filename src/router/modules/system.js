import system from '@/modules/system/index.vue';
import list from '@/modules/system/components/list.vue';
import detail from '@/modules/system/components/detail.vue';
//版本管理
import edition from '@/modules/system/components/edition.vue';
import editionList from '@/modules/system/components/edition/index.vue';
import editionDetail from '@/modules/system/components/edition/detail.vue';
//参数配置
import parameter from '@/modules/system/components/parameter.vue';
import parameterList from '@/modules/system/components/parameter/index.vue';
import parameterDetail from '@/modules/system/components/parameter/detail.vue';
//APP启动广告
import appAdvertisement from '@/modules/system/components/appAdvertisement.vue'; 
import appAdvertisementList from '@/modules/system/components/appAdvertisement/index.vue';
import appAdvertisementDetail from '@/modules/system/components/appAdvertisement/detail.vue';
//区域设置
import regionalSetting from '@/modules/system/components/regionalSetting.vue';
import regionalSettingList from '@/modules/system/components/regionalSetting/index.vue';
//消息模板设置
import messageTemplate from '@/modules/system/components/messageTemplate.vue';
import messageTemplateList from '@/modules/system/components/messageTemplate/index.vue';
import messageTemplateDetail from '@/modules/system/components/messageTemplate/detail.vue';


//消息配置
import configurationMessage from '@/modules/system/components/configurationMessage.vue';
import configurationMessageList from '@/modules/system/components/configurationMessage/index.vue';
export default [{
  path: 'system',
  component: system,
  redirect: '/system/list',
  children: [{
      path: 'list',
      component: list
    },
    {
      path: 'detail',
      component: detail
    },
    //版本管理
    {
      path: 'versionManagement',
      component: edition,
      redirect: '/system/versionManagement/list',
      children:[{
        path:'list',
        component:editionList
      },
      {
        path:'detail',
        component:editionDetail
      }]
    },
    //参数配置
   {
      path: 'parameter',
      component: parameter,
       redirect: '/system/parameter/list',
      children:[{
        path:'list',
        component:parameterList
      },
      {
        path:'detail',
        component:parameterDetail
      }]
    },
    //APP启动广告
    {
      path: 'appAdvertisement',
      component: appAdvertisement,
       redirect: '/system/appAdvertisement/list',
      children:[{
        path:'list',
        component:appAdvertisementList
      },
      {
        path:'detail',
        component:appAdvertisementDetail 
      }]
    },
    //区域设置
    {
      path: 'regionalSetting',
      component: regionalSetting,
       redirect: '/system/regionalSetting/list',
      children:[{
        path:'list',
        component:regionalSettingList
      }]
    },
    //消息模板设置
    {
      path: 'messageTemplate',
      component: messageTemplate,
       redirect: '/system/messageTemplate/list',
      children:[{
        path:'list',
        component:messageTemplateList
      },
      {
        path:'detail',
        component:messageTemplateDetail 
      }]
    },
    //消息配置
    {
      path: 'configurationMessage',
      component: configurationMessage,
       redirect: '/system/configurationMessage/list',
      children:[{
        path:'list',
        component:configurationMessageList
      }]
    },
  ]
}];
