<!-- HobbyBreadcrumb.vue -->
<script lang="ts" setup>
import { computed, watch } from 'vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

const props = defineProps({
  route: { type: Object as () => RouteLocationNormalizedLoaded, required: true }
});

// 添加调试信息
const debugInfo = computed(() => {
  return {
    currentPath: props.route.path,
    currentName: props.route.name,
    params: props.route.params,
    matchedLength: props.route.matched.length,
    matched: props.route.matched.map((match, index: number) => ({
      index,
      name: match.name,
      path: match.path,
      meta: match.meta
    }))
  };
});

// 监听路由变化，输出调试信息
watch(() => props.route, () => {
  console.log('🔍 路由调试信息:', debugInfo.value);
}, { immediate: true, deep: true });

// 从路由参数中获取动态标题
const getParamTitle = (key: string) => {
  const value = props.route.params[key] || '';
  console.log(`📝 获取参数 ${key}:`, value);
  return value;
};

// 检查当前路由级别
const currentLevel = computed(() => props.route.matched.length);
console.log('📝 当前路由级别:', currentLevel.value);
// 检查是否在章节列表页面
const isChapterListPage = computed(() => {
  return props.route.name === 'chapterList' && props.route.params.novelTitle;
});

// 检查是否在章节详情页面
const isChapterDetailPage = computed(() => {
  return props.route.name === 'chapter' && props.route.params.novelTitle && props.route.params.chapterTitle;
});

// 获取小说标题
const novelTitle = computed(() => {
  return getParamTitle('novelTitle');
});

// 获取章节标题
const chapterTitle = computed(() => {
  return getParamTitle('chapterTitle');
});
</script>

<template>

  <t-breadcrumb>
    <!-- 一级：爱好首页 -->
    <t-breadcrumbItem :to="{ name: 'hobbies' }">
      爱好
    </t-breadcrumbItem>

    <!-- 二级：小说 (在小说相关页面都显示) -->
    <t-breadcrumbItem v-if="$route.name === 'novel' || $route.name === 'chapterList' || $route.name === 'chapter'"
      :to="{ name: 'novel' }">
      小说
    </t-breadcrumbItem>

    <!-- 三级：小说名称 (在章节列表页和章节详情页显示) -->
    <t-breadcrumbItem v-if="isChapterListPage || isChapterDetailPage" :to="{
      name: 'chapterList',
      params: { novelTitle: novelTitle }
    }">
      {{ novelTitle }}
    </t-breadcrumbItem>

    <!-- 四级：章节名称 (仅在章节详情页显示) -->
    <t-breadcrumbItem v-if="isChapterDetailPage">
      {{ chapterTitle }}
    </t-breadcrumbItem>
  </t-breadcrumb>
</template>

<style scoped lang="scss">
:deep(.t-breadcrumb__inner-text) {
  font-size: 20px;
}

.t-breadcrumb {
  padding: 10px 0;

  .t-breadcrumb__inner-text {
    font-size: 16px;
  }
}
</style>
