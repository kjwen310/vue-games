<template>
  <div class="fixed-container" :style="{'--background': `linear-gradient(${gradient})`}">
    <div class="moon" :style="{'--background': `linear-gradient(${gradient})`}"></div>
    <Stars />
    <Fire />
    <ImgControl />
    <div class="complete-btn-group p-3">
      <button type="button">
        <i class="fab fa-github"></i>
      </button>
      <button type="button" @click="rePlay">
        <i class="fas fa-redo"></i>
      </button>
    </div>
  </div>
  <Desc />
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Stars from '../components/Stars.vue';
import Fire from '../components/Fire.vue';
import ImgControl from '../components/ImgControl.vue';
import Desc from '../components/Desc.vue';

export default {
  components: {
    Stars,
    Fire,
    ImgControl,
    Desc,
  },
  setup() {
    const gradient = ref('');
    const store = useStore();
    const router = useRouter();
    const mode = computed(() => store.state.mode);

    const parallax = (e) => {
      store.dispatch('parallax', e);
    };

    const rePlay = () => {
      store.dispatch('resetIsGet');
      router.push({ name: 'Start' });
    };

    onMounted(() => {
      document.addEventListener('mousemove', parallax);
      gradient.value = mode.value === 'easy' ? '#0d0015, #507ea4' : '#111425, #f5e9a6';
      store.dispatch('Desc/setIsShowFinal');
    });

    return {
      gradient,
      rePlay,
    };
  },
};
</script>

<style lang="scss" scoped>
  .fixed-container {
    background: var(--background);
    .moon {
      width: 6rem;
      height: 6rem;
      line-height: 6rem;
      border-radius: 50%;
      background: #fff;
      position: absolute;
      top: 6rem;
      left: 25rem;
      z-index: 100;
      &:after {
        content: '';
        position: absolute;
        top: -1rem;
        left: 1rem;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: var(--background);
        background-attachment: fixed;
      }
    }
  }
  @media (max-width: 414px) {
    .fixed-container {
      .moon {
        left: 6rem;
        width: 3rem;
        height: 3rem;
        &:after {
          top: -0.6rem;
          left: 0.8rem;
        }
      }
    }
  }
</style>
