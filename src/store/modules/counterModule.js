export default {
  namespaced: true,
  state: {
    timer: null,
    counter: 0,
    timeCounter: null,
  },
  mutations: {
    SET_COUNTING(state, payload) {
      state.timeCounter = payload;
    },
    STOP_COUNTING(state) {
      clearInterval(state.timer);
      state.timer = null;
    },
    RESET_TIMECOUNTER(state) {
      state.timeCounter = '- -';
    },
    SET_COUNTER(state) {
      state.counter = 0;
    },
    ADD_COUNTER(state) {
      state.counter += 1;
    },
  },
  actions: {
    beginCounting({ commit, state }, payload) {
      if (!state.timer) {
        commit('SET_COUNTING', payload);
        state.timer = setInterval(() => {
          if (state.timeCounter === 0) commit('STOP_COUNTING');
          else {
            state.timeCounter -= 1;
          }
        }, 1000);
      }
    },
    stopCounting({ commit }) {
      commit('STOP_COUNTING');
    },
    resetTimeCounter({ commit }) {
      commit('RESET_TIMECOUNTER');
    },
    addCounter({ commit }) {
      commit('ADD_COUNTER');
    },
    setCounter({ commit }) {
      commit('SET_COUNTER');
    },
  },
};
