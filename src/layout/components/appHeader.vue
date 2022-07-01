<template>
  <el-header>
    <div class="navbar">
      <div class="hamburger-container" @click="toogle">
        <el-icon :size="24">
          <component :is="`${store.appStore.getIsCollpase ? 'Expand' : 'Fold'}`" />
        </el-icon>
      </div>
      <bread-crumb />
    </div>
    <tags-view />
  </el-header>
</template>

<script lang="ts">
export default { name: 'AppHeader' }
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import BreadCrumb from '@/components/BreadCrumd/index.vue';
import TagsView from './tagsView/index.vue';
import store from '@/store'

const flag = ref<boolean>(false)
const toogle = () => {
  flag.value = !flag.value
  store.appStore.Toogle(flag.value)
}
</script>

<style lang="scss">
.el-header {
  --el-header-height: 85px !important;
  --el-header-padding: 0 !important;
}
.navbar {
  height: 50px;
  // padding: 0 20px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  .hamburger-container {
    height: 100%;
    line-height: 60px;
    padding: 0 20px;
    float: left;
    cursor: pointer;
  }
}
</style>