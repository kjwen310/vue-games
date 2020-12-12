<template>
  <div class="counter mr-5">
    <div class="counter-area p-2">
      {{ counter }}<span>次</span>
    </div>
    <div class="counter-area mt-4">
      {{ timeCounter }}<span>秒</span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const counter = computed(() => store.state.Counter.counter);
    const timeCounter = computed(() => store.state.Counter.timeCounter);

    return {
      counter,
      timeCounter,
    };
  },
};
</script>

<style lang="scss" scoped>
  @media(max-width: 996px) {
    .counter {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-right: 0;
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      .score-counter {
        line-height: 3rem;
        text-align: center;
        padding: 0;
        margin-bottom: 0;
        width: 6rem;
        border-radius: 4px;
      }
      .time-counter {
        line-height: 3rem;
        width: 6rem;
      }
      span {
        font-size: 0.8rem;
        margin-left: 0.2rem;
      }
    }
  }
  @media(max-width: 376px) {
    .counter {
      font-size: 1rem;
      margin-bottom: 0.6rem;
      .score-counter {
        line-height: 1.8rem;
        width: 4rem;
        border-radius: 4px;
      }
      .time-counter {
        line-height: 1.8rem;
        width: 4rem;
      }
      span {
        font-size: 0.6rem;
      }
    }
  }
</style>
