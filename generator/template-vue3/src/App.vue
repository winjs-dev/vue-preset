<template>
  <div class="pages">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
  export default {
    name: "App"
  };
</script>
