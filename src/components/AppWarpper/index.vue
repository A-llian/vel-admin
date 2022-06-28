<template>
  <div :class="`app-warpper${resize} ${direction === 'vertical' ? 'app-vertical' : ''}`" :style="getContentStyle">
    <slot name="costom" :H="H"></slot>
  </div>
</template>

<script lang="ts">
export default { name: 'AppWarpper' }
</script>

<script lang="ts" setup>
import { defineProps, ref, CSSProperties, computed } from 'vue';
import use_mainHeight from '@/hooks/use_mainHeight'

const props = defineProps({
  resize: {
    type: String,
    default: ''
  },
  bgColor: {
    type: String,
    default: '#FFF'
  },
  direction: {
    type: String,
    default: 'horizontal'
  }
})

let getContentStyle = ref<CSSProperties>()

let H = ref<number>(0)

if (props.resize) {
  const USE_MAIN_HEIGHT = use_mainHeight()

  getContentStyle = USE_MAIN_HEIGHT.getContentStyle

  H = USE_MAIN_HEIGHT.H
  
  if (props.bgColor !== '#FFF') {
    getContentStyle = computed(():CSSProperties => {
      return {
        ...USE_MAIN_HEIGHT.getContentStyle.value,
        backgroundColor: props.bgColor
      }
    })
  }
} else {
  getContentStyle = computed(():CSSProperties => {
    return {
      backgroundColor: props.bgColor
    }
  })
}

</script>

<style>
.app-warpper-resize, .app-warpper {
  display: flex;
}

.app-warpper-resize.app-vertical, .app-warpper.app-vertical {
  flex-direction: column;
}

.app-warpper-resize {
  padding: 20px;
  overflow: hidden;
}

.app-warpper {
  padding: 20px;
  height: 100%;
  overflow: auto;
}

</style>