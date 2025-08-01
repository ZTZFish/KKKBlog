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
    {
      id: 3,
      title: '插槽',
      tags: ['Vue'],
      bgc: images.value[2].url,
      content: '本文主要介绍Vue中的插槽，包括默认插槽、具名插槽、作用域插槽等。',
      time: '2025-7-29',
    },
    {
      id: 4,
      title: '你不知道的CSS之包含块',
      tags: ['HTML', 'CSS'],
      bgc: images.value[3].url,
      content: '本文主要介绍CSS中的包含块，包括块级元素、行内元素、行内块元素等。',
      time: '2025-7-29',
    },
    {
      id: 5,
      title: 'CSS过渡效果',
      tags: ['HTML', 'CSS'],
      bgc: images.value[4].url,
      content: '本文主要介绍CSS中的过渡效果，包括过渡属性、过渡时间、过渡函数等。',
      time: '2025-7-30',
    },
  ])
  return { essays }
})
