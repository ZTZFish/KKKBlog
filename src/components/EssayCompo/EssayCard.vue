<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// 定义允许的标签类型
type EssayTag = 'Vue' | 'HTML' | 'CSS' | 'JS' | string;

const props = defineProps({
  essay: {
    type: Object,
    default: () => ({})
  }
})

const tagColor = computed(() => {
  // 为每个标签返回对应的颜色
  const tagColorMap: Record<EssayTag, string> = {
    'Vue': '#2ba471',
    'HTML': '#366ef4',
    'CSS': '#e37318',
    'JS': '#f5ba18',
  }

  // 使用类型断言确保安全
  return (tag: EssayTag) => tagColorMap[tag]
})

// 在组件顶层定义 ref
const card = ref<HTMLDivElement | null>(null)

const enterEssayDetail = () => {
  router.push({
    name: 'essayDetail',
    params: {
      essayTitle: props.essay.title,
      essayId: props.essay.id
    }
  })
}


</script>

<template>
  <div class="card-container" @click="enterEssayDetail">
    <div class="card" ref="card">
      <div class="front"
        :style="{ backgroundImage: `url(${props.essay.bgc})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
        <div class="title">
          <span>{{ props.essay.title }}</span>
        </div>
      </div>
      <div class="behind">
        <header>
          <div class="title">
            <span>{{ props.essay.title }}</span>
          </div>
          <div class="tags">
            <t-tag v-for="tag in props.essay.tags" :key="tag" style="margin-right: 5px;" :color="tagColor(tag)">{{ tag
            }}</t-tag>
          </div>
        </header>
        <div class="content">
          <span>{{ props.essay.content }}</span>
        </div>
        <footer>
          <img src="../../assets/icon/时钟-fill.svg" alt="">
          <span>{{ props.essay.time }}</span>
        </footer>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.card-container {
  position: relative;
  height: 30vh;
  perspective: 1000px;

  &:hover .card {
    transform: rotateY(180deg);
  }

  .card {
    position: relative;
    height: 30vh;
    border-radius: 10px;
    transform-style: preserve-3d;
    transition: transform 0.5s ease;
    perspective: 1000px;
    cursor: pointer;

    .front {
      position: relative;
      height: 30vh;
      border-radius: 10px;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 10px;
      }

      .title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
      }
    }

    .behind {
      position: absolute;
      display: flex;
      flex-direction: column;
      top: 0;
      left: 0;
      width: 80%;
      height: 70%;
      margin: 10% 10%;
      padding: 15px;
      border-radius: 10px;
      transform: translateZ(-50px) rotateY(180deg);
      background-color: #fff;

      header {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;

        .title {
          display: block;
          margin: 0 auto;
          color: #000;
          font-size: 1.2rem;
        }

        .tags {
          width: fit-content;
          display: flex;
          justify-content: center;
        }
      }

      footer {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto 0.5rem 0.5rem auto;

        img {
          width: 1.2rem;
          height: 1.2rem;
          margin-right: 0.5rem;
        }
      }
    }

  }
}
</style>
