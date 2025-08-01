<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import type { TimelineProps } from 'tdesign-vue-next';
import { essayDataStore } from '@/stores/essaysData';
import { useRouter } from 'vue-router';

const router = useRouter();
const essayData = essayDataStore();
const layout = ref<TimelineProps['layout']>('vertical');
const options = ref<Array<{ label: string; content: Array<string> }>>([]);

onBeforeMount(() => {
  const groupedData: Record<string, string[]> = {};

  // 按照 label(time) 分组
  essayData.essays.forEach((item) => {
    if (!groupedData[item.time]) {
      groupedData[item.time] = [];
    }
    groupedData[item.time].push(item.title);
  });

  // 转换为 timeline 所需的格式
  options.value = Object.entries(groupedData).map(([label, content]) => ({
    label,
    content,
  }));
});

const enterEssayDetail = (essayTitle: string) => {
  router.push({
    name: 'essayDetail',
    params: {
      essayTitle,
    }
  })
}

</script>


<template>
  <div>
    <t-timeline :layout="layout" mode="same" labelAlign="alternate">
      <t-timeline-item v-for="(item, index) in options" :key="index" :label="item.label" dot-color="primary">
        <div v-for="(content, index) in item.content" :key="index">
          <div class="article" @click="enterEssayDetail(content)">{{ content }}</div>
        </div>
      </t-timeline-item>
    </t-timeline>
  </div>
</template>



<style lang="scss" scoped>
.article {
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
