<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in getTags"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag)?'active':''"
        closable
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        class="tags-view-item"
      >
        {{ tag.meta.title }}
        <el-icon v-if="tag.name !== 'DASHBOARD'" @click.prevent.stop="closeSelectedTag(tag)"><Close /></el-icon>
      </router-link>
    </scroll-pane>
    <!-- <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!(selectedTag.meta&&selectedTag.meta.affix)" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭全部</li>
    </ul> -->
  </div>
</template>

<script lang="ts">
export default { name: 'TagsView' }
</script>

<script lang="ts" setup>
import { onMounted, watch, computed } from 'vue'
import ScrollPane from './scrollPane.vue'
import path from 'path'
import { useRoute, useRouter, RouteRecordRaw, RouteLocationNormalized } from 'vue-router'
// import { asyncRouter } from '@/router/routes'
import store from '@/store'

const route = useRoute()
const router = useRouter()

const getTags = computed(() => {
  return store.tagsStore.getVisitedViews
})

const isActive = (tag: { path: string; }) => {
  return tag.path === route.path
}

watch(() => route.path, () => {
  addTags()
})

// 添加标签
const addTags = () => {
  const { name } = route
  if (name) {
    store.tagsStore.addView(route)
  }
  return false
}

// 过滤标签
const filterAffixTags = (routes: RouteRecordRaw[], basePath = '/'): RouteLocationNormalized[] => {
  let tags: RouteLocationNormalized[] = []
  routes.forEach((item) => {
    if (item.name === 'DASHBOARD') {
      const tagPath = path.resolve(basePath, item.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: item.name,
        meta: { ...item.meta },
        matched: [],
        query: {},
        hash: '',
        params: {},
        redirectedFrom: undefined
      })
    }
    if (item.children) {
      const tempTags = filterAffixTags(item.children)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

// 初始化的时候获取首页粘贴上标签
const initTags = () => {
  const tags = filterAffixTags(store.permissionStore.addRouters)
  for (const tag of tags) {
        // Must have tag name
    if (tag.name) {
      store.tagsStore.addView(tag)
    }
  }
}

// 关闭标签
const closeSelectedTag = (view: RouteLocationNormalized) => {
  store.tagsStore.delView(view).then((visitedViews: any) => {
    if (isActive(view)) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        router.push(latestView)
      } else {
        if (view.name === 'Dashboard') {
          router.replace({ path: '/redirect' + view.fullPath })
        } else {
          router.push('/')
        }
      }
    }
  })
}
onMounted(() => {
  initTags()
  addTags()
})

</script>

<style lang="scss">
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .el-scrollbar__view {
      display: flex;
    }
    .tags-view-item {
      display: flex;
      align-items: center;
      position: relative;
      cursor: pointer;
      height: 26px;
      // line-height: 25px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      .el-icon {
        margin-left: 4px;
      }
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  // .contextmenu {
  //   margin: 0;
  //   background: #fff;
  //   z-index: 3000;
  //   position: absolute;
  //   list-style-type: none;
  //   padding: 5px 0;
  //   border-radius: 4px;
  //   font-size: 12px;
  //   font-weight: 400;
  //   color: #333;
  //   box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
  //   li {
  //     margin: 0;
  //     padding: 7px 16px;
  //     cursor: pointer;
  //     &:hover {
  //       background: #eee;
  //     }
  //   }
  // }
}
</style>