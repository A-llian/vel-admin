<template>
  <app-warpper resize="-resize" bg-color="var(--warpper-bg-color)" class="role-container">
    <template #costom="{ H }">
      <div class="role-table">
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
      <el-card class="role-tree">
        <template #header>
          <div class="card-header">
            <span>菜单分配</span>
            <el-button type="primary">保存</el-button>
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
    </template>
  </app-warpper>
</template>

<script lang="ts">
export default { name: 'Role' }
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
  { label: '名称', prop: 'name' },
  { label: '描述', prop: 'state' },
  { label: '创建时间', prop: 'date' },
]

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles'
  },
]

</script>

<style lang="scss">
.role-container {
  .role-table, .role-tree {
    height: 100%;
    padding: 20px;
    background-color: #FFF;
  }
  .role-table {
    margin-right: 20px;
    flex: 1;
    flex-basis: auto;
    min-width: 0;
  }
  .role-tree {
    width: 400px;
    padding: 0;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
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
