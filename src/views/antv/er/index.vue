<template>
  <app-warpper resize="-resize" bg-color="var(--warpper-bg-color)" class="er-container">
    <template #costom="{ H }">
      <div id="er-container" :style="{ height: `${H}px` }"></div>
      <!-- <div class="btns">
        <el-button @click="addNodes">新建网络簇</el-button>
        <el-button @click="getPosition">获取节点位置</el-button>
      </div> -->
    </template>
  </app-warpper>
</template>

<script lang="ts">
export default { name: 'Er' }
</script>

<script lang="ts" setup>
import AppWarpper from '@/components/AppWarpper/index.vue'
import { nextTick } from 'process';
import { onMounted } from 'vue';

import erGraph from './erGraph'

// const defaultNode = {
//   shape: 'vue-shape',
//   size: {
//     width: 240,
//     height: 134
//   },
//   position: { x: -430, y: 0 },
//   data: {
//     title: '新建网络簇',
//     list: []
//   },
//   component: 'card'
// }

// const addNodes = () => {
//   const newNode = {
//     id: Math.random() + '',
//     ...defaultNode
//   }
//   erGraph.graph.addNode(newNode)
//   erGraph.nodes.push(newNode)
//   console.log()
// }
// const getPosition = () => {
//   const nodes = _getNodes()
//   nodes.forEach(item => {
//     console.log(item)
//   })
// }

// 获取所有node节点
// const _getNodes = () => {
//   const nodes = erGraph.graph.getNodes()
//   return nodes
// }

onMounted(() => {
  const GRAPH_DOM = document.getElementById('er-container') as HTMLElement
  nextTick(() => {
    const h = window.getComputedStyle(GRAPH_DOM).height
    erGraph.init(Number(h.slice(0, -2)))
  })
  
})
</script>

<style lang="scss" scoped>
.er-container {
  position: relative;
  #er-container {
    flex: 1;
  }
  .btns {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}
</style>