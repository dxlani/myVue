import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    author: 'Dingxiaolin',
    token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzaW5vIiwianRpIjoiN2YwNjIyNjMtYzBlMC00N2M4LTk4ODYtNjdlY2E3N2FhZjNlLDE0MDZkNTY5LTIzZjItNGJkMC1hODgzLTE4NTM4NjdkZTFjNSIsInNpZCI6IjIwMCIsImlhdCI6MTUyNjM0NzMwNSwibmJmIjoxNTI2MjYwOTA1LCJleHAiOjE1MjYzNDczMDUsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MTc3NDEiLCJhdWQiOiJjc3AifQ.NwR_wclkAaGDlzpgD6oR-hiiWm6zoZqh43dtfPhhMzQ',
    isLogin:''
  },
  mutations: {
    SET_TOKEN: (state, data) => {
      state.token;
    }
},
actions: {     
},

})
//if is logined define this token
export default store