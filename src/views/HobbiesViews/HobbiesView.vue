<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import ChangeAnimation from '@/components/AnimatiionCompo/ChangeAnimation.vue';
import ViewsContainer from '@/views/ViewsContainer.vue';
import HobbyBreadcrumb from '@/components/HobbiesCompo/HobbyBreadcrumb.vue';


defineOptions({
  name: 'HobbiesView'
});
const route = useRoute();
const router = useRouter();

const handleClick = (name: string) => {
  router.push({ name: name });
};
</script>

<template>
  <div>
    <ChangeAnimation />
    <ViewsContainer>
      <template #main>
        <HobbyBreadcrumb :route="route" />
        <!-- 如果有子路由，渲染子路由组件 -->
        <router-view v-if="route.matched.length > 1" v-slot="{ Component }">
          <keep-alive include="NovelCommonView">
            <component :is="Component" />
          </keep-alive>
        </router-view>
        <!-- 如果没有子路由，显示爱好选择界面 -->
        <div v-else class="hobbies-container">
          <div class="novel" @click="handleClick('novel')">
            <img src="../../assets/images/hobbies/novel.png" alt="">
            <p>我瞎写的小说</p>
          </div>
          <div class="music" @click="handleClick('music')">
            <img src="../../assets/images/hobbies/music.png" alt="">
            <p>我喜欢的音乐</p>
          </div>
          <div class="life" @click="handleClick('life')">
            <img src="../../assets/images/hobbies/life.png" alt="">
            <p>我记录的生活</p>
          </div>
        </div>
      </template>
    </ViewsContainer>
  </div>
</template>

<style scoped>
.hobbies-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 2rem;
  place-content: center;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    img {
      width: 200px;
      height: 200px;
    }

    p {
      font-size: 16px;
    }
  }
}
</style>
