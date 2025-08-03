<!-- HobbyBreadcrumb.vue -->
<script lang="ts" setup>


const props = defineProps({
  route: { type: Object, required: true } // 接收当前路由对象
});


// 从路由参数中获取动态标题
const getParamTitle = (key: string) => {
  return props.route.params[key] || '';
};
</script>

<template>
  <t-breadcrumb>
    <!-- 一级：爱好首页 -->
    <t-breadcrumbItem :to="{ name: 'hobbies' }">
      {{ props.route.matched[0].meta.title }}
    </t-breadcrumbItem>

    <!-- 二级：小说（仅在二级及以下路由显示） -->
    <t-breadcrumbItem v-if="route.matched.length >= 2 && route.matched[1].meta.secondTitle" :to="{ name: 'novel' }">
      {{ props.route.matched[1].meta.secondTitle }}
    </t-breadcrumbItem>

    <!-- 三级：小说名称（动态参数，仅在三级及以下路由显示） -->
    <t-breadcrumbItem v-if="route.matched.length >= 3 && route.matched[2].meta.thirdTitle === 'fromParams'" :to="{
      name: 'chapterList',
      params: { novelTitle: getParamTitle('novelTitle') }
    }">
      {{ props.route.matched[2].meta.thirdTitle }}
    </t-breadcrumbItem>

    <!-- 四级：章节名称（动态参数，仅在四级路由显示） -->
    <t-breadcrumbItem
      v-if="props.route.matched.length >= 4 && props.route.matched[3].meta.fourthTitle === 'fromParams'">
      {{ props.route.matched[3].meta.fourthTitle }}
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
