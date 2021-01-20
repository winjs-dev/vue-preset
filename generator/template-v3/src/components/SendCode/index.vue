<template>
  <button :disabled="state.isStart" v-text="state.text"></button>
</template>

<script>
  import { reactive, onMounted, onUnmounted, watch } from 'vue';

  export default {
    name: 'SendCode',
    props: {
      initText: {
        type: String,
        default: '获取验证码'
      },
      second: {
        default: 60,
        validator(val) {
          return /^\d*$/.test(val);
        }
      },
      runText: {
        type: String,
        default: '{%s}秒后重新获取'
      },
      resetText: {
        type: String,
        default: '重新获取验证码'
      },
      start: {
        type: Boolean,
        default: false
      }
    },
    setup(props, { emit }) {
      const state = reactive({
        isStart: false,
        text: '获取短信验证码'
      });
      let timer = null;

      function stop() {
        state.text = props.resetText;
        emit('input', false);
        clearInterval(timer);
      }

      function getText(second) {
        return props.runText.replace(/\{([^{]*?)%s(.*?)\}/g, second);
      }

      function run() {
        let second = props.second;

        state.text = getText(props.second);
        timer = setInterval(() => {
          second--;
          state.text = getText(second);
          second <= 0 && stop();
        }, 1000);
      }

      watch(
        () => props.start,
        (val) => {
          state.isStart = val;
          val && run();
        }
      );

      onMounted(() => {
        if (props.initText) {
          state.text = props.initText;
        }
      });

      onUnmounted(() => {
        stop();
      });

      return {
        state
      };
    }
  };
</script>

<!--
用法：

html:

<send-code class="btn btn-default" :start="start" @click.native="sendCode"></send-code>

or

<send-code class="btn btn-default" :start="start" @click.native="sendCode"></send-code>

<send-code class="btn btn-default" :start="start" second="15" initText="点我啊，你点我啊"
            runText="在{%s}秒后你就可以重新获取啦"
            resetText="你可以重新获取验证码啦"
            @click.native="sendCode"></send-code>

js:
 export default {
        data() {
            return {
                start: false
            }
        },
        methods: {
            sendCode() {
                setTimeout(() => {
                    this.start = true;
                }, 1000);
            }
        }
    }
-->
