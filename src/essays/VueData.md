# Vue数据传递

## 一、父→子，prop

```
// 父组件
<script setup>
import Props from './components/Props.vue';
</script>

<template>
  <Props :count="3" :str="'我是你爹'" />
</template>

// 子组件
<template>
  <div>
    <p>{{ props.count }}</p>
    <p>{{ props.str }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  count: Number,
  str: String
})
```

父组件使用子组件标签时添加属性绑定：

**:属性名 = 要传递的值**

子组件定义prop（装传递的值，是个对象），用defineProps( { 属性名：自己定义的数据类型，··· } )



## **二、子→父**，emit

```
//父组件
<script setup>
import Emit from './components/Emit.vue';
const handle = (msg) => {
  console.log(msg);
};
</script>

<template>
  <Emit @sonClick="handle" />
</template>

//子组件
<template>
  <div>
    <button @click="mouseClick">点击按钮</button>
  </div>
</template>

<script setup>
const emit = defineEmits(['sonClick']);
const mouseClick = () => {
  emit('sonClick', '我是你爹');
};
</script>
```

子组件先用defineEmits( [ 自定函数事件名称 ] )声明自定义函数事件，这个事件触发后父组件会调用这个自定义函数触发的函数

子组件中用 emit( '自定函数事件名称' ， 要传递的数据 )

父组件在渲染子组件的标签中加上子组件触发自定义函数时自己要触发的函数



## 三、跨组件传递（祖先&孙子），provide&inject

### 祖先→孙子

```
//祖先组件
<script setup>
import ProvideInject from './components/ProvideInject.vue';
import { ref, provide } from 'vue';
const giveData = ref("父组件给的数据");
provide('giveData', giveData);
</script>

<template>
  <ProvideInject />
</template>

//孙子组件
<template>
  <div>
    <p>{{ getData }}</p>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
const getData = inject('giveData');
</script>
```

祖先组件：provide( '自定义数据名称' ，传递的数据的值)

孙子组件：const 得到的值 = inject('自定义数据名称')



### 孙子→祖先

祖先通过 provide 提供一个函数，孙子通过 inject 拿到这个函数并调用，实现“反向通信”。

```
//父组件
<script setup>
import ProvideInject from './components/ProvideInject.vue';
import { ref, provide } from 'vue';
provide('func', (message) => {
  console.log(message);
});
</script>

//子组件
<script setup>
import { ref, inject } from 'vue';
const giveData = inject('func');
giveData('我给祖先传数据');
</script>
```

祖先组件通过 provide 提供一个函数时，实际上是把这个函数的“引用”放进了 Vue 的依赖注入系统。 孙子组件通过 inject 拿到的，就是这个函数的引用（指针），而不是“路径”或“副本”。

孙子在调用传递过来的方法时，实际上就是在调用祖先组件定义的那个函数，函数体里的逻辑会在祖先组件的作用域下执行。



### 四、全局状态管理工具，Pinia（以及VueX）

#### 1.创建store文件夹，以及文件夹下的index.js文件

index.js:

```
import { defineStore } from 'pinia'
import { defineStore } from 'pinia'

export const use***Store = defineStore('storeId',() => {
    const count = ref(0)
    const doubleCount = computed(() => {
        return count.value*2
    })
    function increment（）{
        count.value++
    }
    return{ count,doubleCount,increment }
})
```

你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。

(比如 `useUserStore`，`useCartStore`，`useProductStore`)

第一个参数是你的应用中 Store 的唯一 ID。

defineStore() 的第二个参数可接受两类值：**Setup(组合式API) 函数**或 **Option (分布式API)对象**

#### 2.在main.js中导入和挂载

导入：

``` 
import {createPinia} from 'pinia'
```

挂载：

```
const pinia = createPinia()
app.use(pinia)
```

#### 3.在文件中使用

```
<template>
  <div>
    <p>{{ practiceStore.count }}</p>
    <p>{{ practiceStore.doubleCount }}</p>
    <button @click="practiceStore.increment">++</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePracticeStore } from '../store.js'

const practiceStore = usePracticeStore()
</script>
```



### 补充 defineExpose

defineExpose 是 Vue 3 <script setup> 语法中的一个专用 API，用于 向父组件暴露子组件内部的属性或方法 。

