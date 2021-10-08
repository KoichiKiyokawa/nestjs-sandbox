import { userAndPostSeed } from './user-and-post';
import { commentSeed } from './comment';

(async () => {
  await userAndPostSeed();
  await commentSeed();
})();
