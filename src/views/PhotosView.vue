<script lang="ts" setup>
import swipperImg1 from '@/assets/images/photos/swipperList1.jpg'
import swipperImg2 from '@/assets/images/photos/swipperList2.jpg'
import swipperImg3 from '@/assets/images/photos/swipperList3.jpg'
import HeadMenu from '@/components/HeadMenu.vue'
import ChangeAnimation from '@/components/ChangeAnimation.vue'
import { ref, computed } from 'vue'
import { useImages } from '@/composables/useImages'
import ImagePreview from '@/components/ImageView.vue'

const { images: photos, loading } = useImages('PhotosView')
const swipperList = ref([
  {
    id: 1,
    url: swipperImg1,
  },
  {
    id: 2,
    url: swipperImg2,
  },
  {
    id: 3,
    url: swipperImg3,
  },
])

// 预览相关状态
const previewVisible = ref(false);
const previewIndex = ref(0);

// 合并轮播图和照片列表作为所有图片
const allImages = computed(() => {
  return [...swipperList.value, ...photos.value];
});

// 打开预览的方法
const openPreview = (index: number, from: 'swipper' | 'photos') => {
  // 根据来源计算正确的索引
  if (from === 'swipper') {
    previewIndex.value = index;
  } else {
    previewIndex.value = swipperList.value.length + index;
  }
  previewVisible.value = true;
};
</script>

<template>
  <ChangeAnimation />
  <header style="margin-bottom: 5vh;">
    <HeadMenu />
  </header>
  <t-loading v-if="loading" />
  <main v-else>
    <div class="swipper-content">
      <div class="swipper">
        <t-swiper class="tdesign-demo-block--swiper" :duration="300" :interval="2000">
          <t-swiper-item v-for="(item, index) in swipperList" :key="item.id" @click="openPreview(index, 'swipper')">
            <img :src="item.url" alt="">
          </t-swiper-item>
        </t-swiper>
      </div>
    </div>
    <div class="photos" v-for="(item, index) in photos" :key="item.id" @click="openPreview(index, 'photos')">
      <img :src="item.url" alt="">
    </div>
  </main>
  <!-- 图片预览组件 -->
  <ImagePreview :visible="previewVisible" :images="allImages" :current-index="previewIndex"
    @close="previewVisible = false" @update:currentIndex="(index) => previewIndex = index" />
</template>

<style lang="scss" scoped>
:deep(.tdesign-demo-block--swiper) {
  height: 100%;
}

:deep(.t-swiper__content) {
  height: 100%;
}

:deep(.t-swiper__container) {
  height: 100%;
}

:deep(.t-swiper__container__item) {
  height: 100%;
}

main {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  min-height: calc(100vh - 56px);
  margin-top: 10vh;
  margin-bottom: 5vh;
  padding: 0 5%;
  gap: 2em;
  /* 禁用用户选择文本 */
  user-select: none;
  -webkit-user-select: none;
  /* Safari */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* IE/Edge */

  /* 确保模糊背景不会超出main元素 */
  .swipper-content {
    grid-column: 1 / 4;
    /* 合并列 */
    grid-row: 1 / 2;

    /* 合并行 */
    .swipper {
      box-sizing: border-box;
      height: 100%;
      border: 2px solid rgba(255, 255, 255, 0.18);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        cursor: pointer;
      }
    }
  }
}

.photos {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  border: 10px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: transform 0.3s ease;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:first-child {
    margin-top: 10vh;
  }

  &:hover {
    transform: scale(1.1);
  }
}



main::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/images/photos/photosViewBck.jpg');
  background-size: cover;
  filter: blur(3px);
  /* 使用filter而不是backdrop-filter */
  z-index: -1;
  /* 将伪元素置于main内容的后面 */
  transform: scale(1.1);
  /* 避免模糊后边缘出现不完整 */
}

@media (max-width: 1024px) {
  main {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  main {
    grid-template-columns: repeat(2, 1fr);
  }

  main .swipper-content {
    grid-column: 1 / 3;
  }
}

@media (max-width: 576px) {
  main {
    grid-template-columns: repeat(1, 1fr);
  }

  main .swipper-content {
    grid-column: 1 / 2;
  }
}
</style>
