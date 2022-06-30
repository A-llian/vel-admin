<template>
  <div class="er_card">
    <div class="card_title">
      <!-- <el-input v-model="item.title" /> -->
      {{ titleName }}
      <button @click="add">+</button>
    </div>
    <el-scrollbar style="height: 100%;">
      <ul class="card_list">
        <li v-show="lists && lists.length === 0">暂无数据</li>
        <li v-for="items in lists" :key="items.id">{{ items.label }}</li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, inject } from 'vue'
import { ElScrollbar } from 'element-plus';

const getNode: any = inject('getNode')
const titleName = ref('新建网络簇')
const lists = ref([])

const add = () => {
  const node = getNode()
  const { list } = node.getData()
  const obj = { id: Math.random(), label: Math.random() + 'aaa4' }
  node.setData({
    list: [...list, obj]
  })
  // this.node.on('change:data', ({ current }) => {
  //   console.log('----,', current)
  // })
  // console.log(this.nodeData, newData)
}

onMounted(() => {
  const node = getNode()
  const { title, list } = node.getData()
  titleName.value = title || '新建网络簇'
  lists.value = list || []
  node.on('change:data', ({ current }: any) => {
    console.log('s', current)
    titleName.value = current.title
    lists.value = current.list
  })
})

</script>

<style lang="scss" scoped>
.er_card {
  width: 240px;
  // height: 132px;
  background-color: bisque;
  border: 1px solid #000;
  .card_title {
    height: 36px;
    background-color: red;
    border-bottom: 1px solid #ccc;
    text-align: center;
  }
  .card_list {
    height: 96px;
    li {
      height: 24px;
      border-bottom: 1px solid #ccc;
      text-align: center;
      // &:last-child {
      //   border-top: 0;
      // }
    }
  }
}
</style>