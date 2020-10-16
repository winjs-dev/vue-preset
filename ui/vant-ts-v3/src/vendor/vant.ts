import { createApp } from 'vue';
import { Button } from 'vant';

const app = createApp({});

// 按需引用
app
  .use(Button);
