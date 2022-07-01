<template>
  <el-aside>
    <el-menu
      active-text-color="var(--sider-active-bg-color)"
      background-color="var(--sider-bg-color)"
      text-color="var(--sider-text-color)"
      :default-active="activeMenu"
      :router="true"
      :collapse="store.appStore.getIsCollpase"
      class="el-menu-vertical-demo"
    >
      <sider-bar-item v-for="route in store.permissionStore.routers" :key="route.path" :base-path="route.path" :item="route"  />
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
export default { name: 'SiderBar' }
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import{ useRoute } from 'vue-router'
import store from '@/store'
import siderBarItem from './siderBarItem.vue';

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