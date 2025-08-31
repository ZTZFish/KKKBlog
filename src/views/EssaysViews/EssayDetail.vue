<script lang="ts" setup>
import ViewsContainer from '../ViewsContainer.vue'
import ChangeAnimation from '../../components/AnimatiionCompo/ChangeAnimation.vue'
import { ref, watchEffect, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import GiscusComments from '../../components/EssayCompo/GiscusComments.vue'
import { pageviewCount } from '@waline/client';


pageviewCount({
  serverURL: 'https://kkksever.vercel.app',
  path: window.location.href,
  update: true,
});

const route = useRoute();
const mdContent = ref('');

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

watchEffect(async () => {
  if (route.path.startsWith('/essayDetail/')) {
    try {
      const { default: markdown } = await import(
        `@/essays/${route.params.essayTitle}.md?raw`
      );
      mdContent.value = md.render(markdown);

      nextTick(() => {
        addCopyButtons();
      });
    } catch (err) {
      console.error('Failed to load markdown:', err);
    }
  }
});

const addCopyButtons = () => {
  const codeBlocks = document.querySelectorAll('pre.hljs');

  codeBlocks.forEach((block) => {
    if (block.querySelector('.copy-btn')) return;

    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.textContent = '复制';
    button.addEventListener('click', () => copyCode(block as HTMLElement));

    (block as HTMLElement).style.position = 'relative';
    button.style.cssText = `
      position: absolute;
      top: 0.5em;
      right: 0.5em;
      padding: 4px 8px;
      font-size: 12px;
      border: none;
      border-radius: 4px;
      background: rgba(0,0,0,0.6);
      color: white;
      cursor: pointer;
      z-index: 10;
    `;
    block.appendChild(button);
  });
};

const copyCode = async (block: HTMLElement) => {
  const codeElement = block.querySelector('code');
  const code = codeElement?.textContent ?? '';
  const button = block.querySelector('.copy-btn') as HTMLElement;

  try {
    await navigator.clipboard.writeText(code);
    if (button) {
      button.textContent = '已复制';
      button.style.background = '#10b981';

      setTimeout(() => {
        button.textContent = '复制';
        button.style.background = 'rgba(0,0,0,0.6)';
      }, 3000);
    }
  } catch (err) {
    if (button) {
      console.error('复制失败:', err);
      button.textContent = '复制失败';
      button.style.background = '#ef4444';

      setTimeout(() => {
        button.textContent = '复制';
        button.style.background = 'rgba(0,0,0,0.6)';
      }, 3000);
    }
  }
}
</script>

<template>
  <div>
    <ChangeAnimation />
    <ViewsContainer>
      <template #main>
        <div class="markdown-body" v-html="mdContent" />
        <div class="pageview-section">
          本文阅读量：<span class="waline-pageview-count" />
        </div>
        <GiscusComments />
      </template>
    </ViewsContainer>
  </div>
</template>

<style lang="scss" scoped>
.markdown-body {
  width: 100%;
  max-width: 100%;
  padding: 1vh 2vw 5vh;
  box-sizing: border-box;
  word-wrap: break-word;

  // 图片响应式处理
  :deep(p img) {
    display: block;
    max-width: 100%;
    width: 100%;
    height: auto;
    border: 1px solid #e3e5e7;
    box-sizing: border-box;
  }

  // 代码块响应式优化 - 关键修复
  :deep(pre.hljs) {
    overflow-x: auto;
    box-sizing: border-box;
    max-width: 100%;
    width: 100%;
    margin: 1em 0;
    padding: 1em;
    border-radius: 6px;

    // 移动端特殊处理
    @media (max-width: 768px) {
      margin-left: 0;
      margin-right: 0;
      border-radius: 0;
      // 确保代码块不会超出容器
      width: calc(100vw - 10vw); // 减去左右 padding
      max-width: calc(100vw - 10vw);
    }
  }

  // 代码文本处理
  :deep(code) {
    white-space: pre;
    word-break: normal;
    overflow-wrap: normal;

    // 行内代码的处理
    &:not(pre code) {
      white-space: pre-wrap;
      word-break: break-word;
      padding: 2px 4px;
      background-color: #f6f8fa;
      color: #333333;
      border-radius: 3px;
      font-size: 0.9em;
    }
  }

  // 表格响应式
  :deep(table) {
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
    display: block;
    white-space: nowrap;

    @media (max-width: 768px) {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
    }
  }

  // 长文本和链接处理
  :deep(p) {
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;

    // 长链接处理
    a {
      word-break: break-all;
      overflow-wrap: break-word;
    }
  }

  // 标题响应式
  :deep(h1, h2, h3, h4, h5, h6) {
    word-wrap: break-word;
    overflow-wrap: break-word;

    @media (max-width: 768px) {
      font-size: 1.2em;
      line-height: 1.4;
    }
  }

  // 列表处理
  :deep(ul, ol) {
    padding-left: 1.5em;

    @media (max-width: 768px) {
      padding-left: 1em;
    }
  }
}

.pageview-section {
  display: block;
  margin-top: 2rem;
  padding-left: 2vw;
  font-size: 0.9em;
  color: #666;

  @media (max-width: 768px) {
    padding-left: 0;
    text-align: center;
  }
}

// 防止任何元素超出容器
:deep(pre, code, img, table, div) {
  max-width: 100%;
}

:deep(a) {
  color: #007bff;
}
</style>
