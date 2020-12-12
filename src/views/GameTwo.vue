<template>
  <div class="flex-container">
    <Counter />
    <transition-group
      tag="section"
      name="shuffle-tile"
      class="gametwo-board"
      :style="{'--gridStyle': gridStyle}">
      <Tile
        v-for="(item) in grids"
        :key="item.faceValue"
        :faceValue="item.faceValue"
        :positionX="item.x"
        :positionY="item.y"
        :col="col"
        @move="moveHandler"
      />
    </transition-group>
    <RetryAndQuit @restart-game="init" />
  </div>
  <Desc @start-game="init"/>
</template>

<script>
import _ from 'lodash';
import {
  ref,
  computed,
  watch,
  onMounted,
} from 'vue';
import { useStore } from 'vuex';
import Counter from '../components/Counter.vue';
import Tile from '../components/Tile.vue';
import RetryAndQuit from '../components/RetryAndQuit.vue';
import Desc from '../components/Desc.vue';

export default {
  components: {
    Counter,
    Tile,
    RetryAndQuit,
    Desc,
  },
  setup() {
    const col = ref(3);
    const grids = ref([]);

    const store = useStore();
    const counter = computed(() => store.state.Counter.counter);
    const timeCounter = computed(() => store.state.Counter.timeCounter);
    const innerWidth = computed(() => store.state.innerWidth);
    const mode = computed(() => store.state.mode);
    col.value = (mode.value === 'easy') ? 3 : 4;

    const total = computed(() => col.value * col.value);
    const gridStyle = computed(() => {
      let size = 0;
      if (innerWidth.value >= 576) {
        size = 6;
      } else if (innerWidth.value >= 414) {
        size = 5;
      } else if (innerWidth.value >= 360) {
        size = 4;
      } else if (innerWidth.value >= 320) {
        size = 3.5;
      } else {
        size = 3;
      }
      const style = `repeat(${col.value}, ${size}rem)`;
      return style;
    });
    const isWinTwo = computed(() => {
      if (grids.value.length !== total.value) return false;
      const status = grids.value.every((item) => {
        if (item.faceValue !== item.x * col.value + item.y + 1) return false;
        return true;
      });
      return status;
    });

    const moveHandler = (payload) => {
      let temp = null;
      const spaceIndex = grids.value.findIndex((item) => item.faceValue === total.value);
      const { x, y } = grids.value[spaceIndex];
      const { i, j } = payload;

      if (x - 1 === i && y === j) {
        temp = grids.value[spaceIndex - col.value];
      }
      if (x + 1 === i && y === j) {
        temp = grids.value[spaceIndex + col.value];
      }
      if (y - 1 === j && x === i) {
        temp = grids.value[spaceIndex - 1];
      }
      if (y + 1 === j && x === i) {
        temp = grids.value[spaceIndex + 1];
      }
      if (temp) {
        grids.value[spaceIndex].faceValue = payload.faceValue;
        temp.faceValue = total.value;
        store.dispatch('Counter/addCounter');
      }
    };

    const checkResolvable = (ary, column) => {
      let count = 0;
      let space = 0;

      ary.forEach((item, index) => {
        if (item === ary.length) {
          space = Math.floor(index / column) + 1;
        } else {
          let i = index + 1;
          while (i < ary.length) {
            if (item > ary[i]) {
              count += 1;
            }
            i += 1;
          }
        }
      });
      return column % 2 ? count % 2 === 0 : (count % 2) + (space % 2) === 0;
    };

    const getNumbers = (max) => {
      const numbers = [];
      while (numbers.length < max) {
        numbers.push(numbers.length + 1);
      }
      return numbers;
    };

    const getGrids = (column) => {
      let numbers = getNumbers(total.value);
      let resolvable = false;

      while (!resolvable) {
        numbers = _.shuffle(numbers);
        resolvable = checkResolvable(numbers, column);
      }
      grids.value = numbers.map((item, index) => {
        const newgrids = {
          faceValue: item,
          x: Math.floor(index / column),
          y: index % column,
        };
        return newgrids;
      });
    };

    const init = () => {
      getGrids(col.value);
      store.dispatch('Counter/resetTimeCounter');
      store.dispatch('Counter/setCounter');
      store.dispatch('Counter/stopCounting');
      store.dispatch('Counter/beginCounting', 150);
    };

    watch([isWinTwo, counter, timeCounter], ([curr1, curr2, curr3]) => {
      if (curr1) {
        store.dispatch('Counter/stopCounting');
        store.dispatch('Desc/setIsWin', 'two');
        store.dispatch('setIsGet', 'two');
      }
      if ((mode.value === 'easy' && curr2 > 80) || (mode.value === 'hard' && curr2 > 150)) {
        store.dispatch('Counter/stopCounting');
        store.dispatch('Desc/setIsFailed');
      }
      if (curr3 < 1) {
        store.dispatch('Counter/stopCounting');
        store.dispatch('Desc/setIsFailed');
      }
    });

    onMounted(() => {
      store.dispatch('Counter/resetTimeCounter');
      store.dispatch('Counter/setCounter');
      store.dispatch('Counter/stopCounting');
      store.dispatch('Desc/setIsShow', 'two');
      getGrids(col.value);
    });

    return {
      col,
      grids,
      init,
      moveHandler,
      gridStyle,
    };
  },
};
</script>

<style lang="scss" scoped>
  .gametwo-board {
    display: grid;
    grid-template-columns: var(--gridStyle);
    grid-template-rows: var(--gridStyle);
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.5rem;
  }
</style>
