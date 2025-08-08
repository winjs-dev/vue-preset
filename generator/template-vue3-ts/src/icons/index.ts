import { VueSvgIconPlugin } from '@yzfe/vue3-svgicon';
import '@yzfe/svgicon/lib/svgicon.css';

export default function setSvgIcon(app) {
  app.use(VueSvgIconPlugin, {
    tagName: 'svg-icon'
  });
}
