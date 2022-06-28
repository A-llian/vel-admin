<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in levelList" :key="item.path">{{item.meta?.title}}</el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>


<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, RouteRecordRaw } from 'vue-router';

const route = useRoute()

const levelList = ref<RouteRecordRaw[]>([])

watch(() => route.path, () => getBreadcrumb())

const getBreadcrumb = () => {
  console.log()
  levelList.value = route.matched.filter(item => item.meta && item.meta.title)
}

onMounted(() => {
  getBreadcrumb()
})

</script>


<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>