<!--webview 容器-->
<template>
  <view class="webview">
    <web-view :src="url" />
  </view>
</template>

<script>
  import './webview.less';

  export default {
    data() {
      return {
        url: '',
        title: ''
      };
    },
    created() {
      this.url = decodeURIComponent(this.$router.params.url || '');
      this.title = decodeURIComponent(this.$router.params.title || '');
      Taro.setNavigationBarTitle({ title: this.title });
    }
  };
</script>
