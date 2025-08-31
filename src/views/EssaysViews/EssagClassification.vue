<script lang="ts" setup>
import { ref } from 'vue'
import { essayDataStore } from '@/stores/essaysData'
import EssayCard from '@/components/EssayCompo/EssayCard.vue'


const essayData = essayDataStore()
const essayList = ref<object[]>([])
const isShowEssays = ref(false)
const showEssays = (tag: string) => {
  essayList.value = essayData.essays.filter(essay => essay.tags.includes(tag))
  isShowEssays.value = true
}
</script>

<template>
  <div class="calssification" v-show="!isShowEssays">
    <div class="container">
      <div class="HTML" @click="showEssays('HTML')">
        <img src="../../assets/images/essayClassification/HTML5.png" alt="">
      </div>
      <div class="CSS" @click="showEssays('CSS')">
        <img src="../../assets/images/essayClassification/CSS3.png" alt="">
      </div>
      <div class="Vue" @click="showEssays('Vue')">
        <img src="../../assets/images/essayClassification/VUE.png" alt="">
      </div>
      <div class="Vue" @click="showEssays('JavaScript')">
        <img src="../../assets/images/essayClassification/JavaScript.png" alt="">
      </div>
    </div>
  </div>
  <div class="essays" v-if="isShowEssays && essayList.length > 0">
    <t-button shape="round" variant="outline" @click.stop="isShowEssays = false">返回</t-button>
    <div class="essay-container">
      <div class="essay-item" v-for="(item, index) in essayList" :key="index">
        <EssayCard :essay="item" />
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  place-content: center;
  gap: 5rem;
  height: 100%;
  justify-items: center;

  div {
    display: flex;
    width: 100px;
    height: 100px;
    justify-content: center;
    align-items: center;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: scale(1.1)
    }
  }

}

.essays {
  .essay-container {
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    padding-top: 1rem;
    padding-bottom: 5rem;

  }
}
</style>
