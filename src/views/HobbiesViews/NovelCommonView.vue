<!-- NovelCommonView.vue -->
<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { computed, ref, watch } from 'vue';
import { useTOGDStore } from '@/stores/NovTOGD';
import { useQMZMStore } from '@/stores/NovQMZM';

defineOptions({
  name: 'NovelCommonView',
});
const togdStore = useTOGDStore();
const qmzmStore = useQMZMStore();
const route = useRoute();

// 章节内容相关状态
const chapterContent = ref('');

const loadError = ref('');
const showContent = ref('chapterList')

//定义小说类型
interface Novel {
  id: number;
  title: string;
  tag: string[];
  time: string;
  status: string;
  intro: string;
  postUrl: string;
  chapters: { id: number; title: string; contentUrl: string }[];
  extra: { id: number; title: string; contentUrl: string }[];
}

const novels: Novel[] = [
  togdStore.togd,
  qmzmStore.qmzm,
];

// 使用计算属性，自动响应路由变化
const currentType = computed(() => route.meta.type);
const novelTitle = computed(() => route.params.novelTitle);
const chapterTitle = computed(() => route.params.chapterTitle);

const currentNovel = computed(() => {
  if (!novelTitle.value) return undefined;
  return novels.find(n => n.title === novelTitle.value);
});

// 获取当前章节信息
const currentChapter = computed(() => {
  if (!currentNovel.value || !chapterTitle.value) return undefined;
  return currentNovel.value.chapters.find(c => c.title === chapterTitle.value);
});
// 获取当前番外信息
const currentExtra = computed(() => {
  if (!currentNovel.value || !chapterTitle.value) return undefined;
  return currentNovel.value.extra.find(c => c.title === chapterTitle.value);
});

// 加载章节内容的函数
const loadChapterContent = async (contentUrl: string) => {

  loadError.value = '';
  chapterContent.value = '';

  try {
    const response = await fetch(contentUrl);
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    chapterContent.value = text;
  } catch (error) {
    console.error('加载章节内容失败:', error);
    loadError.value = '加载章节内容失败，请稍后重试';
  } finally {

  }
};

// 监听当前章节变化，自动加载内容
watch([currentChapter, currentExtra], ([newChapter, newExtra]) => {
  if (newChapter && currentType.value === 'chapterDetail') {
    loadChapterContent(newChapter.contentUrl);
  }
  if (newExtra && currentType.value === 'chapterDetail') {
    loadChapterContent(newExtra.contentUrl);
  }
}, { immediate: true });



// 格式化章节内容（处理换行等）
// 新代码（返回段落数组）
const formattedContent = computed(() => {
  if (!chapterContent.value) return [];

  // 拆分为段落数组（过滤空行）
  return chapterContent.value
    .split('\n')
    .filter(line => line.trim()) // 过滤空行
    .map(line => line.trim());   // 去除每行首尾空格
});
</script>

