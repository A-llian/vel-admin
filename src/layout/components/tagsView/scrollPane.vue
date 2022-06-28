<template>
  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container">
    <slot />
  </el-scrollbar>
</template>

<script lang="ts">
export default {
  name: 'ScrollPane'
}
</script>