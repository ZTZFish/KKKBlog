<script lang="ts" setup>
import ChangeAnimation from '@/components/AnimatiionCompo/ChangeAnimation.vue';
import ViewContainer from './ViewsContainer.vue';
import { computed } from 'vue';
import { useResourceStore } from '@/stores/resource';

const resourceStore = useResourceStore();
const resource = resourceStore.resource;
const sourceType = resourceStore.sourceType;

// 将原来的filteredResource修改为
const filteredResource = computed(() => {
  return (type: string) => {
    return resource.filter(item => item.type === type);
  };
});
</script>

<template>
  <div>
    <ChangeAnimation />
    <ViewContainer>
      <template #main>
        <div class="container">
          <div class="resource-container" v-for="type in sourceType" :key="type">
            <h2 class="type-title">{{ type }}</h2>
            <div class="resource-list">
              <div class="resource-item" v-for="item in filteredResource(type)" :key="item.id">
                <a :href="item.url" target="_blank">
                  <div class="icon">
                    <img :src="item.iconUrl" alt="">
                  </div>
                  <div class="info">
                    <span class="title">{{ item.title }}</span>
                    <span class="intro">{{ item.intro }}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </template>
    </ViewContainer>
  </div>
</template>

<style lang="scss" scoped>
.resource-container {

  .type-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 1rem 0;
  }

  .resource-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 2rem;

    .resource-item {
      display: flex;
      align-items: center;
      cursor: pointer;
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 0.4rem;
      background-color: var(--color-bg);
      color: var(--color-text);

      &:hover {
        border-color: var(--color-text);
        background-color: var(--color-bg-hover);
        color: var(--color-text-hover);

        a {
          color: var(--color-text-hover);
        }
      }

      a {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        text-decoration: none;
        color: var(--color-text);
      }

      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }

      .info {
        width: calc(100% - 60px);
        display: flex;
        flex-direction: column;
        justify-content: center;

        .title {
          font-size: 1.2rem;
          font-weight: bold;
          margin-left: 1rem;
        }

        .intro {
          margin-left: 1rem;
          font-size: 1rem;
          color: #999;
        }
      }
    }
  }
}
</style>
