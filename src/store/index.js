import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

import test from './modules/test'
import system from './modules/system'
import config from './modules/config'

Vue.use(Vuex)
const store = new Vuex.Store({
  actions,
  getters,
  modules: {
    test,
    system,
    config
  }
})

export default store

