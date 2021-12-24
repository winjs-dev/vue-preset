<template>
  <div class="quick-navigation">
    <div class="navigation" @click="visible = true">
      <h-icon class="icon-menu" name="android-menu"></h-icon>
      <p>快捷导航</p>
    </div>
    <h-drawer
      class="quick-navigation-drawer"
      v-model="visible"
      width="250"
      title="快捷导航"
      :styles="styles"
    >
      <template v-for="route in routes">
        <router-link :to="route.path">
          <p class="menu-item"
            >{{ route.name }}<span class="menu-title">{{ route.meta && route.meta.title }}</span></p
          >
        </router-link>
      </template>
    </h-drawer>
  </div>
</template>

<script>
  import { routes } from '@/router';

  export default {
    name: 'QuickNavigation',
    data() {
      return {
        routes,
        visible: false,
        styles: {
          height: 'calc(100% - 55px)',
          paddingBottom: '53px'
        }
      };
    },
    methods: {
      handleClose() {}
    }
  };
</script>

<style lang="less" scoped>
  .quick-navigation {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 99;
    transform: scale(0.6);

    .navigation {
      width: 70px;
      height: 70px;
      cursor: pointer;
      border-radius: 50%;
      color: #096dd9;
      background: #e6f7ff;
      border-color: #91d5ff;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  .quick-navigation-drawer {
    .menu-item {
      padding-bottom: 5px;

      .menu-title {
        padding-left: 5px;
      }
    }
  }
</style>
