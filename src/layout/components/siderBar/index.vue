<template>
  <el-aside>
    <el-menu
      active-text-color="var(--sider-active-bg-color)"
      background-color="var(--sider-bg-color)"
      text-color="var(--sider-text-color)"
      :default-active="activeMenu"
      :router="true"
      :collapse="useAppStore.getIsCollpase"
      class="el-menu-vertical-demo"
    >
      <sider-bar-item v-for="route in asyncRoute" :key="route.path" :base-path="route.path" :item="route"  />
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
export default { name: 'SiderBar' }
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import{ useRoute } from 'vue-router'
import { appStore } from '@store/app'
import { asyncRoute } from '@/router/routes'
import siderBarItem from './siderBarItem.vue';

const useAppStore = appStore()

const activeMenu = computed(() => {
  const { meta, path } = useRoute()
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

</script>

<style>

</style>