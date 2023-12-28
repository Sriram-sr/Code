import { Router } from 'express';
import { getPosts, getSinglePost } from '../controllers/post-controllers';

const router = Router();

router.route('/').get(getPosts);
router.route('/:postId').get(getSinglePost);

export default router;
