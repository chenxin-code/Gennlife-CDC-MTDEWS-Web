const state = {
  pageWidth: 1920, // 设计图宽度
  timeIntervalFun: []// 定时器函数
}

const mutations = {
  CHANGE_DATA: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeData({ commit }, data) {
    commit('CHANGE_DATA', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
