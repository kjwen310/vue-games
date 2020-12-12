import { createStore } from 'vuex';
import Star from './modules/starModule';
import Counter from './modules/counterModule';
import Desc from './modules/descModule';

export default createStore({
  state: {
    mode: '',
    innerWidth: 0,
    isGet: {
      one: false,
      two: false,
      three: false,
    },
    isDone: {
      intro: false,
      Two: false,
      three: false,
    },
  },

  mutations: {
    START_GAME(state, payload) {
      state.innerWidth = payload;
    },
    SET_MODE(state, payload) {
      state.isDone.intro = false;
      state.mode = payload;
    },
    SET_ISGET(state, payload) {
      state.isGet[payload] = true;
    },
    RESET_ISGET(state) {
      state.isGet.one = false;
      state.isGet.two = false;
      state.isGet.three = false;
      state.isDone.intro = false;
    },
    SET_ISDONE(state, payload) {
      state.isDone[payload] = true;
    },
    PARALLAX(_, e) {
      document.querySelectorAll('.layer').forEach((layer) => {
        const sp = layer.getAttribute('data-speed');
        const x = (window.innerWidth - e.pageX * sp) / 100;
        const y = (window.innerHeight - e.pageY * sp) / 100;
        // eslint-disable-next-line
        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    },
  },

  actions: {
    startGame({ commit }, payload) {
      commit('START_GAME', payload);
    },
    setMode({ commit }, payload) {
      commit('SET_MODE', payload);
    },
    setIsGet({ commit }, payload) {
      commit('SET_ISGET', payload);
    },
    setIsDone({ commit }, payload) {
      commit('SET_ISDONE', payload);
    },
    resetIsGet({ commit }) {
      commit('RESET_ISGET');
    },
    parallax({ commit }, e) {
      commit('PARALLAX', e);
    },
  },
  modules: {
    Star,
    Counter,
    Desc,
  },
});
