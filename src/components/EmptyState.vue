<template>
  <t-space direction="vertical" align="center">
    <t-empty :imageStyle="{ width: '20vw', height: '20vh' }" :title="title" />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const title = ref('暂时还没有东西哦~')
</script>

<style lang="scss" scoped>
:deep(svg) {
  width: 100%;
  height: 100%;
}

:deep(.t-empty__title) {
  font-size: 1.5rem;
}
</style>
