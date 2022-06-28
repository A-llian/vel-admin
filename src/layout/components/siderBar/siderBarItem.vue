<template>
	<template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && (!item.meta || !item.meta.alwaysShow)">
		<el-menu-item :index="resolvePath(onlyOneChild.path)">
			<el-icon><User /></el-icon>
			<template #title>
				<span>{{ onlyOneChild.meta.title }}</span>
			</template>
		</el-menu-item>
	</template>
	<el-sub-menu v-else :index="resolvePath(item.path)">
		<template #title>
			<el-icon><User /></el-icon>
			<span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
		</template>
		<sider-bar-item
			v-for="child in item.children"
			:key="child.path"
			:item="child"
			:is-nest="true"
			:base-path="resolvePath(child.path)"
			class="nest-menu"
		/>
	</el-sub-menu>
</template>

<script lang="ts">
export default { name: 'SiderBarItem' }
</script>

<script lang="ts" setup>
import { RouteRecordRaw } from 'vue-router'
import { ref, defineProps } from 'vue'
import path from 'path'
import { isExternal } from '@/utils/validate'

type RouteType = RouteRecordRaw & {
	noShowingChildren?: boolean
}

const props = defineProps({
	item: {
		type: Object,
		required: true
	},
	basePath: {
		type: String,
		required: true
	}
})

const onlyOneChild = ref<RouteType>()
function hasOneShowingChild(children = [], parent: RouteType): boolean {
	if (!children) {
		children = []
	}
	const showingChildren = children.filter((item: RouteType) => {
		if (item.meta && item.meta.hidden) {
			return false
		} else {
			// Temp set(will be used if only has one showing child)
			onlyOneChild.value = item
			return true
		}
	})

	// When there is only one child router, the child router is displayed by default
	if (showingChildren.length === 1) {
		return true
	}

	// Show parent if there are no child router to display
	if (showingChildren.length === 0) {
		onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
		return true
	}

	return false
}
function resolvePath(routePath: string): string {
	if (isExternal(routePath)) {
		return routePath
	}
	if (isExternal(props.basePath)) {
		return props.basePath
	}
	return path.resolve(props.basePath, routePath);
}
</script>
