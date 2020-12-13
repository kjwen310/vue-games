<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut">
    <div class="desc-wrap" v-if="isShow">

        <div v-if="isShowIntro" class="desc-card">
          <div class="desc-img">
            <img src="../assets/images/desc/star.png" alt="xx">
          </div>
          <div class="desc-content">
            <h2>遊戲說明</h2>
            <p class="mt-3">
              這是一座被詛咒的森林，突破各關卡，找回森林的魔力！
              選擇「初級」或「進階」，為森林帶來不同結局。
            </p>
            <div class="btn-group mt-5">
              <button class="mr-3" type="button" @click="selectMode('easy')">初級</button>
              <button type="button" @click="selectMode('hard')">進階</button>
            </div>
          </div>
        </div>

        <div v-if="isFailed" class="desc-card">
          <div class="desc-img">
            <img src="../assets/images/desc/rain.png" alt="failed">
          </div>
          <div class="desc-content">
            <h2>挑戰失敗</h2>
            <p class="mt-3">
              再接再厲，繼續加油！
            </p>
            <div class="btn-group mt-5">
              <button class="mr-3" type="button" @click="failReplay">再一次</button>
              <button type="button" @click="failBack">回主面</button>
            </div>
          </div>
        </div>

        <div v-if="isShowFinal" class="desc-card">
          <div class="desc-img">
            <img src="../assets/images/desc/star.png" alt="xx">
          </div>
          <div class="desc-content py-2 px-2">
            <h2>挑戰完成</h2>
            <p class="mt-3">
              謝謝您幫森林找回魔法，希望您享受這個小遊戲！您可以在右下方查看遊戲細節，或是再次挑戰。
            </p>
            <button type="button" class="m-auto mt-5" @click="finalClose">完成</button>
          </div>
        </div>

        <div v-if="isShowErr" class="desc-card">
          <div class="desc-img">
            <img src="../assets/images/desc/rain.png" alt="error">
          </div>
          <div class="desc-content py-2 px-2">
            <h2>發生錯誤</h2>
            <p class="mt-3">
              由於頁面重整，請點選下方按鈕回到主頁再重新遊戲。
            </p>
            <button type="button" class="m-auto mt-5" @click="errReplay">回主頁</button>
          </div>
        </div>

        <!-- 遊戲內容提示 -->
        <div v-if="isShowOne" class="desc-card">
          <div class="desc-img">
            <img src="../assets/images/desc/line-dot.png" alt="gameone introduction">
          </div>
          <div class="desc-content">
            <h2>尋找配對</h2>
            <p class="mt-3">
              牌堆中共有八種花，每種花各有兩張，挑戰記憶力，完成兩兩配對！
            </p>
            <p>
              步數限制：<span v-if="isEasy">42</span><span v-if="isHard">36</span> 步
            </p>
            <p>
              時間限制：<span v-if="isEasy">150</span><span v-if="isHard">120</span> 秒
            </p>
            <button type="button" class="m-auto mt-5" @click="start('one')">開始挑戰</button>
          </div>
        </div>
        <div v-if="isShowTwo" class="desc-card">
          <div class="desc-img">
            <img src="../assets/images/desc/line-dot.png" alt="gametwo introduction">
          </div>
          <div class="desc-content">
            <h2>完成拼圖</h2>
            <p class="mt-3">
              岩石上刻有散亂的數字，請由左到右、由上到下重新排列。
            </p>
            <p>步數限制：<span v-if="isEasy">80</span><span v-if="isHard">150</span> 步</p>
            <p>時間限制：<span>150</span> 秒</p>
            <button type="button" class="m-auto mt-5" @click="start('two')">開始挑戰</button>
          </div>
        </div>
        <div v-if="isShowThree" class="desc-card">
          <div class="desc-img">
            <img src="../assets/images/desc/line-dot.png" alt="gamethree introduction">
          </div>
          <div class="desc-content">
            <h2>貪吃蛇</h2>
            <p class="mt-3">
              用上下左右鍵操作小蛇，蒐集七顆黃色寶石即獲勝。不可撞到邊界
              <span v-if="isHard">及障礙物</span>！
            </p>
            <p>時間限制：<span>60</span> 秒</p>
            <button type="button" class="m-auto mt-5" @click="start('three')">開始挑戰</button>
          </div>
        </div>

        <!-- 獲勝提示 -->
        <div v-if="isWinOne" class="desc-card">
          <div class="desc-img">
            <img src="../assets/images/desc/leaf.png" alt="win gameone">
          </div>
          <div class="desc-content">
            <h2>挑戰成功</h2>
            <p class="mt-3">森林的植物悄悄甦醒！</p>
            <div class="btn-group mt-5">
              <button class="mr-3" type="button" @click="winReplay('one')">再一次</button>
              <button type="button" @click="back('one')">回主頁</button>
            </div>
          </div>
        </div>
        <div v-if="isWinTwo" class="desc-card">
          <div class="desc-img">
            <img src="../assets/images/desc/star.png" alt="win gametwo">
          </div>
          <div class="desc-content">
            <h2>挑戰成功</h2>
            <p class="mt-3">雲霧深處，森林重獲星空！</p>
            <div class="btn-group mt-5">
              <button class="mr-3" type="button" @click="winReplay('two')">再一次</button>
              <button type="button" @click="back('two')">回主頁</button>
            </div>
          </div>
        </div>
        <div v-if="isWinThree" class="desc-card">
          <div class="desc-img">
            <img src="../assets/images/desc/yellow-dot.png" alt="win gamethree">
          </div>
          <div class="desc-content">
            <h2>挑戰成功</h2>
            <p class="mt-3">森林重新沐浴在溫暖的螢光中！</p>
            <div class="btn-group mt-5">
              <button class="mr-3" type="button" @click="winReplay('three')">再一次</button>
              <button type="button" @click="back('three')">回主頁</button>
            </div>
          </div>
        </div>

    </div>
  </transition>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup(_, ctx) {
    const store = useStore();
    const router = useRouter();
    const mode = computed(() => store.state.mode);
    const isShow = computed(() => store.state.Desc.isShowDesc);
    const isShowIntro = computed(() => store.state.Desc.isShowIntro);
    const isShowErr = computed(() => store.state.Desc.isShowErr);
    const isShowOne = computed(() => store.state.Desc.isShow.one);
    const isShowTwo = computed(() => store.state.Desc.isShow.two);
    const isShowThree = computed(() => store.state.Desc.isShow.three);
    const isWinOne = computed(() => store.state.Desc.isWin.one);
    const isWinTwo = computed(() => store.state.Desc.isWin.two);
    const isWinThree = computed(() => store.state.Desc.isWin.three);
    const isFailed = computed(() => store.state.Desc.isFailed);
    const isShowFinal = computed(() => store.state.Desc.isShow.final);

    const isEasy = computed(() => mode.value === 'easy');
    const isHard = computed(() => mode.value === 'hard');

    const selectMode = (payload) => {
      store.dispatch('setMode', payload);
      store.dispatch('setIsDone', 'intro');
      store.dispatch('Desc/closeIntro');
    };

    const start = (num) => {
      store.dispatch('Desc/setIsShow', num);
      ctx.emit('start-game');
    };

    const failReplay = () => {
      store.dispatch('Desc/setIsFailed');
      ctx.emit('start-game');
    };

    const failBack = () => {
      store.dispatch('Desc/setIsFailed');
      router.push({ name: 'Start' });
    };

    const winReplay = (num) => {
      store.dispatch('Desc/setReplay', num);
      ctx.emit('start-game');
    };

    const back = (num) => {
      store.dispatch('Desc/setBackToInfo', num);
      router.push({ name: 'Start' });
    };

    const finalClose = () => {
      store.dispatch('Desc/setIsShowFinal');
    };

    const errReplay = () => {
      store.dispatch('Desc/closeErr');
      store.dispatch('resetIsGet');
      router.push({ name: 'Start' });
    };

    return {
      isShow,
      isShowIntro,
      isShowOne,
      isShowTwo,
      isShowThree,
      selectMode,
      start,
      winReplay,
      failReplay,
      failBack,
      back,
      isWinOne,
      isWinTwo,
      isWinThree,
      isFailed,
      isShowFinal,
      isShowErr,
      errReplay,
      finalClose,
      isEasy,
      isHard,
    };
  },
};
</script>
