export default {
  namespaced: true,
  state: {
    isShowDesc: false,
    isShowIntro: false,
    isShowErr: false,
    isFailed: false,
    isShow: {
      final: false,
      one: false,
      two: false,
      three: false,
    },
    isWin: {
      one: false,
      two: false,
      three: false,
    },
  },
  mutations: {
    SET_ISSHOW(state, payload) {
      state.isShowDesc = !state.isShowDesc;
      state.isShow[payload] = !state.isShow[payload];
    },
    SET_ISWIN(state, payload) {
      state.isShowDesc = !state.isShowDesc;
      state.isWin[payload] = !state.isWin[payload];
    },
    SET_ISFAILED(state) {
      state.isShowDesc = !state.isShowDesc;
      state.isFailed = !state.isFailed;
    },
    SET_ISSHOWFINAL(state) {
      state.isShowDesc = !state.isShowDesc;
      state.isShow.final = !state.isShow.final;
    },
    SET_ISSHOWINTRO(state) {
      state.isShowDesc = !state.isShowDesc;
      state.isShowIntro = !state.isShowIntro;
    },
    SET_CLOSEINTRO(state) {
      state.isShowDesc = !state.isShowDesc;
      state.isShowIntro = false;
    },
    SET_ISSHOWERR(state) {
      state.isShowDesc = !state.isShowDesc;
      state.isShowErr = true;
    },
    SET_CLOSEERR(state) {
      state.isShowDesc = !state.isShowDesc;
      state.isShowErr = false;
    },
  },
  actions: {
    setIsShow({ commit }, payload) {
      commit('SET_ISSHOW', payload);
    },
    setIsWin({ commit }, payload) {
      commit('SET_ISWIN', payload);
    },
    setReplay({ commit }, payload) {
      commit('SET_ISWIN', payload);
    },
    setBackToInfo({ commit }, payload) {
      commit('SET_ISWIN', payload);
    },
    setIsFailed({ commit }) {
      commit('SET_ISFAILED');
    },
    setIsShowFinal({ commit }) {
      commit('SET_ISSHOWFINAL');
    },
    setIsShowIntro({ commit }) {
      commit('SET_ISSHOWINTRO');
    },
    closeIntro({ commit }) {
      commit('SET_CLOSEINTRO');
    },
    setIsShowErr({ commit }) {
      commit('SET_ISSHOWERR');
    },
    closeErr({ commit }) {
      commit('SET_CLOSEERR');
    },
  },
};
