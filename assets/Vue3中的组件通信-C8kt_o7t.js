const r=`# Vue数据传递\r
\r
## 一、父→子，prop\r
\r
\`\`\`html\r
// 父组件\r
<script setup>\r
import Props from './components/Props.vue';\r
<\/script>\r
\r
<template>\r
  <Props :count="3" :str="'我是你爹'" />\r
</template>\r
\r
// 子组件\r
<template>\r
  <div>\r
    <p>{{ props.count }}</p>\r
    <p>{{ props.str }}</p>\r
  </div>\r
</template>\r
\r
<script setup>\r
const props = defineProps({\r
  count: Number,\r
  str: String\r
})\r
\`\`\`\r
\r
父组件使用子组件标签时添加属性绑定：\r
\r
**:属性名 = 要传递的值**\r
\r
子组件定义prop（装传递的值，是个对象），用defineProps( { 属性名：自己定义的数据类型，··· } )\r
\r
## **二、子→父**，emit\r
\r
\`\`\`html\r
//父组件\r
<script setup>\r
  import Emit from './components/Emit.vue'\r
  const handle = (msg) => {\r
    console.log(msg)\r
  }\r
<\/script>\r
\r
<template>\r
  <Emit @sonClick="handle" />\r
</template>\r
\r
//子组件\r
<template>\r
  <div>\r
    <button @click="mouseClick">点击按钮</button>\r
  </div>\r
</template>\r
\r
<script setup>\r
  const emit = defineEmits(['sonClick'])\r
  const mouseClick = () => {\r
    emit('sonClick', '我是你爹')\r
  }\r
<\/script>\r
\`\`\`\r
\r
子组件先用defineEmits( [ 自定函数事件名称 ] )声明自定义函数事件，这个事件触发后父组件会调用这个自定义函数触发的函数\r
\r
子组件中用 emit( '自定函数事件名称' ， 要传递的数据 )\r
\r
父组件在渲染子组件的标签中加上子组件触发自定义函数时自己要触发的函数\r
\r
## 三、跨组件传递（祖先&孙子），provide&inject\r
\r
### 祖先→孙子\r
\r
\`\`\`html\r
//祖先组件\r
<script setup>\r
  import ProvideInject from './components/ProvideInject.vue'\r
  import { ref, provide } from 'vue'\r
  const giveData = ref('父组件给的数据')\r
  provide('giveData', giveData)\r
<\/script>\r
\r
<template>\r
  <ProvideInject />\r
</template>\r
\r
//孙子组件\r
<template>\r
  <div>\r
    <p>{{ getData }}</p>\r
  </div>\r
</template>\r
\r
<script setup>\r
  import { ref, inject } from 'vue'\r
  const getData = inject('giveData')\r
<\/script>\r
\`\`\`\r
\r
祖先组件：provide( '自定义数据名称' ，传递的数据的值)\r
\r
孙子组件：const 得到的值 = inject('自定义数据名称')\r
\r
### 孙子→祖先\r
\r
祖先通过 provide 提供一个函数，孙子通过 inject 拿到这个函数并调用，实现“反向通信”。\r
\r
\`\`\`html\r
//父组件\r
<script setup>\r
  import ProvideInject from './components/ProvideInject.vue'\r
  import { ref, provide } from 'vue'\r
  provide('func', (message) => {\r
    console.log(message)\r
  })\r
<\/script>\r
\r
//子组件\r
<script setup>\r
  import { ref, inject } from 'vue'\r
  const giveData = inject('func')\r
  giveData('我给祖先传数据')\r
<\/script>\r
\`\`\`\r
\r
祖先组件通过 provide 提供一个函数时，实际上是把这个函数的“引用”放进了 Vue 的依赖注入系统。 孙子组件通过 inject 拿到的，就是这个函数的引用（指针），而不是“路径”或“副本”。\r
\r
孙子在调用传递过来的方法时，实际上就是在调用祖先组件定义的那个函数，函数体里的逻辑会在祖先组件的作用域下执行。\r
\r
### 四、全局状态管理工具，Pinia（以及VueX）\r
\r
#### 1.创建store文件夹，以及文件夹下的index.js文件\r
\r
index.js:\r
\r
\`\`\`js\r
import { defineStore } from 'pinia'\r
import { defineStore } from 'pinia'\r
\r
export const use***Store = defineStore('storeId',() => {\r
    const count = ref(0)\r
    const doubleCount = computed(() => {\r
        return count.value*2\r
    })\r
    function increment（）{\r
        count.value++\r
    }\r
    return{ count,doubleCount,increment }\r
})\r
\`\`\`\r
\r
你可以任意命名 \`defineStore()\` 的返回值，但最好使用 store 的名字，同时以 \`use\` 开头且以 \`Store\` 结尾。\r
\r
(比如 \`useUserStore\`，\`useCartStore\`，\`useProductStore\`)\r
\r
第一个参数是你的应用中 Store 的唯一 ID。\r
\r
defineStore() 的第二个参数可接受两类值：**Setup(组合式API) 函数**或 **Option (分布式API)对象**\r
\r
#### 2.在main.js中导入和挂载\r
\r
导入：\r
\r
\`\`\`js\r
// 在main.js引入pinia\r
import { createPinia } from 'pinia'\r
\`\`\`\r
\r
挂载：\r
\r
\`\`\`js\r
const pinia = createPinia()\r
app.use(pinia)\r
\`\`\`\r
\r
#### 3.在文件中使用\r
\r
\`\`\`html\r
<template>\r
  <div>\r
    <p>{{ practiceStore.count }}</p>\r
    <p>{{ practiceStore.doubleCount }}</p>\r
    <button @click="practiceStore.increment">++</button>\r
  </div>\r
</template>\r
\r
<script setup>\r
  import { ref } from 'vue'\r
  import { usePracticeStore } from '../store.js'\r
\r
  const practiceStore = usePracticeStore()\r
<\/script>\r
\`\`\`\r
\r
### 补充 defineExpose\r
\r
defineExpose 是 Vue 3 中setup语法中的一个专用 API，用于 向父组件暴露子组件内部的属性或方法 。\r
\r
<GiscusComment />\r
`;export{r as default};
