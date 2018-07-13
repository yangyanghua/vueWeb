import {http, api} from '@/common/http/http.js';

import  qs from 'qs';

export const getClassify = (params = {}) => {
    return http.get(api.getClassify, {params});
}


export const classifyAdd = (params = {}) => {
    return http.post(api.classifyAdd, params);
}
export const classifyUpdate = (params = {}) => {
    return http.post(api.classifyUpdate, params);
}

export const classifyDelete = (params = {}) => {
    return http.get(api.classifyDelete+params);
}
