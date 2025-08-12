<template>
  <div class="empty">
    <EmptyState />
  </div>
</template>

<script lang="ts" setup>
import EmptyState from '@/components/EmptyState.vue'

</script>

<style lang="scss" scoped>
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>
