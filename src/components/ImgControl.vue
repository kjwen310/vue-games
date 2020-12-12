<template>
  <div v-if="mode === 'hard'">
    <img
      class="layer layer-1 img1"
      src="../assets/images/forest/plants.png"
      data-speed="-1"
      alt="plants"
    />
    <img
      class="layer layer-1 img2"
      src="../assets/images/forest/trees.png"
      data-speed="2"
      alt="trees"
    />
    <img
      class="layer layer-1 img3"
      src="../assets/images/forest/deer.png"
      data-speed="1"
      alt="deer"
    />
  </div>
  <div v-if="mode === 'easy'">
    <img
      class="layer layer-2 img4"
      src="../assets/images/forest/forest-1.png"
      data-speed="1"
      alt="plants"
    />
    <img
      class="layer layer-2 img5"
      src="../assets/images/forest/forest-2.png"
      data-speed="-1"
      alt="trees"
    />
    <img
      class="layer layer-2 img6"
      src="../assets/images/forest/forest-3.png"
      data-speed="1.5"
      alt="forest"
    />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const mode = computed(() => store.state.mode);

    return {
      mode,
    };
  },
};
</script>
