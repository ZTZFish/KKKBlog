import { ref } from 'vue'
import { defineStore } from 'pinia'
import TOGDImage from '../assets/images/NovPost/TODG.png'

export const useTOGDStore = defineStore('TOGD', () => {
  // 根据环境动态生成基础路径
  const getBasePath = () => {
    const baseUrl = import.meta.env.BASE_URL || '/'
    // 检查是否是开发环境
    const isDevelopment = import.meta.env.DEV

    // 开发环境包含public，生产环境不包含
    return isDevelopment ? `${baseUrl}public/` : baseUrl
  }

  const togd = ref({
    id: 1,
    title: 'The Game Of Death',
    tag: ['微恐', '血腥', '烂作'],
    time: '2022',
    status: '已完结',
    intro: '当时写完感觉还行，隔了三年后再看简直就是一坨，狗屁不通。',
    postUrl: TOGDImage,
    chapters: [
      {
        id: 1,
        title: '第一章',
        contentUrl: `${getBasePath()}novels/TOGD/contents/第一章.txt`,
      },
      {
        id: 2,
        title: '第二章',
        contentUrl: `${getBasePath()}novels/TOGD/contents/第二章.txt`,
      },
      {
        id: 3,
        title: '第三章',
        contentUrl: `${getBasePath()}novels/TOGD/contents/第三章.txt`,
      },
      {
        id: 4,
        title: '第四章',
        contentUrl: `${getBasePath()}novels/TOGD/contents/第四章.txt`,
      },
      {
        id: 5,
        title: '第五章',
        contentUrl: `${getBasePath()}novels/TOGD/contents/第五章.txt`,
      },
      {
        id: 6,
        title: '第六章',
        contentUrl: `${getBasePath()}novels/TOGD/contents/第六章.txt`,
      },
      {
        id: 7,
        title: '第七章',
        contentUrl: `${getBasePath()}novels/TOGD/contents/第七章.txt`,
      },
    ],
    extra: [],
  })

  return { togd }
})
