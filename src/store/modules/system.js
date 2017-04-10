/**
 * 系统配置，用户信息 store
 */
import * as systems from '../mutation-types'

// initial state
const state = {
  userType: 1,
  userInfo: {
    name: '',
    customer_code: '',
    mobile: ''
  },
  showReg: false
}

// getters
const getters = {
  // 查询
  getUserType: state => state.userType,
  getUserInfo: state => state.userInfo,
  showReg: state => state.showReg
}

// mutations
const mutations = {
  // 设置
  [systems.SET_USERTYPE] (state, value) {
    state.userType = value
  },
  [systems.SET_USERINFO] (state, value) {
    state.userInfo.name = value.name
    state.userInfo.customer_code = value.customer_code
    state.userInfo.mobile = value.mobile
  },
  [systems.RESETUSER] (state) {
    state.userType = 1
    state.userInfo.name = state.userInfo.customer_code = state.userInfo.mobile = ''
  },
  [systems.SET_REG] (state, value) {
    state.showReg = value
  }
}

// actions
const actions = {
  // 登录状态
  [systems.SET_USERTYPE] ({ commit }, value) {
    commit('SET_USERTYPE', value)
  },
  // 用户信息
  [systems.SET_USERINFO] ({ commit }, value) {
    commit('SET_USERINFO', value)
  },
  [systems.RESETUSER] ({ commit }) {
    commit('RESETUSER')
  },
  [systems.SET_REG] ({ commit }, value) {
    commit('SET_REG', value)
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
