<template>
  <div class="card" :class="{isflipped : visible}" @click="selectCard">
    <div v-if="visible" class="card-face is-front">
      <img
        class="front-img"
        :src="require(`../assets/images/gameone/flower-${value}.png`)"
        :alt="`flower${value}`"
      />
      <img
        v-if="matched"
        class="check-mark"
        src="../assets/images/gameone/check.png"
        alt="check mark"
      />
    </div>
    <div v-else class="card-face is-back">
      <i class="fab fa-pagelines"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameOneCard',
  props: {
    matched: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const selectCard = () => {
      ctx.emit('select-card', {
        position: props.position,
        faceValue: props.value,
      });
    };

    return {
      selectCard,
    };
  },
};
</script>
