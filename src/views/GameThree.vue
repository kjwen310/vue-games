<template>
  <div class="flex-container">
    <Counter />
    <canvas id="canvas" :width="width" :height="width"></canvas>

    <section v-if="innerWidth < 996" class="snake-control px-2 mt-3">
      <div class="mr-3" @click="pressDown(37)">
        <i class="fas fa-caret-left"></i>
      </div>
      <div class="mr-3" @click="pressDown(38)">
        <i class="fas fa-caret-up"></i>
      </div>
      <div class="quit-square mr-3" @click="$router.push({ name: 'Start' })">
        <i class="far fa-times-circle"></i>
      </div>
      <div class="mr-3" @click="pressDown(40)">
          <i class="fas fa-caret-down"></i>
        </div>
      <div @click="pressDown(39)">
        <i class="fas fa-caret-right"></i>
      </div>
    </section>

    <RetryAndQuit v-if="innerWidth >= 996" @restart-game="init" />
  </div>
  <Desc @start-game="init(), stopControl(), beginControl()"/>
</template>

<script>
import {
  ref,
  computed,
  watch,
  onMounted,
} from 'vue';
import { useStore } from 'vuex';
import Counter from '../components/Counter.vue';
import RetryAndQuit from '../components/RetryAndQuit.vue';
import Desc from '../components/Desc.vue';

export default {
  components: { Counter, Desc, RetryAndQuit },
  setup() {
    const ctx = ref(null);
    const canvas = ref({});

    const pos = {};
    const vel = {};
    const food = {};
    const snake = [];
    let controller = null;

    const store = useStore();
    const counter = computed(() => store.state.Counter.counter);
    const timeCounter = computed(() => store.state.Counter.timeCounter);
    const innerWidth = computed(() => store.state.innerWidth);
    const width = innerWidth.value > 576 ? 400 : 240;
    const S = width === 400 ? 20 : 12;
    const T = width / S;
    const blocks = computed(() => store.state.mode).value === 'easy' ? [] : [
      { x: 3, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 3 },
      { x: 4, y: 4 },
      { x: 3, y: 15 },
      { x: 3, y: 16 },
      { x: 4, y: 15 },
      { x: 4, y: 16 },
      { x: 16, y: 3 },
      { x: 16, y: 4 },
      { x: 15, y: 3 },
      { x: 15, y: 4 },
      { x: 16, y: 15 },
      { x: 16, y: 16 },
      { x: 15, y: 15 },
      { x: 15, y: 16 },
    ];

    const randomFood = () => {
      // 在0和倍率邊界T之間隨機產生x、y座標，作為食物的起始點
      food.value = {
        x: Math.floor(Math.random() * T),
        y: Math.floor(Math.random() * T),
      };
      // 如果產生的食物座標和蛇或障礙重疊，則反覆重新產生
      // eslint-disable-next-line
      blocks.forEach((block) => {
        if (block.x === food.value.x && block.y === food.value.y) {
          return randomFood();
        }
      });
      // eslint-disable-next-line
      snake.value.forEach((cell) => {
        if (cell.x === food.value.x && cell.y === food.value.y) {
          return randomFood();
        }
      });
    };

    const init = () => {
      pos.value = { x: 11, y: 10 };
      vel.value = { x: 0, y: 0 };
      snake.value = [
        { x: 8, y: 10 },
        { x: 9, y: 10 },
        { x: 10, y: 10 },
        { x: 11, y: 10 },
      ];

      randomFood();
      store.dispatch('Counter/resetTimeCounter');
      store.dispatch('Counter/setCounter');
      store.dispatch('Counter/stopCounting');
      store.dispatch('Counter/beginCounting', 60);
    };

    const pressDown = (num) => {
      switch (num) {
        case 37:
          vel.value = { x: -1, y: 0 };
          break;
        case 38:
          vel.value = { x: 0, y: -1 };
          break;
        case 39:
          vel.value = { x: 1, y: 0 };
          break;
        case 40:
          vel.value = { x: 0, y: 1 };
          break;
        default:
          break;
      }
      return vel.value;
    };

    const keydown = (e) => {
      switch (e.keyCode) {
        case 37:
          vel.value = { x: -1, y: 0 };
          break;
        case 38:
          vel.value = { x: 0, y: -1 };
          break;
        case 39:
          vel.value = { x: 1, y: 0 };
          break;
        case 40:
          vel.value = { x: 0, y: 1 };
          break;
        default:
          break;
      }
      return vel.value;
    };

    const stopControl = () => {
      clearInterval(controller);
      controller = null;
    };

    const win = () => {
      stopControl();
      store.dispatch('Counter/stopCounting');
      store.dispatch('Desc/setIsWin', 'three');
      store.dispatch('setIsGet', 'three');
    };

    const gameLoop = () => {
      // 填滿背景
      ctx.value.fillStyle = '#333631';
      ctx.value.fillRect(0, 0, width, width);
      // 為蛇填上顏色
      ctx.value.fillStyle = '#c2c2c2';
      snake.value.forEach((cell) => {
        ctx.value.fillRect(cell.x * S, cell.y * S, S, S);
      });
      // 為障礙填上顏色
      ctx.value.fillStyle = '#53727d';
      blocks.forEach((block) => {
        ctx.value.fillRect(block.x * S, block.y * S, S, S);
      });
      // 為食物填上顏色
      ctx.value.fillStyle = '#d7cf3a';
      ctx.value.fillRect(food.value.x * S, food.value.y * S, S, S);

      pos.value.x += vel.value.x;
      pos.value.y += vel.value.y;
      // 如果撞到四邊，則重來
      if (pos.value.x < 0 || pos.value.x > T - 1 || pos.value.y < 0 || pos.value.y > T - 1) {
        if (counter.value < 7) {
          init();
        } else {
          win();
        }
      }
      // 如果吃到食物，蛇身長加一，更新頭部位置，並且重新產生一個食物位置
      if (food.value.x === pos.value.x && food.value.y === pos.value.y) {
        snake.value.push({ ...pos.value });
        store.dispatch('Counter/addCounter');
        pos.value.x += vel.value.x;
        pos.value.y += vel.value.y;
        randomFood();
      }

      if (vel.value.x || vel.value.y) {
        const status = blocks.some((block) => {
          if (block.x === pos.value.x && block.y === pos.value.y) return true;
          return false;
        });
        if (status) {
          if (counter.value < 7) {
            init();
          } else {
            win();
          }
        } else {
          snake.value.push({ ...pos.value });
          snake.value.shift();
        }
      }
    };

    const beginControl = () => {
      if (!controller) {
        controller = setInterval(gameLoop, 150);
      }
    };

    watch(timeCounter, (curr) => {
      if (curr < 1) {
        if (counter.value < 7) {
          stopControl();
          store.dispatch('Counter/stopCounting');
          store.dispatch('Desc/setIsFailed');
        } else {
          win();
        }
      }
    });

    onMounted(() => {
      canvas.value = document.getElementById('canvas');
      ctx.value = canvas.value.getContext('2d');
      document.addEventListener('keydown', keydown);
      store.dispatch('Counter/resetTimeCounter');
      store.dispatch('Counter/setCounter');
      store.dispatch('Counter/stopCounting');
      store.dispatch('Desc/setIsShow', 'three');
    });

    return {
      ctx,
      canvas,
      init,
      beginControl,
      stopControl,
      pressDown,
      width,
      innerWidth,
    };
  },
};
</script>
