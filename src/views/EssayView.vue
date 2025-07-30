<template>
  <div>
    <ChangeAnimation />
    <ViewsContainer>
      <template #main>
        这是文章页
      </template>
    </ViewsContainer>
  </div>
</template>

<script lang="ts" setup>
import ViewsContainer from '@/views/ViewsContainer.vue'
import ChangeAnimation from '@/components/ChangeAnimation.vue'
</script>

<style scoped></style>
