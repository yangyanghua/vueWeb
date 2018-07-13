
//传入store的属性，同步方法，异步方法
const state = {
  isPopupVisible: false,
}


const mutations = {
  popup(state) {
    //hack：mutation handlers ：数组用slice()
    state.isPopupVisible = true;
  }

}

const actions = {

}

export default {
  state,
  mutations,
  actions
}