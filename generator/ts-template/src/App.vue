<template>
  <div id="app">
    <div class="pages">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import ServiceWorkerUpdatePopup from '@/pwa/components/ServiceWorkerUpdatePopup.vue';

  @Component({
    name: 'App',
    components: {
      ServiceWorkerUpdatePopup
    }
  })
  export default class App extends Vue {}
</script>
