<template>
  <app-warpper resize="-resize" bg-color="var(--warpper-bg-color)" class="flow-container">
    <template #costom="{ H }">
      <div id="stencil-container"></div>
      <div id="graph-container" :style="{ height: `${H}px` }"></div>
      <div class="btns">
        <el-button @click="getCell">获取画布中的节点和线</el-button>
      </div>
    </template>
  </app-warpper>
</template>

<script lang="ts">
export default { name: 'Flow' }
</script>

<script lang="ts" setup>
import { onMounted } from 'vue'
import AppWarpper from '@/components/AppWarpper/index.vue'
import FlowGraph from './flowGraph'

const getCell = () => {
  console.log(FlowGraph.graph.toJSON())
}

onMounted(() => {
  FlowGraph.init()
})

</script>

<style lang="scss" scoped>
.flow-container {
  position: relative;
  #stencil-container, #graph-container {
    height: 100%;
  }
  #stencil-container {
    width: 200px;
    position: relative;
  }
  #graph-container {
    flex: 1;
  }
  .btns {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}

</style>