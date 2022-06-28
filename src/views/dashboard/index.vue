<template>
  <app-warpper direction="vertical" bg-color="var(--warpper-bg-color)" class="dashboard-container">
    <template #costom>
      <card-group />
        <el-row style="background-color: #FFF;">
          <line-chart />
        </el-row>
    </template>
  </app-warpper>
</template>

<script lang="ts">
export default { name: 'DashBoard' }
</script>

<script lang="ts" setup>
import AppWarpper from '@/components/AppWarpper/index.vue'
import cardGroup from './cardGroup.vue'
import lineChart from './lineChart.vue'
</script>