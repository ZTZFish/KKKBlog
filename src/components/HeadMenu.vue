<template>
  <t-head-menu class="head">
    <div class="logo" @click="backHome">
      <img src="../assets/images/Logo.png" alt="logo">
    </div>
    <div class="menus">
      <div class="menu-item" :class="{ 'located': isActive('index') }" @click="router.push({ name: 'index' })">首页</div>
      <div class="menu-item" :class="{ 'located': isActive('articles') }" @click="router.push({ name: 'articles' })">文章
      </div>
      <div class="menu-item" :class="{ 'located': isActive('photos') }" @click="router.push({ name: 'photos' })">照片墙
      </div>
      <div class="menu-item" :class="{ 'located': isActive('hobbies') }" @click="router.push({ name: 'hobbies' })">爱好
      </div>
      <div class="menu-item" :class="{ 'located': isActive('messages') }" @click="router.push({ name: 'messages' })">留言
      </div>
      <div class="menu-item" :class="{ 'located': isActive('resource') }" @click="router.push({ name: 'resource' })">资源
      </div>
    </div>
    <div class="hubMenu">
      <t-button theme="default" variant="text" @click="showMenu">
        <img src="../assets/images/hubMenu.png" alt="菜单">
      </t-button>
    </div>
  </t-head-menu>
  <t-drawer :footer="false" :header="false" preventScrollThrough :closeOnEscKeydown="false" :closeBtn="false"
    v-model:visible="visible" size="70%">
    <UserInfo style="width:100%;margin: 1vh 0;" />
    <div class="draw-menus">
      <div class="draw-menu-item" :class="{ 'located': isActive('index') }" @click="router.push({ name: 'index' })">首页
      </div>
      <div class="draw-menu-item" :class="{ 'located': isActive('articles') }"
        @click="router.push({ name: 'articles' })">文章</div>
      <div class="draw-menu-item" :class="{ 'located': isActive('photos') }" @click="router.push({ name: 'photos' })">
        照片墙
      </div>
      <div class="draw-menu-item" :class="{ 'located': isActive('hobbies') }" @click="router.push({ name: 'hobbies' })">
        爱好</div>
      <div class="draw-menu-item" :class="{ 'located': isActive('messages') }"
        @click="router.push({ name: 'messages' })">留言</div>
      <div class="draw-menu-item" :class="{ 'located': isActive('resource') }"
        @click="router.push({ name: 'resource' })">资源</div>
    </div>
  </t-drawer>
</template>

<script lang="ts" setup>
import UserInfo from './UserInfo.vue'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const visible = ref(false)//控制右侧弹出层

const emit = defineEmits(['showUser'])

const backHome = () => {
  router.push('/')
}

const isActive = (name: string) => {
  return route.name == name
}

const showMenu = () => {
  visible.value = true
  emit('showUser')
}


</script>

<style lang="scss" scoped>
:deep(.t-button) {
  height: 100%;
  padding: 0;
}

:deep(.t-head-menu__inner .t-menu:first-child) {
  margin-left: 0;
}

.head {
  .logo {
    display: flex;
    align-items: center;
    margin-left: 2em;
    width: auto;
    height: 100%;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .menus {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 2em;

    .menu-item {
      display: flex;
      align-items: center;
      height: 100%;
      box-sizing: border-box;
      margin: 0 1em;
      font-size: 1.2em;
      cursor: pointer;

      &.located {
        color: #007bff;
        border-bottom: 2px solid #007bff;
      }
    }

  }

  .hubMenu {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 35px;
    height: 35px;
    cursor: pointer;
    display: none;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.draw-menus {
  width: 100%;
  margin: 20px 0;
  display: flex;
  flex-direction: column;

  .draw-menu-item {
    height: 1.5em;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    font-size: 1.2em;
    color: #000;
    cursor: pointer;

    &.located {
      color: #007bff;
    }

    &.located::before {
      content: "";
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      width: 25px; // 图标宽度
      height: 25px; // 图标高度
      background-image: url('../assets/images/Position.png');
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
}

@media(max-width: 798px) {
  .head {
    font-size: 14px;
  }

  .head .hubMenu {
    display: block;
  }

  .head .menus {
    display: none;
  }
}
</style>
