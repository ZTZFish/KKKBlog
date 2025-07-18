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



  .main {
    grid-area: main;
    margin-left: 5%;
    background-color: #fff;
  }

  .user {
    grid-area: user;
  }
}

@media(max-width:1024px) {
  .view {
    grid-template-areas: 'none main user';
    grid-template-columns: 1fr 7fr 3fr;

    .main {
      margin-left: 0;
    }
  }
}

@media(max-width:798px) {
  .view {
    grid-template-areas: 'main';
    grid-template-columns: 1fr;

    .main {
      margin-left: 0;
    }

    .user {
      display: none;
    }
  }
}
</style>
