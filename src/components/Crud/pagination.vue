<!--分页-->
<template>
  <el-pagination
    v-model:currentPage="currentPage"
    v-model:page-size="pageSize"
    :total="total"
    style="margin-top: 8px;"
    layout="total, prev, pager, next, sizes"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentPage = ref(4)
const pageSize = ref(100)
const total = ref(200)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>