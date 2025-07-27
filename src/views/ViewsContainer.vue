<script setup lang="ts">
import UserInfo from '@/components/UserInfo.vue'
import HeadMenu from '@/components/HeadMenu.vue'

</script>

<template>
  <HeadMenu />
  <t-divider style="margin: 0;" />
  <div class="view">
    <main class="main">
      <slot name="main"></slot>
    </main>
    <div class="user" ref="user">
      <UserInfo />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.view {
  display: grid;
  grid-template-areas: 'none main user';
  grid-template-columns: 1fr 7fr 3fr;
  background-color: #f5f5f5;
  height: 100vh;
  margin-top: 56px;



  .main {
    grid-area: main;
    padding: 0 2vw;
    background-color: #fff;
  }

  .user {
    position: fixed;
    width: 22%;
    top: 5vh;
    right: 3%;
    grid-area: user;
  }
}

@media(max-width:1024px) {
  html {
    font-size: 14px;
  }

  .view {
    grid-template-areas: 'none main user';
    grid-template-columns: 1fr 7fr 3fr;

    .main {
      margin-left: 0;
    }
  }
}

@media(max-width:768px) {
  .view {
    grid-template-areas: 'main';
    grid-template-columns: 1fr;

    .main {
      margin-left: 0;
      padding: 0 5vw;
    }

    .user {
      display: none;
    }
  }
}
</style>
