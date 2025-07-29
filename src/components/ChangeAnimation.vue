<template>
  <div>
    <transition name="fade">
      <div class="loading-overlay" v-if="loading">
        <LoadingAnimation class="loading-animation" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import LoadingAnimation from '../components/LoadingAnimation.vue'
import { ref, onMounted } from 'vue';

const loading = ref(true);
onMounted(() => {
  setTimeout(() => {
    loading.value = false; // 3秒后开始淡出
  }, 1000);
});
</script>

<style lang="scss" scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  /* 白色背景 */
  z-index: 998;

}

.loading-animation {
  z-index: 999;
}

/* 淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
  /* 0.3秒淡出 */
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
