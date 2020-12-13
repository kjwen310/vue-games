<template>
  <div class="fixed-flex-container">
    <section class="bg-img gameboard-bg-image">
      <div v-if="innerWidth >= 768" class="container">
        <div class="fog-img fog-img-first"></div>
        <div class="fog-img fog-img-second"></div>
      </div>
    </section>
    <div v-if="mode !== ''" class="gameboard">
      <router-view />
    </div>
  </div>
  <Desc v-if="mode === ''"/>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Desc from '../components/Desc.vue';

export default {
  name: 'GameBoard',
  components: { Desc },
  setup() {
    const store = useStore();
    const mode = computed(() => store.state.mode);

    onMounted(() => {
      if (mode.value === '') {
        store.dispatch('Desc/setIsShowErr');
      }
    });

    return {
      mode,
    };
  },
};
</script>
