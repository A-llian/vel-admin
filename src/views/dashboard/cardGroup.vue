<template>
  <el-row :gutter="20">
    <el-col v-for="item in growCardList" :key="item.title" :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>{{ item.title }}</span>
            <el-tag :type="item.color">{{ item.action }}</el-tag>
          </div>
        </template>
        <CountTo prefix="$" :startVal="1" :endVal="item.total" />
      </el-card>
    </el-col>
  </el-row>
</template>


<script lang="ts" setup>
import { growCardList } from './data'
import CountTo from '@/components/CountTo/index.vue'
</script>

<style scoped>
.card-panel-col {
  margin-bottom: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
}
</style>