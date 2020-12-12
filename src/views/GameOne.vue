<template>
  <div class="flex-container">
    <Counter />
    <transition-group tag="section" class="gameone-board" name="shuffle-card">
      <Card
        v-for="(card) in cardList"
        :key="`${card.value}-${card.variant}`"
        :matched="card.matched"
        :position="card.position"
        :value="card.value"
        :visible="card.visible"
        @select-card="flipCard"
      />
    </transition-group>
    <RetryAndQuit @restart-game="init" />
  </div>
  <Desc @start-game="init" />
</template>

<script>
import {
  ref,
  computed,
  watch,
  onMounted,
} from 'vue';
import { useStore } from 'vuex';
import _ from 'lodash';
import Card from '../components/Card.vue';
import Counter from '../components/Counter.vue';
import RetryAndQuit from '../components/RetryAndQuit.vue';
import Desc from '../components/Desc.vue';

export default {
  name: 'GameOne',
  components: {
    Counter,
    Card,
    RetryAndQuit,
    Desc,
  },
  setup() {
    const cardList = ref([]);
    const userSelection = ref([]);

    const remainingPairs = computed(() => {
      const remainingCards = cardList.value.filter((card) => card.matched === false).length;
      return remainingCards / 2;
    });

    const store = useStore();
    const counter = computed(() => store.state.Counter.counter);
    const timeCounter = computed(() => store.state.Counter.timeCounter);
    const mode = computed(() => store.state.mode);
    const timeLimit = (mode.value === 'easy') ? 150 : 120;

    const cardItems = [1, 2, 3, 4, 5, 6, 7, 8];
    cardItems.forEach((item) => {
      cardList.value.push({
        position: null,
        value: item,
        variant: 1,
        visible: true,
        matched: false,
      });
      cardList.value.push({
        position: null,
        value: item,
        variant: 2,
        visible: false,
        matched: false,
      });

      cardList.value = cardList.value.map((card, index) => {
        const newCard = {
          ...card,
          position: index,
        };
        return newCard;
      });
    });

    const flipCard = (payload) => {
      cardList.value[payload.position].visible = true;
      if (userSelection.value[0]) {
        if (userSelection.value[0].position === payload.position
            && userSelection.value[0].faceValue === payload.faceValue) {
          return;
        }
        userSelection.value[1] = payload;
        store.dispatch('Counter/addCounter');
      } else {
        userSelection.value[0] = payload;
        store.dispatch('Counter/addCounter');
      }
    };

    const init = () => {
      userSelection.value = [];
      cardList.value = _.shuffle(cardList.value);
      cardList.value = cardList.value.map((card, index) => {
        const newCard = {
          ...card,
          matched: false,
          position: index,
          visible: false,
        };
        return newCard;
      });
      store.dispatch('Counter/resetTimeCounter');
      store.dispatch('Counter/setCounter');
      store.dispatch('Counter/stopCounting');
      store.dispatch('Counter/beginCounting', timeLimit);
    };

    watch(userSelection, (curr) => {
      if (curr.length === 2) {
        const cardOne = curr[0];
        const cardTwo = curr[1];

        if (cardOne.faceValue === cardTwo.faceValue) {
          cardList.value[cardOne.position].matched = true;
          cardList.value[cardTwo.position].matched = true;
        } else {
          setTimeout(() => {
            cardList.value[cardOne.position].visible = false;
            cardList.value[cardTwo.position].visible = false;
          }, 1000);
        }
        userSelection.value = [];
      }
    },
    { deep: true });

    watch([remainingPairs, counter, timeCounter], ([curr1, curr2, curr3]) => {
      if (curr1 === 0) {
        store.dispatch('Counter/stopCounting');
        store.dispatch('Desc/setIsWin', 'one');
        store.dispatch('setIsGet', 'one');
      }
      if ((mode.value === 'easy' && curr2 > 42) || (mode.value === 'hard' && curr2 > 36)) {
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
      store.dispatch('Desc/setIsShow', 'one');
    });

    return {
      cardList,
      flipCard,
      userSelection,
      init,
    };
  },
};
</script>
