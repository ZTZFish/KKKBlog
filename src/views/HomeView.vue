<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import { useRouter } from 'vue-router';
const router = useRouter();

const animationTriggered = ref(false);


onMounted(() => {
  // 延迟触发动画，确保页面加载完成
  setTimeout(() => {
    animationTriggered.value = true;
  }, 100);
});

const enterIndex = () => {
  router.push({ name: 'index' });
};
</script>

<template>
  <header class="navbar">
    <div class="logo">
      <img src="../assets/images/Logo.png" alt="logo">
    </div>
    <div class="menu">
      <t-button ghost variant="text" @click="router.push({ name: 'index' })">首页</t-button>
      <t-button ghost variant="text" @click="router.push({ name: 'essay' })">文章</t-button>
      <t-button ghost variant="text" @click="router.push({ name: 'hobbies' })">爱好</t-button>
    </div>
  </header>
  <main class="home">
    <div class="content" :class="{ 'slide-in': animationTriggered }">
      <div class="introduce">
        <!-- 为每个span添加不同的延迟类 -->
        <span class="line line-1">你好，我是</span>
        <span class="line line-2 name">KKK</span>
        <span class="line line-3">一个喜欢写作和发呆的菜鸟前端</span>
        <div class="line line-4">
          <t-button variant="outline" ghost @click="enterIndex">进入首页</t-button>
          <a href="https://github.com/ZTZFish" target="_blank" title="github">
            <t-button shape="circle" variant="outline" ghost>
              <template #icon><t-icon name="logo-github" /></template>
            </t-button>
          </a>
          <a href="https://about.me/aboutKKK" target="_blank" title="aboutKKK">
            <t-button shape="circle" variant="outline" ghost>
              <template #icon><t-icon name="info-circle" /></template>
            </t-button>
          </a>
          <a href="mailto:1963109104@qq.com" target="_blank" title="1963109104@qq.com">
            <t-button shape="circle" variant="outline" ghost>
              <template #icon><t-icon name="mail" /></template>
            </t-button>
          </a>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 8vh;
  font-size: 20px;
  z-index: 999;
  animation: fadeIn 3s ease forwards;

  .logo {
    display: flex;
    align-items: center;
    margin-left: 2em;
    width: 8vh;
    height: 8vh;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .menu {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 2em;
    gap: 1em;

    :deep(.t-button) {
      font-size: 1em;
    }
  }
}

.home {
  height: 100vh;
  background: url(../assets/images/HomeBck.jpg) no-repeat center center fixed;
  background-size: cover;

  .content {
    position: relative;
    display: flex;
    align-items: center;
    width: 80vw;
    height: 100%;
    margin-left: 10vw;
    z-index: 1;
  }

  .introduce {
    display: flex;
    flex-direction: column;
    align-items: start;
    font-size: 30px;
    color: #fff;

    .line {
      opacity: 0;
      transform: translateY(30px);
      animation: fadeUp 0.8s ease forwards;
    }

    .line-1 {
      animation-delay: 0.2s;
    }

    .line-2 {
      animation-delay: 0.4s;
    }

    .line-3 {
      animation-delay: 0.6s;
    }

    .line-4 {
      animation-delay: 0.8s;
      margin-top: 1em;
      display: flex;
      align-items: center;
      gap: 1em;

      a {
        text-decoration: none;
        display: flex;
        align-items: center;
      }
    }

    span {
      font-size: 2em;
      font-weight: 700;
    }

    .name {
      font-size: 3em;
      color: #0052d9;
    }
  }
}

.home::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
}

//媒体查询
@media (max-width: 1024px) {
  .home .content .introduce {
    font-size: 24px;
  }

  header {
    font-size: 16px;
  }
}

@media (max-width: 768px) {
  .home .content .introduce {
    font-size: 20px;
  }

  header {
    font-size: 14px;
  }

}

// 定义动画
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
