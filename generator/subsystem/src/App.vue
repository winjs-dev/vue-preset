<template>
  <div id="app">
    <frame-layout v-if="isFrame">
      <div class="pages">
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </div>
    </frame-layout>
    <template v-else>
      <QuickNavigation />
      <div class="pages">
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </div>
    </template>
  </div>
</template>

<script>
import { QuickNavigation, FrameLayout } from '@/components';

export default {
  name: 'App',
  components: {
    QuickNavigation,
    FrameLayout
  },
  data() {
    return {
      // 是否使用财富中台外框架
      isFrame: true
    };
  }
};
</script>
