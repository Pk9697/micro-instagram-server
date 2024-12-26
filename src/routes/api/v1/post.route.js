import { Router } from 'express'
import { verifyJwt } from '../../../middlewares/auth.middleware.js'
import {
  createPost,
  deletePost,
  getAllPosts,
  getUserPosts,
  updatePost,
} from '../../../controllers/api/v1/post.controller.js'
import { upload } from '../../../middlewares/multer.middleware.js'

const router = Router()

router.route('/').get(getAllPosts)
router.route('/create').post(verifyJwt, upload.array('images', 10), createPost)
router.route('/:userId').get(getUserPosts)
router.route('/delete/:postId').delete(verifyJwt, deletePost)
router.route('/update/:postId').patch(verifyJwt, upload.none(), updatePost)

export default router
