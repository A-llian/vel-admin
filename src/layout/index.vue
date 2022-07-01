<template>
<el-container class="common-layout" :class="`${store.appStore.device}`">
  <sider-bar :class="store.appStore.getIsCollpase ? 'collpase' : 'siderbar'" />
  <el-container direction="vertical" class="app-container">
    <app-header />
    <app-main />
  </el-container>
</el-container>
</template>

<script lang="ts">
export default { name: 'LayOut' }
</script>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import { siderBar, appMain, appHeader } from './components'
import store from '@/store'

const { body } = document

const _isMobile = (): boolean => {
  const rect = body.getBoundingClientRect()
  return rect.width - 1 < 900
}

const _resizeHandler = () => {
  const isMobile = _isMobile()

  if (isMobile) {
    store.appStore.Toogle_device('is-hidden')
  } else {
    store.appStore.Toogle_device('')
  }
}

onMounted(() => {
  window.addEventListener('resize', _resizeHandler)
})

onUnmounted(() => {
  window.removeEventListener('resize', _resizeHandler)
})

</script>

<style lang="scss">
.common-layout {
  height: 100%;
}
</style>