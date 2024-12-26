import { Router } from 'express'
import {
  getAllUsers,
  loginUser,
  registerUser,
} from '../../../controllers/api/v1/user.controller.js'

const router = Router()

router.route('/').get(getAllUsers)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

export default router
