/**
 * Footer store 筹集Foot所需的字段
 */
import * as config from '../mutation-types'

// initial state
const state = {
  // 默认为false
  config: {},
  wechat: {},
  menu: [],
  baseinfo: {},
  footerSelect: ''
}

// actions
const actions = {
  // 存配置的那些幻灯片andsoon
  [config.SAVE_CONFIG] ({ commit }, value) {
    commit(config.SAVE_CONFIG, value)
  },
  // 存微信信息
  [config.SAVE_WECHATINFO] ({ commit }, value) {
    commit(config.SAVE_WECHATINFO, value)
  },
  [config.SAVE_MENU] ({ commit }, value) {
    commit(config.SAVE_MENU, value)
  },
  [config.SAVE_BASEINFO] ({ commit }, value) {
    commit(config.SAVE_BASEINFO, value)
  },
  // 菜单状态
  [config.SET_MENUSELECT] ({ commit }, value) {
    commit(config.SET_MENUSELECT, value)
  },
  [config.SET_MENUACTIVE] ({ commit }, value) {
    commit(config.SET_MENUACTIVE, value)
  },
  // 修改底部选择
  [config.SET_FOOTERSELECT] ({ commit }, value) {
    commit(config.SET_FOOTERSELECT, value)
  }
}

// mutations
const mutations = {
  // 设置客户Overview
  [config.SAVE_CONFIG] (state, value) {
    state.config = value
  },
  [config.SAVE_WECHATINFO] (state, value) {
    state.wechat = value
  },
  [config.SAVE_MENU] (state, value) {
    state.menu = value
  },
  [config.SAVE_BASEINFO] (state, value) {
    state.baseinfo = value
  },
  // 菜单状态
  [config.SET_MENUSELECT] (state, value) {
    state.menu.forEach((i) => {
      let _stop = false
      if (value.type === 'id' && i.id === parseInt(value.value) || value.type === 'tplid' && i.tplid === value.value) {
        i.select = true
        i.active = true
        return
      } else {
        i.select = false
        i.active = false
        i.children.forEach((j) => {
          if (value.type === 'id' && j.id === parseInt(value.value) || value.type === 'tplid' && j.tplid === value.value) {
            i.select = true
            i.active = true
            j.select = true
            _stop = true
            return
          } else {
            j.select = false
          }
        })
        if (_stop) {
          return
        }
      }
    })
  },
  [config.SET_MENUACTIVE] (state, value) {
    state.menu.forEach((j) => {
      if (value === j) {
        j.active = !j.active
      } else {
        j.active = false
      }
    })
  },
  // 修改底部选择
  [config.SET_FOOTERSELECT] (state, value) {
    state.footerSelect = value
  }
}

// getters
const getters = {
  getSystemConfig: state => state.config,
  menu: state => state.menu
}

export default {
  state,
  actions,
  getters,
  mutations
}
