<script setup lang="ts">
</script>

<template>
  <!-- 需要缓存时，必须用插槽 -->
  <router-view v-slot="{ Component }">
    <keep-alive include="EssayView">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style lang="scss" scoped></style>
