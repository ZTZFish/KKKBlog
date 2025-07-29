<template>
  <div class="giscus-container">
    <Giscus id="comments" repo="ZTZFish/KKKBlog" repoId="R_kgDOPJ-S-w" category="General"
      categoryId="DIC_kwDOPJ-S-84Ctf70" mapping="pathname" reactionsEnabled="1" emitMetadata="0" inputPosition="bottom"
      theme="preferred_color_scheme" lang="zh-CN" loading="lazy" />
  </div>
</template>

<script lang="ts" setup>
import Giscus from '@giscus/vue'
</script>

<style scoped>
.giscus-container {
  margin-top: 2rem;
}
</style>
