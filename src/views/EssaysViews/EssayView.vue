<script lang="ts" setup>
import ViewsContainer from '../ViewsContainer.vue'
import ChangeAnimation from '@/components/AnimatiionCompo/ChangeAnimation.vue'
import PigeonHole from './PigeonHole.vue';
import EssagClassification from './EssagClassification.vue';
import { ref, onActivated, nextTick } from 'vue'

// 控制动画是否显示的状态
const shouldAnimate = ref(true)

// 当组件从缓存中被激活时触发
onActivated(() => {
  // 强制动画重新渲染：先隐藏再显示（利用nextTick确保DOM更新）
  shouldAnimate.value = false
  nextTick(() => {
    shouldAnimate.value = true
  })
})
defineOptions({
  name: 'EssayView'
})
</script>

<template>
  <div>
    <ChangeAnimation v-if="shouldAnimate" />
    <ViewsContainer>
      <template #main>
        <t-tabs :default-value="1">
          <t-tab-panel :value="1" label="归档">
            <p style="margin: 20px">
              <PigeonHole />
            </p>
          </t-tab-panel>
          <t-tab-panel :value="2" label="分类">
            <p style="margin: 20px">
              <EssagClassification />
            </p>
          </t-tab-panel>
        </t-tabs>
      </template>
    </ViewsContainer>
  </div>
</template>



<style style='scss' scoped>
:deep(.t-tabs) {
  height: 100%;
}
</style>
