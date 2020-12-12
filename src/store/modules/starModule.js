export default {
  namespaced: true,

  state: {
    stars: [],
    fireStars: [],
  },
  mutations: {
    CREATE_STARS(state, payload) {
      let i = 0;
      while (i < payload.amount) {
        const x = Math.floor(Math.random() * window.innerWidth);
        const y = Math.floor(Math.random() * (window.innerHeight / payload.pos));
        const duration = Math.random() * 10;
        const size = Math.random() * 2;

        const starStyle = {
          left: `${x}px`,
          width: `${payload.size + size}px`,
          height: `${payload.size + size}px`,
          animationDuration: `${payload.dur}${duration}s`,
          animationDelay: `${duration}s`,
        };
        starStyle[payload.start] = `${y}px`;

        if (payload.type === 'star') {
          state.stars.push(starStyle);
        } else if (payload.type === 'fire') {
          state.fireStars.push(starStyle);
        }
        i += 1;
      }
    },
  },
  actions: {
    createStars({ commit }, payload) {
      commit('CREATE_STARS', payload);
    },
  },
};
