import {Router} from 'express';
import blogsRouter from './blogs';
import tagsRouter from './tags';
import blogTagsRouter from './blogTags';


const router = Router()

router.use('/blogs', blogsRouter)
router.use('/tags', tagsRouter)
router.use('/blogTags', blogTagsRouter)

export default router;