<template>
  <div class="novel-common-view">
    <!-- 内容区域（根据路由类型动态显示） -->
    <!-- 替换 NovelCommonView.vue 中的小说列表部分 -->
    <div v-if="currentType === 'novelList'">
      <h2>小说列表</h2>
      <div class="novel-container">
        <div v-for="novel in novels" :key="novel.id" @click="$router.push({
          name: 'chapterList',
          params: { novelTitle: novel.title }
        })" class="novel-item">
          <div class="novel-cover">
            <img :src="novel.postUrl" alt="小说封面">
          </div>
          <div class="info">
            <div class="novel-title">{{ novel.title }}</div>
            <div class="novel-info">
              <div class="tags">{{ novel.tag.join('、') }}</div>
              <div class="meta">{{ novel.time }} | {{ novel.status }}</div>
              <div class="intro">{{ novel.intro }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="currentType === 'chapterList' && currentNovel">
      <h2>{{ currentNovel.title }} - 章节列表</h2>
      <button @click="$router.push({ name: 'novel' })">返回小说列表</button>
      <div class="menu">
        <div class="menu-item" :class="{ 'active': showContent === 'chapterList' }"
          @click="showContent = 'chapterList'">
          正文
        </div>
        <div class="menu-item" :class="{ 'active': showContent === 'extraList' }" @click="showContent = 'extraList'">
          番外
        </div>
      </div>
      <ul v-if="showContent === 'chapterList'">
        <li v-for="(chapter, i) in currentNovel.chapters" :key="i" @click="$router.push({
          name: 'chapter',
          params: { novelTitle: currentNovel.title, chapterTitle: chapter.title }
        })">
          {{ chapter.title }}
        </li>
      </ul>
      <ul v-else>
        <li v-for="(extra, i) in currentNovel.extra" :key="i" @click="$router.push({
          name: 'chapter',
          params: { novelTitle: currentNovel.title, chapterTitle: extra.title }
        })">
          {{ extra.title }}
        </li>
      </ul>
    </div>

    <div v-else-if="currentType === 'chapterDetail'">
      <h2>{{ chapterTitle }}</h2>
      <button @click="$router.go(-1)">返回章节列表</button>
      <div class="chapter-content">
        <!-- 章节内容 -->

        <div v-if="formattedContent.length" class="content">
          <!-- 循环渲染每个段落，用<p>标签包裹 -->
          <p v-for="(paragraph, index) in formattedContent" :key="index">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.novel-common-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #333;
  background: #fafafa;
  min-height: 100vh;

  h2 {
    font-size: 1.8rem;
    font-weight: 400;
    color: #222;
    margin-bottom: 40px;
    text-align: left;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 12px;
  }

  // 小说列表样式
  .novel-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    place-content: center;
    gap: 2rem;
    margin-top: 32px;

    >div {
      background: white;
      border: 1px solid #e8e8e8;
      border-radius: 4px;
      padding: 5px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        border-color: #d0d0d0;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }

    .novel-item {
      width: 100%;
      display: flex;
      align-items: center;

      .novel-cover {
        width: 200px;
        height: 300px;
        border-radius: 2px;
        overflow: hidden;
        background: #f5f5f5;
        flex-shrink: 0;
        /* 关键：禁止收缩 */

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        height: 100%;
        padding: 12px;

        .novel-title {
          font-size: 1.5rem;
          font-weight: 500;
          color: #444;
          margin: 0 0 8px 0;
          text-align: center;
          line-height: 1.4;
          margin-bottom: 12px;
        }

        .novel-info {
          text-align: center;
          font-size: 1rem;
          color: #666;
          line-height: 1.4;


          .tags {
            margin-bottom: 12px;
          }

          .meta {
            color: #999;
            margin-bottom: 12px;
          }

          .intro {
            text-indent: 2em;
            text-align: left;
            color: #999;
            flex: 1;
          }
        }
      }
    }
  }

  .menu {
    display: flex;
    justify-content: start;
    margin-bottom: 2rem;
    padding-left: 16px;

    .menu-item {
      margin-right: 2rem;
      cursor: pointer;
    }

    .menu-item:first-child.active {
      border-bottom: 2px solid #333;
    }

    .menu-item:last-child.active {
      border-bottom: 2px solid #333;
    }
  }

  // 章节列表样式
  ul {
    list-style: none;
    padding: 0;
    margin: 32px 0;

    li {
      background: white;
      border: 1px solid #e8e8e8;
      border-top: none;
      padding: 16px 20px;
      cursor: pointer;
      transition: background-color 0.15s ease;
      font-size: 0.95rem;
      color: #555;

      &:first-child {
        border-top: 1px solid #e8e8e8;
        border-radius: 4px 4px 0 0;
      }

      &:last-child {
        border-radius: 0 0 4px 4px;
      }

      &:only-child {
        border-radius: 4px;
      }

      &:hover {
        background: #f8f8f8;
        color: #333;
      }
    }
  }

  // 按钮样式
  button {
    background: #333;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 2px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 400;
    transition: background-color 0.2s ease;
    margin-bottom: 24px;

    &:hover {
      background: #555;
    }

    &:active {
      background: #222;
    }
  }

  // 章节详情样式
  .chapter-content {
    margin-top: 32px;

    .content {
      width: 100%;
      // 新增：确保容器不会被内容撑开
      overflow: visible;
      background: white;
      border: 1px solid #e8e8e8;
      border-radius: 4px;
      padding: 1rem;

      /* 允许内容正常显示，不隐藏溢出部分 */
      // 针对每个段落的样式
      p {
        line-height: 1.7;
        margin: 1.5rem 0; // 段落之间添加间距（替代原来的\n\n）
        padding: 0;
        text-indent: 2em; // 首行缩进2个字符
        font-size: 1rem;
        color: #444;
      }
    }


  }

  // 响应式设计
  @media (max-width: 768px) {
    padding: 24px 16px;

    h2 {
      font-size: 1.5rem;
      margin-bottom: 24px;
    }

    .novel-container {
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 16px;
      margin-top: 24px;

      >div {
        padding: 0;

        p {
          font-size: 0.9rem;
        }
      }
    }

    ul li {
      padding: 14px 16px;
      font-size: 0.9rem;
    }

    button {
      padding: 8px 16px;
      font-size: 0.85rem;
    }

    .chapter-content p {
      padding: 24px;
      font-size: 0.95rem;
    }
  }

  @media (max-width: 480px) {
    padding: 16px 0;

    .novel-container {
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px;
    }

    h2 {
      font-size: 1.3rem;
    }
  }
}
</style>
