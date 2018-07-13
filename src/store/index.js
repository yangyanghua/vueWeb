import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import miniPage from './modules/miniPage';
import edit from './modules/edit/edit'
import carousel from './modules/edit/components/carousel'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  getters,
  modules: {
    
    edit,
    miniPage,
    carousel
  },
  strict: debug,
});