<template>
  <app-warpper resize="-resize" bg-color="var(--warpper-bg-color)" class="user-container">
    <template #costom="{ H }">
      <el-card class="user-tree">
        <template #header>
          <div class="card-header">
            <span>部门列表</span>
            <el-input placeholder="输入部门名称搜索">
              <template #suffix>
                <el-icon :size="18"><Search /></el-icon>
              </template>
            </el-input>
          </div>
        </template>
        <el-tree
          :data="roleData"
          node-key="id"
          show-checkbox
          check-strictly
          accordion
        >
          <template #default="{ node }">
            <span class="custom-tree-node">{{ node.label }}</span>
          </template>
        </el-tree>
      </el-card>
      <div class="user-table">
        <crud-operation />
        <el-table :data="tableData" border :max-height="H - 40 - 52 - 44">
          <el-table-column v-for="(item, index) in hand" :key="index" :prop="item.prop" :label="item.label" />
          <el-table-column fixed="right" label="操作" width="130">
            <template #default>
              <ud-operation />
            </template>
          </el-table-column>
        </el-table>
        <pagination />
      </div>
      
    </template>
    
  </app-warpper>
</template>

<script lang="ts">
export default { name: 'User' }
</script>

<script lang="ts" setup>
import { } from 'vue'
import AppWarpper from '@/components/AppWarpper/index.vue'
import crudOperation from '@/components/Crud/crud_operation.vue'
import udOperation from '@/components/Crud/UD_operation.vue'
import pagination from '@/components/Crud/pagination.vue'

interface Tree {
  id: number
  label: string
  children?: Tree[]
}

const roleData: Tree[] = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  }
]

const hand = [
  { label: '用户名', prop: 'username' },
  { label: '昵称', prop: 'nickname' },
  { label: '邮箱', prop: 'email' },
  { label: '部门', prop: 'dept' },
  { label: '创建时间', prop: 'createDate' },
]

const tableData = [
  {
    createDate: '2016-05-03',
    username: 'Tom',
    nickname: 'California',
    email: 'Los Angeles',
    dept: '部门'
  },
  {
    createDate: '2016-05-02',
    username: 'Tom',
    nickname: 'California',
    email: 'Los Angeles',
    dept: 'No. 189, Grove St, Los Angeles'
  },
   {
    createDate: '2016-05-01',
    username: 'Sny',
    nickname: 'California',
    email: 'Los Angeles',
    dept: 'No. 189, Grove St, Los Angeles'
  },
]

</script>

<style lang="scss">
.user-container {
  .user-table, .user-tree {
    height: 100%;
    padding: 20px;
    background-color: #FFF;
  }
  .user-table {
    margin-left: 20px;
    flex: 1;
    flex-basis: auto;
    min-width: 0;
  }
  .user-tree {
    width: 300px;
    padding: 0;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > span { margin-right: 20px; }
      .el-input {
        flex: 1;
      }
    }
    .el-card__body {
      height: calc(100% - 69px);
      overflow: hidden;
      &:hover {
        overflow-y: auto;
      }
    }
  }
}
</style>