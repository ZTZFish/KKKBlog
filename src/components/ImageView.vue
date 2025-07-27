<template><!-- 新增：触摸开始 -->
  <div v-if="visible" class="image-preview-overlay" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
    @touchend="handleTouchEnd">
    <!-- 关闭按钮 -->
    <button class="preview-close" @click="close">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <!-- 导航按钮 -->
    <button class="preview-nav prev" @click.stop="prevImage" :disabled="currentIndex === 0">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>

    <button class="preview-nav next" @click.stop="nextImage" :disabled="currentIndex === images.length - 1">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>

    <!-- 缩放控制 -->
    <div class="zoom-controls">
      <button @click.stop="zoomOut">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      </button>
      <span>{{ Math.round(scale * 100) }}%</span>
      <button @click.stop="zoomIn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      </button>
    </div>

    <!-- 预览图片 -->
    <div class="preview-container" @click.stop>
      <img :src="currentImage.url" alt="Preview image" :style="{
        transform: `scale(${scale})`,
        transition: 'transform 0.3s ease'
      }" class="preview-image">
    </div>

    <!-- 图片指示器 -->
    <div class="image-indicator">
      {{ currentIndex + 1 }} / {{ images.length }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

// 定义图片类型接口
interface ImageItem {
  id: number;
  url: string;
}

// 接收的props
const props = defineProps<{
  visible: boolean;
  images: ImageItem[];
  currentIndex: number;
}>();

// 发出的事件
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'update:currentIndex', index: number): void;
}>();

// 缩放相关
const scale = ref(1);
const minScale = 0.5;
const maxScale = 3;

// 当前图片计算属性
const currentImage = computed(() => {
  return props.images[props.currentIndex] || { id: 0, url: '' };
});

// 关闭预览
const close = () => {
  scale.value = 1; // 重置缩放
  emit('close');
};

// 上一张图片
const prevImage = () => {
  if (props.currentIndex > 0) {
    emit('update:currentIndex', props.currentIndex - 1);
    scale.value = 1; // 重置缩放
  }
};

// 下一张图片
const nextImage = () => {
  if (props.currentIndex < props.images.length - 1) {
    emit('update:currentIndex', props.currentIndex + 1);
    scale.value = 1; // 重置缩放
  }
};

// 放大图片
const zoomIn = () => {
  if (scale.value < maxScale) {
    scale.value += 0.1;
  }
};

// 缩小图片
const zoomOut = () => {
  if (scale.value > minScale) {
    scale.value -= 0.1;
  }
};

// 监听键盘事件
const handleKeydown = (e: KeyboardEvent) => {
  if (!props.visible) return;

  switch (e.key) {
    case 'Escape':
      close();
      break;
    case 'ArrowLeft':
      prevImage();
      break;
    case 'ArrowRight':
      nextImage();
      break;
    case '+':
    case '=':
      zoomIn();
      break;
    case '-':
      zoomOut();
      break;
    case '0':
      scale.value = 1;
      break;
  }
};

// 新增：处理滚轮事件（缩放图片并阻止页面滚动）
const handleWheel = (e: WheelEvent) => {
  if (!props.visible) return;
  e.preventDefault(); // 阻止页面滚动

  // 滚轮缩放逻辑
  if (e.deltaY < 0 && scale.value < maxScale) {
    scale.value += 0.1;
  } else if (e.deltaY > 0 && scale.value > minScale) {
    scale.value -= 0.1;
  }
};

// 监听props.visible变化，控制滚动条
watch(() => props.visible, (newVal) => {
  toggleBodyScroll(newVal);
});

// 控制页面滚动条显示/隐藏
const toggleBodyScroll = (disable: boolean) => {
  if (disable) {
    // 隐藏滚动条但保留布局空间
    document.body.style.overflow = 'hidden';
  } else {
    // 恢复滚动条
    document.body.style.overflow = '';
  }
};

// 触摸相关变量（用于判断滑动方向和是否需要阻止默认行为）
const touchStartX = ref(0);
const touchStartY = ref(0);
const isDragging = ref(false);

// 触摸开始
const handleTouchStart = (e: TouchEvent) => {
  if (!props.visible) return;
  // 记录初始触摸位置
  touchStartX.value = e.touches[0].clientX;
  touchStartY.value = e.touches[0].clientY;
  isDragging.value = false;
};

// 触摸移动
const handleTouchMove = (e: TouchEvent) => {
  if (!props.visible) return;

  // 标记为正在拖动
  isDragging.value = true;

  // 阻止默认行为（核心：避免滑动遮罩层时页面滚动）
  e.preventDefault();
};

// 触摸结束（可选：判断滑动方向，实现左右滑动切换图片）
const handleTouchEnd = (e: TouchEvent) => {
  if (!props.visible || !isDragging.value) return;

  // 计算滑动距离
  const touchEndX = e.changedTouches[0].clientX;
  const touchEndY = e.changedTouches[0].clientY;
  const diffX = touchEndX - touchStartX.value;
  const diffY = touchEndY - touchStartY.value;

  // 横向滑动距离大于纵向，且超过阈值（如30px），则切换图片
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
    if (diffX > 0) {
      // 向右滑动，切换到上一张
      prevImage();
    } else {
      // 向左滑动，切换到下一张
      nextImage();
    }
  }
};

// 挂载时添加事件监听
onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('wheel', handleWheel, { passive: false }); // 关键：添加滚轮监听
});

// 卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('wheel', handleWheel); // 移除滚轮监听
  toggleBodyScroll(false);
});
</script>

<style lang="scss" scoped>
.image-preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  opacity: 1;
  transition: opacity 0.3s ease;
  user-select: none;
  -webkit-user-select: none;
  /* Safari */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* IE/Edge */


  // 关闭按钮
  .preview-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 10px;
    z-index: 10;
    opacity: 0.8;
    transition: opacity 0.3s ease, transform 0.3s ease;

    &:hover {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  // 导航按钮
  .preview-nav {
    position: absolute;
    top: 50%;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    width: 40px;
    height: 60px;
    cursor: pointer;
    transform: translateY(-50%);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.7;
    transition: all 0.3s ease;

    &:hover {
      opacity: 1;
      background: rgba(0, 0, 0, 0.7);
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }

  .prev {
    left: 20px;
  }

  .next {
    right: 20px;
  }

  // 缩放控制
  .zoom-controls {
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.5);
    padding: 8px 15px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    z-index: 10;

    button {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background-color 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }

    span {
      font-size: 14px;
      min-width: 40px;
      text-align: center;
    }
  }

  // 图片容器
  .preview-container {
    width: 90%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;

    .preview-image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      cursor: zoom-in;
    }
  }

  // 图片指示器
  .image-indicator {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.5);
    padding: 5px 15px;
    border-radius: 15px;
    font-size: 14px;
    z-index: 10;
  }
}

// 响应式调整
@media (max-width: 768px) {
  .preview-nav {
    width: 30px;
    height: 50px;
  }

  .zoom-controls {
    bottom: 70px;
    padding: 5px 10px;
    gap: 10px;
  }

  .image-indicator {
    bottom: 30px;
    font-size: 12px;
    padding: 3px 10px;
  }
}
</style>
