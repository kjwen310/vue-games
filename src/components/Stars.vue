<template>
  <div class="stars" v-for="(starStyle, i) in stars" :key="i" :style="starStyle"></div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const stars = computed(() => store.state.Star.stars);
    const isDoneTwo = computed(() => store.state.isDone.two);
    const starsPayload = {
      type: 'star',
      amount: 250,
      pos: 1.5,
      start: 'top',
      size: 1,
      dur: 2,
    };

    const createStars = () => {
      store.dispatch('Star/createStars', starsPayload);
    };

    onMounted(() => {
      if (!isDoneTwo.value) {
        createStars();
        store.dispatch('setIsDone', 'two');
      }
    });

    return {
      stars,
    };
  },
};
</script>
