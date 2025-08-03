<!-- HobbiesView.vue -->
<script lang="ts" setup>
import { useRoute } from 'vue-router';
import ChangeAnimation from '@/components/AnimatiionCompo/ChangeAnimation.vue';
import ViewsContainer from '@/views/ViewsContainer.vue';
import HobbyBreadcrumb from '@/components/HobbiesCompo/HobbyBreadcrumb.vue';

const route = useRoute();
</script>

<template>
  <div>
    <ChangeAnimation />
    <ViewsContainer>
      <template #main>
        <!-- 传递路由信息给面包屑 -->
        <HobbyBreadcrumb :route="route" :secondTitle="(route.meta?.secondTitle as string | undefined)"
          :thirdTitle="(route.meta?.thirdTitle as string | undefined)"
          :fourthTitle="(route.meta?.fourthTitle as string | undefined)" />
        <router-view />
      </template>
    </ViewsContainer>
  </div>
</template>
