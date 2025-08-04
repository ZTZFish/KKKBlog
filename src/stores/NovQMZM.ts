import { ref } from 'vue'
import { defineStore } from 'pinia'
import QMZMImage from '../assets/images/NovPost/QMZM.png'
// 获取完整的基础路径，包含 public
const getBasePath = () => {
  const baseUrl = import.meta.env.BASE_URL || '/'
  console.log('baseUrl', baseUrl)
  return `${baseUrl}public/` // 显式添加 public 路径
}
export const useQMZMStore = defineStore('QMZM', () => {
  const qmzm = ref({
    id: 2,
    title: '晴梅泽马',
    tag: ['校园', '青春', '青梅竹马'],
    time: '2023',
    status: '重置筹备中',
    intro: '青梅竹马才是最屌的！',
    postUrl: QMZMImage,
    chapters: [
      {
        id: 1,
        title: '第一章',
        contentUrl: `${getBasePath()}novels/QMZM/contents/第一章.txt`,
      },
      {
        id: 2,
        title: '第二章',
        contentUrl: `${getBasePath()}novels/QMZM/contents/第二章.txt`,
      },
      {
        id: 3,
        title: '第三章',
        contentUrl: `${getBasePath()}novels/QMZM/contents/第三章.txt`,
      },
      {
        id: 4,
        title: '第四章',
        contentUrl: `${getBasePath()}novels/QMZM/contents/第四章.txt`,
      },
    ],
    extra: [
      {
        id: 1,
        title: '第一次约会',
        contentUrl: `${getBasePath()}novels/QMZM/extra/第一次约会.txt`,
      },
      {
        id: 2,
        title: '跨年夜',
        contentUrl: `${getBasePath()}novels/QMZM/extra/跨年夜.txt`,
      },
    ],
  })

  return { qmzm }
})
