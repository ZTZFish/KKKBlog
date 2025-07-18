<template>
  <div class="box" v-show="props.visible">
    <t-menu v-model:expanded="expanded" theme="light" default-value="3-2" expand-mutex :collapsed="collapsed">
      <t-submenu value="3">
        <template #icon>
          <t-icon name="mail" />
        </template>
        <template #title>
          <span>消息区</span>
        </template>
        <t-submenu value="3-1" title="二级菜单">
          <t-menu-item value="3-1-1"> 三级菜单内容 </t-menu-item>
          <t-menu-item value="3-1-2"> 三级菜单内容 </t-menu-item>
          <t-menu-item value="3-1-3"> 三级菜单内容 </t-menu-item>
        </t-submenu>
        <t-submenu value="3-5" title="二级菜单">
          <t-menu-item value="3-5-1"> 三级菜单内容 </t-menu-item>
          <t-menu-item value="3-5-2"> 三级菜单内容 </t-menu-item>
          <t-menu-item value="3-5-3"> 三级菜单内容 </t-menu-item>
        </t-submenu>
        <t-menu-item value="3-2"> 二级菜单内容 </t-menu-item>
        <t-menu-item value="3-3"> 二级菜单内容 </t-menu-item>
        <t-menu-item value="3-4"> 二级菜单内容 </t-menu-item>
      </t-submenu>
      <t-menu-item value="user-circle">
        <template #icon>
          <t-icon name="user-circle" />
        </template>
        个人中心
      </t-menu-item>
      <t-submenu value="4">
        <template #icon>
          <t-icon name="play-circle" />
        </template>
        <template #title>
          <span>视频区</span>
        </template>
        <t-menu-item value="4-1"> 二级菜单内容 </t-menu-item>
        <t-menu-item value="4-2"> 二级菜单内容 </t-menu-item>
        <t-menu-item value="4-3"> 二级菜单内容 </t-menu-item>
      </t-submenu>
      <t-menu-item value="edit1">
        <template #icon>
          <t-icon name="edit-1" />
        </template>
        资源编辑
      </t-menu-item>
      <template #operations>
        <t-button variant="text" shape="square" @click="changeCollapsed">
          <template #icon><t-icon name="view-list" /></template>
        </t-button>
      </template>
    </t-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { MenuProps, ButtonProps } from 'tdesign-vue-next';
const collapsed = ref(false);
const changeCollapsed: ButtonProps['onClick'] = () => {
  collapsed.value = !collapsed.value;
};
const expanded = ref<MenuProps['expanded']>(['2', '3']);
const props = defineProps({
  visible: {
    type: Boolean,
    default: true,
  },
})
</script>

<style lang="scss" scoped>
.t-demo-collapse-btn {
  color: #fff;

  &:hover {
    background-color: #4b4b4b;
    border-color: transparent;
    --ripple-color: #383838;
  }
}
</style>
