import {http, api} from '@/common/http/http.js';


// 保存微页面：说明请参考wiki：http://wiki.chinawidth.cn:8383/pages/viewpage.action?pageId=4259857

export const saveMiniPage = (params = {}) => {
    return http.post(api.saveMiniPage, params);
  };

  export const loadGroupsComponent = (params = {}) => {
    return http.post(api.loadGroupsComponent, params);
  };