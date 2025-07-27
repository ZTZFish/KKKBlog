import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useImages } from '@/composables/useImages'

const { images } = useImages('essayCard')

export const essayDataStore = defineStore('essayData', () => {
  const essays = ref([
    {
      id: 1,
      title: 'Vue3中的组件通信',
      tags: ['Vue'],
      bgc: images.value[0].url,
      content: '本文主要介绍Vue3中的组件通信方式，主要包括props、$emit、provide/inject等。',
      time: '2025-7-27',
    },
    {
      id: 2,
      title: 'CSS属性计算过程',
      tags: ['HTML', 'CSS'],
      bgc: images.value[1].url,
      content: '本文主要介绍CSS属性的计算过程，包括继承、层叠、优先级等。',
      time: '2025-7-27',
    },
  ])
  return { essays }
})
