/**
 * 测试组件store
 */
import * as types from '../mutation-types'

// initial state
const state = {
  // 默认为false
  text: '默认值'
}

// actions
const actions = {
  // 设置为转菊花
  setText ({ commit }, value) {
    console.log(value)
    commit(types.SET_TEXT, value)
  },
  delText ({ commit }) {
    commit(types.DEL_TEXT)
  }
}

// mutations
const mutations = {
  // 设置客户Overview
  [types.SET_TEXT] (state, value) {
    state.text = value
  },
  [types.DEL_TEXT] (state) {
    state.text = '默认值'
  }
}

// getters
const getters = {
  getText: state => state.text
}

export default {
  state,
  actions,
  getters,
  mutations
}
