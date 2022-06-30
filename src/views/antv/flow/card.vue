<template>
  <div class="flow_card">
    <p>{{ title }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const title = ref('节点')

</script>

<style lang="scss" scoped>
.flow_card {
  width: 65px;
  height: 65px;
  background-color: bisque;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>