<script lang="ts" setup>
import ViewsContainer from '../views/ViewsContainer.vue'
import ChangeAnimation from '../components/ChangeAnimation.vue'
import { ref, watchEffect, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const route = useRoute();
const mdContent = ref('');

// 配置 Markdown 解析器并启用高亮
const md: MarkdownIt = MarkdownIt({
  html: true,
  highlight: (str: string, lang: string) => {
    if (lang && hljs.getLanguage(lang)) {
      const highlighted = hljs.highlight(str, { language: lang }).value;
      return `<pre class="hljs"><code>${highlighted}</code></pre>`;
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  }
});
//监听路由
watchEffect(async () => {
  if (route.path.startsWith('/essayDetail/')) {
    try {
      const { default: markdown } = await import(
        `../essays/${route.params.essayTitle}.md?raw`
      );
      mdContent.value = md.render(markdown);

      // 内容更新后，添加复制按钮
      nextTick(() => {
        addCopyButtons();
      });
    } catch (err) {
      console.error('Failed to load markdown:', err);
    }
  }
});

// 添加复制按钮到所有代码块
const addCopyButtons = () => {
  const codeBlocks = document.querySelectorAll('pre.hljs');

  codeBlocks.forEach((block) => {
    // 检查是否已添加复制按钮
    if (block.querySelector('.copy-btn')) return;

    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.textContent = '复制';
    button.addEventListener('click', () => copyCode(block as HTMLElement));

    // 设置代码块为相对定位，使按钮可以绝对定位
    (block as HTMLElement).style.position = 'relative';
    button.style = 'position: absolute; top: 0.5em; right: 0.5em;';
    block.appendChild(button);
  });
};

// 复制代码到剪贴板
const copyCode = async (block: HTMLElement) => {
  const codeElement = block.querySelector('code');
  const code = codeElement?.textContent ?? '';
  const button = block.querySelector('.copy-btn');

  try {
    // 使用 Clipboard API 复制文本
    await navigator.clipboard.writeText(code);
    if (button) {
      // 更新按钮状态显示成功
      button.textContent = '已复制';
      button.classList.add('bg-green-500', 'text-white');

      // 3秒后恢复原状
      setTimeout(() => {
        button.textContent = '复制';
        button.classList.remove('bg-green-500', 'text-white');
      }, 3000);
    }
  } catch (err) {
    if (button) {
      console.error('复制失败:', err);
      button.textContent = '复制失败';
      button.classList.add('bg-red-500', 'text-white');

      setTimeout(() => {
        button.textContent = '复制';
        button.classList.remove('bg-red-500', 'text-white');
      }, 3000);
    }
  };
}
</script>

<template>
  <div>
    <ChangeAnimation />
    <ViewsContainer>
      <template #main>
        <div class="markdown-body relative" v-html="mdContent" />
      </template>
    </ViewsContainer>
  </div>
</template>

<style lang="scss" scoped>
.markdown-body {
  padding: 5vh 2vw 10vh;

  :deep(p img) {
    width: 100%;
    border: 1px solid #e3e5e7;
  }
}
</style>
