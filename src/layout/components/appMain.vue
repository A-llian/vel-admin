<template>
  <el-main>
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
  </el-main>
</template>

<script lang="ts">
export default { name: 'AppMain' }
</script>

<script lang="ts" setup>
</script>

<style lang="scss">
.el-main {
  --el-main-padding: 0 !important;
  overflow: hidden !important;
  // .app-warpper {
  //   padding: 20px;
  //   overflow: auto;
  //   background-color: #F0F2F5;
  // }
}
</style>