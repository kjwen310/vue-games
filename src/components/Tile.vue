<template>
  <div class="tile" :class="{ space }" :style="{ background: `${ok}` }" @click="clickHandler">
    {{ !space ? faceValue : '' }}
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    faceValue: {
      type: Number,
      required: true,
    },
    positionX: {
      type: Number,
      required: true,
    },
    positionY: {
      type: Number,
      required: true,
    },
    col: {
      type: Number,
      required: true,
    },
  },
  setup(props, ctx) {
    const space = computed(() => props.faceValue === props.col * props.col);
    const ok = computed(() => {
      let color = '';
      if (props.faceValue === props.positionX * props.col + props.positionY + 1) {
        if (props.positionX === 0) {
          color = '#a8c97f';
        } else if (props.positionX === 1) {
          color = '#c3d825';
        } else if (props.positionX === 2) {
          color = '#f8b862';
        } else if (props.positionX === 3) {
          color = '#e95464';
        }
      }
      return color;
    });

    const clickHandler = () => {
      if (!space.value) {
        ctx.emit('move', {
          faceValue: props.faceValue,
          i: props.positionX,
          j: props.positionY,
        });
      }
    };

    return {
      space,
      ok,
      clickHandler,
    };
  },
};
</script>
