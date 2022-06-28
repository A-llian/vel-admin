<template>
  <div class="operation">
    <el-button type="primary" icon="Plus">新建</el-button>
    <el-button type="danger" icon="Delete">删除</el-button>
    <el-input
      v-model="name"
      clearable
      placeholder="输入名称搜索"
      style="width: 250px;margin-left: 10px;"
    >
      <template #suffix>
        <el-icon :size="18"><Search /></el-icon>
      </template>
    </el-input>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const name = ref<string>('')

</script>

<style>
.operation {
  margin-bottom: 20px;
}
</style>