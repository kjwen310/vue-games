<template>
  <div class="retry-quit">
    <button type="button" class="d-block p-2" @click="restart">
      <i class="fas fa-redo"></i> 重試
    </button>
    <div class="quit mt-4">
      <button class="d-block p-2" @click="$router.push({ name: 'Start' })">
        <i class="far fa-times-circle"></i> 退出
      </button>
    </div>
  </div>
</template>

<script>
export default {
  setup(_, ctx) {
    const restart = () => {
      ctx.emit('restart-game');
    };

    return {
      restart,
    };
  },
};
</script>
