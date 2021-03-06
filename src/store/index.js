import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
    allUsers: [
      {
        id: 1,
        name: "sm",
        email: "abc@google.com",
        password: "1234",
      },
    ],
    isLogin: false,
    isLoginError: false,
  },
  mutations: {
    // 로그인이 성공했을 때
    loginSuccess(state, payload) {
      state.userInfo = payload;
      state.isLogin = true;
      state.isLoginError = false;
    },
    loginError(state) {
      state.userInfo = null;
      state.isLogin = false;
      state.isLoginError = true;
    },
    logout(state) {
      state.isLogin = false;
      state.isLoginError = false;
      state.userInfo = null;
    },
  },
  actions: {
    // 로그인 시도
    login({ state, commit }, loginObj) {
      let selectedUser = null;
      state.allUsers.forEach((user) => {
        if (user.email === loginObj.email) selectedUser = user;
      });
      if (selectedUser === null || selectedUser.password !== loginObj.password)
        commit("loginError");
      else {
        commit("loginSuccess", selectedUser);
        router.push({ name: "Mypage" });
      }
    },
    logout({ commit }) {
      commit("logout");
      router.push({ name: "Home" });
    },
  },
  modules: {},
});
