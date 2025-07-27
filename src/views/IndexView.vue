<script lang="ts" setup>
import ViewsContainer from '../views/ViewsContainer.vue'
import ChangeAnimation from '../components/ChangeAnimation.vue'
import EssayCard from '@/components/EssayCard.vue';
import { essayDataStore } from '@/stores/essaysData'

const essayData = essayDataStore()
</script>

<template>
  <ChangeAnimation />
  <ViewsContainer>
    <template #main>
      <div class="index">
        <t-divider>精选文章</t-divider>
        <div class="essays">
          <div class="essay" v-for="item in essayData.essays" :key="item.id">
            <EssayCard :essay="item" />
          </div>
        </div>
      </div>
    </template>
  </ViewsContainer>
</template>

<style lang="scss" scoped>
:deep(.t-divider) {
  font-size: 2rem;
  color: #b1b3b5;
  margin-bottom: 3rem;
}

.essays {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
}

@media (max-width: 1024px) {
  .essays {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (max-width: 768px) {
  .essays {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1rem;
  }
}
</style>
