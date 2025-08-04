<script setup lang="ts">
import UserInfo from '@/components/UserInfo.vue'
import HeadMenu from '@/components/HeadMenu.vue'
import TopPage from '@/components/TopPage.vue';
</script>

<template>
  <HeadMenu />
  <div class="view">
    <main class="main">
      <slot name="main"></slot>
    </main>
    <div class="user" ref="user">
      <UserInfo />
    </div>
    <div class="handle">
      <TopPage />
    </div>
  </div>

</template>

<style lang="scss" scoped>
// 全局基础设置
html {
  min-height: 100vh;
  overflow-x: hidden; // 防止水平滚动
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; // 防止水平滚动
}

.view {
  position: relative;
  display: grid;
  grid-template-areas: 'none main user';
  grid-template-columns: 1fr 7fr 3fr;
  background-color: #f5f5f5;
  min-height: 100vh;
  margin-top: 56px;
  width: 100%;
  max-width: 100vw; // 确保不超过视口宽度
  overflow-x: hidden;

  .main {
    grid-area: main;
    padding: 0 2vw 5vh;
    background-color: #fff;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow-x: hidden; // 关键：防止主内容区域水平溢出
    overflow-y: hidden;
    min-width: 0; // 允许 flex/grid 子元素收缩
  }

  .user {
    position: fixed;
    width: 22%;
    top: 5vh;
    right: 3%;
    grid-area: user;
    z-index: 100;
  }

  .handle {
    position: fixed;
    top: 0;
    right: 0;
    width: 3vw;
    height: 100vh; // 确保不干扰其他元素
    z-index: 100;

    @media screen and (max-width: 768px) {
      display: none; // 在小屏幕上隐藏
    }
  }
}

// 平板响应式 (1024px 及以下)
@media (max-width: 1024px) {
  html {
    font-size: 14px;
  }

  .view {
    grid-template-areas: 'none main user';
    grid-template-columns: 1fr 6fr 3fr; // 调整比例给主内容更多空间

    .main {
      max-width: 100%;
      margin-left: 0;
      padding: 0 1.5vw; // 减少 padding
    }

    .user {
      width: 25%; // 稍微减小侧边栏宽度
      right: 2%;
    }
  }
}

// 移动端响应式 (768px 及以下)
@media (max-width: 768px) {
  .view {
    grid-template-areas: 'main';
    grid-template-columns: 1fr;
    margin-top: 56px;

    .main {
      width: 100vw; // 使用视口宽度
      max-width: 100vw;
      margin-left: 0;
      padding: 0 5vw;
      box-sizing: border-box;
      overflow-x: hidden;

      // 确保内容不会超出
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .user {
      display: none;
    }
  }
}

// 小屏手机响应式 (576px 及以下)
@media (max-width: 576px) {
  .view {
    grid-template-areas: 'main';
    grid-template-columns: 1fr;

    .main {
      width: 100vw;
      max-width: 100vw;
      margin-left: 0;
      padding: 0 4vw; // 进一步减少 padding
      box-sizing: border-box;
      overflow-x: hidden;
    }

    .user {
      display: none;
    }
  }
}

// 超小屏响应式 (480px 及以下)
@media (max-width: 480px) {
  .view {
    .main {
      padding: 0 3vw; // 最小 padding
    }
  }
}

// 全局防溢出规则
* {
  box-sizing: border-box;
}

// 确保所有子元素不会导致水平滚动
.view * {
  max-width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
}
</style>
