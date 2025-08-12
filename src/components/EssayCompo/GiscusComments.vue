<template>
  <div class="comments-section">
    <div id="waline"></div>
  </div>
</template>

<script lang="ts" setup>
import { init } from '@waline/client'
import '@waline/client/style'
import { ref, onMounted } from 'vue'

const pagePath = ref(window.location.href)
onMounted(() => {
  init({
    el: '#waline',
    serverURL: 'https://kkksever.vercel.app/', // 你的 Vercel 部署地址
    path: pagePath.value,
    lang: 'zh-CN',
    meta: ['nick', 'mail', 'link'],
    requiredMeta: ['nick'],
    locale: {
      placeholder: '欢迎留言讨论~',
    },
    // avatar: 'mp', // 移除此行
    // avatarCDN: 'https://sdn.geekzu.org/avatar/', // 移除此行
    pageSize: 10,
    noCopyright: false, // 将 copyright: false 修改为 noCopyright: false
    pageview: true,
    // 关键修改：绑定到 theme-mode 属性
    dark: ':root[theme-mode="dark"]'
  })
})
console.log(window.location.href)
</script>

<style lang="scss" scoped>
.comments-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}
</style>
