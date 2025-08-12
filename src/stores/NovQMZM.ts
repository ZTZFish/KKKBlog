import { ref } from 'vue'
import { defineStore } from 'pinia'
import QMZMImage from '../assets/images/NovPost/QMZM.png'
// 根据环境动态生成基础路径
const getBasePath = () => {
  const baseUrl = import.meta.env.BASE_URL || '/'
  // 检查是否是开发环境
  const isDevelopment = import.meta.env.DEV

  // 开发环境包含public，生产环境不包含
  return isDevelopment ? `${baseUrl}public/` : baseUrl
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
