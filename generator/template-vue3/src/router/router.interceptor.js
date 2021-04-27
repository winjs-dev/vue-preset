import router from './index';
import { clearPending } from '@/services/pending';

router.beforeEach((to, from, next) => {
  clearPending();
  next();
});
