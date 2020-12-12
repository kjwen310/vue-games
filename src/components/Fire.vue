<template>
  <div class="fire-stars" v-for="(fireStyle, i) in fireStars" :key="i" :style="fireStyle"></div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const fireStars = computed(() => store.state.Star.fireStars);
    const isDoneThree = computed(() => store.state.isDone.three);
    const fireStarsPayload = {
      type: 'fire',
      amount: 30,
      pos: 4,
      start: 'bottom',
      size: 4,
      dur: 1,
    };

    const createFireStars = () => {
      store.dispatch('Star/createStars', fireStarsPayload);
    };

    onMounted(() => {
      if (!isDoneThree.value) {
        createFireStars();
        store.dispatch('setIsDone', 'three');
      }
    });

    return {
      fireStars,
    };
  },
};
</script>
