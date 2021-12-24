<template>
  <div id="app">
    <QuickNavigation />
    <div class="pages">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
    </div>
  </div>
</template>

<script>
  import { QuickNavigation } from '@/components';

  export default {
    name: 'App',
    components: {
      QuickNavigation
    }
  };
</script>
