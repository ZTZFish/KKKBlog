<script setup lang="ts">
import HomeView from './views/HomeView.vue'

</script>

<template>
  <div class="home-view">
    <HomeView />
  </div>
</template>

<style lang="scss" scoped>
.home-view {
  min-height: 100vh;
}

.home-view::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
