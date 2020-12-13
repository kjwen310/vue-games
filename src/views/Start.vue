<template>
  <Desc />
  <div class="fixed-flex-container">

    <section class="bg-img start-bg-img">
      <div v-if="innerWidth >= 768" class="container">
        <div class="fog-img fog-img-first"></div>
        <div class="fog-img fog-img-second"></div>
      </div>
    </section>

    <section class="start-group">
      <ul class="d-flex p-5">
        <li class="mx-2">
          <router-link class="link d-block" :to="{name: 'GameOne'}">
            <i class="fab fa-pagelines"></i>
          </router-link>
        </li>
        <li class="mx-2">
          <router-link class="link d-block" :to="{name: 'GameTwo'}">
            <i class="fas fa-th-large"></i>
          </router-link>
        </li>
        <li class="mx-2">
          <router-link class="link d-block" :to="{name: 'GameThree'}">
            <i class="fas fa-wave-square"></i>
          </router-link>
        </li>
      </ul>
      <div v-if="isGetOne && isGetTwo && isGetThree" class="complete mt-5">
        <a href="#" @click.prevent="$router.push({ name: 'Complete' })">完成任務</a>
      </div>
    </section>

    <section v-if="isGetOne" class="gameone-get-img">
      <div class="gameone-img"></div>
    </section>
    <Fire v-if="isGetThree"/>
    <Stars v-if="isGetTwo"/>

  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Stars from '../components/Stars.vue';
import Fire from '../components/Fire.vue';
import Desc from '../components/Desc.vue';

export default {
  components: { Fire, Stars, Desc },
  setup() {
    const store = useStore();
    const innerWidth = computed(() => store.state.innerWidth);
    const isDoneIntro = computed(() => store.state.isDone.intro);
    const isGetOne = computed(() => store.state.isGet.one);
    const isGetTwo = computed(() => store.state.isGet.two);
    const isGetThree = computed(() => store.state.isGet.three);

    onMounted(() => {
      store.dispatch('startGame', window.innerWidth);
      if (!isDoneIntro.value) store.dispatch('Desc/setIsShowIntro');
    });

    return {
      isGetOne,
      isGetTwo,
      isGetThree,
      innerWidth,
    };
  },
};
</script>
