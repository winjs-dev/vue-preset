<template>
  <div class="app-wrapper">
    <!-- 页面顶部 -->
    <div class="h-topbar-wrapper"></div>

    <div class="main-wrapper" :style="frameStyle">
      <!-- 侧边栏 -->
      <div class="h-sidebar-contain h-sidebar-wrapper h-sidebar-blur openedSidebar">
        <h3 class="w-menu">菜单</h3>
        <template v-for="route in routes">
          <router-link :key="route.path" :to="route.path">
            <p class="menu-item">
              <span class="menu-title">{{ route.meta && route.meta.title }}</span>
            </p>
          </router-link>
        </template>
      </div>
      <!-- 中间区域 -->
      <div class="main-container" :style="{ height: noFrame ? '100%' : responsive + 'px' }">
        <div class="h-navbar-wrapper"></div>
        <!-- 内容 -->
        <div id="appMain" ref="appMain" class="app-main">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { routes } from '@/router';

  /* istanbul ignore next */
  export const off = (function () {
    if (document.removeEventListener) {
      return function (element, event, handler) {
        if (element && event) {
          element.removeEventListener(event, handler, false);
        }
      };
    } else {
      return function (element, event, handler) {
        if (element && event) {
          element.detachEvent('on' + event, handler);
        }
      };
    }
  })();

  /* istanbul ignore next */
  export const on = (function () {
    if (document.addEventListener) {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.addEventListener(event, handler, false);
        }
      };
    } else {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.attachEvent('on' + event, handler);
        }
      };
    }
  })();

  export default {
    name: 'FrameLayout',
    data() {
      return {
        routes,
        responsive: 0,
        noFrame: false,
        noLeftPanel: false
      };
    },

    computed: {
      frameStyle() {
        if (this.noFrame) {
          return {
            height: '100%',
            marginTop: '0'
          };
        } else {
          if (this.noLeftPanel) {
            this.handleResize();
            return {
              height: 'calc(100vh - 50px)',
              marginTop: '50px'
            };
          } else {
            this.handleResize();
            return {
              height: 'calc(100vh - 82px)',
              marginTop: '82px'
            };
          }
        }
      }
    },

    mounted() {
      this.handleResize();
      on(window, 'resize', this.handleResize);
    },

    activated() {
      this.noFrame = this.$route.query && this.$route.query._noFrame_ === '1';
      this.handleResize();
      on(window, 'resize', this.handleResize);
    },

    deactivated() {
      off(window, 'resize', this.handleResize);
    },

    beforeDestroy() {
      off(window, 'resize', this.handleResize);
    },

    methods: {
      handleResize() {
        this.$nextTick(() => {
          const appObj = this.$refs.appMain;
          const appOffsetTop = appObj.offsetTop;
          const noticeObj = document.getElementsByClassName('h-notice-bar');
          const noticeClientHeight = noticeObj.length === 0 ? 0 : noticeObj[0].clientHeight;

          if (this.noLeftPanel) {
            this.responsive = window.innerHeight - 50;
          } else {
            this.responsive = window.innerHeight - appOffsetTop - noticeClientHeight + 8;
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .h-sidebar-wrapper {
    position: fixed;
    left: 0;
    top: 50px;
    bottom: 0;
    z-index: 905 !important;

    .w-menu {
      height: 32px;
      line-height: 32px;
      color: #037df3;
      margin-bottom: 15px;
    }

    .menu-item {
      padding-top: 5px;
      padding-bottom: 5px;

      .menu-title {
        margin-left: 5px;
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        min-width: 120px;
        font-size: 12px;
        color: #333;
        line-height: 20px;
        vertical-align: text-bottom;
        width: 120px;
        word-break: keep-all;
        overflow: hidden;
      }
    }
  }
</style>
