<template>
  <div class="anchor" v-if="isDOM && anchorData.length > 0">
    <t-anchor :bounds="100" @click="handleAnchorClick" :target-offset="56">
      <t-anchor-item
        v-for="(item, index) in anchorData"
        :key="index"
        :title="item.title"
        :href="item.href"
        :style="{ paddingLeft: (item.level - 1) * 16 + 'px' }"
      />
    </t-anchor>
  </div>
</template>
<script lang="ts" setup>
import { inject, watchEffect, type Ref, ref } from 'vue';

//监听DOM的创建
// 注入时指定类型，确保获取到ref对象
const mdContentDOMs = inject<Ref<HTMLElement | null>>('mdContentDOMs', ref(null));
const isDOM = inject<Ref<boolean>>('isDOM', ref(false));
//储存锚点数据
interface AnchorItem {
  title: string;
  href: string;
  level: number;
}
const anchorData = ref<AnchorItem[]>([]);

// 监听ref的value变化
// 监听 .value 变化
watchEffect(() => {
  if (isDOM.value && mdContentDOMs.value) {
    // 清空之前的数据，防止重复添加
    anchorData.value = [];
    const headers = mdContentDOMs.value.querySelectorAll('h1, h2, h3, h4, h5, h6');

    const newAnchorData: AnchorItem[] = [];

    headers.forEach((header, index) => {
      // 🔥 关键修复3：使用 textContent 而不是 innerHTML
      const title = header.textContent || `标题 ${index + 1}`;
      const id = header.id || `heading-${index}`;
      const level = parseInt(header.tagName.substring(1)); // 获取标题等级（1-6）

      // 设置ID
      if (!header.id) {
        header.id = id;
      }

      newAnchorData.push({
        title,
        href: `#${id}`,
        level,
      });
    });
    anchorData.value = newAnchorData;
    console.log('锚点数据生成完成:', anchorData.value);
  }
});
const handleAnchorClick = (e: { href: string; e: MouseEvent }) => {
  e.e.preventDefault(); // 阻止浏览器默认 hash 跳转
  const target = document.querySelector(e.href);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

</script>
<style lang="scss" scoped>
:deep() {
  .t-anchor {
    background: none;
  }
}

.anchor {
  margin: 5vh auto 0;
}
</style>
